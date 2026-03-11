"use client";

import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useEffect, useState } from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  FileTextIcon,
  MicIcon,
  KanbanSquareIcon,
  HistoryIcon,
  LineChartIcon,
  ZapIcon,
} from "lucide-react";

const navSections = [
  {
    title: "Job Tracker",
    url: "#",
    icon: <KanbanSquareIcon className="size-3.5" />,
    items: [
      { title: "Application Tracker", url: "/dashboard/tracker" },
    ],
  },
  {
    title: "Resume Tools",
    url: "#",
    icon: <FileTextIcon className="size-3.5" />,
    items: [
      { title: "AI Resume Scorer",     url: "/dashboard/resume-scorer" },
      { title: "Keyword Gap Analysis", url: "/dashboard/keyword-gap-analysis" },
    ],
  },
  {
    title: "Interview Practice",
    url: "#",
    icon: <MicIcon className="size-3.5" />,
    items: [
      { title: "Mock Interviews",    url: "/dashboard/mock-interview" },
      { title: "Video Interaction",  url: "/dashboard/video-interaction" },
      { title: "Practice Questions", url: "/dashboard/frontend-question" },
    ],
  },
  {
    title: "Insights",
    url: "#",
    icon: <LineChartIcon className="size-3.5" />,
    items: [
      { title: "Analytics", url: "/dashboard/analytics" },
    ],
  },
  {
    title: "History",
    url: "#",
    icon: <HistoryIcon className="size-3.5" />,
    items: [
      { title: "Resume Score History", url: "/dashboard/resume-history" },
      { title: "Interview Sessions",   url: "/dashboard/interview-history" },
      { title: "Keyword Gap History",  url: "/dashboard/keyword-history" },
    ],
  },
];

// Format raw email prefix into a readable name ("demoadmin" → "Demo Admin")
function formatDisplayName(raw: string): string {
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-.]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [firebaseUser] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dbName, setDbName] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseUser?.email) return;
    fetch("/api/admin/check", {
      headers: { "x-user-email": firebaseUser.email },
    })
      .then((r) => r.json())
      .then((d) => {
        setIsAdmin(d.isAdmin === true);
        if (d.name) setDbName(d.name);
      })
      .catch(() => {});
  }, [firebaseUser?.email]);

  const resolvedName =
    dbName ||
    firebaseUser?.displayName ||
    (firebaseUser?.email ? formatDisplayName(firebaseUser.email.split("@")[0]) : null) ||
    "User";

  const userData = {
    name: resolvedName,
    email: firebaseUser?.email ?? "",
    avatar: firebaseUser?.photoURL ?? "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-primary-foreground shadow-sm">
                  <ZapIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-sm">NextHire</span>
                  <span className="text-[10px] uppercase tracking-widest text-primary/60 font-mono">
                    AI Coach
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navSections} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} isAdmin={isAdmin} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
