import type { Metadata } from "next";
import SponsorExperience from "@/components/sponsor/SponsorExperience";

export const metadata: Metadata = {
  title: "Sponsor & Partner — Kürşat Yılmaz | 1M+ Tech Reach",
  description:
    "1M+ organic reach, 127.4K+ single LinkedIn post peak, 78% CTOs & senior builders. 4-language engineering teardowns via cash sponsorship or API / Cloud GPU credits.",
  alternates: {
    canonical: "https://kursat.itibar.app/sponsor",
  },
  openGraph: {
    type: "website",
    url: "https://kursat.itibar.app/sponsor",
    title: "Sponsor & Partner — Kürşat Yılmaz | 1M+ Tech Reach",
    description:
      "1M+ organic reach, 127.4K+ single LinkedIn post peak, 78% CTOs & senior builders. 4-language engineering teardowns via cash sponsorship or API / Cloud GPU credits.",
    siteName: "Kürşat Yılmaz",
    images: [
      {
        url: "/api/og?mode=sponsor",
        width: 1200,
        height: 630,
        alt: "Kürşat Yılmaz — Sponsor & Partner Media Kit (1M+ Organic Reach)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsor & Partner — Kürşat Yılmaz | 1M+ Tech Reach",
    description:
      "1M+ organic reach, 127.4K+ single LinkedIn post peak, 78% CTOs & senior builders. 4-language engineering teardowns via cash sponsorship or API / Cloud GPU credits.",
    images: ["/api/og?mode=sponsor"],
    creator: "@DevKursat",
  },
};

export default function SponsorPage() {
  return <SponsorExperience />;
}
