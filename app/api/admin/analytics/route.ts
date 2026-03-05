import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  const db = await connectDB();

  const dailyActiveUsers = await db
    .collection("users")
    .countDocuments({
      lastActive: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    });

  const resumesThisWeek = await db
    .collection("resumes")
    .find({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    })
    .toArray();

  const averageResumeScore =
    resumesThisWeek.length > 0
      ? Math.round(
          resumesThisWeek.reduce((acc, r: any) => acc + r.score, 0) /
            resumesThisWeek.length,
        )
      : 0;

  const mockInterviews = await db
    .collection("interviews")
    .countDocuments({
      createdAt: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    });

  const newUsersToday = await db
    .collection("users")
    .countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    });

  const interviewsToday = await db
    .collection("interviews")
    .countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    });

  return NextResponse.json({
    dailyActiveUsers,
    averageResumeScore,
    mockInterviews,
    newUsersToday,
    resumesThisWeek: resumesThisWeek.length,
    interviewsToday,
  });
}
