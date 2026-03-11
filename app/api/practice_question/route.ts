
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB();
    console.log("Connected to DB");

    // Fetch all questions from practice_question collection
    const questions = await db.collection("practice_question").find({}).toArray();
    console.log("Fetched questions:", questions.length);

    if (!questions || questions.length === 0) {
      return NextResponse.json({ message: "No questions found" }, { status: 404 });
    }

    return NextResponse.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
