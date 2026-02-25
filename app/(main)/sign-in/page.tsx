"use client";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle, useSignInWithGithub } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { FaSquareGithub } from "react-icons/fa6";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);

  const router = useRouter();

  const saveUserToDatabase = async (user: any, provider: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || user.email?.split('@')[0],
          provider: provider,
          photoURL: user.photoURL,
        }),
      });

      const data = await response.json();
      console.log('User saved/checked in MongoDB:', data);
      return data;
    } catch (error) {
      console.error('Error saving to MongoDB:', error);
    }
  };

  const getFirebaseError = (error: any) => {
    if (!error) return "";

    if (error.code === "auth/user-not-found") {
      return "No user found with this email";
    }

    if (error.code === "auth/wrong-password") {
      return "Incorrect password";
    }

    if (error.code === "auth/invalid-email") {
      return "Invalid email format";
    }

    return "Login failed. Try again.";
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
        // Check/save user in MongoDB
        await saveUserToDatabase(res.user, 'email');
        
        setEmail("");
        setPassword("");
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      
      if (res?.user) {
        // Check/save user in MongoDB
        await saveUserToDatabase(res.user, 'google');
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
        // Check/save user in MongoDB
        await saveUserToDatabase(res.user, 'github');
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      setErrorMsg("Failed to sign in with GitHub");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(34,211,238,0.15)] mt-22">
        <h2 className="text-2xl font-bold text-center">
          Sign In Your{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Account
          </span>
        </h2>

        <p className="text-gray-400 text-center mt-2">
          Welcome Back to the NextHire community
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className="mt-8 space-y-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Write Your Email Address"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border focus:outline-none"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Write Your Password"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border focus:outline-none"
            required
          />

          {/*  Error Message */}
          {(errorMsg || firebaseError) && (
            <p className="text-red-500 text-sm">
              {errorMsg || getFirebaseError(firebaseError)}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-lg bg-white hover:bg-cyan-400 text-black font-semibold transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* OR separator */}
        <div className="flex items-center w-full my-2">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-2 text-gray-500 font-medium">Continue with</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>

        {/* Social Buttons */}
        <div className="flex mx-auto gap-3 items-center justify-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black/40 border hover:bg-cyan-400 disabled:opacity-50"
          >
            <FcGoogle size={18} />
            <span className="font-medium hover:text-black">
              {googleLoading ? "Loading..." : "Google"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={githubLoading}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black/40 border hover:bg-cyan-400 disabled:opacity-50"
          >
            <FaSquareGithub size={18} />
            <span className="font-medium hover:text-black">
              {githubLoading ? "Loading..." : "GitHub"}
            </span>
          </button>
        </div>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-cyan-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
