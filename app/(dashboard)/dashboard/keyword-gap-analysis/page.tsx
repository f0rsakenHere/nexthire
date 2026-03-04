"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function KeywordGapAnalysisPage() {
    return(
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-xl">
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
                                        Keyword Gap Analysis
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-4 flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                            AI Resume Checker Online
                        </span>
                    </div>
                </header>

                {/* Main content start */}
                <div className="p-6 lg:p-8 flex flex-col gap-8">
                    {/* Page title */}
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                                Resume Improvement
                            </p>
                            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
                                Keyword Gap{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                                    Analysis
                                </span>
                            </h1>
                            <p className="text-muted-foreground text-sm mt-1.5">
                                Improve your resume with more JD acceptable keywords.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 lg:p-8">
                    <div className="flex justify-around gap-5">
                        {/* Resume input */}
                        <form className="border w-[50%] min-h-20"></form>
                        {/* Job Description input */}
                        <form className="border w-[50%] min-h-20"></form>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
} 