import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET /api/admin/users-list — fetch all users
export async function GET() {
  try {
    const db = await connectDB();
    const users = await db.collection("users").find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error("[admin/users-list GET]", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// PATCH /api/admin/users-list — update a user's role
export async function PATCH(req: NextRequest) {
  try {
    const { id, role } = await req.json();
    if (!id || !role) {
      return NextResponse.json({ error: "Missing id or role" }, { status: 400 });
    }
    if (!["admin", "user"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const db = await connectDB();
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { role } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/users-list PATCH]", error);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}

// DELETE /api/admin/users-list — delete a user
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const db = await connectDB();
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/users-list DELETE]", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
