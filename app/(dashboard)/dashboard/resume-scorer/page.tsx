"use client";

import { useState } from "react";
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
      color: "#22d3ee",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-300",
      bar: "from-cyan-400 to-blue-500",
    };
  if (score >= 70)
    return {
      label: "Good",
      color: "#34d399",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-300",
      bar: "from-emerald-400 to-cyan-500",
    };
  if (score >= 55)
    return {
      label: "Fair",
      color: "#fbbf24",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-300",
      bar: "from-amber-400 to-orange-400",
    };
  return {
    label: "Needs Work",
    color: "#f87171",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-300",
    bar: "from-rose-400 to-pink-500",
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
        <span className="text-5xl font-black text-white tracking-tight">
          {score}
        </span>
        <span className="text-[10px] text-white/50 font-mono uppercase tracking-[0.25em]">
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
      <p className="text-sm font-semibold text-white/80">{label}</p>
      {sub && (
        <p className="text-xs text-white/70 mt-1 leading-relaxed">{sub}</p>
      )}
    </div>
  );
}

function EmptyHero({ onExampleClick }: { onExampleClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl scale-150" />
        <div className="relative w-24 h-24 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
          <FileTextIcon className="size-10 text-cyan-400/60" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">Paste your resume</h2>
        <p className="text-blue-200/65 mt-1 text-sm">
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
            className="px-3 py-1.5 rounded-full text-xs bg-white/[0.03] border border-white/10 text-white/70"
          >
            ✓ {f}
          </span>
        ))}
      </div>
      <button
        onClick={onExampleClick}
        className="text-xs text-cyan-400/75 hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono"
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
      <SidebarInset className="bg-[#050508] text-white min-h-screen">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-white/[0.06] bg-[#050508]/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-white/40 hover:text-white hover:bg-white/8 rounded-lg transition-colors" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-white/[0.08]"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-white/55 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-white/10" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white/80 text-sm">
                    AI Resume Scorer
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
              AI Online
            </span>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8">
          {/* ── Page title ── */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/80 mb-2">
                Resume Tools
              </p>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                AI Resume{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  Scorer
                </span>
              </h1>
              <p className="text-white/55 text-sm mt-1.5">
                Paste your resume · get scored · know exactly what to fix
              </p>
            </div>
            {result && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-cyan-400 transition-colors font-mono"
              >
                <RotateCcwIcon className="size-3" /> New resume
              </button>
            )}
          </div>

          {!result && (
            <div className="grid lg:grid-cols-[1fr_380px] gap-6">
              {/* Left — resume input */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden focus-within:border-cyan-500/40 transition-colors duration-300">
                  <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06]">
                    <FileTextIcon className="size-4 text-cyan-400/50" />
                    <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                      Resume Text
                    </span>
                    <span className="ml-auto text-[10px] font-mono text-white/45">
                      {resume.length} chars
                    </span>
                  </div>
                  <textarea
                    value={resume}
                    onChange={(e) => {
                      setResume(e.target.value);
                      setError(null);

                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    placeholder="Paste your resume here — plain text works best…"
                    style={{ minHeight: "320px", overflow: "hidden" }}
                    className="w-full bg-transparent px-4 py-4 text-sm text-white/85 placeholder:text-white/25 font-mono resize-none focus:outline-none leading-loose"
                  />
                </div>

                {/* JD toggle */}
                <div>
                  <button
                    onClick={() => setShowJD((v) => !v)}
                    className="flex items-center gap-2 text-xs font-mono text-cyan-400/70 hover:text-cyan-300 transition-colors uppercase tracking-widest"
                  >
                    <BriefcaseIcon className="size-3.5" />
                    {showJD
                      ? "Hide job description"
                      : "+ Add job description (optional)"}
                  </button>

                  {showJD && (
                    <div className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden focus-within:border-cyan-500/40 transition-colors">
                      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06]">
                        <BriefcaseIcon className="size-4 text-cyan-400/50" />
                        <span className="text-xs font-mono uppercase tracking-widest text-white/60">
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
                        className="w-full bg-transparent px-4 py-4 text-sm text-white/85 placeholder:text-white/25 font-mono resize-none focus:outline-none leading-loose"
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
                  className="group flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-white text-sm font-bold shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed w-fit"
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
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 flex flex-col">
                <EmptyHero onExampleClick={() => setResume(SAMPLE_RESUME)} />

                {/* Feature list */}
                <div className="mt-auto space-y-3 pt-8 border-t border-white/[0.06]">
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
                      className="flex items-center gap-3 text-xs text-white/60"
                    >
                      <span className="text-cyan-400/70">{f.icon}</span>
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
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/60 relative z-10">
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
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/[0.07] p-8 flex flex-col gap-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/60 mb-3">
                      AI Summary
                    </p>
                    <p className="text-white/85 text-sm leading-relaxed">
                      {result.summary}
                    </p>
                  </div>

                  {/* Recruiter verdict */}
                  <div className="rounded-2xl bg-amber-500/6 border border-amber-500/20 px-5 py-4">
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-amber-400/80 mb-2">
                      Recruiter Verdict
                    </p>
                    <p className="text-sm text-white/80 italic leading-relaxed">
                      &ldquo;{result.recruiter_verdict}&rdquo;
                    </p>
                  </div>

                  {/* Strengths */}
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-emerald-400/75 mb-3">
                      Top Strengths
                    </p>
                    <div className="flex flex-col gap-2">
                      {result.top_strengths.map((s, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircleIcon className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-white/80">{s}</span>
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
                <div className="rounded-3xl bg-white/[0.02] border border-white/[0.07] p-7">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/60 mb-5">
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
                <div className="rounded-3xl bg-white/[0.02] border border-white/[0.07] p-7">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/60 mb-5">
                    Formatting Issues
                  </p>
                  {result.sections.formatting.issues.length === 0 ? (
                    <div className="flex items-center gap-3 text-emerald-400">
                      <CheckCircleIcon className="size-5" />
                      <div>
                        <p className="text-sm font-semibold">No issues found</p>
                        <p className="text-xs text-white/60 mt-0.5">
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
                          <XCircleIcon className="size-4 text-rose-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-white/80 leading-relaxed">
                            {issue}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-white/[0.06]">
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/55 mb-3">
                      Impact Feedback
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {result.sections.impact.feedback}
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 4: Improvement plan */}
              <div className="rounded-3xl bg-white/[0.02] border border-white/[0.07] p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <SparklesIcon className="size-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      AI Improvement Plan
                    </p>
                    <p className="text-xs text-white/60">
                      Ranked by impact on your ATS score
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {result.top_improvements.map((tip, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-black/20 border border-white/[0.06] hover:border-cyan-500/20 hover:bg-cyan-500/[0.03] transition-all duration-300 cursor-default"
                    >
                      <div className="flex items-center justify-center size-7 rounded-xl bg-white/[0.04] border border-white/[0.08] shrink-0">
                        <span className="text-xs font-black text-white/60 font-mono">
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-sm text-white/75 leading-relaxed group-hover:text-white/90 transition-colors">
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
                      className="rounded-3xl bg-white/[0.02] border border-white/[0.07] p-7"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-white/60">{s.icon}</span>
                          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/60">
                            {s.label}
                          </p>
                        </div>
                        <span className={`text-xl font-black ${sg.text}`}>
                          {s.score}
                        </span>
                      </div>
                      <p className="text-sm text-white/75 leading-relaxed">
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
