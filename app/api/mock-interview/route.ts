import OpenAI from "openai";

const client = new OpenAI({
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
      if (ch === "\r") {               i++; continue; } 
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

    if (action === "generate") {
      const { role, company, jobDescription } = body;
      
      const prompt = `You are an expert technical interviewer hiring for:
Role: ${role}
Company: ${company || "A tech company"}
${jobDescription ? `Job Description: ${jobDescription}` : ""}

Generate exactly 5 tailored interview questions for this specific role. Include a mix of technical, behavioral, and situational questions.
Return ONLY a valid JSON array of objects, with no markdown formatting or extra text.
Format:
[
  { "id": "1", "question": "...", "category": "Technical | Behavioral | Situational" }, ...
]`;

      const completion = await client.chat.completions.create({
        model: "minimaxai/minimax-m2.1",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 1000,
      });

      const raw = completion.choices[0]?.message?.content ?? "";
      const noThink = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
      const start = noThink.indexOf("[");
      const end = noThink.lastIndexOf("]");
      if (start === -1 || end === -1) {
        console.error("Model output:", raw);
        throw new Error("Invalid output format from model.");
      }
      
      const jsonStr = noThink.slice(start, end + 1);
      const sanitized = sanitizeJsonStrings(jsonStr);
      const questions = JSON.parse(sanitized);

      return Response.json({ questions });
    }

    if (action === "evaluate") {
      const { role, qna } = body; 
      // qna is [{ question, answer }]
      
      const prompt = `You are an expert technical interviewer evaluating a candidate for the role of ${role}.
Review the candidate's answers to the following questions. Provide constructive feedback, a score out of 10, and an example of a great answer.
Return ONLY a valid JSON array of objects matching the input array order, with no markdown formatting or extra text.

Candidate Q&A:
${JSON.stringify(qna, null, 2)}

Format required:
[
  { 
    "score": <number 0-10>, 
    "feedback": "<string: concise critique of what they did well and what is missing>",
    "improvement": "<string: how to improve the answer>"
  },
  ...
]`;

      const completion = await client.chat.completions.create({
        model: "minimaxai/minimax-m2.1",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 2000,
      });

      const raw = completion.choices[0]?.message?.content ?? "";
      const noThink = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
      const start = noThink.indexOf("[");
      const end = noThink.lastIndexOf("]");
      if (start === -1 || end === -1) {
        console.error("Model output:", raw);
        throw new Error("Invalid output format from model.");
      }

      const jsonStr = noThink.slice(start, end + 1);
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
