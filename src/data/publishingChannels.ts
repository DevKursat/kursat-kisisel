export interface PublishingChannel {
  id: "devto" | "medium" | "linkedin" | "x" | "github" | "rss";
  label: string;
  handle: string;
  href: string;
  focusTr: string;
  focusEn: string;
  badge: string;
  glow: string;
}

export const PUBLISHING_CHANNELS: PublishingChannel[] = [
  {
    id: "devto",
    label: "DEV.to",
    handle: "dev.to/devkursat",
    href: "https://dev.to/devkursat",
    focusTr: "Teknik Makaleler & Sistem Mimarileri",
    focusEn: "Technical Articles & Architectures",
    badge: "CODE",
    glow: "from-zinc-300/15 via-transparent to-transparent",
  },
  {
    id: "medium",
    label: "Medium",
    handle: "@ykursat054",
    href: "https://medium.com/@ykursat054",
    focusTr: "Derinlemesine AI & Ürün Denemeleri",
    focusEn: "Global AI & Product Essays",
    badge: "ESSAYS",
    glow: "from-emerald-400/15 via-transparent to-transparent",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/kürşatyılmaz",
    href: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
    focusTr: "Mühendislik Notları & Bülten",
    focusEn: "Engineering Notes & Newsletter",
    badge: "NETWORK",
    glow: "from-blue-500/15 via-transparent to-transparent",
  },
  {
    id: "x",
    label: "X (Twitter)",
    handle: "@DevKursat",
    href: "https://x.com/DevKursat",
    focusTr: "Anlık AI Analizleri & Thread'ler",
    focusEn: "Real-Time AI Threads & Notes",
    badge: "THREADS",
    glow: "from-zinc-400/15 via-transparent to-transparent",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "github.com/DevKursat",
    href: "https://github.com/DevKursat",
    focusTr: "Açık Kaynak & Referans Repolar",
    focusEn: "Open Source & Architecture Repos",
    badge: "OSS",
    glow: "from-white/15 via-transparent to-transparent",
  },
  {
    id: "rss",
    label: "RSS",
    handle: "/rss.xml",
    href: "/rss.xml",
    focusTr: "Doğrudan Sindikasyon Akışı",
    focusEn: "Direct Syndication Feed",
    badge: "FEED",
    glow: "from-amber-400/15 via-transparent to-transparent",
  },
];
