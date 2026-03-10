import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Impersonation API created" });
}
