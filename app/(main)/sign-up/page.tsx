"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white m">
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(34,211,238,0.15)] mt-24">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center">
          Create an{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Account
          </span>
        </h2>
        <p className="text-gray-400 text-center mt-2">
          Join thousands of developers worldwide
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
            placeholder="Write Your Full Name"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none "
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Write Your Email Address"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none "
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Write Your Password"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-white hover:bg-cyan-400 text-black font-semibold transition"
          >
            Sign Up
          </button>
        </form>
        {/* OR separator */}
        <div className="flex items-center w-full my-2">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-2  text-gray-500 font-medium">OR</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        {/* Google Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none  hover:bg-black/50 hover:bg-cyan-400"
        >
          <FcGoogle size={24} />
          <span className="font-medium text-white hover:text-black">
            Continue with Google
          </span>
        </button>
        {/* Footer */}
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <a href="/sign-in" className="text-cyan-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
