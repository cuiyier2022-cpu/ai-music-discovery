import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoundWave.ai — Discover AI-Generated Music",
  description:
    "Explore thousands of AI-generated music tracks across 48 genres. Free streaming, royalty-free, created by neural networks.",
  keywords: [
    "AI music",
    "AI generated songs",
    "artificial intelligence music",
    "royalty free music",
    "electronic music",
    "ambient music",
    "synthwave",
    "music discovery",
  ],
  openGraph: {
    title: "SoundWave.ai — AI Music Discovery Platform",
    description: "Discover unique AI-generated music across dozens of genres. Stream free, no sign-up required.",
    type: "website",
    locale: "en_US",
    siteName: "SoundWave.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoundWave.ai — AI Music Discovery",
    description: "Explore thousands of AI-generated tracks. Free streaming, royalty-free.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
