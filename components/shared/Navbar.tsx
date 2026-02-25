"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, LogOut } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

export default function Navbar() {
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-50">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="h-3 w-3 rounded-full bg-white/90" />
            </div>
            <span className="text-xl font-medium tracking-tight text-foreground hover:opacity-90 transition-opacity">
              NextHire
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:absolute md:inset-x-0 md:flex md:justify-center items-center space-x-8 pointer-events-none">
            <div className="pointer-events-auto flex items-center space-x-1 bg-muted/50 backdrop-blur-md rounded-full px-2 py-2 border border-border">
              {[
                { label: "Home", href: "/" },
                { label: "Features", href: "/features" },
                { label: "FAQs", href: "/faqs" },
                { label: "About", href: "/about" },
              ].map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      isActive
                        ? "text-primary-foreground bg-primary shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4 z-50">
            <div className="h-4 w-px bg-border mx-1" />
            {!loading &&
              (user ? (
                <div className="flex items-center gap-5">
                  <span className="text-sm font-medium text-foreground">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/dashboard"
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center pointer-events-auto"
                      title="Dashboard"
                    >
                      <LayoutDashboard size={20} strokeWidth={2} />
                    </Link>
                    <button
                      onClick={() => auth.signOut()}
                      className="text-muted-foreground hover:text-red-500 transition-colors flex items-center justify-center pointer-events-auto"
                      title="Log Out"
                    >
                      <LogOut size={20} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button
                      variant="outline"
                      className="cursor-pointer border-border bg-transparent text-foreground hover:bg-muted rounded-full px-6 h-10 transition-all duration-300"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="cursor-pointer bg-primary text-primary-foreground hover:opacity-90 rounded-full px-6 h-10 font-medium transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] border-0">
                      Get Started
                    </Button>
                  </Link>
                </>
              ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2 z-50">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background/95 border-border text-foreground w-full sm:max-w-md backdrop-blur-2xl"
              >
                <div className="flex flex-col gap-8 mt-10">
                  <div className="flex flex-col gap-4">
                    {[
                      { label: "Home", href: "/" },
                      { label: "Features", href: "/features" },
                      { label: "FAQs", href: "/faqs" },
                      { label: "About", href: "/about" },
                    ].map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={cn(
                            "text-2xl font-medium transition-colors",
                            isActive
                              ? "text-primary pl-4 border-l-2 border-primary"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="h-px bg-border w-full" />
                  <div className="flex flex-col gap-4">
                    {!loading &&
                      (user ? (
                        <>
                          <div className="flex items-center gap-3 px-2 py-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                              {(user.displayName ||
                                user.email ||
                                "U")[0].toUpperCase()}
                            </div>
                            <span className="text-lg font-medium">
                              {user.displayName || user.email?.split("@")[0]}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Link href="/dashboard" className="flex-1">
                              <Button
                                variant="outline"
                                className="cursor-pointer w-full border-border text-foreground hover:bg-muted h-12 rounded-xl text-base font-medium flex items-center gap-2"
                              >
                                <LayoutDashboard size={18} />
                                Dashboard
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              onClick={() => auth.signOut()}
                              className="cursor-pointer border-border text-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200 h-12 w-12 rounded-xl flex items-center justify-center p-0 transition-colors"
                              title="Log Out"
                            >
                              <LogOut size={18} />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link href="/sign-in" className="w-full">
                            <Button
                              variant="outline"
                              className="cursor-pointer w-full border-border text-foreground hover:bg-muted h-12 rounded-full text-lg"
                            >
                              Sign In
                            </Button>
                          </Link>
                          <Link href="/sign-up" className="w-full">
                            <Button className="cursor-pointer w-full bg-primary text-primary-foreground hover:opacity-90 h-12 rounded-full text-lg font-medium border-0">
                              Get Started
                            </Button>
                          </Link>
                        </>
                      ))}
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
