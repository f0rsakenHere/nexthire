import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  try {
    const client = await clientPromise;
    const db = client.db("nexthire");
    const analyses = await db
      .collection("keyword_analyses")
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(
      analyses.map((a) => ({
        id: a._id.toString(),
        role: a.role,
        industry: a.industry,
        atsScore: a.atsScore,
        totalKeywords: a.totalKeywords,
        highPriorityMissing: a.highPriorityMissing,
        benchmark: a.benchmark,
        keywords: a.keywords ?? [],
        sectionGaps: a.sectionGaps ?? [],
        jobPreview: a.jobPreview ?? "",
        createdAt: a.createdAt,
      }))
    );
  } catch (err) {
    console.error("[keyword-history]", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
