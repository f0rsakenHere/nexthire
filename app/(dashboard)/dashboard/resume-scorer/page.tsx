"use client";

import { useState, useRef, useEffect } from "react";
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
  BriefcaseIcon,
  ZapIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  SparklesIcon,
  RotateCcwIcon,
  TrendingUpIcon,
  TagIcon,
  BrainIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
  ArrowUpRightIcon,
  ChevronRightIcon,
  HistoryIcon,
} from "lucide-react";
interface ResumeResult {
  ats_score: number;
  sections: {
    formatting: { score: number; issues: string[] };
    impact: { score: number; feedback: string };
    keywords: { score: number; found: string[]; missing: string[] };
    experience: { score: number; feedback: string };
    education: { score: number; feedback: string };
  };
  top_strengths: string[];
  top_improvements: string[];
  recruiter_verdict: string;
  summary: string;
}

function scoreGrade(score: number) {
  if (score >= 85)
    return {
      label: "Excellent",
      color: "#6366f1",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-600",
      bar: "from-indigo-500 to-violet-500",
    };
  if (score >= 70)
    return {
      label: "Good",
      color: "#0d9488",
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-600",
      bar: "from-teal-500 to-emerald-400",
    };
  if (score >= 55)
    return {
      label: "Fair",
      color: "#d97706",
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-600",
      bar: "from-amber-500 to-orange-400",
    };
  return {
    label: "Needs Work",
    color: "#e11d48",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-600",
    bar: "from-rose-500 to-pink-500",
  };
}

function ScoreRing({ score }: { score: number }) {
  const g = scoreGrade(score);
  const r = 70;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-none opacity-20 blur-xl"
        style={{ background: g.color }}
      />
      <svg
        className="rotate-[-90deg] drop-shadow-2xl"
        width="192"
        height="192"
        viewBox="0 0 192 192"
      >
        {/* Track */}
        <circle
          cx="96"
          cy="96"
          r={r}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="12"
        />
        {/* Fill */}
        <circle
          cx="96"
          cy="96"
          r={r}
          fill="none"
          stroke={g.color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          style={{
            filter: `drop-shadow(0 0 12px ${g.color})`,
            transition: "stroke-dasharray 1.2s ease",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center gap-1">
        <span className="text-5xl font-black text-foreground tracking-tight">
          {score}
        </span>
        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.25em]">
          out of 100
        </span>
      </div>
    </div>
  );
}

function SectionCard({
  label,
  score,
  icon,
  sub,
}: {
  label: string;
  score: number;
  icon: React.ReactNode;
  sub?: string;
}) {
  const g = scoreGrade(score);
  return (
    <div className="relative rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-5 flex flex-col gap-3 group hover:shadow-md hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-none ${g.bg} ${g.border} border`}>
          <span className={g.text}>{icon}</span>
        </div>
        <span className={`text-3xl font-black ${g.text} tracking-tight`}>
          {score}
        </span>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          {label}
        </p>
        {sub && (
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{sub}</p>
        )}
      </div>
    </div>
  );
}

function EmptyHero({ onExampleClick }: { onExampleClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-none bg-primary/20 blur-3xl scale-150" />
        <div className="relative w-24 h-24 rounded-none bg-card border border-border flex items-center justify-center">
          <FileTextIcon className="size-10 text-primary/60" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Paste your resume
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Get an instant ATS score + actionable AI feedback
        </p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          "Formatting check",
          "Keyword analysis",
          "Impact scoring",
          "Improvement plan",
        ].map((f) => (
          <span
            key={f}
            className="px-3 py-1.5 rounded-none text-xs bg-muted border border-border text-muted-foreground"
          >
            ✓ {f}
          </span>
        ))}
      </div>
      <button
        onClick={onExampleClick}
        className="text-xs text-primary/60 hover:text-primary transition-colors flex items-center gap-1 font-mono"
      >
        Try with a sample resume <ChevronRightIcon className="size-3" />
      </button>
    </div>
  );
}

const SAMPLE_RESUME = `John Smith
john.smith@email.com | linkedin.com/in/johnsmith | github.com/johnsmith

SUMMARY
Full-Stack Software Engineer with 4 years of experience building scalable web applications using React, Node.js, and PostgreSQL. Led development of SaaS product serving 10,000+ users.

EXPERIENCE
Senior Software Engineer — TechCorp Inc.            2022 - Present
- Built customer dashboard that reduced support tickets by 35%
- Led migration from REST to GraphQL, cutting API response time by 40%
- Mentored 3 junior engineers and conducted 50+ code reviews

Software Engineer — StartupXYZ                      2020 - 2022
- Developed core payment flow processing $2M+ monthly transactions
- Integrated Stripe, Plaid, and Twilio APIs

SKILLS
JavaScript, TypeScript, React, Node.js, PostgreSQL, AWS, Docker, GraphQL

EDUCATION
B.S. Computer Science — State University            2016 - 2020`;

