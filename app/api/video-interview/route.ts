import OpenAI from "openai";
import Groq from "groq-sdk";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import clientPromise from "@/lib/mongodb";

// Allow up to 120 seconds — MiniMax evaluation can take 60–90s
export const maxDuration = 120;

// Groq — ultra-fast, used for question generation only
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// MiniMax via NVIDIA — high-quality, used for evaluation
const nvidia = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

// Cerebras — ultra-fast fallback for evaluation when MiniMax times out
const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

// Race a promise against a timeout — if MiniMax hangs, reject fast
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

    // ── GENERATE QUESTIONS: Groq (fast) ──────────────────────────────────────
    if (action === "generate") {
      const { role, company, jobDescription } = body;

      const prompt = `You are an expert technical interviewer conducting a VIDEO interview for:
Role: ${role}
Company: ${company || "A tech company"}
${jobDescription ? `Job Description: ${jobDescription}` : ""}

Generate exactly 5 tailored interview questions suited for a video format (conversational, open-ended, allow candidates to demonstrate communication skills).
Include a mix of technical, behavioral, and situational questions.
Return ONLY a valid JSON array of objects, with no markdown formatting, no code fences, no extra text.
Format:
[
  { "id": "1", "question": "...", "category": "Technical | Behavioral | Situational" },
  ...
]

CRITICAL: Never use unescaped double quotes inside any JSON string value. Use single quotes if quoting.`;

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
        max_tokens: 900,
      });

      const raw = completion.choices[0]?.message?.content ?? "";
      const noFences = raw.replace(/```[a-z]*\n?/gi, "").trim();
      const start = noFences.indexOf("[");
      const end = noFences.lastIndexOf("]");
      if (start === -1 || end === -1) {
        console.error("[video-interview] Groq generate output:", raw);
        throw new Error("Invalid output format from model.");
      }

      const jsonStr = noFences.slice(start, end + 1);
      const sanitized = sanitizeJsonStrings(jsonStr);
      const questions = JSON.parse(sanitized);

      return Response.json({ questions });
    }

    // ── EVALUATE SPOKEN ANSWERS: MiniMax → Cerebras fallback ─────────────────
    if (action === "evaluate") {
      const { role, qna, userId, company } = body;

      const prompt = `You are an expert interviewer evaluating a candidate's SPOKEN video interview answers for the role of ${role} at ${company || "a tech company"}.
The answers were transcribed from speech so may contain minor transcription errors — evaluate the content and intent, not perfect grammar.
Provide constructive feedback, a score out of 10, and specific actionable advice.
Return ONLY a valid JSON array of objects matching the input array order, with no markdown or extra text.

Candidate Q&A:
${JSON.stringify(qna, null, 2)}

Format required:
[
  {
    "score": <number 0-10>,
    "feedback": "<concise critique of what they did well and what is missing>",
    "improvement": "<specific actionable advice to improve the answer>"
  },
  ...
]

CRITICAL: Never use unescaped double quotes inside any JSON string value. Use single quotes if quoting.`;

      let rawEval = "";

      try {
        // Primary: MiniMax via NVIDIA — 45s timeout, then fall back to Cerebras
        const completion = await withTimeout(
          nvidia.chat.completions.create({
            model: "minimaxai/minimax-m2.1",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.4,
            max_tokens: 1500,
          }),
          45_000,
        );
        rawEval = completion.choices[0]?.message?.content ?? "";
        console.log("[video-interview] Used MiniMax via NVIDIA");
      } catch (nvidiaErr) {
        // Fallback: Cerebras llama3.1-70b (ultra-fast)
        console.warn("[video-interview] MiniMax failed, falling back to Cerebras:", nvidiaErr);
        const fallback = await cerebras.chat.completions.create({
          model: "llama3.1-70b",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.4,
          max_completion_tokens: 1500,
          stream: false,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rawEval = ((fallback as any).choices?.[0]?.message?.content as string) ?? "";
        console.log("[video-interview] Used Cerebras fallback");
      }

      const noThink = rawEval.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
      const noFences = noThink.replace(/```[a-z]*\n?/gi, "").trim();
      const start = noFences.indexOf("[");
      const end = noFences.lastIndexOf("]");
      if (start === -1 || end === -1) {
        console.error("[video-interview] Evaluate raw output:", rawEval);
        throw new Error("Invalid output format from evaluation model. Please try again.");
      }

      const jsonStr = noFences.slice(start, end + 1);
      const sanitized = sanitizeJsonStrings(jsonStr);
      const reviews = JSON.parse(sanitized);

      // Save to MongoDB
      if (userId) {
        try {
          const mongoClient = await clientPromise;
          const db = mongoClient.db("nexthire");
          const avgScore =
            reviews.reduce((s: number, r: { score: number }) => s + r.score, 0) /
            reviews.length;
          await db.collection("interview_sessions").insertOne({
            userId,
            role,
            company: company ?? "",
            interviewType: "video",
            questions: qna.map((q: { question: string; answer: string }, i: number) => ({
              question: q.question,
              answer: q.answer,
              score: reviews[i]?.score ?? 0,
              feedback: reviews[i]?.feedback ?? "",
              improvement: reviews[i]?.improvement ?? "",
            })),
            avgScore: Math.round(avgScore * 10) / 10,
            totalQuestions: qna.length,
            createdAt: new Date(),
          });
        } catch (dbErr) {
          console.error("[video-interview] Failed to save session:", dbErr);
        }
      }

      return Response.json({ reviews });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });

  } catch (err) {
    console.error("[video-interview]", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: `Operation failed: ${message}` }, { status: 500 });
  }
}
