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
  ZapIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";

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
      <SidebarInset className="bg-background text-foreground">
        {/* ── Header ─────────────────────────────────────────── */}
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
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              AI Online
            </div>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              <HomeIcon className="size-3.5" />
              Return to Home
            </Link>
          </div>
        </header>

        {/* ── Main Content ────────────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-8 p-6 bg-background relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-primary/8 blur-[120px] rounded-full mix-blend-screen" />

          {/* ── Welcome Banner ─────────────────────────────── */}
          <div className="relative rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-8 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[200px] bg-primary/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-2 font-mono">
                Welcome back, Alex
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Your Interview{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Journey
                </span>
              </h1>
              <p className="text-muted-foreground font-light max-w-lg mb-6">
                You&apos;ve completed{" "}
                <span className="text-foreground font-medium">
                  23 mock sessions
                </span>{" "}
                and your ATS score improved by{" "}
                <span className="text-primary font-medium">12 points</span> this
                week. Keep the momentum going.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-blue-600 rounded-full text-primary-foreground text-sm font-semibold shadow-[0_0_30px_oklch(0.62_0.26_278/0.35)] transition-all">
                  <MicIcon className="size-4" />
                  Start Mock Interview
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-muted border border-border hover:border-primary/30 hover:bg-muted/80 rounded-full text-foreground text-sm font-medium transition-all">
                  <FileTextIcon className="size-4" />
                  Score My Resume
                </button>
              </div>
            </div>
          </div>

          {/* ── Stat Cards ─────────────────────────────────── */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 p-6 overflow-hidden transition-all duration-500"
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
                    {stat.value}
                    <span className="text-base font-normal text-muted-foreground/30 ml-1">
                      {stat.unit}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {stat.delta}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom Row: Activity + Readiness ───────────── */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activity */}
            <div className="rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-8 overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-1 font-mono">
                  Activity Log
                </p>
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Recent Sessions
                </h3>
                <div className="flex flex-col divide-y divide-border/50">
                  {[
                    {
                      action: "Scored resume against Google SWE JD",
                      time: "2h ago",
                      icon: <FileTextIcon className="size-3.5 text-primary" />,
                      score: "+4 pts",
                    },
                    {
                      action: "Completed Frontend mock interview",
                      time: "Yesterday",
                      icon: <MicIcon className="size-3.5 text-primary" />,
                      score: "78%",
                    },
                    {
                      action: "Roast My Resume session",
                      time: "2 days ago",
                      icon: <FlameIcon className="size-3.5 text-primary" />,
                      score: "12 fixes",
                    },
                    {
                      action: "Keyword gap — Meta JD",
                      time: "3 days ago",
                      icon: (
                        <ScanSearchIcon className="size-3.5 text-primary" />
                      ),
                      score: "17 gaps",
                    },
                    {
                      action: "STAR Method Wizard session",
                      time: "4 days ago",
                      icon: <StarIcon className="size-3.5 text-primary" />,
                      score: "5 bullets",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-between gap-3 py-3 hover:bg-muted -mx-2 px-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-muted border border-border group-hover:border-primary/30 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                            {item.action}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {item.time}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground group-hover:text-primary/80 transition-colors shrink-0">
                        {item.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Readiness Breakdown */}
            <div className="rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-8 overflow-hidden relative group">
              {/* Premium Background Effects */}
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
                  {[
                    {
                      label: "Resume Quality",
                      value: 84,
                      color: "from-blue-500 to-indigo-500",
                      shadow: "shadow-blue-500/20",
                    },
                    {
                      label: "Technical Accuracy",
                      value: 71,
                      color: "from-purple-500 to-fuchsia-500",
                      shadow: "shadow-purple-500/20",
                    },
                    {
                      label: "Behavioral Confidence",
                      value: 68,
                      color: "from-emerald-400 to-teal-500",
                      shadow: "shadow-emerald-500/20",
                    },
                    {
                      label: "Communication Clarity",
                      value: 75,
                      color: "from-orange-400 to-red-500",
                      shadow: "shadow-orange-500/20",
                    },
                    {
                      label: "Keyword Coverage",
                      value: 58,
                      color: "from-rose-400 to-pink-600",
                      shadow: "shadow-rose-500/20",
                    },
                  ].map((skill) => (
                    <div key={skill.label} className="group/skill relative">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-foreground/80 group-hover/skill:text-foreground transition-colors">
                          {skill.label}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span
                            className="text-lg font-bold text-transparent bg-clip-text"
                            style={{
                              backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                            }}
                          >
                            <span
                              className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                            >
                              {skill.value}
                            </span>
                          </span>
                          <span className="text-[10px] text-muted-foreground/60 font-mono">
                            /100
                          </span>
                        </div>
                      </div>
                      <div className="relative h-3 rounded-full bg-muted/30 border border-border/50 shadow-inner mt-3">
                        <div
                          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${skill.color} shadow-sm ${skill.shadow} transition-all duration-1000 ease-out flex items-center justify-end pr-1`}
                          style={{ width: `${skill.value}%` }}
                        >
                          {/* Inner light reflection for a 3D cylindrical feel */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 rounded-full pointer-events-none" />
                          {/* Glowing tip */}
                          <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/40 to-transparent rounded-full pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 relative p-[1px] rounded-2xl bg-gradient-to-r from-primary/30 to-purple-600/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 blur-xl" />
                  <div className="relative bg-card rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                    <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary mb-2 font-mono">
                      <ZapIcon
                        size={12}
                        className="text-primary fill-primary/20 animate-pulse"
                      />{" "}
                      AI Recommendation
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed font-light">
                      Focus on{" "}
                      <span className="text-foreground font-semibold">
                        Keyword Coverage
                      </span>{" "}
                      — run a Gap Analysis against your target JDs to close the
                      gap.
                    </p>
                  </div>
                </div>

                {/* Mini bar chart for sessions over the week */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 font-mono">
                    Activity Heatmap
                  </p>
                  <div className="flex items-end justify-between gap-2 h-16">
                    {[3, 1, 4, 2, 5, 3, 4].map((h, i) => (
                      <div
                        key={i}
                        className="group/bar flex-1 flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <div
                          className="w-full max-w-[24px] rounded-sm bg-muted group-hover/bar:bg-primary/20 border border-border/50 transition-colors relative overflow-hidden"
                          style={{ height: `${Math.max(20, (h / 5) * 100)}%` }}
                        >
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary to-blue-500 opacity-60 group-hover/bar:opacity-100 transition-opacity h-full" />
                        </div>
                        <span className="text-[10px] text-muted-foreground group-hover/bar:text-primary font-mono transition-colors">
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
