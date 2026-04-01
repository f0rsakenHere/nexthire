"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, StarIcon, Sparkles, Zap, Shield } from "lucide-react";
import toast from "react-hot-toast";

const plans = [
  {
    name: "free",
    price: 0,
    stripePriceId: "",
    icon: <Shield className="h-6 w-6" />,
    accentColor: "text-slate-400",
    buttonVariant: "outline" as const,
    features: [
      "1 Mock Interview",
      "1 Resume Scan",
      "Limited Analytics",
      "No Job Tracker Access",
    ],
  },
  {
    name: "basic",
    price: 5.99,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID || "",
    icon: <Zap className="h-6 w-6" />,
    accentColor: "text-blue-400",
    buttonVariant: "default" as const,
    features: [
      "10 Mock Interviews per month",
      "10 Resume Scans per month",
      "Basic Analytics",
      "Job Tracker Access",
      "Email Support",
    ],
  },
  {
    name: "premium",
    price: 9.99,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || "",
    icon: <Sparkles className="h-6 w-6" />,
    accentColor: "text-violet-400",
    buttonVariant: "default" as const,
    features: [
      "Unlimited Mock Interviews",
      "Unlimited Resume Scans",
      "In-depth Analytics & Insights",
      "Full Job Tracker Access",
      "Priority Support",
    ],
    isPopular: true,
  },
];

export default function Pricing() {
  const [firebaseUser, loadingFirebaseUser] = useAuthState(auth);
  const [loadingCheckout, setLoadingCheckout] = useState<string | null>(null);
  const [userCurrentPlan, setUserCurrentPlan] = useState("free");

  useEffect(() => {
    async function fetchUserPlan() {
      if (!firebaseUser) {
        setUserCurrentPlan("");
        return;
      }

      try {
        const token = await firebaseUser.getIdToken();
        const res = await fetch("/api/user/plan", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUserCurrentPlan(data.plan || "free");
        } else {
          setUserCurrentPlan("free");
        }
      } catch {
        setUserCurrentPlan("free");
      }
    }

    fetchUserPlan();
  }, [firebaseUser]);

  const handleSubscription = async (priceId: string, planName: string) => {
    if (!firebaseUser) {
      toast.error("Please sign in first");
      return;
    }

    if (planName === "free") {
      toast("You are already on the Free plan");
      return;
    }

    if (!priceId) {
      toast.error("This plan is not yet available. Please try again later.");
      return;
    }

    setLoadingCheckout(priceId);

    try {
      const token = await firebaseUser.getIdToken(true);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        throw new Error(data.error || "Checkout failed");
      }

      if (!data.url) {
        throw new Error("No checkout URL received");
      }

      window.location.href = data.url;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      console.error("Checkout Error:", error);
      toast.error(message);
    } finally {
      setLoadingCheckout(null);
    }
  };

  const isLoading = loadingFirebaseUser;

  return (
    <main className="flex-1 bg-background text-foreground pb-20">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden bg-background pt-32 pb-12">
        <div className="absolute inset-0 bg-grid-foreground/[0.02] z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] z-0 pointer-events-none" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tight text-foreground drop-shadow-lg"
          >
            Find the <br />
            <span className="font-medium bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              perfect plan
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-muted-foreground font-light tracking-wide"
          >
            Unlock your full potential and land your dream job faster. Start
            free, upgrade when you&apos;re ready.
          </motion.p>
        </div>
      </section>

      {/* Plans Grid */}
      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-6 lg:px-10">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="flex flex-col animate-pulse">
                <CardHeader>
                  <div className="h-6 w-24 bg-muted rounded" />
                  <div className="h-4 w-36 bg-muted rounded mt-2" />
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="h-12 w-28 bg-muted rounded mb-6" />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="h-4 bg-muted rounded w-full" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-muted rounded w-full" />
                </CardFooter>
              </Card>
            ))
          : plans.map((plan) => {
              const isCurrentPlan = plan.name === userCurrentPlan;
              const isProcessing = loadingCheckout === plan.stripePriceId;

              return (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-visible bg-card
                                    ${
                                      plan.isPopular
                                        ? "border-2 border-primary shadow-lg shadow-primary/10 scale-[1.02] lg:scale-105"
                                        : "border border-border/50 hover:border-border"
                                    }
                                `}
                >
                  {/* Popular Badge */}
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground flex items-center gap-1.5 shadow-lg">
                      <StarIcon className="h-3.5 w-3.5 fill-current" />
                      Most Popular
                    </div>
                  )}

                  {/* Current Plan Badge */}
                  {isCurrentPlan && (
                    <div className="absolute top-4 right-4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-secondary text-secondary-foreground border border-border shadow-sm">
                      Current Plan
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className={`${plan.accentColor} mb-2`}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold capitalize">
                      {plan.name} Plan
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {plan.name === "free"
                        ? "Get started for free"
                        : plan.name === "basic"
                          ? "Perfect for active job seekers"
                          : "For serious career accelerators"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    {/* Price */}
                    <div className="mb-8">
                      <span className="text-5xl font-extrabold tracking-tight">
                        {plan.price === 0 ? "Free" : `$${plan.price}`}
                      </span>
                      {plan.price !== 0 && (
                        <span className="text-muted-foreground text-base ml-1">
                          /month
                        </span>
                      )}
                    </div>

                    {/* Feature List — all features shown */}
                    <ul className="space-y-3.5">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <CheckCircle2
                            className={`h-5 w-5 shrink-0 mt-0.5 ${plan.isPopular ? "text-violet-400" : "text-primary"}`}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-4">
                    <Button
                      className={`w-full h-11 font-semibold transition-all duration-200 ${
                        plan.isPopular
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                          : ""
                      }`}
                      variant={plan.isPopular ? "default" : plan.buttonVariant}
                      onClick={() =>
                        handleSubscription(plan.stripePriceId, plan.name)
                      }
                      disabled={isCurrentPlan || isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Processing...
                        </span>
                      ) : isCurrentPlan ? (
                        "Current Plan"
                      ) : plan.name === "free" ? (
                        "Get Started Free"
                      ) : (
                        `Upgrade to ${plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}`
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
      </div>

      {/* Footer Note */}
      <div className="mx-auto max-w-xl text-center mt-12">
        <p className="text-sm text-muted-foreground">
          All plans include a 7-day money-back guarantee. Cancel anytime from
          your dashboard. Prices in USD.
        </p>
      </div>
    </main>
  );
}
