# User Impersonation Feature Plan

## Overview
This plan outlines how to securely implement a "User Impersonation" feature in NextHire. Since your platform uses Firebase Authentication, we can securely log an admin into any user's account using **Firebase Custom Tokens** generated via the Firebase Admin SDK. 

When the admin clicks "Impersonate", the backend will generate a custom token for the target user, and the frontend will use this token to immediately sign the admin in as that user.

---

## Step 1: Secure the Backend (Create an Impersonation API Route)
You need a new API endpoint that accepts a user's ID, verifies the requester is an admin, and generates a Firebase Custom Token.

1. **Create File**: `app/api/admin/impersonate/route.ts`
2. **Logic needed**:
   - Extract the requester's identity (e.g., using their email from `x-user-email` or ideally reading the `token` from cookies and using `admin.auth().verifyIdToken()`).
   - Query MongoDB: Ensure the requester actually has `role: "admin"` in the `users` collection.
   - If authorized, query MongoDB again to find the **target user's** `uid`.
   - Use `firebase-admin` to generate a custom token: `const customToken = await admin.auth().createCustomToken(targetUser.uid);`
   - Return `{ customToken }` to the frontend.

*Note: You already have `firebase-admin` installed and configured in [lib/firebase-admin.ts](file:///d:/Codes/nexthire/lib/firebase-admin.ts), so you can just import `admin` from there.*

---

## Step 2: Prepare Frontend Data
To impersonate a user, the admin interface needs to know the target user's Firebase `uid` (which is stored in your MongoDB `users` collection alongside `_id`).

1. **Modify**: [app/nexthire-admin/users/page.tsx](file:///d:/Codes/nexthire/app/nexthire-admin/users/page.tsx)
2. **Update the [UserRecord](file:///d:/Codes/nexthire/app/nexthire-admin/users/page.tsx#18-25) type**:
   ```typescript
   type UserRecord = {
     id: string;   // MongoDB _id
     uid: string;  // Firebase uid
     name: string;
     email: string;
     role: string;
     createdAt?: string;
   };
   ```
3. **Update the `fetchUsers` mapping logic**:
   When mapping over the fetched `data`, explicitly include the `uid`:
   ```typescript
   id: u._id ?? u.id ?? "",
   uid: u.uid ?? "", // Add this line!
   ```

---

## Step 3: UI & The "Impersonate" Action
We need an action button inside the user management table.

1. **Modify**: [app/nexthire-admin/users/page.tsx](file:///d:/Codes/nexthire/app/nexthire-admin/users/page.tsx)
2. Inside the "Actions" dropdown menu (where "Make Admin" and "Delete User" live), add a new button:
   ```tsx
   import { LogIn } from "lucide-react"; // Import a suitable icon
   
   // ... inside the dropdown menu for a user:
   <button
     onClick={() => impersonateUser(user.uid)}
     className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-500 hover:bg-blue-500/5 transition-colors"
   >
     <LogIn className="size-3.5" />
     Impersonate
   </button>
   ```

---

## Step 4: The Impersonation Logic Hook
This connects the button to the API and signs the admin in as the target user.

1. **Modify**: [app/nexthire-admin/users/page.tsx](file:///d:/Codes/nexthire/app/nexthire-admin/users/page.tsx)
2. **Add imports**:
   ```typescript
   import { signInWithCustomToken } from "firebase/auth";
   import { auth } from "@/app/firebase/config";
   import { useRouter } from "next/navigation";
   ```
3. **Add the `impersonateUser` function**:
   ```typescript
   const router = useRouter();

   async function impersonateUser(targetUid: string) {
     try {
       showToast("Initiating impersonation...", "success");
       
       // 1. Request custom token from backend
       const res = await fetch("/api/admin/impersonate", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ targetUid }),
       });
       
       if (!res.ok) throw new Error("Failed to get authorization token");
       
       const { customToken } = await res.json();
       
       // 2. Sign in with the custom token
       const userCredential = await signInWithCustomToken(auth, customToken);
       
       // 3. Set standard NextHire cookies & localStorage
       document.cookie = `token=${userCredential.user.uid}; path=/`;
       
       // Important: Mark this session as an impersonation
       localStorage.setItem("isImpersonating", "true");
       
       // 4. Redirect to the main dashboard as the user
       router.push("/dashboard");
     } catch (err) {
       console.error(err);
       showToast("Failed to impersonate user", "error");
     }
   }
   ```

---

## Step 5: (Highly Recommended) "End Impersonation" Banner
If an admin is impersonating a user, they should know it, so they don't accidentally do permanent damage or be confused. They also need an easy way to escape.

1. **Modify**: [app/(dashboard)/layout.tsx](file:///d:/Codes/nexthire/app/%28dashboard%29/layout.tsx) (or inside your [NavUser](file:///d:/Codes/nexthire/components/nav-user.tsx#30-145) / [AppSidebar](file:///d:/Codes/nexthire/components/app-sidebar.tsx#106-161) components).
2. **Check the localStorage flag**:
   ```tsx
   const [isImpersonating, setIsImpersonating] = useState(false);
   
   useEffect(() => {
     if (localStorage.getItem("isImpersonating") === "true") {
       setIsImpersonating(true);
     }
   }, []);
   ```
3. **Render a Banner**:
   If `isImpersonating` is true, render a red/orange fixed banner at the very top of the screen:
   ```tsx
   {isImpersonating && (
      <div className="bg-orange-500/20 text-orange-400 text-sm font-semibold p-2 text-center flex items-center justify-center gap-4 z-50 relative border-b border-orange-500/50">
        ⚠️ You are currently impersonating a user.
        <button 
           onClick={endImpersonation}
           className="underline hover:text-orange-300"
        >
          End Session
        </button>
      </div>
   )}
   ```
4. **Implement `endImpersonation`**:
   ```tsx
   const endImpersonation = async () => {
      localStorage.removeItem("isImpersonating");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // clear cookie
      await auth.signOut();
      window.location.href = "/sign-in"; // Redirect to login page to log back in as Admin
   };
   ```

## Security Best Practices
- Do not let admins impersonate *other* admins. Add a check `if (targetUser.role === 'admin') return ERROR;` in your endpoint.
- Always log impersonate actions in your database or logs, so you know exactly *when* an admin assumes control of an account for support context/audit trails.
