"use client";

import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
            <div className="h-3 w-3 rounded-full bg-blue-400" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            NextHire
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} NextHire AI. All rights reserved.
        </p>
        <div className="flex gap-6 text-gray-400">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
}
