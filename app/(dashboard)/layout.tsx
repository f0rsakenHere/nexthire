import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <TooltipProvider>{children}</TooltipProvider>
    </AuthGuard>
  );
}
