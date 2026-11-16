export type BlogLang = "tr" | "en" | "de" | "es";

export interface BlogLangMeta {
  code: BlogLang;
  label: string;
  nativeName: string;
  englishName: string;
  hreflang: string;
  locale: string;
  dir: "ltr" | "rtl";
}

export const BLOG_LANGUAGES: BlogLangMeta[] = [
  { code: "tr", label: "TR", nativeName: "Türkçe", englishName: "Turkish", hreflang: "tr-TR", locale: "tr_TR", dir: "ltr" },
  { code: "en", label: "EN", nativeName: "English", englishName: "English", hreflang: "en-US", locale: "en_US", dir: "ltr" },
  { code: "de", label: "DE", nativeName: "Deutsch", englishName: "German", hreflang: "de-DE", locale: "de_DE", dir: "ltr" },
  { code: "es", label: "ES", nativeName: "Español", englishName: "Spanish", hreflang: "es-ES", locale: "es_ES", dir: "ltr" },
];

export interface BlogUiCopy {
  home: string;
  allArticles: string;
  journalBadge: string;
  languageLabel: string;
  availableIn9Langs: string;
  readingLanguage: string;
  switchSuggestionPrefix: string;
  switchSuggestionAction: string;
  archiveTag: string;
  archiveTitleLine1: string;
  archiveTitleAccent: string;
  archiveTitleLine2: string;
  archiveDesc: string;
  catAll: string;
  catMimari: string;
  catDonanim: string;
  catLlm: string;
  catGuvenlik: string;
  searchPlaceholder: string;
  emptyState: string;
  clearFilters: string;
  readArticle: string;
  openFullPage: string;
  authorLabel: string;
  publishedLabel: string;
  tldrTitle: string;
  faqTitle: string;
  shareTitle: string;
  copyLink: string;
  copiedLink: string;
  copyCitation: string;
  copiedCitation: string;
  relatedTitle: string;
  rssFeed: string;
  communityTitle: string;
  communityDesc: string;
  communityBtn: string;
  footerSubtitle: string;
  notFoundTitle: string;
  breadcrumbHome: string;
  breadcrumbBlog: string;
}

