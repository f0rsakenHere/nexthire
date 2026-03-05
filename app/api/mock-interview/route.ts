import OpenAI from "openai";
import Groq from "groq-sdk";

// Allow up to 120 seconds — MiniMax evaluation can take 60–90s
export const maxDuration = 120;

// Groq — ultra-fast, used for question generation
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// MiniMax via NVIDIA — high-quality, used for evaluation
const nvidia = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

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

    // ── GENERATE: Groq (fast) ────────────────────────────────────────────────
    if (action === "generate") {
      const { role, company, jobDescription } = body;

      const prompt = `You are an expert technical interviewer hiring for:
Role: ${role}
Company: ${company || "A tech company"}
${jobDescription ? `Job Description: ${jobDescription}` : ""}

Generate exactly 5 tailored interview questions for this specific role. Include a mix of technical, behavioral, and situational questions.
Return ONLY a valid JSON array of objects, with no markdown formatting, no code fences, no extra text before or after.
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
        max_tokens: 900, // 5 questions need ~400-600 tokens max
      });

      const raw = completion.choices[0]?.message?.content ?? "";
      const noFences = raw.replace(/```[a-z]*\n?/gi, "").trim();
      const start = noFences.indexOf("[");
      const end = noFences.lastIndexOf("]");
      if (start === -1 || end === -1) {
        console.error("Groq output:", raw);
        throw new Error("Invalid output format from model.");
      }

      const jsonStr = noFences.slice(start, end + 1);
      const sanitized = sanitizeJsonStrings(jsonStr);
      const questions = JSON.parse(sanitized);

      return Response.json({ questions });
    }

    // ── EVALUATE: MiniMax via NVIDIA (high quality) ──────────────────────────
    if (action === "evaluate") {
      const { role, qna } = body;

      const prompt = `You are an expert technical interviewer evaluating a candidate for the role of ${role}.
Review the candidate's answers to the following questions. Provide constructive feedback, a score out of 10, and specific advice on how they can improve.
Return ONLY a valid JSON array of objects matching the input array order, with no markdown formatting or extra text.

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

      const completion = await nvidia.chat.completions.create({
        model: "minimaxai/minimax-m2.1",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 4096, // Evaluation of 5 answers needs ~1500-2500 tokens
      });

      const raw = completion.choices[0]?.message?.content ?? "";
      const noThink = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
      const noFences = noThink.replace(/```[a-z]*\n?/gi, "").trim();
      const start = noFences.indexOf("[");
      const end = noFences.lastIndexOf("]");
      if (start === -1 || end === -1) {
        console.error("MiniMax output:", raw);
        throw new Error("Invalid output format from model.");
      }

      const jsonStr = noFences.slice(start, end + 1);
      const sanitized = sanitizeJsonStrings(jsonStr);
      const reviews = JSON.parse(sanitized);

      return Response.json({ reviews });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });

  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: `Operation failed: ${message}` }, { status: 500 });
  }
}
