# 📄 NextHire AI Resume Scorer — Full Documentation

> Written simply enough for anyone with a tiny bit of JavaScript knowledge to understand.

---

## 🧠 The Big Picture — What Does This Thing Actually Do?

Imagine you have a teacher who has read **thousands of resumes** and knows exactly what hiring companies look for. You hand your resume to this teacher and they:

1. Give your resume a **score out of 100**
2. Tell you what's **good** about it
3. Tell you what's **broken or missing**
4. Give you a **ranked list of things to fix**

That's exactly what the AI Resume Scorer does — but the "teacher" is an AI (the MiniMax M2.1 model from NVIDIA's API).

---

## 📁 Files Involved

```
nexthire/
├── .env.local                                   ← Your secret API key (never shared)
├── app/
│   └── api/
│       ├── chat/
│       │   └── route.ts                         ← General chat API (streaming)
│       └── resume-score/
│           └── route.ts                         ← Resume scorer API (this is the main one)
└── app/(dashboard)/dashboard/
    └── resume-scorer/
        └── page.tsx                             ← The page users see in the browser
```

---

## 🔑 Part 1 — The Secret Key (`.env.local`)

### What is it?

Think of the AI model like a **private club**. To get in, you need a **membership card** (the API key). Without it, the AI won't talk to you.

```env
NVIDIA_API_KEY=nvapi-xxxxxxxxxxxxxxxxxxxx
```

### Why `.env.local` and not in the code?

If you write the key directly in your code and push it to GitHub, **anyone in the world can see it and steal it**. The `.env.local` file is:

- Automatically **ignored by Git** (it won't be uploaded)
- Only available on **your own computer / your own server**
- Accessed in the code using `process.env.NVIDIA_API_KEY`

### How Next.js reads it

```ts
// In your API route:
apiKey: process.env.NVIDIA_API_KEY;
//              ↑
// Next.js automatically reads this from .env.local
// It's available ONLY on the server — never sent to the browser
```

> ⚠️ **Important:** If you change `.env.local`, you must **restart** `npm run dev` for changes to take effect.

---

## 🛠️ Part 2 — How the API Was Created

### What is an API route in Next.js?

Normally, when you visit a URL like `/dashboard`, Next.js shows you a webpage. But if you create a file inside `app/api/`, that URL becomes an **API endpoint** — meaning it can receive data, do something with it, and send back a response. Just like a restaurant:

```
You (the browser)  →  sends order (resume text)  →  Kitchen (API route)
Kitchen            →  cooks the meal (asks AI)    →  sends back result (JSON data)
```

### File: `app/api/resume-score/route.ts`

Here's the full flow explained piece by piece:

#### Step 1 — Set up the AI client

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1", // ← NVIDIA's server address
  apiKey: process.env.NVIDIA_API_KEY, // ← Your secret key
});
```

This is like getting your phone ready to call NVIDIA's AI. The `baseURL` is the phone number, and the `apiKey` is your ID.

#### Step 2 — The System Prompt (The AI's "Instructions")

```ts
const SYSTEM_PROMPT = `You are an expert ATS resume analyst...
Return ONLY a valid JSON object with this structure:
{
  "ats_score": 84,
  "sections": { ... },
  ...
}`;
```

A **system prompt** is like giving the AI a **job description before it starts work**. We're telling it:

- You are a resume expert
- You will ONLY respond in JSON format (no extra words)
- Here is the exact structure of JSON we need

This is critical — without it, the AI might just chat back with a paragraph of text, which is useless for our code.

#### Step 3 — Receive the Request

```ts
export async function POST(request: Request) {
  const body = await request.json();
  const { resume, jobDescription } = body;
```

When the browser sends the resume text to `/api/resume-score`, this function runs. It reads the resume text and (optional) job description from the request.

`POST` means data is being **sent to** the server (like submitting a form). It's different from `GET` which just **reads** something.

#### Step 4 — Build the User Message

```ts
const userMessage = jobDescription
  ? `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jobDescription}`
  : `RESUME:\n${resume}`;
```

We format the resume (and optionally the job description) into a clean message to send to the AI. If a job description is provided, we include it so the AI can compare keywords.

#### Step 5 — Call the AI

```ts
const completion = await client.chat.completions.create({
  model: "minimaxai/minimax-m2.1", // The AI model we're using
  messages: [
    { role: "system", content: SYSTEM_PROMPT }, // AI's instructions
    { role: "user", content: userMessage }, // The actual resume
  ],
  temperature: 0.3, // Low = more consistent/predictable output
  max_tokens: 4096, // Max length of the response
  stream: false, // We want the FULL answer at once (not word by word)
});
```

`temperature` is like how "creative" the AI is:

- `0.0` = Robot mode — always the same boring answer
- `1.0` = Wild mode — different every time
- `0.3` = What we use — consistent but not robotic

We use `stream: false` here because we need the **complete JSON** before we can parse it. (The chat API uses `stream: true` because we're printing words one at a time like a typewriter.)

#### Step 6 — Clean and Parse the Response

```ts
const raw = completion.choices[0]?.message?.content ?? "";

// 1. Strip <think>...</think> blocks
const noThink = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

// 2. Find the { ... } JSON object
const start = noThink.indexOf("{");
const end = noThink.lastIndexOf("}");
const jsonStr = noThink.slice(start, end + 1);

const result = JSON.parse(jsonStr);
```

The AI sometimes wraps its answer with extra text like:

````
<think>Let me analyze this resume carefully...</think>
```json
{ "ats_score": 84, ... }
````

````

We don't want any of that — we just want the `{ ... }` part. So we:
1. Remove the `<think>` block (the AI talking to itself)
2. Find where the `{` starts and `}` ends
3. Cut out just that slice of text
4. Parse it as JSON

#### Step 7 — Send it Back

```ts
return Response.json(result);
````

That's it! We send the clean JSON object back to the browser.

---

## 🌐 Part 3 — How to Call the API

### Option A — From the browser (JavaScript/React)

```js
const response = await fetch("/api/resume-score", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    resume: "John Doe\nSoftware Engineer\n5 years experience...",
    jobDescription: "We are looking for a React developer...", // optional
  }),
});

