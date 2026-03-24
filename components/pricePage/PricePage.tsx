"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type PlanType = "free" | "monthly" | "yearly";

type Plan = {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  type: PlanType;
  description: string;
  features: string[];
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    type: "free",
    description: "For beginners getting started",
    features: ["Basic Dashboard", "Limited Access", "Community Support"],
  },
  {
    name: "Pro",
    priceMonthly: 10,
    priceYearly: 100,
    type: "monthly",
    description: "Perfect for active users",
    features: [
      "Unlimited Access",
      "Priority Support",
      "Advanced Analytics",
      "Profile Boost",
    ],
    highlight: true,
  },
  {
    name: "Pro Plus",
    priceMonthly: 20,
    priceYearly: 200,
    type: "yearly",
    description: "For professionals & teams",
    features: [
      "All Pro Features",
      "Premium Support",
      "Early Access",
      "Team Collaboration",
    ],
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const handleSelect = (plan: PlanType) => {
    console.log("Selected:", plan);
    //  Stripe integration here
  };

  return (
    <div className="min-h-screen px-6 py-12 space-y-20">
      {/* HERO */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Simple, Transparent Pricing
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Choose the perfect plan for your journey. Upgrade anytime.
        </p>

        {/* TOGGLE */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2  ${
              billing === "monthly" ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2  ${
              billing === "yearly" ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            Yearly
          </button>
        </div>
      </section>
    </div>
  );
}
