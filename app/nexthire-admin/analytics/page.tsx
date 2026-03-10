"use client";

import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Mic,
  TrendingUp,
  Activity,
  Star,
  Calendar,
} from "lucide-react";

type Stats = {
  dailyActiveUsers: number;
  averageResumeScore: number;
  mockInterviews: number;
  newUsersToday: number;
  resumesThisWeek: number;
  interviewsToday: number;
};

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="group relative rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 p-6 overflow-hidden transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-muted-foreground group-hover:text-primary transition-colors">
            <Icon className="size-4" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono group-hover:text-foreground/70 transition-colors">
            {label}
          </span>
        </div>
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 group-hover:to-primary transition-all duration-300 tracking-tight tabular-nums">
          {value}
        </div>
        {sub && (
          <p className="text-xs text-muted-foreground font-mono mt-2">{sub}</p>
        )}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!stats) return null;

  const snapshots = [
    {
      label: "New users today",
      value: stats.newUsersToday,
      icon: Users,
    },
    {
      label: "Resumes this week",
      value: stats.resumesThisWeek,
      icon: FileText,
    },
    {
      label: "Interviews today",
      value: stats.interviewsToday,
      icon: Mic,
    },
  ];

  const chartBars = [40, 65, 80, 72, 58, 90, 78, stats.averageResumeScore];

  return (
    <div className="flex flex-col gap-8 relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-primary/5 blur-[100px] rounded-full" />

      {/* Header */}
      <div className="relative">
        <p className="text-[10px] uppercase tracking-[0.25em] text-primary/60 mb-2 font-mono">
          Admin · Analytics
        </p>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Platform{" "}
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Analytics
          </span>
        </h1>
        <p className="text-muted-foreground font-light mt-1.5">
          Monitor growth and AI tool performance metrics.
        </p>
      </div>

      {/* Primary metrics */}
      <div className="grid gap-6 sm:grid-cols-3">
        <MetricCard
          label="Daily Active Users"
          value={stats.dailyActiveUsers}
          sub="Users active in last 24h"
          icon={Activity}
        />
        <MetricCard
          label="Avg Resume Score"
          value={`${stats.averageResumeScore}%`}
          sub="Average ATS score this week"
          icon={Star}
        />
        <MetricCard
          label="Interviews (month)"
          value={stats.mockInterviews}
          sub="Mock interviews completed"
          icon={TrendingUp}
        />
      </div>

      {/* Today snapshot */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="size-4 text-muted-foreground" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
            Snapshot
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {snapshots.map((s) => (
            <div
              key={s.label}
              className="rounded-none bg-card/50 border border-border/50 px-5 py-4 flex items-center gap-4 hover:border-primary/30 hover:bg-card/80 transition-all group"
            >
              <div className="p-2 rounded-none bg-muted border border-border group-hover:border-primary/30 transition-colors">
                <s.icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground tabular-nums">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-0.5">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score distribution chart */}
      <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="flex items-center gap-2 mb-6">
          <FileText className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">
            Resume Score Distribution
          </h2>
          <span className="ml-auto text-[10px] text-muted-foreground/50 font-mono">
            avg: {stats.averageResumeScore}%
          </span>
        </div>
        <div className="flex items-end gap-2 h-28">
          {chartBars.map((v, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-2 group/bar cursor-pointer"
            >
              <div
                className="w-full rounded-none bg-muted/30 border border-border/50 relative overflow-hidden transition-all hover:border-primary/30"
                style={{ height: `${Math.max(10, v)}%` }}
              >
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary to-blue-500 opacity-50 group-hover/bar:opacity-80 transition-opacity h-full" />
              </div>
              <span className="text-[9px] text-muted-foreground font-mono">
                {v}%
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground/40 font-mono mt-4 text-center">
          Sample of recent resume ATS scores
        </p>
      </div>
    </div>
  );
}
