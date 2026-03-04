"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Stats = {
  totalUsers: number;
  totalResumes: number;
  totalInterviews: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <p>Total Users</p>
          <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p>Total Resumes</p>
          <h2 className="text-3xl font-bold">{stats.totalResumes}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p>Total Interviews</p>
          <h2 className="text-3xl font-bold">{stats.totalInterviews}</h2>
        </CardContent>
      </Card>
    </div>
  );
}
