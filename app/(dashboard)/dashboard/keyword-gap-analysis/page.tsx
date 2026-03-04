"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    AlertTriangleIcon,
    ZapIcon,
    CheckCircleIcon,
} from "lucide-react";

interface KeywordItem {
    keyword: string;
    importance: "Required" | "Preferred";
    frequencyInJD: number;
    priority: "High" | "Medium" | "Low";
    matchType: "Full" | "Partial" | "Missing";
    rewriteSuggestion: string;
}

interface AnalysisResponse {
    atsScore: number;
    keywords: KeywordItem[];
    densityReport: Record<
        string,
        { count: number; idealRange: string; status: string }
    >;
    sectionGaps: {
        keyword: string;
        missingIn: string[];
        suggestion: string;
    }[];
}

export default function KeywordGapAnalysisPage() {
    const [resume, setResume] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [role, setRole] = useState("");
    const [industry, setIndustry] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

    async function handleAnalyze() {
        if (!resume.trim() || !jobDesc.trim()) {
            setError("Please provide both resume and job description.");
            return;
        }

        setError(null);
        setLoading(true);
        setAnalysis(null);

        try {
            const res = await fetch("/api/keyword-gap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "analyze",
                    role,
                    industry,
                    resume,
                    jobDescription: jobDesc,
                }),
            });

            const data = await res.json();
            if (!res.ok || data.error)
                throw new Error(data.error || "Analysis failed");

            setAnalysis(data.analysis);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4 bg-border" />
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
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                            AI Resume Checker Online
                        </span>
                    </div>
                </header>

                {/* Main content */}
                <div className="p-6 lg:p-8 flex flex-col gap-8">
                    <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                            Resume Improvement
                        </p>
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
                            Keyword Gap{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
                                Analysis
                            </span>
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1.5">
                            Improve your resume with more JD acceptable keywords.
                        </p>
                    </div>

                    {/* Inputs */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                            <input
                                placeholder="Target Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="border border-border/50 bg-background px-4 py-3 text-sm"
                            />
                            <input
                                placeholder="Industry"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="border border-border/50 bg-background px-4 py-3 text-sm"
                            />
                            <textarea
                                placeholder="Paste Resume Here..."
                                value={resume}
                                onChange={(e) => setResume(e.target.value)}
                                className="border border-border/50 bg-background px-4 py-4 text-sm min-h-55 resize-none"
                            />
                        </div>

                        <textarea
                            placeholder="Paste Job Description Here..."
                            value={jobDesc}
                            onChange={(e) => setJobDesc(e.target.value)}
                            className="border border-border/50 bg-background px-4 py-4 text-sm min-h-75 resize-none"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 px-4 py-3">
                            <AlertTriangleIcon className="size-4" />
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-4 bg-linear-to-r from-primary to-blue-600 text-white text-sm font-bold disabled:opacity-50"
                    >
                        {loading ? "Analyzing..." : "Analyze Resume"}
                    </button>

                    {/* Results */}
                    {analysis && (
                        <div className="flex flex-col gap-8 mt-6">

                            {/* ATS Score */}
                            <div className="p-6 border border-emerald-200 bg-emerald-50 text-center">
                                <CheckCircleIcon className="size-8 mx-auto text-emerald-600 mb-2" />
                                <h2 className="text-xl font-bold text-foreground">
                                    ATS Score: {analysis.atsScore}/100
                                </h2>
                            </div>

                            {/* Priority Keywords */}
                            <div>
                                <h3 className="font-bold text-lg mb-4">Priority Keywords</h3>
                                <div className="grid gap-4">
                                    {analysis.keywords.map((k, i) => (
                                        <div key={i} className="border border-border/50 p-4">
                                            <div className="flex justify-between">
                                                <strong>{k.keyword}</strong>
                                                <span className="text-xs font-mono">
                                                    {k.priority}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {k.importance} • {k.frequencyInJD} times in JD • Match:{" "}
                                                {k.matchType}
                                            </p>
                                            {k.matchType === "Missing" && (
                                                <p className="text-sm mt-3 text-blue-600">
                                                    Suggestion: {k.rewriteSuggestion}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Density */}
                            <div>
                                <h3 className="font-bold text-lg mb-4">
                                    Keyword Density Report
                                </h3>
                                <div className="grid gap-3">
                                    {Object.entries(analysis.densityReport).map(
                                        ([key, value], i) => (
                                            <div key={i} className="border border-border/50 p-3 text-sm">
                                                <strong>{key}</strong> — Used {value.count} times •
                                                Ideal: {value.idealRange} • {value.status}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Section Gaps */}
                            <div>
                                <h3 className="font-bold text-lg mb-4">
                                    Section-Based Gaps
                                </h3>
                                <div className="grid gap-4">
                                    {analysis.sectionGaps.map((g, i) => (
                                        <div key={i} className="border border-border/50 p-4">
                                            <strong>{g.keyword}</strong>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Missing in: {g.missingIn.join(", ")}
                                            </p>
                                            <p className="text-sm mt-2 text-blue-600">
                                                {g.suggestion}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}