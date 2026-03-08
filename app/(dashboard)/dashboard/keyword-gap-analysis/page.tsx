"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AlertTriangleIcon,
  ZapIcon,
  CheckCircleIcon,
  BriefcaseIcon,
  BuildingIcon,
  FileTextIcon,
  TargetIcon,
  BarChartIcon,
  InfoIcon,
  ArrowUpRightIcon,
  ArrowLeftIcon,
  HistoryIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KeywordItem {
  keyword: string;
  importance: "Required" | "Preferred";
  frequencyInJD: number;
  priority: "High" | "Medium" | "Low";
  matchType: "Full" | "Partial" | "Missing";
  rewriteSuggestion: string;
}

interface AnalysisResponse {
  atsScore: number;
  keywords: KeywordItem[];
  densityReport: Record<
    string,
    { count: number; idealRange: string; status: string }
  >;
  sectionGaps: {
    keyword: string;
    missingIn: string[];
    suggestion: string;
  }[];
}

function KwLoadingScreen({
  step,
  steps,
  tips,
  resumeLength,
}: {
  step: number;
  steps: { label: string; detail: string }[];
  tips: string[];
  resumeLength: number;
}) {
  const [tipIdx, setTipIdx] = useState(0);
  const [fakeBytes, setFakeBytes] = useState(0);
  const [barPct, setBarPct] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTipIdx((i) => (i + 1) % tips.length), 7000);
    return () => clearInterval(t);
  }, [tips.length]);

  useEffect(() => {
    const target = resumeLength;
    const t = setInterval(() => {
      setFakeBytes((b) => {
        const next = b + Math.floor(Math.random() * 22 + 6);
        return next >= target ? target : next;
      });
    }, 40);
    return () => clearInterval(t);
  }, [resumeLength]);

  useEffect(() => {
    const target = Math.min(((step + 1) / steps.length) * 92, 92);
    const t = setInterval(() => {
      setBarPct((p) => {
        if (p >= target) {
          clearInterval(t);
          return p;
        }
        return Math.min(p + 0.6, target);
      });
    }, 30);
    return () => clearInterval(t);
  }, [step, steps.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-10 py-10 animate-in fade-in duration-500">
      {/* Central orb */}
      <div className="relative flex items-center justify-center">
        <div className="absolute size-40 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute size-24 rounded-full bg-emerald-500/15 blur-2xl animate-pulse delay-300" />
        <div className="relative size-20 rounded-none border border-primary/30 bg-card/80 backdrop-blur-xl flex flex-col items-center justify-center gap-1 shadow-[0_0_40px_oklch(0.62_0.26_278/0.2)]">
          <span className="text-2xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-primary to-emerald-500">
            {Math.round(barPct)}
          </span>
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
            %
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md flex flex-col gap-2">
        <div className="h-1 w-full bg-muted rounded-none overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-300"
            style={{ width: `${barPct}%` }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Analyzing keywords…
          </span>
          <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
            {fakeBytes.toLocaleString()} / {resumeLength.toLocaleString()} chars
          </span>
        </div>
      </div>

      {/* Step checklist */}
      <div className="w-full max-w-md flex flex-col gap-3">
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div
              key={i}
              className={`flex items-start gap-3 px-4 py-3 rounded-none border transition-all duration-500 ${
                done
                  ? "border-emerald-200 bg-emerald-50/60"
                  : active
                    ? "border-primary/40 bg-primary/5 shadow-[0_0_16px_oklch(0.62_0.26_278/0.08)]"
                    : "border-border/30 opacity-35"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {done ? (
                  <div className="size-4 rounded-none bg-emerald-500 flex items-center justify-center">
                    <svg
                      className="size-2.5 text-white"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M1.5 5l2.5 2.5 4.5-4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : active ? (
                  <div className="size-4 rounded-none border-2 border-primary/60 border-t-primary animate-spin" />
                ) : (
                  <div className="size-4 rounded-none border border-border/50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold ${done ? "text-emerald-700" : active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s.label}
                </p>
                {active && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed animate-in fade-in duration-300">
                    {s.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cycling tip */}
      <div className="w-full max-w-md rounded-none bg-amber-50 border border-amber-100 px-5 py-3.5">
        <p className="text-[9px] font-mono uppercase tracking-widest text-amber-500 mb-1">
          💡 Pro Tip
        </p>
        <p className="text-xs text-foreground/70 leading-relaxed" key={tipIdx}>
          {tips[tipIdx]}
        </p>
      </div>
    </div>
  );
}

export default function KeywordGapAnalysisPage() {
  const [user] = useAuthState(auth);
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [saved, setSaved] = useState(false);
  const [step, setStep] = useState(0);

  const ANALYSIS_STEPS = [
    {
      label: "Parsing job description",
      detail: "Extracting required & preferred keywords from the JD",
    },
    {
      label: "Scanning your resume",
      detail: "Identifying skills, achievements & section structure",
    },
    {
      label: "Running keyword matching",
      detail: "Detecting full, partial & missing keyword matches",
    },
    {
      label: "Scoring ATS alignment",
      detail: "Benchmarking against industry-standard ATS criteria",
    },
    {
      label: "Generating gap report",
      detail: "Building rewrite suggestions & section-level gaps",
    },
  ];

  const TIPS = [
    "Mirror the exact phrasing from the job description whenever possible.",
    "ATS systems often fail on multi-column layouts — keep it single column.",
    "Putting keywords in a dedicated Skills section boosts ATS match by ~30%.",
    "High-priority keywords in the JD usually appear 3+ times — match that.",
    "Spell out acronyms at least once: 'Machine Learning (ML)' beats just 'ML'.",
    "Tailoring your resume per application can increase callback rates by 3×.",
  ];

  async function handleAnalyze() {
    if (!resume.trim() || !jobDesc.trim()) {
      setError("Please provide both resume and job description.");
      return;
    }

    setError(null);
    setLoading(true);
    setAnalysis(null);
    setSaved(false);
    setStep(0);

    const stepInterval = setInterval(
      () => setStep((s) => Math.min(s + 1, ANALYSIS_STEPS.length - 2)),
      5000,
    );

    try {
      const res = await fetch("/api/keyword-gap-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "analyze",
          role,
          industry,
          resume,
          jobDescription: jobDesc,
          userId: user?.uid ?? null,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error)
        throw new Error(data.error || "Analysis failed");

      setAnalysis(data.analysis);
      if (user?.uid) setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      clearInterval(stepInterval);
      setStep(ANALYSIS_STEPS.length - 1);
      setTimeout(() => {
        setLoading(false);
        setStep(0);
      }, 400);
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-xl">
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
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground/80 text-sm">
                    Keyword Gap Analysis
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4 flex items-center gap-3">
            <a
              href="/dashboard/keyword-history"
              className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              <HistoryIcon className="size-3.5" />
              History
            </a>
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              AI Resume Checker Online
            </span>
          </div>
        </header>

        {/* Main content */}
        <div className="p-6 lg:p-8 flex flex-col gap-8">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
              Resume Improvement
            </p>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              Keyword Gap{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
                Analysis
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              Improve your resume with more JD acceptable keywords.
            </p>
          </div>
          {saved && (
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-none">
              ✓ Saved to history
            </span>
          )}

          {/* Loading theatre */}
          {loading && (
            <KwLoadingScreen
              step={step}
              steps={ANALYSIS_STEPS}
              tips={TIPS}
              resumeLength={resume.length + jobDesc.length}
            />
          )}

          {!analysis && !loading && (
            <div className="flex flex-col gap-8">
              {/* Inputs */}
              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-4">
                  {/* Target Role */}
                  <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden focus-within:border-primary/40 transition-colors duration-300">
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
                      <BriefcaseIcon className="size-4 text-primary/50" />
                      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Target Role
                      </span>
                    </div>
                    <input
                      placeholder="e.g. Frontend Developer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 font-mono focus:outline-none"
                    />
                  </div>

                  {/* Industry */}
                  <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden focus-within:border-primary/40 transition-colors duration-300">
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
                      <BuildingIcon className="size-4 text-primary/50" />
                      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Industry
                      </span>
                    </div>
                    <input
                      placeholder="e.g. Technology"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 font-mono focus:outline-none"
                    />
                  </div>

                  {/* Resume */}
                  <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden focus-within:border-primary/40 transition-colors duration-300">
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
                      <FileTextIcon className="size-4 text-primary/50" />
                      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Resume Text
                      </span>
                      <span className="ml-auto text-[10px] font-mono text-muted-foreground/60">
                        {resume.length} chars
                      </span>
                    </div>
                    <textarea
                      placeholder="Paste your resume here..."
                      value={resume}
                      onChange={(e) => {
                        setResume(e.target.value);
                        setError(null);
                      }}
                      className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground/30 font-mono resize-none focus:outline-none leading-loose overflow-y-auto"
                      style={{ minHeight: "200px" }}
                    />
                  </div>
                </div>

                {/* Job Description (Right sidebar style) */}
                <div className="flex flex-col h-full gap-4">
                  <div className="h-full min-h-[400px] rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden focus-within:border-primary/40 transition-colors duration-300 flex flex-col">
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
                      <BriefcaseIcon className="size-4 text-primary/50" />
                      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Job Description
                      </span>
                      <span className="ml-auto text-[10px] font-mono text-muted-foreground/60">
                        {jobDesc.length} chars
                      </span>
                    </div>
                    <textarea
                      placeholder="Paste the job description here..."
                      value={jobDesc}
                      onChange={(e) => {
                        setJobDesc(e.target.value);
                        setError(null);
                      }}
                      className="w-full flex-1 bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground/30 font-mono resize-none focus:outline-none leading-loose overflow-y-auto"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-none bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                  <AlertTriangleIcon className="size-4 shrink-0 text-rose-500" />
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!resume.trim() || !jobDesc.trim()}
                className="group flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-primary to-blue-600 rounded-none text-primary-foreground text-sm font-bold shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)] hover:shadow-[0_0_45px_oklch(0.62_0.26_278/0.6)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed w-fit"
              >
                <ZapIcon className="size-4 group-hover:scale-110 transition-transform" />
                Analyze Alignment
                <ArrowUpRightIcon className="size-3.5 opacity-60" />
              </button>
            </div>
          )}

          {/* Results */}
          {analysis && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-start">
                <button
                  onClick={() => setAnalysis(null)}
                  className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Editor
                </button>
              </div>
              {/* Score Card */}
              <div className="rounded-none bg-card/50 backdrop-blur-xl border border-emerald-500/30 bg-emerald-500/5 shadow-sm p-8 overflow-hidden relative flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="flex items-center gap-6 relative z-10">
                  <div className="flex items-center justify-center size-20 rounded-none bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
                    <ZapIcon className="size-10" />
                  </div>
                  <div>
                    <h2 className="text-sm font-mono tracking-widest uppercase text-emerald-600/80 mb-1">
                      Match Potential
                    </h2>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl font-black tracking-tighter text-foreground">
                        {analysis.atsScore}
                      </span>
                      <span className="text-xl font-bold text-muted-foreground">
                        /100
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right max-w-xs text-sm text-muted-foreground relative z-10">
                  {analysis.atsScore >= 80 ? (
                    <span className="text-emerald-600 font-medium">
                      Strong match!
                    </span>
                  ) : analysis.atsScore >= 60 ? (
                    <span className="text-amber-600 font-medium">
                      Good start.
                    </span>
                  ) : (
                    <span className="text-rose-600 font-medium">
                      Needs work.
                    </span>
                  )}{" "}
                  Review the priority keywords below to optimize your resume for
                  this specific role.
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column: Keywords & Sections */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-7">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <TargetIcon className="h-5 w-5 text-primary" />
                        Priority Keywords
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Keywords ranked by importance to this specific role.
                      </p>
                    </div>
                    <div className="grid gap-4">
                      {analysis.keywords.map((k, i) => (
                        <div
                          key={i}
                          className="flex flex-col gap-3 p-4 border border-border/50 bg-background/50 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <strong className="text-base text-card-foreground">
                                {k.keyword}
                              </strong>
                              <Badge
                                variant={
                                  k.priority === "High"
                                    ? "default"
                                    : k.priority === "Medium"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="uppercase text-[10px] tracking-wider"
                              >
                                {k.priority} Priority
                              </Badge>
                            </div>
                            <Badge
                              variant={
                                k.matchType === "Full"
                                  ? "default"
                                  : k.matchType === "Partial"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                k.matchType === "Full"
                                  ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/30"
                                  : k.matchType === "Partial"
                                    ? "bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-500/30"
                                    : ""
                              }
                            >
                              {k.matchType === "Full" ? (
                                <CheckCircleIcon className="mr-1 size-3" />
                              ) : k.matchType === "Missing" ? (
                                <AlertTriangleIcon className="mr-1 size-3" />
                              ) : (
                                <InfoIcon className="mr-1 size-3" />
                              )}
                              {k.matchType} Match
                            </Badge>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground w-full">
                            <span className="flex items-center gap-1">
                              <InfoIcon className="size-3" /> {k.importance}
                            </span>
                            <span className="w-1 h-1 rounded-none bg-border" />
                            <span>Appears {k.frequencyInJD}x in JD</span>
                          </div>

                          {k.matchType === "Missing" && (
                            <div className="mt-2 text-sm bg-blue-500/10 border-l-2 border-primary/50 text-blue-700 dark:text-blue-400 p-3">
                              <span className="font-semibold block mb-1 text-xs uppercase tracking-wider text-primary/80">
                                Suggestion
                              </span>
                              {k.rewriteSuggestion}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-7">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <FileTextIcon className="h-5 w-5 text-primary" />
                        Section-Based Gaps
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Keywords that are missing from crucial sections.
                      </p>
                    </div>
                    <div className="grid gap-4">
                      {analysis.sectionGaps.map((g, i) => (
                        <div
                          key={i}
                          className="flex flex-col gap-2 p-4 border border-border/50 bg-background/50 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-2">
                            <strong className="text-card-foreground text-base">
                              {g.keyword}
                            </strong>
                            <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1">
                              Missing in: {g.missingIn.join(", ")}
                            </span>
                          </div>
                          <p className="text-sm mt-1 text-muted-foreground border-l-2 border-primary/30 pl-3 py-1">
                            {g.suggestion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-7 h-fit sticky top-20">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <BarChartIcon className="h-5 w-5 text-primary" />
                        Density Report
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Are you overusing or underusing keywords?
                      </p>
                    </div>
                    <div className="grid gap-3">
                      {Object.entries(analysis.densityReport).map(
                        ([key, value], i) => (
                          <div
                            key={i}
                            className="flex flex-col gap-2 p-3 border border-border/50 bg-background/50 relative overflow-hidden group"
                          >
                            <div className="flex justify-between items-start z-10 gap-2 flex-wrap">
                              <span className="font-semibold text-sm">
                                {key}
                              </span>
                              <Badge
                                variant={
                                  value.status.includes("Good")
                                    ? "outline"
                                    : "secondary"
                                }
                                className={
                                  value.status.includes("Good")
                                    ? "border-emerald-500/30 text-emerald-600 bg-emerald-500/5 text-[10px]"
                                    : "bg-amber-500/10 text-amber-600 text-[10px]"
                                }
                              >
                                {value.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground z-10 w-full mt-1">
                              <span>
                                Count:{" "}
                                <span className="text-foreground font-medium">
                                  {value.count}
                                </span>
                              </span>
                              <span>
                                Ideal:{" "}
                                <span className="text-foreground font-medium">
                                  {value.idealRange}
                                </span>
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
