import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import clientPromise from "@/lib/mongodb";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not set in environment variables.");
}

async function updateUserSubscription(userId: string, subscription: Stripe.Subscription) {
  const client = await clientPromise;
  const db = client.db("nexthire");
  const usersCollection = db.collection("users");

  const updateData = {
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: subscription.customer as string,
    stripePriceId: subscription.items.data[0].price.id,
    stripeSubscriptionStatus: subscription.status,
    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
  };

  await usersCollection.updateOne({ _id: userId }, { $set: updateData });
  console.log(`Updated subscription for user ${userId} to status ${subscription.status}`);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return new NextResponse("Stripe signature missing", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("✅ Stripe Webhook Received:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (!session.metadata?.userId || !session.subscription) {
          throw new Error("Missing metadata: userId or subscription ID on checkout session.");
        }
        
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        
        await updateUserSubscription(session.metadata.userId, subscription);
        break;
      }
      
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;

        // The customer object might be deleted
        if (customer.deleted) {
          console.log(`Customer ${subscription.customer} is deleted. No user to update.`);
          return NextResponse.json({ received: true });
        }

        const userId = customer.metadata.userId;
        if (!userId) {
          throw new Error("Missing userId in customer metadata.");
        }

        await updateUserSubscription(userId, subscription);
        break;
      }
      
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook handler error:", error);
    return new NextResponse(`Webhook Handler Error: ${error.message}`, { status: 500 });
  }
}
