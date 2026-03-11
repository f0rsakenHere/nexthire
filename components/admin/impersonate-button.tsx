"use client";

import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { UserCheck } from "lucide-react"; // <-- import icon

export default function ImpersonateButton({ uid }: { uid: string }) {
  const router = useRouter();

  async function handleImpersonate() {
    try {
      const adminEmail = "tonmoybiswas0288@gmail.com";

      const res = await fetch("/api/admin/impersonate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": adminEmail,
        },
        body: JSON.stringify({ targetUid: uid }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || "Impersonation request failed");
      }

      const { customToken } = await res.json();
      await signInWithCustomToken(auth, customToken);
      alert("Impersonation successful — now logged in as the target user.");
      router.push("/");
    } catch (err: any) {
      console.error("Impersonation error:", err);
      alert("Impersonation failed: " + (err.message || err));
    }
  }

  return (
    <button
      onClick={handleImpersonate}
      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
    >
      <UserCheck className="size-4" /> {/* <-- icon */}
      Impersonate
    </button>
  );
}
