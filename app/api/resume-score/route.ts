import OpenAI from "openai";
import Groq from "groq-sdk";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import clientPromise from "@/lib/mongodb";


export const maxDuration = 120;


const nvidia = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});


const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    ),
  ]);
}

const SYSTEM_PROMPT = `You are an expert ATS resume analyst. Analyze the resume and return ONLY a valid JSON object with no extra text, no markdown fences.

Required JSON schema (all fields mandatory):
{
  "ats_score": <number 0-100>,
  "sections": {
    "formatting": { "score": <number 0-100>, "issues": [<string>, ...] },
    "impact":     { "score": <number 0-100>, "feedback": <string> },
    "keywords":   { "score": <number 0-100>, "found": [<string>, ...], "missing": [<string>, ...] },
    "experience": { "score": <number 0-100>, "feedback": <string> },
    "education":  { "score": <number 0-100>, "feedback": <string> }
  },
  "top_strengths":    [<string>, <string>, <string>],
  "top_improvements": [<string>, <string>, <string>, <string>, <string>],
  "recruiter_verdict": <string — one sentence>,
  "summary": <string — 2-3 sentences>
}

Formatting rules to apply when analyzing:
- Treat the bullet character (•) as the ONLY list marker. A tab character after • is normal plain-text formatting, NOT a second list style.
- Section headers (e.g. "EXPERIENCE", "EDUCATION") and role/company lines (e.g. "Company | Title | Date") are structural separators, NOT list items. Do NOT flag them as inconsistent with bulleted sub-items.
- Only flag genuinely mixed markers such as mixing dashes (-), asterisks (*), and bullets (•) in the SAME section.
- IMPORTANT: If no job description is provided, do NOT reference "job requirements", "the role", or "the position" anywhere in your output. All feedback must be general resume best-practice advice only.
- Be strict and actionable on substance. If a job description is provided, tailor keyword analysis to it.`;

const MAX_RESUME_CHARS = 6000;
const MAX_JD_CHARS = 3000;

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
      if (ch === "\r") {               i++; continue; } 
      if (ch === "\t") { result += "\\t"; i++; continue; }
    }

    result += ch;
    i++;
  }

  return result;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { resume, jobDescription, userId } = body;
  if (!resume || typeof resume !== "string" || resume.trim().length < 50) {
    return Response.json(
      { error: "Please provide a resume with at least 50 characters." },
      { status: 400 }
    );
  }

  const trimmedResume = resume.trim().slice(0, MAX_RESUME_CHARS);
  const trimmedJD = jobDescription
    ? jobDescription.trim().slice(0, MAX_JD_CHARS)
    : null;

  const userMessage = trimmedJD
    ? `RESUME:\n${trimmedResume}\n\nJOB DESCRIPTION:\n${trimmedJD}`
    : `RESUME:\n${trimmedResume}`;

  try {
    let raw = "";
    let modelUsed = "";

    
    try {
      const completion = await withTimeout(
        nvidia.chat.completions.create({
          model: "minimaxai/minimax-m2.1",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          temperature: 0,
          top_p: 1,
          max_tokens: 1500,
          stream: false,
        }),
        55_000,
      );
      raw = completion.choices[0]?.message?.content ?? "";
      modelUsed = "MiniMax/NVIDIA";
    } catch (nvidiaErr) {
      console.warn("[resume-score] MiniMax unavailable/timeout, trying Cerebras:", (nvidiaErr as Error).message);

      
      try {
        const cbCompletion = await cerebras.chat.completions.create({
          model: "llama3.1-70b",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          temperature: 0,
          top_p: 1,
          max_completion_tokens: 1500,
          stream: false,
        });
        interface CerebrasResponse {
          choices?: Array<{ message?: { content?: string | null } }>;
        }
        raw = ((cbCompletion as unknown as CerebrasResponse).choices?.[0]?.message?.content) ?? "";
        modelUsed = "Cerebras/llama3.1-70b";
      } catch (cerebrasErr) {
        console.warn("[resume-score] Cerebras failed, falling back to Groq:", (cerebrasErr as Error).message);

        
        const fallback = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          temperature: 0,
          top_p: 1,
          seed: 42,
          max_tokens: 1500,
        });
        raw = fallback.choices[0]?.message?.content ?? "";
        modelUsed = "Groq/llama-3.3-70b";
      }
    }

    console.log(`[resume-score] Model used: ${modelUsed}`);
  
    const noThink = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    const start = noThink.indexOf("{");
    const end   = noThink.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      console.error("Raw model output:", raw);
      throw new Error("Model did not return a JSON object.");
    }

    const jsonStr = noThink.slice(start, end + 1);

    const sanitized = sanitizeJsonStrings(jsonStr);

    const result = JSON.parse(sanitized);

    if (userId) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db("nexthire");
        await db.collection("resume_scores").insertOne({
          userId,
          ats_score: result.ats_score,
          sections: {
            formatting: result.sections?.formatting?.score ?? 0,
            impact: result.sections?.impact?.score ?? 0,
            keywords: result.sections?.keywords?.score ?? 0,
            experience: result.sections?.experience?.score ?? 0,
            education: result.sections?.education?.score ?? 0,
          },
          top_strengths: result.top_strengths ?? [],
          top_improvements: result.top_improvements ?? [],
          recruiter_verdict: result.recruiter_verdict ?? "",
          keywords_found: result.sections?.keywords?.found ?? [],
          keywords_missing: result.sections?.keywords?.missing ?? [],
          resume_preview: trimmedResume.slice(0, 200),
          had_job_description: !!trimmedJD,
          createdAt: new Date(),
        });
      } catch (dbError) {
        console.error("[resume-score] Failed to save to MongoDB:", dbError);
      }
    }

    return Response.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: `Analysis failed: ${message}` }, { status: 500 });
  }
}
