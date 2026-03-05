import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  const db = await connectDB();
  const users = await db.collection("admin").find().toArray();

  return NextResponse.json(users);
}
