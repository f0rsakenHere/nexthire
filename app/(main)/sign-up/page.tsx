"use client";
import { useState } from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useSignInWithGithub } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
  
  const router = useRouter();

  const saveUserToDatabase = async (user: any, provider: string, userName?: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: userName || user.displayName || user.email?.split('@')[0],
          provider: provider,
          photoURL: user.photoURL,
        }),
      });

      const data = await response.json();
      console.log('User saved to MongoDB:', data);
      return data;
    } catch (error) {
      console.error('Error saving to MongoDB:', error);
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
        await saveUserToDatabase(res.user, 'email', name);

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
        await saveUserToDatabase(res.user, 'google');
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
        await saveUserToDatabase(res.user, 'github');
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("GitHub sign-up error:", error);
      alert("Failed to sign up with GitHub");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-card backdrop-blur-xl border border-border p-8 shadow-xl mt-24">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center">
          Create an{" "}
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Account
          </span>
        </h2>
        <p className="text-muted-foreground text-center mt-2">
          Be a part of the NextHire community
        </p>
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="mt-8 space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write Your Full Name"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Write Your Email Address"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Write Your Password"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition shadow-sm"
          >
            Sign Up
          </button>
        </form>
        {/* OR separator */}
        <div className="flex items-center w-full my-4">
          <hr className="flex-grow border-t border-border" />
          <span className="mx-2 text-muted-foreground text-sm font-medium">
            Continue with
          </span>
          <hr className="flex-grow border-t border-border" />
        </div>
        {/* social Button */}
        <div className="flex mx-auto gap-3 items-center justify-center">
          <div className="flex-1">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-black/40 border focus:outline-none hover:bg-black/50 hover:bg-cyan-400 disabled:opacity-50"
            >
              <FcGoogle size={18} />
              <span className="font-medium text-white hover:text-black">
                {googleLoading ? "Loading..." : "Google"}
              </span>
            </button>
          </div>
          <div className="flex-1">
            <button
              type="button"
              onClick={handleGithubSignUp}
              disabled={githubLoading}
              className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-black/40 border focus:outline-none hover:bg-black/50 hover:bg-cyan-400 disabled:opacity-50"
            >
              <FaSquareGithub size={18} />
              <span className="font-medium hover:text-black">
                {githubLoading ? "Loading..." : "GitHub"}
              </span>
            </button>
          </div>
        </div>
        {/* Footer */}
        <p className="text-muted-foreground text-center mt-6">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-primary hover:underline font-medium"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
