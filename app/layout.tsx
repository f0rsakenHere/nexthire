import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Bricolage_Grotesque,
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "NextHire",
  description: "AI-Powered Interview Preparation Platform",
=======
  title: "NextHire — AI Interview Coach",
  description: "AI-Powered Resume Scoring & Mock Interview Platform",
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased min-h-screen flex flex-col`}
<<<<<<< HEAD
=======
        suppressHydrationWarning
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
      >
        {children}
      </body>
    </html>
  );
}
