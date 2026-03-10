import { redirect } from "next/navigation";

// Redirect /admin → /nexthire-admin
export default function OldAdminRedirect() {
  redirect("/nexthire-admin");
}
