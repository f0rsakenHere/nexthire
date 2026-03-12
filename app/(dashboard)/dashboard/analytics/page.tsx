"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
}

// ---------------------------------------------------------------------------
// Shared chart wrapper
// ---------------------------------------------------------------------------
function ChartContainer({
  children,
  height = 280,
}: {
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <div className="w-full min-w-0" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom tooltip — interview scores (0-10)
// ---------------------------------------------------------------------------
function InterviewTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const score = payload[0]?.value ?? 0;
  const color = score >= 7 ? "#22c55e" : score >= 4 ? "#f59e0b" : "#ef4444";
  return (
    <div className="border border-border bg-background/95 px-4 py-3 shadow-xl backdrop-blur-sm">
      <p className="text-xs font-mono text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-black" style={{ color }}>
        {score}
        <span className="text-sm font-normal text-muted-foreground">/10</span>
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {score >= 7 ? "🟢 Strong performance" : score >= 4 ? "🟡 Room to grow" : "🔴 Needs practice"}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom tooltip — ATS resume score (0-100)
// ---------------------------------------------------------------------------
function ATSTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const score = payload[0]?.value ?? 0;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="border border-border bg-background/95 px-4 py-3 shadow-xl backdrop-blur-sm">
      <p className="text-xs font-mono text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-black" style={{ color }}>
        {score}
        <span className="text-sm font-normal text-muted-foreground">%</span>
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {score >= 75 ? "🟢 ATS-ready" : score >= 50 ? "🟡 Needs keywords" : "🔴 Low ATS match"}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Trend badge: shows change vs previous entry
// ---------------------------------------------------------------------------
function TrendBadge({
  data,
  field = "score",
}: {
  data: Record<string, number>[];
  field?: string;
}) {
  if (data.length < 2) return null;
  const last = data[data.length - 1][field] ?? 0;
  const prev = data[data.length - 2][field] ?? 0;
  const delta = +(last - prev).toFixed(1);
  if (delta === 0) return null;
  const positive = delta > 0;
  return (
    <span
      className="inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-semibold"
      style={{
        background: positive ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
        color: positive ? "#16a34a" : "#dc2626",
      }}
    >
      {positive ? "▲" : "▼"} {positive ? "+" : ""}
      {delta}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
function EmptyChart({ icon, message }: { icon: string; message: string }) {
  return (
    <div className="flex h-[280px] flex-col items-center justify-center gap-3 border border-dashed border-border bg-muted/30">
      <span className="text-4xl">{icon}</span>
      <p className="text-sm text-muted-foreground text-center max-w-[200px]">{message}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Score-band legend row
// ---------------------------------------------------------------------------
function BandLegend({ bands }: { bands: { label: string; range: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap gap-4 mt-3 px-1">
      {bands.map((b) => (
        <div key={b.label} className="flex items-center gap-1.5">
          <span className="h-2 w-2 inline-block" style={{ background: b.color }} />
          <span className="text-xs text-muted-foreground">
            {b.label}{" "}
            <span className="opacity-60">({b.range})</span>
          </span>
        </div>
      ))}
    </div>
  );
}

// ===========================================================================
// Main page
// ===========================================================================

export interface AnalyticsData {
  interviews?: {
    totalInterviews?: number;
    avgInterviewScore?: number;
  };
  applications?: {
    totalApplications?: number;
    statusBreakdown?: Record<string, number>;
  };
  resume?: {
    atsScore?: number;
    strengths?: string[];
    improvements?: string[];
  };
  interviewTrend?: Record<string, number>[];
  resumeTrend?: Record<string, number>[];
  keywords?: {
    found?: number;
    missing?: number;
    atsScore?: number;
  };
}

export default function AnalyticsPage() {
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`/api/analytics/${userId}`);
        const data = await res.json();
        setAnalyticsData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [userId]);

  const interviewTrend = analyticsData?.interviewTrend || [];
  const resumeTrend = analyticsData?.resumeTrend || [];

  const applicationPipeline = (() => {
    const breakdown = analyticsData?.applications?.statusBreakdown;
    return breakdown
      ? Object.entries(breakdown).map(([status, value]) => ({ status, value }))
      : [];
  })();

  const keywordRadar = [
    { subject: "Found", value: analyticsData?.keywords?.found || 0 },
    { subject: "Missing", value: analyticsData?.keywords?.missing || 0 },
    { subject: "ATS", value: analyticsData?.keywords?.atsScore || 0 },
  ];

  const avgScore = analyticsData?.interviews?.avgInterviewScore || 0;

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="bg-background text-foreground min-h-screen">
        {/* ── Header ── */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8">
          {/* ── Title ── */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
              Insights
            </p>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
              Progress Analytics
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              Monitor interview performance, resume scores, and job applications.
            </p>
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-4xl font-bold">
                    {analyticsData?.interviews?.totalInterviews || 0}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Avg Interview Score</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-4xl font-bold">
                    {avgScore}
                    <span className="text-lg text-muted-foreground">/10</span>
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-4xl font-bold">
                    {analyticsData?.applications?.totalApplications || 0}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">ATS Resume Score</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-4xl font-bold">
                    {analyticsData?.resume?.atsScore || 0}
                    <span className="text-lg text-muted-foreground">%</span>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ── Trend Charts ── */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Interview Score Progress */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base font-semibold">
                      Interview Score Progress
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Per-session average score (out of 10)
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {!loading && interviewTrend.length >= 2 && (
                      <TrendBadge data={interviewTrend} />
                    )}
                    {!loading && interviewTrend.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Latest:{" "}
                        <span className="font-semibold text-foreground">
                          {interviewTrend[interviewTrend.length - 1]?.score ?? 0}/10
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2 pb-4">
                {loading ? (
                  <Skeleton className="h-[280px] w-full rounded-xl" />
                ) : interviewTrend.length === 0 ? (
                  <EmptyChart
                    icon="🎤"
                    message="Complete your first mock interview to see your score trend here."
                  />
                ) : (
                  <>
                    <ChartContainer>
                      <AreaChart
                        data={interviewTrend}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="interviewGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                          opacity={0.4}
                        />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          domain={[0, 10]}
                          ticks={[0, 2, 4, 6, 8, 10]}
                          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          content={<InterviewTooltip />}
                          cursor={{
                            stroke: "hsl(var(--primary))",
                            strokeWidth: 1,
                            strokeDasharray: "4 4",
                          }}
                        />
                        {avgScore > 0 && (
                          <ReferenceLine
                            y={avgScore}
                            stroke="hsl(var(--primary))"
                            strokeDasharray="5 5"
                            strokeOpacity={0.5}
                            label={{
                              value: `avg ${avgScore}`,
                              fontSize: 10,
                              fill: "hsl(var(--muted-foreground))",
                              position: "right",
                            }}
                          />
                        )}
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2.5}
                          fill="url(#interviewGrad)"
                          dot={{
                            r: 5,
                            fill: "hsl(var(--primary))",
                            strokeWidth: 2,
                            stroke: "hsl(var(--background))",
                          }}
                          activeDot={{
                            r: 7,
                            strokeWidth: 2,
                            stroke: "hsl(var(--background))",
                          }}
                        />
                      </AreaChart>
                    </ChartContainer>
                    <BandLegend
                      bands={[
                        { label: "Strong", range: "7–10", color: "#22c55e" },
                        { label: "Average", range: "4–6", color: "#f59e0b" },
                        { label: "Needs work", range: "0–3", color: "#ef4444" },
                      ]}
                    />
                  </>
                )}
              </CardContent>
            </Card>

            {/* Resume ATS Improvement */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base font-semibold">
                      Resume ATS Improvement
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ATS score across each resume submission
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {!loading && resumeTrend.length >= 2 && (
                      <TrendBadge data={resumeTrend} />
                    )}
                    {!loading && resumeTrend.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Latest:{" "}
                        <span className="font-semibold text-foreground">
                          {resumeTrend[resumeTrend.length - 1]?.score ?? 0}%
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2 pb-4">
                {loading ? (
                  <Skeleton className="h-[280px] w-full rounded-xl" />
                ) : resumeTrend.length === 0 ? (
                  <EmptyChart
                    icon="📄"
                    message="Score your first resume to track ATS improvements over time."
                  />
                ) : (
                  <>
                    <ChartContainer>
                      <AreaChart
                        data={resumeTrend}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="resumeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                          opacity={0.4}
                        />
                        <XAxis
                          dataKey="version"
                          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          domain={[0, 100]}
                          ticks={[0, 25, 50, 75, 100]}
                          tickFormatter={(v: number) => `${v}%`}
                          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          content={<ATSTooltip />}
                          cursor={{
                            stroke: "#6366f1",
                            strokeWidth: 1,
                            strokeDasharray: "4 4",
                          }}
                        />
                        <ReferenceLine
                          y={75}
                          stroke="#22c55e"
                          strokeDasharray="5 5"
                          strokeOpacity={0.45}
                          label={{
                            value: "ATS-ready (75%)",
                            fontSize: 10,
                            fill: "#16a34a",
                            position: "right",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#6366f1"
                          strokeWidth={2.5}
                          fill="url(#resumeGrad)"
                          dot={{
                            r: 5,
                            fill: "#6366f1",
                            strokeWidth: 2,
                            stroke: "hsl(var(--background))",
                          }}
                          activeDot={{
                            r: 7,
                            strokeWidth: 2,
                            stroke: "hsl(var(--background))",
                          }}
                        />
                      </AreaChart>
                    </ChartContainer>
                    <BandLegend
                      bands={[
                        { label: "ATS-ready", range: "75–100%", color: "#22c55e" },
                        { label: "Improving", range: "50–74%", color: "#f59e0b" },
                        { label: "Low match", range: "0–49%", color: "#ef4444" },
                      ]}
                    />
                  </>
                )}
              </CardContent>
            </Card>

            {/* Application Pipeline */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="text-base font-semibold">Application Pipeline</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Status breakdown of your job applications</p>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                  </div>
                ) : applicationPipeline.length === 0 ? (
                  <div className="flex h-[220px] flex-col items-center justify-center gap-3 border border-dashed border-border bg-muted/30">
                    <span className="text-4xl">📋</span>
                    <p className="text-sm text-muted-foreground text-center max-w-[200px]">Track your first job application to see the pipeline here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(() => {
                      const total = applicationPipeline.reduce((s, a) => s + (a.value as number), 0);
                      const STATUS_META: Record<string, { color: string; bg: string; icon: string }> = {
                        applied:    { color: "#6366f1", bg: "rgba(99,102,241,0.1)",  icon: "📨" },
                        interview:  { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  icon: "🎙️" },
                        offer:      { color: "#22c55e", bg: "rgba(34,197,94,0.1)",   icon: "🎉" },
                        rejected:   { color: "#ef4444", bg: "rgba(239,68,68,0.1)",   icon: "❌" },
                        wishlist:   { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)",  icon: "⭐" },
                        saved:      { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)",  icon: "🔖" },
                        phone_screen: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: "📞" },
                      };
                      return applicationPipeline.map((item) => {
                        const count = item.value as number;
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                        const statusKey = (item.status as string).toLowerCase();
                        const meta = STATUS_META[statusKey] ?? { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: "📁" };
                        const displayName = (item.status as string).replace(/_/g, ' ');
                        return (
                          <div key={item.status as string} className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center text-base flex-shrink-0" style={{ background: meta.bg }}>
                              {meta.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium capitalize">{displayName}</span>
                                <span className="text-xs font-semibold tabular-nums" style={{ color: meta.color }}>{count} <span className="text-muted-foreground font-normal">({pct}%)</span></span>
                              </div>
                              <div className="h-1.5 w-full bg-muted overflow-hidden">
                                <div className="h-full transition-all duration-700" style={{ width: `${pct}%`, background: meta.color }} />
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                    <p className="text-xs text-muted-foreground text-right pt-1">{applicationPipeline.reduce((s, a) => s + (a.value as number), 0)} total applications</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Keyword Coverage */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="text-base font-semibold">Keyword Coverage</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">From your latest resume ATS scan</p>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                  </div>
                ) : (keywordRadar[0].value === 0 && keywordRadar[1].value === 0) ? (
                  <div className="flex h-[220px] flex-col items-center justify-center gap-3 border border-dashed border-border bg-muted/30">
                    <span className="text-4xl">🔍</span>
                    <p className="text-sm text-muted-foreground text-center max-w-[200px]">Run the Resume Scorer to see keyword analysis here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* ATS score ring + label */}
                    <div className="flex items-center gap-5 border border-border bg-muted/30 p-4">
                      <div className="relative flex-shrink-0" style={{ width: 72, height: 72 }}>
                        <svg viewBox="0 0 72 72" width="72" height="72">
                          <circle cx="36" cy="36" r="28" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                          <circle
                            cx="36" cy="36" r="28"
                            fill="none"
                            stroke={keywordRadar[2].value >= 75 ? "#22c55e" : keywordRadar[2].value >= 50 ? "#f59e0b" : "#ef4444"}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(keywordRadar[2].value / 100) * 175.9} 175.9`}
                            strokeDashoffset="44"
                            transform="rotate(-90 36 36)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-black">{keywordRadar[2].value}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">ATS Match Score</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {keywordRadar[2].value >= 75 ? "🟢 Resume is ATS-ready" : keywordRadar[2].value >= 50 ? "🟡 Needs more keywords" : "🔴 Low keyword alignment"}
                        </p>
                      </div>
                    </div>

                    {/* Found / Missing bars */}
                    {[
                      { label: "Keywords Found",   value: keywordRadar[0].value, color: "#22c55e", bg: "rgba(34,197,94,0.1)",   icon: "✓" },
                      { label: "Keywords Missing", value: keywordRadar[1].value, color: "#ef4444", bg: "rgba(239,68,68,0.1)",   icon: "✗" },
                    ].map((row) => {
                      const total = keywordRadar[0].value + keywordRadar[1].value;
                      const pct = total > 0 ? Math.round((row.value / total) * 100) : 0;
                      return (
                        <div key={row.label} className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: row.bg, color: row.color }}>
                            {row.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{row.label}</span>
                              <span className="text-xs font-semibold tabular-nums" style={{ color: row.color }}>{row.value} <span className="text-muted-foreground font-normal">keywords</span></span>
                            </div>
                            <div className="h-1.5 w-full bg-muted overflow-hidden">
                              <div className="h-full transition-all duration-700" style={{ width: `${pct}%`, background: row.color }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resume Insights */}
          {!loading && analyticsData?.resume && (
            <div className="grid lg:grid-cols-2 gap-6">

              {/* Top Strengths */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center" style={{ background: "rgba(34,197,94,0.12)" }}>
                      <span className="text-base">💪</span>
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">Top Strengths</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">What your resume does well</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {analyticsData.resume?.strengths?.map(
                    (item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3"
                        style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}
                      >
                        <span
                          className="flex h-5 w-5 items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                          style={{ background: "rgba(34,197,94,0.2)", color: "#16a34a" }}
                        >
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed">{item}</p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              {/* Areas to Improve */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center" style={{ background: "rgba(245,158,11,0.12)" }}>
                      <span className="text-base">🎯</span>
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">Areas to Improve</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">Actionable steps to strengthen your resume</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {analyticsData.resume?.improvements?.map(
                    (item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3"
                        style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}
                      >
                        <span
                          className="flex h-5 w-5 items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                          style={{ background: "rgba(245,158,11,0.2)", color: "#b45309" }}
                        >
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed">{item}</p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}