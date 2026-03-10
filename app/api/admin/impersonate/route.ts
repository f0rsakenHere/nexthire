import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { targetUid } = await req.json();
    const db = await connectDB();
}

//    catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }

  return NextResponse.json({ message: "Impersonation API created" });
}