export const BLOG_UI_COPY: Record<BlogLang, BlogUiCopy> = {
  tr: {
    home: "Ana Sayfa",
    allArticles: "Tüm Yazılar",
    journalBadge: "GÜNLÜK",
    languageLabel: "Dil",
    availableIn9Langs: "4 DİL // GLOBAL",
    readingLanguage: "Okuma Dili",
    switchSuggestionPrefix: "Tarayıcı diliniz algılandı:",
    switchSuggestionAction: "Bu dile geç",
    archiveTag: "// GÜNLÜK MÜHENDİSLİK NOTLARI & YAYINLAR",
    archiveTitleLine1: "Yazıya dökülen,",
    archiveTitleAccent: "derin",
    archiveTitleLine2: "deneyimler.",
    archiveDesc:
      "Yapay zekâ sistem mimarisi, GPU/bellek fiziksel sınırları, otonom ajan güvenliği ve teknoloji endüstrisindeki kırılma noktaları üzerine günlük teknik analiz arşivi.",
    catAll: "Tümü",
    catMimari: "Sistem Mimarisi",
    catDonanim: "Donanım & Çip",
    catLlm: "LLM & Çıkarım",
    catGuvenlik: "Ajan Güvenliği",
    searchPlaceholder: "Makalelerde ara...",
    emptyState: "Aramanızla eşleşen makale bulunamadı.",
    clearFilters: "Filtreleri Temizle",
    readArticle: "Yazıyı Oku",
    openFullPage: "Tam Sayfada Aç",
    authorLabel: "YAZAR",
    publishedLabel: "YAYIN TARİHİ",
    tldrTitle: "YÖNETİCİ ÖZETİ // GEO TL;DR",
    faqTitle: "TEKNİK SORU & CEVAP (AEO)",
    shareTitle: "Paylaş & Kaynak Göster",
    copyLink: "Bağlantıyı Kopyala",
    copiedLink: "Kopyalandı",
    copyCitation: "AI / Markdown Kaynak Kopyala",
    copiedCitation: "Kaynak Kopyalandı",
    relatedTitle: "İLGİLİ TEKNİK ANALİZLER",
    rssFeed: "RSS Akışı",
    communityTitle: "100.000+ Takipçi ile Günlük Teknoloji Gündemi",
    communityDesc:
      "Her gün yayınlanan analizleri doğrudan akışınızda okumak ve tartışmalara katılmak için kanallardan takip edebilirsiniz.",
    communityBtn: "LinkedIn'de İncele",
    footerSubtitle: "Kürşat Yılmaz — AI Product Engineer & Mimari Notlar",
    notFoundTitle: "Yazı Bulunamadı — Kürşat Yılmaz",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbBlog: "Günlük",
  },
  en: {
    home: "Home",
    allArticles: "All Essays",
    journalBadge: "JOURNAL",
    languageLabel: "Language",
    availableIn9Langs: "4 LANGUAGES // GLOBAL",
    readingLanguage: "Reading Language",
    switchSuggestionPrefix: "Browser language detected:",
    switchSuggestionAction: "Switch to",
    archiveTag: "// DAILY ENGINEERING NOTES & DISPATCHES",
    archiveTitleLine1: "Distilled into code,",
    archiveTitleAccent: "deep",
    archiveTitleLine2: "insights.",
    archiveDesc:
      "Daily technical autopsies covering AI systems architecture, silicon and memory physics, autonomous agent security, and critical inflection points across the tech industry.",
    catAll: "All",
    catMimari: "Systems Architecture",
    catDonanim: "Hardware & Silicon",
    catLlm: "LLM & Inference",
    catGuvenlik: "Agent Security",
    searchPlaceholder: "Search dispatches...",
    emptyState: "No dispatches matched your current filters.",
    clearFilters: "Clear Filters",
    readArticle: "Read Essay",
    openFullPage: "Open Full Article",
    authorLabel: "AUTHOR",
    publishedLabel: "PUBLISHED",
    tldrTitle: "EXECUTIVE BRIEF // GEO TL;DR",
    faqTitle: "TECHNICAL Q&A (AEO)",
    shareTitle: "Share & Cite",
    copyLink: "Copy Link",
    copiedLink: "Copied",
    copyCitation: "Copy AI / Markdown Citation",
    copiedCitation: "Citation Copied",
    relatedTitle: "RELATED TECHNICAL DISPATCHES",
    rssFeed: "RSS Feed",
    communityTitle: "100,000+ Followers & Daily Tech Dispatches",
    communityDesc:
      "Follow daily architectural autopsies, distributed system analyses, and production AI discussions directly in your feed.",
    communityBtn: "Connect on LinkedIn",
    footerSubtitle: "Kürşat Yılmaz — AI Product Engineer & Architecture Notes",
    notFoundTitle: "Article Not Found — Kürşat Yılmaz",
    breadcrumbHome: "Home",
    breadcrumbBlog: "Journal",
  },
  es: {
    home: "Inicio",
    allArticles: "Todos los Artículos",
    journalBadge: "DIARIO",
    languageLabel: "Idioma",
    availableIn9Langs: "4 IDIOMAS // GLOBAL",
    readingLanguage: "Idioma de lectura",
    switchSuggestionPrefix: "Idioma del navegador detectado:",
    switchSuggestionAction: "Cambiar a",
    archiveTag: "// NOTAS DE INGENIERÍA Y PUBLICACIONES DIARIAS",
    archiveTitleLine1: "Destilado en código,",
    archiveTitleAccent: "profundas",
    archiveTitleLine2: "experiencias.",
    archiveDesc:
      "Archivo diario de autopsias técnicas sobre arquitectura de sistemas de IA, límites físicos de GPU/memoria, seguridad de agentes autónomos y puntos de inflexión tecnológica.",
    catAll: "Todos",
    catMimari: "Arquitectura",
    catDonanim: "Hardware y Silicio",
    catLlm: "LLM e Inferencia",
    catGuvenlik: "Seguridad de Agentes",
    searchPlaceholder: "Buscar artículos...",
    emptyState: "No se encontraron artículos que coincidan con tu búsqueda.",
    clearFilters: "Limpiar Filtros",
    readArticle: "Leer Artículo",
    openFullPage: "Abrir Página Completa",
    authorLabel: "AUTOR",
    publishedLabel: "PUBLICADO",
    tldrTitle: "RESUMEN EJECUTIVO // GEO TL;DR",
    faqTitle: "PREGUNTAS TÉCNICAS (AEO)",
    shareTitle: "Compartir y Citar",
    copyLink: "Copiar Enlace",
    copiedLink: "Copiado",
    copyCitation: "Copiar Cita AI / Markdown",
    copiedCitation: "Cita Copiada",
    relatedTitle: "ANÁLISIS TÉCNICOS RELACIONADOS",
    rssFeed: "Feed RSS",
    communityTitle: "100.000+ Seguidores y Actualidad Tech Diaria",
    communityDesc:
      "Sigue cada día los análisis sobre arquitectura de IA, sistemas distribuidos y disrupciones en la industria.",
    communityBtn: "Ver en LinkedIn",
    footerSubtitle: "Kürşat Yılmaz — Ingeniero de Producto IA y Notas de Arquitectura",
    notFoundTitle: "Artículo No Encontrado — Kürşat Yılmaz",
    breadcrumbHome: "Inicio",
    breadcrumbBlog: "Diario",
  },
  de: {
    home: "Startseite",
    allArticles: "Alle Artikel",
    journalBadge: "JOURNAL",
    languageLabel: "Sprache",
    availableIn9Langs: "4 SPRACHEN // GLOBAL",
    readingLanguage: "Lesesprache",
    switchSuggestionPrefix: "Browsersprache erkannt:",
    switchSuggestionAction: "Wechseln zu",
    archiveTag: "// TÄGLICHE ENGINEERING-NOTIZEN & ANALYSEN",
    archiveTitleLine1: "In Code gegossene,",
    archiveTitleAccent: "tiefe",
    archiveTitleLine2: "Erkenntnisse.",
    archiveDesc:
      "Tägliches technisches Archiv über KI-Systemarchitektur, physikalische GPU-/Speichergrenzen, Sicherheit autonomer Agenten und Wendepunkte der Tech-Industrie.",
    catAll: "Alle",
    catMimari: "Systemarchitektur",
    catDonanim: "Hardware & Silizium",
    catLlm: "LLM & Inferenz",
    catGuvenlik: "Agenten-Sicherheit",
    searchPlaceholder: "Artikel durchsuchen...",
    emptyState: "Keine Artikel gefunden, die Ihrer Suche entsprechen.",
    clearFilters: "Filter zurücksetzen",
    readArticle: "Artikel lesen",
    openFullPage: "Vollständig öffnen",
    authorLabel: "AUTOR",
    publishedLabel: "VERÖFFENTLICHT",
    tldrTitle: "KURZÜBERSICHT // GEO TL;DR",
    faqTitle: "TECHNISCHE FRAGEN & ANTWORTEN (AEO)",
    shareTitle: "Teilen & Zitieren",
    copyLink: "Link kopieren",
    copiedLink: "Kopiert",
    copyCitation: "KI / Markdown-Zitat kopieren",
    copiedCitation: "Zitat kopiert",
    relatedTitle: "VERWANDTE TECHNISCHE ANALYSEN",
    rssFeed: "RSS-Feed",
    communityTitle: "100.000+ Follower & Tägliche Tech-Analysen",
    communityDesc:
      "Verfolgen Sie tägliche Analysen zu KI-Architektur, verteilten Systemen und produktiver Softwaretechnik.",
    communityBtn: "Auf LinkedIn vernetzen",
    footerSubtitle: "Kürşat Yılmaz — AI Product Engineer & Architekturnotizen",
    notFoundTitle: "Artikel nicht gefunden — Kürşat Yılmaz",
    breadcrumbHome: "Startseite",
    breadcrumbBlog: "Journal",
  },
};

