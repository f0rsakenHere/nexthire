import { NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetUid } = body;

    if (!targetUid) {
      return NextResponse.json({ error: "UID  required" }, { status: 400 });
    }

    // create custom token
    const customToken = await admin.auth().createCustomToken(targetUid);

    return NextResponse.json({ customToken });
  } catch (err: any) {
    console.error("Impersonation API error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
