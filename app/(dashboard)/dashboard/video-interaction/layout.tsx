import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Interview — NextHire",
  description:
    "Practice real-time video interviews with AI evaluation of your spoken answers.",
};

export default function VideoInteractionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
