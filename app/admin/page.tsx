import { redirect } from "next/navigation";

// Redirect /admin → /dashboard
export default function OldAdminRedirect() {
  redirect("/dashboard");
}
