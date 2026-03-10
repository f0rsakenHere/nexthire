"use client";

import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function ImpersonateButton({ uid }: { uid: string }) {
  const router = useRouter();

  const handleImpersonate = async () => {
    const res = await fetch("/api/admin/impersonate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-email": "tonmoybiswas0288@gmail.com", // test admin
      },
      body: JSON.stringify({
        targetUid: uid,
      }),
    });

    const data = await res.json();

    await signInWithCustomToken(auth, data.customToken);

    router.push("/");
  };

  return (
    <DropdownMenuItem onClick={handleImpersonate} className="text-blue-500">
      Impersonate
    </DropdownMenuItem>
  );
}
