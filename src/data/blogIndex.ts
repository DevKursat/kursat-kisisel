export type BlogLang = "tr" | "en" | "zh" | "hi" | "es" | "ar" | "pt" | "de" | "ja";

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
  { code: "zh", label: "ZH", nativeName: "中文", englishName: "Chinese", hreflang: "zh-CN", locale: "zh_CN", dir: "ltr" },
  { code: "hi", label: "HI", nativeName: "हिन्दी", englishName: "Hindi", hreflang: "hi-IN", locale: "hi_IN", dir: "ltr" },
  { code: "es", label: "ES", nativeName: "Español", englishName: "Spanish", hreflang: "es-ES", locale: "es_ES", dir: "ltr" },
  { code: "ar", label: "AR", nativeName: "العربية", englishName: "Arabic", hreflang: "ar-SA", locale: "ar_SA", dir: "rtl" },
  { code: "pt", label: "PT", nativeName: "Português", englishName: "Portuguese", hreflang: "pt-BR", locale: "pt_BR", dir: "ltr" },
  { code: "de", label: "DE", nativeName: "Deutsch", englishName: "German", hreflang: "de-DE", locale: "de_DE", dir: "ltr" },
  { code: "ja", label: "JA", nativeName: "日本語", englishName: "Japanese", hreflang: "ja-JP", locale: "ja_JP", dir: "ltr" },
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
    availableIn9Langs: "9 DİL // GLOBAL",
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
    availableIn9Langs: "9 LANGUAGES // GLOBAL",
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
  zh: {
    home: "首页",
    allArticles: "全部文章",
    journalBadge: "技术日志",
    languageLabel: "语言",
    availableIn9Langs: "9 种语言 // 全球版",
    readingLanguage: "阅读语言",
    switchSuggestionPrefix: "检测到您的浏览器语言：",
    switchSuggestionAction: "切换到",
    archiveTag: "// 每日工程笔记与深度发布",
    archiveTitleLine1: "凝练于代码，",
    archiveTitleAccent: "深度",
    archiveTitleLine2: "技术洞察。",
    archiveDesc:
      "围绕 AI 系统架构、GPU 与内存物理极限、自主代理安全以及科技行业关键转折点的每日技术剖析档案。",
    catAll: "全部",
    catMimari: "系统架构",
    catDonanim: "硬件与芯片",
    catLlm: "大模型推理",
    catGuvenlik: "代理安全",
    searchPlaceholder: "搜索技术文章...",
    emptyState: "未找到符合当前筛选条件的文章。",
    clearFilters: "清除筛选",
    readArticle: "阅读全文",
    openFullPage: "打开完整页面",
    authorLabel: "作者",
    publishedLabel: "发布日期",
    tldrTitle: "核心摘要 // GEO TL;DR",
    faqTitle: "技术问答 (AEO)",
    shareTitle: "分享与引用",
    copyLink: "复制链接",
    copiedLink: "已复制",
    copyCitation: "复制 AI / Markdown 引用",
    copiedCitation: "引用已复制",
    relatedTitle: "相关技术剖析",
    rssFeed: "RSS 订阅",
    communityTitle: "100,000+ 关注者的每日技术前沿",
    communityDesc: "关注每日发布的 AI 架构深度剖析与分布式系统工程讨论。",
    communityBtn: "在 LinkedIn 上关注",
    footerSubtitle: "Kürşat Yılmaz — AI 产品工程师与架构笔记",
    notFoundTitle: "未找到文章 — Kürşat Yılmaz",
    breadcrumbHome: "首页",
    breadcrumbBlog: "日志",
  },
  hi: {
    home: "होम",
    allArticles: "सभी लेख",
    journalBadge: "जर्नल",
    languageLabel: "भाषा",
    availableIn9Langs: "9 भाषाएं // ग्लोबल",
    readingLanguage: "पढ़ने की भाषा",
    switchSuggestionPrefix: "ब्राउज़र भाषा पहचानी गई:",
    switchSuggestionAction: "स्विच करें",
    archiveTag: "// दैनिक इंजीनियरिंग नोट्स और विश्लेषण",
    archiveTitleLine1: "कोड में ढले,",
    archiveTitleAccent: "गहरे",
    archiveTitleLine2: "तकनीकी अनुभव।",
    archiveDesc:
      "AI सिस्टम आर्किटेक्चर, GPU/मेमोरी की भौतिक सीमाएं, ऑटोनॉमस एजेंट सुरक्षा और टेक उद्योग के निर्णायक मोड़ों पर दैनिक तकनीकी विश्लेषण संग्रह।",
    catAll: "सभी",
    catMimari: "सिस्टम आर्किटेक्चर",
    catDonanim: "हार्डवेयर व चिप्स",
    catLlm: "LLM व इन्फरेंस",
    catGuvenlik: "एजेंट सुरक्षा",
    searchPlaceholder: "लेख खोजें...",
    emptyState: "आपकी खोज से मेल खाने वाला कोई लेख नहीं मिला।",
    clearFilters: "फ़िल्टर साफ़ करें",
    readArticle: "लेख पढ़ें",
    openFullPage: "पूरा लेख खोलें",
    authorLabel: "लेखक",
    publishedLabel: "प्रकाशन तिथि",
    tldrTitle: "मुख्य सारांश // GEO TL;DR",
    faqTitle: "तकनीकी प्रश्नोत्तर (AEO)",
    shareTitle: "साझा करें और उद्धृत करें",
    copyLink: "लिंक कॉपी करें",
    copiedLink: "कॉपी हो गया",
    copyCitation: "AI / Markdown उद्धरण कॉपी करें",
    copiedCitation: "उद्धरण कॉपी हुआ",
    relatedTitle: "संबंधित तकनीकी विश्लेषण",
    rssFeed: "RSS फ़ीड",
    communityTitle: "100,000+ फॉलोअर्स के साथ दैनिक टेक एजेंडा",
    communityDesc: "हर दिन प्रकाशित AI आर्किटेक्चर और सिस्टम इंजीनियरिंग विश्लेषणों से जुड़ें।",
    communityBtn: "LinkedIn पर जुड़ें",
    footerSubtitle: "Kürşat Yılmaz — AI प्रोडक्ट इंजीनियर व आर्किटेक्चर नोट्स",
    notFoundTitle: "लेख नहीं मिला — Kürşat Yılmaz",
    breadcrumbHome: "होम",
    breadcrumbBlog: "जर्नल",
  },
  es: {
    home: "Inicio",
    allArticles: "Todos los Artículos",
    journalBadge: "DIARIO",
    languageLabel: "Idioma",
    availableIn9Langs: "9 IDIOMAS // GLOBAL",
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
  ar: {
    home: "الرئيسية",
    allArticles: "جميع المقالات",
    journalBadge: "المجلة",
    languageLabel: "اللغة",
    availableIn9Langs: "9 لغات // عالمي",
    readingLanguage: "لغة القراءة",
    switchSuggestionPrefix: "تم اكتشاف لغة المتصفح:",
    switchSuggestionAction: "التبديل إلى",
    archiveTag: "// مذكرات هندسية يومية ومنشورات تقنية",
    archiveTitleLine1: "خلاصة الكود،",
    archiveTitleAccent: "تجارب",
    archiveTitleLine2: "هندسية عميقة.",
    archiveDesc:
      "أرشيف يومي للتحليلات التقنية المعمقة حول هندسة أنظمة الذكاء الاصطناعي، والحدود الفيزيائية للذاكرة والمعالجات، وأمن الوكلاء المستقلين.",
    catAll: "الكل",
    catMimari: "هندسة الأنظمة",
    catDonanim: "العتاد والرقائق",
    catLlm: "النماذج والاستدلال",
    catGuvenlik: "أمن الوكلاء",
    searchPlaceholder: "ابحث في المقالات...",
    emptyState: "لم يتم العثور على مقالات تطابق بحثك.",
    clearFilters: "مسح الفلاتر",
    readArticle: "اقرأ المقال",
    openFullPage: "فتح في صفحة كاملة",
    authorLabel: "المؤلف",
    publishedLabel: "تاريخ النشر",
    tldrTitle: "ملخص تنفيذي // GEO TL;DR",
    faqTitle: "أسئلة وأجوبة تقنية (AEO)",
    shareTitle: "مشاركة واقتباس",
    copyLink: "نسخ الرابط",
    copiedLink: "تم النسخ",
    copyCitation: "نسخ اقتباس AI / Markdown",
    copiedCitation: "تم نسخ الاقتباس",
    relatedTitle: "تحليلات تقنية ذات صلة",
    rssFeed: "خلاصة RSS",
    communityTitle: "أكثر من 100,000 متابع لأجندة التكنولوجيا اليومية",
    communityDesc: "تابع التحليلات اليومية لهندسة الذكاء الاصطناعي والأنظمة الموزعة مباشرة.",
    communityBtn: "تواصل عبر LinkedIn",
    footerSubtitle: "Kürşat Yılmaz — مهندس منتجات الذكاء الاصطناعي ومذكرات معمارية",
    notFoundTitle: "المقال غير موجود — Kürşat Yılmaz",
    breadcrumbHome: "الرئيسية",
    breadcrumbBlog: "المجلة",
  },
  pt: {
    home: "Início",
    allArticles: "Todos os Artigos",
    journalBadge: "DIÁRIO",
    languageLabel: "Idioma",
    availableIn9Langs: "9 IDIOMAS // GLOBAL",
    readingLanguage: "Idioma de leitura",
    switchSuggestionPrefix: "Idioma do navegador detectado:",
    switchSuggestionAction: "Mudar para",
    archiveTag: "// NOTAS DIÁRIAS DE ENGENHARIA E PUBLICAÇÕES",
    archiveTitleLine1: "Destilado em código,",
    archiveTitleAccent: "profundas",
    archiveTitleLine2: "experiências.",
    archiveDesc:
      "Arquivo diário de autópsias técnicas sobre arquitetura de sistemas de IA, limites físicos de GPU/memória, segurança de agentes autônomos e pontos de inflexão da indústria.",
    catAll: "Todos",
    catMimari: "Arquitetura",
    catDonanim: "Hardware e Chips",
    catLlm: "LLM e Inferência",
    catGuvenlik: "Segurança de Agentes",
    searchPlaceholder: "Buscar artigos...",
    emptyState: "Nenhum artigo encontrado para os filtros aplicados.",
    clearFilters: "Limpar Filtros",
    readArticle: "Ler Artigo",
    openFullPage: "Abrir Página Completa",
    authorLabel: "AUTOR",
    publishedLabel: "PUBLICADO EM",
    tldrTitle: "RESUMO EXECUTIVO // GEO TL;DR",
    faqTitle: "PERGUNTAS TÉCNICAS (AEO)",
    shareTitle: "Compartilhar e Citar",
    copyLink: "Copiar Link",
    copiedLink: "Copiado",
    copyCitation: "Copiar Citação AI / Markdown",
    copiedCitation: "Citação Copiada",
    relatedTitle: "ANÁLISES TÉCNICAS RELACIONADAS",
    rssFeed: "Feed RSS",
    communityTitle: "100.000+ Seguidores e Agenda Tech Diária",
    communityDesc:
      "Acompanhe análises diárias de arquitetura de IA, sistemas distribuídos e engenharia de produção.",
    communityBtn: "Conectar no LinkedIn",
    footerSubtitle: "Kürşat Yılmaz — Engenheiro de Produto de IA e Notas de Arquitetura",
    notFoundTitle: "Artigo Não Encontrado — Kürşat Yılmaz",
    breadcrumbHome: "Início",
    breadcrumbBlog: "Diário",
  },
  de: {
    home: "Startseite",
    allArticles: "Alle Artikel",
    journalBadge: "JOURNAL",
    languageLabel: "Sprache",
    availableIn9Langs: "9 SPRACHEN // GLOBAL",
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
  ja: {
    home: "ホーム",
    allArticles: "すべての記事",
    journalBadge: "ジャーナル",
    languageLabel: "言語",
    availableIn9Langs: "9言語対応 // グローバル",
    readingLanguage: "表示言語",
    switchSuggestionPrefix: "ブラウザ言語を検出：",
    switchSuggestionAction: "切り替える",
    archiveTag: "// 日刊エンジニアリングノート＆技術解剖",
    archiveTitleLine1: "コードに刻む、",
    archiveTitleAccent: "深い",
    archiveTitleLine2: "技術的洞察。",
    archiveDesc:
      "AIシステムアーキテクチャ、GPU・メモリの物理限界、自律エージェントのセキュリティ、テクノロジー業界の転換点を読み解く日刊技術分析アーカイブ。",
    catAll: "すべて",
    catMimari: "システム設計",
    catDonanim: "ハードウェア",
    catLlm: "LLM・推論基盤",
    catGuvenlik: "エージェント安全",
    searchPlaceholder: "記事を検索...",
    emptyState: "条件に一致する記事が見つかりませんでした。",
    clearFilters: "フィルターを解除",
    readArticle: "記事を読む",
    openFullPage: "フルページで開く",
    authorLabel: "著者",
    publishedLabel: "公開日",
    tldrTitle: "エグゼクティブ要約 // GEO TL;DR",
    faqTitle: "技術 Q&A (AEO)",
    shareTitle: "共有・引用",
    copyLink: "リンクをコピー",
    copiedLink: "コピー完了",
    copyCitation: "AI / Markdown 引用をコピー",
    copiedCitation: "引用をコピー",
    relatedTitle: "関連する技術解剖",
    rssFeed: "RSSフィード",
    communityTitle: "100,000+ フォロワーと日刊テクノロジー分析",
    communityDesc: "AIアーキテクチャや分散システムの最新分析を毎日のフィードでフォローできます。",
    communityBtn: "LinkedInで見る",
    footerSubtitle: "Kürşat Yılmaz — AIプロダクトエンジニア・設計ノート",
    notFoundTitle: "記事が見つかりません — Kürşat Yılmaz",
    breadcrumbHome: "ホーム",
    breadcrumbBlog: "ジャーナル",
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
    case "zh":
      return [
        {
          question: `《${localized.title}》的核心技术结论是什么？`,
          answer: `${localized.excerpt} ${leadParagraph}`,
        },
        {
          question: `本次分析中有哪些关键指标与失效边界？`,
          answer: `${metricsSummary}。${middleParagraph}`,
        },
        {
          question: `Kürşat Yılmaz 提出了怎样的确定性工程原则？`,
          answer: closingParagraph,
        },
      ];
    case "hi":
      return [
        {
          question: `"${localized.title}" विश्लेषण का मुख्य निष्कर्ष क्या है?`,
          answer: `${localized.excerpt} ${leadParagraph}`,
        },
        {
          question: `इस मामले में प्रमुख इंजीनियरिंग मेट्रिक्स और विफलता बिंदु कौन-से हैं?`,
          answer: `${metricsSummary}। ${middleParagraph}`,
        },
        {
          question: `Kürşat Yılmaz के अनुसार इसके लिए कौन-सा निर्धारक इंजीनियरिंग सिद्धांत अपनाना चाहिए?`,
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
    case "ar":
      return [
        {
          question: `ما هي النتيجة المعمارية الأساسية لمقال "${localized.title}"؟`,
          answer: `${localized.excerpt} ${leadParagraph}`,
        },
        {
          question: `ما أبرز المؤشرات التقنية ونقاط الفشل في هذا التحليل؟`,
          answer: `${metricsSummary}. ${middleParagraph}`,
        },
        {
          question: `ما المبدأ الهندسي الحتمي الذي يوصي به Kürşat Yılmaz؟`,
          answer: closingParagraph,
        },
      ];
    case "pt":
      return [
        {
          question: `Qual é a conclusão técnica central de "${localized.title}"?`,
          answer: `${localized.excerpt} ${leadParagraph}`,
        },
        {
          question: `Quais métricas de engenharia e domínios de falha se destacam nesta análise?`,
          answer: `${metricsSummary}. ${middleParagraph}`,
        },
        {
          question: `Qual princípio de engenharia determinística Kürşat Yılmaz recomenda?`,
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
    case "ja":
      return [
        {
          question: `「${localized.title}」の核心的な技術的結論は何ですか？`,
          answer: `${localized.excerpt} ${leadParagraph}`,
        },
        {
          question: `本分析で注目すべきエンジニアリング指標と障害領域は何ですか？`,
          answer: `${metricsSummary}。${middleParagraph}`,
        },
        {
          question: `Kürşat Yılmaz が推奨する決定論的エンジニアリング原則とは何ですか？`,
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
