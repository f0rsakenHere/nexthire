import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Resume Scorer — NextHire",
  description:
    "Get an instant ATS score and actionable AI feedback on your resume.",
};

export default function ResumeScorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
