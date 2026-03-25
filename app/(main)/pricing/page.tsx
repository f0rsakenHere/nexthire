"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, StarIcon } from "lucide-react";
import toast from "react-hot-toast";

const plans = [
    {
        name: "free",
        price: 0,
        stripePriceId: "", // ❗ free plan → no stripe প্রয়োজন
        features: [
            "1 Mock Interview",
            "1 Resume Scan",
            "Limited Analytics",
            "No Job Tracker Access",
        ],
    },
    {
        name: "basic",
        price: 10,
        stripePriceId: "price_basic_plan_placeholder",
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
        price: 20,
        stripePriceId: "price_premium_plan_placeholder",
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
        if (firebaseUser) {
            setUserCurrentPlan("free"); // later DB থেকে আনবা
        } else {
            setUserCurrentPlan("");
        }
    }, [firebaseUser]);

    const handleSubscription = async (priceId: string, planName: string) => {
        if (!firebaseUser) {
            toast.error("Please sign in first");
            return;
        }

        // ✅ free plan handle
        if (planName === "free") {
            toast("You are already on Free plan");
            return;
        }

        if (!priceId) {
            toast.error("Invalid plan configuration");
            return;
        }

        setLoadingCheckout(priceId);

        try {
            // ✅ IMPORTANT FIX
            const token = await firebaseUser.getIdToken(true);

            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // 🔥 must
                },
                body: JSON.stringify({ priceId }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(data);
                throw new Error(data.error || "Checkout failed");
            }

            if (!data.url) {
                throw new Error("No checkout URL");
            }

            // ✅ redirect
            window.location.href = data.url;
        } catch (error: any) {
            console.error("Checkout Error:", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoadingCheckout(null);
        }
    };

    const isLoading = loadingFirebaseUser;

    return (
        <main className="flex-1 p-6 lg:p-8">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Find the perfect plan
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Unlock your full potential and land your dream job faster.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i} className="flex flex-col">
                            <CardHeader>
                                <div className="h-6 w-24 bg-muted animate-pulse rounded" />
                            </CardHeader>
                        </Card>
                    ))
                    : plans.map((plan) => {
                        const isCurrentPlan = plan.name === userCurrentPlan;

                        return (
                            <Card
                                key={plan.name}
                                className={`relative flex flex-col transition hover:shadow-lg
                  ${plan.isPopular ? "border-2 border-primary" : ""}
                `}
                            >
                                {plan.isPopular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded-full bg-primary text-white flex items-center gap-1">
                                        <StarIcon className="h-3 w-3" /> Most Popular
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold capitalize">
                                        {plan.name} Plan
                                    </CardTitle>
                                    <CardDescription>{plan.features[0]}</CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-5xl font-extrabold">
                                            {plan.price === 0 ? "Free" : `$${plan.price}`}
                                        </span>
                                        {plan.price !== 0 && (
                                            <span className="text-muted-foreground">
                                                /month
                                            </span>
                                        )}
                                    </div>

                                    <ul className="space-y-3">
                                        {plan.features.slice(1).map((f, i) => (
                                            <li key={i} className="flex gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        onClick={() =>
                                            handleSubscription(plan.stripePriceId, plan.name)
                                        }
                                        disabled={
                                            isCurrentPlan ||
                                            loadingCheckout === plan.stripePriceId
                                        }
                                    >
                                        {loadingCheckout === plan.stripePriceId
                                            ? "Processing..."
                                            : isCurrentPlan
                                                ? "Current Plan"
                                                : plan.name === "free"
                                                    ? "Free Plan"
                                                    : "Subscribe"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
            </div>
        </main>
    );
}