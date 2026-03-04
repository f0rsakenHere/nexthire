"use client";
import { useState } from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, , googleLoading] = useSignInWithGoogle(auth);
  const [signInWithGithub, , githubLoading] = useSignInWithGithub(auth);

  const router = useRouter();

  const saveUserToDatabase = async (
    user: User,
    provider: string,
    userName?: string,
  ) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: userName || user.displayName || user.email?.split("@")[0],
          provider: provider,
          photoURL: user.photoURL,
        }),
      });

      const data = await response.json();
      console.log("User saved to MongoDB:", data);
      return data;
    } catch (error) {
      console.error("Error saving to MongoDB:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const uppercase = /[A-Z]/;
      const lowercase = /[a-z]/;

      if (password.length < 6) {
        return alert("less than 6 characters");
      }
      if (!uppercase.test(password)) {
        return alert("Need a UpperCase");
      }
      if (!lowercase.test(password)) {
        return alert("Need a Lower Case");
      }

      const res = await createUserWithEmailAndPassword(email, password);

      if (res?.user) {
        // Save user to MongoDB
        await saveUserToDatabase(res.user, "email", name);

        setEmail("");
        setPassword("");
        setName("");
        alert("Account created successfully! Please Sign In");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error creating account. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const res = await signInWithGoogle();

      if (res?.user) {
        // Save user to MongoDB
        await saveUserToDatabase(res.user, "google");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Google sign-up error:", error);
      alert("Failed to sign up with Google");
    }
  };

  const handleGithubSignUp = async () => {
    try {
      const res = await signInWithGithub();

      if (res?.user) {
        // Save user to MongoDB
        await saveUserToDatabase(res.user, "github");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("GitHub sign-up error:", error);
      alert("Failed to sign up with GitHub");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 relative overflow-hidden px-4">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Card */}
      <div className="w-full max-w-md rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 shadow-2xl mt-16 relative z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Heading */}
        <div className="space-y-1.5 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Create an{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Account
            </span>
          </h2>
          <p className="text-zinc-400 text-sm">
            Be a part of the NextHire community
          </p>
        </div>
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="mt-8 space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300 ml-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm shadow-inner"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300 ml-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm shadow-inner"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-[0.98] bg-gradient-to-r from-primary to-blue-600 border border-primary/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <div className="relative z-10">Sign Up</div>
          </button>
        </form>
        {/* OR separator */}
        <div className="flex items-center w-full my-6 gap-3">
          <hr className="grow border-t border-white/10" />
          <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
            or continue with
          </span>
          <hr className="grow border-t border-white/10" />
        </div>

        {/* social Button */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white font-medium text-sm transition-all duration-300 disabled:opacity-50"
          >
            <FcGoogle size={18} />
            {googleLoading ? "Loading..." : "Google"}
          </button>
          <button
            type="button"
            onClick={handleGithubSignUp}
            disabled={githubLoading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white font-medium text-sm transition-all duration-300 disabled:opacity-50"
          >
            <FaSquareGithub size={18} className="text-white" />
            {githubLoading ? "Loading..." : "GitHub"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-400 mt-8">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
