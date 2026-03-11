import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    // Get target user id from frontend
    const { targetUserId } = await req.json();

    if (!targetUserId) {
      return NextResponse.json(
        { error: "Target user ID required" },
        { status: 400 },
      );
    }

    // Get Firebase ID token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 },
      );
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const requesterEmail = decodedToken.email;

    // Connect MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check if requester is admin
    const requester = await db.collection("users").findOne({
      email: requesterEmail,
    });

    if (!requester || requester.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    // Find target user
    const targetUser = await db.collection("users").findOne({
      _id: targetUserId,
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 },
      );
    }

    // SECURITY CHECK
    // Prevent admin from impersonating another admin
    if (targetUser.role === "admin") {
      return NextResponse.json(
        { error: "Cannot impersonate another admin" },
        { status: 403 },
      );
    }

    // Generate Firebase Custom Token
    const customToken = await admin.auth().createCustomToken(targetUser.uid);

    return NextResponse.json({
      customToken,
    });
  } catch (error) {
    console.error("Impersonation error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
