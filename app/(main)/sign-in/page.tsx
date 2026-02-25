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
import { FaSquareGithub } from "react-icons/fa6";
import { Briefcase, Sparkles, TrendingUp, Users } from "lucide-react";

const features = [
  { icon: Sparkles, text: "AI-powered resume scoring" },
  { icon: TrendingUp, text: "Track your job applications" },
  { icon: Users, text: "Connect with top recruiters" },
  { icon: Briefcase, text: "Land your dream job faster" },
];

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
      {/* ── Left Panel: Brand / Hero ───────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] px-14 py-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.118 0.028 264) 0%, oklch(0.2 0.08 278) 50%, oklch(0.15 0.06 264) 100%)",
        }}
      >
        {/* Glow orbs */}
        <div
          className="absolute top-[-80px] left-[-80px] w-[380px] h-[380px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.62 0.26 278)" }}
        />
        <div
          className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.7 0.18 195)" }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg"
              style={{ background: "oklch(0.62 0.26 278)" }}
            >
              N
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              NextHire
            </span>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Your career,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, oklch(0.75 0.2 278), oklch(0.7 0.18 195))",
                }}
              >
                accelerated.
              </span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-sm">
              Join thousands of professionals who use NextHire to score resumes,
              track applications, and land their dream jobs.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "oklch(0.62 0.26 278 / 0.2)",
                    border: "1px solid oklch(0.62 0.26 278 / 0.3)",
                  }}
                >
                  <Icon size={15} style={{ color: "oklch(0.75 0.2 278)" }} />
                </div>
                <span className="text-white/75 text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom quote */}
        <div
          className="relative z-10 rounded-xl p-4 border"
          style={{
            background: "oklch(0.62 0.26 278 / 0.08)",
            borderColor: "oklch(0.62 0.26 278 / 0.2)",
          }}
        >
          <p className="text-white/70 text-sm italic leading-relaxed">
            &ldquo;NextHire helped me rewrite my resume and land 3 interviews in
            a week.&rdquo;
          </p>
          <p className="text-white/40 text-xs mt-2">
            — Sarah K., Software Engineer
          </p>
        </div>
      </div>

      {/* ── Right Panel: Form ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-base"
              style={{ background: "oklch(0.62 0.26 278)" }}
            >
              N
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              NextHire
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 text-sm">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id="signin-google-btn"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm transition-all duration-200 hover:border-gray-300 disabled:opacity-50 shadow-sm"
            >
              <FcGoogle size={18} />
              {googleLoading ? "Loading..." : "Google"}
            </button>
            <button
              id="signin-github-btn"
              type="button"
              onClick={handleGithubSignIn}
              disabled={githubLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm transition-all duration-200 hover:border-gray-300 disabled:opacity-50 shadow-sm"
            >
              <FaSquareGithub size={18} className="text-gray-800" />
              {githubLoading ? "Loading..." : "GitHub"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-200" />
            <span className="text-gray-400 text-xs font-medium">
              or continue with email
            </span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Email / Password Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <label
                htmlFor="signin-email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={
                  {
                    "--tw-ring-color": "oklch(0.62 0.26 278 / 0.3)",
                  } as React.CSSProperties
                }
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="signin-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs font-medium hover:underline"
                  style={{ color: "oklch(0.62 0.26 278)" }}
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
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style={
                  {
                    "--tw-ring-color": "oklch(0.62 0.26 278 / 0.3)",
                  } as React.CSSProperties
                }
                required
              />
            </div>

            {/* Error */}
            {displayError && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-3 py-2.5">
                <span className="text-red-500 text-xs mt-0.5">⚠</span>
                <p className="text-red-600 text-xs leading-relaxed">
                  {displayError}
                </p>
              </div>
            )}

            <button
              id="signin-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.26 278), oklch(0.55 0.24 264))",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a
              href="/sign-up"
              className="font-semibold hover:underline"
              style={{ color: "oklch(0.62 0.26 278)" }}
            >
              Create one free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
