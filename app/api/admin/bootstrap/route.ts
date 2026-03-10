import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";

// POST /api/admin/bootstrap
// One-time endpoint to set a user as admin by email.
// Protected by a secret key from env: ADMIN_BOOTSTRAP_SECRET
// Usage: POST with { email, secret }
export async function POST(req: NextRequest) {
  try {
    const { email, secret } = await req.json();

    const bootstrapSecret = process.env.ADMIN_BOOTSTRAP_SECRET;

    if (!bootstrapSecret) {
      return NextResponse.json(
        { error: "ADMIN_BOOTSTRAP_SECRET is not set in environment variables." },
        { status: 500 }
      );
    }

    if (secret !== bootstrapSecret) {
      return NextResponse.json({ error: "Invalid secret." }, { status: 403 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const db = await connectDB();
    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: { role: "admin" } });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          error: `No user found with email: ${email}. Make sure you have signed up first.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `✅ ${email} has been promoted to admin.`,
    });
  } catch (error) {
    console.error("[admin/bootstrap]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