function AnalysisLoadingScreen({
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

  // Rotate tips every 7s
  useEffect(() => {
    const t = setInterval(() => setTipIdx((i) => (i + 1) % tips.length), 7000);
    return () => clearInterval(t);
  }, [tips.length]);

  // Smooth fake bytes counter (runs until resumeLength)
  useEffect(() => {
    const target = resumeLength;
    const t = setInterval(() => {
      setFakeBytes((b) => {
        const next = b + Math.floor(Math.random() * 18 + 4);
        return next >= target ? target : next;
      });
    }, 40);
    return () => clearInterval(t);
  }, [resumeLength]);

  // Progress bar: each step covers ~20% of bar, smoothly animated
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
      {/* Central glow orb */}
      <div className="relative flex items-center justify-center">
        <div className="absolute size-40 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute size-24 rounded-full bg-blue-500/15 blur-2xl animate-pulse delay-300" />
        <div className="relative size-20 rounded-none border border-primary/30 bg-card/80 backdrop-blur-xl flex flex-col items-center justify-center gap-1 shadow-[0_0_40px_oklch(0.62_0.26_278/0.2)]">
          <span className="text-2xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-primary to-blue-500">
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
            className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-300"
            style={{ width: `${barPct}%` }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Analyzing resume…
          </span>
          <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
            {fakeBytes.toLocaleString()} / {resumeLength.toLocaleString()} bytes
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
              {/* Status icon */}
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
          💡 Did you know?
        </p>
        <p
          className="text-xs text-foreground/70 leading-relaxed transition-all duration-500"
          key={tipIdx}
        >
          {tips[tipIdx]}
        </p>
      </div>
    </div>
  );
}

export default function ResumeScorerPage() {
  const [user] = useAuthState(auth);
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [showJD, setShowJD] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);

  const resumeRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea whenever `resume` changes (covers both typing and programmatic updates)
  useEffect(() => {
    const el = resumeRef.current;
    if (!el) return;
    el.style.height = "auto";
    // Cap at 500px — scroll beyond that
    el.style.height = Math.min(el.scrollHeight, 500) + "px";
  }, [resume]);

  const ANALYSIS_STEPS = [
    {
      label: "Parsing resume structure",
      detail: "Identifying sections, headers & formatting patterns",
    },
    {
      label: "Running ATS compatibility checks",
      detail: "Checking keyword density across 40+ ATS filters",
    },
    {
      label: "Scoring section impact",
      detail: "Evaluating bullet strength, quantification & action verbs",
    },
    {
      label: "Keyword gap analysis",
      detail: "Matching against industry-standard keyword databases",
    },
    {
      label: "Generating AI report",
      detail: "Compiling scores, verdicts & personalized recommendations",
    },
  ];

  const TIPS = [
    "Resumes with quantified achievements score 40% higher on average.",
    "ATS systems reject ~75% of resumes before a human ever sees them.",
    "Using the exact job title from the listing boosts keyword match significantly.",
    "Single-column layouts outperform multi-column in most ATS systems.",
    "Adding a Skills section increases ATS match score by up to 30%.",
    "Action verbs like 'engineered', 'led', and 'shipped' signal high impact.",
  ];

  async function handleScore() {
    if (resume.trim().length < 50) {
      setError("Paste at least 50 characters of your resume.");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    setSaved(false);
    setStep(0);

    // Advance through steps: first 4 steps in ~20s, last step holds until done
    const stepInterval = setInterval(
      () => setStep((s) => Math.min(s + 1, ANALYSIS_STEPS.length - 2)),
      5000,
    );

    try {
      const res = await fetch("/api/resume-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume,
          jobDescription: jobDesc || undefined,
          userId: user?.uid ?? null,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Unknown error");
      setResult(data);
      if (user?.uid) setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      clearInterval(stepInterval);
      // Jump to last step briefly so user sees completion
      setStep(ANALYSIS_STEPS.length - 1);
      setTimeout(() => {
        setLoading(false);
        setStep(0);
      }, 400);
    }
  }

  function reset() {
    setResume("");
    setJobDesc("");
    setResult(null);
    setError(null);
  }

  const g = result ? scoreGrade(result.ats_score) : null;

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
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground/80 text-sm">
                    AI Resume Scorer
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4 flex items-center gap-3">
            <a
              href="/dashboard/resume-history"
              className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              <HistoryIcon className="size-3.5" />
              History
            </a>
            <span className="size-1.5 rounded-none bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              AI Online
            </span>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8">
          {/* ── Page title ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                Resume Tools
              </p>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
                AI Resume{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  Scorer
                </span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5">
                Paste your resume · get scored · know exactly what to fix
              </p>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-none">
                  ✓ Saved to history
                </span>
              )}
              {result && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-none border border-transparent hover:border-border hover:bg-muted/50 text-xs text-muted-foreground hover:text-foreground transition-all font-mono"
                >
                  <RotateCcwIcon className="size-3" /> New resume
                </button>
              )}
            </div>
          </div>

          {/* ── Full-page analysis theatre (during loading) ── */}
          {loading && (
            <AnalysisLoadingScreen
              step={step}
              steps={ANALYSIS_STEPS}
              tips={TIPS}
              resumeLength={resume.length}
            />
          )}

          {!result && !loading && (
            <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
              {/* Left — resume input */}
              <div className="flex flex-col gap-4">
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
                    ref={resumeRef}
                    value={resume}
                    onChange={(e) => {
                      setResume(e.target.value);
                      setError(null);
                    }}
                    className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground/30 font-mono resize-none focus:outline-none leading-loose overflow-y-auto"
                    style={{ minHeight: "200px", maxHeight: "500px" }}
                  />
                </div>

                {/* JD toggle */}
                <div>
                  <button
                    onClick={() => setShowJD((v) => !v)}
                    className="flex items-center gap-2 text-xs font-mono text-primary/60 hover:text-primary transition-colors uppercase tracking-widest"
                  >
                    <BriefcaseIcon className="size-3.5" />
                    {showJD
                      ? "Hide job description"
                      : "+ Add job description (optional)"}
                  </button>

                  {showJD && (
                    <div className="mt-3 rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden focus-within:border-primary/40 transition-colors">
                      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
                        <BriefcaseIcon className="size-4 text-primary/50" />
                        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                          Job Description
                        </span>
                      </div>
                      <textarea
                        value={jobDesc}
                        onChange={(e) => {
                          setJobDesc(e.target.value);
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        placeholder="Paste the job description to tailor keyword scoring…"
                        style={{ minHeight: "140px", overflow: "hidden" }}
                        className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground/30 font-mono resize-none focus:outline-none leading-loose"
                      />
                    </div>
                  )}
                </div>

                {error && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-none bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                    <AlertTriangleIcon className="size-4 shrink-0 text-rose-500" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleScore}
                  disabled={resume.trim().length < 50}
                  className="group flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-primary to-blue-600 rounded-none text-primary-foreground text-sm font-bold shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)] hover:shadow-[0_0_45px_oklch(0.62_0.26_278/0.6)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed w-fit"
                >
                  <ZapIcon className="size-4 group-hover:scale-110 transition-transform" />
                  Score My Resume
                  <ArrowUpRightIcon className="size-3.5 opacity-60" />
                </button>
              </div>

              {/* Right — empty state / features */}
              <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-6 flex flex-col">
                <EmptyHero onExampleClick={() => setResume(SAMPLE_RESUME)} />

                {/* Feature list */}
                <div className="mt-auto space-y-3 pt-6 border-t border-border">
                  {[
                    {
                      icon: <TagIcon className="size-3.5" />,
                      text: "ATS keyword matching vs your target JD",
                    },
                    {
                      icon: <ShieldCheckIcon className="size-3.5" />,
                      text: "Formatting & structure audit",
                    },
                    {
                      icon: <TrendingUpIcon className="size-3.5" />,
                      text: "Impact scoring with quantification check",
                    },
                    {
                      icon: <SparklesIcon className="size-3.5" />,
                      text: "Prioritized improvement action plan",
                    },
                  ].map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs text-muted-foreground"
                    >
                      <span className="text-primary/70 shrink-0">{f.icon}</span>
                      {f.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {result && g && (
            <div className="flex flex-col gap-6">
              {/* Row 1: Score + Summary */}
              <div className="grid lg:grid-cols-[auto_1fr] gap-6">
                {/* Score hero */}
                <div className="relative rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-8 flex flex-col items-center gap-4 min-w-[260px]">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400">
                    ATS Score
                  </p>
                  <ScoreRing score={result.ats_score} />
                  <div
                    className={`px-4 py-1.5 rounded-none ${g.bg} ${g.border} border`}
                  >
                    <span className={`text-sm font-bold ${g.text}`}>
                      {g.label}
                    </span>
                  </div>
                </div>

                {/* Summary panel */}
                <div className="relative rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-8 flex flex-col gap-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
                      AI Summary
                    </p>
                    <p className="text-foreground/85 text-sm leading-relaxed">
                      {result.summary}
                    </p>
                  </div>

                  {/* Recruiter verdict */}
                  <div className="rounded-none bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 px-5 py-4">
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-amber-500 mb-2">
                      Recruiter Verdict
                    </p>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      &ldquo;{result.recruiter_verdict}&rdquo;
                    </p>
                  </div>

                  {/* Strengths */}
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-400 mb-3">
                      Top Strengths
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {result.top_strengths.map((s, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 pl-3 border-l-2 border-teal-300"
                        >
                          <CheckCircleIcon className="size-4 text-teal-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 leading-snug">
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: 5 section cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <SectionCard
                  label="Formatting"
                  score={result.sections.formatting.score}
                  icon={<FileTextIcon className="size-4" />}
                  sub={result.sections.formatting.issues[0]}
                />
                <SectionCard
                  label="Impact"
                  score={result.sections.impact.score}
                  icon={<TrendingUpIcon className="size-4" />}
                  sub={result.sections.impact.feedback}
                />
                <SectionCard
                  label="Keywords"
                  score={result.sections.keywords.score}
                  icon={<TagIcon className="size-4" />}
                  sub={`${result.sections.keywords.found.length} found · ${result.sections.keywords.missing.length} missing`}
                />
                <SectionCard
                  label="Experience"
                  score={result.sections.experience.score}
                  icon={<BrainIcon className="size-4" />}
                  sub={result.sections.experience.feedback}
                />
                <SectionCard
                  label="Education"
                  score={result.sections.education.score}
                  icon={<GraduationCapIcon className="size-4" />}
                  sub={result.sections.education.feedback}
                />
              </div>

              {/* Row 3: Keywords + Issues */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Keywords */}
                <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-7">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">
                    Keyword Analysis
                  </p>
                  {result.sections.keywords.found.length > 0 && (
                    <div className="mb-5">
                      <p className="text-[9px] font-mono uppercase tracking-widest text-emerald-700 mb-3">
                        ✓ Found in your resume
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.sections.keywords.found.map((k, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-none text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {result.sections.keywords.missing.length > 0 && (
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-rose-700 mb-3">
                        ✗ Missing — add these
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.sections.keywords.missing.map((k, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-none text-xs bg-rose-50 border border-rose-200 text-rose-700 font-mono"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Formatting issues */}
                <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-7">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">
                    Formatting Issues
                  </p>
                  {result.sections.formatting.issues.length === 0 ? (
                    <div className="flex items-center gap-3 text-emerald-400">
                      <CheckCircleIcon className="size-5" />
                      <div>
                        <p className="text-sm font-semibold">No issues found</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Your formatting looks great
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {result.sections.formatting.issues.map((issue, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-none bg-rose-50 border border-rose-200"
                        >
                          <XCircleIcon className="size-4 text-rose-500 shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {issue}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
                      Impact Feedback
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {result.sections.impact.feedback}
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 4: Improvement plan */}
              <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-none bg-primary/10 border border-primary/20">
                    <SparklesIcon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      AI Improvement Plan
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ranked by impact on your ATS score
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {result.top_improvements.map((tip, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-4 p-4 rounded-none bg-gray-50 border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 cursor-default"
                    >
                      <div className="flex items-center justify-center size-7 rounded-none bg-indigo-100 border border-indigo-200 shrink-0">
                        <span className="text-xs font-black text-indigo-600 font-mono">
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 5: Experience + Education detail */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Experience",
                    icon: <ShieldCheckIcon className="size-4" />,
                    text: result.sections.experience.feedback,
                    score: result.sections.experience.score,
                  },
                  {
                    label: "Education",
                    icon: <GraduationCapIcon className="size-4" />,
                    text: result.sections.education.feedback,
                    score: result.sections.education.score,
                  },
                ].map((s) => {
                  const sg = scoreGrade(s.score);
                  return (
                    <div
                      key={s.label}
                      className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-7"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-muted-foreground">
                            {s.icon}
                          </span>
                          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                            {s.label}
                          </p>
                        </div>
                        <span className={`text-xl font-black ${sg.text}`}>
                          {s.score}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
