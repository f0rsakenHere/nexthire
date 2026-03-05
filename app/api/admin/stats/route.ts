// app/api/admin/stats/route.ts (যদি app dir ব্যবহার কর)
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectDB();

    // প্রতিটি কালেকশনের document count নেওয়া
    const totalUsers = await db.collection("users").countDocuments();
    const totalResumes = await db.collection("resumes").countDocuments();
    const totalInterviews = await db.collection("interviews").countDocuments();

    const userGrowth = 12; // temporary
    const resumeGrowth = 8;
    const interviewGrowth = 5;

    return NextResponse.json({
      totalUsers,
      totalResumes,
      totalInterviews,
      userGrowth,
      resumeGrowth,
      interviewGrowth,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
