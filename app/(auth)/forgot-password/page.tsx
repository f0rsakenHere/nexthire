"use client";

import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const [successMsg, setSuccessMsg] = useState("");
  const [localError, setLocalError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setLocalError("");

    if (!email) {
      setLocalError("Please enter your email address.");
      return;
    }

    try {
      const success = await sendPasswordResetEmail(email);
      if (success) {
        setSuccessMsg("Password reset email sent! Check your inbox.");
        setEmail("");
      } else {
        setLocalError(
          error?.message || "Failed to send reset email. Please try again.",
        );
      }
    } catch (err: unknown) {
      setLocalError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    }
  };

  const displayError = localError || error?.message;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16 bg-white relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] space-y-8 relative z-10 border border-zinc-200 bg-white shadow-xl rounded-3xl p-8 sm:p-10">
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </Link>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Reset password
          </h2>
          <p className="text-zinc-500 text-sm">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="space-y-1.5">
            <label
              htmlFor="reset-email"
              className="text-sm font-medium text-zinc-700 ml-1"
            >
              Email address
            </label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 shadow-inner"
              required
            />
          </div>

          {/* Success Message */}
          {successMsg && (
            <div className="flex items-start gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 backdrop-blur-sm">
              <span className="text-emerald-600 text-sm mt-0.5">✓</span>
              <p className="text-emerald-600 text-sm leading-relaxed">
                {successMsg}
              </p>
            </div>
          )}

          {/* Error */}
          {displayError && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
              <span className="text-red-500 text-sm mt-0.5">⚠</span>
              <p className="text-red-600 text-sm leading-relaxed">
                {displayError}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 disabled:opacity-60 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-[0.98] bg-gradient-to-r from-primary to-blue-600 border border-primary/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <div className="relative z-10">
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send reset link"
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
