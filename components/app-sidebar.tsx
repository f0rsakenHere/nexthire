"use client";

import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

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
  BarChart3Icon,
  BrainCircuitIcon,
  ScanSearchIcon,
  MessageSquareQuoteIcon,
  FlameIcon,
  ZapIcon,
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
        { title: "Keyword Gap Analysis", url: "#" },
        { title: "STAR Method Wizard", url: "#" },
        { title: "Resume Version Control", url: "#" },
        { title: "Blind Resume Review", url: "#" },
      ],
    },
    {
      title: "Interview Practice",
      url: "#",
      icon: <MicIcon />,
      items: [
        {
          title: "Role-Based Mock Interviews",
          url: "/dashboard/mock-interview",
        },
        { title: "Real-time Voice Interaction", url: "#" },
        { title: "Instant Feedback Loop", url: "#" },
        { title: "Company-Specific Drills", url: "#" },
        { title: "Interview Panic Button", url: "#" },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: <BarChart3Icon />,
      items: [
        { title: "Progress Analytics", url: "#" },
        { title: "Confidence Tracker", url: "#" },
        { title: "Skill Growth Chart", url: "#" },
      ],
    },
    {
      title: "AI Innovations",
      url: "#",
      icon: <BrainCircuitIcon />,
      items: [
        { title: "Roast My Resume", url: "#" },
        { title: "Behavioral Tone Detector", url: "#" },
        { title: "Salary Negotiation Sim", url: "#" },
        { title: "Skill Mapper", url: "#" },
        { title: "Code Snippet Validator", url: "#" },
      ],
    },
  ],
  quickTools: [
    {
      name: "Keyword Gap Analysis",
      url: "#",
      icon: <ScanSearchIcon />,
    },
    {
      name: "Instant Feedback",
      url: "#",
      icon: <MessageSquareQuoteIcon />,
    },
    {
      name: "Roast My Resume",
      url: "#",
      icon: <FlameIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user] = useAuthState(auth);

  const userData = user
    ? {
        name: user.displayName || user.email?.split("@")[0] || "User",
        email: user.email || "",
        avatar: user.photoURL || "",
      }
    : data.user;

  return (
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
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
