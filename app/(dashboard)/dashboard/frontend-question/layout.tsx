import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Frontend Interview Questions — NextHire",
  description:
    "Browse curated frontend developer interview questions with detailed answers.",
};

export default function FrontendQuestionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
