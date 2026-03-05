import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mock Interviewer — NextHire",
  description:
    "Practice tailored interview questions and get AI-powered feedback.",
};

export default function MockInterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
