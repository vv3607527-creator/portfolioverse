import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "PortfolioVerse — AI-Powered Portfolio, Resume & Cover Letter Generator",
    template: "%s | PortfolioVerse",
  },
  description:
    "Transform your LinkedIn profile into an AI-generated portfolio website, resume, and cover letters. Premium templates, 3D experiences, and one-click publishing.",
  keywords: [
    "portfolio",
    "AI",
    "LinkedIn",
    "resume",
    "cover letter",
    "web developer",
    "portfolio generator",
    "AI resume builder",
  ],
  openGraph: {
    title: "PortfolioVerse — AI-Powered Portfolio Generator",
    description:
      "Transform your LinkedIn profile into an immersive, AI-generated portfolio website, resume, and cover letters.",
    type: "website",
    siteName: "PortfolioVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "PortfolioVerse — AI-Powered Portfolio Generator",
    description:
      "Transform your LinkedIn profile into an immersive, AI-generated portfolio website, resume, and cover letters.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
