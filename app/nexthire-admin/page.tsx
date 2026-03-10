"use client";

import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Mic,
  TrendingUp,
  Shield,
  Clock,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import Link from "next/link";

type Stats = {
  totalUsers: number;
  totalResumes: number;
  totalInterviews: number;
  userGrowth: number;
  resumeGrowth: number;
  interviewGrowth: number;
};

type ActivityItem = {
  id: string;
  description: string;
};

function StatCard({
  label,
  value,
  growth,
  icon: Icon,
}: {
  label: string;
  value: number;
  growth: number;
  icon: React.ElementType;
}) {
  const isPositive = growth >= 0;
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
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 group-hover:to-primary transition-all duration-300 tracking-tight mb-1 tabular-nums">
          {value.toLocaleString()}
        </div>
        <div
          className={`text-xs font-mono flex items-center gap-1 mt-2 ${isPositive ? "text-emerald-500" : "text-rose-500"}`}
        >
          <TrendingUp className="size-3" />
          {isPositive ? "+" : ""}
          {growth}% this month
        </div>
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats").then((r) => r.json()),
      fetch("/api/admin/recent-activity")
        .then((r) => r.json())
        .catch(() => []),
    ]).then(([statsData, activityData]) => {
      setStats(statsData);
      setRecentActivity(Array.isArray(activityData) ? activityData : []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="flex flex-col gap-8 relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-primary/5 blur-[120px] rounded-full" />

      {/* Page header */}
      <div className="relative">
        <p className="text-[10px] uppercase tracking-[0.25em] text-primary/60 mb-2 font-mono">
          Admin
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Platform{" "}
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Overview
          </span>
        </h1>
        <p className="text-muted-foreground font-light mt-1.5">
          Real-time visibility into NextHire platform health and growth.
        </p>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/nexthire-admin/users"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-blue-600 rounded-none text-primary-foreground text-sm font-semibold shadow-[0_0_20px_oklch(0.62_0.26_278/0.25)] hover:shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)] transition-all"
        >
          <Users className="size-4" />
          Manage Users
          <ArrowUpRight className="size-3" />
        </Link>
        <Link
          href="/nexthire-admin/analytics"
          className="flex items-center gap-2 px-5 py-2.5 bg-muted border border-border hover:border-primary/30 hover:bg-muted/80 rounded-none text-foreground text-sm font-medium transition-all"
        >
          <Activity className="size-4" />
          View Analytics
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        <StatCard
          label="Total Users"
          value={stats.totalUsers}
          growth={stats.userGrowth}
          icon={Users}
        />
        <StatCard
          label="Resumes Scored"
          value={stats.totalResumes}
          growth={stats.resumeGrowth}
          icon={FileText}
        />
        <StatCard
          label="Mock Interviews"
          value={stats.totalInterviews}
          growth={stats.interviewGrowth}
          icon={Mic}
        />
      </div>

      {/* System health */}
      <div className="relative rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Shield className="size-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              All systems operational
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 font-light">
              AI services, database, and auth are running normally.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-500">Live</span>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">
              Recent Activity
            </h2>
          </div>
          <span className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
            live feed
          </span>
        </div>
        <div className="divide-y divide-border/50">
          {recentActivity.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                No recent activity recorded.
              </p>
            </div>
          ) : (
            recentActivity.map((item, i) => (
              <div
                key={item.id ?? i}
                className="px-6 py-3.5 flex items-center gap-3 hover:bg-muted/40 transition-colors"
              >
                <div className="size-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-sm text-foreground/80">{item.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
