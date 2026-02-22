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
  ArrowRightIcon,
  RotateCcwIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  TagIcon,
  BrainIcon,
  GraduationCapIcon,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
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

// ── Score ring ─────────────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = score >= 80 ? "#22d3ee" : score >= 60 ? "#f59e0b" : "#f87171";

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg
        className="rotate-[-90deg]"
        width="160"
        height="160"
        viewBox="0 0 160 160"
      >
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="10"
        />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
            transition: "stroke-dasharray 1s ease",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-xs text-white/40 font-mono uppercase tracking-widest">
          / 100
        </span>
      </div>
    </div>
  );
}

// ── Section score bar ──────────────────────────────────────────────────────
function SectionBar({
  label,
  score,
  icon,
}: {
  label: string;
  score: number;
  icon: React.ReactNode;
}) {
  const color =
    score >= 80
      ? "from-cyan-500 to-blue-500"
      : score >= 60
        ? "from-amber-500 to-orange-500"
        : "from-rose-500 to-red-500";
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 text-sm text-blue-200/60 group-hover:text-white transition-colors">
          <span className="text-cyan-400/60">{icon}</span>
          {label}
        </div>
        <span className="text-xs font-mono text-white/30">{score}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ResumeScorerPage() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [showJD, setShowJD] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState("");

  const scoreLabel = !result
    ? ""
    : result.ats_score >= 80
      ? "Strong"
      : result.ats_score >= 60
        ? "Moderate"
        : "Needs Work";

  const scoreColor = !result
    ? ""
    : result.ats_score >= 80
      ? "text-cyan-400"
      : result.ats_score >= 60
        ? "text-amber-400"
        : "text-rose-400";

  async function handleScore() {
    if (resume.trim().length < 50) {
      setError("Please paste your resume (at least 50 characters).");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    setStatusMsg("Sending resume to AI…");

    try {
      setStatusMsg("Analyzing ATS compatibility…");
      const res = await fetch("/api/resume-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription: jobDesc || undefined }),
      });

      setStatusMsg("Parsing results…");
      const data = await res.json();

      if (!res.ok || data.error) throw new Error(data.error ?? "Unknown error");

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
      setStatusMsg("");
    }
  }

  function reset() {
    setResume("");
    setJobDesc("");
    setResult(null);
    setError(null);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-black text-white">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 bg-black/60 backdrop-blur-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-white/60 hover:text-white hover:bg-white/10" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-white/10"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-blue-200/60 hover:text-cyan-400 transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-white/20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white/80">
                    AI Resume Scorer
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              AI Online
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-8 p-6 bg-black relative overflow-auto">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen" />

          {/* Page title */}
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 mb-1 font-mono">
              Resume Tools
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              AI Resume{" "}
              <span className="bg-gradient-to-r from-cyan-200 to-blue-500 bg-clip-text text-transparent">
                Scorer
              </span>
            </h1>
            <p className="text-blue-200/60 font-light mt-2 max-w-xl">
              Paste your resume below. Our AI will analyze ATS compatibility,
              formatting, impact, and keywords — and tell you exactly what
              recruiters see.
            </p>
          </div>

          {/* ── Input area ── */}
          {!result && (
            <div className="relative z-10 flex flex-col gap-4 w-full">
              {/* Resume textarea */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <FileTextIcon className="size-4 text-cyan-400/60" />
                  <span className="text-xs uppercase tracking-widest text-cyan-400/60 font-mono">
                    Resume Text
                  </span>
                  <span className="ml-auto text-xs text-white/20 font-mono">
                    {resume.length} chars
                  </span>
                </div>
                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your full resume here — plain text works best…"
                  rows={14}
                  className="w-full bg-transparent px-4 py-4 text-sm text-blue-100/80 placeholder:text-white/15 font-mono resize-none focus:outline-none leading-relaxed"
                />
              </div>

              {/* JD toggle */}
              <button
                onClick={() => setShowJD((v) => !v)}
                className="flex items-center gap-2 text-xs text-cyan-400/60 hover:text-cyan-300 transition-colors w-fit font-mono uppercase tracking-widest"
              >
                <BriefcaseIcon className="size-3.5" />
                {showJD ? "Hide" : "+ Add"} Job Description (optional)
              </button>

              {showJD && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                    <BriefcaseIcon className="size-4 text-cyan-400/60" />
                    <span className="text-xs uppercase tracking-widest text-cyan-400/60 font-mono">
                      Job Description
                    </span>
                  </div>
                  <textarea
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Paste the job description to tailor keyword analysis…"
                    rows={6}
                    className="w-full bg-transparent px-4 py-4 text-sm text-blue-100/80 placeholder:text-white/15 font-mono resize-none focus:outline-none leading-relaxed"
                  />
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
                  <AlertTriangleIcon className="size-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                onClick={handleScore}
                disabled={loading || resume.trim().length < 50}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white text-sm font-semibold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all disabled:opacity-40 disabled:cursor-not-allowed w-fit"
              >
                {loading ? (
                  <>
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    {statusMsg || "Analyzing…"}
                  </>
                ) : (
                  <>
                    <ZapIcon className="size-4" />
                    Score My Resume
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Results ── */}
          {result && (
            <div className="relative z-10 flex flex-col gap-6 w-full">
              {/* Top bar: score + verdict + reset */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Score card */}
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-8 flex flex-col items-center gap-3 min-w-[220px]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-mono">
                    ATS Score
                  </p>
                  <ScoreRing score={result.ats_score} />
                  <span className={`text-lg font-bold ${scoreColor}`}>
                    {scoreLabel}
                  </span>
                </div>

                {/* Summary + verdict */}
                <div className="relative flex-1 rounded-3xl bg-white/[0.02] border border-white/10 p-8 flex flex-col justify-between gap-4">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-mono mb-2">
                      Summary
                    </p>
                    <p className="text-blue-100/80 text-sm leading-relaxed">
                      {result.summary}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.02] border border-white/10 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 font-mono mb-1">
                      Recruiter Verdict
                    </p>
                    <p className="text-sm text-white/70 italic">
                      &ldquo;{result.recruiter_verdict}&rdquo;
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 text-xs text-white/30 hover:text-cyan-400 transition-colors w-fit font-mono uppercase tracking-widest"
                  >
                    <RotateCcwIcon className="size-3.5" />
                    Score another resume
                  </button>
                </div>
              </div>

              {/* Section scores */}
              <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-8">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-mono mb-6">
                  Section Breakdown
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  <SectionBar
                    label="Formatting"
                    score={result.sections.formatting.score}
                    icon={<FileTextIcon className="size-3.5" />}
                  />
                  <SectionBar
                    label="Impact"
                    score={result.sections.impact.score}
                    icon={<TrendingUpIcon className="size-3.5" />}
                  />
                  <SectionBar
                    label="Keywords"
                    score={result.sections.keywords.score}
                    icon={<TagIcon className="size-3.5" />}
                  />
                  <SectionBar
                    label="Experience"
                    score={result.sections.experience.score}
                    icon={<BrainIcon className="size-3.5" />}
                  />
                  <SectionBar
                    label="Education"
                    score={result.sections.education.score}
                    icon={<GraduationCapIcon className="size-3.5" />}
                  />
                </div>
              </div>

              {/* 3-col detail row */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Formatting issues */}
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-mono mb-4">
                    Formatting Issues
                  </p>
                  {result.sections.formatting.issues.length === 0 ? (
                    <p className="text-sm text-emerald-400 flex items-center gap-2">
                      <CheckCircleIcon className="size-4" /> No issues found
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {result.sections.formatting.issues.map((issue, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-blue-200/60"
                        >
                          <XCircleIcon className="size-4 text-rose-400 shrink-0 mt-0.5" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Strengths */}
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/60 font-mono mb-4">
                    Top Strengths
                  </p>
                  <ul className="space-y-2">
                    {result.top_strengths.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-blue-200/60"
                      >
                        <CheckCircleIcon className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200/30 font-mono mt-5 mb-3">
                    Impact Feedback
                  </p>
                  <p className="text-xs text-blue-200/50 leading-relaxed">
                    {result.sections.impact.feedback}
                  </p>
                </div>

                {/* Keywords */}
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-mono mb-4">
                    Keyword Analysis
                  </p>
                  {result.sections.keywords.found.length > 0 && (
                    <>
                      <p className="text-[9px] uppercase tracking-widest text-emerald-400/50 font-mono mb-2">
                        Found
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {result.sections.keywords.found.map((k, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  {result.sections.keywords.missing.length > 0 && (
                    <>
                      <p className="text-[9px] uppercase tracking-widest text-rose-400/50 font-mono mb-2">
                        Missing
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.sections.keywords.missing.map((k, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full text-[11px] bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Top improvements */}
              <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-8">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <SparklesIcon className="size-4 text-cyan-400" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-mono">
                    AI Improvement Plan
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {result.top_improvements.map((tip, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-3 p-4 rounded-2xl bg-black/30 border border-white/5 hover:border-cyan-500/20 transition-colors"
                    >
                      <span className="text-xs font-mono text-cyan-500/40 group-hover:text-cyan-400/60 transition-colors mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-blue-200/70 leading-relaxed">
                          {tip}
                        </p>
                      </div>
                      <ArrowRightIcon className="size-3.5 text-white/10 group-hover:text-cyan-400/40 transition-colors shrink-0 mt-0.5" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience & Education feedback */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheckIcon className="size-4 text-cyan-400/50" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-mono">
                      Experience
                    </p>
                  </div>
                  <p className="text-sm text-blue-200/60 leading-relaxed">
                    {result.sections.experience.feedback}
                  </p>
                </div>
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCapIcon className="size-4 text-cyan-400/50" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-mono">
                      Education
                    </p>
                  </div>
                  <p className="text-sm text-blue-200/60 leading-relaxed">
                    {result.sections.education.feedback}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
