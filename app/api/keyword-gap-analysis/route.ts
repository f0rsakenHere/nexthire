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

        const { role, industry, jobDescription, resume } = body;

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

        const completion = await client.chat.completions.create({
            model: "minimaxai/minimax-m2.1",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            max_tokens: 8192,
        });

        const raw = completion.choices[0]?.message?.content ?? "";
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