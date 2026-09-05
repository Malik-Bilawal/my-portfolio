import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Bilawal",
  jobTitle: "Full Stack Developer",
  url: "https://bilawal.dev",
  email: "its.bilawal33@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [
    "https://github.com/malik-bilawal",
    "https://linkedin.com/in/malik-bilawal-/",
  ],
  knowsAbout: [
    "Laravel",
    "Node.js",
    "React",
    "Next.js",
    "TypeScript",
    "PHP",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Muhammad Bilawal | Full Stack Developer",
    template: "%s | Muhammad Bilawal",
  },
  description:
    "Full Stack Developer specializing in Laravel, Node.js, React, and Next.js. Building robust, scalable web applications with 3+ years of experience.",
  keywords: [
    "Muhammad Bilawal",
    "Full Stack Developer",
    "Laravel Developer",
    "Node.js Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Developer",
    "PHP Developer",
    "Backend Developer",
    "Frontend Developer",
    "Portfolio",
    "Karachi",
    "Pakistan",
  ],
  authors: [{ name: "Muhammad Bilawal" }],
  creator: "Muhammad Bilawal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadbilawal.dev",
    siteName: "Muhammad Bilawal Portfolio",
    title: "Muhammad Bilawal | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Laravel, Node.js, React, and Next.js. Building robust, scalable web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Bilawal | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Laravel, Node.js, React, and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://muhammadbilawal.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="noise-overlay">{children}</body>
      <Analytics />
    </html>
  );
}

