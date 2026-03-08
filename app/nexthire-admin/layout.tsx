"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Shield,
  Home,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";

const navItems = [
  { name: "Overview", href: "/nexthire-admin", icon: LayoutDashboard },
  { name: "Users", href: "/nexthire-admin/users", icon: Users },
  { name: "Analytics", href: "/nexthire-admin/analytics", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/sign-in");
        return;
      }
      try {
        const res = await fetch("/api/admin/check", {
          headers: { "x-user-email": firebaseUser.email ?? "" },
        });
        const data = await res.json();
        if (!data.isAdmin) {
          router.push("/dashboard");
          return;
        }
        setUser({
          name:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "Admin",
          email: firebaseUser.email ?? "",
        });
      } catch {
        router.push("/dashboard");
        return;
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-sm text-muted-foreground font-mono tracking-widest uppercase">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-border/50 bg-background sticky top-0 h-screen">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-sm shadow-primary/30">
              <Shield className="size-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-none">
                Admin
              </p>
              <p className="text-[10px] text-primary/60 font-mono uppercase tracking-widest mt-0.5">
                Control Panel
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium transition-all group",
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60 border-l-2 border-transparent",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.name}
                {isActive && (
                  <ChevronRight className="size-3 ml-auto text-primary/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-border/50 flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all border-l-2 border-transparent"
          >
            <Home className="size-4 shrink-0" />
            Back to App
          </Link>
          <button
            onClick={() => signOut(auth).then(() => router.push("/sign-in"))}
            className="flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all w-full text-left border-l-2 border-transparent"
          >
            <LogOut className="size-4 shrink-0" />
            Sign Out
          </button>
        </div>

        {/* Admin user pill */}
        {user && (
          <div className="px-3 pb-4">
            <div className="rounded-none bg-card/50 border border-border/50 p-3 flex items-center gap-3">
              <div className="size-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
              <span className="ml-auto shrink-0 text-[9px] font-bold font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-none">
                Admin
              </span>
            </div>
          </div>
        )}
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {navItems.find((n) => n.href === pathname)?.name ?? "Admin"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground/50 font-mono hidden sm:block">
              nexthire-admin
            </span>
            <div className="h-3 w-px bg-border" />
            <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-none">
              Restricted
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
