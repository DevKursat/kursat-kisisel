import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL } from "@/data/blogIndex";
import ToolsHubClient from "@/components/ToolsHubClient";

export const metadata: Metadata = {
  title:
    "Ücretsiz AI Mühendislik Araçları: LLM GPU/VRAM Başabaş & Ajan Güvenilirlik Hesaplayıcı — Kürşat Yılmaz",
  description:
    "Kapalı LLM API faturalarını bare-metal vLLM/GPU maliyetiyle kıyaslayın, KV-cache VRAM ihtiyacını ölçün ve çoklu ajan (p^N) çöküş olasılığını simüle edin. Sıfır reklam, %100 deterministik hesap.",
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools`,
    title:
      "AI Engineering Lab: LLM API vs. Bare-Metal GPU Break-Even & Agent Simulator",
    description:
      "Free interactive calculators for LLM VRAM sizing, serverless API vs. dedicated GPU break-even, multi-agent p^N error compounding, and 24-point production readiness.",
    siteName: "Kürşat Yılmaz",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Engineering Lab: LLM API vs. Bare-Metal GPU Break-Even & Agent Simulator",
    description:
      "Calculate your exact LLM API vs. vLLM GPU break-even point, KV-cache VRAM budget, and p^N agent failure rate.",
    creator: "@DevKursat",
  },
};

const toolsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kürşat Yılmaz — Production AI & Bare-Metal Engineering Calculators",
  url: `${SITE_URL}/tools`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Kürşat Yılmaz",
    url: SITE_URL,
  },
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#000000]" />}>
        <ToolsHubClient />
      </Suspense>
    </main>
  );
}
