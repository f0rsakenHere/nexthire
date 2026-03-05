import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frontend Interview Questions — NextHire",
  description:
    "Browse curated frontend developer interview questions with detailed answers.",
};

export default function FrontendQuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
