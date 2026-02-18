import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
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
        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Write Your Full Name"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none shadow-blue-500 shadow-md"
           required
           />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none shadow-blue-500 shadow-md"
          required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none shadow-blue-500 shadow-md"
          />

  {/* Google Button */}
<button
  type="submit"
  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-black/40 border border-blue-600 focus:outline-none shadow-blue-500 shadow-md hover:bg-black/50"
>
  <FcGoogle size={24} />
  <span className="font-medium text-white">Continue with Google</span>
</button>

  {/* OR separator */}
  <div className="flex items-center w-full my-4">
    <hr className="flex-grow border-t border-gray-400" />
    <span className="mx-2 mt-2 text-gray-500 font-medium">OR</span>
    <hr className="flex-grow border-t border-gray-400" />
  </div>
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-white hover:bg-cyan-400 text-black font-semibold transition"
          >
            Sign Up
          </button>
        </form>

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

