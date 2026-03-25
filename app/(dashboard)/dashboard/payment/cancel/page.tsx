"use client";

import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancel() {
    return (
        <main className="flex-1 flex items-center justify-center min-h-[80vh] p-6">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Cancel Icon */}
                <div className="mx-auto flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 border-2 border-amber-400/30">
                    <XCircle className="h-12 w-12 text-amber-400" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Payment Cancelled
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        No worries! Your payment was not processed and you haven&apos;t been
                        charged. You can try again whenever you&apos;re ready.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                    <Button asChild size="lg" className="font-semibold">
                        <Link href="/pricing">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>

                {/* Help Note */}
                <p className="text-sm text-muted-foreground pt-2">
                    Having trouble? Contact us at{" "}
                    <a href="mailto:support@nexthire.com" className="text-primary hover:underline">
                        support@nexthire.com
                    </a>
                </p>
            </div>
        </main>
    );
}
