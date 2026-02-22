import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) resume analyst and career coach with 15+ years of experience at top tech companies.

Analyze the provided resume and return ONLY a valid JSON object — no markdown, no explanation, no extra text outside the JSON.

The JSON must follow this exact schema:
{
  "ats_score": <number 0-100>,
  "sections": {
    "formatting": {
      "score": <number 0-100>,
      "issues": [<string>, ...]
    },
    "impact": {
      "score": <number 0-100>,
      "feedback": <string>
    },
    "keywords": {
      "score": <number 0-100>,
      "found": [<string>, ...],
      "missing": [<string>, ...]
    },
    "experience": {
      "score": <number 0-100>,
      "feedback": <string>
    },
    "education": {
      "score": <number 0-100>,
      "feedback": <string>
    }
  },
  "top_strengths": [<string>, <string>, <string>],
  "top_improvements": [<string>, <string>, <string>, <string>, <string>],
  "recruiter_verdict": <string — one sentence on what a recruiter would think>,
  "summary": <string — 2-3 sentence overall summary>
}

Be strict, honest and actionable. If a job description is provided, tailor keyword analysis to it.`;

export async function POST(request: Request) {
  const body = await request.json();
  const { resume, jobDescription } = body;

  if (!resume || typeof resume !== "string" || resume.trim().length < 50) {
    return Response.json(
      { error: "Please provide a resume with at least 50 characters." },
      { status: 400 }
    );
  }

  const userMessage = jobDescription
    ? `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jobDescription}`
    : `RESUME:\n${resume}`;

  try {
    const completion = await client.chat.completions.create({
      model: "minimaxai/minimax-m2.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3, // lower = more deterministic JSON
      top_p: 0.9,
      max_tokens: 4096,
      stream: false,
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    // 1. Strip <think>...</think> reasoning blocks (some models emit these)
    const noThink = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    // 2. Extract the JSON object by finding the first '{' and last '}'
    //    This is immune to markdown fences, extra text, trailing notes, etc.
    const start = noThink.indexOf("{");
    const end   = noThink.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      console.error("Raw model output:", raw);
      throw new Error("Model did not return a JSON object. Raw: " + noThink.slice(0, 200));
    }

    const jsonStr = noThink.slice(start, end + 1);
    const result  = JSON.parse(jsonStr);
    return Response.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: `Analysis failed: ${message}` }, { status: 500 });
  }
}