export function getBlogUiCopy(lang: BlogLang): BlogUiCopy {
  return BLOG_UI_COPY[lang] ?? BLOG_UI_COPY.tr;
}

export interface BlogPostTranslation {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  metrics: { label: string; val: string }[];
  content: string[];
}

export interface BlogPostItem {
  slug: string;
  tag: string;
  category: "mimari" | "donanim" | "llm" | "guvenlik";
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readTime: string;
  imageUrl: string;
  metrics: { label: string; val: string }[];
  content: string[];
  translations?: Partial<Record<Exclude<BlogLang, "tr">, BlogPostTranslation>>;
}

export function resolveBlogLang(raw?: string | null): BlogLang {
  if (!raw) return "tr";
  const normalized = raw.toLowerCase().trim() as BlogLang;
  return BLOG_LANGUAGES.some((l) => l.code === normalized) ? normalized : "tr";
}

export function getBlogLangMeta(lang: BlogLang): BlogLangMeta {
  return BLOG_LANGUAGES.find((l) => l.code === lang) ?? BLOG_LANGUAGES[0];
}

export function getLocalizedPost(post: BlogPostItem, lang: BlogLang): BlogPostItem {
  if (lang === "tr" || !post.translations?.[lang]) {
    return post;
  }
  const trData = post.translations[lang]!;
  return {
    ...post,
    tag: trData.tag,
    title: trData.title,
    excerpt: trData.excerpt,
    date: trData.date,
    readTime: trData.readTime,
    metrics: trData.metrics,
    content: trData.content,
  };
}

