"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [user] = useState(false); // Auth state simulation

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-50">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <div className="h-3 w-3 rounded-full bg-white/90" />
            </div>
            <span className="text-xl font-medium tracking-tight text-white hover:opacity-90 transition-opacity">
              NextHire
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:absolute md:inset-x-0 md:flex md:justify-center items-center space-x-8 pointer-events-none">
            <div className="pointer-events-auto flex items-center space-x-8 bg-black/20 backdrop-blur-md rounded-full px-6 py-2 border border-white/5">
              {["Product", "How it works", "Features", "Mission", "About","Contact Us"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/70 hover:text-white transition-all text-sm font-medium tracking-wide hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4 z-50">
            {user ? (
              <Button
                variant="ghost"
                className="text-white hover:text-blue-400 rounded-full px-6"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-full px-6 h-10 transition-all duration-300 hover:border-white/40"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-white text-black hover:bg-gray-200 hover:text-black rounded-full px-6 h-10 font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] border-0">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu (Hamburger) */}
          <div className="md:hidden z-50">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black/95 border-white/10 text-white w-full sm:max-w-md backdrop-blur-2xl"
              >
                <div className="flex flex-col gap-8 mt-10">
                  <div className="flex flex-col gap-4">
                    {["Product", "How it works", "Features", "Mission"].map(
                      (item) => (
                        <Link
                          key={item}
                          href="#"
                          className="text-2xl font-medium text-gray-300 hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      ),
                    )}
                  </div>
                  <div className="h-px bg-white/10 w-full" />
                  <div className="flex flex-col gap-4">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 h-12 rounded-full text-lg"
                    >
                      Sign In
                    </Button>
                    <Button className="w-full bg-white text-black hover:bg-gray-200 h-12 rounded-full text-lg font-medium border-0">
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
