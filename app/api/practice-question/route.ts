import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await connectDB();
  
  // Collecting all data from mongodb
  const questions = await db.collection("practice-question").find({}).toArray();

  return NextResponse.json(questions);
}