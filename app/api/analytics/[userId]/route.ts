import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  req: Request,
  context: { params: Promise <{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    const client = await clientPromise;
    const db = client.db();

    const interviewCollection = db.collection("interview_sessions");
    const applicationCollection = db.collection("applications");
    const keywordCollection = db.collection("keyword_analyses");
    const resumeCollection = db.collection("resume_scores");

    // =========================
    // Interviews
    // =========================

    const interviews = await interviewCollection
      .find({ userId })
      .toArray();

    const totalInterviews = interviews.length;

    const totalQuestions = interviews.reduce(
      (sum, item) => sum + (item.totalQuestions || 0),
      0
    );

    const avgInterviewScore =
      interviews.reduce((sum, item) => sum + (item.avgScore || 0), 0) /
        (interviews.length || 1);

    // =========================
    // Applications
    // =========================

    const applications = await applicationCollection
      .find({ userId })
      .toArray();

    const totalApplications = applications.length;

    const statusBreakdown: Record<string, number> = {};

    applications.forEach((app) => {
      const status = app.status || "unknown";
      statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
    });

    // =========================
    // Resume Score
    // =========================

    const resume = await resumeCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    const latestResume = resume[0] || null;

    // =========================
    // Keyword Analysis
    // =========================

    const keyword = await keywordCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    const latestKeyword = keyword[0] || null;

    // =========================
    // Final Analytics Object
    // =========================

    const analytics = {
      interviews: {
        totalInterviews,
        totalQuestions,
        avgInterviewScore: Number(avgInterviewScore.toFixed(2)),
      },

      applications: {
        totalApplications,
        statusBreakdown,
      },

      resume: {
        atsScore: latestResume?.ats_score || null,
        strengths: latestResume?.top_strengths || [],
        improvements: latestResume?.top_improvements || [],
      },

      keywords: {
        atsScore: latestKeyword?.atsScore || null,
        totalKeywords: latestKeyword?.totalKeywords || 0,
        missingKeywords:
          latestKeyword?.keywords?.filter(
            (k: any) => k.matchType === "Missing"
          ).length || 0,
      },
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Analytics API error:", error);

    return NextResponse.json(
      { error: "Failed to load analytics" },
      { status: 500 }
    );
  }
}