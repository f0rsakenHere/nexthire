"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // <-- router import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Mic, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type Stats = {
  totalUsers: number;
  totalResumes: number;
  totalInterviews: number;
  userGrowth: number; // percentage
  resumeGrowth: number; // percentage
  interviewGrowth: number; // percentage
};

type Activity = {
  id: string;
  description: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const router = useRouter(); // <-- router instance

  useEffect(() => {
    // Fetch stats
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    // Fetch recent activity
    fetch("/api/admin/recent-activity")
      .then((res) => res.json())
      .then((data) => setRecentActivity(data));
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="space-y-10 p-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl p-10 shadow-xl">
        <h1 className="text-4xl font-bold mb-3">Welcome back, Admin</h1>
        <p className="max-w-xl">
          Monitor platform growth, user activity, and AI performance in
          real-time.
        </p>

        <div className="mt-6 flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/users")} // <-- redirect to Users page
          >
            View Users
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/analytics")} // <-- redirect to Analytics page
          >
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalUsers}</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" /> +{stats.userGrowth}% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Resumes</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalResumes}</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" /> +{stats.resumeGrowth}% this
              month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Interviews</CardTitle>
            <Mic className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalInterviews}</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" /> +{stats.interviewGrowth}% this
              month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {recentActivity.length === 0 ? (
            <p>No recent activity</p>
          ) : (
            recentActivity.map((item) => (
              <p key={item.id}>• {item.description}</p>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
