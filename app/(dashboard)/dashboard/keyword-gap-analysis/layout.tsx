import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyword Gap Analysis — NextHire",
  description:
    "Identify missing keywords in your resume and improve your ATS match score.",
};

export default function KeywordGapAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
