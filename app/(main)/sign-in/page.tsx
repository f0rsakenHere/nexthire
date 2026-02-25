// "use client";
// import { FcGoogle } from "react-icons/fc";
// import { useState } from "react";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth } from "@/app/firebase/config";
// import { useRouter } from "next/navigation";
// import { FaSquareGithub } from "react-icons/fa6";

// export default function SignInPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const [signInWithEmailAndPassword, user, loading, firebaseError] =
//     useSignInWithEmailAndPassword(auth);

//   const router = useRouter();

//   const getFirebaseError = (error: any) => {
//     if (!error) return "";

//     if (error.code === "auth/user-not-found") {
//       return "No user found with this email";
//     }

//     if (error.code === "auth/wrong-password") {
//       return "Incorrect password";
//     }

//     if (error.code === "auth/invalid-email") {
//       return "Invalid email format";
//     }

//     return "Login failed. Try again.";
//   };

//   const handleSignIn = async () => {
//     if (!email || !password) {
//       setErrorMsg("Email and password are required");
//       return;
//     }

//     setErrorMsg("");

//     try {
//       const res = await signInWithEmailAndPassword(email, password);

//       if (res?.user) {
//         setEmail("");
//         setPassword("");
//         router.push("/dashboard");
//       }
//     } catch (err: any) {
//       setErrorMsg(err.message);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-black text-white">
//       {/* Card */}
//       <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(34,211,238,0.15)] mt-22">
//         {/* Heading */}
//         <h2 className="text-4xl font-bold text-center">
//           Sign In Your{" "}
//           <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
//             Account
//           </span>
//         </h2>

//         <p className="text-gray-400 text-center mt-2">
//           Welcome Back to the NextHire community
//         </p>

//         {/* Form */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSignIn();
//           }}
//           className="mt-8 space-y-4"
//         >
//           {/* Email */}
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Write Your Email Address"
//             className="w-full px-4 py-3 rounded-lg bg-black/40 border focus:outline-none"
//             required
//           />

//           {/* Password */}
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Write Your Password"
//             className="w-full px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none shadow-blue-500 shadow-md"
//             required
//           />

//           {/* Forgot password */}
//           <div className="mt-2">
//             <button type="button" className="link link-hover hover:underline">
//               Forgot password?
//             </button>
//           </div>

//           {/* Error */}
//           {(errorMsg || firebaseError) && (
//             <p className="text-red-500 text-sm">
//               {errorMsg || getFirebaseError(firebaseError)}
//             </p>
//           )}

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-2 py-3 rounded-lg bg-white hover:bg-cyan-400 text-black font-semibold transition disabled:opacity-50"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center w-full my-4">
//           <hr className="flex-grow border-t border-gray-400" />
//           <span className="mx-2 text-gray-500 font-medium">Continue with</span>
//           <hr className="flex-grow border-t border-gray-400" />
//         </div>

//         {/* Social Buttons */}
//         <div className="flex mx-auto gap-3 items-center justify-center">
//           <button
//             type="button"
//             className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black/40 border hover:bg-cyan-400"
//           >
//             <FcGoogle size={18} />
//             <span className="font-medium hover:text-black">Google</span>
//           </button>

//           <button
//             type="button"
//             className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black/40 border hover:bg-cyan-400"
//           >
//             <FaSquareGithub size={18} />
//             <span className="font-medium hover:text-black">GitHub</span>
//           </button>
//         </div>

//         {/* Sign Up */}
//         <p className="text-gray-400 text-center mt-6">
//           Don't have an account?{" "}
//           <a href="/sign-up" className="text-cyan-500 hover:underline">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { FaSquareGithub } from "react-icons/fa6";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 🔥 Reset states
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();

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
        setEmail("");
        setPassword("");
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // 🔥 RESET FUNCTION
  const handleResetPassword = async () => {
    if (!resetEmail) {
      setErrorMsg("Enter your email first");
      return;
    }

    setResetLoading(true);
    setErrorMsg("");

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Check your Gmail inbox.");
      setShowResetModal(false);
      setResetEmail("");
    } catch (err: any) {
      setErrorMsg(err.message);
    }

    setResetLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(34,211,238,0.15)] mt-22">
        <h2 className="text-4xl font-bold text-center">
          Sign In Your{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Account
          </span>
        </h2>

        <p className="text-gray-400 text-center mt-2">
          Welcome Back to the NextHire community
        </p>

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
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none shadow-blue-500 shadow-md"
            required
          />

          {/* 🔥 Forgot password */}
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="hover:underline text-cyan-400"
            >
              Forgot password?
            </button>
          </div>

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

        <div className="flex items-center w-full my-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-2 text-gray-500 font-medium">Continue with</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>

        <div className="flex mx-auto gap-3 items-center justify-center">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black/40 border hover:bg-cyan-400"
          >
            <FcGoogle size={18} />
            <span className="font-medium hover:text-black">Google</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black/40 border hover:bg-cyan-400"
          >
            <FaSquareGithub size={18} />
            <span className="font-medium hover:text-black">GitHub</span>
          </button>
        </div>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-cyan-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* 🔥 RESET PASSWORD MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute right-3 top-2 text-lg"
            >
              ✕
            </button>

            <h2 className="text-2xl  t font-bold mb-4 text-center">
              Reset Password
            </h2>

            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg mb-4"
            />

            <button
              onClick={handleResetPassword}
              disabled={resetLoading}
              className="w-full py-3 bg-cyan-400  rounded-lg disabled:opacity-50"
            >
              {resetLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
