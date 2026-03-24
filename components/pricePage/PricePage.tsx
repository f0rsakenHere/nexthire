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
      {/* PRICING CARDS */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const price =
            billing === "monthly" ? plan.priceMonthly : plan.priceYearly;

          const isActive = selectedPlan === plan.type;

          return (
            <Card
              key={plan.name}
              onClick={() =>
                setSelectedPlan(selectedPlan === plan.type ? null : plan.type)
              }
              className={`
                cursor-pointer group relative
                transition-all duration-300 ease-in-out

                h-full min-h-[520px] flex flex-col justify-between

                ${
                  selectedPlan
                    ? plan.type === selectedPlan
                      ? "scale-105 border-2 border-blue-500 shadow-xl z-10 ring-2 ring-blue-500 bg-blue-50 "
                      : "scale-95 opacity-70"
                    : "hover:-translate-y-2 hover:shadow-2xl"
                }

                ${
                  plan.highlight && !selectedPlan
                    ? "border-2 border-primary"
                    : "border"
                }
              `}
            >
              {/* Badge */}
              {plan.highlight && !isActive && (
                <span className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {plan.name}
                </CardTitle>
                <p className="text-center text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="text-center flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-4xl font-bold mb-6">
                    ${price}
                    <span className="text-sm">
                      {billing === "monthly" ? "/mo" : "/yr"}
                    </span>
                  </p>

                  {/* FEATURES */}
                  <ul className="space-y-3 text-sm mb-6 text-left">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* HOVER DETAILS */}
                  <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 text-sm text-muted-foreground">
                    <p>
                      Unlock more power with the {plan.name} plan. Designed for
                      growth and performance.
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <Button
                  className={`w-full mt-6 ${
                    isActive ? "bg-blue-600 text-white" : ""
                  }`}
                  variant={isActive ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(plan.type);
                  }}
                >
                  {isActive
                    ? "Continue with this plan"
                    : plan.type === "free"
                      ? "Start Free"
                      : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>
      {/* EXTRA SECTION */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">Why choose us?</h2>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-4 border ">
            <h3 className="font-semibold">Fast</h3>
            <p className="text-sm text-muted-foreground">
              Optimized for speed and performance.
            </p>
          </div>

          <div className="p-4 border ">
            <h3 className="font-semibold">Secure</h3>
            <p className="text-sm text-muted-foreground">
              Your data is fully protected.
            </p>
          </div>

          <div className="p-4 border ">
            <h3 className="font-semibold">Reliable</h3>
            <p className="text-sm text-muted-foreground">
              99.9% uptime guarantee.
            </p>
          </div>
        </div>
      </section>
      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center">FAQ</h2>

        <div className="space-y-4">
          <div className="border p-4 ">
            <h3 className="font-semibold">Can I cancel anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription anytime.
            </p>
          </div>

          <div className="border p-4 ">
            <h3 className="font-semibold">Is there a free trial?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, we offer a free plan to get started.
            </p>
          </div>
        </div>
      </section>
      ;
    </div>
  );
}
