"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { User, AuthError } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSquareGithub } from "react-icons/fa6";
import { Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [signInWithEmailAndPassword, , loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, , googleLoading] = useSignInWithGoogle(auth);
  const [signInWithGithub, , githubLoading] = useSignInWithGithub(auth);

  const router = useRouter();

  const saveUserToDatabase = async (user: User, provider: string) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || user.email?.split("@")[0],
          provider: provider,
          photoURL: user.photoURL,
        }),
      });
      const data = await response.json();
      console.log("User saved/checked in MongoDB:", data);
      return data;
    } catch (error) {
      console.error("Error saving to MongoDB:", error);
    }
  };

  const getFirebaseError = (error: AuthError | null | undefined) => {
    if (!error) return "";
    if (error.code === "auth/user-not-found")
      return "No user found with this email";
    if (error.code === "auth/wrong-password") return "Incorrect password";
    if (error.code === "auth/invalid-email") return "Invalid email format";
    if (error.code === "auth/invalid-credential")
      return "Invalid email or password";
    return "Login failed. Please try again.";
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMsg("Email and password are required");
      return;
    }
    setErrorMsg("");
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res?.user) {
        await saveUserToDatabase(res.user, "email");
        setEmail("");
        setPassword("");
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      if (res?.user) {
        await saveUserToDatabase(res.user, "google");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setErrorMsg("Failed to sign in with Google");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const res = await signInWithGithub();
      if (res?.user) {
        await saveUserToDatabase(res.user, "github");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      setErrorMsg("Failed to sign in with GitHub");
    }
  };

  const displayError = errorMsg || getFirebaseError(firebaseError);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex flex-col w-[45%] p-14 relative overflow-hidden bg-zinc-950 border-r border-border">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="h-3 w-3 rounded-full bg-white/90" />
            </div>
            <span className="text-xl font-medium tracking-tight text-white/90 hover:opacity-100 transition-opacity">
              NextHire
            </span>
          </Link>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-8 mt-16">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Your career,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                accelerated.
              </span>
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
              Join thousands of professionals who use NextHire to score resumes,
              track applications, and land their dream jobs.
            </p>
          </div>

          {/* Dashboard Widget Mockup */}
          <div className="mt-8 bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-md w-full max-w-sm shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-[4px] border-primary/20 flex items-center justify-center relative">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="22"
                        className="stroke-primary"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="138"
                        strokeDashoffset="11"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-white text-sm font-bold">92</span>
                  </div>
                  <div>
                    <h3 className="text-white text-base font-semibold">
                      Resume Score
                    </h3>
                    <p className="text-emerald-400 text-xs font-medium flex items-center gap-1 mt-1">
                      <TrendingUp size={12} /> Top 5% Applicant
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="text-primary" size={18} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-400">Impact & Action Verbs</span>
                    <span className="text-white">Excellent</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-blue-400 w-[90%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-400">Formatting & ATS</span>
                    <span className="text-white">Good</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[75%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-white/5 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                    Analysis Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 mt-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-primary fill-primary"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed italic mb-6">
            &ldquo;NextHire helped me rewrite my resume and land 3 interviews in
            a week. The AI scorer is an absolute game-changer.&rdquo;
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex -space-x-3">
              {/* Face 1 - Dark Blue */}
              <div className="relative w-11 h-11 rounded-full bg-[#1C698E] shadow-[-3px_-3px_0_0_#13506B] flex items-center justify-center mix-blend-normal">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white transform -rotate-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M7 9L9.5 11" />
                  <path d="M16 10.5L14.5 12" />
                  <path d="M11 16L12 17" />
                </svg>
              </div>
              {/* Face 2 - Light Blue */}
              <div className="relative w-11 h-11 rounded-full bg-[#5BBEEA] shadow-[-3px_-3px_0_0_#F07D3E] flex items-center justify-center z-10 mix-blend-normal">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white transform -rotate-6"
                  fill="currentColor"
                >
                  <circle cx="8" cy="11" r="1.5" />
                  <path
                    d="M14 10 Q15 8 16 10"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M8 14 Q12 19 16 14 Z" />
                </svg>
              </div>
              {/* Face 3 - Dark Blue */}
              <div className="relative w-11 h-11 rounded-full bg-[#0D5B7C] shadow-[-3px_-3px_0_0_#F07D3E] flex items-center justify-center z-20 mix-blend-normal">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white transform rotate-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 10 L8.5 8 L10 10" />
                  <path d="M14 10 L15.5 8 L17 10" />
                  <path d="M10 15 Q12 17 15 14" />
                </svg>
              </div>
              {/* Face 4 - Orange */}
              <div className="relative w-11 h-11 rounded-full bg-[#F07D3E] shadow-[-3px_-3px_0_0_#5BBEEA] flex items-center justify-center z-30 mix-blend-normal">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                >
                  <path
                    d="M7 11 Q9 8 11 11"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 11 Q15 8 17 11"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M8 15 Q12 19 16 15 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">
                Join the movement
              </p>
              <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider mt-0.5">
                Trusted by 10k+ users
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-white relative overflow-hidden">
        <div className="w-full max-w-[400px] space-y-8 relative z-10">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-2">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <div className="h-3 w-3 rounded-full bg-white/90" />
              </div>
              <span className="text-xl font-medium tracking-tight text-zinc-950 hover:opacity-90 transition-opacity">
                NextHire
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              Welcome back
            </h2>
            <p className="text-zinc-500 text-sm">
              Sign in to continue to your AI dashboard
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id="signin-google-btn"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-medium text-sm transition-all duration-300 disabled:opacity-50 shadow-sm"
            >
              <FcGoogle size={18} />
              {googleLoading ? "Loading..." : "Google"}
            </button>
            <button
              id="signin-github-btn"
              type="button"
              onClick={handleGithubSignIn}
              disabled={githubLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-medium text-sm transition-all duration-300 disabled:opacity-50 shadow-sm"
            >
              <FaSquareGithub size={18} className="text-zinc-800" />
              {githubLoading ? "Loading..." : "GitHub"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-zinc-200" />
            <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
              or
            </span>
            <hr className="flex-1 border-zinc-200" />
          </div>

          {/* Email / Password Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label
                htmlFor="signin-email"
                className="text-sm font-medium text-zinc-700 ml-1"
              >
                Email address
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 shadow-inner"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label
                  htmlFor="signin-password"
                  className="text-sm font-medium text-zinc-700"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="signin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 shadow-inner"
                required
              />
            </div>

            {/* Error */}
            {displayError && (
              <div className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 backdrop-blur-sm">
                <span className="text-red-400 text-sm mt-0.5">⚠</span>
                <p className="text-red-400 text-sm leading-relaxed">
                  {displayError}
                </p>
              </div>
            )}

            <button
              id="signin-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 disabled:opacity-60 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-[0.98] bg-gradient-to-r from-primary to-blue-600 border border-primary/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </div>
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Create one free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
