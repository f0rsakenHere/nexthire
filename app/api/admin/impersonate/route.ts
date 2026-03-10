// import { NextRequest, NextResponse } from "next/server";
// import admin from "@/lib/firebase-admin";
// import { connectDB } from "@/lib/mongodb";

// export async function POST(req: NextRequest) {
//   try {
//     const { targetUid } = await req.json();
//     const db = await connectDB();

//     //request mail
//     const requesterEmail = req.headers.get("x-user-email");

//     //check requester role
//     const requester = await db.collection("users").findOne({
//       email: requesterEmail,
//     });

//     if (!requester || requester.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }
//     const targetUser = await db.collection("users").findOne({
//       uid: targetUid,
//     });

//     const customToken = await admin.auth().createCustomToken(targetUser.uid);
//     return NextResponse.json({ customToken });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { targetUid } = await req.json();

    const db = await connectDB();

    // requester email
    const requesterEmail = req.headers.get("x-user-email");

    if (!requesterEmail) {
      return NextResponse.json(
        { error: "Missing requester email" },
        { status: 401 },
      );
    }

    // check requester role
    const requester = await db.collection("users").findOne({
      email: requesterEmail,
    });

    if (!requester || requester.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // find target user
    const targetUser = await db.collection("users").findOne({
      uid: targetUid,
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 },
      );
    }

    // create firebase custom token
    const customToken = await admin.auth().createCustomToken(targetUser.uid);

    return NextResponse.json({ customToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
