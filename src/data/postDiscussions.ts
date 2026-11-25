import opsSnapshot from "@/data/opsSnapshot.json";
import type { BlogLang, BlogPostItem } from "@/data/blogIndex";

export interface DiscussionChannelLink {
  id: "x" | "linkedin" | "devto" | "hashnode" | "medium" | "bluesky" | "reddit";
  label: string;
  href: string;
  isDirectThread: boolean;
  badge: string;
}

export interface PostDiscussionData {
  slug: string;
  impressions: number | null;
  commentsCount: number | null;
  links: DiscussionChannelLink[];
  primarySocialHref: string;
  primaryDevHref: string;
}

export interface DilemmaPollSpec {
  question: string;
  optionA: string;
  optionB: string;
  seedA: number;
  seedB: number;
}

function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function isSpecificPostUrl(platform: string, url: string | null | undefined): url is string {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed.startsWith("http")) return false;

  switch (platform) {
    case "x":
      return /\/status\/\d+/i.test(trimmed);
    case "linkedin":
      return /urn:li:(activity|ugcPost|share):|\/posts\//i.test(trimmed);
    case "devto":
      return /dev\.to\/[^/]+\/[^/]+/i.test(trimmed);
    case "hashnode":
      return /hashnode\.dev\/|hashnode\.com\/@[^/]+\/.+/i.test(trimmed);
    case "medium":
      return /medium\.com\/@[^/]+\/.+|medium\.com\/[^/]+\/.+/i.test(trimmed);
    case "bluesky":
      return /bsky\.app\/profile\/[^/]+\/post\//i.test(trimmed);
    case "reddit":
      return /reddit\.com\/r\/[^/]+\/comments\//i.test(trimmed);
    default:
      return false;
  }
}

export function getPostDiscussionData(slug: string): PostDiscussionData {
  const queueItems = Array.isArray(opsSnapshot.queue) ? opsSnapshot.queue : [];
  const latest = opsSnapshot.latestPublish;

  const matchedQueue =
    (latest && latest.blogSlug === slug ? latest : null) ||
    queueItems.find((item) => item.blogSlug === slug) ||
    queueItems.find(
      (item) =>
        typeof item.publishedUrls?.blog === "string" &&
        item.publishedUrls.blog.includes(slug)
    );

  const perfRow = Array.isArray(opsSnapshot.performanceLog)
    ? opsSnapshot.performanceLog.find((r) => (r as { slug?: string }).slug === slug)
    : undefined;

  const urls = (matchedQueue?.publishedUrls ?? {}) as Record<string, string | null | undefined>;

  const xDirect = isSpecificPostUrl("x", urls.x) ? urls.x : null;
  const liDirect = isSpecificPostUrl("linkedin", urls.linkedin) ? urls.linkedin : null;
  const devtoDirect = isSpecificPostUrl("devto", urls.devto)
    ? `${urls.devto.replace(/#.*$/, "")}#comments`
    : null;
  const hashnodeDirect = isSpecificPostUrl("hashnode", urls.hashnode) ? urls.hashnode : null;
  const mediumDirect = isSpecificPostUrl("medium", urls.medium) ? urls.medium : null;
  const blueskyDirect = isSpecificPostUrl("bluesky", urls.bluesky) ? urls.bluesky : null;
  const redditDirect = isSpecificPostUrl("reddit", urls.reddit) ? urls.reddit : null;

  const links: DiscussionChannelLink[] = [
    {
      id: "linkedin",
      label: "LinkedIn",
      href:
        liDirect ??
        "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/recent-activity/all/",
      isDirectThread: Boolean(liDirect),
      badge: liDirect ? "POST" : "AKIŞ",
    },
    {
      id: "x",
      label: "X (@DevKursat)",
      href: xDirect ?? "https://x.com/DevKursat",
      isDirectThread: Boolean(xDirect),
      badge: xDirect ? "THREAD" : "FEED",
    },
    {
      id: "devto",
      label: "DEV.to",
      href: devtoDirect ?? "https://dev.to/kursatyz",
      isDirectThread: Boolean(devtoDirect),
      badge: devtoDirect ? "COMMENTS" : "DEV",
    },
  ];

  if (redditDirect) {
    links.push({
      id: "reddit",
      label: "Reddit",
      href: redditDirect,
      isDirectThread: true,
      badge: "THREAD",
    });
  }

  links.push(
    {
      id: "hashnode",
      label: "Hashnode",
      href: hashnodeDirect ?? "https://hashnode.com/@kursatyz",
      isDirectThread: Boolean(hashnodeDirect),
      badge: hashnodeDirect ? "ARTICLE" : "CANONICAL",
    },
    {
      id: "bluesky",
      label: "Bluesky",
      href: blueskyDirect ?? "https://bsky.app/profile/kursatyz.bsky.social",
      isDirectThread: Boolean(blueskyDirect),
      badge: blueskyDirect ? "THREAD" : "BSKY",
    },
    {
      id: "medium",
      label: "Medium",
      href: mediumDirect ?? "https://medium.com/@ykursat054",
      isDirectThread: Boolean(mediumDirect),
      badge: mediumDirect ? "STORY" : "ARCHIVE",
    }
  );

  return {
    slug,
    impressions: typeof perfRow?.impressions === "number" ? perfRow.impressions : null,
    commentsCount: typeof perfRow?.comments === "number" ? perfRow.comments : null,
    links,
    primarySocialHref:
      xDirect ??
      liDirect ??
      "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/recent-activity/all/",
    primaryDevHref: devtoDirect ?? "https://dev.to/kursatyz",
  };
}

