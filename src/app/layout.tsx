import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/context/LanguageContext";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kursatyilmaz.dev"),
  title: "Kürşat Yılmaz — AI Product Engineer",
  description:
    "Official portfolio of Kürşat Yılmaz. Architecting autonomous multi-agent systems, multimodal vision pipelines, and production-grade intelligent software.",
  keywords: [
    "Kürşat Yılmaz",
    "Kursat Yilmaz",
    "AI Product Engineer",
    "Multi-Agent Systems",
    "Autonomous Agents",
    "LangGraph",
    "Next.js",
    "TypeScript",
    "Python",
    "Full-Stack AI",
    "GEO",
    "AEO",
  ],
  authors: [{ name: "Kürşat Yılmaz", url: "https://kursatyilmaz.dev" }],
  creator: "Kürşat Yılmaz",
  publisher: "Kürşat Yılmaz",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kursatyilmaz.dev",
    title: "Kürşat Yılmaz — AI Product Engineer",
    description:
      "Architecting autonomous systems, multi-agent frameworks, and high-performance intelligent interfaces at the edge of code and reality.",
    siteName: "Kürşat Yılmaz Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1920,
        height: 1080,
        alt: "Kürşat Yılmaz — AI Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kürşat Yılmaz — AI Product Engineer",
    description:
      "Architecting autonomous systems, multi-agent frameworks, and high-performance intelligent interfaces.",
    images: ["/og-image.jpg"],
    creator: "@kursat_yilmaz",
  },
  alternates: {
    canonical: "https://kursatyilmaz.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${geistMono.variable} dark`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,700;0,800;0,900;1,800&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#050505] text-zinc-100 antialiased selection:bg-white selection:text-black font-sans">
        <JsonLd />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
