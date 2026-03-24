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