const data = await response.json();
console.log(data.ats_score); // e.g. 84
console.log(data.top_improvements); // ["Add metrics to bullet points", ...]
```

### Option B — From the terminal (PowerShell on Windows)

```powershell
$body = '{"resume": "John Doe\nSoftware Engineer\n5 years React experience"}';
Invoke-RestMethod -Uri http://localhost:3000/api/resume-score -Method Post -ContentType "application/json" -Body $body
```

### What you get back (the JSON response)

```json
{
  "ats_score": 84,

  "sections": {
    "formatting": {
      "score": 78,
      "issues": ["Inconsistent bullet points", "Missing phone number"]
    },
    "impact": {
      "score": 82,
      "feedback": "Good use of action verbs but lacks quantified results."
    },
    "keywords": {
      "score": 71,
      "found": ["React", "TypeScript", "Node.js"],
      "missing": ["Redux", "CI/CD", "Agile"]
    },
    "experience": {
      "score": 85,
      "feedback": "5 years is solid but project descriptions are vague."
    },
    "education": {
      "score": 60,
      "feedback": "No graduation year listed. Add it."
    }
  },

  "top_strengths": [
    "Strong TypeScript expertise",
    "Full-stack experience",
    "Clean project structure"
  ],

  "top_improvements": [
    "Add numbers to achievements (e.g. 'improved speed by 40%')",
    "Include missing keywords: Redux, CI/CD",
    "Add graduation year to education section",
    "Fix inconsistent bullet point formatting",
    "Add a LinkedIn URL"
  ],

  "recruiter_verdict": "Solid background but needs more impact metrics to stand out.",

  "summary": "This is a competent resume for a mid-level engineer. The technical skills are strong but the lack of quantified achievements and some formatting inconsistencies may cause ATS filters to score it lower than it deserves."
}
```

---

## 🖥️ Part 4 — How the Page Works (`resume-scorer/page.tsx`)

This is the file that creates the **visual page** users see in the browser.

### State Variables — The Page's "Memory"

```ts
const [resume, setResume] = useState(""); // what the user typed
const [jobDesc, setJobDesc] = useState(""); // the job description (optional)
const [loading, setLoading] = useState(false); // is it currently analyzing?
const [result, setResult] = useState(null); // the AI's answer (or null)
const [error, setError] = useState(null); // any error message
```

Think of `useState` like **sticky notes** the page keeps track of. When a sticky note changes, the page automatically redraws to show the new state.

### The Full User Journey

```
👤 User pastes resume into textarea
          ↓
🖱️ Clicks "Score My Resume" button
          ↓
⚙️ handleScore() function runs:
   - Validates resume isn't too short
   - Sets loading = true (shows spinner)
   - Calls fetch("/api/resume-score", { body: resume text })
   - Waits for the server to respond (can take 10-20 seconds)
          ↓
