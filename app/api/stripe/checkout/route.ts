import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import admin from "@/lib/firebase-admin";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    // =========================
    // ✅ AUTH HEADER CHECK
    // =========================
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing token" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token format" },
        { status: 401 }
      );
    }

    // =========================
    // ✅ VERIFY FIREBASE TOKEN
    // =========================
    let decodedToken;

    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (error: unknown) {
      console.error("🔥 Firebase Verify Error:", error);

      const firebaseError = error as { code?: string };
      return NextResponse.json(
        {
          error: "Authentication failed",
          code: firebaseError.code || "unknown_error",
        },
        { status: 401 }
      );
    }

    const uid = decodedToken.uid;
    const email = decodedToken.email || "";
    const name = decodedToken.name || email;

    // =========================
    // ✅ BODY PARSE SAFE
    // =========================
    let body;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "priceId is required" },
        { status: 400 }
      );
    }

    // =========================
    // ✅ DATABASE
    // =========================
    const client = await clientPromise;
    const db = client.db("nexthire");
    const users = db.collection("users");

    let user = await users.findOne({ _id: uid } as unknown as Record<string, unknown>);

    if (!user) {
      const newUser = {
        _id: uid as unknown,
        email,
        plan: "free",
        createdAt: new Date(),
      };

      await users.insertOne(newUser as unknown as Record<string, unknown>);
      user = await users.findOne({ _id: uid } as unknown as Record<string, unknown>);
    }

    let stripeCustomerId = user?.stripeCustomerId as string | undefined;

    // =========================
    // ✅ CREATE STRIPE CUSTOMER
    // =========================
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: { userId: uid },
      });

      stripeCustomerId = customer.id;

      await users.updateOne(
        { _id: uid } as unknown as Record<string, unknown>,
        { $set: { stripeCustomerId } }
      );
    }

    // =========================
    // ✅ CREATE CHECKOUT SESSION
    // =========================
    const baseUrl = req.nextUrl.origin;

    let session;

    try {
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: stripeCustomerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/dashboard/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/dashboard/payment/cancel`,
        metadata: {
          userId: uid,
        },
      });
    } catch (err: unknown) {
      console.error("🔥 Stripe Error:", err);
      const message = err instanceof Error ? err.message : "Unknown error";

      return NextResponse.json(
        {
          error: "Stripe session creation failed",
          details: message,
        },
        { status: 500 }
      );
    }

    if (!session?.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    // =========================
    // ✅ SUCCESS RESPONSE
    // =========================
    return NextResponse.json({ url: session.url });

  } catch (error: unknown) {
    console.error("🔥 FINAL ERROR:", error);
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: message,
      },
      { status: 500 }
    );
  }
}