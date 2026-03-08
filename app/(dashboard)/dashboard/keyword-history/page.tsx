"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
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
import {
  ScanSearchIcon,
  HistoryIcon,
  TrendingUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ZapIcon,
  BriefcaseIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
} from "lucide-react";
import Link from "next/link";

type KeywordEntry = {
  id: string;
  role: string;
  industry: string;
  atsScore: number;
  totalKeywords: number;
  highPriorityMissing: number;
  benchmark: { industryCoveragePercent: number };
  keywords: { keyword: string; priority: string; matchType: string }[];
  sectionGaps: { keyword: string; missingIn: string[] }[];
  jobPreview: string;
  createdAt: string;
};

function ScoreGrade(score: number) {
  if (score >= 80)
    return {
      label: "Strong",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      bar: "from-emerald-500 to-teal-400",
    };
  if (score >= 60)
    return {
      label: "Good",
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-200",
      bar: "from-teal-500 to-cyan-400",
    };
  if (score >= 40)
    return {
      label: "Fair",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      bar: "from-amber-500 to-orange-400",
    };
  return {
    label: "Weak",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    bar: "from-rose-500 to-pink-500",
  };
}

function KeywordCard({ entry }: { entry: KeywordEntry }) {
  const [expanded, setExpanded] = useState(false);
  const g = ScoreGrade(entry.atsScore);
  const date = new Date(entry.createdAt);
  const foundKw = entry.keywords.filter((k) => k.matchType === "Full");
  const missingKw = entry.keywords.filter((k) => k.matchType === "Missing");

  return (
    <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden">
      <div
        className="flex items-center gap-4 px-6 py-4 cursor-pointer group"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Score badge */}
        <div
          className={`size-16 rounded-none flex flex-col items-center justify-center shrink-0 ${g.bg} border ${g.border}`}
        >
          <span className={`text-xl font-black tabular-nums ${g.color}`}>
            {entry.atsScore}
          </span>
          <span
            className={`text-[8px] font-mono uppercase ${g.color} opacity-70 mt-0.5`}
          >
            /100
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">
              {entry.role || "Unknown Role"}
            </span>
            {entry.industry && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <BriefcaseIcon className="size-3" /> {entry.industry}
              </span>
            )}
            <span
              className={`text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded-none border ${g.bg} ${g.border} ${g.color}`}
            >
              {g.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            {entry.totalKeywords} keywords · {entry.highPriorityMissing}{" "}
            high-priority missing
          </p>
        </div>

        {/* Date + toggle */}
        <div className="text-right shrink-0 flex flex-col items-end gap-2">
          <span className="text-[10px] font-mono text-muted-foreground">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/50">
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {expanded ? (
            <ChevronUpIcon className="size-4 text-muted-foreground group-hover:text-foreground" />
          ) : (
            <ChevronDownIcon className="size-4 text-muted-foreground group-hover:text-foreground" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border/50 px-6 py-5 flex flex-col gap-4">
          {/* JD preview */}
          {entry.jobPreview && (
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                Job Preview
              </p>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                {entry.jobPreview.slice(0, 200)}…
              </p>
            </div>
          )}

          {/* Score bar */}
          <div>
            <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              ATS Match Score
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-none overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${g.bar}`}
                  style={{ width: `${entry.atsScore}%` }}
                />
              </div>
              <span className={`text-sm font-bold ${g.color}`}>
                {entry.atsScore}/100
              </span>
            </div>
            {entry.benchmark && (
              <p className="text-[10px] text-muted-foreground font-mono mt-1">
                Industry coverage: {entry.benchmark.industryCoveragePercent}%
              </p>
            )}
          </div>

          {/* Keywords */}
          <div className="grid sm:grid-cols-2 gap-4">
            {foundKw.length > 0 && (
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-1">
                  <CheckCircleIcon className="size-3" /> Found ({foundKw.length}
                  )
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {foundKw.slice(0, 10).map((k, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono rounded-none"
                    >
                      {k.keyword}
                    </span>
                  ))}
                  {foundKw.length > 10 && (
                    <span className="text-[10px] text-muted-foreground font-mono">
                      +{foundKw.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            )}
            {missingKw.length > 0 && (
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-rose-600 mb-2 flex items-center gap-1">
                  <AlertTriangleIcon className="size-3" /> Missing (
                  {missingKw.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missingKw.slice(0, 10).map((k, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded-none border ${k.priority === "High" ? "bg-rose-50 border-rose-300 text-rose-700 font-bold" : "bg-rose-50/50 border-rose-200 text-rose-600"}`}
                    >
                      {k.keyword}
                    </span>
                  ))}
                  {missingKw.length > 10 && (
                    <span className="text-[10px] text-muted-foreground font-mono">
                      +{missingKw.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section gaps */}
          {entry.sectionGaps.length > 0 && (
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Section Gaps
              </p>
              <div className="flex flex-col gap-1.5">
                {entry.sectionGaps.slice(0, 4).map((g, i) => (
                  <div
                    key={i}
                    className="text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <span className="font-mono font-bold text-foreground shrink-0">
                      {g.keyword}
                    </span>
                    <span>missing in {g.missingIn.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function KeywordHistoryPage() {
  const [user, loading] = useAuthState(auth);
  const [history, setHistory] = useState<KeywordEntry[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    fetch(`/api/keyword-history?userId=${user.uid}`)
      .then((r) => r.json())
      .then((data) => {
        setHistory(Array.isArray(data) ? data : []);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [user?.uid]);

  const avgScore =
    history.length > 0
      ? Math.round(history.reduce((s, e) => s + e.atsScore, 0) / history.length)
      : null;
  const best =
    history.length > 0 ? Math.max(...history.map((e) => e.atsScore)) : null;

  if (loading || fetching) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background text-foreground min-h-screen flex items-center justify-center">
          <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background text-foreground min-h-screen">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-border"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground/20" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/dashboard/keyword-gap-analysis"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Keyword Gap
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground/20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground/80 text-sm">
                    History
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <Link
              href="/dashboard/keyword-gap-analysis"
              className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              <ZapIcon className="size-3.5" /> New Analysis
            </Link>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8 relative">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
          <div className="relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
              Resume Tools
            </p>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              Keyword{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                History
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              Track how your keyword match improves over time
            </p>
          </div>

          {history.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Total Analyses",
                  value: history.length,
                  icon: HistoryIcon,
                },
                {
                  label: "Avg ATS Score",
                  value: avgScore ?? "—",
                  icon: TrendingUpIcon,
                },
                {
                  label: "Best Score",
                  value: best ?? "—",
                  icon: ScanSearchIcon,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="group rounded-none bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/30 p-5 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <s.icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 tabular-nums">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!user ? (
            <div className="text-center py-16 text-muted-foreground text-sm">
              Sign in to see your history.
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-2xl scale-150" />
                <div className="relative size-16 rounded-none bg-card border border-border flex items-center justify-center">
                  <HistoryIcon className="size-7 text-primary/40" />
                </div>
              </div>
              <div>
                <p className="text-foreground font-semibold">No analyses yet</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Run your first keyword gap analysis to track progress.
                </p>
              </div>
              <Link
                href="/dashboard/keyword-gap-analysis"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-blue-600 rounded-none text-primary-foreground text-sm font-semibold shadow-[0_0_20px_oklch(0.62_0.26_278/0.25)] hover:shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)] transition-all"
              >
                <ZapIcon className="size-4" /> Analyze Keywords
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 relative">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {history.length} analys{history.length !== 1 ? "es" : "is"} ·
                newest first
              </p>
              {history.map((entry) => (
                <KeywordCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
