import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { targetUserId } = await req.json();

    if (!targetUserId) {
      return NextResponse.json(
        { error: "Target user ID required" },
        { status: 400 },
      );
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const requesterEmail = decodedToken.email;

    const client = await clientPromise;
    const db = client.db();

    const requester = await db
      .collection("users")
      .findOne({ email: requesterEmail });

    if (!requester || requester.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin only" },
        { status: 403 },
      );
    }

    const targetUser = await db
      .collection("users")
      .findOne({ _id: targetUserId });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 },
      );
    }

    const customToken = await admin.auth().createCustomToken(targetUser.uid);

    return NextResponse.json({ customToken });
  } catch (error) {
    console.error("Impersonation error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