const CATEGORY_DILEMMAS: Record<
  BlogPostItem["category"],
  Record<BlogLang, { question: string; optionA: string; optionB: string }>
> = {
  mimari: {
    tr: {
      question: "Üretim mimarisinde kritik kesintilere karşı senin gerçek tercihin hangisi?",
      optionA: "Çoklu bölge / bare-metal fallback kurar, bulut SLA masalına güvenmem",
      optionB: "Yönetilen bulut servisinde kalır, mühendislik eforunu ürüne harcarım",
    },
    en: {
      question: "When critical cloud dependencies fail in production, which camp are you in?",
      optionA: "Own a bare-metal / multi-provider fallback—cloud SLAs are marketing fiction",
      optionB: "Stay on managed cloud—DevOps overhead costs more than rare outages",
    },
    de: {
      question: "Welche Architekturstrategie wählen Sie gegen kritische Cloud-Ausfälle?",
      optionA: "Eigener Bare-Metal-/Multi-Cloud-Fallback — SLAs sind nur Marketing",
      optionB: "Managed Cloud beibehalten — Fokus bleibt auf Produktgeschwindigkeit",
    },
    es: {
      question: "Ante caídas críticas en la nube en producción, ¿de qué lado estás?",
      optionA: "Fallback bare-metal / multi-región propio — el SLA es puro marketing",
      optionB: "Seguir en nube gestionada — mantener infraestructura propia cuesta más",
    },
  },
  donanim: {
    tr: {
      question: "Aylık AI çıkarım (inference) faturası büyüdüğünde hangi tarafa geçersin?",
      optionA: "Kendi GPU / vLLM kümemi kurar, birim maliyeti silikonda ezerim",
      optionB: "Donanım amortismanına girmem, kapalı API esnekliğine para öderim",
    },
    en: {
      question: "Once monthly AI inference spend scales up, what is your move?",
      optionA: "Deploy dedicated GPUs + vLLM—crush $/token at the silicon layer",
      optionB: "Keep paying serverless APIs—avoid hardware capex and ops burden",
    },
    de: {
      question: "Wenn die monatlichen KI-Inferenzkosten steigen: Welchen Weg gehen Sie?",
      optionA: "Eigene GPUs + vLLM betreiben und $/Token drastisch senken",
      optionB: "Serverless-APIs weiterzahlen und Hardware-Aufwand vermeiden",
    },
    es: {
      question: "Cuando la factura mensual de inferencia IA escala, ¿qué decisión tomas?",
      optionA: "Desplegar GPUs propias + vLLM y desplomar el costo por token",
      optionB: "Pagar APIs gestionadas y evitar la carga operativa del hardware",
    },
  },
  llm: {
    tr: {
      question: "Üretimde model seçimi yaparken senin kırmızı çizgin hangisi?",
      optionA: "Açık ağırlık (Open-Weights) + tam KV-cache ve veri egemenliği",
      optionB: "En güçlü kapalı frontier API — hız ve akıl her şeyden önce gelir",
    },
    en: {
      question: "For production LLM workloads, where do you draw the hard line?",
      optionA: "Open-weights inside our VPC—full cost, latency & data sovereignty",
      optionB: "Closed frontier APIs—maximum capability beats self-hosting",
    },
    de: {
      question: "Wo ziehen Sie bei produktiven LLM-Systemen die klare Grenze?",
      optionA: "Open-Weights in eigener VPC — volle Daten- und Kostenkontrolle",
      optionB: "Geschlossene Frontier-APIs — maximale Modellleistung zählt",
    },
    es: {
      question: "En cargas LLM de producción, ¿cuál es tu línea roja innegociable?",
      optionA: "Modelos de pesos abiertos en VPC propia — soberanía total",
      optionB: "APIs cerradas de frontera — máxima capacidad ante todo",
    },
  },
  guvenlik: {
    tr: {
      question: "Otonom AI ajanlarını üretim sistemlerine bağlarken senin yaklaşımın ne?",
      optionA: "Sıfır güven: İzole sandbox, katı RLS ve dış ağ (egress) kilidi olmadan çıkmam",
      optionB: "Hızlı iterasyon: İzinleri daraltır ama tam izolasyon için lansmanı bekletmem",
    },
    en: {
      question: "How do you ship autonomous AI agents with tool access to production?",
      optionA: "Strict zero-trust: Sandboxed runtime, hard RLS & egress allowlists first",
      optionB: "Ship fast with scoped permissions—harden isolation as traffic grows",
    },
    de: {
      question: "Wie bringen Sie autonome KI-Agenten mit Tool-Zugriff in Produktion?",
      optionA: "Striktes Zero-Trust: Sandbox, hartes RLS & Egress-Allowlists vorab",
      optionB: "Schneller Launch mit begrenzten Rechten, später nachhärten",
    },
    es: {
      question: "¿Cómo despliegas agentes IA autónomos con acceso a herramientas en producción?",
      optionA: "Zero-trust estricto: Sandbox aislado, RLS duro y lista blanca de red",
      optionB: "Lanzar rápido con permisos acotados e iterar el aislamiento después",
    },
  },
};

export function getPostDilemmaPoll(
  slug: string,
  category: BlogPostItem["category"],
  lang: BlogLang
): DilemmaPollSpec {
  const h = hashSlug(slug);
  const seedA = 26 + (h % 39); // 26..64
  const seedB = 19 + ((h >> 5) % 34); // 19..52
  const catMap = CATEGORY_DILEMMAS[category] ?? CATEGORY_DILEMMAS.mimari;
  const copy = catMap[lang] ?? catMap.en;

  return {
    question: copy.question,
    optionA: copy.optionA,
    optionB: copy.optionB,
    seedA,
    seedB,
  };
}
