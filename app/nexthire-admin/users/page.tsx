"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  MoreHorizontal,
  Shield,
  ShieldOff,
  Trash2,
  User,
  Crown,
  RefreshCw,
  ChevronDown,
  Mail,
  Calendar,
} from "lucide-react";
import ImpersonateButton from "@/components/admin/impersonate-button";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
};

type SortField = "name" | "email" | "role" | "createdAt";

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "user">("all");

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users-list");
      const data = await res.json();
      setUsers(
        data.map((u: any) => ({
          id: u._id ?? u.id ?? "",
          uid: u.uid ?? "",
          name: u.name || u.email?.split("@")[0] || "Unknown",
          email: u.email,
          role: u.role || "user",
          createdAt: u.createdAt,
        })),
      );
    } catch {
      showToast("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function changeRole(userId: string, newRole: string) {
    setActionId(null);
    try {
      const res = await fetch("/api/admin/users-list", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      if (!res.ok) throw new Error();
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
      );
      showToast(`Role updated to ${newRole}`);
    } catch {
      showToast("Failed to update role", "error");
    }
  }

  async function deleteUser(userId: string) {
    setActionId(null);
    if (
      !confirm(
        "Are you sure you want to delete this user? This cannot be undone.",
      )
    )
      return;
    try {
      const res = await fetch("/api/admin/users-list", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
      if (!res.ok) throw new Error();
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      showToast("User deleted");
    } catch {
      showToast("Failed to delete user", "error");
    }
  }

  const filtered = users
    .filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = filterRole === "all" || u.role === filterRole;
      return matchSearch && matchRole;
    })
    .sort((a, b) => {
      const aVal = (a[sortField] ?? "").toString();
      const bVal = (b[sortField] ?? "").toString();
      return sortDir === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="flex flex-col gap-8 relative">
      {toastMsg && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-none border text-sm font-medium shadow-lg ${toastMsg.type === "success" ? "bg-card border-emerald-500/40 text-emerald-600" : "bg-card border-rose-500/40 text-rose-600"}`}
        >
          <span
            className={`size-1.5 rounded-full ${toastMsg.type === "success" ? "bg-emerald-500" : "bg-rose-500"}`}
          />
          {toastMsg.text}
        </div>
      )}

      {/* Header & Filters */}
      <div className="relative flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary/60 mb-2 font-mono">
            Admin · Users
          </p>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            User{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-light">
            {users.length} total users · {adminCount} admin
            {adminCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 px-4 py-2 rounded-none bg-muted border border-border hover:border-primary/30 hover:bg-muted/80 text-foreground text-sm transition-all"
        >
          <RefreshCw className="size-3.5" />
          Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-background border border-border/50 rounded-none pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-none bg-muted/40 border border-border/50">
          {(["all", "admin", "user"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-3 py-1.5 rounded-none text-xs font-medium capitalize transition-all ${filterRole === r ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                <th
                  onClick={() => toggleSort("name")}
                  className="text-left px-5 py-3.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <User className="size-3.5" /> Name{" "}
                    {sortField === "name" && (
                      <ChevronDown
                        className={`size-3 transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("email")}
                  className="text-left px-5 py-3.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <Mail className="size-3.5" /> Email{" "}
                    {sortField === "email" && (
                      <ChevronDown
                        className={`size-3 transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("role")}
                  className="text-left px-5 py-3.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    Role{" "}
                    {sortField === "role" && (
                      <ChevronDown
                        className={`size-3 transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("createdAt")}
                  className="text-left px-5 py-3.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground transition-colors whitespace-nowrap hidden md:table-cell"
                >
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" /> Joined{" "}
                    {sortField === "createdAt" && (
                      <ChevronDown
                        className={`size-3 transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
                <th className="text-right px-5 py-3.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <div className="size-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-muted-foreground"
                  >
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/40 transition-colors group"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-foreground">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground font-mono text-xs">
                      {user.email}
                    </td>
                    <td className="px-5 py-3.5">
                      {user.role === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-none">
                          <Crown className="size-3" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground bg-muted border border-border px-2 py-1 rounded-none">
                          <User className="size-3" /> User
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground text-xs hidden md:table-cell font-mono">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setActionId(actionId === user.id ? null : user.id)
                          }
                          className="size-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-none transition-all"
                        >
                          <MoreHorizontal className="size-4" />
                        </button>

                        {actionId === user.id && (
                          <div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-none bg-card border border-border/50 shadow-lg py-1 overflow-hidden">
                            {user.role !== "admin" ? (
                              <button
                                onClick={() => changeRole(user.id, "admin")}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary hover:bg-primary/5 transition-colors"
                              >
                                <Shield className="size-3.5" /> Make Admin
                              </button>
                            ) : (
                              <button
                                onClick={() => changeRole(user.id, "user")}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                              >
                                <ShieldOff className="size-3.5" /> Revoke Admin
                              </button>
                            )}
                            <ImpersonateButton uid={user.id} />
                            <div className="my-1 h-px bg-border" />
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/5 transition-colors"
                            >
                              <Trash2 className="size-3.5" /> Delete User
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
