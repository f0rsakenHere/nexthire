"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ConfettiPiece {
    left: string;
    top: string;
    delay: string;
    duration: string;
    size: string;
    radius: string;
    color: string;
}

function generateConfetti(count: number): ConfettiPiece[] {
    const colors = ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ec4899", "#06b6d4"];
    return Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${1 + Math.random() * 2}s`,
        size: "8px",
        radius: Math.random() > 0.5 ? "50%" : "0",
        color: colors[Math.floor(Math.random() * colors.length)],
    }));
}

export default function PaymentSuccess() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [showConfetti, setShowConfetti] = useState(true);

    const confettiPieces = useMemo(() => generateConfetti(40), []);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="flex-1 flex items-center justify-center min-h-[80vh] p-6">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Success Animation */}
                <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
                        <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Payment Successful! 🎉
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Your subscription has been activated. You now have access to all
                        premium features.
                    </p>
                </div>

                {/* Session Details */}
                {sessionId && (
                    <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                        <span className="font-medium">Session ID:</span>{" "}
                        <code className="text-xs break-all">{sessionId}</code>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                    <Button asChild size="lg" className="font-semibold">
                        <Link href="/dashboard">
                            Go to Dashboard
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/dashboard/mock-interview">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Start a Mock Interview
                        </Link>
                    </Button>
                </div>

                {/* Confetti Effect */}
                {showConfetti && (
                    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                        {confettiPieces.map((piece, i) => (
                            <div
                                key={i}
                                className="absolute animate-bounce"
                                style={{
                                    left: piece.left,
                                    top: piece.top,
                                    animationDelay: piece.delay,
                                    animationDuration: piece.duration,
                                    width: piece.size,
                                    height: piece.size,
                                    borderRadius: piece.radius,
                                    backgroundColor: piece.color,
                                    opacity: 0.8,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
