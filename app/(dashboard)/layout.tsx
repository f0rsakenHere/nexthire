import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
