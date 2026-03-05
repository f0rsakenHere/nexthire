"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, FileText, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

type Stats = {
  dailyActiveUsers: number;
  averageResumeScore: number;
  mockInterviews: number;
  newUsersToday: number;
  resumesThisWeek: number;
  interviewsToday: number;
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="space-y-10">
      {/*  Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground text-sm">
            Monitor growth and AI platform performance.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">Last 7 Days</Button>
          <Button>Last 30 Days</Button>
        </div>
      </div>

      {/*  Top Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daily Active Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.dailyActiveUsers}</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" /> +18% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Average Resume Score</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {stats.averageResumeScore}%
            </div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" /> +6% this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Mock Interviews</CardTitle>
            <Mic className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.mockInterviews}</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" /> +9% this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/*  Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Overview</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• {stats.newUsersToday} new users registered today</p>
          <p>• {stats.resumesThisWeek} resumes analyzed this week</p>
          <p>• {stats.interviewsToday} mock interviews completed today</p>
        </CardContent>
      </Card>
    </div>
  );
}
