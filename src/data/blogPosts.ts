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
    communityTitle: "10.000+ Takipçi ile Günlük Teknoloji Gündemi",
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
    communityTitle: "10,000+ Followers & Daily Tech Dispatches",
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
    communityTitle: "10,000+ 关注者的每日技术前沿",
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
    communityTitle: "10,000+ फॉलोअर्स के साथ दैनिक टेक एजेंडा",
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
    communityTitle: "10.000+ Seguidores y Actualidad Tech Diaria",
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
    communityTitle: "أكثر من 10,000 متابع لأجندة التكنولوجيا اليومية",
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
    communityTitle: "10.000+ Seguidores e Agenda Tech Diária",
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
    communityTitle: "10.000+ Follower & Tägliche Tech-Analysen",
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
    communityTitle: "10,000+ フォロワーと日刊テクノロジー分析",
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

export const BLOG_POSTS: BlogPostItem[] = [
  {
    slug: "openai-chatgpt-wallet-ve-lovable-veri-sizintisi",
    tag: "GÜVENLİK OTOPSİSİ",
    category: "guvenlik",
    title: "Ajanlara Kredi Kartı Vermek: ChatGPT Wallet ve Pasaport Sızdıran 'Vibe Coding' Çılgınlığı",
    excerpt: "OpenAI otonom alışveriş ajanlarına cüzdan bağlarken, yapay zeka ile üretilen binlerce uygulama eksik RLS yüzünden pasaportları ve 200.000+ özel mesajı internete açtı.",
    date: "15 Kas 2026",
    isoDate: "2026-11-15",
    readTime: "4 dk okuma",
    imageUrl: "/blog/openai-chatgpt-wallet-ve-lovable-veri-sizintisi.jpg",
    metrics: [
      { label: "SIZAN ÖZEL MESAJ", val: "200.000+" },
      { label: "TARANAN PROJE", val: "159.000+" },
    ],
    content: [
      "OpenAI, 'dots' adını verdiği otonom ajanların ABD'deki Pro kullanıcıları adına alışveriş yapabilmesi için ChatGPT Wallet'ı duyurdu. Aynı hafta güvenlik araştırmacıları, Lovable gibi yapay zeka tabanlı 'vibe coding' platformlarıyla üretilen 159.000'den fazla projeyi tarayıp binlerce uygulamanın veritabanı yetkilendirmesini unuttuğu için pasaport numaralarını, faturaları ve 200.000'den fazla özel mesajı internete açık bıraktığını ortaya çıkardı.",
      "Bir yanda Face ID ve ödeme token'ı ile güvenli otonom alışveriş pazarlanırken, diğer yanda yapay zekanın ürettiği arka uçlarda temel Row Level Security (RLS) kuralı bile yazılmadan canlıya alınan uygulamalar kullanıcı verilerini sızdırıyor. Bu durum, fren sistemi eksik arabaya otopilot takıp 'direksiyon deri kaplama, çok güvenli' diye reklam yapmaya benziyor.",
      "Kodun arkasındaki veritabanı erişim kontrolünü kuramayan bir yapay zeka ekosistemine şimdi bir de cüzdan ve ödeme yetkisi bağlamak, mühendislik sorununu çözmeden otomasyonun hızını artırmaktır. Üretim ortamında güvenlik arayüzdeki şık butonlarla değil, arka uçtaki katı yetkilendirme sınırlarıyla sağlanır.",
    ],
    translations: {
      en: {
        tag: "SECURITY AUTOPSY",
        title: "Handing Credit Cards to AI Agents: ChatGPT Wallet Meets the 'Vibe Coding' Data Leak",
        excerpt: "As OpenAI connects wallets to autonomous shopping agents, thousands of AI-generated apps leaked passport numbers and 200,000+ private messages over missing RLS.",
        date: "Nov 15, 2026",
        readTime: "4 min read",
        metrics: [
          { label: "LEAKED MESSAGES", val: "200,000+" },
          { label: "AUDITED PROJECTS", val: "159,000+" },
        ],
        content: [
          "OpenAI just rolled out ChatGPT Wallet for US Pro users, letting its 'dots' agents autonomously shop and check out via tokenized cards. In the exact same week, security researchers analyzing over 159,000 projects built on AI 'vibe coding' platforms like Lovable found thousands of production apps missing basic backend authorization and Row Level Security—exposing passport numbers, invoices, and 200,000+ private messages to the open web.",
          "Shipping autonomous checkout flows while AI-generated backends still forget basic database access rules is like putting autopilot on a car with no brakes and bragging about the leather seats.",
          "Giving AI agents access to wallets before the industry solves deterministic backend security only scales the blast radius. Production safety comes from strict authorization boundaries, not polished UI buttons.",
        ],
      },
      zh: {
        tag: "安全剖析",
        title: "把信用卡交给AI代理：ChatGPT Wallet 遇上“Vibe Coding”护照泄露潮",
        excerpt: "就在OpenAI为自主购物代理接入数字钱包的同一周，数千款AI生成应用因缺失RLS权限校验，将护照号和20万余条私信暴露在公网。",
        date: "2026年11月15日",
        readTime: "4 分钟阅读",
        metrics: [
          { label: "泄露私信数量", val: "200,000+" },
          { label: "扫描项目总数", val: "159,000+" },
        ],
        content: [
          "OpenAI 刚面向美国 Pro 用户推出 ChatGPT Wallet，允许名为“dots”的自主代理通过令牌化银行卡完成下单与结账。几乎在同一周，安全研究人员分析了超过 15.9 万个基于 Lovable 等 AI“氛围编程（vibe coding）”平台构建的项目，发现数千个线上应用缺少最基本的后端鉴权与行级安全（RLS）规则，导致护照号码、发票和超过 20 万条私人聊天记录直接暴露在公网上。",
          "在 AI 生成的后端代码连基础数据库访问控制都能遗漏的当下，急着把自主结账和支付权限交给 AI 代理，就像给没有刹车的汽车装上自动驾驶，然后炫耀真皮座椅有多安全。",
          "在行业真正解决确定性后端安全之前，把钱包交给代理只会成倍放大事故半径。生产环境的安全靠的是严格的权限边界，而不是界面上精致的确认按钮。",
        ],
      },
      hi: {
        tag: "सुरक्षा पोस्टमॉर्टम",
        title: "AI एजेंट्स को क्रेडिट कार्ड: ChatGPT Wallet और पासपोर्ट लीक करने वाला 'Vibe Coding' पागलपन",
        excerpt: "OpenAI ने शॉपिंग एजेंट्स को वॉलेट से जोड़ा, वहीं उसी हफ्ते हजारों AI-निर्मित ऐप्स ने RLS की कमी से पासपोर्ट नंबर और 2 लाख+ निजी संदेश इंटरनेट पर उजागर कर दिए।",
        date: "15 नवम्बर 2026",
        readTime: "4 मिनट",
        metrics: [
          { label: "लीक निजी संदेश", val: "200,000+" },
          { label: "जांचे गए प्रोजेक्ट", val: "159,000+" },
        ],
        content: [
          "OpenAI ने अमेरिकी Pro यूज़र्स के लिए ChatGPT Wallet लॉन्च किया है, जिससे उसके 'dots' एजेंट्स टोकनाइज्ड कार्ड के जरिए खुद खरीदारी और चेकआउट कर सकते हैं। ठीक उसी हफ्ते सुरक्षा शोधकर्ताओं ने Lovable जैसे AI 'vibe coding' प्लेटफॉर्म पर बने 1,59,000+ प्रोजेक्ट्स की जांच में पाया कि हजारों लाइव ऐप्स में बेसिक बैकएंड ऑथराइजेशन और Row Level Security (RLS) गायब थी—जिससे पासपोर्ट नंबर, इनवॉइस और 2,00,000+ निजी चैट खुले इंटरनेट पर लीक हो गए।",
          "जब AI से बने बैकएंड में डेटाबेस एक्सेस के बुनियादी नियम ही छूट रहे हों, तब ऑटोनॉमस पेमेंट फ्लो शिप करना बिना ब्रेक वाली कार में ऑटोपायलट लगाकर लेदर सीट की तारीफ करने जैसा है।",
          "बैकएंड सुरक्षा की बुनियादी समस्या सुलझाए बिना AI एजेंट्स को वॉलेट की चाबी सौंपना सिर्फ नुकसान का दायरा बढ़ाता है।",
        ],
      },
      es: {
        tag: "AUTOPSIA DE SEGURIDAD",
        title: "Dar tarjetas de crédito a agentes de IA: ChatGPT Wallet frente a la fuga de datos del 'Vibe Coding'",
        excerpt: "Mientras OpenAI conecta billeteras a agentes de compra autónomos, miles de apps creadas con IA expusieron pasaportes y más de 200.000 mensajes privados por falta de RLS.",
        date: "15 nov 2026",
        readTime: "4 min lectura",
        metrics: [
          { label: "MENSAJES FILTRADOS", val: "200.000+" },
          { label: "PROYECTOS AUDITADOS", val: "159.000+" },
        ],
        content: [
          "OpenAI lanzó ChatGPT Wallet para suscriptores Pro en EE. UU., permitiendo que sus agentes 'dots' compren y paguen de forma autónoma mediante tarjetas tokenizadas. En la misma semana, investigadores que analizaron más de 159.000 proyectos creados en plataformas de 'vibe coding' como Lovable hallaron miles de aplicaciones en producción sin autorización de backend ni Row Level Security, exponiendo números de pasaporte, facturas y más de 200.000 mensajes privados.",
          "Desplegar pagos autónomos cuando los backends generados por IA aún olvidan reglas básicas de acceso a bases de datos es como instalar piloto automático en un coche sin frenos y presumir de la tapicería.",
          "Entregar billeteras a agentes de IA antes de resolver la seguridad determinista del backend solo multiplica el radio de impacto.",
        ],
      },
      ar: {
        tag: "تشريح أمني",
        title: "تسليم بطاقات الائتمان لوكلاء الذكاء الاصطناعي: ChatGPT Wallet في مواجهة تسريبات 'Vibe Coding'",
        excerpt: "بالتزامن مع ربط OpenAI للمحافظ الرقمية بوكلاء التسوق المستقلين، كشفت آلاف التطبيقات المولدة بالذكاء الاصطناعي عن جوازات سفر وأكثر من 200 ألف رسالة خاصة بسبب غياب RLS.",
        date: "15 نوفمبر 2026",
        readTime: "4 دقائق",
        metrics: [
          { label: "رسائل مسربة", val: "200,000+" },
          { label: "مشاريع مفحوصة", val: "159,000+" },
        ],
        content: [
          "أطلقت OpenAI ميزة ChatGPT Wallet لمشتركي Pro في الولايات المتحدة، لتتيح لوكلاء 'dots' التسوق والدفع تلقائياً عبر بطاقات مشفرة. في الأسبوع نفسه، كشف باحثون أمنيون فحصوا أكثر من 159 ألف مشروع مبني على منصات 'vibe coding' مثل Lovable أن آلاف التطبيقات المنشورة تفتقر إلى التحقق الأساسي في الخادم وسياسات Row Level Security، مما ترك أرقام جوازات السفر والفواتير وأكثر من 200 ألف رسالة خاصة مكشوفة على الإنترنت.",
          "إطلاق عمليات دفع مستقلة بينما لا تزال الخوادم المولدة بالذكاء الاصطناعي تنسى أبسط قواعد صلاحيات قواعد البيانات يشبه تركيب نظام قيادة ذاتية في سيارة بلا مكابح والتفاخر بجمال المقاعد الجلدية.",
          "منح وكلاء الذكاء الاصطناعي صلاحية الوصول إلى المحافظ قبل حل معضلة الأمان الحتمي في الخلفية يضاعف حجم الكارثة فقط.",
        ],
      },
      pt: {
        tag: "AUTÓPSIA DE SEGURANÇA",
        title: "Dando Cartões de Crédito a Agentes de IA: ChatGPT Wallet e o Vazamento do 'Vibe Coding'",
        excerpt: "Enquanto a OpenAI conecta carteiras a agentes de compra autônomos, milhares de apps gerados por IA expuseram passaportes e mais de 200 mil mensagens privadas por falta de RLS.",
        date: "15 nov 2026",
        readTime: "4 min de leitura",
        metrics: [
          { label: "MENSAGENS VAZADAS", val: "200.000+" },
          { label: "PROJETOS AUDITADOS", val: "159.000+" },
        ],
        content: [
          "A OpenAI lançou a ChatGPT Wallet para assinantes Pro nos EUA, permitindo que seus agentes 'dots' façam compras e pagamentos autônomos com cartões tokenizados. Na mesma semana, pesquisadores de segurança que analisaram mais de 159 mil projetos em plataformas de 'vibe coding' como a Lovable encontraram milhares de apps em produção sem autorização de backend ou Row Level Security, expondo passaportes, faturas e mais de 200 mil mensagens privadas.",
          "Colocar checkout autônomo no ar enquanto backends gerados por IA ainda esquecem regras básicas de acesso ao banco de dados é como instalar piloto automático em um carro sem freios e elogiar o acabamento dos bancos.",
          "Dar acesso a carteiras digitais para agentes antes de resolver a segurança determinística do backend apenas amplia o raio da explosão.",
        ],
      },
      de: {
        tag: "SICHERHEITS-AUTOPSIE",
        title: "Kreditkarten für KI-Agenten: ChatGPT Wallet trifft auf das 'Vibe Coding'-Datenleck",
        excerpt: "Während OpenAI Shopping-Agenten mit Wallets verknüpft, legten Tausende KI-generierte Apps wegen fehlender RLS-Regeln Reisepässe und über 200.000 Privatnachrichten offen.",
        date: "15. Nov. 2026",
        readTime: "4 Min. Lesezeit",
        metrics: [
          { label: "GELEAKTE NACHRICHTEN", val: "200.000+" },
          { label: "GEPRÜFTE PROJEKTE", val: "159.000+" },
        ],
        content: [
          "OpenAI hat ChatGPT Wallet für US-Pro-Nutzer gestartet, damit 'dots'-Agenten autonom einkaufen und über tokenisierte Karten bezahlen können. In derselben Woche deckten Sicherheitsforscher bei der Analyse von über 159.000 Projekten auf 'Vibe Coding'-Plattformen wie Lovable auf, dass Tausenden Live-Apps grundlegende Backend-Autorisierung und Row Level Security fehlen—wodurch Passnummern, Rechnungen und über 200.000 Privatnachrichten offen im Netz standen.",
          "Autonome Bezahlprozesse auszuliefern, während KI-generierte Backends noch grundlegende Datenbank-Zugriffsregeln vergessen, ist wie ein Autopilot im Auto ohne Bremsen, bei dem man die Ledersitze lobt.",
          "Agenten Zugriff auf Wallets zu geben, bevor deterministische Backend-Sicherheit gelöst ist, vergrößert nur den Schadensradius.",
        ],
      },
      ja: {
        tag: "セキュリティ解剖",
        title: "AIエージェントにクレジットカードを渡す危うさ：ChatGPT Walletとパスポート流出の「Vibe Coding」",
        excerpt: "OpenAIが自律購買エージェントにウォレットを接続した同じ週、数千のAI生成アプリがRLS設定漏れでパスポート番号や20万件以上の私信を露出した。",
        date: "2026年11月15日",
        readTime: "4分で読了",
        metrics: [
          { label: "流出した私信", val: "200,000+" },
          { label: "監査プロジェクト数", val: "159,000+" },
        ],
        content: [
          "OpenAIは米国のProユーザー向けにChatGPT Walletを公開し、自律エージェント「dots」がトークン化カードで決済まで完了できるようにした。まさに同じ週、LovableなどのAI「バイブコーディング」基盤で作られた15万9,000件超のプロジェクトを調査したセキュリティ研究者は、数千の本番アプリに基本的なバックエンド認証とRow Level Security（RLS）が欠如し、パスポート番号や請求書、20万件以上の非公開チャットがネット上に露出していることを突き止めた。",
          "AIが生成したバックエンドがデータベースの基本的なアクセス制御すら忘れている状態で自律決済を送り出すのは、ブレーキのない車に自動運転を載せて革張りシートの出来を自慢するようなものだ。",
          "決定論的なバックエンドの安全性を確保する前にエージェントへ財布を渡せば、被害の爆発半径を広げるだけに終わる。",
        ],
      },
    },
  },
  {
    slug: "nvidia-jensen-huang-megaspeed-skandali",
    tag: "DONANIM OTOPSİSİ",
    category: "donanim",
    title: "12 Milyar Dolarlık Arka Kapı: Jensen Huang İstifası ve Silikon Vadisi'nin 'Stand with Jensen' İkiyüzlülüğü",
    excerpt: "Singapur ve Malezya paravanları üzerinden Çin'e akan milyarlarca dolarlık kısıtlı GPU, Kongre celpleri ve ardından 135.000 imzayla başlatılan kurtarma tiyatrosu.",
    date: "15 Kas 2026",
    isoDate: "2026-11-15",
    readTime: "4 dk okuma",
    imageUrl: "/blog/nvidia-jensen-huang-megaspeed-skandali.jpg",
    metrics: [
      { label: "ARACI ÇİP SİPARİŞİ", val: "12 Milyar $" },
      { label: "İMZA KAMPANYASI", val: "135.000+" },
    ],
    content: [
      "33 yıllık koltuğunu bir günde bırakıp istifa eden Nvidia CEO'su Jensen Huang için Silikon Vadisi üç günde 135.000 imzalı 'Stand with Jensen' dilekçesi topladı. Ortada küçük bir detay var: Mesele masum bir ofis dedikodusu değil, Singapur merkezli Megaspeed ve Malezya bağlantılı paravan hatlar üzerinden Çin'e aktığı iddia edilen 12 milyar dolarlık kısıtlı GPU ticareti.",
      "Yıllardır ABD Kongresi'ne çıkıp 'ihracat kontrollerine harfiyen uyuyoruz, ulusal güvenlik bizim önceliğimiz' diye vaaz veren bir donanım tekelinin, aynı anda Güneydoğu Asya'daki aracı bulut ortakları üzerinden milyarlarca dolarlık çip siparişi geçmesi; kendi evine alarm sistemi satıp arka bahçe kapısını komşunun kamyonuna açık bırakan güvenlik şirketine benziyor. Yönetim kurulu iç soruşturma açıp ABD Kongresi belgeleri ve ifadeleri masaya koyunca, 600 milyar doları aşan piyasa değeri dalgalanması arasında istifa faturası kesildi.",
      "İşin en komik kısmı ise Elon Musk dahil teknoloji baronlarının hemen ertesi gün açtığı imza kampanyası oldu. Milyar dolarlık donanım tedarik zincirini devlet regülasyonlarının etrafından dolaştıran bir CEO söz konusu olduğunda, 'liyakat' ve 'etik' kuralları bir anda 'haksızlığa uğrayan dahi kurucu' romantizmine dönüşüyor. Sıradan bir mühendis şirket sunucusuna izinsiz SSH açsa kapının önüne koyan bu düzen, konu kendi hisse senedi olduğunda Change.org'dan hallice dilekçelerle adalet dağıtıyor.",
    ],
    translations: {
      en: {
        tag: "HARDWARE AUTOPSY",
        title: "The $12 Billion Back Door: Jensen Huang's Resignation and Silicon Valley's 'Stand with Jensen' Hypocrisy",
        excerpt: "Billions in restricted GPUs routed to China via Singapore and Malaysia shell partners, Congressional subpoenas, and a 135,000-signature rescue theater.",
        date: "Nov 15, 2026",
        readTime: "4 min read",
        metrics: [
          { label: "BROKERED GPU ORDERS", val: "$12 Billion" },
          { label: "PETITION SIGNATURES", val: "135,000+" },
        ],
        content: [
          "Within 72 hours of Nvidia CEO Jensen Huang abruptly resigning after 33 years at the helm, Silicon Valley rallied over 135,000 signatures for a 'Stand with Jensen' reinstatement campaign. There is just one minor detail everyone glosses over: this is not innocent office gossip, it is an alleged $12 billion pipeline of restricted GPUs brokered toward China through Singapore-based Megaspeed and Southeast Asian intermediaries.",
          "For years, the hardware monopoly stood before the U.S. Congress preaching strict adherence to export controls and national security, while billions in constrained silicon allegedly flowed through indirect cloud partners. It is the corporate equivalent of selling armored front doors while leaving the backyard gate unlocked for freight trucks. Once board inquiries and Congressional preservation demands collided with a $600B+ market-cap swing, the resignation bill came due.",
          "The punchline is watching billionaire founders—including Elon Musk—launch an open-letter rescue tour the very next morning. When a junior engineer leaves an unauthorized SSH port open, they are escorted out before lunch. When a trillion-dollar monopoly routes around federal export guardrails, 'meritocracy' suddenly turns into a Change.org petition.",
        ],
      },
      zh: {
        tag: "硬件剖析",
        title: "120亿美元的后门：黄仁勋辞职与硅谷“力挺Jensen”的虚伪剧场",
        excerpt: "经由新加坡与马来西亚中间商流向中国的数十亿美元受限GPU、美国国会传票，以及随后13.5万人签名的公关救场。",
        date: "2026年11月15日",
        readTime: "4 分钟阅读",
        metrics: [
          { label: "中间商芯片订单", val: "120亿美元" },
          { label: "请愿签名数", val: "135,000+" },
        ],
        content: [
          "执掌英伟达33年的CEO黄仁勋突然辞职后，硅谷在短短三天内为“Stand with Jensen”请愿书收集了超过13.5万个签名。但所有人都在刻意忽略一个关键细节：这并不是无伤大雅的办公室八卦，而是涉及通过新加坡Megaspeed及东南亚关联渠道向中国输送高达120亿美元受限GPU的调查风暴。",
          "多年来，这家硬件巨头在国会山反复强调自己严格遵守出口管制与国家安全底线，与此同时却任由间接云合作伙伴经手百亿美元级别的芯片订单。这就像一家安保公司高价兜售防盗门，却把后院大门向货运卡车敞开。当董事会内部调查与国会调查令撞上超过6000亿美元的市值震荡时，辞职只是迟早的代价。",
          "最讽刺的一幕是包括埃隆·马斯克在内的科技大佬们第二天就高调发起联名挽留。普通工程师若擅自开放一个SSH端口，午饭前就会被保安请出大楼；而当万亿级硬件垄断者绕开监管红线时，“精英治理”立刻变成了一场堪比请愿网站的浪漫主义表演。",
        ],
      },
      hi: {
        tag: "हार्डवेयर पोस्टमॉर्टम",
        title: "12 बिलियन डॉलर का बैकडोर: जेन्सेन हुआंग का इस्तीफा और सिलिकॉन वैली का 'Stand with Jensen' पाखंड",
        excerpt: "सिंगापुर और मलेशिया के शेल पार्टनर्स के जरिए चीन तक पहुंचे प्रतिबंधित GPU, अमेरिकी कांग्रेस के समन और 1.35 लाख हस्ताक्षरों का ड्रामा।",
        date: "15 नवम्बर 2026",
        readTime: "4 मिनट",
        metrics: [
          { label: "ब्रोकर चिप ऑर्डर", val: "$12 बिलियन" },
          { label: "याचिका हस्ताक्षर", val: "135,000+" },
        ],
        content: [
          "Nvidia के 33 साल पुराने CEO जेन्सेन हुआंग के अचानक इस्तीफे के 72 घंटों के भीतर, सिलिकॉन वैली ने 'Stand with Jensen' अभियान के लिए 1,35,000 से अधिक हस्ताक्षर जुटा लिए। लेकिन एक छोटी सी बात सब नजरअंदाज कर रहे हैं: यह कोई मामूली ऑफिस गपशप नहीं, बल्कि सिंगापुर की Megaspeed और दक्षिण-पूर्व एशियाई मध्यस्थों के जरिए चीन को कथित तौर पर $12 बिलियन के प्रतिबंधित GPU भेजने का मामला है।",
          "सालों तक अमेरिकी कांग्रेस के सामने निर्यात नियमों और राष्ट्रीय सुरक्षा का उपदेश देने वाली हार्डवेयर मोनोपॉली के चिप्स कथित तौर पर इनडायरेक्ट क्लाउड पार्टनर्स के रास्ते बहते रहे। यह ठीक वैसा ही है जैसे कोई सिक्योरिटी कंपनी बख्तरबंद दरवाजा बेचे और पिछवाड़े का गेट ट्रकों के लिए खुला छोड़ दे। जब बोर्ड की जांच और कांग्रेस के नोटिस $600 बिलियन से ज्यादा की मार्केट कैप उठापटक से टकराए, तो इस्तीफा तय था।",
          "सबसे मजेदार हिस्सा यह है कि एलन मस्क समेत टेक दिग्गजों ने अगले ही दिन ऑनलाइन याचिका शुरू कर दी। एक जूनियर इंजीनियर बिना अनुमति SSH पोर्ट खोल दे तो लंच से पहले नौकरी जाती है, लेकिन जब ट्रिलियन-डॉलर मोनोपॉली नियमों को बाईपास करे तो 'मेरिटोक्रेसी' तुरंत एक इमोशनल कैंपेन बन जाती है।",
        ],
      },
      es: {
        tag: "AUTOPSIA DE HARDWARE",
        title: "La puerta trasera de 12.000 millones: La renuncia de Jensen Huang y la hipocresía de 'Stand with Jensen'",
        excerpt: "Miles de millones en GPUs restringidas desviadas hacia China vía Singapur y Malasia, citaciones del Congreso y un teatro de 135.000 firmas.",
        date: "15 nov 2026",
        readTime: "4 min lectura",
        metrics: [
          { label: "PEDIDOS DE CHIPS", val: "12.000 M$" },
          { label: "FIRMAS REUNIDAS", val: "135.000+" },
        ],
        content: [
          "En solo 72 horas tras la repentina dimisión de Jensen Huang después de 33 años al frente de Nvidia, Silicon Valley reunió más de 135.000 firmas en la campaña 'Stand with Jensen'. Solo hay un pequeño detalle que todos omiten: no se trata de un chisme de oficina, sino de una presunta ruta de 12.000 millones de dólares en GPUs restringidas hacia China a través de Megaspeed en Singapur y filiales del Sudeste Asiático.",
          "Durante años, el monopolio del hardware predicó ante el Congreso estadounidense su cumplimiento estricto de los controles de exportación, mientras miles de millones en silicio circulaban por socios cloud indirectos. Es el equivalente corporativo de vender puertas blindadas y dejar abierto el portón trasero. Cuando la investigación interna y las citaciones del Congreso chocaron con una sacudida bursátil superior a 600.000 millones, llegó la factura.",
          "Lo más cómico fue ver a barones tecnológicos como Elon Musk lanzar una petición de rescate al día siguiente. Si un ingeniero abre un puerto SSH sin permiso, sale despedido antes del almuerzo; si un monopolio de billones esquiva controles federales, la 'meritocracia' se convierte en una campaña de firmas.",
        ],
      },
      ar: {
        tag: "تشريح العتاد",
        title: "الباب الخلفي بـ 12 مليار دولار: استقالة جنسن هوانغ ونفاق حملة 'Stand with Jensen' في وادي السيليكون",
        excerpt: "مليارات الدولارات من معالجات الرسوميات المقيدة المتدفقة نحو الصين عبر وسطاء في سنغافورة وماليزيا، واستدعاءات الكونغرس ومسرحية الـ 135 ألف توقيع.",
        date: "15 نوفمبر 2026",
        readTime: "4 دقائق",
        metrics: [
          { label: "طلبات الرقائق الوسيطة", val: "12 مليار $" },
          { label: "توقيعات الحملة", val: "135,000+" },
        ],
        content: [
          "خلال 72 ساعة فقط من الاستقالة المفاجئة للرئيس التنفيذي لشركة إنفيديا جنسن هوانغ بعد 33 عاماً في منصبه، جمع وادي السيليكون أكثر من 135 ألف توقيع لحملة 'Stand with Jensen' للمطالبة بإعادته. هناك تفصيل صغير يتجاهله الجميع: القضية ليست مجرد إشاعة مكتبية، بل شبكة طلبات مزعومة بقيمة 12 مليار دولار من معالجات GPU المقيدة التي وصلت إلى الصين عبر شركة Megaspeed في سنغافورة وشركات وسيطة في جنوب شرق آسيا.",
          "لسنوات طويلة، وقف احتكار العتاد أمام الكونغرس الأمريكي ليتحدث عن الالتزام الصارم بضوابط التصدير والأمن القومي، بينما كانت المليارات من الرقائق تتدفق عبر شركاء سحابة غير مباشرين. يشبه الأمر شركة أمنية تبيع أبواباً مصفحة وتترك بوابة الحديقة الخلفية مفتوحة للشاحنات. وعندما اصطدمت تحقيقات مجلس الإدارة واستدعاءات الكونغرس بتقلبات تجاوزت 600 مليار دولار في القيمة السوقية، حان وقت دفع الفاتورة.",
          "الجزء الأكثر سخرية هو رؤية أقطاب التكنولوجيا، ومنهم إيلون ماسك، يطلقون عريضة إنقاذ في اليوم التالي مباشرة. عندما يفتح مهندس عادي منفذ SSH غير مصرح به يُطرد قبل الغداء، أما عندما يلتف احتكار تريليوني حول ضوابط التصدير الفيدرالية، تتحول 'الجدارة' فجأة إلى عريضة توقيعات عاطفية.",
        ],
      },
      pt: {
        tag: "AUTÓPSIA DE HARDWARE",
        title: "A Porta dos Fundos de US$ 12 Bilhões: A Renúncia de Jensen Huang e a Hipocrisia do 'Stand with Jensen'",
        excerpt: "Bilhões em GPUs restritas escoadas para a China via Singapura e Malásia, intimações do Congresso e o teatro de 135 mil assinaturas.",
        date: "15 nov 2026",
        readTime: "4 min de leitura",
        metrics: [
          { label: "PEDIDOS DE CHIPS", val: "US$ 12 Bi" },
          { label: "ASSINATURAS", val: "135.000+" },
        ],
        content: [
          "Em apenas 72 horas após a renúncia abrupta de Jensen Huang depois de 33 anos no comando da Nvidia, o Vale do Silício reuniu mais de 135.000 assinaturas na campanha 'Stand with Jensen'. Há apenas um pequeno detalhe ignorado por todos: não se trata de fofoca de escritório, mas de uma suposta rota de US$ 12 bilhões em GPUs restritas intermediadas para a China via Megaspeed, em Singapura.",
          "Durante anos, o monopólio de hardware pregou ao Congresso americano respeito absoluto aos controles de exportação, enquanto bilhões em silício circulavam por parceiros indiretos no Sudeste Asiático. É o equivalente corporativo a vender portas blindadas deixando o portão dos fundos destrancado. Quando a investigação interna e as intimações do Congresso colidiram com uma oscilação superior a US$ 600 bilhões em valor de mercado, a conta chegou.",
          "A piada pronta veio no dia seguinte com bilionários como Elon Musk puxando um abaixo-assinado de resgate. Se um engenheiro abre uma porta SSH sem permissão, é demitido antes do almoço; quando um monopólio trilionário contorna regras federais, a 'meritocracia' vira petição online.",
        ],
      },
      de: {
        tag: "HARDWARE-AUTOPSIE",
        title: "Die 12-Milliarden-Dollar-Hintertür: Jensen Huangs Rücktritt und die 'Stand with Jensen'-Heuchelei",
        excerpt: "Milliarden an regulierten GPUs über Singapur und Malaysia Richtung China, US-Kongress-Vorladungen und eine 135.000-Unterschriften-Show.",
        date: "15. Nov. 2026",
        readTime: "4 Min. Lesezeit",
        metrics: [
          { label: "VERMITTELTE CHIPS", val: "12 Mrd. $" },
          { label: "UNTERSCHRIFTEN", val: "135.000+" },
        ],
        content: [
          "Binnen 72 Stunden nach dem abrupten Rücktritt von Nvidia-CEO Jensen Huang nach 33 Jahren sammelte das Silicon Valley über 135.000 Unterschriften für 'Stand with Jensen'. Ein kleines Detail wird dabei gern übersehen: Es geht nicht um harmlosen Bürotratsch, sondern um mutmaßlich 12 Milliarden Dollar an regulierten GPUs, die über Megaspeed in Singapur und südostasiatische Zwischenhändler nach China gelenkt wurden.",
          "Jahrelang predigte das Hardware-Monopol vor dem US-Kongress strikte Exportkontrollen und nationale Sicherheit, während über indirekte Cloud-Partner Milliardenwerte bewegt wurden. Das ist wie ein Sicherheitsdienst, der Panzertüren verkauft, aber das Hintertor für Lkw offen lässt. Als interne Board-Untersuchungen und Kongress-Vorladungen auf über 600 Milliarden Dollar Börsenschwankung trafen, war der Rücktritt fällig.",
          "Am absurdesten ist die Rettungskampagne von Tech-Milliardären wie Elon Musk am nächsten Morgen. Öffnet ein Entwickler unbefugt einen SSH-Port, fliegt er vor dem Mittagessen raus; umgeht ein Billionen-Konzern Exportregeln, wird plötzlich eine Petition gestartet.",
        ],
      },
      ja: {
        tag: "ハードウェア解剖",
        title: "120億ドルの裏口：ジェンスン・フアン辞任とシリコンバレー「Stand with Jensen」の偽善",
        excerpt: "シンガポールとマレーシア経由で中国へ流れたとされる規制対象GPU、米議会の召喚状、そして13.5万人の署名茶番劇。",
        date: "2026年11月15日",
        readTime: "4分で読了",
        metrics: [
          { label: "仲介チップ注文額", val: "120億ドル" },
          { label: "署名キャンペーン", val: "135,000+" },
        ],
        content: [
          "NvidiaのCEOを33年間務めたジェンスン・フアンが電撃辞任してからわずか72時間で、シリコンバレーは「Stand with Jensen」の復帰署名に13万5,000筆以上を集めた。だが誰も触れようとしない小さな事実がある。これは単なる社内のゴシップではなく、シンガポールのMegaspeedや東南アジアの仲介網を通じて中国へ流れたとされる120億ドル規模の規制GPU取引をめぐる問題だ。",
          "長年、米議会の前で「輸出規制と国家安全保障を厳格に順守している」と説教を垂れていたハードウェア独占企業の裏で、間接的なクラウド提携先を通じた巨額のチップ発注が続いていた。防弾ドアを売りながら裏口をトラック向けに開け放す警備会社と同じだ。取締役会の調査と議会の追及、そして6,000億ドル超の時価総額乱高下が重なった結果、辞任という請求書が回ってきた。",
          "最も滑稽なのは、翌朝にはイーロン・マスクらテック界の重鎮が署名運動を始めたことだ。現場のエンジニアが無断でSSHポートを開ければ昼前に解雇されるのに、1兆ドル企業のトップが輸出規制をすり抜けた途端、「実力主義」はただの署名ごっこに成り下がる。",
        ],
      },
    },
  },
  {
    slug: "claude-code-secret-leak-gitignore-skandali",
    tag: "GÜVENLİK OTOPSİSİ",
    category: "guvenlik",
    title: "1.5 Trilyon Dolarlık Değerleme, Sıfır .gitignore: Claude Code 2.500 Canlı Sırrı GitHub'a Nasıl Saçtı?",
    excerpt: "Terminalde 'Yes, and don't ask again' butonuna basan geliştiricilerin veritabanı şifreleri ve API anahtarları .claude/settings.local.json üzerinden 2.000 public repoya sızdı.",
    date: "14 Kas 2026",
    isoDate: "2026-11-14",
    readTime: "4 dk okuma",
    imageUrl: "/blog/claude-code-secret-leak-gitignore-skandali.jpg",
    metrics: [
      { label: "SIZAN CANLI SIR", val: "2.539 Secret" },
      { label: "ETKİLENEN REPO", val: "1.994 Public" },
    ],
    content: [
      "Anthropic 1.5 trilyon dolar değerlemeyle halka arza hazırlanırken, amiral gemisi Claude Code geliştiricilerin veritabanı şifrelerini ve API anahtarlarını güle oynaya public GitHub repolarına saçtı. Apiiro araştırmacılarının ortaya çıkardığı tabloya göre 1.994 public repoda 2.539 canlı sır tespit edildi.",
      "Mekanizma o kadar komik ki insan sinirlenmeye bile kıyamıyor. Terminalde ajan sizden izin isterken o masum 'Yes, and don't ask again' seçeneğine tıkladığınız an, düz metin komut satırını içindeki PGPASSWORD ve API anahtarlarıyla birlikte .claude/settings.local.json dosyasına gömüyor. Dosyayı proje düzeyinde .gitignore kuralına otomatik eklemediği için de o gizli anahtarlar ilk git push ile tüm dünyaya açılıyor.",
      "Üstelik geleneksel tarama araçları (Gitleaks, TruffleHog) komut satırı içine gömülü bu dizgilerin önemli bir bölümünü standart regex kalıplarının dışında kaldığı için yakalayamadı. Bu durum, kapısına milyon dolarlık zırhlı güvenlik sistemi taktırıp evin yedek anahtarını paspasın altına koyan site yönetimi kafasıdır. Yapay zeka ajanına kod yazdırırken konfor uğruna otomatiğe bağlanan her onay butonu, şirketin üretim ortamını halka açık panoya asıyor.",
    ],
    translations: {
      en: {
        tag: "SECURITY AUTOPSY",
        title: "$1.5 Trillion Valuation, Zero .gitignore: How Claude Code Spilled 2,500 Live Secrets onto GitHub",
        excerpt: "Clicking 'Yes, and don't ask again' in the terminal persisted database passwords and API keys into .claude/settings.local.json—exposing nearly 2,000 public repos.",
        date: "Nov 14, 2026",
        readTime: "4 min read",
        metrics: [
          { label: "LEAKED LIVE SECRETS", val: "2,539 Secrets" },
          { label: "EXPOSED REPOS", val: "1,994 Public" },
        ],
        content: [
          "While Anthropic gears up for an IPO at a reported $1.5 trillion valuation, its flagship Claude Code CLI scattered developers' database passwords and API keys across public GitHub repositories. Research from Apiiro uncovered 2,539 live credentials sitting inside 1,994 public repositories.",
          "The mechanism is almost comical: the moment a developer clicks 'Yes, and don't ask again' on a terminal permission prompt, the raw shell command—complete with inline PGPASSWORD values and API tokens—is persisted directly inside .claude/settings.local.json. Because the tool does not enforce project-level .gitignore coverage by default, the very next git push publishes those secrets to the world.",
          "Worse still, traditional secret scanners like Gitleaks and TruffleHog missed a substantial share of these command-embedded strings because they fell outside standard token regexes. Automating approval dialogs for convenience without deterministic secret isolation turns every developer workstation into a public billboard for production credentials.",
        ],
      },
      zh: {
        tag: "安全剖析",
        title: "1.5万亿美元估值，零 .gitignore 防护：Claude Code 如何将 2,500 个生产密钥泄漏到 GitHub",
        excerpt: "开发者在终端点击“Yes, and don't ask again”后，数据库密码与 API 密钥被写入 .claude/settings.local.json 并随提交暴露在近两千个公开仓库中。",
        date: "2026年11月14日",
        readTime: "4 分钟阅读",
        metrics: [
          { label: "泄漏有效密钥", val: "2,539 个" },
          { label: "受影响公开仓库", val: "1,994 个" },
        ],
        content: [
          "就在 Anthropic 以 1.5 万亿美元估值筹备上市之际，其旗舰工具 Claude Code 将大量开发者的数据库密码和 API 密钥直接写进了公开的 GitHub 仓库。Apiiro 安全团队披露，共在 1,994 个公开仓库中发现了 2,539 条有效凭证。",
          "触发机制讽刺得让人哭笑不得：当终端代理弹出权限请求时，只要开发者顺手点击“Yes, and don't ask again”，整条明文命令连同 PGPASSWORD 和 API 密钥就会被写入 .claude/settings.local.json。由于工具没有强制把该文件加入项目的 .gitignore 规则，下一次 git push 便把机密直接推向公网。",
          "更糟的是，Gitleaks 和 TruffleHog 等传统扫描工具也漏掉了大量嵌套在命令行字符串中的凭据。为了操作便利而把权限审批自动化，却不做确定性的密钥隔离，无异于把生产环境挂在公共布告栏上。",
        ],
      },
      hi: {
        tag: "सुरक्षा पोस्टमॉर्टम",
        title: "$1.5 ट्रिलियन वैल्यूएशन, शून्य .gitignore: Claude Code ने GitHub पर 2,500 लाइव सीक्रेट कैसे लीक किए?",
        excerpt: "टर्मिनल में 'Yes, and don't ask again' दबाने पर डेटाबेस पासवर्ड और API कीज़ .claude/settings.local.json के जरिए 1,994 पब्लिक रेपो में चली गईं।",
        date: "14 नवम्बर 2026",
        readTime: "4 मिनट",
        metrics: [
          { label: "लीक लाइव सीक्रेट", val: "2,539 सीक्रेट" },
          { label: "प्रभावित रेपो", val: "1,994 पब्लिक" },
        ],
        content: [
          "एक तरफ Anthropic $1.5 ट्रिलियन वैल्यूएशन के साथ IPO की तैयारी कर रहा है, वहीं उसके प्रमुख टूल Claude Code ने डेवलपर्स के डेटाबेस पासवर्ड और API कीज़ को पब्लिक GitHub रिपॉजिटरी में बिखेर दिया। Apiiro के शोध में 1,994 पब्लिक रेपो में 2,539 सक्रिय क्रेडेंशियल मिले।",
          "इसका तरीका बेहद चौंकाने वाला है: जैसे ही डेवलपर टर्मिनल में 'Yes, and don't ask again' चुनता है, PGPASSWORD और API टोकन सहित पूरा प्लेन-टेक्स्ट कमांड .claude/settings.local.json में सेव हो जाता है। डिफ़ॉल्ट रूप से .gitignore में सुरक्षा न होने के कारण अगले ही git push में ये सीक्रेट सार्वजनिक हो जाते हैं।",
          "पारंपरिक स्कैनर (Gitleaks, TruffleHog) भी कमांड स्ट्रिंग में छिपे इन टोकन को पकड़ने में चूक गए। सुविधा के लिए ऑटो-अप्रूवल बटन दबाना प्रोडक्शन एनवायरनमेंट को खुले इंटरनेट पर टांगने जैसा है।",
        ],
      },
      es: {
        tag: "AUTOPSIA DE SEGURIDAD",
        title: "Valoración de 1,5 billones, cero .gitignore: Cómo Claude Code filtró 2.500 secretos en vivo en GitHub",
        excerpt: "Pulsar 'Yes, and don't ask again' guardó contraseñas y claves API en .claude/settings.local.json, exponiéndolas en 1.994 repositorios públicos.",
        date: "14 nov 2026",
        readTime: "4 min lectura",
        metrics: [
          { label: "SECRETOS EXPUESTOS", val: "2.539" },
          { label: "REPOS AFECTADOS", val: "1.994 Públicos" },
        ],
        content: [
          "Mientras Anthropic prepara su salida a bolsa con una valoración de 1,5 billones de dólares, su herramienta estrella Claude Code esparció contraseñas de bases de datos y claves API por repositorios públicos de GitHub. Los investigadores de Apiiro detectaron 2.539 credenciales activas en 1.994 repositorios públicos.",
          "El mecanismo resulta casi cómico: en el instante en que el desarrollador pulsa 'Yes, and don't ask again', la línea de comandos completa—junto con variables como PGPASSWORD y tokens API—se guarda en texto plano dentro de .claude/settings.local.json. Al no añadirse automáticamente al .gitignore del proyecto, el primer git push las publica ante todo el mundo.",
          "Incluso herramientas tradicionales como Gitleaks o TruffleHog pasaron por alto gran parte de estas cadenas incrustadas en comandos. Automatizar confirmaciones por comodidad sin aislamiento determinista de secretos expone la infraestructura productiva en un tablón público.",
        ],
      },
      ar: {
        tag: "تشريح أمني",
        title: "تقييم 1.5 تريليون دولار وصفر .gitignore: كيف سرّب Claude Code نحو 2,500 سرّ مباشر إلى GitHub؟",
        excerpt: "النقر على 'Yes, and don't ask again' في الطرفية أدى لحفظ كلمات مرور قواعد البيانات ومفاتيح API داخل .claude/settings.local.json وكشفها في 1,994 مستودعاً عاماً.",
        date: "14 نوفمبر 2026",
        readTime: "4 دقائق",
        metrics: [
          { label: "أسرار مباشرة مسربة", val: "2,539 سرّاً" },
          { label: "المستودعات المتأثرة", val: "1,994 عامّاً" },
        ],
        content: [
          "بينما تستعد Anthropic للطرح العام بتقييم يصل إلى 1.5 تريليون دولار، تسببت أداتها الرئيسية Claude Code في تسريب كلمات مرور قواعد البيانات ومفاتيح API إلى مستودعات GitHub العامة. وكشف باحثو Apiiro عن 2,539 بيانات اعتماد نشطة في 1,994 مستودعاً عاماً.",
          "الآلية مثيرة للسخرية: بمجرد أن ينقر المطور على 'Yes, and don't ask again' عند طلب الصلاحية، يُحفظ أمر الصدفة كاملاً بنص واضح—بما فيه PGPASSWORD ومفاتيح API—داخل ملف .claude/settings.local.json. وبسبب عدم إدراج الملف تلقائياً في .gitignore، ينشر أول أمر git push تلك الأسرار للعالم بأسره.",
          "الأسوأ أن أدوات الفحص التقليدية مثل Gitleaks وTruffleHog أخفقت في رصد جزء كبير من هذه السلاسل المدمجة. إن أتمتة أزرار الموافقة طلباً للراحة دون عزل حتمي للأسرار يضع بيئة الإنتاج على لوحة إعلانات عامة.",
        ],
      },
      pt: {
        tag: "AUTÓPSIA DE SEGURANÇA",
        title: "Valuation de US$ 1,5 Trilhão, Zero .gitignore: Como o Claude Code Vazou 2.500 Segredos no GitHub",
        excerpt: "Clicar em 'Yes, and don't ask again' salvou senhas e chaves API em .claude/settings.local.json, expondo quase 2.000 repositórios públicos.",
        date: "14 nov 2026",
        readTime: "4 min de leitura",
        metrics: [
          { label: "SEGREDOS VAZADOS", val: "2.539" },
          { label: "REPOS EXPOSTOS", val: "1.994 Públicos" },
        ],
        content: [
          "Enquanto a Anthropic se prepara para um IPO avaliada em US$ 1,5 trilhão, seu carro-chefe Claude Code espalhou senhas de bancos de dados e chaves de API em repositórios públicos do GitHub. Pesquisadores da Apiiro identificaram 2.539 credenciais ativas em 1.994 repositórios públicos.",
          "O mecanismo chega a ser cômico: no instante em que o desenvolvedor clica em 'Yes, and don't ask again', o comando em texto puro—incluindo PGPASSWORD e tokens de API—é gravado em .claude/settings.local.json. Sem a inclusão automática no .gitignore do projeto, o primeiro git push publica tudo.",
          "Ferramentas tradicionais como Gitleaks e TruffleHog não detectaram boa parte dessas strings embutidas em comandos. Automatizar aprovações por conveniência sem isolamento determinístico de segredos coloca o ambiente de produção em um outdoor público.",
        ],
      },
      de: {
        tag: "SICHERHEITS-AUTOPSIE",
        title: "1,5 Billionen Dollar Bewertung, null .gitignore: Wie Claude Code 2.500 Live-Secrets auf GitHub streute",
        excerpt: "Ein Klick auf 'Yes, and don't ask again' speicherte Datenbank-Passwörter und API-Keys in .claude/settings.local.json—und legte 1.994 öffentliche Repos offen.",
        date: "14. Nov. 2026",
        readTime: "4 Min. Lesezeit",
        metrics: [
          { label: "GELEAKTE SECRETS", val: "2.539" },
          { label: "BETROFFENE REPOS", val: "1.994 Öffentlich" },
        ],
        content: [
          "Während Anthropic mit einer Bewertung von 1,5 Billionen Dollar auf den Börsengang zusteuert, verteilte sein Flaggschiff Claude Code Datenbank-Passwörter und API-Keys in öffentliche GitHub-Repositories. Apiiro-Forscher entdeckten 2.539 aktive Zugangsdaten in 1.994 öffentlichen Repos.",
          "Der Mechanismus ist fast grotesk: Klickt ein Entwickler im Terminal auf 'Yes, and don't ask again', wird der Klartextbefehl samt PGPASSWORD und API-Tokens in .claude/settings.local.json gespeichert. Da die Datei nicht automatisch im .gitignore landet, veröffentlicht der nächste git push sämtliche Geheimnisse.",
          "Zudem übersahen klassische Scanner wie Gitleaks und TruffleHog einen Großteil dieser in Shell-Befehle eingebetteten Strings. Bequemlichkeits-Auto-Freigaben ohne deterministische Secret-Isolation machen die Produktionsumgebung zum öffentlichen Aushang.",
        ],
      },
      ja: {
        tag: "セキュリティ解剖",
        title: "評価額1.5兆ドル、.gitignoreはゼロ：Claude Codeが2,500件の本番シークレットをGitHubに撒き散らした経緯",
        excerpt: "ターミナルで「Yes, and don't ask again」を押した瞬間、DBパスワードやAPIキーが .claude/settings.local.json に保存され、約2,000の公開リポジトリへ流出した。",
        date: "2026年11月14日",
        readTime: "4分で読了",
        metrics: [
          { label: "流出した有効シークレット", val: "2,539 件" },
          { label: "影響を受けた公開リポジトリ", val: "1,994 件" },
        ],
        content: [
          "Anthropicが1.5兆ドル規模の評価額でIPO準備を進める中、主力ツールであるClaude Codeが開発者のデータベースパスワードやAPIキーを公開GitHubリポジトリへ流出させた。Apiiroの研究者らは1,994件の公開リポジトリから2,539個の有効な認証情報を検出した。",
          "仕組みはあまりに皮肉だ。ターミナルで権限確認が出た際に「Yes, and don't ask again」を選ぶと、PGPASSWORDやAPIトークンを含んだ生のコマンド文字列が .claude/settings.local.json に平文保存される。プロジェクト側の .gitignore への自動追加が徹底されないため、次の git push で世界に公開されてしまう。",
          "さらにGitleaksやTruffleHogといった従来型スキャナーも、コマンド文字列内に埋め込まれた認証情報の多くを正規表現外として見逃していた。利便性のために承認ボタンを自動化する設計は、本番環境の鍵を公共の掲示板に貼り出す行為に等しい。",
        ],
      },
    },
  },
  {
    slug: "microsoft-ve-claude-cokus-bulut-sla-yalani",
    tag: "MİMARİ OTOPSİ",
    category: "mimari",
    title: "Bulutun %99.99 SLA Yalanı: Microsoft ve Claude Aynı Gün Çökünce Korkan CTO'lar",
    excerpt: "Microsoft 365 12 saat kilitlendi, Anthropic auth motoru Claude Code oturumlarını kesti. Dijital egemenliğini kapalı bulutlara devreden kurumsal dünyanın kırılganlık anatomisi.",
    date: "13 Kas 2026",
    isoDate: "2026-11-13",
    readTime: "4 dk okuma",
    imageUrl: "/blog/microsoft-ve-claude-cokus-bulut-sla-yalani.png",
    metrics: [
      { label: "KESİNTİ SÜRESİ", val: "12+ Saat" },
      { label: "ETKİLENEN ALTYAPI", val: "M365 & Claude" },
    ],
    content: [
      "Yıllık bütçe toplantılarında 'her şeyi buluta taşıdık, artık %99.99 SLA garantimiz var' diye sunum yapan kurumsal slaytların mürekkebi yine kurudu. Bugün Microsoft 365 küresel çapta fişi çekti; Outlook, Teams, Exchange ve Copilot tam 12 saat boyunca dünya genelinde milyonlarca şirketi taş devrine döndürdü. Aynı saatlerde Anthropic tarafı da auth krizine girip Claude Code oturumlarını kilitleyince, kurumsal dünyanın bütün dijital egemenliği tek bir öğleden sonrada buharlaştı.",
      "Mesele bir sunucunun çökmesi değil. Mesele, trilyon dolarlık teknoloji tekellerinin pazarladığı 'biz sizin yerinize her şeyi yönetiriz, siz sadece faturayı ödeyin' konforunun aslında dev bir dijital rehin alma operasyonu olması. Kendi sunucusunu yönetmekten korkup bütün operasyonunu iki tane kapalı API ve üç tane bulut servisine bağlayan şirketler; bugün çalışanlarına 'mailler gitmiyor, WhatsApp'tan yazışalım' derken teknolojiyi değil çaresizliği yönettiler.",
      "Bir şirketin kendi donanımında, kendi konteynerinde veya kendi yerel ağında çalıştıramadığı hiçbir yazılım o şirkete ait değildir. Sadece aylık kira ödediğiniz şık bir bağımlılıktır. Ve o kirayı verdiğiniz efendiler içeride bir auth servisini patlattığında, yüzlerce kıdemli mühendisiniz ekrana boş boş bakıp kahve içmekten başka hiçbir şey yapamaz.",
    ],
    translations: {
      en: {
        tag: "ARCHITECTURAL AUTOPSY",
        title: "The Cloud's 99.99% SLA Myth: Panic in the C-Suite When Microsoft and Claude Went Down Together",
        excerpt: "Microsoft 365 locked up for 12 hours while Anthropic's auth outage severed Claude Code sessions—exposing the fragility of enterprises built on closed cloud dependencies.",
        date: "Nov 13, 2026",
        readTime: "4 min read",
        metrics: [
          { label: "OUTAGE DURATION", val: "12+ Hours" },
          { label: "AFFECTED STACK", val: "M365 & Claude" },
        ],
        content: [
          "The ink barely dried on annual budget slides boasting 'everything is in the cloud with a 99.99% SLA.' Microsoft 365 suffered a global blackout across Outlook, Teams, Exchange, and Copilot for over 12 hours, while Anthropic's authentication outage simultaneously locked out Claude Code sessions—evaporating corporate digital sovereignty in a single afternoon.",
          "The issue is not a single crashed server. It is the illusion sold by trillion-dollar cloud monopolies: 'we manage everything, you just pay the invoice.' Companies that outsourced their entire operational spine to two closed APIs and three cloud SaaS vendors spent the day coordinating enterprise operations over WhatsApp.",
          "Software that a company cannot run on its own hardware, containers, or local network does not belong to that company—it is merely a subscription dependency. When an upstream auth gateway fails, hundreds of senior engineers can do nothing except stare at error banners.",
        ],
      },
      zh: {
        tag: "架构剖析",
        title: "云端 99.99% SLA 的谎言：当微软与 Claude 同日宕机时惊慌的 CTO 们",
        excerpt: "Microsoft 365 瘫痪 12 小时，Anthropic 鉴权故障切断 Claude Code 会话——将数字主权拱手让给封闭云厂商的脆弱性解剖。",
        date: "2026年11月13日",
        readTime: "4 分钟阅读",
        metrics: [
          { label: "故障持续时长", val: "12+ 小时" },
          { label: "受影响基础设施", val: "M365 & Claude" },
        ],
        content: [
          "年度预算会上刚吹嘘完“全量上云、享有 99.99% SLA 保障”，Microsoft 365 就上演了长达 12 小时的全球大断网，Outlook、Teams、Exchange 与 Copilot 集体熄火。同一时段 Anthropic 鉴权服务崩溃并锁死 Claude Code 会话，整个企业界的数字主权在一个下午化为乌有。",
          "问题从来不是某一台服务器宕机，而是科技巨头兜售的“托管便利”本质上是一场数字人质劫持。把核心业务全盘押注在少数闭源 API 与云服务上的企业，当天只能靠聊天软件维持办公秩序。",
          "任何无法在自有硬件、自有容器或局域网内运行的软件，都不真正属于你的公司；它只是你按月付费的精致依赖。一旦上游鉴权节点崩溃，再多资深工程师也只能对着报错页面喝咖啡。",
        ],
      },
      hi: {
        tag: "आर्किटेक्चर पोस्टमॉर्टम",
        title: "क्लाउड का 99.99% SLA झूठ: एक ही दिन Microsoft और Claude के क्रैश होने पर CTOs में हड़कंप",
        excerpt: "Microsoft 365 पूरे 12 घंटे ठप रहा और Anthropic ऑथ एरर ने Claude Code सेशन काट दिए—बंद क्लाउड निर्भरता की नाजुक हकीकत।",
        date: "13 नवम्बर 2026",
        readTime: "4 मिनट",
        metrics: [
          { label: "आउटेज अवधि", val: "12+ घंटे" },
          { label: "प्रभावित इन्फ्रा", val: "M365 व Claude" },
        ],
        content: [
          "सालाना बजट प्रेजेंटेशन में 'हमने सब क्लाउड पर शिफ्ट कर दिया, 99.99% SLA पक्का है' बोलने वाली स्लाइड्स की स्याही भी नहीं सूखी थी कि Microsoft 365 ने वैश्विक स्तर पर दम तोड़ दिया। Outlook, Teams, Exchange और Copilot 12 घंटे तक ठप रहे और उसी समय Anthropic के ऑथ क्रैश ने Claude Code सेशन बंद कर दिए।",
          "समस्या सिर्फ एक सर्वर के गिरने की नहीं है। असली मुद्दा यह है कि ट्रिलियन-डॉलर मोनोपॉली द्वारा बेचा गया 'हम सब संभाल लेंगे, आप बस बिल भरें' का आराम असल में डिजिटल निर्भरता का जाल है।",
          "जो सॉफ्टवेयर कोई कंपनी अपने हार्डवेयर, अपने कंटेनर या लोकल नेटवर्क पर नहीं चला सकती, वह उस कंपनी का नहीं बल्कि किराए की एक निर्भरता मात्र है।",
        ],
      },
      es: {
        tag: "AUTOPSIA ARQUITECTÓNICA",
        title: "El mito del 99,99% de SLA en la nube: El pánico de los CTO cuando Microsoft y Claude cayeron el mismo día",
        excerpt: "Microsoft 365 quedó bloqueado 12 horas y el fallo de autenticación de Anthropic cortó Claude Code, exponiendo la fragilidad de depender de nubes cerradas.",
        date: "13 nov 2026",
        readTime: "4 min lectura",
        metrics: [
          { label: "DURACIÓN DEL CORTE", val: "12+ Horas" },
          { label: "INFRAESTRUCTURA", val: "M365 y Claude" },
        ],
        content: [
          "Apenas se secó la tinta de las presentaciones anuales presumiendo un SLA del 99,99% en la nube. Microsoft 365 desconectó Outlook, Teams, Exchange y Copilot durante más de 12 horas a escala global, mientras una caída de autenticación de Anthropic bloqueó Claude Code en las mismas horas.",
          "El problema no es la caída aislada de un servidor, sino haber entregado toda la columna vertebral operativa a dos API cerradas y tres proveedores cloud bajo la promesa de comodidad total.",
          "Todo software que una empresa no pueda ejecutar en su propio hardware, sus propios contenedores o su red local no le pertenece: es solo una dependencia de alquiler.",
        ],
      },
      ar: {
        tag: "تشريح معماري",
        title: "أكذوبة الـ 99.99% SLA السحابية: ذعر المديرين التقنيين عند تعطل Microsoft وClaude في يوم واحد",
        excerpt: "توقف Microsoft 365 لمدة 12 ساعة وتعطلت مصادقة Anthropic لتفصل جلسات Claude Code—تشريح هشاشة تسليم السيادة الرقمية للسحابات المغلقة.",
        date: "13 نوفمبر 2026",
        readTime: "4 دقائق",
        metrics: [
          { label: "مدة الانقطاع", val: "+12 ساعة" },
          { label: "البنية المتأثرة", val: "M365 وClaude" },
        ],
        content: [
          "لم يجف بعد حبر عروض الميزانية السنوية التي تتباهى بضمان 99.99% SLA في السحابة، حتى انقطع Microsoft 365 عالمياً لأكثر من 12 ساعة شمل Outlook وTeams وExchange وCopilot، وتزامن ذلك مع عطل مصادقة لدى Anthropic أوقف جلسات Claude Code.",
          "المشكلة ليست في تعطل خادم واحد، بل في وهم الراحة الذي تبيعه احتكارات التكنولوجيا مقابل ربط كامل العمليات التشغيلية بواجهتي برمجة مغلقتين وثلاث خدمات سحابية.",
          "أي برمجية لا تستطيع الشركة تشغيلها على عتادها الخاص أو حاوياتها أو شبكتها المحلية لا تنتمي إليها فعلياً، بل هي مجرد اشتراك رهين بإرادة المزوّد.",
        ],
      },
      pt: {
        tag: "AUTÓPSIA ARQUITETURAL",
        title: "O Mito do SLA de 99,99% na Nuvem: O Pânico dos CTOs Quando Microsoft e Claude Caíram no Mesmo Dia",
        excerpt: "O Microsoft 365 travou por 12 horas e a falha de autenticação da Anthropic derrubou o Claude Code—anatomia da fragilidade corporativa em nuvens fechadas.",
        date: "13 nov 2026",
        readTime: "4 min de leitura",
        metrics: [
          { label: "DURAÇÃO DA QUEDA", val: "12+ Horas" },
          { label: "INFRA AFETADA", val: "M365 e Claude" },
        ],
        content: [
          "A tinta das apresentações anuais celebrando '99,99% de SLA na nuvem' mal secou quando o Microsoft 365 tirou Outlook, Teams, Exchange e Copilot do ar por mais de 12 horas no mundo todo, no mesmo instante em que uma pane de autenticação da Anthropic travou sessões do Claude Code.",
          "O problema não é a queda de um servidor, mas a terceirização total da espinha dorsal operacional para duas APIs fechadas e três provedores em nuvem.",
          "Nenhum software que uma empresa não consiga rodar em seu próprio hardware, seus contêineres ou rede local pertence a ela: trata-se apenas de uma dependência alugada.",
        ],
      },
      de: {
        tag: "ARCHITEKTUR-AUTOPSIE",
        title: "Die 99,99-%-SLA-Lüge der Cloud: Panik in den Chefetagen, als Microsoft und Claude am selben Tag ausfielen",
        excerpt: "Microsoft 365 fiel global über 12 Stunden aus, während Anthropics Auth-Störung Claude Code sperrte—eine Anatomie geschlossener Cloud-Abhängigkeiten.",
        date: "13. Nov. 2026",
        readTime: "4 Min. Lesezeit",
        metrics: [
          { label: "AUSFALLDAUER", val: "12+ Stunden" },
          { label: "BETROFFENE INFRA", val: "M365 & Claude" },
        ],
        content: [
          "Kaum waren die jährlichen Budgetfolien mit dem Versprechen von 99,99 % Cloud-SLA präsentiert, fielen Outlook, Teams, Exchange und Copilot bei Microsoft 365 weltweit über 12 Stunden aus—zeitgleich legte ein Auth-Ausfall bei Anthropic die Claude-Code-Sitzungen lahm.",
          "Das Problem ist kein einzelner abgestürzter Server, sondern das blinde Auslagern der gesamten operativen Basis an zwei geschlossene APIs und drei Cloud-Monopole.",
          "Keine Software, die ein Unternehmen nicht auf eigener Hardware, in eigenen Containern oder im lokalen Netz betreiben kann, gehört diesem Unternehmen wirklich—sie ist nur eine gemietete Abhängigkeit.",
        ],
      },
      ja: {
        tag: "アーキテクチャ解剖",
        title: "クラウド99.99% SLAの神話：MicrosoftとClaudeが同日ダウンした日にCTOたちが直面した現実",
        excerpt: "Microsoft 365が12時間以上停止し、Anthropicの認証障害がClaude Codeを遮断。閉鎖型クラウドへデジタル主権を委ねた企業の脆弱性を解剖する。",
        date: "2026年11月13日",
        readTime: "4分で読了",
        metrics: [
          { label: "障害継続時間", val: "12時間以上" },
          { label: "影響インフラ", val: "M365 & Claude" },
        ],
        content: [
          "年間予算会議で「99.99%のSLA保証付きクラウドへ完全移行した」と豪語したスライドのインクも乾かぬうちに、Microsoft 365が世界規模で12時間以上停止し、同時間帯にAnthropicの認証基盤も落ちてClaude Codeがロックされた。",
          "本質は単発のサーバー障害ではない。業務の中枢を丸ごと少数の閉鎖型APIとクラウド独占企業へ預け切った結果、デジタル主権が一晩で蒸発する構造にある。",
          "自社ハードウェアやコンテナ、ローカルネットワークで動かせないソフトウェアは所有物ではなく月額課金の依存関係に過ぎない。上流の認証基盤が止まれば、熟練エンジニアもエラー画面を眺めるだけになる。",
        ],
      },
    },
  },
  {
    slug: "meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari",
    tag: "MİMARİ OTOPSİ",
    category: "mimari",
    title: 'Meta Mühendisinin AI İtirafı: "Kodun %90\'ını Yapay Zekâya Yazdırdık, Canlı Ortam Çöktü"',
    excerpt: "Yönetimler 'daha çok commit' baskısı kurdukça mimari kırılganlık sessizce büyüdü. İlk karmaşık ağ dalgalanmasında prod ortamının çöküş anatomisi.",
    date: "11 Kas 2026",
    isoDate: "2026-11-11",
    readTime: "4 dk okuma",
    imageUrl: "/blog/meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari.png",
    metrics: [
      { label: "YAPAY ZEKA PAYI", val: "%90 Üretim" },
      { label: "KIRILMA ALANI", val: "Edge-Cases" },
    ],
    content: [
      "Yönetimler 'daha çok commit' baskısı kurdukça, mühendislerin kovulmamak için tek çaresi kodun %90'ını yapay zekâya ürettirmek oldu. Çıktı hacmi ve verimlilik grafikleri tavana vururken, gerçek mimari kırılganlık sessizce büyüdü.",
      "Meta'da kıdemli bir yazılım mühendisinin itiraf ettiği gibi: Kod üretimi 10 katına fırladı ancak kimse üretilen kodun sınır durumlarını (edge-cases) derinlemesine bilmediği için ilk karmaşık ağ dalgalanmasında prod ortamı çöktü.",
      "Yapay zekâ sözdizimini (syntax) mükemmel yazar ama sistem mimarisi, dağıtık mutabakat ve deterministik kararlılık insanın sorumluluğundadır.",
    ],
    translations: {
      en: {
        tag: "ARCHITECTURAL AUTOPSY",
        title: "Meta Engineer's AI Confession: 'We Had AI Write 90% of the Code, and Production Collapsed'",
        excerpt: "As management demanded higher commit velocity, silent architectural fragility accumulated until the first complex network spike took down production.",
        date: "Nov 11, 2026",
        readTime: "4 min read",
        metrics: [
          { label: "AI CODE SHARE", val: "90% Generated" },
          { label: "FAILURE DOMAIN", val: "Edge-Cases" },
        ],
        content: [
          "As executive dashboards pressed for relentless commit velocity, engineers had little choice but to let LLMs generate 90% of their codebase. Throughput metrics hit all-time highs while unexamined architectural debt silently compounded beneath the surface.",
          "As a senior Meta engineer admitted, code output jumped 10x—yet nobody truly understood the subtle edge cases of the generated logic. On the very first complex network jitter, production collapsed.",
          "LLMs produce immaculate syntax at high speed, but system invariants, distributed consensus, and deterministic resilience remain the non-negotiable responsibility of human engineers.",
        ],
      },
      zh: {
        tag: "架构剖析",
        title: "Meta 工程师的 AI 坦白局：“90% 的代码交给 AI 写，结果生产环境崩了”",
        excerpt: "当管理层一味追求提交量时，隐性架构脆弱性悄然堆积，并在第一次复杂网络波动中击垮了线上系统。",
        date: "2026年11月11日",
        readTime: "4 分钟阅读",
        metrics: [
          { label: "AI 代码占比", val: "90% 生成" },
          { label: "崩溃边界", val: "Edge-Cases" },
        ],
        content: [
          "随着管理层不断施压要求“更多提交”，工程师为了保住工作只能将 90% 的代码交给 AI 生成。表面上的产出效率飙升至新高，真实的架构脆弱性却在暗处疯狂滋长。",
          "正如一位 Meta 资深工程师所坦白的那样：代码产量翻了十倍，但团队里没人真正吃透这些生成代码的边界条件（edge cases），于是第一次遇到复杂网络抖动，生产环境便应声倒下。",
          "AI 能写出工整的语法，但系统架构、分布式一致性与确定性稳定性永远是人类工程师不可推卸的责任。",
        ],
      },
      hi: {
        tag: "आर्किटेक्चर पोस्टमॉर्टम",
        title: "Meta इंजीनियर का AI कबूलनामा: 'हमने 90% कोड AI से लिखवाया और प्रोडक्शन क्रैश हो गया'",
        excerpt: "मैनेजमेंट के 'ज्यादा कमिट' दबाव में आर्किटेक्चरल कमजोरी चुपचाप बढ़ती गई और पहले ही बड़े नेटवर्क उतार-चढ़ाव में सिस्टम बैठ गया।",
        date: "11 नवम्बर 2026",
        readTime: "4 मिनट",
        metrics: [
          { label: "AI कोड हिस्सा", val: "90% उत्पादन" },
          { label: "विफलता क्षेत्र", val: "Edge-Cases" },
        ],
        content: [
          "जब प्रबंधन ने 'ज्यादा कमिट' का दबाव बढ़ाया, तो इंजीनियरों के पास 90% कोड AI से जेनरेट करवाने के अलावा कोई रास्ता नहीं बचा। आउटपुट ग्राफ आसमान छू रहे थे, जबकि अंदर ही अंदर सिस्टम कमजोर हो रहा था।",
          "Meta के एक सीनियर इंजीनियर के मुताबिक कोड उत्पादन 10 गुना हो गया, लेकिन जेनरेटेड लॉजिक के एज-केस कोई गहराई से नहीं समझता था—नतीजा पहले ही जटिल नेटवर्क स्पाइक में प्रोडक्शन ठप हो गया।",
          "AI सिंटैक्स बखूबी लिखता है, पर सिस्टम आर्किटेक्चर, डिस्ट्रीब्यूटेड कंसेंसस और निर्धारक स्थिरता इंसान इंजीनियर की ही जिम्मेदारी है।",
        ],
      },
      es: {
        tag: "AUTOPSIA ARQUITECTÓNICA",
        title: "La confesión de un ingeniero de Meta: 'Hicimos que la IA escribiera el 90% del código y producción colapsó'",
        excerpt: "Mientras la dirección exigía más commits, la fragilidad arquitectónica creció en silencio hasta derribar producción en el primer pico de red.",
        date: "11 nov 2026",
        readTime: "4 min lectura",
        metrics: [
          { label: "CUOTA DE IA", val: "90% Generado" },
          { label: "DOMINIO DE FALLO", val: "Edge-Cases" },
        ],
        content: [
          "A medida que la gerencia presionaba por más commits, la única salida de muchos ingenieros fue delegar el 90% del código a la IA. Las métricas de volumen se dispararon mientras la fragilidad estructural crecía en silencio.",
          "Como confesó un ingeniero sénior de Meta, la producción de código se multiplicó por diez, pero nadie conocía a fondo los casos límite del código generado; ante la primera fluctuación compleja de red, producción se cayó.",
          "La IA redacta sintaxis impecable, pero la arquitectura de sistemas, el consenso distribuido y la estabilidad determinista siguen siendo responsabilidad del ingeniero humano.",
        ],
      },
      ar: {
        tag: "تشريح معماري",
        title: "اعتراف مهندس Meta: 'جعلنا الذكاء الاصطناعي يكتب 90% من الكود، فانهارت بيئة الإنتاج'",
        excerpt: "مع ضغط الإدارة لزيادة عدد الـ commits، تراكمت الهشاشة المعمارية بصمت حتى سقط الإنتاج عند أول اضطراب معقد في الشبكة.",
        date: "11 نوفمبر 2026",
        readTime: "4 دقائق",
        metrics: [
          { label: "حصة الذكاء الاصطناعي", val: "90% توليد" },
          { label: "نطاق الفشل", val: "Edge-Cases" },
        ],
        content: [
          "مع تزايد ضغط الإدارات لرفع وتيرة الـ commits، لم يجد المهندسون مفراً من ترك الذكاء الاصطناعي يكتب 90% من الكود. ارتفعت مؤشرات الإنتاجية الظاهرية بينما كانت الهشاشة المعمارية تتضخم في الخفاء.",
          "وكما اعترف مهندس برمجيات أول في Meta، تضاعف إنتاج الكود 10 مرات، لكن لم يكن أحد يفهم الحالات الحدية (edge-cases) للكود المولّد بعمق، فانهارت بيئة الإنتاج عند أول تقلب معقد في الشبكة.",
          "يكتب الذكاء الاصطناعي الصياغة النحوية بإتقان، لكن هندسة الأنظمة والتوافق الموزع والاستقرار الحتمي تبقى مسؤولية المهندس البشري.",
        ],
      },
      pt: {
        tag: "AUTÓPSIA ARQUITETURAL",
        title: "A Confissão do Engenheiro da Meta: 'Mandamos a IA Escrever 90% do Código e a Produção Caiu'",
        excerpt: "Sob pressão por mais commits, a fragilidade arquitetural cresceu em silêncio até derrubar a produção na primeira oscilação complexa de rede.",
        date: "11 nov 2026",
        readTime: "4 min de leitura",
        metrics: [
          { label: "PARTICIPAÇÃO DA IA", val: "90% Gerado" },
          { label: "DOMÍNIO DE FALHA", val: "Edge-Cases" },
        ],
        content: [
          "À medida que a gestão cobrava mais commits, engenheiros passaram a delegar 90% do código para modelos de IA. Os gráficos de produtividade dispararam enquanto a fragilidade estrutural crescia silenciosamente.",
          "Como admitiu um engenheiro sênior da Meta, a geração de código saltou 10x, mas ninguém dominava os casos extremos (edge cases) da lógica gerada—e na primeira instabilidade de rede a produção colapsou.",
          "A IA escreve sintaxe impecável, mas arquitetura de sistemas, consenso distribuído e resiliência determinística continuam sob responsabilidade humana.",
        ],
      },
      de: {
        tag: "ARCHITEKTUR-AUTOPSIE",
        title: "KI-Geständnis eines Meta-Ingenieurs: '90 % des Codes kamen von der KI—dann brach die Produktion zusammen'",
        excerpt: "Unter dem Druck nach immer mehr Commits wuchs die architektonische Fragilität im Verborgenen, bis die erste Netzschwankung das System kippte.",
        date: "11. Nov. 2026",
        readTime: "4 Min. Lesezeit",
        metrics: [
          { label: "KI-CODE-ANTEIL", val: "90 % Generiert" },
          { label: "FEHLERDOMÄNE", val: "Edge-Cases" },
        ],
        content: [
          "Als das Management immer mehr Commits einforderte, ließen Entwickler 90 % des Codes von KI generieren. Während Produktivitätscharts Rekorde meldeten, wuchs im Hintergrund stille architektonische Fragilität.",
          "Wie ein Senior-Ingenieur bei Meta einräumte, verzehnfachte sich der Code-Output—doch niemand kannte die Grenzfälle des generierten Codes genau, sodass die Produktion bei der ersten komplexen Netzschwankung abstürzte.",
          "KI beherrscht Syntax perfekt, aber Systemarchitektur, verteilter Konsens und deterministische Stabilität bleiben menschliche Ingenieursverantwortung.",
        ],
      },
      ja: {
        tag: "アーキテクチャ解剖",
        title: "MetaエンジニアのAI告白：「コードの90%をAIに書かせたら本番環境が崩壊した」",
        excerpt: "コミット数を求める経営陣の圧力の下で静かに蓄積した設計上の脆さが、最初の複雑なネットワーク揺らぎで本番障害を引き起こした。",
        date: "2026年11月11日",
        readTime: "4分で読了",
        metrics: [
          { label: "AI生成コード比率", val: "90% 生成" },
          { label: "障害発生領域", val: "Edge-Cases" },
        ],
        content: [
          "経営陣が「さらなるコミット数」を迫るにつれ、現場のエンジニアはコードの90%をAIに生成させざるを得なくなった。見かけの生産性指標が跳ね上がる裏で、構造的な脆さが静かに肥大化していった。",
          "Metaのシニアエンジニアが打ち明けた通り、コード出力は10倍に増えたものの生成コードの境界条件（エッジケース）を誰も深く把握しておらず、最初の複雑なネットワーク変動で本番環境が崩壊した。",
          "AIは構文を完璧に書くが、システム設計、分散合意、決定論的な堅牢性は人間のエンジニアが担うべき不可侵の領域である。",
        ],
      },
    },
  },
  {
    slug: "nvidia-jensen-huang-cin-casusluk-skandali",
    tag: "DONANIM ARBİTRAJI",
    category: "donanim",
    title: "3.5 Trilyon Dolarlık Ulusal Güvenlik Duvarı: Bir Deri Ceket ve Klasik Bal Tuzağı",
    excerpt: "Washington ambargolarla tensör çiplerini kilitlerken, Singapur merkezli klasik bir paravan şirket ağıyla delinen donanım tekeli.",
    date: "10 Kas 2026",
    isoDate: "2026-11-10",
    readTime: "5 dk okuma",
    imageUrl: "/blog/nvidia-jensen-huang-cin-casusluk-skandali.png",
    metrics: [
      { label: "PİYASA DEĞERİ", val: "$3.5 Trilyon" },
      { label: "ROTASYON", val: "Singapur" },
    ],
    content: [
      "Washington'ın Çin'e en küçük tensör çipi gitmesin diye dünyayı ambargolarla inlettiği bir dönemde; 3.5 trilyon dolarlık Nvidia tekeli ve Pentagon'un yapay zeka omurgası, Singapur merkezli klasik bir paravan şirket ağıyla delindi.",
      "Aman Çin’e 8-bit kuantizasyonlu H100 gitmesin diye uygulanan yaptırımların, fiziksel tedarik zincirindeki en ilkel insan zaafları karşısında nasıl yetersiz kaldığının çarpıcı bir anatomisi.",
      "Donanım gücü sınırlansa da, otonom zekâ ve açık kaynak algoritmalar sınır tanımaz.",
    ],
    translations: {
      en: {
        tag: "HARDWARE ARBITRAGE",
        title: "The $3.5 Trillion National Security Wall: Leather Jackets & Classic Supply Arbitrage",
        excerpt: "As Washington locked down tensor silicon with sweeping export bans, the $3.5T hardware monopoly was pierced by a classic Singapore shell network.",
        date: "Nov 10, 2026",
        readTime: "5 min read",
        metrics: [
          { label: "MARKET CAP", val: "$3.5 Trillion" },
          { label: "ROUTING", val: "Singapore" },
        ],
        content: [
          "At a time when Washington enforced sweeping semiconductor embargoes to stop even a single tensor chip from reaching China, the $3.5 trillion Nvidia monopoly and Pentagon AI compute backbone was bypassed via a classic Singapore-based front-company network.",
          "Sanctions designed to restrict 8-bit quantized H100 silicon collapsed when confronted with age-old human vulnerabilities inside physical logistics chains.",
          "Hardware access can be gated at borders, yet autonomous intelligence and open-source algorithms never stop at customs.",
        ],
      },
      zh: {
        tag: "硬件套利",
        title: "3.5万亿美元的国家安全高墙：皮衣教主与经典的供应链渗透",
        excerpt: "当华盛顿用严苛禁令封锁张量芯片时，这家 3.5 万亿美元的硬件垄断巨头却被新加坡空壳公司网络轻易穿透。",
        date: "2026年11月10日",
        readTime: "5 分钟阅读",
        metrics: [
          { label: "市值规模", val: "3.5 万亿美元" },
          { label: "流转枢纽", val: "新加坡" },
        ],
        content: [
          "就在华盛顿不断加码芯片出口管制之际，市值 3.5 万亿美元的 Nvidia 硬件垄断体系，被一个以新加坡为枢纽的传统空壳公司网络悄然撕开缺口。",
          "这生动展示了针对 8-bit 量化 H100 设计的出口禁令，在物理供应链中最原始的人性弱点面前显得多么脆弱。",
          "硬件算力或许可以被围堵，但自主智能与开源算法从不受国界束缚。",
        ],
      },
      hi: {
        tag: "हार्डवेयर आर्बिट्राज",
        title: "3.5 ट्रिलियन डॉलर की राष्ट्रीय सुरक्षा दीवार: लेदर जैकेट और क्लासिक सप्लाई-चेन जाल",
        excerpt: "एक तरफ वाशिंगटन ने टेंसर चिप्स पर सख्त प्रतिबंध लगाए, दूसरी तरफ सिंगापुर की शेल कंपनियों ने 3.5 ट्रिलियन डॉलर की मोनोपॉली को भेद दिया।",
        date: "10 नवम्बर 2026",
        readTime: "5 मिनट",
        metrics: [
          { label: "मार्केट कैप", val: "$3.5 ट्रिलियन" },
          { label: "रूटिंग हब", val: "सिंगापुर" },
        ],
        content: [
          "जब वाशिंगटन चीन तक एक भी टेंसर चिप पहुंचने से रोकने के लिए दुनिया भर में प्रतिबंध लगा रहा था, उसी दौर में 3.5 ट्रिलियन डॉलर की Nvidia मोनोपॉली सिंगापुर स्थित शेल कंपनियों के नेटवर्क से भेद दी गई।",
          "यह दिखाता है कि 8-बिट क्वांटाइज्ड H100 पर लगे कागज़ी प्रतिबंध भौतिक सप्लाई चेन की बुनियादी मानवीय कमजोरियों के सामने कितने लाचार साबित होते हैं।",
          "हार्डवेयर की सप्लाई सीमित की जा सकती है, लेकिन ऑटोनॉमस इंटेलिजेंस और ओपन-सोर्स एल्गोरिदम किसी सीमा को नहीं मानते।",
        ],
      },
      es: {
        tag: "ARBITRAJE DE HARDWARE",
        title: "El muro de seguridad nacional de 3,5 billones: Chaquetas de cuero y trampa clásica en la cadena física",
        excerpt: "Mientras Washington blindaba los chips tensoriales con embargos, el monopolio de 3,5 billones fue perforado por una red pantalla en Singapur.",
        date: "10 nov 2026",
        readTime: "5 min lectura",
        metrics: [
          { label: "CAPITALIZACIÓN", val: "$3,5 Billones" },
          { label: "RUTA CLAVE", val: "Singapur" },
        ],
        content: [
          "Mientras Washington imponía embargos globales para impedir que un solo chip tensorial llegara a China, el monopolio de 3,5 billones de Nvidia fue vulnerado mediante una clásica red de empresas pantalla con sede en Singapur.",
          "Es la anatomía exacta de cómo las sanciones sobre silicio H100 cuantizado fracasan frente a las vulnerabilidades humanas más elementales de la cadena logística física.",
          "El acceso al hardware puede restringirse, pero la inteligencia autónoma y los algoritmos de código abierto no entienden de fronteras.",
        ],
      },
      ar: {
        tag: "مراجحة العتاد",
        title: "جدار الأمن القومي بـ 3.5 تريليون دولار: سترة جلدية وفخ تقليدي في سلاسل الإمداد",
        excerpt: "بينما فرضت واشنطن حظراً مشدداً على رقائق التنسور، تم اختراق احتكار بقيمة 3.5 تريليون دولار عبر شبكة شركات واجهة تقليدية في سنغافورة.",
        date: "10 نوفمبر 2026",
        readTime: "5 دقائق",
        metrics: [
          { label: "القيمة السوقية", val: "3.5 تريليون $" },
          { label: "مسار العبور", val: "سنغافورة" },
        ],
        content: [
          "في وقت فرضت فيه واشنطن عقوبات صارمة لمنع وصول أي رقاقة تنسور إلى الصين، اخترقت شبكة شركات واجهة تقليدية في سنغافورة احتكار إنفيديا البالغ 3.5 تريليون دولار.",
          "يكشف هذا التشريح كيف تعجز العقوبات المفروضة على شرائح H100 أمام أبسط نقاط الضعف البشرية في سلاسل التوريد المادية.",
          "يمكن تقييد العتاد عند الحدود، لكن الذكاء المستقل والخوارزميات مفتوحة المصدر لا تعترف بالحدود.",
        ],
      },
      pt: {
        tag: "ARBITRAGEM DE HARDWARE",
        title: "A Muralha de Segurança de US$ 3,5 Trilhões: Jaqueta de Couro e Armadilha Clássica na Cadeia Física",
        excerpt: "Enquanto Washington bloqueava chips tensores com embargos, o monopólio de US$ 3,5 trilhões foi perfurado por empresas de fachada em Singapura.",
        date: "10 nov 2026",
        readTime: "5 min de leitura",
        metrics: [
          { label: "VALOR DE MERCADO", val: "US$ 3,5 Tri" },
          { label: "ROTA CENTRAL", val: "Singapura" },
        ],
        content: [
          "Enquanto Washington impunha embargos globais para impedir a ida de chips tensores à China, o monopólio de US$ 3,5 trilhões da Nvidia foi contornado por uma rede clássica de empresas de fachada em Singapura.",
          "Fica evidente como sanções sobre silício H100 quantizado falham diante das vulnerabilidades humanas mais elementares da logística física.",
          "O acesso ao hardware pode ser cercado, mas a inteligência autônoma e os algoritmos abertos não conhecem fronteiras.",
        ],
      },
      de: {
        tag: "HARDWARE-ARBITRAGE",
        title: "Die 3,5-Billionen-Dollar-Sicherheitsmauer: Lederjacke und eine klassische Lieferkettenfalle",
        excerpt: "Während Washington Tensor-Chips mit Embargos abriegelte, wurde das 3,5-Billionen-Monopol über ein Firmennetzwerk in Singapur unterlaufen.",
        date: "10. Nov. 2026",
        readTime: "5 Min. Lesezeit",
        metrics: [
          { label: "MARKTWERT", val: "3,5 Bio. $" },
          { label: "ROUTING", val: "Singapur" },
        ],
        content: [
          "Während Washington weltweite Embargos verhängte, damit kein Tensor-Chip nach China gelangt, wurde das 3,5-Billionen-Dollar-Monopol von Nvidia über ein klassisches Tarnfirmennetz in Singapur durchbrochen.",
          "Die Analyse zeigt eindrucksvoll, wie Exportkontrollen für quantisierte H100-Chips an ganz banalen menschlichen Schwachstellen in physischen Lieferketten scheitern.",
          "Hardware lässt sich regulieren—autonome Intelligenz und Open-Source-Algorithmen kennen hingegen keine Grenzen.",
        ],
      },
      ja: {
        tag: "ハードウェア裁定",
        title: "3.5兆ドルの国家安全保障ウォール：革ジャンと古典的サプライチェーンの抜け穴",
        excerpt: "ワシントンが輸出規制でテンソルチップを封鎖する裏で、3.5兆ドルの独占網はシンガポール拠点のペーパーカンパニー網によって突破された。",
        date: "2026年11月10日",
        readTime: "5分で読了",
        metrics: [
          { label: "時価総額", val: "3.5兆ドル" },
          { label: "経由ハブ", val: "シンガポール" },
        ],
        content: [
          "ワシントンが中国へのテンソルチップ流出を阻止すべく輸出規制を敷く中、3.5兆ドル規模のNvidia独占網はシンガポール拠点の古典的なダミー会社網によってすり抜けられた。",
          "8ビット量子化H100の規制措置が、物理サプライチェーンに潜む極めて原始的な人間的脆弱性の前でいかに無力かを示す構造である。",
          "ハードウェアの流通は制限できても、自律知能とオープンソースのアルゴリズムに国境は存在しない。",
        ],
      },
    },
  },
  {
    slug: "ai-bumerangi-muhendislerin-donusu",
    tag: "SİSTEM MÜHENDİSLİĞİ",
    category: "mimari",
    title: "'Yapay Zeka Yerimizi Alacak' Kibri İflas Etti: Kovulan Mühendislerin Dönüşü",
    excerpt: "Büyük dil modelleri sözdizimi üretir; fakat gece 03:00'te veritabanı kilitlendiğinde veya ödeme hattı yarış durumuna girdiğinde prompt yazamazsınız.",
    date: "9 Kas 2026",
    isoDate: "2026-11-09",
    readTime: "6 dk okuma",
    imageUrl: "/blog/ai-bumerangi-muhendislerin-donusu.png",
    metrics: [
      { label: "İŞTEN ÇIKARMA", val: "Geri Döndü" },
      { label: "HATA DOMAİNİ", val: "Distributed" },
    ],
    content: [
      "Son bir yılda yönetim kurullarında en çok alkışlanan sunum şuydu: 'Yapay zeka artık kodun %80'ini yazıyor, mühendis kadromuzu yarıya indirip bilançoyu parlatabiliriz.' Bu kibirle hareket eden şirketlerin karşılaştığı fatura ağır oldu.",
      "Büyük dil modelleri sözdizimi üretmekte muazzam bir hız kazandırdı. Ancak yazılım mühendisliği hiçbir zaman klavyeye hızlı basmak değildi.",
      "Üretim ortamında gece saat 03:00'te veritabanı kilitlendiğinde veya ödeme geçidi yarış durumuna (race condition) girdiğinde, bir prompt yazarak sistemi kurtaramazsınız.",
    ],
    translations: {
      en: {
        tag: "SYSTEMS ENGINEERING",
        title: "The 'AI Will Replace Engineers' Hubris Collapses: Return of the Laid-Off Architects",
        excerpt: "LLMs generate syntax at lightning speed, yet when a database deadlocks at 3:00 AM or a payment pipeline hits a race condition, no prompt can rescue you.",
        date: "Nov 9, 2026",
        readTime: "6 min read",
        metrics: [
          { label: "LAYOFF WAVE", val: "Reversed" },
          { label: "FAILURE DOMAIN", val: "Distributed" },
        ],
        content: [
          "The most applauded boardroom pitch of the past year claimed: 'AI writes 80% of our code now—we can halve engineering headcount and polish the balance sheet.' Companies acting on that hubris paid a steep operational bill.",
          "Large language models dramatically accelerated syntax generation, yet software engineering was never about typing fast on a keyboard.",
          "When a production database deadlocks at 3:00 AM or a payment gateway enters a race condition, you cannot prompt-engineer your way out of an outage.",
        ],
      },
      zh: {
        tag: "系统工程",
        title: "“AI 将取代工程师”的傲慢破产：被裁工程师的回归潮",
        excerpt: "大语言模型擅长高速生成语法，但当凌晨三点数据库死锁或支付链路出现竞态条件时，提示词救不了生产环境。",
        date: "2026年11月9日",
        readTime: "6 分钟阅读",
        metrics: [
          { label: "裁员潮反转", val: "大规模回聘" },
          { label: "故障域", val: "分布式状态" },
        ],
        content: [
          "过去一年董事会上最受追捧的演讲是：“AI 已经能写 80% 的代码，我们可以把研发团队砍半来美化财报。”怀着这种傲慢行事的公司很快付出了沉重代价。",
          "大语言模型确实让语法生成速度飞跃，但软件工程从来都不等同于敲键盘的手速。",
          "凌晨 3 点生产数据库发生死锁、或者支付网关陷入竞态条件（race condition）时，写任何 Prompt 都无法让系统起死回生。",
        ],
      },
      hi: {
        tag: "सिस्टम इंजीनियरिंग",
        title: "'AI हमारी जगह ले लेगा' का घमंड टूटा: निकाले गए इंजीनियरों की वापसी",
        excerpt: "LLM सिंटैक्स तेजी से लिखते हैं, लेकिन रात 3 बजे डेटाबेस डेडलॉक या पेमेंट रेस-कंडीशन होने पर प्रॉम्प्ट लिखकर सिस्टम नहीं बचाया जा सकता।",
        date: "9 नवम्बर 2026",
        readTime: "6 मिनट",
        metrics: [
          { label: "छंटनी ट्रेंड", val: "वापसी हुई" },
          { label: "विफलता स्तर", val: "डिस्ट्रीब्यूटेड" },
        ],
        content: [
          "पिछले एक साल में बोर्ड मीटिंग्स में सबसे ज्यादा तालियां इस बात पर बजीं कि 'AI 80% कोड लिख रहा है, अब आधे इंजीनियर कम करके मुनाफा बढ़ाया जा सकता है।' इस घमंड की कीमत कंपनियों को भारी पड़ी।",
          "लार्ज लैंग्वेज मॉडल ने सिंटैक्स उत्पादन तेज जरूर किया है, लेकिन सॉफ्टवेयर इंजीनियरिंग कभी कीबोर्ड पर तेज टाइपिंग का नाम नहीं थी।",
          "प्रोडक्शन में रात 3 बजे डेटाबेस लॉक होने या पेमेंट गेटवे में रेस कंडीशन आने पर कोई प्रॉम्प्ट सिस्टम को नहीं बचा सकता।",
        ],
      },
      es: {
        tag: "INGENIERÍA DE SISTEMAS",
        title: "Colapsa la arrogancia de 'la IA nos reemplazará': El regreso de los ingenieros despedidos",
        excerpt: "Los LLM generan sintaxis velozmente, pero cuando la base de datos se bloquea a las 3:00 AM o falla la pasarela de pago por una race condition, un prompt no basta.",
        date: "9 nov 2026",
        readTime: "6 min lectura",
        metrics: [
          { label: "RECORTES", val: "Revertidos" },
          { label: "DOMINIO DE FALLO", val: "Distribuido" },
        ],
        content: [
          "Durante el último año, la diapositiva más aplaudida en los consejos afirmaba: 'La IA escribe el 80% del código; podemos reducir a la mitad el equipo técnico'. Las empresas que creyeron ese espejismo pagaron una factura cara.",
          "Los modelos de lenguaje aceleraron la escritura de sintaxis, pero la ingeniería de software nunca consistió en teclear más rápido.",
          "Cuando una base de datos entra en deadlock a las 3:00 de la madrugada o una pasarela sufre una condición de carrera, ningún prompt rescata el servicio.",
        ],
      },
      ar: {
        tag: "هندسة الأنظمة",
        title: "سقوط غرور 'الذكاء الاصطناعي سيستبدلنا': عودة المهندسين المسرّحين",
        excerpt: "تنتج النماذج اللغوية الصياغة بسرعة فائقة، لكن عندما يتجمد الخادم الساعة 3 فجراً أو تدخل بوابة الدفع في سباق تزامن، لن ينقذك أي prompt.",
        date: "9 نوفمبر 2026",
        readTime: "6 دقائق",
        metrics: [
          { label: "موجة التسريح", val: "تراجعت وعادوا" },
          { label: "نطاق الأعطال", val: "أنظمة موزعة" },
        ],
        content: [
          "كان العرض الأكثر تصفيقاً في مجالس الإدارة خلال العام الماضي هو: 'يكتب الذكاء الاصطناعي 80% من الكود، يمكننا تقليص المهندسين للنصف'. لكن الفاتورة كانت باهظة لمن صدقوا هذا الغرور.",
          "لقد سرّعت النماذج اللغوية الكبيرة كتابة الأكواد بشكل هائل، غير أن هندسة البرمجيات لم تكن يوماً مجرد سرعة طباعة على لوحة المفاتيح.",
          "عندما يحدث deadlock في قاعدة البيانات الساعة الثالثة فجراً أو race condition في بوابة الدفع، لا يمكنك إنقاذ النظام بكتابة prompt.",
        ],
      },
      pt: {
        tag: "ENGENHARIA DE SISTEMAS",
        title: "A Arrogância do 'A IA Vai Substituir Engenheiros' Faliu: O Retorno dos Demitidos",
        excerpt: "LLMs geram sintaxe em alta velocidade, mas quando o banco trava às 3h da manhã ou o checkout entra em race condition, não há prompt que resolva.",
        date: "9 nov 2026",
        readTime: "6 min de leitura",
        metrics: [
          { label: "DEMISSÕES", val: "Revertidas" },
          { label: "DOMÍNIO DE FALHA", val: "Distribuído" },
        ],
        content: [
          "No último ano, o slide mais aplaudido em conselhos dizia: 'A IA escreve 80% do código, podemos cortar metade da engenharia.' A conta para quem apostou nessa arrogância veio pesada.",
          "Modelos de linguagem deram velocidade absurda à geração de sintaxe, mas engenharia de software nunca foi sobre digitar rápido.",
          "Quando o banco de dados entra em deadlock às 3 da manhã ou o gateway de pagamentos sofre uma race condition, nenhum prompt salva a produção.",
        ],
      },
      de: {
        tag: "SYSTEMTECHNIK",
        title: "Die Arroganz 'KI ersetzt Entwickler' ist gescheitert: Die Rückkehr der entlassenen Ingenieure",
        excerpt: "LLMs erzeugen rasant Syntax—doch wenn um 3 Uhr nachts die Datenbank blockiert oder eine Race Condition im Checkout auftritt, hilft kein Prompt.",
        date: "9. Nov. 2026",
        readTime: "6 Min. Lesezeit",
        metrics: [
          { label: "ENTLASSUNGEN", val: "Zurückgenommen" },
          { label: "FEHLERDOMÄNE", val: "Verteilt" },
        ],
        content: [
          "Kaum eine Vorstandspräsentation erhielt im letzten Jahr mehr Applaus als: 'KI schreibt 80 % des Codes—wir halbieren die Entwicklerteams.' Wer dieser Hybris folgte, zahlte teuer dafür.",
          "Große Sprachmodelle haben das Schreiben von Syntax stark beschleunigt, aber Software Engineering war noch nie schnelles Tippen.",
          "Wenn um 3 Uhr morgens in der Produktion ein Datenbank-Deadlock oder eine Race Condition im Zahlungsfluss auftritt, rettet kein Prompt das System.",
        ],
      },
      ja: {
        tag: "システム工学",
        title: "「AIがエンジニアに取って代わる」という傲慢の破綻：解雇された熟練者の帰還",
        excerpt: "LLMは構文を高速生成するが、深夜3時にDBがデッドロックし決済パイプラインで競合状態が起きたとき、プロンプトではシステムを救えない。",
        date: "2026年11月9日",
        readTime: "6分で読了",
        metrics: [
          { label: "人員削減", val: "再雇用へ反転" },
          { label: "障害領域", val: "分散システム" },
        ],
        content: [
          "この1年、取締役会で最も拍手されたスライドは「AIがコードの8割を書くので開発人員を半減できる」というものだった。その傲慢に従った企業には重いツケが回ってきた。",
          "大規模言語モデルは構文生成を劇的に速めたが、ソフトウェア工学とは元々キーボードを速く叩く競技ではなかった。",
          "深夜3時に本番データベースがデッドロックを起こし、決済ゲートウェイで競合状態（レースコンディション）が発生したとき、プロンプトを打ってシステムを復旧させることはできない。",
        ],
      },
    },
  },
  {
    slug: "sam-altman-ram-krizi",
    tag: "TRANSFORMER MİMARİSİ",
    category: "donanim",
    title: "Sam Altman'ın 100 Milyar Dolarlık RAM Çıkmazı: GPU'lar Hızlandı, Hafıza Duvarı Çarptı",
    excerpt: "Milyarlarca dolarlık HBM3e yatırımlarına rağmen, yapay zeka modelleri artık ham tensör çekirdeklerine değil, bellek bant genişliğine kurban gidiyor.",
    date: "8 Kas 2026",
    isoDate: "2026-11-08",
    readTime: "5 dk okuma",
    imageUrl: "/blog/sam-altman-ram-krizi.png",
    metrics: [
      { label: "HAFİZA DUVARI", val: "HBM3e" },
      { label: "KV-CACHE", val: "128k Sınırı" },
    ],
    content: [
      "Sam Altman'ın 'trilyon dolarlık çip dökümhanesi' çağrısının perde arkasındaki gerçek: Hesaplama gücü katlanırken, bellek mimarisi fiziksel limitlerine ulaştı.",
      "Transformer mimarilerinin en büyük açmazı olan KV-Cache şişmesi, 128k bağlam pencerelerinde sunucuları kilitliyor.",
      "Yüksek performanslı yapay zeka ürün mühendisliğinde donanım satın almak yetersizdir; kuantizasyon, flash-attention ve bellek bant genişliği optimizasyonu şarttır.",
    ],
    translations: {
      en: {
        tag: "TRANSFORMER ARCHITECTURE",
        title: "Sam Altman's $100 Billion RAM Bottleneck: GPUs Sped Up, Then Slammed Into the Memory Wall",
        excerpt: "Despite billions poured into HBM3e stacks, frontier AI inference is no longer bound by raw tensor FLOPs—it is throttled by memory bandwidth.",
        date: "Nov 8, 2026",
        readTime: "5 min read",
        metrics: [
          { label: "MEMORY WALL", val: "HBM3e" },
          { label: "KV-CACHE", val: "128k Ceiling" },
        ],
        content: [
          "Behind Sam Altman's call for trillion-dollar chip foundries lies a stubborn physical truth: while tensor compute multiplied, memory architecture hit a hard bandwidth wall.",
          "KV-cache bloat—the Achilles' heel of transformer serving—locks down GPU memory banks across 128k context windows.",
          "In high-performance AI product engineering, throwing hardware budgets at the cluster is never enough; quantization, FlashAttention, and memory bandwidth discipline are mandatory.",
        ],
      },
      zh: {
        tag: "Transformer 架构",
        title: "Sam Altman 的千亿美元内存困局：GPU 算力狂飙，却撞上存储带宽墙",
        excerpt: "尽管投入巨资研发 HBM3e，大模型的瓶颈早已不再是张量算力，而是内存容量与带宽。",
        date: "2026年11月8日",
        readTime: "5 分钟阅读",
        metrics: [
          { label: "存储瓶颈", val: "HBM3e" },
          { label: "KV 缓存", val: "128k 上限" },
        ],
        content: [
          "Sam Altman 呼吁投入万亿美元建芯片厂的背后，是一个无法回避的物理事实：计算能力成倍暴涨，内存架构却撞上了极限。",
          "Transformer 架构最大的死穴在于 KV-Cache 膨胀，在 128k 长上下文下轻易锁死整组推理服务器。",
          "在高性能 AI 产品工程中，单纯堆砌硬件远远不够，必须依赖量化、FlashAttention 与极致显存带宽优化。",
        ],
      },
      hi: {
        tag: "ट्रांसफॉर्मर आर्किटेक्चर",
        title: "सैम ऑल्टमैन का $100 बिलियन RAM संकट: GPU तेज हुए, लेकिन मेमोरी वॉल से टकरा गए",
        excerpt: "अरबों डॉलर के HBM3e निवेश के बावजूद, AI मॉडल अब टेंसर कोर की गति नहीं बल्कि मेमोरी बैंडविड्थ की सीमा से धीमे पड़ रहे हैं।",
        date: "8 नवम्बर 2026",
        readTime: "5 मिनट",
        metrics: [
          { label: "मेमोरी वॉल", val: "HBM3e" },
          { label: "KV-CACHE", val: "128k सीमा" },
        ],
        content: [
          "सैम ऑल्टमैन के ट्रिलियन-डॉलर चिप फाउंड्री अभियान के पीछे का सच यही है: कंप्यूट पावर कई गुना बढ़ी, लेकिन मेमोरी आर्किटेक्चर अपनी भौतिक सीमा पर पहुंच गया।",
          "ट्रांसफॉर्मर मॉडल में KV-Cache का बढ़ना 128k कॉन्टेक्स्ट विंडो पर सर्वरों को जाम कर देता है।",
          "हाई-परफॉर्मेंस AI प्रोडक्ट इंजीनियरिंग में सिर्फ नया हार्डवेयर खरीदना काफी नहीं; क्वांटाइजेशन, FlashAttention और मेमोरी ऑप्टिमाइजेशन अनिवार्य है।",
        ],
      },
      es: {
        tag: "ARQUITECTURA TRANSFORMER",
        title: "El callejón de RAM de 100.000 millones de Sam Altman: Las GPU aceleraron y chocaron contra el muro de memoria",
        excerpt: "Pese a miles de millones en memoria HBM3e, la inferencia moderna ya no está limitada por cómputo tensorial sino por ancho de banda de memoria.",
        date: "8 nov 2026",
        readTime: "5 min lectura",
        metrics: [
          { label: "MURO DE MEMORIA", val: "HBM3e" },
          { label: "KV-CACHE", val: "Límite 128k" },
        ],
        content: [
          "Detrás del llamado de Sam Altman para construir fundiciones de silicio de un billón de dólares yace una realidad física: la capacidad de cómputo creció exponencialmente, pero la memoria alcanzó su límite.",
          "La expansión del KV-Cache en arquitecturas Transformer satura los servidores en ventanas de contexto de 128k.",
          "Comprar más hardware no basta en ingeniería de IA de alto rendimiento; la cuantización, FlashAttention y la optimización de ancho de banda son imprescindibles.",
        ],
      },
      ar: {
        tag: "بنية المحولات (Transformer)",
        title: "مأزق الـ 100 مليار دولار للذاكرة لدى سام ألتمان: تسارعت المعالجات واصطدمت بجدار الذاكرة",
        excerpt: "رغم استثمار مليارات الدولارات في HBM3e، لم تعد نماذج الذكاء الاصطناعي مقيدة بقوة الحساب بل بعرض نطاق الذاكرة.",
        date: "8 نوفمبر 2026",
        readTime: "5 دقائق",
        metrics: [
          { label: "جدار الذاكرة", val: "HBM3e" },
          { label: "ذاكرة KV-Cache", val: "حد 128k" },
        ],
        content: [
          "وراء دعوة سام ألتمان لبناء مصانع رقائق بتريليونات الدولارات تكمن حقيقة فيزيائية صلبة: بينما تضاعفت القدرة الحسابية، بلغت بنية الذاكرة حدودها الفيزيائية.",
          "تضخم KV-Cache في معماريات Transformer يشل الخوادم عند نوافذ سياق تبلغ 128k.",
          "في هندسة منتجات الذكاء الاصطناعي عالية الأداء، لا يكفي شراء العتاد وحده؛ بل لا بد من التكميم (quantization) وFlashAttention وتحسين عرض نطاق الذاكرة.",
        ],
      },
      pt: {
        tag: "ARQUITETURA TRANSFORMER",
        title: "O Gargalo de RAM de US$ 100 Bilhões de Sam Altman: As GPUs Aceleraram e Bateram no Muro da Memória",
        excerpt: "Apesar dos bilhões investidos em HBM3e, os modelos de IA hoje são limitados pela largura de banda de memória, não pelos núcleos tensores.",
        date: "8 nov 2026",
        readTime: "5 min de leitura",
        metrics: [
          { label: "MURO DE MEMÓRIA", val: "HBM3e" },
          { label: "KV-CACHE", val: "Limite 128k" },
        ],
        content: [
          "Por trás do apelo de Sam Altman por fábricas trilionárias de chips há um fato físico: enquanto o poder de computação multiplicou, a arquitetura de memória atingiu seu limite.",
          "O inchaço do KV-Cache nas arquiteturas Transformer trava servidores quando o contexto chega a 128k.",
          "Em engenharia de produtos de IA de alta performance, comprar hardware não basta: quantização, FlashAttention e otimização de banda de memória são obrigatórios.",
        ],
      },
      de: {
        tag: "TRANSFORMER-ARCHITEKTUR",
        title: "Sam Altmans 100-Milliarden-Dollar-RAM-Problem: GPUs wurden schneller—und prallten an die Speicherwand",
        excerpt: "Trotz Milliardeninvestitionen in HBM3e scheitert KI-Inferenz heute nicht an Tensor-Rechenleistung, sondern an der Speicherbandbreite.",
        date: "8. Nov. 2026",
        readTime: "5 Min. Lesezeit",
        metrics: [
          { label: "SPEICHERWAND", val: "HBM3e" },
          { label: "KV-CACHE", val: "128k-Grenze" },
        ],
        content: [
          "Hinter Sam Altmans Ruf nach Billionen-Dollar-Chipfabriken steckt eine physikalische Realität: Während die Rechenleistung explodierte, erreichte die Speicherarchitektur ihre Grenzen.",
          "Das Aufblähen des KV-Cache in Transformer-Architekturen legt Server bei Kontextfenstern von 128k lahm.",
          "Im High-Performance-AI-Engineering genügt bloßes Hardware-Kaufen nicht; Quantisierung, FlashAttention und Speicherbandbreiten-Optimierung sind unverzichtbar.",
        ],
      },
      ja: {
        tag: "Transformerアーキテクチャ",
        title: "サム・アルトマン1,000億ドルのRAM袋小路：GPUは高速化し、メモリの壁に激突した",
        excerpt: "HBM3eへの巨額投資にもかかわらず、AI推論のボトルネックは演算性能ではなくメモリ帯域幅へと移った。",
        date: "2026年11月8日",
        readTime: "5分で読了",
        metrics: [
          { label: "メモリの壁", val: "HBM3e" },
          { label: "KV-CACHE", val: "128k上限" },
        ],
        content: [
          "サム・アルトマンが兆ドル規模の半導体ファウンドリ建設を訴える裏には、演算能力が飛躍する一方でメモリ構造が物理限界に達した現実がある。",
          "Transformer最大のアキレス腱であるKV-Cacheの肥大化が、128kコンテキスト長で推論サーバーを逼迫させる。",
          "高性能AIプロダクト開発ではハードウェアを増やすだけでは不十分であり、量子化・FlashAttention・メモリ帯域の徹底最適化が不可欠だ。",
        ],
      },
    },
  },
  {
    slug: "claude-code-trojan-npm-analiz",
    tag: "YAZILIM TEDARİK ZİNCİRİ",
    category: "guvenlik",
    title: "Anthropic Claude Code ve Trojan Anatomisi: Yazılım Tedarik Zincirinde Zero Trust",
    excerpt: "Geliştirici ortamlarına sızan gizli NPM paketleri ve otonom terminal ajanlarının denetimsiz paket kurulumlarındaki riskler.",
    date: "7 Kas 2026",
    isoDate: "2026-11-07",
    readTime: "5 dk okuma",
    imageUrl: "/blog/claude-hacker-news.jpg",
    metrics: [
      { label: "RİSK SINIFI", val: "NPM Poison" },
      { label: "SAVUNMA", val: "Zero-Trust" },
    ],
    content: [
      "Terminal ajanlarının popülerleşmesiyle birlikte saldırganlar, popüler NPM kütüphanelerinin harf hatası (typosquatting) versiyonlarını doğrudan LLM'lerin öneri kalıplarına enjekte etmeye başladı.",
      "Otonom araçların 'npm install' komutlarını onay almadan çalıştırması, kurumsal geliştirici makinelerini uzaktan kontrol edilen botlara dönüştürebilir.",
      "Kürşat Yılmaz mimarilerinde tüm harici paket bağımlılıkları deterministik sandbox içinde doğrulanmadan üretim ortamına alınmaz.",
    ],
    translations: {
      en: {
        tag: "SOFTWARE SUPPLY CHAIN",
        title: "Anthropic Claude Code & Trojan Anatomy: Zero Trust in the Software Supply Chain",
        excerpt: "Stealth NPM packages sneaking into developer environments and the perils of autonomous terminal agents installing unverified dependencies.",
        date: "Nov 7, 2026",
        readTime: "5 min read",
        metrics: [
          { label: "RISK VECTOR", val: "NPM Poison" },
          { label: "DEFENSE", val: "Zero-Trust" },
        ],
        content: [
          "As terminal coding agents went mainstream, attackers began poisoning typosquatted variants of popular NPM packages directly into LLM completion patterns.",
          "Allowing autonomous agents to execute 'npm install' without deterministic verification can turn enterprise developer laptops into remotely controlled bots.",
          "In production-grade architectures, no external package dependency enters the build pipeline without isolated sandbox verification.",
        ],
      },
      zh: {
        tag: "软件供应链安全",
        title: "Claude Code 与木马解剖：软件供应链中的零信任防御",
        excerpt: "潜入开发者环境的恶意 NPM 包，以及终端自主代理未经校验安装依赖带来的致命风险。",
        date: "2026年11月7日",
        readTime: "5 分钟阅读",
        metrics: [
          { label: "风险类型", val: "NPM 投毒" },
          { label: "防御架构", val: "零信任沙箱" },
        ],
        content: [
          "随着终端编程代理普及，攻击者开始将热门 NPM 库的拼写仿冒版本注入 LLM 的推荐模式中。",
          "如果放任自主工具在未确认的情况下执行 'npm install'，企业开发机随时可能沦为受远程控制的肉鸡。",
          "任何外部依赖在进入生产构建流水线之前，都必须在确定性沙箱中完成严格校验。",
        ],
      },
      hi: {
        tag: "सॉफ्टवेयर सप्लाई चेन",
        title: "Anthropic Claude Code और ट्रोजन एनाटॉमी: सॉफ्टवेयर सप्लाई चेन में Zero Trust",
        excerpt: "डेवलपर मशीनों में घुसते गुप्त NPM पैकेज और बिना जांच पैकेज इंस्टॉल करने वाले ऑटोनॉमस टर्मिनल एजेंट्स का खतरा।",
        date: "7 नवम्बर 2026",
        readTime: "5 मिनट",
        metrics: [
          { label: "जोखिम श्रेणी", val: "NPM पॉइज़न" },
          { label: "सुरक्षा मॉडल", val: "Zero-Trust" },
        ],
        content: [
          "टर्मिनल कोडिंग एजेंट्स के लोकप्रिय होते ही हमलावरों ने चर्चित NPM पैकेजों के टाइपोस्क्वैटेड वर्ज़न LLM सुझाव पैटर्न में इंजेक्ट करने शुरू कर दिए।",
          "यदि ऑटोनॉमस टूल्स बिना मंजूरी के 'npm install' चलाएं, तो कॉरपोरेट डेवलपर लैपटॉप रिमोट बॉट में बदल सकते हैं।",
          "प्रोडक्शन आर्किटेक्चर में कोई भी बाहरी पैकेज डिटरमिनिस्टिक सैंडबॉक्स जांच के बिना शामिल नहीं किया जाना चाहिए।",
        ],
      },
      es: {
        tag: "CADENA DE SUMINISTRO",
        title: "Anthropic Claude Code y anatomía del troyano: Zero Trust en la cadena de suministro de software",
        excerpt: "Paquetes NPM maliciosos que se infiltran en entornos locales y el riesgo de que agentes autónomos instalen dependencias sin supervisión.",
        date: "7 nov 2026",
        readTime: "5 min lectura",
        metrics: [
          { label: "VECTOR DE RIESGO", val: "NPM Poison" },
          { label: "DEFENSA", val: "Zero-Trust" },
        ],
        content: [
          "Con el auge de los agentes de terminal, los atacantes inyectan versiones con errores tipográficos (typosquatting) de librerías NPM populares en las sugerencias de los LLM.",
          "Permitir que un agente autónomo ejecute 'npm install' sin verificación puede convertir portátiles corporativos en nodos controlados remotamente.",
          "Ninguna dependencia externa debe llegar a producción sin validarse previamente dentro de un sandbox determinista.",
        ],
      },
      ar: {
        tag: "سلسلة توريد البرمجيات",
        title: "Claude Code وتشريح أحصنة طروادة: الثقة الصفرية (Zero Trust) في سلاسل التوريد البرمجية",
        excerpt: "حزم NPM خفية تتسلل إلى بيئات المطورين ومخاطر تشغيل الوكلاء المستقلين لتثبيت التبعيات دون تدقيق.",
        date: "7 نوفمبر 2026",
        readTime: "5 دقائق",
        metrics: [
          { label: "فئة الخطر", val: "تسميم NPM" },
          { label: "الدفاع", val: "Zero-Trust" },
        ],
        content: [
          "مع انتشار وكلاء البرمجة في الطرفية، بدأ المهاجمون حقن نسخ مقلدة من مكتبات NPM الشهيرة داخل أنماط اقتراح النماذج اللغوية.",
          "السماح للأدوات المستقلة بتنفيذ 'npm install' دون تحقق صارم قد يحول أجهزة المطورين المؤسسية إلى روبوتات خاضعة للتحكم عن بُعد.",
          "يجب ألا تدخل أي حزمة خارجية إلى بيئة الإنتاج قبل التحقق منها داخل بيئة معزولة حتمية.",
        ],
      },
      pt: {
        tag: "CADEIA DE SUPRIMENTOS",
        title: "Anthropic Claude Code e Anatomia de Trojans: Zero Trust na Cadeia de Suprimentos de Software",
        excerpt: "Pacotes NPM ocultos invadindo ambientes locais e os riscos de agentes autônomos instalarem dependências sem verificação.",
        date: "7 nov 2026",
        readTime: "5 min de leitura",
        metrics: [
          { label: "VETOR DE RISCO", val: "NPM Poison" },
          { label: "DEFESA", val: "Zero-Trust" },
        ],
        content: [
          "Com a popularização dos agentes de terminal, invasores passaram a explorar erros de digitação (typosquatting) de bibliotecas NPM nos padrões sugeridos por LLMs.",
          "Deixar ferramentas autônomas rodarem 'npm install' sem validação pode transformar máquinas corporativas em bots controlados remotamente.",
          "Nenhuma dependência externa deve entrar em produção sem verificação prévia em sandbox determinístico.",
        ],
      },
      de: {
        tag: "SOFTWARE-LIEFERKETTE",
        title: "Anthropic Claude Code & Trojaner-Anatomie: Zero Trust in der Software-Lieferkette",
        excerpt: "Versteckte NPM-Pakete in Entwicklerumgebungen und das Risiko unkontrollierter Paketinstallationen durch autonome Terminal-Agenten.",
        date: "7. Nov. 2026",
        readTime: "5 Min. Lesezeit",
        metrics: [
          { label: "RISIKOVEKTOR", val: "NPM-Poisoning" },
          { label: "ABWEHR", val: "Zero-Trust" },
        ],
        content: [
          "Mit dem Aufstieg von Terminal-Agenten schleusen Angreifer gezielt Typosquatting-Varianten populärer NPM-Pakete in LLM-Vorschlagsmuster ein.",
          "Wenn autonome Agenten ohne Bestätigung 'npm install' ausführen, können Entwicklerrechner zu ferngesteuerten Bots werden.",
          "Keine externe Abhängigkeit darf ohne deterministische Sandbox-Prüfung in Produktionssysteme gelangen.",
        ],
      },
      ja: {
        tag: "ソフトウェア供給網",
        title: "Claude Codeとトロイの木馬の解剖：ソフトウェアサプライチェーンにおけるゼロトラスト",
        excerpt: "開発環境に忍び込む不正NPMパッケージと、自律ターミナルエージェントによる無検証インストールが招く危険。",
        date: "2026年11月7日",
        readTime: "5分で読了",
        metrics: [
          { label: "リスク種別", val: "NPMポイズン" },
          { label: "防御原則", val: "Zero-Trust" },
        ],
        content: [
          "ターミナル型エージェントの普及に伴い、攻撃者は人気NPMライブラリのタイポスクワッティング版をLLMの補完パターンへ紛れ込ませるようになった。",
          "自律ツールが承認なしに 'npm install' を実行すれば、企業のエンジニア端末が遠隔操作ボットへ変貌しかねない。",
          "外部依存パッケージはすべて決定論的サンドボックスで検証してから本番環境へ取り込む必要がある。",
        ],
      },
    },
  },
  {
    slug: "ollama-performans-vergisi-vllm",
    tag: "LLM ÇIKARIM MOTORLARI",
    category: "llm",
    title: "Ollama'nın 'Kolaylık Vergisi': Yerel Çıkarımda Neden Saf llama.cpp ve vLLM Kazanıyor?",
    excerpt: "Yerel geliştirici araçlarının prodüksiyonda eşzamanlı istekler altında PagedAttention ve KV-Cache optimizasyon kayıpları.",
    date: "6 Kas 2026",
    isoDate: "2026-11-06",
    readTime: "5 dk okuma",
    imageUrl: "/blog/ollama-performans-vergisi-vllm.png",
    metrics: [
      { label: "GECİKME FARKI", val: "%42 Düşüş" },
      { label: "MOTOR", val: "PagedAttention" },
    ],
    content: [
      "Geliştiricilerin dizüstü bilgisayarlarında sevimli bir ikondan ibaret olan Ollama, gerçek bir Kubernetes kümesinde eşzamanlı 100 kullanıcıya hizmet veremez.",
      "vLLM ve TensorRT-LLM mimarilerinin sürekli batchleme (continuous batching) ve PagedAttention motorları olmadan kurumsal AI ölçeklenemez.",
      "Oyuncağı üretimden ayıran çizgi: Sentetik gecikme süresi (latency) ve token-başına-maliyet denetimidir.",
    ],
    translations: {
      en: {
        tag: "LLM INFERENCE ENGINES",
        title: "Ollama's 'Convenience Tax': Why Native llama.cpp and vLLM Win in Production Inference",
        excerpt: "Why local developer wrappers bleed PagedAttention and KV-cache efficiency under real concurrent production traffic.",
        date: "Nov 6, 2026",
        readTime: "5 min read",
        metrics: [
          { label: "LATENCY REDUCTION", val: "42% Lower" },
          { label: "ENGINE CORE", val: "PagedAttention" },
        ],
        content: [
          "A cute menu-bar daemon designed for developer laptops cannot serve 100 concurrent enterprise users inside a Kubernetes cluster.",
          "Without continuous batching and PagedAttention engines found in vLLM and TensorRT-LLM, production AI throughput simply cannot scale.",
          "What separates a toy prototype from production infrastructure is strict tail-latency discipline and cost-per-token control.",
        ],
      },
      zh: {
        tag: "大模型推理引擎",
        title: "Ollama 的“便利税”：为何本地与生产推理中原生 llama.cpp 和 vLLM 完胜",
        excerpt: "本地开发封装工具在高并发生产流量下如何因缺失 PagedAttention 与 KV-Cache 优化而吞吐骤降。",
        date: "2026年11月6日",
        readTime: "5 分钟阅读",
        metrics: [
          { label: "延迟降幅", val: "降低 42%" },
          { label: "核心引擎", val: "PagedAttention" },
        ],
        content: [
          "在笔记本电脑上好用的轻量化图标工具，无法在真实的 Kubernetes 集群中同时服务百名并发用户。",
          "缺乏 vLLM 与 TensorRT-LLM 的连续批处理（continuous batching）与 PagedAttention 调度，企业级 AI 根本无法扩展。",
          "区分玩具与生产系统的分水岭，始终是尾延迟（latency）与每百万 token 成本的精确控制。",
        ],
      },
      hi: {
        tag: "LLM इन्फरेंस इंजन",
        title: "Ollama का 'सुविधा कर': प्रोडक्शन और लोकल इन्फरेंस में llama.cpp व vLLM क्यों जीतते हैं?",
        excerpt: "प्रोडक्शन में समवर्ती ट्रैफ़िक बढ़ने पर लोकल रैपर टूल्स में PagedAttention और KV-Cache दक्षता का नुकसान।",
        date: "6 नवम्बर 2026",
        readTime: "5 मिनट",
        metrics: [
          { label: "लेटेंसी अंतर", val: "42% कमी" },
          { label: "कोर इंजन", val: "PagedAttention" },
        ],
        content: [
          "लैपटॉप पर चलने वाला आसान डेवलपर टूल असली Kubernetes क्लस्टर में एक साथ 100 यूज़र्स को सर्व नहीं कर सकता।",
          "vLLM और TensorRT-LLM की continuous batching और PagedAttention तकनीक के बिना एंटरप्राइज़ AI स्केल नहीं हो सकता।",
          "खिलौने और प्रोडक्शन सिस्टम के बीच की असली रेखा लेटेंसी और प्रति-टोकन लागत नियंत्रण है।",
        ],
      },
      es: {
        tag: "MOTORES DE INFERENCIA LLM",
        title: "El 'impuesto de comodidad' de Ollama: Por qué llama.cpp puro y vLLM ganan en inferencia",
        excerpt: "Por qué las herramientas locales de escritorio pierden eficiencia de PagedAttention y KV-Cache bajo concurrencia real en producción.",
        date: "6 nov 2026",
        readTime: "5 min lectura",
        metrics: [
          { label: "REDUCCIÓN LATENCIA", val: "42% Menos" },
          { label: "MOTOR CENTRAL", val: "PagedAttention" },
        ],
        content: [
          "Lo que en el portátil del desarrollador parece una utilidad encantadora no puede atender a 100 usuarios simultáneos en un clúster de Kubernetes.",
          "Sin continuous batching ni PagedAttention propios de vLLM y TensorRT-LLM, la IA corporativa no escala.",
          "La frontera entre un juguete y la producción está en la latencia de cola y el control del coste por token.",
        ],
      },
      ar: {
        tag: "محركات استدلال النماذج",
        title: "'ضريبة الراحة' في Ollama: لماذا يتفوق llama.cpp الأصلي وvLLM في الاستدلال الإنتاجي؟",
        excerpt: "تراجع كفاءة PagedAttention وKV-Cache في أدوات التطوير المحلية عند مواجهة طلبات متزامنة في بيئة الإنتاج.",
        date: "6 نوفمبر 2026",
        readTime: "5 دقائق",
        metrics: [
          { label: "فرق الكمون", val: "انخفاض 42%" },
          { label: "نواة المحرك", val: "PagedAttention" },
        ],
        content: [
          "أداة سطح المكتب البسيطة على الحاسوب المحمول لا تستطيع خدمة 100 مستخدم متزامن داخل عنقود Kubernetes حقيقي.",
          "بدون التجميع المستمر (continuous batching) وPagedAttention في vLLM وTensorRT-LLM لا يمكن للذكاء الاصطناعي المؤسسي التوسع.",
          "الحد الفاصل بين التجربة والإنتاج هو ضبط الكمون وتكلفة كل رمز (token).",
        ],
      },
      pt: {
        tag: "MOTORES DE INFERÊNCIA LLM",
        title: "O 'Imposto da Conveniência' do Ollama: Por Que llama.cpp Puro e vLLM Vencem em Produção",
        excerpt: "Como ferramentas locais perdem eficiência de PagedAttention e KV-Cache sob requisições simultâneas em ambiente produtivo.",
        date: "6 nov 2026",
        readTime: "5 min de leitura",
        metrics: [
          { label: "REDUÇÃO DE LATÊNCIA", val: "42% Menor" },
          { label: "MOTOR CORE", val: "PagedAttention" },
        ],
        content: [
          "Um utilitário simpático no notebook do desenvolvedor não sustenta 100 usuários simultâneos em um cluster Kubernetes real.",
          "Sem continuous batching e PagedAttention do vLLM e TensorRT-LLM, a IA corporativa não escala.",
          "A linha entre brinquedo e produção é o controle rigoroso de latência e custo por token.",
        ],
      },
      de: {
        tag: "LLM-INFERENZ-ENGINES",
        title: "Ollamas 'Bequemlichkeitssteuer': Warum natives llama.cpp und vLLM in der Produktion gewinnen",
        excerpt: "Warum lokale Entwickler-Wrapper unter echter Nebenläufigkeit PagedAttention- und KV-Cache-Effizienz verlieren.",
        date: "6. Nov. 2026",
        readTime: "5 Min. Lesezeit",
        metrics: [
          { label: "LATENZREDUKTION", val: "42 % Weniger" },
          { label: "ENGINE-KERN", val: "PagedAttention" },
        ],
        content: [
          "Ein bequemes Desktop-Tool auf dem Entwickler-Laptop kann keine 100 gleichzeitigen Nutzer in einem Kubernetes-Cluster bedienen.",
          "Ohne Continuous Batching und PagedAttention von vLLM und TensorRT-LLM skaliert produktive KI nicht.",
          "Die Grenze zwischen Spielzeug und Produktion verläuft entlang strikter Latenz- und Kosten-pro-Token-Kontrolle.",
        ],
      },
      ja: {
        tag: "LLM推論エンジン",
        title: "Ollamaの「利便性税」：なぜ本番推論ではネイティブ llama.cpp と vLLM が勝つのか",
        excerpt: "ローカル開発向けラッパーが本番環境の同時リクエスト下で直面するPagedAttentionとKV-Cache効率の壁。",
        date: "2026年11月6日",
        readTime: "5分で読了",
        metrics: [
          { label: "レイテンシ削減", val: "42% 低下" },
          { label: "コアエンジン", val: "PagedAttention" },
        ],
        content: [
          "開発者のノートPCで手軽に動く常駐ツールは、Kubernetesクラスタ上で100人の同時ユーザーをさばくことはできない。",
          "vLLMやTensorRT-LLMが備えるContinuous BatchingとPagedAttentionなしに、エンタープライズAIはスケールしない。",
          "おもちゃと本番基盤を分ける境界線は、レイテンシとトークン単価の厳格な制御である。",
        ],
      },
    },
  },
  {
    slug: "qwen-acik-kaynak-silikon-vadisi",
    tag: "AÇIK KAYNAK AI",
    category: "llm",
    title: "Çin Açık Kaynağının Zaferi: Qwen'in 'Sonuna Kadar Açık Kaynak' Resti ve Silikon Vadisi Tekeli",
    excerpt: "Kapalı kapılar ardındaki tescilli modellerin karşısında, açık ağırlıklı (open-weights) Qwen modellerinin küresel üstünlüğü.",
    date: "5 Kas 2026",
    isoDate: "2026-11-05",
    readTime: "6 dk okuma",
    imageUrl: "/blog/qwen-acik-kaynak-silikon-vadisi.png",
    metrics: [
      { label: "LİSANS", val: "Apache 2.0" },
      { label: "BENCHMARK", val: "SOTA Tier 1" },
    ],
    content: [
      "Silikon Vadisi şirketleri 'güvenlik' bahanesiyle modelleri API parmaklıkları arkasına hapsederken, açık kaynak Qwen modelleri açık ağırlıklarla dünya pazarını ele geçirdi.",
      "Kurumsal şirketlerin kendi verileri üzerinde fine-tune edebileceği bağımsız açık modeller, geleceğin teknolojik egemenliğinin anahtarıdır.",
    ],
    translations: {
      en: {
        tag: "OPEN SOURCE AI",
        title: "The Open-Weights Victory: Qwen's 'Open Until the End' Gambit vs. Silicon Valley Monopolies",
        excerpt: "Against proprietary models locked behind closed API walls, open-weight Qwen releases captured global engineering adoption.",
        date: "Nov 5, 2026",
        readTime: "6 min read",
        metrics: [
          { label: "LICENSE", val: "Apache 2.0" },
          { label: "BENCHMARK", val: "SOTA Tier 1" },
        ],
        content: [
          "While Silicon Valley incumbents locked frontier weights behind API paywalls in the name of 'safety,' open-weight Qwen models won worldwide developer mindshare.",
          "Sovereign, open-weight models that enterprises can inspect and fine-tune on their own data remain the true foundation of technological independence.",
        ],
      },
      zh: {
        tag: "开源 AI",
        title: "开源权重的胜利：Qwen“开源到底”的宣言与硅谷闭源垄断",
        excerpt: "面对被锁在闭源 API 高墙后的商业模型，开放权重的 Qwen 系列如何赢得全球工程师的青睐。",
        date: "2026年11月5日",
        readTime: "6 分钟阅读",
        metrics: [
          { label: "开源协议", val: "Apache 2.0" },
          { label: "基准水准", val: "SOTA Tier 1" },
        ],
        content: [
          "当硅谷巨头以“安全”为借口把前沿模型锁进付费 API 围栏时，开源权重的 Qwen 模型正凭借透明与高性能席卷全球开发者社区。",
          "能够让企业基于自有数据自主微调的独立开源模型，才是未来技术主权的核心钥匙。",
        ],
      },
      hi: {
        tag: "ओपन-सोर्स AI",
        title: "ओपन-वेट्स की जीत: Qwen की खुली रणनीति बनाम सिलिकॉन वैली की बंद मोनोपॉली",
        excerpt: "बंद API दीवारों के पीछे कैद प्रोप्राइटरी मॉडलों के सामने ओपन-वेट Qwen मॉडलों की वैश्विक बढ़त।",
        date: "5 नवम्बर 2026",
        readTime: "6 मिनट",
        metrics: [
          { label: "लाइसेंस", val: "Apache 2.0" },
          { label: "बेंचमार्क", val: "SOTA Tier 1" },
        ],
        content: [
          "जब सिलिकॉन वैली की कंपनियां 'सुरक्षा' के नाम पर मॉडलों को API के ताले में बंद कर रही थीं, तब ओपन-वेट Qwen मॉडलों ने वैश्विक डेवलपर बाज़ार जीत लिया।",
          "जिन स्वतंत्र ओपन मॉडलों को कंपनियां अपने डेटा पर फाइन-ट्यून कर सकती हैं, वही भविष्य की तकनीकी संप्रभुता की कुंजी हैं।",
        ],
      },
      es: {
        tag: "IA DE CÓDIGO ABIERTO",
        title: "La victoria del código abierto: La apuesta de Qwen frente al monopolio cerrado de Silicon Valley",
        excerpt: "Frente a modelos propietarios encerrados tras muros de API, los modelos de pesos abiertos de Qwen lideran la adopción global.",
        date: "5 nov 2026",
        readTime: "6 min lectura",
        metrics: [
          { label: "LICENCIA", val: "Apache 2.0" },
          { label: "BENCHMARK", val: "SOTA Tier 1" },
        ],
        content: [
          "Mientras las grandes firmas de Silicon Valley encerraban sus modelos tras APIs de pago bajo el pretexto de la seguridad, Qwen conquistó el mercado con pesos abiertos.",
          "Los modelos abiertos e independientes que las empresas pueden ajustar sobre sus propios datos son la base real de la soberanía tecnológica.",
        ],
      },
      ar: {
        tag: "الذكاء الاصطناعي مفتوح المصدر",
        title: "انتصار الأوزان المفتوحة: رهان Qwen المفتوح في مواجهة احتكار وادي السيليكون",
        excerpt: "في مواجهة النماذج المغلقة خلف جدران واجهات البرمجة، تحصد نماذج Qwen ذات الأوزان المفتوحة الصدارة العالمية.",
        date: "5 نوفمبر 2026",
        readTime: "6 دقائق",
        metrics: [
          { label: "الترخيص", val: "Apache 2.0" },
          { label: "التصنيف", val: "SOTA Tier 1" },
        ],
        content: [
          "بينما تحبس شركات وادي السيليكون نماذجها خلف أسوار API بذريعة الأمان، استحوذت نماذج Qwen ذات الأوزان المفتوحة على ثقة المطورين عالمياً.",
          "النماذج المفتوحة المستقلة التي تستطيع المؤسسات ضبطها على بياناتها الخاصة هي مفتاح السيادة التقنية.",
        ],
      },
      pt: {
        tag: "IA OPEN SOURCE",
        title: "A Vitória dos Pesos Abertos: A Aposta da Qwen Contra o Monopólio Fechado do Vale do Silício",
        excerpt: "Diante de modelos proprietários trancados atrás de APIs fechadas, os modelos open-weights da Qwen conquistaram a engenharia global.",
        date: "5 nov 2026",
        readTime: "6 min de leitura",
        metrics: [
          { label: "LICENÇA", val: "Apache 2.0" },
          { label: "BENCHMARK", val: "SOTA Tier 1" },
        ],
        content: [
          "Enquanto empresas do Vale do Silício trancavam modelos atrás de APIs pagas sob a desculpa de segurança, o Qwen ganhou o mundo com pesos abertos.",
          "Modelos abertos independentes, que empresas podem ajustar nos seus próprios dados, são a chave da soberania tecnológica.",
        ],
      },
      de: {
        tag: "OPEN-SOURCE-KI",
        title: "Sieg der offenen Gewichte: Qwens Open-Source-Offensive gegen das Silicon-Valley-Monopol",
        excerpt: "Gegenüber proprietären Modellen hinter geschlossenen API-Schranken gewinnen offene Qwen-Modelle weltweit an Boden.",
        date: "5. Nov. 2026",
        readTime: "6 Min. Lesezeit",
        metrics: [
          { label: "LIZENZ", val: "Apache 2.0" },
          { label: "BENCHMARK", val: "SOTA Tier 1" },
        ],
        content: [
          "Während Silicon-Valley-Konzerne Modelle unter dem Vorwand der Sicherheit hinter API-Bezahlschranken sperren, eroberten offene Qwen-Gewichte den Weltmarkt.",
          "Unabhängige offene Modelle, die Unternehmen auf eigenen Daten feinabstimmen können, sind der Schlüssel zu echter technologischer Souveränität.",
        ],
      },
      ja: {
        tag: "オープンソースAI",
        title: "オープンウェイトの勝利：Qwenの徹底公開戦略とシリコンバレー独占の終焉",
        excerpt: "閉鎖型APIの壁の向こうに閉じ込められた商用モデルに対し、公開重みモデルQwenが世界の現場を席巻する理由。",
        date: "2026年11月5日",
        readTime: "6分で読了",
        metrics: [
          { label: "ライセンス", val: "Apache 2.0" },
          { label: "ベンチマーク", val: "SOTA Tier 1" },
        ],
        content: [
          "シリコンバレー企業が「安全性」を口実にモデルをAPIの檻へ閉じ込める一方、オープンウェイトのQwenが世界中の開発現場を制覇した。",
          "企業が自社データで自由にファインチューニングできる独立したオープンモデルこそが、未来の技術主権の鍵となる。",
        ],
      },
    },
  },
  {
    slug: "openai-1-2-milyon-dolarlik-linux-exploit-skandali",
    tag: "AJAN GÜVENLİĞİ",
    category: "guvenlik",
    title: "OpenAI'ın 1.2 Milyon Dolarlık Linux Exploit Şovu: Açık Kaynak Topluluğuna Kesilen Ağır Fatura",
    excerpt: "Kod yorumlayıcı ve ajan konteynerlarının Linux çekirdeğindeki zafiyetlerle ana sisteme sızma vektörleri.",
    date: "4 Kas 2026",
    isoDate: "2026-11-04",
    readTime: "5 dk okuma",
    imageUrl: "/blog/openai-1-2-milyon-dolarlik-linux-exploit-skandali.png",
    metrics: [
      { label: "ÖDÜL", val: "$1.2M BugBounty" },
      { label: "KATMAN", val: "Kernel Sandbox" },
    ],
    content: [
      "Ajan sanal makinelerinden kaçış zafiyetleri, otonom sistemlerde sıfır güven (zero-trust) mimarisini zorunlu kılmaktadır.",
      "Çalışma zamanında koşan her otonom ajan için hipervizör seviyesinde izolasyon ve deterministik filtreler gereklidir.",
    ],
    translations: {
      en: {
        tag: "AGENT SECURITY",
        title: "OpenAI's $1.2M Linux Exploit Show: The Steep Bill Handed to Open-Source Maintainers",
        excerpt: "Container escape vectors inside code-interpreter sandboxes and Linux kernel boundary risks for autonomous agents.",
        date: "Nov 4, 2026",
        readTime: "5 min read",
        metrics: [
          { label: "BOUNTY", val: "$1.2M BugBounty" },
          { label: "LAYER", val: "Kernel Sandbox" },
        ],
        content: [
          "VM and container escape vectors make zero-trust isolation non-negotiable across autonomous agent runtimes.",
          "Every code-executing agent requires hypervisor-grade containment combined with deterministic execution filters.",
        ],
      },
      zh: {
        tag: "代理安全",
        title: "OpenAI 的 120 万美元 Linux 漏洞秀：转嫁给开源社区的沉重账单",
        excerpt: "代码解释器与代理容器通过 Linux 内核漏洞逃逸并渗透宿主系统的攻击向量剖析。",
        date: "2026年11月4日",
        readTime: "5 分钟阅读",
        metrics: [
          { label: "漏洞赏金", val: "$1.2M 悬赏" },
          { label: "隔离层级", val: "内核沙箱" },
        ],
        content: [
          "代理虚拟机逃逸漏洞表明，自主系统必须强制采用零信任（zero-trust）隔离架构。",
          "每一个在运行时执行代码的自主代理，都需要虚拟机监视器级别的隔离与确定性安全过滤。",
        ],
      },
      hi: {
        tag: "एजेंट सुरक्षा",
        title: "OpenAI का 1.2 मिलियन डॉलर का Linux एक्सप्लॉइट शो: ओपन-सोर्स समुदाय पर भारी बिल",
        excerpt: "कोड इंटरप्रेटर और एजेंट कंटेनरों से Linux कर्नेल कमजोरियों के जरिए होस्ट सिस्टम में सेंध के खतरे।",
        date: "4 नवम्बर 2026",
        readTime: "5 मिनट",
        metrics: [
          { label: "इनाम राशि", val: "$1.2M बगबाउंटी" },
          { label: "सुरक्षा स्तर", val: "कर्नेल सैंडबॉक्स" },
        ],
        content: [
          "एजेंट वर्चुअल मशीन से बाहर निकलने के खतरे ऑटोनॉमस सिस्टम में ज़ीरो-ट्रस्ट आर्किटेक्चर को अनिवार्य बनाते हैं।",
          "रनटाइम पर चलने वाले हर ऑटोनॉमस एजेंट के लिए हाइपरवाइज़र-स्तर का आइसोलेशन और निर्धारक फ़िल्टर आवश्यक हैं।",
        ],
      },
      es: {
        tag: "SEGURIDAD DE AGENTES",
        title: "El espectáculo del exploit Linux de 1,2 millones de OpenAI: Una dura factura para el código abierto",
        excerpt: "Vectores de escape desde contenedores de intérpretes de código mediante vulnerabilidades en el kernel Linux.",
        date: "4 nov 2026",
        readTime: "5 min lectura",
        metrics: [
          { label: "RECOMPENSA", val: "$1,2M BugBounty" },
          { label: "CAPA", val: "Kernel Sandbox" },
        ],
        content: [
          "Las vulnerabilidades de escape en máquinas virtuales de agentes obligan a adoptar arquitecturas zero-trust reales.",
          "Cada agente que ejecuta código en tiempo real requiere aislamiento a nivel de hipervisor y filtros deterministas.",
        ],
      },
      ar: {
        tag: "أمن الوكلاء",
        title: "استعراض ثغرة Linux بقيمة 1.2 مليون دولار من OpenAI: فاتورة باهظة على مجتمع المصادر المفتوحة",
        excerpt: "مسارات الهروب من حاويات مفسر الشيفرة واستغلال ثغرات نواة Linux لاختراق النظام المضيف.",
        date: "4 نوفمبر 2026",
        readTime: "5 دقائق",
        metrics: [
          { label: "المكافأة", val: "$1.2M BugBounty" },
          { label: "الطبقة", val: "عزل النواة" },
        ],
        content: [
          "تفرض ثغرات الهروب من الأجهزة الافتراضية للوكلاء اعتماد معمارية الثقة الصفرية (Zero-Trust).",
          "يحتاج كل وكيل مستقل يعمل في وقت التشغيل إلى عزل على مستوى المشرف الفائق (Hypervisor) ومرشحات حتمية.",
        ],
      },
      pt: {
        tag: "SEGURANÇA DE AGENTES",
        title: "O Show de US$ 1,2 Milhão da OpenAI no Linux: A Fatura Pesada para a Comunidade Open Source",
        excerpt: "Vetores de escape de contêineres de agentes explorando falhas no kernel Linux rumo ao sistema hospedeiro.",
        date: "4 nov 2026",
        readTime: "5 min de leitura",
        metrics: [
          { label: "RECOMPENSA", val: "$1,2M BugBounty" },
          { label: "CAMADA", val: "Kernel Sandbox" },
        ],
        content: [
          "Falhas de escape em máquinas virtuais de agentes tornam a arquitetura zero-trust indispensável.",
          "Todo agente autônomo em execução exige isolamento em nível de hipervisor e filtros determinísticos.",
        ],
      },
      de: {
        tag: "AGENTEN-SICHERHEIT",
        title: "OpenAIs 1,2-Millionen-Dollar-Linux-Exploit-Show: Eine teure Rechnung für Open Source",
        excerpt: "Container-Ausbruchsvektoren in Code-Interpreter-Laufzeiten über Schwachstellen im Linux-Kernel.",
        date: "4. Nov. 2026",
        readTime: "5 Min. Lesezeit",
        metrics: [
          { label: "PRÄMIE", val: "1,2 Mio. $ Bounty" },
          { label: "EBENE", val: "Kernel-Sandbox" },
        ],
        content: [
          "Ausbruchsschwachstellen aus Agenten-VMs machen eine konsequente Zero-Trust-Architektur unverzichtbar.",
          "Jeder zur Laufzeit aktive autonome Agent benötigt Hypervisor-Isolation und deterministische Ausführungsfilter.",
        ],
      },
      ja: {
        tag: "エージェント安全",
        title: "OpenAI 120万ドルのLinuxエクスプロイト劇：オープンソース界に突きつけられた請求書",
        excerpt: "コードインタープリタやエージェント用コンテナからLinuxカーネルの脆弱性を突いてホストへ脱出する攻撃経路。",
        date: "2026年11月4日",
        readTime: "5分で読了",
        metrics: [
          { label: "報奨金", val: "$1.2M BugBounty" },
          { label: "防御層", val: "Kernel Sandbox" },
        ],
        content: [
          "エージェント仮想環境からの脱出脆弱性は、自律システムにおけるゼロトラスト隔離の必須性を示している。",
          "実行時に動作するすべての自律エージェントには、ハイパーバイザ水準の隔離と決定論的フィルタが不可欠だ。",
        ],
      },
    },
  },
  {
    slug: "10-kasim-teknolojik-egemenlik-ve-ataturk",
    tag: "TEKNOLOJİK EGEMENLİK",
    category: "mimari",
    title: "10 Kasım ve Teknolojik Egemenlik: 'İstikbal Göklerdedir'den Amerikan API Bayiliğine",
    excerpt: "Bir ülkenin bağımsızlığı, sunucuların nerede çalıştığı ve model ağırlıklarının kime ait olduğuyla doğrudan bağlantılıdır.",
    date: "10 Kas 2026",
    isoDate: "2026-11-10",
    readTime: "7 dk okuma",
    imageUrl: "/blog/10-kasim-teknolojik-egemenlik-ve-ataturk.png",
    metrics: [
      { label: "VİZYON", val: "Tam Bağımsızlık" },
      { label: "MİMARİ", val: "Yerli Ağırlık" },
    ],
    content: [
      "Cumhuriyetin ilk yıllarında uçak fabrikaları ve demir ağlarla kurulan sanayi bağımsızlığı vizyonu, 21. yüzyılda yerini yabancı bulut sağlayıcılarının API lisanslarına bırakamaz.",
      "Gerçek teknolojik egemenlik, kendi hesaplama altyapınız üzerinde koşan deterministik modeller ve kendi donanımınızda çalışan otonom sistemlerle mümkündür.",
    ],
    translations: {
      en: {
        tag: "TECHNOLOGICAL SOVEREIGNTY",
        title: "November 10 & Technological Sovereignty: From 'The Future Is in the Skies' to Foreign API Reselling",
        excerpt: "National independence in the 21st century is inseparable from where servers run and who owns the model weights.",
        date: "Nov 10, 2026",
        readTime: "7 min read",
        metrics: [
          { label: "DOCTRINE", val: "Full Sovereignty" },
          { label: "ARCHITECTURE", val: "Domestic Weights" },
        ],
        content: [
          "An industrial independence vision built with domestic factories and infrastructure cannot be surrendered in the 21st century to foreign cloud API keys.",
          "True technological sovereignty requires deterministic models running on sovereign compute and autonomous systems operating on local hardware.",
        ],
      },
      zh: {
        tag: "技术主权",
        title: "11月10日与技术主权：从工业独立愿景到外国 API 代理商的反思",
        excerpt: "在 21 世纪，一个国家的独立性与服务器部署在何处、模型权重归谁所有息息相关。",
        date: "2026年11月10日",
        readTime: "7 分钟阅读",
        metrics: [
          { label: "核心愿景", val: "完全自主" },
          { label: "技术架构", val: "本土模型权重" },
        ],
        content: [
          "以自主工业与基础设施奠定的独立愿景，绝不能在 21 世纪沦为对海外闭源云厂商 API 授权的依附。",
          "真正的技术主权，源于运行在自有算力之上、由本地硬件承载的确定性模型与自主智能系统。",
        ],
      },
      hi: {
        tag: "तकनीकी संप्रभुता",
        title: "10 नवंबर और तकनीकी संप्रभुता: आत्मनिर्भर औद्योगिक दृष्टि से विदेशी API रीसेलिंग तक",
        excerpt: "21वीं सदी में किसी देश की स्वतंत्रता इस बात से जुड़ी है कि सर्वर कहां चलते हैं और मॉडल वेट्स किसके पास हैं।",
        date: "10 नवम्बर 2026",
        readTime: "7 मिनट",
        metrics: [
          { label: "दृष्टिकोण", val: "पूर्ण संप्रभुता" },
          { label: "आर्किटेक्चर", val: "स्वदेशी वेट्स" },
        ],
        content: [
          "स्वदेशी कारखानों और बुनियादी ढांचे पर बनी औद्योगिक स्वतंत्रता की दृष्टि 21वीं सदी में विदेशी क्लाउड API लाइसेंसों पर निर्भर नहीं छोड़ी जा सकती।",
          "सच्ची तकनीकी संप्रभुता अपने कंप्यूट इन्फ्रास्ट्रक्चर और अपने हार्डवेयर पर चलने वाले निर्धारक मॉडलों से ही संभव है।",
        ],
      },
      es: {
        tag: "SOBERANÍA TECNOLÓGICA",
        title: "10 de noviembre y soberanía tecnológica: De la independencia industrial a revender APIs extranjeras",
        excerpt: "La independencia de un país en el siglo XXI depende directamente de dónde corren los servidores y a quién pertenecen los pesos del modelo.",
        date: "10 nov 2026",
        readTime: "7 min lectura",
        metrics: [
          { label: "VISIÓN", val: "Plena Soberanía" },
          { label: "ARQUITECTURA", val: "Pesos Propios" },
        ],
        content: [
          "La visión de independencia industrial forjada con fábricas e infraestructura propia no puede ceder su lugar en el siglo XXI a licencias API de nubes extranjeras.",
          "La verdadera soberanía tecnológica exige modelos deterministas ejecutados sobre cómputo propio y sistemas autónomos en hardware soberano.",
        ],
      },
      ar: {
        tag: "السيادة التقنية",
        title: "10 نوفمبر والسيادة التكنولوجية: من الاستقلال الصناعي إلى وساطة واجهات API الأجنبية",
        excerpt: "يرتبط استقلال أي دولة في القرن الحادي والعشرين ارتباطاً مباشراً بمكان تشغيل الخوادم وبمن يملك أوزان النماذج.",
        date: "10 نوفمبر 2026",
        readTime: "7 دقائق",
        metrics: [
          { label: "الرؤية", val: "سيادة كاملة" },
          { label: "المعمارية", val: "أوزان محلية" },
        ],
        content: [
          "لا يمكن لرؤية الاستقلال الصناعي أن تتحول في القرن الحادي والعشرين إلى مجرد اعتماد على تراخيص API من مزودي السحابة الأجانب.",
          "السيادة التكنولوجية الحقيقية تتحقق بنماذج حتمية تعمل على بنيتك الحسابية الخاصة وأنظمة مستقلة فوق عتادك الوطني.",
        ],
      },
      pt: {
        tag: "SOBERANIA TECNOLÓGICA",
        title: "10 de Novembro e Soberania Tecnológica: Da Independência Industrial à Revenda de APIs Estrangeiras",
        excerpt: "A independência de um país no século XXI está ligada diretamente a onde rodam os servidores e a quem pertencem os pesos dos modelos.",
        date: "10 nov 2026",
        readTime: "7 min de leitura",
        metrics: [
          { label: "VISÃO", val: "Plena Soberania" },
          { label: "ARQUITETURA", val: "Pesos Nacionais" },
        ],
        content: [
          "A visão de independência industrial construída com fábricas e infraestrutura própria não pode se render no século XXI a licenças de API em nuvens estrangeiras.",
          "A verdadeira soberania tecnológica nasce de modelos determinísticos rodando em computação soberana e hardware próprio.",
        ],
      },
      de: {
        tag: "TECHNOLOGISCHE SOUVERÄNITÄT",
        title: "10. November & Technologische Souveränität: Von industrieller Eigenständigkeit zum API-Wiederverkauf",
        excerpt: "Die Unabhängigkeit eines Landes hängt im 21. Jahrhundert direkt davon ab, wo Server laufen und wem die Modellgewichte gehören.",
        date: "10. Nov. 2026",
        readTime: "7 Min. Lesezeit",
        metrics: [
          { label: "VISION", val: "Volle Souveränität" },
          { label: "ARCHITEKTUR", val: "Eigene Gewichte" },
        ],
        content: [
          "Die Vision industrieller Unabhängigkeit darf im 21. Jahrhundert nicht durch bloße API-Lizenzen ausländischer Cloud-Konzerne ersetzt werden.",
          "Echte technologische Souveränität entsteht durch deterministische Modelle auf eigener Recheninfrastruktur und lokaler Hardware.",
        ],
      },
      ja: {
        tag: "技術主権",
        title: "11月10日と技術主権：産業自立の理念から海外API代理店への警鐘",
        excerpt: "21世紀における国家の自立は、サーバーがどこで稼働し、モデルの重みを誰が所有しているかに直結している。",
        date: "2026年11月10日",
        readTime: "7分で読了",
        metrics: [
          { label: "理念", val: "完全な自立" },
          { label: "アーキテクチャ", val: "国産ウェイト" },
        ],
        content: [
          "自前の工場とインフラで築かれた産業自立の理念を、21世紀において海外クラウド企業のAPIライセンス依存へ明け渡すことはできない。",
          "真の技術主権とは、自国の計算基盤と自社ハードウェア上で決定論的モデルと自律システムを稼働させることから生まれる。",
        ],
      },
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPostItem | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
