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
  FileTextIcon,
  TrendingUpIcon,
  TagIcon,
  BriefcaseIcon,
  HistoryIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";

type HistoryEntry = {
  id: string;
  ats_score: number;
  sections: {
    formatting: number;
    impact: number;
    keywords: number;
    experience: number;
    education: number;
  };
  top_strengths: string[];
  top_improvements: string[];
  recruiter_verdict: string;
  keywords_found: string[];
  keywords_missing: string[];
  resume_preview: string;
  had_job_description: boolean;
  createdAt: string;
};

function scoreGrade(score: number) {
  if (score >= 85)
    return {
      label: "Excellent",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      bar: "from-indigo-500 to-violet-500",
    };
  if (score >= 70)
    return {
      label: "Good",
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-200",
      bar: "from-teal-500 to-emerald-400",
    };
  if (score >= 55)
    return {
      label: "Fair",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      bar: "from-amber-500 to-orange-400",
    };
  return {
    label: "Needs Work",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    bar: "from-rose-500 to-pink-500",
  };
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const g = scoreGrade(score);
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest w-20 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-muted rounded-none overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${g.bar} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span
        className={`text-xs font-bold tabular-nums ${g.color} w-8 text-right`}
      >
        {score}
      </span>
    </div>
  );
}

function HistoryCard({ entry }: { entry: HistoryEntry }) {
  const [expanded, setExpanded] = useState(false);
  const g = scoreGrade(entry.ats_score);
  const date = new Date(entry.createdAt);

  return (
    <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden">
      {/* Card header */}
      <div
        className="flex items-center gap-4 px-6 py-4 cursor-pointer group"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Score badge */}
        <div
          className={`size-16 rounded-none flex flex-col items-center justify-center shrink-0 ${g.bg} border ${g.border}`}
        >
          <span className={`text-xl font-black tabular-nums ${g.color}`}>
            {entry.ats_score}
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
            <span
              className={`text-[10px] font-bold font-mono uppercase tracking-widest px-2 py-0.5 rounded-none ${g.bg} ${g.border} border ${g.color}`}
            >
              {g.label}
            </span>
            {entry.had_job_description && (
              <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none flex items-center gap-1">
                <BriefcaseIcon className="size-2.5" /> With JD
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-1.5 truncate">
            {entry.resume_preview.slice(0, 80).trim()}…
          </p>
        </div>

        {/* Date + toggle */}
        <div className="text-right shrink-0 flex flex-col items-end gap-2">
          <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
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
            <ChevronUpIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          ) : (
            <ChevronDownIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          )}
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border/50 px-6 py-5 flex flex-col gap-5">
          {/* Section scores */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Section Scores
            </p>
            <div className="flex flex-col gap-2">
              <ScoreBar score={entry.sections.formatting} label="Format" />
              <ScoreBar score={entry.sections.impact} label="Impact" />
              <ScoreBar score={entry.sections.keywords} label="Keywords" />
              <ScoreBar score={entry.sections.experience} label="Exp." />
              <ScoreBar score={entry.sections.education} label="Edu." />
            </div>
          </div>

          {/* Keywords */}
          {(entry.keywords_found.length > 0 ||
            entry.keywords_missing.length > 0) && (
            <div className="grid sm:grid-cols-2 gap-4">
              {entry.keywords_found.length > 0 && (
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 mb-2">
                    ✓ Keywords found
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.keywords_found.slice(0, 8).map((k, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-none text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono"
                      >
                        {k}
                      </span>
                    ))}
                    {entry.keywords_found.length > 8 && (
                      <span className="text-[10px] text-muted-foreground font-mono">
                        +{entry.keywords_found.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              {entry.keywords_missing.length > 0 && (
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-rose-600 mb-2">
                    ✗ Missing keywords
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.keywords_missing.slice(0, 8).map((k, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-none text-[10px] bg-rose-50 border border-rose-200 text-rose-700 font-mono"
                      >
                        {k}
                      </span>
                    ))}
                    {entry.keywords_missing.length > 8 && (
                      <span className="text-[10px] text-muted-foreground font-mono">
                        +{entry.keywords_missing.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recruiter verdict */}
          {entry.recruiter_verdict && (
            <div className="rounded-none bg-amber-50 border border-amber-100 px-4 py-3">
              <p className="text-[9px] font-mono uppercase tracking-widest text-amber-500 mb-1">
                Recruiter Verdict
              </p>
              <p className="text-xs text-foreground/75 italic leading-relaxed">
                &ldquo;{entry.recruiter_verdict}&rdquo;
              </p>
            </div>
          )}

          {/* Top improvement */}
          {entry.top_improvements.length > 0 && (
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Top improvement
              </p>
              <p className="text-xs text-foreground/75 leading-relaxed pl-3 border-l-2 border-primary/30">
                {entry.top_improvements[0]}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ResumeHistoryPage() {
  const [user, loading] = useAuthState(auth);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    fetch(`/api/resume-history?userId=${user.uid}`)
      .then((r) => r.json())
      .then((data) => {
        setHistory(Array.isArray(data) ? data : []);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [user?.uid]);

  const avgScore =
    history.length > 0
      ? Math.round(
          history.reduce((s, e) => s + e.ats_score, 0) / history.length,
        )
      : null;
  const best =
    history.length > 0 ? Math.max(...history.map((e) => e.ats_score)) : null;

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
        {/* Header */}
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
                    href="/dashboard/resume-scorer"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Resume Scorer
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
              href="/dashboard/resume-scorer"
              className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              <ZapIcon className="size-3.5" />
              New Score
            </Link>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8 relative">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-primary/5 blur-[120px] rounded-full" />

          {/* Page title */}
          <div className="relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
              Resume Tools
            </p>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              Score{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                History
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              Track your resume improvement over time
            </p>
          </div>

          {/* Stats row */}
          {history.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Total Scans",
                  value: history.length,
                  icon: HistoryIcon,
                },
                {
                  label: "Avg Score",
                  value: avgScore ?? "—",
                  icon: TrendingUpIcon,
                },
                { label: "Best Score", value: best ?? "—", icon: TagIcon },
              ].map((s) => (
                <div
                  key={s.label}
                  className="group rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm hover:border-primary/30 p-5 transition-all"
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

          {/* History list */}
          {!user ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <FileTextIcon className="size-10 text-muted-foreground/30" />
              <p className="text-muted-foreground text-sm">
                Sign in to see your resume history.
              </p>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-none bg-primary/10 blur-2xl scale-150" />
                <div className="relative size-16 rounded-none bg-card border border-border flex items-center justify-center">
                  <HistoryIcon className="size-7 text-primary/40" />
                </div>
              </div>
              <div>
                <p className="text-foreground font-semibold">No history yet</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Score your resume for the first time to start tracking your
                  progress.
                </p>
              </div>
              <Link
                href="/dashboard/resume-scorer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-blue-600 rounded-none text-primary-foreground text-sm font-semibold shadow-[0_0_20px_oklch(0.62_0.26_278/0.25)] hover:shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)] transition-all"
              >
                <ZapIcon className="size-4" />
                Score My Resume
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 relative">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {history.length} scan{history.length !== 1 ? "s" : ""} ·
                  newest first
                </p>
              </div>
              {history.map((entry) => (
                <HistoryCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
