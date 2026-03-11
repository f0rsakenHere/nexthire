"use client";

import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useEffect, useState } from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
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
  ScanSearchIcon,
  ZapIcon,
  MessageCircleQuestionMark,
  HistoryIcon,
  KanbanSquareIcon,
  LineChartIcon,
} from "lucide-react";

const data = {
  user: {
    name: "Alex Johnson",
    email: "alex@nexthire.ai",
    avatar: "",
  },
  navMain: [
    {
      title: "Resume Tools",
      url: "#",
      icon: <FileTextIcon />,
      isActive: true,
      items: [
        { title: "AI Resume Scorer", url: "/dashboard/resume-scorer" },
        {
          title: "Keyword Gap Analysis",
          url: "/dashboard/keyword-gap-analysis",
        },
      ],
    },
    {
      title: "Interview Practice",
      url: "#",
      icon: <MicIcon />,
      items: [
        { title: "Mock Interviews", url: "/dashboard/mock-interview" },
        { title: "Video Interaction", url: "/dashboard/video-interaction" },
        { title: "Practice Questions", url: "/dashboard/frontend-question" },
      ],
    },
    {
      title: "Job Tracker",
      url: "/dashboard/tracker",
      icon: <KanbanSquareIcon />,
      items: [{ title: "Application Tracker", url: "/dashboard/tracker" }],
    },
    {
      title: "History",
      url: "#",
      icon: <HistoryIcon />,
      items: [
        { title: "Resume Score History", url: "/dashboard/resume-history" },
        { title: "Interview Sessions", url: "/dashboard/interview-history" },
        { title: "Keyword Gap History", url: "/dashboard/keyword-history" },
      ],
    },
    {
      title: "Insights",
      url: "#",
      icon: <LineChartIcon />,
      items: [{ title: "Analytics", url: "/dashboard/analytics" }],
    },
  ],
  quickTools: [
    {
      name: "Keyword Gap Analysis",
      url: "/dashboard/keyword-gap-analysis",
      icon: <ScanSearchIcon />,
    },
    {
      name: "Practice Questions",
      url: "/dashboard/frontend-question",
      icon: <MessageCircleQuestionMark />,
    },
    {
      name: "Application Tracker",
      url: "/dashboard/tracker",
      icon: <KanbanSquareIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isImpersonating") === "true") {
      setIsImpersonating(true);
    }
  }, []);

  const endImpersonation = async () => {
    localStorage.removeItem("isImpersonating");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // clear cookie
    await auth.signOut();
    window.location.href = "/sign-in"; // Redirect to login page to log back in as Admin
  };

  useEffect(() => {
    if (!user?.email) return;
    fetch("/api/admin/check", {
      headers: { "x-user-email": user.email },
    })
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.isAdmin === true))
      .catch(() => {});
  }, [user?.email]);

  const userData = user
    ? {
        name: user.displayName || user.email?.split("@")[0] || "User",
        email: user.email || "",
        avatar: user.photoURL || "",
      }
    : data.user;

  return (
    <>
      {isImpersonating && (
        <div className="bg-orange-500/20 text-orange-400 text-sm font-semibold p-2 text-center flex items-center justify-center gap-4 z-50 relative border-b border-orange-500/50">
          ⚠️ You are currently impersonating a user.
          <button
            onClick={endImpersonation}
            className="underline hover:text-orange-300"
          >
            End Session
          </button>
        </div>
      )}

      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          {/* NextHire Brand Logo */}
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
          <NavMain items={data.navMain} />
          <NavProjects projects={data.quickTools} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData} isAdmin={isAdmin} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
