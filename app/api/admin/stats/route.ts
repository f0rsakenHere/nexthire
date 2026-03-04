import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  const db = await connectDB();

  const totalUsers = await db.collection("users").countDocuments();
  const totalResumes = await db.collection("resumes").countDocuments();
  const totalInterviews = await db.collection("interviews").countDocuments();

  return NextResponse.json({
    totalUsers,
    totalResumes,
    totalInterviews,
  });
}
