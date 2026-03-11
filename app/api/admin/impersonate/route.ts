import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { targetUserId } = await req.json();

    if (!targetUserId) {
      return NextResponse.json(
        { error: "Target user ID required" },
        { status: 400 },
      );
    }

    // get token from header
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];

    // verify firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const requesterEmail = decodedToken.email;

    const client = await clientPromise;
    const db = client.db();

    // check admin
    const requester = await db.collection("users").findOne({
      email: requesterEmail,
    });

    if (!requester || requester.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    // find target user
    const targetUser = await db.collection("users").findOne({
      _id: new ObjectId(targetUserId),
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 },
      );
    }

    // prevent admin impersonation
    if (targetUser.role === "admin") {
      return NextResponse.json(
        { error: "Cannot impersonate another admin" },
        { status: 403 },
      );
    }

    // generate custom token
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
