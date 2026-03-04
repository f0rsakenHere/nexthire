import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Mic, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const totalUsers = 20;
  const totalResumes = 65;
  const totalInterviews = 25;

  return (
    <div className="space-y-10">
      {/*  Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl  p-10  shadow-xl">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Welcome back, Admin </h1>
          <p className=" max-w-xl">
            Monitor platform growth, user activity, and AI performance in
            real-time.
          </p>

          <div className="mt-6 flex gap-4">
            <Button variant="outline">View Users</Button>
            <Button
              variant="outline"
              className="bg-white/10  border-white/30 hover:bg-white/20"
            >
              View Analytics
            </Button>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      </div>

      {/*  Stats Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalUsers}</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" /> +12% this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Resumes</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalResumes}</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" /> +8% this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Interviews</CardTitle>
            <Mic className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalInterviews}</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" /> +5% this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/*  Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>• Saad uploaded a new resume</p>
          <p>• Tonmoy completed a mock interview</p>
          <p>• 5 new users registered today</p>
        </CardContent>
      </Card>
    </div>
  );
}
