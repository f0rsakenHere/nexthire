import OpenAI from "openai";
import Groq from "groq-sdk";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import clientPromise from "@/lib/mongodb";

export const maxDuration = 120;

// Tier 1: MiniMax via NVIDIA (highest quality)
const nvidia = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

// Tier 2: Cerebras (blazing fast ~1-2s)
const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

// Tier 3: Groq (safety net)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    ),
  ]);
}

function sanitizeJsonStrings(raw: string): string {
  let result = "";
  let inString = false;
  let i = 0;

  while (i < raw.length) {
    const ch = raw[i];

    if (inString && ch === "\\") {
      result += ch + (raw[i + 1] ?? "");
      i += 2;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      result += ch;
      i++;
      continue;
    }

    if (inString) {
      if (ch === "\n") { result += "\\n"; i++; continue; }
      if (ch === "\r") { i++; continue; }
      if (ch === "\t") { result += "\\t"; i++; continue; }
    }

    result += ch;
    i++;
  }

  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action !== "analyze") {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }

    const { role, industry, jobDescription, resume, userId } = body;

    const prompt = `
            You are an advanced ATS Resume Intelligence Engine.

            Analyze the resume against the job description for the role: ${role}
            Industry: ${industry}

            Perform:

            1. Keyword extraction from JD.
            2. Rank by:
            - Frequency in JD
            - Required vs Preferred section
            - Industry importance weight (0-1)
            - Role relevance score (0-1)
            3. Detect:
            - Full match
            - Partial semantic match
            - Missing
            4. Section-based gap detection (Summary, Skills, Experience, Projects).
            5. Keyword density optimization.
            6. Generate AI rewrite bullet for missing high-priority keywords.
            7. Calculate ATS optimization score (0-100).
            8. Benchmark against industry average skill coverage.

            Return ONLY valid JSON matching this schema:

            {
            "atsScore": number,
            "keywords": [
                {
                "keyword": string,
                "importance": "Required" | "Preferred",
                "frequencyInJD": number,
                "industryWeight": number,
                "roleRelevance": number,
                "priority": "High" | "Medium" | "Low",
                "matchType": "Full" | "Partial" | "Missing",
                "sectionsFound": string[],
                "recommendedSection": string,
                "rewriteSuggestion": string
                }
            ],
            "densityReport": {
                "<keyword>": {
                "count": number,
                "idealRange": string,
                "status": "Underused" | "Optimal" | "Overused"
                }
            },
            "sectionGaps": [
                {
                "keyword": string,
                "missingIn": string[],
                "suggestion": string
                }
            ],
            "benchmark": {
                "industryCoveragePercent": number
            }
            }

            CRITICAL: Never use unescaped double quotes ("...") inside any JSON string. If you need to quote a term inside a sentence or suggestion, use single quotes ('...') instead. The output MUST be 100% strictly valid JSON.

            Job Description:
            ${jobDescription}

            Resume:
            ${JSON.stringify(resume, null, 2)}
        `;

    const messages: { role: "user"; content: string }[] = [
      { role: "user", content: prompt },
    ];

    let raw = "";
    let modelUsed = "";

    // ── Tier 1: MiniMax via NVIDIA (55s timeout) ──────────────────────────
    try {
      const completion = await withTimeout(
        nvidia.chat.completions.create({
          model: "minimaxai/minimax-m2.1",
          messages,
          temperature: 0,
          top_p: 1,
          max_tokens: 8192,
        }),
        55_000,
      );
      raw = completion.choices[0]?.message?.content ?? "";
      modelUsed = "MiniMax/NVIDIA";
    } catch (nvidiaErr) {
      console.warn("[keyword-gap] MiniMax unavailable/timeout, trying Cerebras:", (nvidiaErr as Error).message);

      // ── Tier 2: Cerebras (fast fallback) ────────────────────────────────
      try {
        const cbCompletion = await cerebras.chat.completions.create({
          model: "llama3.1-70b",
          messages,
          temperature: 0,
          top_p: 1,
          max_completion_tokens: 8192,
          stream: false,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        raw = ((cbCompletion as any).choices?.[0]?.message?.content as string) ?? "";
        modelUsed = "Cerebras/llama3.1-70b";
      } catch (cerebrasErr) {
        console.warn("[keyword-gap] Cerebras failed, falling back to Groq:", (cerebrasErr as Error).message);

        // ── Tier 3: Groq (last resort) ──────────────────────────────────
        const fallback = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0,
          top_p: 1,
          seed: 42,
          max_tokens: 8192,
        });
        raw = fallback.choices[0]?.message?.content ?? "";
        modelUsed = "Groq/llama-3.3-70b";
      }
    }

    console.log(`[keyword-gap] Model used: ${modelUsed}`);

    const noThink = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    const start = noThink.indexOf("{");
    const end = noThink.lastIndexOf("}");

    if (start === -1 || end === -1) {
      console.error("Model output:", raw);
      throw new Error("Invalid output format from model.");
    }

    const jsonStr = noThink.slice(start, end + 1);
    const sanitized = sanitizeJsonStrings(jsonStr);
    let analysis;
    try {
      analysis = JSON.parse(sanitized);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("\n\n--- JSON PARSE ERROR ---");
      console.error(errorMessage);
      console.error("--- RAW MODEL OUTPUT ---");
      console.error(raw);
      console.error("--- SANITIZED EXTRACT ---");
      console.error(sanitized);
      console.error("------------------------\n\n");
      throw new Error(errorMessage);
    }

    // Save to MongoDB
    if (userId) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db("nexthire");
        await db.collection("keyword_analyses").insertOne({
          userId,
          role,
          industry,
          atsScore: analysis.atsScore,
          totalKeywords: analysis.keywords?.length ?? 0,
          highPriorityMissing: (analysis.keywords ?? []).filter(
            (k: { priority: string; matchType: string }) =>
              k.priority === "High" && k.matchType === "Missing"
          ).length,
          benchmark: analysis.benchmark,
          keywords: (analysis.keywords ?? []).slice(0, 30),
          sectionGaps: analysis.sectionGaps ?? [],
          jobPreview: jobDescription.slice(0, 300),
          createdAt: new Date(),
        });
      } catch (dbErr) {
        console.error("[keyword-gap] Failed to save:", dbErr);
      }
    }

    return Response.json({ analysis });

  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json(
      { error: `Analysis failed: ${message}` },
      { status: 500 }
    );
  }
}