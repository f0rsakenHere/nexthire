"use client";

import { useState, useRef, useEffect } from "react";
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
      color: "hsl(var(--primary))",
      bg: "bg-primary/10",
      border: "border-primary/30",
      text: "text-primary",
      bar: "from-primary to-blue-600",
    };
  if (score >= 70)
    return {
      label: "Good",
      color: "#10b981",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      bar: "from-emerald-500 to-cyan-500",
    };
  if (score >= 55)
    return {
      label: "Fair",
      color: "#f59e0b",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      bar: "from-amber-500 to-orange-400",
    };
  return {
    label: "Needs Work",
    color: "#ef4444",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    text: "text-destructive",
    bar: "from-destructive to-pink-500",
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
        className="absolute inset-0 rounded-full opacity-20 blur-xl"
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
          stroke="rgba(255,255,255,0.04)"
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
    <div
      className={`relative rounded-2xl ${g.bg} ${g.border} border p-5 overflow-hidden group hover:scale-[1.01] transition-transform duration-300`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-xl ${g.bg} ${g.border} border`}>
          <span className={g.text}>{icon}</span>
        </div>
        <span className={`text-2xl font-black ${g.text}`}>{score}</span>
      </div>
      <p className="text-sm font-semibold text-foreground/80">{label}</p>
      {sub && (
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}

function EmptyHero({ onExampleClick }: { onExampleClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-150" />
        <div className="relative w-24 h-24 rounded-3xl bg-card border border-border flex items-center justify-center">
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
            className="px-3 py-1.5 rounded-full text-xs bg-muted border border-border text-muted-foreground"
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
Senior Software Engineer — TechCorp Inc.            2022 – Present
- Built customer dashboard that reduced support tickets by 35%
- Led migration from REST to GraphQL, cutting API response time by 40%
- Mentored 3 junior engineers and conducted 50+ code reviews

Software Engineer — StartupXYZ                      2020 – 2022
- Developed core payment flow processing $2M+ monthly transactions
- Integrated Stripe, Plaid, and Twilio APIs

SKILLS
JavaScript, TypeScript, React, Node.js, PostgreSQL, AWS, Docker, GraphQL

EDUCATION
B.S. Computer Science — State University           2016 – 2020`;

export default function ResumeScorerPage() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [showJD, setShowJD] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const resumeRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea whenever `resume` changes (covers both typing and programmatic updates)
  useEffect(() => {
    const el = resumeRef.current;
    if (!el) return;
    el.style.height = "auto";
    // Cap at 500px — scroll beyond that
    el.style.height = Math.min(el.scrollHeight, 500) + "px";
  }, [resume]);

  const steps = [
    "Reading resume…",
    "Running ATS checks…",
    "Analyzing keywords…",
    "Generating report…",
  ];

  async function handleScore() {
    if (resume.trim().length < 50) {
      setError("Paste at least 50 characters of your resume.");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    setStep(0);

    const stepInterval = setInterval(
      () => setStep((s) => Math.min(s + 1, steps.length - 1)),
      4000,
    );

    try {
      const res = await fetch("/api/resume-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription: jobDesc || undefined }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Unknown error");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
      setStep(0);
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
          <div className="ml-auto px-4 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              AI Online
            </span>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8">
          {/* ── Page title ── */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                Resume Tools
              </p>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
                AI Resume{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  Scorer
                </span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5">
                Paste your resume · get scored · know exactly what to fix
              </p>
            </div>
            {result && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                <RotateCcwIcon className="size-3" /> New resume
              </button>
            )}
          </div>

          {!result && (
            <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
              {/* Left — resume input */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-border bg-card overflow-hidden focus-within:border-primary/40 transition-colors duration-300">
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
                    <div className="mt-3 rounded-2xl border border-border bg-card overflow-hidden focus-within:border-primary/40 transition-colors">
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
                          // auto-grow
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
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/20 text-rose-300 text-sm">
                    <AlertTriangleIcon className="size-4 shrink-0 text-rose-400" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleScore}
                  disabled={loading || resume.trim().length < 50}
                  className="group flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-primary to-blue-600 rounded-2xl text-primary-foreground text-sm font-bold shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)] hover:shadow-[0_0_45px_oklch(0.62_0.26_278/0.6)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed w-fit"
                >
                  {loading ? (
                    <>
                      <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span className="font-mono text-xs tracking-wide">
                        {steps[step]}
                      </span>
                    </>
                  ) : (
                    <>
                      <ZapIcon className="size-4 group-hover:scale-110 transition-transform" />
                      Score My Resume
                      <ArrowUpRightIcon className="size-3.5 opacity-60" />
                    </>
                  )}
                </button>
              </div>

              {/* Right — empty state / features */}
              <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
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
                <div
                  className={`relative rounded-3xl ${g.bg} ${g.border} border p-8 flex flex-col items-center gap-4 min-w-[260px]`}
                >
                  <div
                    className="absolute inset-0 rounded-3xl opacity-30"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${g.color}18, transparent 70%)`,
                    }}
                  />
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground relative z-10">
                    ATS Score
                  </p>
                  <ScoreRing score={result.ats_score} />
                  <div
                    className={`px-4 py-1.5 rounded-full ${g.bg} ${g.border} border relative z-10`}
                  >
                    <span className={`text-sm font-bold ${g.text}`}>
                      {g.label}
                    </span>
                  </div>
                </div>

                {/* Summary panel */}
                <div className="relative rounded-3xl bg-card border border-border p-8 flex flex-col gap-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
                      AI Summary
                    </p>
                    <p className="text-foreground/85 text-sm leading-relaxed">
                      {result.summary}
                    </p>
                  </div>

                  {/* Recruiter verdict */}
                  <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 px-5 py-4">
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-amber-400/80 mb-2">
                      Recruiter Verdict
                    </p>
                    <p className="text-sm text-foreground/80 italic leading-relaxed">
                      &ldquo;{result.recruiter_verdict}&rdquo;
                    </p>
                  </div>

                  {/* Strengths */}
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-emerald-400/80 mb-3">
                      Top Strengths
                    </p>
                    <div className="flex flex-col gap-2">
                      {result.top_strengths.map((s, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircleIcon className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/80">
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
                <div className="rounded-3xl bg-card border border-border p-7">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">
                    Keyword Analysis
                  </p>
                  {result.sections.keywords.found.length > 0 && (
                    <div className="mb-5">
                      <p className="text-[9px] font-mono uppercase tracking-widest text-emerald-400/75 mb-3">
                        ✓ Found in your resume
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.sections.keywords.found.map((k, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg text-xs bg-emerald-500/8 border border-emerald-500/20 text-emerald-300 font-mono"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {result.sections.keywords.missing.length > 0 && (
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-rose-400/75 mb-3">
                        ✗ Missing — add these
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.sections.keywords.missing.map((k, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg text-xs bg-rose-500/8 border border-rose-500/20 text-rose-300 font-mono"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Formatting issues */}
                <div className="rounded-3xl bg-card border border-border p-7">
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
                          className="flex items-start gap-3 p-3 rounded-xl bg-rose-500/5 border border-rose-500/10"
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
              <div className="rounded-3xl bg-card border border-border p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
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
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-muted border border-border hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-300 cursor-default"
                    >
                      <div className="flex items-center justify-center size-7 rounded-xl bg-card border border-border shrink-0">
                        <span className="text-xs font-black text-muted-foreground font-mono">
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/75 leading-relaxed group-hover:text-foreground transition-colors">
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
                      className="rounded-3xl bg-card border border-border p-7"
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
