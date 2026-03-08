import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  if (!ObjectId.isValid(id)) return Response.json({ error: "Invalid id" }, { status: 400 });

  const { userId, ...updates } = body;
  if (!userId) return Response.json({ error: "userId required" }, { status: 400 });

  const mongo = await clientPromise;
  const db = mongo.db("nexthire");
  await db.collection("applications").updateOne(
    { _id: new ObjectId(id), userId },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  return Response.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");

  if (!ObjectId.isValid(id)) return Response.json({ error: "Invalid id" }, { status: 400 });
  if (!userId) return Response.json({ error: "userId required" }, { status: 400 });

  const mongo = await clientPromise;
  const db = mongo.db("nexthire");
  await db.collection("applications").deleteOne({ _id: new ObjectId(id), userId });
  return Response.json({ ok: true });
}