🤖 API route (on the server):
   - Receives the resume
   - Sends it to NVIDIA's AI model
   - Waits for the AI to analyze it
   - Cleans up the response
   - Returns structured JSON
          ↓
📊 Page receives the JSON:
   - Sets result = the JSON data
   - Sets loading = false
   - React redraws the page to show results
```

### The Score Ring (SVG Circle)

```tsx
function ScoreRing({ score }: { score: number }) {
  const r = 54;                          // radius of the circle
  const circ = 2 * Math.PI * r;         // circumference = ~339px
  const filled = (score / 100) * circ;  // how much to fill based on score
  const color = score >= 80 ? "#22d3ee" // cyan  (great)
              : score >= 60 ? "#f59e0b" // amber (ok)
              : "#f87171";              // red   (needs work)
```

An SVG circle has a `strokeDasharray` property — imagine the border of the circle is made of a dashed line. By controlling how long the "dash" is, you control how much of the circle is filled. If the score is 84/100, then 84% of the circle border is filled.

### The Section Bars

```tsx
function SectionBar({ label, score, icon }) {
  const color =
    score >= 80
      ? "from-cyan-500 to-blue-500" // great
      : score >= 60
        ? "from-amber-500 to-orange-500" // ok
        : "from-rose-500 to-red-500"; // bad

  return (
    <div>
      <div className="h-1 rounded-full bg-white/5">
        <div
          style={{ width: `${score}%` }}
          className={`bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}
```

The grey background bar is always 100% wide. The coloured fill bar has its `width` set to whatever the score is (e.g. `width: 72%`). Simple!

---

## 🔄 Part 5 — Complete Data Flow Diagram

```
Browser (page.tsx)                     Server (route.ts)              NVIDIA AI
      │                                       │                            │
      │  1. User clicks "Score My Resume"     │                            │
      │                                       │                            │
      │──── POST /api/resume-score ──────────►│                            │
      │     { resume: "...", jobDesc: "..." } │                            │
      │                                       │                            │
      │                                       │──── Ask AI ───────────────►│
      │                                       │     { system: "...",       │
      │                                       │       user: "RESUME:..." } │
      │                                       │                            │
      │                                       │◄─── AI responds ───────────│
      │                                       │     (raw text with JSON)   │
      │                                       │                            │
      │                                       │  Strip <think> blocks      │
      │                                       │  Extract { } JSON          │
      │                                       │  Parse it                  │
      │                                       │                            │
      │◄──── JSON response ──────────────────│                            │
      │  { ats_score: 84, sections: {...} }   │                            │
      │                                       │                            │
      │  Update state: setResult(data)        │                            │
      │  React redraws the page               │                            │
      │  → Score ring, bars, pills shown      │                            │
```

---

## ❓ Common Questions

### Q: Why does it take 10-20 seconds?

The AI model has to **read your entire resume**, think about it carefully, and write a detailed structured report. It's doing a lot of work! The loading spinner shows while you wait.

### Q: Can I use my own resume?

Yes! Just paste the plain text of your resume into the textarea. For best results:

- Remove images, tables, and fancy formatting
- Use plain text (copy from Word or PDF)
- Include the job description for better keyword analysis

### Q: What does "ATS" mean?

**Applicant Tracking System** — most big companies use software to automatically scan and filter resumes before a human ever sees them. An ATS score tells you how well your resume passes those automated filters.

### Q: Why do we use `temperature: 0.3`?

We need the AI to return **consistent, predictable JSON** every time. Low temperature = less random = more reliable JSON structure. If we used `temperature: 1.0`, the AI might format the JSON differently each time, breaking our parser.

### Q: What if the API key doesn't work?

1. Make sure `.env.local` exists in the root of the project
2. Check the key starts with `nvapi-`
3. Restart `npm run dev` after editing `.env.local`
4. Generate a new key at [integrate.api.nvidia.com](https://integrate.api.nvidia.com) if it expired

---

## 📚 Summary — The 60-Second Version

1. **User** pastes resume on the page and clicks a button
2. **Browser** sends the resume text to `/api/resume-score` using `fetch()`
3. **API route** (running secretly on the server) receives it
4. **API route** adds a system prompt telling the AI "be a resume expert, return only JSON"
5. **NVIDIA's AI model** reads the resume and writes a detailed JSON report
6. **API route** cleans up the AI's response (removes `<think>` blocks, finds the `{}`)
7. **Browser** receives the JSON and React re-renders the page with score rings, bars, pills, and improvement tips
8. **User** knows exactly what to fix to land the job 🎯
