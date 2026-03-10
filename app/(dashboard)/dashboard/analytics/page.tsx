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
import { LineChartIcon } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background text-foreground min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-border"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground/20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground/80 text-sm">
                    Analytics
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8 relative">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-primary/5 blur-[120px] rounded-full" />

          {/* Page title */}
          <div className="relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
              Insights
            </p>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              Platform{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                Analytics
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              Monitor your platform engagement and AI utilization metrics.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center p-12 lg:p-24 border border-border/50 bg-card/50 backdrop-blur-xl rounded-none shadow-sm"
          >
            <div className="text-center space-y-6 max-w-md mx-auto">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 rounded-none bg-primary/10 blur-2xl scale-150" />
                <div className="relative w-full h-full rounded-none bg-card border border-border flex items-center justify-center">
                  <LineChartIcon className="size-8 text-primary/60" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This section is currently under development. Soon you&apos;ll be able to view detailed insights about your mock interviews, resume scores, and application progress over time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
