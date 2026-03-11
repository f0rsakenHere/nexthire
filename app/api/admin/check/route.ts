import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";

// GET /api/admin/check — verify that the requesting user has role = "admin"
export async function GET(req: NextRequest) {
  const email = req.headers.get("x-user-email");
  if (!email) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  try {
    const db = await connectDB();
    const user = await db.collection("users").findOne({ email });
    const isAdmin = user?.role === "admin";
    return NextResponse.json({ isAdmin, name: user?.name ?? null });
  } catch (error) {
    console.error("[admin/check]", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
