import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET /api/resume-history?userId=<firebase_uid>
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("nexthire");
    const scores = await db
      .collection("resume_scores")
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(
      scores.map((s) => ({
        id: s._id.toString(),
        ats_score: s.ats_score,
        sections: s.sections,
        top_strengths: s.top_strengths ?? [],
        top_improvements: s.top_improvements ?? [],
        recruiter_verdict: s.recruiter_verdict ?? "",
        keywords_found: s.keywords_found ?? [],
        keywords_missing: s.keywords_missing ?? [],
        resume_preview: s.resume_preview ?? "",
        had_job_description: s.had_job_description ?? false,
        createdAt: s.createdAt,
      }))
    );
  } catch (err) {
    console.error("[resume-history]", err);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
