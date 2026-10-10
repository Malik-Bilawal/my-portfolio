import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { SITE_URL } from "@/lib/site";
import { faqs } from "@/lib/faq";
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
  url: SITE_URL,
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammad Bilawal | Full Stack Developer",
    template: "%s | Muhammad Bilawal",
  },
  description:
    "Full Stack Developer engineering with precision — Laravel, Node.js, React, Next.js. Robust, scalable web apps shipped with 2+ years of production experience.",
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
    url: SITE_URL,
    siteName: "Muhammad Bilawal Portfolio",
    title: "Muhammad Bilawal | Full Stack Developer",
    description:
      "Full Stack Developer engineering with precision — Laravel, Node.js, React, Next.js. Robust, scalable web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Bilawal | Full Stack Developer",
    description:
      "Full Stack Developer engineering with precision — Laravel, Node.js, React, Next.js.",
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
    canonical: "/",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Inline JSON-LD (not next/script) so it ships in static HTML */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

