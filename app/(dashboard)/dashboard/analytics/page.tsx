"use client";

import { motion } from "framer-motion";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

export default function AnalyticsPage() {

  const [user] = useAuthState(auth);
  const userId = user?.uid;

  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`/api/analytics/${userId}`);
        const data = await res.json();
        setAnalyticsData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId]);

  const interviewTrend = analyticsData?.interviewTrend || [];

  const applicationPipeline =
    analyticsData?.applications?.statusBreakdown
      ? Object.entries(
        analyticsData.applications.statusBreakdown
      ).map(([status, value]) => ({
        status,
        value,
      }))
      : [];

  const keywordRadar = [
    { subject: "Found", value: analyticsData?.keywords?.totalKeywords || 0 },
    { subject: "Missing", value: analyticsData?.keywords?.missingKeywords || 0 },
    { subject: "ATS", value: analyticsData?.keywords?.atsScore || 0 },
  ];

  return (
    <SidebarProvider>

      <AppSidebar />

      <SidebarInset className="bg-background text-foreground min-h-screen">

        {/* Header */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4">

            <SidebarTrigger className="-ml-1" />

            <Separator orientation="vertical" className="mr-2 h-4" />

            <Breadcrumb>
              <BreadcrumbList>

                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Analytics
                  </BreadcrumbPage>
                </BreadcrumbItem>

              </BreadcrumbList>
            </Breadcrumb>

          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8">

          {/* Title */}
          <div>

            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
              Insights
            </p>

            <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
              Progress Analytics
            </h1>

            <p className="text-muted-foreground text-sm mt-1.5">
              Monitor interview performance, resume scores, and job applications.
            </p>

          </div>


          {/* Summary Cards */}

          <div className="grid gap-4 md:grid-cols-4">

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Interviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">
                    {analyticsData?.interviews?.totalInterviews || 0}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Interview Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">
                    {analyticsData?.interviews?.avgInterviewScore || 0}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">
                    {analyticsData?.applications?.totalApplications || 0}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  ATS Resume Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">
                    {analyticsData?.resume?.atsScore || 0}
                  </p>
                )}
              </CardContent>
            </Card>

          </div>


          {/* Charts */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Interview Trend */}

            <Card>
              <CardHeader>
                <CardTitle>Interview Score Trend</CardTitle>
              </CardHeader>

              <CardContent className="h-[260px]">

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={interviewTrend}>
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>

              </CardContent>
            </Card>


            {/* Application Pipeline */}

            <Card>
              <CardHeader>
                <CardTitle>Application Pipeline</CardTitle>
              </CardHeader>

              <CardContent className="h-[260px]">

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicationPipeline}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="hsl(var(--primary))"
                    />
                  </BarChart>
                </ResponsiveContainer>

              </CardContent>
            </Card>


            {/* ATS Score */}

            <Card>
              <CardHeader>
                <CardTitle>ATS Resume Score</CardTitle>
              </CardHeader>

              <CardContent className="h-[260px]">

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      {
                        date: "Latest",
                        score: analyticsData?.resume?.atsScore || 0,
                      },
                    ]}
                  >
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>

              </CardContent>
            </Card>


            {/* Keyword Radar */}

            <Card>
              <CardHeader>
                <CardTitle>Keyword Coverage</CardTitle>
              </CardHeader>

              <CardContent className="h-[260px]">

                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={keywordRadar}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>

              </CardContent>
            </Card>

          </div>

        </div>

      </SidebarInset>

    </SidebarProvider>
  );
}