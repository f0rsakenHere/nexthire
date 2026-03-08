import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return Response.json({ error: "userId required" }, { status: 400 });

  const mongo = await clientPromise;
  const db = mongo.db("nexthire");
  const docs = await db
    .collection("applications")
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json(
    docs.map((d) => ({ ...d, id: d._id.toString(), _id: undefined }))
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, company, role, status = "wishlist", salaryRange, location, jdUrl, jdText, notes } = body;

  if (!userId || !company || !role) {
    return Response.json({ error: "userId, company and role are required" }, { status: 400 });
  }

  const mongo = await clientPromise;
  const db = mongo.db("nexthire");
  const doc = {
    userId,
    company,
    role,
    status,
    salaryRange: salaryRange || "",
    location: location || "",
    jdUrl: jdUrl || "",
    jdText: jdText || "",
    notes: notes || "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection("applications").insertOne(doc);
  return Response.json({ id: result.insertedId.toString(), ...doc, _id: undefined });
}
