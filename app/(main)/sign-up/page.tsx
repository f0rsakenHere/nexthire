"use client";
import { useState } from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { googleProvider } from "@/app/firebase/config";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
  useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
  useSignInWithGoogle(auth);

  const router = useRouter();
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
      console.log({ res });
      setEmail("");
      setPassword("");
      return (
        alert("Account created successfully! Please Sign In"),
        router.push("/sign-in")
      );
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  //Social-login
  const handleGoogleLogin = async () => {
  try {
    const res = await signInWithGoogle();
    console.log(res);
    alert("Google login successful!");
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white m">
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(34,211,238,0.15)] mt-24">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center">
          Create an{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Account
          </span>
        </h2>
        <p className="text-gray-400 text-center mt-2">
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
            placeholder="Write Your Full Name"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border focus:outline-none "
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Write Your Email Address"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border focus:outline-none "
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Write Your Password"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border 0 focus:outline-none"
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
          <span className="mx-2 text-gray-500 font-medium">Continue with</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        {/* social Button */}
        <div className="flex mx-auto gap-3 items-center justify-center">
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-black/40 border focus:outline-none hover:bg-black/50 hover:bg-cyan-400"
            >
              <FcGoogle size={18} />
              <span className="font-medium text-white hover:text-black">
                Google
              </span>
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-black/40 border focus:outline-none hover:bg-black/50 hover:bg-cyan-400"
            >
              <FaSquareGithub size={18} />
              <span className="font-medium hover:text-black">GitHub</span>
            </button>
          </div>

          {/* error handler */}
          {googleLoading && <p className="text-center">Loading...</p>}
          {googleError && (
         <p className="text-red-500 text-center">{googleError.message}</p>
          )}

        </div>
        {/* Footer */}
        <p className="text-gray-400 text-center mt-6">
          Already have an account?
          <a href="/sign-in" className="text-cyan-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
