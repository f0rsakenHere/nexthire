"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";

type Impersonation = {
  adminUid: string | null;
  actingAsUid: string | null;
};

type AuthContextType = {
  impersonation: Impersonation;
  startImpersonation: (uid: string) => void;
  stopImpersonation: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [impersonation, setImpersonation] = useState<Impersonation>({
    adminUid: null,
    actingAsUid: null,
  });
  useEffect(() => {
    const saved = localStorage.getItem("impersonation");

    if (saved) {
      const parsed = JSON.parse(saved) as Impersonation;
      setImpersonation(parsed);
    }
  }, []);

  const startImpersonation = (targetUid: string) => {
    const adminUid = auth.currentUser?.uid ?? null;

    const data: Impersonation = {
      adminUid,
      actingAsUid: targetUid,
    };

    localStorage.setItem("impersonation", JSON.stringify(data));
    setImpersonation(data);
  };

  const stopImpersonation = () => {
    localStorage.removeItem("impersonation");

    setImpersonation({
      adminUid: null,
      actingAsUid: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        impersonation,
        startImpersonation,
        stopImpersonation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};
