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
  MicIcon,
  VideoIcon,
  TrendingUpIcon,
  HistoryIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ZapIcon,
  BuildingIcon,
} from "lucide-react";
import Link from "next/link";

type QuestionResult = {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  improvement: string;
};

type SessionEntry = {
  id: string;
  role: string;
  company: string;
  interviewType: "text" | "video";
  avgScore: number;
  totalQuestions: number;
  questions: QuestionResult[];
  createdAt: string;
};

function scoreColor(score: number) {
  if (score >= 8) return "text-emerald-600";
  if (score >= 6) return "text-teal-600";
  if (score >= 4) return "text-amber-600";
  return "text-rose-600";
}

function ScoreRing({ score }: { score: number }) {
  return (
    <div className={`flex items-baseline leading-none ${scoreColor(score)}`}>
      <span className="text-2xl font-black tabular-nums tracking-tighter">
        {score.toFixed(1)}
      </span>
      <span className="text-[10px] font-bold text-muted-foreground/50 ml-0.5">
        /10
      </span>
    </div>
  );
}

function SessionCard({ entry }: { entry: SessionEntry }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(entry.createdAt);

  return (
    <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden">
      <div
        className="flex items-center gap-4 px-6 py-4 cursor-pointer group"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Score badge */}
        <div className="size-16 rounded-none flex flex-col items-center justify-center shrink-0 bg-card border border-border/50">
          <ScoreRing score={entry.avgScore} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">{entry.role}</span>
            {entry.company && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <BuildingIcon className="size-3" /> {entry.company}
              </span>
            )}
            <span
              className={`text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded-none border flex items-center gap-1 ${entry.interviewType === "video" ? "text-blue-600 bg-blue-50 border-blue-200" : "text-primary bg-primary/10 border-primary/20"}`}
            >
              {entry.interviewType === "video" ? (
                <VideoIcon className="size-2.5" />
              ) : (
                <MicIcon className="size-2.5" />
              )}
              {entry.interviewType}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            {entry.totalQuestions} questions · avg score {entry.avgScore}/10
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

      {/* Expanded Q&A */}
      {expanded && (
        <div className="border-t border-border/50 px-6 py-8 flex flex-col gap-10">
          {entry.questions.map((q, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 pb-10 border-b border-border/40 last:border-0 last:pb-0"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-6">
                <h3 className="text-[15px] font-semibold text-foreground leading-relaxed flex-1">
                  <span className="text-[10px] font-mono text-muted-foreground/50 mr-2 uppercase tracking-widest">
                    Q{i + 1}.
                  </span>
                  {q.question}
                </h3>
                <div className="flex flex-col items-center leading-none shrink-0 mt-0.5">
                  <span
                    className={`text-xl font-black tabular-nums ${scoreColor(q.score)}`}
                  >
                    {q.score}
                    <span className="text-[11px] font-bold text-muted-foreground/50 ml-0.5">
                      /10
                    </span>
                  </span>
                </div>
              </div>

              {/* Answer block */}
              <div className="flex flex-col mt-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 px-1">
                  Candidate Answer
                </p>
                <div className="p-4 bg-muted/30 text-foreground/75 text-[13px] leading-relaxed italic border-l-2 border-muted-foreground/20">
                  &ldquo;{q.answer}&rdquo;
                </div>
              </div>

              {/* Feedback and Improvement Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div className="p-4 bg-primary/5 border border-primary/10">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2 flex items-center gap-1.5">
                    <span className="size-1.5 bg-primary/60 rounded-full" />
                    Feedback
                  </p>
                  <p className="text-[13px] text-foreground/80 leading-relaxed">
                    {q.feedback}
                  </p>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/10">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-amber-600 mb-2 flex items-center gap-1.5">
                    <span className="size-1.5 bg-amber-500/60 rounded-full" />
                    How to Improve
                  </p>
                  <p className="text-[13px] text-foreground/80 leading-relaxed">
                    {q.improvement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InterviewHistoryPage() {
  const [user, loading] = useAuthState(auth);
  const [history, setHistory] = useState<SessionEntry[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    fetch(`/api/interview-history?userId=${user.uid}`)
      .then((r) => r.json())
      .then((data) => {
        setHistory(Array.isArray(data) ? data : []);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [user?.uid]);

  const avgScore =
    history.length > 0
      ? (history.reduce((s, e) => s + e.avgScore, 0) / history.length).toFixed(
          1,
        )
      : null;
  const videoCount = history.filter((e) => e.interviewType === "video").length;

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
                    href="/dashboard/mock-interview"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Mock Interview
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
              href="/dashboard/mock-interview"
              className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              <ZapIcon className="size-3.5" /> New Session
            </Link>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8 relative">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
          <div className="relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
              Interview Practice
            </p>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              Session{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                History
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              Track your interview performance over time
            </p>
          </div>

          {history.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Total Sessions",
                  value: history.length,
                  icon: HistoryIcon,
                },
                {
                  label: "Avg Score",
                  value: avgScore ? `${avgScore}/10` : "—",
                  icon: TrendingUpIcon,
                },
                { label: "Video Sessions", value: videoCount, icon: VideoIcon },
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
                <p className="text-foreground font-semibold">No sessions yet</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Complete a mock interview to start tracking your progress.
                </p>
              </div>
              <Link
                href="/dashboard/mock-interview"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-blue-600 rounded-none text-primary-foreground text-sm font-semibold shadow-[0_0_20px_oklch(0.62_0.26_278/0.25)] hover:shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)] transition-all"
              >
                <ZapIcon className="size-4" /> Start Interview
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 relative">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {history.length} session{history.length !== 1 ? "s" : ""} ·
                newest first
              </p>
              {history.map((entry) => (
                <SessionCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
