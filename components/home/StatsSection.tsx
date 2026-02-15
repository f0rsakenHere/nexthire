"use client";

import { Button } from "@/components/ui/button";

export function StatsSection() {
  return (
    <section className="border-y border-white/5 bg-black z-20 relative">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/10">
          {[
            { label: "Interviews Practiced", value: "10k+" },
            { label: "Success Rate", value: "95%" },
            { label: "AI Coach", value: "24/7" },
            { label: "Users Hired", value: "2000+" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </span>
              <span className="text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
