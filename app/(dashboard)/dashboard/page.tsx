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
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileTextIcon,
  MicIcon,
  ActivityIcon,
  ScanSearchIcon,
  ZapIcon,
  HomeIcon,
  KanbanSquareIcon,
} from "lucide-react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useEffect, useState } from "react";

interface AnalyticsData {
  interviews: { totalInterviews: number; avgInterviewScore: number };
  resume: { atsScore: number; strengths: string[]; improvements: string[] };
  keywords: { found: number; missing: number; atsScore: number };
  applications: { totalApplications: number };
}

interface InterviewSession {
  id: string;
  role: string;
  company: string;
  avgScore: number;
  createdAt: string;
}

interface ResumeScore {
  id: string;
  ats_score: number;
  createdAt: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function formatDisplayName(raw: string): string {
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-.]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function buildMatrix(
  analytics: AnalyticsData,
  interviewSessions: InterviewSession[],
) {
  const resumeQuality = analytics.resume.atsScore || 0;

  const avgScore = analytics.interviews.avgInterviewScore || 0;
  const technicalAccuracy = Math.round((avgScore / 10) * 100);

  const sessions = analytics.interviews.totalInterviews;
  const behavioralConfidence = Math.min(100, Math.round((sessions / 10) * 100));

  const recent = interviewSessions.slice(0, 3);
  const recentAvg =
    recent.length > 0
      ? recent.reduce((s, r) => s + (r.avgScore || 0), 0) / recent.length
      : 0;
  const communicationClarity = Math.round((recentAvg / 10) * 100);

  const { found, missing } = analytics.keywords;
  const keywordCoverage =
    found + missing > 0 ? Math.round((found / (found + missing)) * 100) : 0;

  return [
    {
      label: "Resume Quality",
      value: resumeQuality,
      color: "from-blue-500 to-indigo-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Technical Accuracy",
      value: technicalAccuracy,
      color: "from-purple-500 to-fuchsia-500",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "Behavioral Confidence",
      value: behavioralConfidence,
      color: "from-emerald-400 to-teal-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Communication Clarity",
      value: communicationClarity,
      color: "from-orange-400 to-red-500",
      shadow: "shadow-orange-500/20",
    },
    {
      label: "Keyword Coverage",
      value: keywordCoverage,
      color: "from-rose-400 to-pink-600",
      shadow: "shadow-rose-500/20",
    },
  ];
}

function aiRecommendation(matrix: { label: string; value: number }[]): string {
  const lowest = [...matrix].sort((a, b) => a.value - b.value)[0];
  if (!lowest || lowest.value === 0)
    return "Complete more sessions to get personalised recommendations.";
  const tips: Record<string, string> = {
    "Resume Quality":
      "Run the AI Resume Scorer to find gaps and boost your ATS match.",
    "Technical Accuracy":
      "Practice more Mock Interviews your technical scores have room to grow.",
    "Behavioral Confidence":
      "More interview sessions will build your confidence. Aim for 10+ sessions.",
    "Communication Clarity":
      "Review your last interview feedback and refine your answer structure.",
    "Keyword Coverage":
      "Run a Keyword Gap Analysis against your target JDs to close the gap.",
  };
  return `Focus on ${lowest.label} — ${tips[lowest.label] ?? "keep practising!"}`;
}

export default function DashboardPage() {
  const [firebaseUser] = useAuthState(auth);
  const userId = firebaseUser?.uid;

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [interviews, setInterviews] = useState<InterviewSession[]>([]);
  const [resumes, setResumes] = useState<ResumeScore[]>([]);
  const [dbName, setDbName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !firebaseUser?.email) return;

    const load = async () => {
      try {
        const [analyticsRes, interviewRes, resumeRes, adminRes] =
          await Promise.all([
            fetch(`/api/analytics/${userId}`),
            fetch(`/api/interview-history?userId=${userId}`),
            fetch(`/api/resume-history?userId=${userId}`),
            fetch("/api/admin/check", {
              headers: { "x-user-email": firebaseUser.email! },
            }),
          ]);

        const [analyticsData, interviewData, resumeData, adminData] =
          await Promise.all([
            analyticsRes.json(),
            interviewRes.json(),
            resumeRes.json(),
            adminRes.json(),
          ]);

        setAnalytics(analyticsData);
        setInterviews(Array.isArray(interviewData) ? interviewData : []);
        setResumes(Array.isArray(resumeData) ? resumeData : []);
        if (adminData?.name) setDbName(adminData.name);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId, firebaseUser?.email]);

  const displayName =
    dbName ||
    firebaseUser?.displayName ||
    (firebaseUser?.email
      ? formatDisplayName(firebaseUser.email.split("@")[0])
      : null) ||
    "there";

  const firstName = displayName.split(" ")[0];

  const atsScore = analytics?.resume?.atsScore ?? 0;
  const totalSessions = analytics?.interviews?.totalInterviews ?? 0;
  const avgScore = analytics?.interviews?.avgInterviewScore ?? 0;
  const keywordsMissing = analytics?.keywords?.missing ?? 0;
  type Activity =
    | { type: "interview"; session: InterviewSession }
    | { type: "resume"; score: ResumeScore };

  const activities: Activity[] = [
    ...interviews
      .slice(0, 5)
      .map((s) => ({ type: "interview" as const, session: s })),
    ...resumes.slice(0, 3).map((r) => ({ type: "resume" as const, score: r })),
  ]
    .sort((a, b) => {
      const aDate =
        a.type === "interview" ? a.session.createdAt : a.score.createdAt;
      const bDate =
        b.type === "interview" ? b.session.createdAt : b.score.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    })
    .slice(0, 5);

  const matrix = analytics ? buildMatrix(analytics, interviews) : null;
  const recommendation = matrix ? aiRecommendation(matrix) : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background text-foreground">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/60 backdrop-blur-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-border"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    NextHire
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground/20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground/80">
                    Dashboard
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-4 px-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              <HomeIcon className="size-3.5" />
              Return to Home
            </Link>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-8 p-6 bg-background relative overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-primary/8 blur-[120px] rounded-full mix-blend-screen" />
          <div className="relative rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-8 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[200px] bg-primary/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-2 font-mono">
                Welcome back, {firstName}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Your Interview{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Journey
                </span>
              </h1>
              {loading ? (
                <Skeleton className="h-5 w-72 mb-6" />
              ) : totalSessions === 0 ? (
                <p className="text-muted-foreground font-light max-w-lg mb-6">
                  Start your first mock interview or score your resume to begin
                  tracking progress.
                </p>
              ) : (
                <p className="text-muted-foreground font-light max-w-lg mb-6">
                  You&apos;ve completed{" "}
                  <span className="text-foreground font-medium">
                    {totalSessions} mock session{totalSessions !== 1 ? "s" : ""}
                  </span>{" "}
                  {atsScore > 0 && (
                    <>
                      and your ATS score is{" "}
                      <span className="text-primary font-medium">
                        {atsScore}/100
                      </span>
                      .{" "}
                    </>
                  )}
                  Keep the momentum going.
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard/mock-interview"
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-blue-600 rounded-full text-primary-foreground text-sm font-semibold shadow-[0_0_30px_oklch(0.62_0.26_278/0.35)] transition-all hover:opacity-90"
                >
                  <MicIcon className="size-4" />
                  Start Mock Interview
                </Link>
                <Link
                  href="/dashboard/resume-scorer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-muted border border-border hover:border-primary/30 hover:bg-muted/80 rounded-full text-foreground text-sm font-medium transition-all"
                >
                  <FileTextIcon className="size-4" />
                  Score My Resume
                </Link>
              </div>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "ATS RESUME SCORE",
                value: loading ? null : atsScore,
                unit: "/100",
                delta:
                  atsScore > 0 ? "Latest resume scan" : "No resume scored yet",
                icon: <FileTextIcon className="w-4 h-4" />,
              },
              {
                label: "MOCK SESSIONS",
                value: loading ? null : totalSessions,
                unit: "sessions",
                delta:
                  totalSessions > 0
                    ? `${totalSessions} completed`
                    : "No sessions yet",
                icon: <MicIcon className="w-4 h-4" />,
              },
              {
                label: "AVG INTERVIEW SCORE",
                value: loading ? null : avgScore > 0 ? avgScore : 0,
                unit: "/10",
                delta: avgScore > 0 ? "Across all sessions" : "No sessions yet",
                icon: <ActivityIcon className="w-4 h-4" />,
              },
              {
                label: "KEYWORD GAPS",
                value: loading ? null : keywordsMissing,
                unit: "missing",
                delta:
                  keywordsMissing > 0
                    ? "From latest ATS scan"
                    : "No gaps found",
                icon: <ScanSearchIcon className="w-4 h-4" />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      {stat.icon}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium group-hover:text-foreground/70 transition-colors">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 group-hover:to-primary transition-all duration-300 tracking-tight mb-1">
                    {stat.value === null ? (
                      <Skeleton className="h-10 w-16" />
                    ) : (
                      <>
                        {stat.value}
                        <span className="text-base font-normal text-muted-foreground/30 ml-1">
                          {stat.unit}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {stat.delta}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-8 overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-1 font-mono">
                  Activity Log
                </p>
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Recent Sessions
                </h3>
                <div className="flex flex-col divide-y divide-border/50">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="py-3 flex items-center gap-3">
                        <Skeleton className="h-8 w-8" />
                        <div className="flex-1 space-y-1.5">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                      </div>
                    ))
                  ) : activities.length === 0 ? (
                    <div className="py-12 flex flex-col items-center gap-3 text-center">
                      <ZapIcon className="size-8 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">
                        No activity yet — start a mock interview or score your
                        resume!
                      </p>
                    </div>
                  ) : (
                    activities.map((item) => {
                      if (item.type === "interview") {
                        const s = item.session;
                        return (
                          <div
                            key={s.id}
                            className="group flex items-center justify-between gap-3 py-3 hover:bg-muted -mx-2 px-2 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-muted border border-border group-hover:border-primary/30 transition-colors">
                                <MicIcon className="size-3.5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                                  Mock interview{s.role ? ` — ${s.role}` : ""}
                                  {s.company ? ` @ ${s.company}` : ""}
                                </p>
                                <p className="text-xs text-muted-foreground font-mono">
                                  {timeAgo(s.createdAt)}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground group-hover:text-primary/80 transition-colors shrink-0">
                              {s.avgScore ? `${s.avgScore}/10` : "—"}
                            </span>
                          </div>
                        );
                      } else {
                        const r = item.score;
                        return (
                          <div
                            key={r.id}
                            className="group flex items-center justify-between gap-3 py-3 hover:bg-muted -mx-2 px-2 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-muted border border-border group-hover:border-primary/30 transition-colors">
                                <FileTextIcon className="size-3.5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                                  Resume scored
                                </p>
                                <p className="text-xs text-muted-foreground font-mono">
                                  {timeAgo(r.createdAt)}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground group-hover:text-primary/80 transition-colors shrink-0">
                              {r.ats_score ? `${r.ats_score}%` : "—"}
                            </span>
                          </div>
                        );
                      }
                    })
                  )}

                  {/* Quick links */}
                  {!loading && activities.length > 0 && (
                    <div className="pt-4 mt-2 border-t border-border/50 flex gap-3">
                      <Link
                        href="/dashboard/interview-history"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium border border-border hover:border-primary/40 hover:text-primary text-muted-foreground transition-all"
                      >
                        <MicIcon className="size-3" />
                        All Interviews
                      </Link>
                      <Link
                        href="/dashboard/resume-history"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium border border-border hover:border-primary/40 hover:text-primary text-muted-foreground transition-all"
                      >
                        <FileTextIcon className="size-3" />
                        All Resumes
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Readiness Matrix */}
            <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-8 overflow-hidden relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1.5 font-mono flex items-center gap-2">
                      <ActivityIcon size={12} className="text-primary" />{" "}
                      Overall Progress
                    </p>
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">
                      Readiness Matrix
                    </h3>
                  </div>
                </div>

                <div className="space-y-5">
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-10" />
                          </div>
                          <Skeleton className="h-3 w-full" />
                        </div>
                      ))
                    : (matrix ?? []).map((skill) => (
                        <div key={skill.label} className="group/skill relative">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-medium text-foreground/80 group-hover/skill:text-foreground transition-colors">
                              {skill.label}
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span
                                className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent text-lg font-bold`}
                              >
                                {skill.value}
                              </span>
                              <span className="text-[10px] text-muted-foreground/60 font-mono">
                                /100
                              </span>
                            </div>
                          </div>
                          <div className="relative h-3 rounded-none bg-muted/30 border border-border/50 shadow-inner mt-3">
                            <div
                              className={`absolute inset-y-0 left-0 rounded-none bg-gradient-to-r ${skill.color} shadow-sm ${skill.shadow} transition-all duration-1000 ease-out`}
                              style={{ width: `${skill.value}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 rounded-none pointer-events-none" />
                              <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/40 to-transparent rounded-none pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <div className="mt-8 relative p-[1px] rounded-none bg-gradient-to-r from-primary/30 to-purple-600/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 blur-xl" />
                  <div className="relative bg-card rounded-none p-5 border border-white/5 backdrop-blur-sm">
                    <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary mb-2 font-mono">
                      <ZapIcon
                        size={12}
                        className="text-primary fill-primary/20 animate-pulse"
                      />{" "}
                      AI Recommendation
                    </p>
                    {loading ? (
                      <Skeleton className="h-4 w-full" />
                    ) : (
                      <p className="text-sm text-foreground/80 leading-relaxed font-light">
                        {recommendation}
                      </p>
                    )}
                  </div>
                </div>

                {!loading && (
                  <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap gap-3">
                    <Link
                      href="/dashboard/analytics"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-mono transition-colors"
                    >
                      <ActivityIcon className="size-3" /> Full Analytics →
                    </Link>
                    <Link
                      href="/dashboard/tracker"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-mono transition-colors"
                    >
                      <KanbanSquareIcon className="size-3" /> Job Tracker →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
