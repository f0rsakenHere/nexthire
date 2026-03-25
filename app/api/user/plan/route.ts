import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const client = await clientPromise;
    const db = client.db("nexthire");
    const user = await db.collection("users").findOne({ _id: uid } as unknown as Record<string, unknown>);

    if (!user) {
      return NextResponse.json({ plan: "free" });
    }

    // Determine plan based on subscription status
    let plan = "free";

    if (
      user.stripeSubscriptionStatus === "active" ||
      user.stripeSubscriptionStatus === "trialing"
    ) {
      // Match the stripePriceId to a plan name
      const basicPriceId = process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID;
      const premiumPriceId = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID;

      if (user.stripePriceId === premiumPriceId) {
        plan = "premium";
      } else if (user.stripePriceId === basicPriceId) {
        plan = "basic";
      }
    }

    return NextResponse.json({
      plan,
      subscriptionStatus: user.stripeSubscriptionStatus || null,
      currentPeriodEnd: user.stripeCurrentPeriodEnd || null,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching user plan:", message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
