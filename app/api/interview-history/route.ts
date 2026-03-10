import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  try {
    const client = await clientPromise;
    const db = client.db("nexthire");
    const sessions = await db
      .collection("interview_sessions")
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(
      sessions.map((s) => ({
        id: s._id.toString(),
        role: s.role,
        company: s.company ?? "",
        interviewType: s.interviewType ?? "text",
        avgScore: s.avgScore,
        totalQuestions: s.totalQuestions,
        questions: s.questions ?? [],
        createdAt: s.createdAt,
      }))
    );
  } catch (err) {
    console.error("[interview-history]", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
