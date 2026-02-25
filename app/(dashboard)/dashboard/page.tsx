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
  MicIcon,
  FlameIcon,
  ActivityIcon,
  ScanSearchIcon,
  StarIcon,
  ClockIcon,
} from "lucide-react";

// --- Stat Cards ---
const stats = [
  {
    label: "ATS RESUME SCORE",
    value: "84",
    unit: "/100",
    delta: "+12 pts this week",
    icon: <FileTextIcon className="w-4 h-4" />,
  },
  {
    label: "MOCK SESSIONS",
    value: "23",
    unit: "sessions",
    delta: "+5 this month",
    icon: <MicIcon className="w-4 h-4" />,
  },
  {
    label: "CONFIDENCE SCORE",
    value: "72",
    unit: "%",
    delta: "+8% vs last session",
    icon: <ActivityIcon className="w-4 h-4" />,
  },
  {
    label: "KEYWORD GAPS",
    value: "17",
    unit: "missing",
    delta: "vs target JD",
    icon: <ScanSearchIcon className="w-4 h-4" />,
  },
];

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-black text-white">
        {/* ── Header ─────────────────────────────────────────── */}
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
                    NextHire
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-white/20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white/80">
                    Dashboard
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-4 px-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              AI Online
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-200/40 font-mono">
              <ClockIcon className="size-3.5" />
              Last session: 2h ago
            </div>
          </div>
        </header>

        {/* ── Main Content ────────────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-8 p-6 bg-black relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen" />

          {/* ── Welcome Banner ─────────────────────────────── */}
          <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-8 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[200px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 mb-2 font-mono">
                Welcome back, Alex
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                Your Interview{" "}
                <span className="bg-gradient-to-r from-cyan-200 to-blue-500 bg-clip-text text-transparent">
                  Journey
                </span>
              </h1>
              <p className="text-blue-200/60 font-light max-w-lg mb-6">
                You&apos;ve completed{" "}
                <span className="text-white font-medium">23 mock sessions</span>{" "}
                and your ATS score improved by{" "}
                <span className="text-cyan-400 font-medium">12 points</span>{" "}
                this week. Keep the momentum going.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white text-sm font-semibold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all">
                  <MicIcon className="size-4" />
                  Start Mock Interview
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 rounded-full text-white text-sm font-medium transition-all">
                  <FileTextIcon className="size-4" />
                  Score My Resume
                </button>
              </div>
            </div>
          </div>

          {/* ── Stat Cards ─────────────────────────────────── */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 p-6 overflow-hidden transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">
                      {stat.icon}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium group-hover:text-white/70 transition-colors">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 group-hover:to-cyan-200 transition-all duration-300 tracking-tight mb-1">
                    {stat.value}
                    <span className="text-base font-normal text-white/30 ml-1">
                      {stat.unit}
                    </span>
                  </div>
                  <div className="text-xs text-blue-200/40 font-mono">
                    {stat.delta}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom Row: Activity + Readiness ───────────── */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activity */}
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 mb-1 font-mono">
                  Activity Log
                </p>
                <h3 className="text-xl font-bold text-white mb-6">
                  Recent Sessions
                </h3>
                <div className="flex flex-col divide-y divide-white/5">
                  {[
                    {
                      action: "Scored resume against Google SWE JD",
                      time: "2h ago",
                      icon: <FileTextIcon className="size-3.5 text-cyan-400" />,
                      score: "+4 pts",
                    },
                    {
                      action: "Completed Frontend mock interview",
                      time: "Yesterday",
                      icon: <MicIcon className="size-3.5 text-cyan-400" />,
                      score: "78%",
                    },
                    {
                      action: "Roast My Resume session",
                      time: "2 days ago",
                      icon: <FlameIcon className="size-3.5 text-cyan-400" />,
                      score: "12 fixes",
                    },
                    {
                      action: "Keyword gap — Meta JD",
                      time: "3 days ago",
                      icon: (
                        <ScanSearchIcon className="size-3.5 text-cyan-400" />
                      ),
                      score: "17 gaps",
                    },
                    {
                      action: "STAR Method Wizard session",
                      time: "4 days ago",
                      icon: <StarIcon className="size-3.5 text-cyan-400" />,
                      score: "5 bullets",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-between gap-3 py-3 hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-white/80 group-hover:text-white transition-colors">
                            {item.action}
                          </p>
                          <p className="text-xs text-blue-200/40 font-mono">
                            {item.time}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-white/20 group-hover:text-cyan-400/60 transition-colors shrink-0">
                        {item.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Readiness Breakdown */}
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 mb-1 font-mono">
                  Overall Progress
                </p>
                <h3 className="text-xl font-bold text-white mb-6">
                  Readiness Breakdown
                </h3>
                <div className="space-y-5">
                  {[
                    { label: "Resume Quality", value: 84 },
                    { label: "Technical Accuracy", value: 71 },
                    { label: "Behavioral Confidence", value: 68 },
                    { label: "Communication Clarity", value: 75 },
                    { label: "Keyword Coverage", value: 58 },
                  ].map((skill) => (
                    <div key={skill.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-blue-200/60">
                          {skill.label}
                        </span>
                        <span className="text-xs text-white/20 font-mono">
                          {skill.value}%
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/20 transition-colors">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 mb-1.5 font-mono">
                    ⚡ AI Recommendation
                  </p>
                  <p className="text-sm text-blue-200/60 leading-relaxed">
                    Focus on{" "}
                    <span className="text-cyan-400 font-medium">
                      Keyword Coverage
                    </span>{" "}
                    — run a Keyword Gap Analysis against your 3 target JDs to
                    close the gap before your next application.
                  </p>
                </div>

                {/* Mini bar chart for sessions over the week */}
                <div className="mt-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 mb-3 font-mono">
                    Sessions This Week
                  </p>
                  <div className="flex items-end gap-1.5 h-16">
                    {[3, 1, 4, 2, 5, 3, 4].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <div
                          className="w-full rounded-sm bg-gradient-to-t from-cyan-500/60 to-blue-500/40 hover:from-cyan-400 hover:to-blue-400 transition-colors"
                          style={{ height: `${(h / 5) * 100}%` }}
                        />
                        <span className="text-[9px] text-white/20 font-mono">
                          {["M", "T", "W", "T", "F", "S", "S"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
