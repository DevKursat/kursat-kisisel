export interface PublishingChannel {
  id:
    | "devto"
    | "medium"
    | "hashnode"
    | "dailydev"
    | "indiehackers"
    | "hackernews"
    | "linkedin"
    | "x"
    | "reddit"
    | "bluesky"
    | "rss";
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
    handle: "dev.to/kursatyz",
    href: "https://dev.to/kursatyz",
    focusTr: "Teknik Makaleler & Sistem Mimarileri",
    focusEn: "Technical Articles & Architectures",
    badge: "EN / TR",
    glow: "from-zinc-300/15 via-transparent to-transparent",
  },
  {
    id: "hashnode",
    label: "Hashnode",
    handle: "@kursatyz",
    href: "https://hashnode.com/@kursatyz",
    focusTr: "Canonical Teknik Derin Analizler",
    focusEn: "Canonical Engineering Deep-Dives",
    badge: "EN",
    glow: "from-blue-500/15 via-transparent to-transparent",
  },
  {
    id: "medium",
    label: "Medium",
    handle: "@ykursat054",
    href: "https://medium.com/@ykursat054",
    focusTr: "AI & Ürün Denemeleri (TR/EN Yayınlar)",
    focusEn: "Global AI & Product Essays",
    badge: "TR / EN",
    glow: "from-emerald-400/15 via-transparent to-transparent",
  },
  {
    id: "dailydev",
    label: "daily.dev",
    handle: "@kursatyz",
    href: "https://app.daily.dev/",
    focusTr: "Geliştirici RSS & Keşif Akışı",
    focusEn: "Global Developer Discovery Feed",
    badge: "EN",
    glow: "from-purple-500/15 via-transparent to-transparent",
  },
  {
    id: "indiehackers",
    label: "Indie Hackers",
    handle: "indiehackers.com/kursatyz",
    href: "https://www.indiehackers.com/kursatyz",
    focusTr: "İtibar & Unutma. Ürün Geliştirme Günlükleri",
    focusEn: "Building in Public & SaaS Revenue",
    badge: "EN",
    glow: "from-sky-400/15 via-transparent to-transparent",
  },
  {
    id: "hackernews",
    label: "Hacker News",
    handle: "id=kursatyz",
    href: "https://news.ycombinator.com/user?id=kursatyz",
    focusTr: "Show HN & Mimari Tartışmalar",
    focusEn: "Show HN & Systems Discussions",
    badge: "EN",
    glow: "from-orange-500/15 via-transparent to-transparent",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/kürşatyılmaz",
    href: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
    focusTr: "Mühendislik Notları & Bülten",
    focusEn: "Engineering Notes & Newsletter",
    badge: "TR / EN",
    glow: "from-blue-600/15 via-transparent to-transparent",
  },
  {
    id: "x",
    label: "X (Twitter)",
    handle: "@DevKursat",
    href: "https://x.com/DevKursat",
    focusTr: "Anlık AI Analizleri & Thread'ler",
    focusEn: "Real-Time AI Threads & Notes",
    badge: "TR / EN",
    glow: "from-zinc-400/15 via-transparent to-transparent",
  },
  {
    id: "reddit",
    label: "Reddit",
    handle: "u/Delicious_Character6",
    href: "https://www.reddit.com/user/Delicious_Character6/",
    focusTr: "r/LocalLLaMA & Teknik Topluluk Tartışmaları",
    focusEn: "r/LocalLLaMA & Engineering Discussions",
    badge: "TR / EN",
    glow: "from-orange-500/15 via-transparent to-transparent",
  },
  {
    id: "bluesky",
    label: "Bluesky",
    handle: "@kursatyz.bsky.social",
    href: "https://bsky.app/profile/kursatyz.bsky.social",
    focusTr: "Açık Kaynak & AI Araştırma Akışı",
    focusEn: "Open Source & AI Research Feed",
    badge: "EN",
    glow: "from-cyan-400/15 via-transparent to-transparent",
  },
  {
    id: "rss",
    label: "RSS",
    handle: "/rss.xml",
    href: "/rss.xml",
    focusTr: "Doğrudan 9 Dilli Sindikasyon Akışı",
    focusEn: "Direct 9-Language Syndication Feed",
    badge: "9 DİL",
    glow: "from-amber-400/15 via-transparent to-transparent",
  },
];
