import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReadMeRoast — Your README is probably bad. Let's find out. 🔥",
  description:
    "Developer tool that analyzes public GitHub READMEs using Gemma open-weight AI, provides a score and hilarious roast, identifies documentation blindspots, and generates an improved README in 1-click.",
  keywords: [
    "ReadMeRoast",
    "README generator",
    "GitHub",
    "developer tools",
    "Gemma",
    "Open Source AI",
    "documentation",
    "Hacktoberfest",
  ],
  authors: [{ name: "ReadMeRoast Team" }],
  openGraph: {
    title: "ReadMeRoast — Your README is probably bad. Let's find out. 🔥",
    description: "Analyze, roast, and fix your GitHub repository README with Gemma open-weight AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} min-h-screen bg-[#090a0f] text-[#f4f4f5] antialiased flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