export interface PostFaqItem {
  question: string;
  answer: string;
}

export function generatePostFaqs(post: BlogPostItem, lang: BlogLang): PostFaqItem[] {
  const localized = getLocalizedPost(post, lang);
  const metricsSummary = localized.metrics.map((m) => `${m.label}: ${m.val}`).join(" • ");
  const leadParagraph = localized.content[0] ?? localized.excerpt;
  const middleParagraph = localized.content[1] ?? leadParagraph;
  const closingParagraph = localized.content[localized.content.length - 1] ?? localized.excerpt;

  switch (lang) {
    case "en":
      return [
        {
          question: `What is the core architectural finding of "${localized.title}"?`,
          answer: `${localized.excerpt} ${leadParagraph}`,
        },
        {
          question: `Which engineering telemetry and failure domains stand out in this analysis?`,
          answer: `${metricsSummary}. ${middleParagraph}`,
        },
        {
          question: `What deterministic engineering principle does Kürşat Yılmaz recommend?`,
          answer: closingParagraph,
        },
      ];
    case "es":
      return [
        {
          question: `¿Cuál es la conclusión principal de "${localized.title}"?`,
          answer: `${localized.excerpt} ${leadParagraph}`,
        },
        {
          question: `¿Qué métricas técnicas y dominios de fallo destacan en este análisis?`,
          answer: `${metricsSummary}. ${middleParagraph}`,
        },
        {
          question: `¿Qué principio de ingeniería determinista recomienda Kürşat Yılmaz?`,
          answer: closingParagraph,
        },
      ];
    case "de":
      return [
        {
          question: `Was ist die zentrale technische Erkenntnis von "${localized.title}"?`,
          answer: `${localized.excerpt} ${leadParagraph}`,
        },
        {
          question: `Welche Kennzahlen und Fehlerdomänen stehen in dieser Analyse im Vordergrund?`,
          answer: `${metricsSummary}. ${middleParagraph}`,
        },
        {
          question: `Welches deterministische Engineering-Prinzip empfiehlt Kürşat Yılmaz?`,
          answer: closingParagraph,
        },
      ];
    case "tr":
    default:
      return [
        {
          question: `"${localized.title}" analizinin temel mimari bulgusu nedir?`,
          answer: `${localized.excerpt} ${leadParagraph}`,
        },
        {
          question: `Bu vakada öne çıkan teknik metrikler ve kırılma alanları nelerdir?`,
          answer: `${metricsSummary}. ${middleParagraph}`,
        },
        {
          question: `Kürşat Yılmaz bu soruna karşı hangi deterministik mühendislik ilkesini öneriyor?`,
          answer: closingParagraph,
        },
      ];
  }
}

export const SITE_URL = "https://kursat.itibar.app";

export interface BlogPostSummaryTranslation {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  metrics: { label: string; val: string }[];
}

export interface BlogPostSummary {
  slug: string;
  tag: string;
  category: "mimari" | "donanim" | "llm" | "guvenlik";
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readTime: string;
  imageUrl: string;
  metrics: { label: string; val: string }[];
  translations?: Partial<Record<Exclude<BlogLang, "tr">, BlogPostSummaryTranslation>>;
}

export function getLocalizedSummary(post: BlogPostSummary, lang: BlogLang): BlogPostSummary {
  if (lang === "tr" || !post.translations?.[lang]) {
    return post;
  }
  const trData = post.translations[lang]!;
  return {
    ...post,
    tag: trData.tag,
    title: trData.title,
    excerpt: trData.excerpt,
    date: trData.date,
    readTime: trData.readTime,
    metrics: trData.metrics,
  };
}
