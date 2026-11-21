import type { Metadata } from "next";
import SponsorExperience from "@/components/sponsor/SponsorExperience";

export const metadata: Metadata = {
  title: "Sponsorluk & Partnerlik — Kürşat Yılmaz",
  description:
    "127.4K+ tekil erişim, %78 CTO/kurucu kitlesi, 4 dilde teknik benchmark yayınları. Nakit sponsorluk veya API / Cloud GPU kredi ortaklığı.",
  alternates: {
    canonical: "https://kursat.itibar.app/sponsor",
  },
  openGraph: {
    type: "website",
    url: "https://kursat.itibar.app/sponsor",
    title: "Sponsorluk & Partnerlik — Kürşat Yılmaz",
    description:
      "127.4K+ tekil erişim, %78 CTO/kurucu kitlesi, 4 dilde teknik benchmark yayınları. Nakit sponsorluk veya API / Cloud GPU kredi ortaklığı.",
    siteName: "Kürşat Yılmaz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1920,
        height: 1080,
        alt: "Kürşat Yılmaz — Sponsorluk & Partnerlik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsorluk & Partnerlik — Kürşat Yılmaz",
    description:
      "127.4K+ tekil erişim, %78 CTO/kurucu kitlesi, 4 dilde teknik benchmark yayınları. Nakit sponsorluk veya API / Cloud GPU kredi ortaklığı.",
    images: ["/og-image.jpg"],
    creator: "@DevKursat",
  },
};

export default function SponsorPage() {
  return <SponsorExperience />;
}
