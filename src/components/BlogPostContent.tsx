"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  FileCode2,
  HelpCircle,
  Rss,
  Sparkles,
  Terminal,
} from "lucide-react";
import NewsletterSignupBox from "@/components/NewsletterSignupBox";
import ArticleEngagementHub from "@/components/ArticleEngagementHub";
import { getPostDiscussionData } from "@/data/postDiscussions";
import {
  BLOG_LANGUAGES,
  SITE_URL,
  generatePostFaqs,
  getBlogLangMeta,
  getBlogUiCopy,
  getLocalizedPost,
  getLocalizedSummary,
  resolveBlogLang,
  type BlogLang,
  type BlogPostItem,
  type BlogPostSummary,
} from "@/data/blogIndex";
import { ScrollProgress } from "@/components/core/scroll-progress";
import { Spotlight } from "@/components/core/spotlight";
import BlogLanguageSwitcher, {
  BLOG_LANG_STORAGE_KEY,
  resolveClientBlogLang,
} from "@/components/BlogLanguageSwitcher";
import {
  LinkedinIcon,
  TwitterXIcon,
  DevtoIcon,
  MediumIcon,
  GithubIcon,
} from "@/components/Icons";
import TypeformContactModal from "@/components/TypeformContactModal";

const INLINE_TOKEN_REGEX =
  /((?:^|(?<=[\s([{"“—]))(?:'[^'\n]{2,40}'|(?:\$|%)?\d+(?:[.,]\d+)*(?:\+|%|x|K|M|B|ms|GB|TB|MB)?)(?=$|[\s.,:;!?)\]}"”'/]))/g;

const MARKDOWN_TOKEN_REGEX =
  /(\*\*(?!\s)[^\n]+?(?<!\s)\*\*|`[^`\n]+`|(?<!\*)\*(?!\s)[^*\n]+?(?<!\s)\*(?!\*)|\[[^\]\n]+\]\((?:https?:\/\/[^)\s]+|\/[^)\s]+)\))/g;

const MARKDOWN_LINK_REGEX =
  /^\[([^\]\n]+)\]\(((?:https?:\/\/[^)\s]+|\/[^)\s]+))\)$/;

function stripInlineMarkdown(text: string): string {
  const parts = text.split(MARKDOWN_TOKEN_REGEX);
  if (parts.length <= 1) return text;

  return parts
    .map((part) => {
      if (!part) return "";
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return stripInlineMarkdown(part.slice(2, -2));
      }
      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        return part.slice(1, -1);
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return stripInlineMarkdown(part.slice(1, -1));
      }
      const linkMatch = MARKDOWN_LINK_REGEX.exec(part);
      if (linkMatch) {
        return linkMatch[1];
      }
      return part;
    })
    .join("");
}

function renderPlainSegment(text: string, keyPrefix: string): ReactNode {
  const parts = text.split(INLINE_TOKEN_REGEX);
  if (parts.length <= 1) return text;

  return parts.map((part, index) => {
    if (!part) return null;
    const isQuoted =
      part.startsWith("'") && part.endsWith("'") && part.length >= 4;
    if (isQuoted) {
      return (
        <span
          key={`${keyPrefix}-q-${index}`}
          className="text-white font-medium bg-white/[0.05] px-1.5 py-0.5 rounded-md border border-white/10"
        >
          {part}
        </span>
      );
    }

    const isMetric =
      /^(?:\$|%)?\d+(?:[.,]\d+)*(?:\+|%|x|K|M|B|ms|GB|TB|MB)?$/.test(part);
    if (isMetric) {
      return (
        <span
          key={`${keyPrefix}-m-${index}`}
          className="text-white font-semibold tabular-nums"
        >
          {part}
        </span>
      );
    }

    return <Fragment key={`${keyPrefix}-t-${index}`}>{part}</Fragment>;
  });
}

function renderInlineMarkdown(text: string, keyPrefix = "md"): ReactNode {
  const parts = text.split(MARKDOWN_TOKEN_REGEX);
  if (parts.length <= 1) {
    return renderPlainSegment(text, keyPrefix);
  }

  return parts.map((part, index) => {
    if (!part) return null;
    const tokenKey = `${keyPrefix}-${index}`;

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={tokenKey} className="text-white font-semibold">
          {renderInlineMarkdown(part.slice(2, -2), `${tokenKey}-b`)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={tokenKey}
          className="font-mono text-[0.88em] text-zinc-100 bg-white/[0.07] px-1.5 py-0.5 rounded-md border border-white/10"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={tokenKey} className="italic text-zinc-100">
          {renderInlineMarkdown(part.slice(1, -1), `${tokenKey}-i`)}
        </em>
      );
    }

    const linkMatch = MARKDOWN_LINK_REGEX.exec(part);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http");
      return (
        <a
          key={tokenKey}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
        >
          {label}
        </a>
      );
    }

    return (
      <Fragment key={tokenKey}>{renderPlainSegment(part, tokenKey)}</Fragment>
    );
  });
}

function renderFormattedParagraph(text: string): ReactNode {
  return renderInlineMarkdown(text);
}

export function BlogPostArticleBody({
  rawPost,
  relatedSummaries = [],
}: {
  rawPost: BlogPostItem;
  relatedSummaries?: BlogPostSummary[];
}) {
  const searchParams = useSearchParams();
  const rawLang = searchParams.get("lang");
  const [activeLang, setActiveLang] = useState<BlogLang>(() =>
    resolveBlogLang(rawLang)
  );

  useEffect(() => {
    setActiveLang(resolveClientBlogLang(rawLang));
  }, [rawLang]);

  return (
    <ArticleMarkup
      rawPost={rawPost}
      relatedSummaries={relatedSummaries}
      activeLang={activeLang}
      hasExplicitQueryLang={Boolean(rawLang)}
      onSelectLang={setActiveLang}
    />
  );
}

export function ArticleMarkup({
  rawPost,
  relatedSummaries = [],
  activeLang = "tr",
  hasExplicitQueryLang = false,
  onSelectLang,
}: {
  rawPost: BlogPostItem;
  relatedSummaries?: BlogPostSummary[];
  activeLang?: BlogLang;
  hasExplicitQueryLang?: boolean;
  onSelectLang?: (lang: BlogLang) => void;
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const articleBodyRef = useRef<HTMLDivElement | null>(null);
  const [selectionPopover, setSelectionPopover] = useState<{
    text: string;
    top: number;
    left: number;
    copied: boolean;
  } | null>(null);

  const post = getLocalizedPost(rawPost, activeLang);
  const langMeta = getBlogLangMeta(activeLang);
  const ui = getBlogUiCopy(activeLang);
  const faqs = generatePostFaqs(rawPost, activeLang);

  const availableCodes: BlogLang[] = BLOG_LANGUAGES.filter(
    (item) => item.code === "tr" || Boolean(rawPost.translations?.[item.code])
  ).map((item) => item.code);

  const articleUrl =
    activeLang === "tr"
      ? `${SITE_URL}/blog/${post.slug}`
      : `${SITE_URL}/blog/${post.slug}?lang=${activeLang}`;

  const blogArchiveHref =
    activeLang === "tr" ? "/blog" : `/blog?lang=${activeLang}`;

  const rssHref =
    activeLang === "tr" ? "/rss.xml" : `/rss.xml?lang=${activeLang}`;

  const relatedPosts = relatedSummaries.map((p) =>
    getLocalizedSummary(p, activeLang)
  );
  const postDiscussion = getPostDiscussionData(post.slug);

  const isTr = activeLang === "tr";

  const categoryNoteMap: Record<
    BlogPostItem["category"],
    { badge: string; title: string; body: string }
  > = {
    guvenlik: isTr
      ? {
          badge: "ZERO-TRUST & GÜVENLİK",
          title: "Üretim sistemlerinde deterministik koruma",
          body: "Otonom ajanlar, RLS sınırları ve veri izolasyonu için sıfır açık toleranslı güvenlik mimarisi kuruyoruz.",
        }
      : {
          badge: "ZERO-TRUST & SECURITY",
          title: "Deterministic defense in production",
          body: "We engineer verifiable isolation boundaries and strict RLS authorization for autonomous workflows.",
        },
    mimari: isTr
      ? {
          badge: "SİSTEM MİMARİSİ",
          title: "Kırılgan soyutlamalardan sıyrılın",
          body: "Yüksek hacimli dağıtık sistemler, event-driven boru hatları ve gerçek zamanlı AI ürünleri için doğrudan görüşelim.",
        }
      : {
          badge: "SYSTEMS ARCHITECTURE",
          title: "Strip away fragile abstractions",
          body: "Let's architect high-throughput distributed pipelines and deterministic production AI products directly.",
        },
    llm: isTr
      ? {
          badge: "LLM & ÇIKARIM",
          title: "Ajanlar için gerçek üretim mühendisliği",
          body: "Araç çağırma, bağlam bütçesi ve çıkarım maliyeti optimizasyonunda kurucu/CTO danışmanlığı alın.",
        }
      : {
          badge: "LLM & INFERENCE",
          title: "Production AI engineering beyond demos",
          body: "Partner directly on agent orchestration, context budgets, and inference latency optimization.",
        },
    donanim: isTr
      ? {
          badge: "DONANIM & BARE-METAL",
          title: "Silikondan yazılıma uçtan uca kontrol",
          body: "VRAM darboğazları, yerel çıkarım altyapıları ve maliyet arbitrajı üzerine doğrudan mühendislik görüşmesi.",
        }
      : {
          badge: "HARDWARE & BARE-METAL",
          title: "End-to-end control from silicon to app",
          body: "Discuss VRAM bottlenecks, on-prem inference infrastructure, and unit economics arbitrage directly.",
        },
  };

  const contextNote = categoryNoteMap[rawPost.category] ?? categoryNoteMap.mimari;

  useEffect(() => {
    document.title = `${post.title} — Kürşat Yılmaz`;
    if (hasExplicitQueryLang && typeof window !== "undefined") {
      localStorage.setItem(BLOG_LANG_STORAGE_KEY, activeLang);
    }
  }, [post.title, activeLang, hasExplicitQueryLang]);

  const syncSelectionPopover = useCallback(() => {
    const container = articleBodyRef.current;
    const selection = window.getSelection();
    if (
      !container ||
      !selection ||
      selection.rangeCount === 0 ||
      selection.isCollapsed
    ) {
      setSelectionPopover(null);
      return;
    }

    const rawText = selection.toString().replace(/\s+/g, " ").trim();
    if (rawText.length < 8 || rawText.length > 360) {
      setSelectionPopover(null);
      return;
    }

    const range = selection.getRangeAt(0);
    if (!container.contains(range.commonAncestorContainer)) {
      setSelectionPopover(null);
      return;
    }

    const rect = range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      setSelectionPopover(null);
      return;
    }

    const clampedLeft = Math.min(
      Math.max(132, rect.left + rect.width / 2),
      window.innerWidth - 132
    );
    const top = Math.max(76, rect.top - 52);

    setSelectionPopover({
      text: rawText,
      top,
      left: clampedLeft,
      copied: false,
    });
  }, []);

  useEffect(() => {
    let rafId = 0;

    const handleSelectionTrigger = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(syncSelectionPopover);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.("#selection-share-popover")) return;
      setSelectionPopover(null);
    };

    const handleScroll = () => {
      setSelectionPopover(null);
    };

    document.addEventListener("mouseup", handleSelectionTrigger);
    document.addEventListener("keyup", handleSelectionTrigger);
    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mouseup", handleSelectionTrigger);
      document.removeEventListener("keyup", handleSelectionTrigger);
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [syncSelectionPopover]);

  const handleCopyQuote = async () => {
    if (!selectionPopover) return;
    const formatted = `"${selectionPopover.text}" — Kürşat Yılmaz (${articleUrl})`;
    try {
      await navigator.clipboard.writeText(formatted);
      setSelectionPopover((prev) => (prev ? { ...prev, copied: true } : null));
      setTimeout(() => {
        setSelectionPopover(null);
        window.getSelection()?.removeAllRanges();
      }, 1200);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleCopyCitation = async () => {
    const metricsLine = post.metrics.map((m) => `${m.label}: ${m.val}`).join(" | ");
    const markdownCitation = [
      `### ${post.title}`,
      `- **Author:** Kürşat Yılmaz (AI Product Engineer)`,
      `- **Date:** ${post.date} (${post.isoDate})`,
      `- **Metrics:** ${metricsLine}`,
      `- **Summary:** ${post.excerpt}`,
      `- **Source:** [${articleUrl}](${articleUrl})`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(markdownCitation);
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const wordCount = post.content
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const localizedGraphJsonLd =
    activeLang !== "tr"
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["NewsArticle", "TechArticle"],
              headline: post.title,
              description: stripInlineMarkdown(post.excerpt),
              image: [`${SITE_URL}${post.imageUrl}`],
              datePublished: `${post.isoDate}T09:00:00+03:00`,
              dateModified: `${post.isoDate}T09:00:00+03:00`,
              inLanguage: langMeta.hreflang,
              wordCount,
              articleSection: post.tag,
              about: [post.tag, post.category, "AI Systems Engineering"],
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["#article-headline", "#article-tldr", "#article-faq"],
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": articleUrl,
              },
              author: {
                "@type": "Person",
                name: "Kürşat Yılmaz",
                url: SITE_URL,
              },
              publisher: {
                "@type": "Person",
                name: "Kürşat Yılmaz",
                url: SITE_URL,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: ui.breadcrumbHome,
                  item: SITE_URL,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: ui.breadcrumbBlog,
                  item: `${SITE_URL}${blogArchiveHref}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: articleUrl,
                },
              ],
            },
            {
              "@type": "FAQPage",
              inLanguage: langMeta.hreflang,
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: stripInlineMarkdown(item.answer),
                },
              })),
            },
          ],
        }
      : null;

  return (
    <>
      {localizedGraphJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedGraphJsonLd) }}
        />
      )}

      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
        <ScrollProgress className="h-[2px] bg-gradient-to-r from-white/20 via-white to-white" />
      </div>

      {/* Floating Selection Quote / Share Popover */}
      <AnimatePresence>
        {selectionPopover && (
          <motion.div
            id="selection-share-popover"
            role="toolbar"
            aria-label={isTr ? "Alıntı paylaşım çubuğu" : "Quote share toolbar"}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              top: `${selectionPopover.top}px`,
              left: `${selectionPopover.left}px`,
            }}
            className="fixed z-50 -translate-x-1/2 flex items-center gap-1 rounded-full border border-white/20 bg-[#0b0b10]/95 backdrop-blur-xl px-2 py-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
          >
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                `"${selectionPopover.text}" — @DevKursat`
              )}&url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-black hover:bg-zinc-200 text-[11px] font-mono font-semibold transition-colors whitespace-nowrap"
            >
              <TwitterXIcon className="w-3 h-3 text-black" />
              <span>{isTr ? "X'te Paylaş" : "Share on X"}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyQuote}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-zinc-200 hover:bg-white/10 hover:text-white text-[11px] font-mono transition-colors whitespace-nowrap"
            >
              {selectionPopover.copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300">
                    {isTr ? "Kopyalandı" : "Copied"}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{isTr ? "Alıntıla" : "Copy Quote"}</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Localized Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#000000]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
          <Link
            href={blogArchiveHref}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>{ui.allArticles}</span>
          </Link>

          <Link
            href="/"
            className="font-archivo font-[800] text-sm tracking-tight text-white hover:opacity-80 transition-opacity truncate"
          >
            KÜRŞAT YILMAZ
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <BlogLanguageSwitcher
              variant="navbar"
              activeLang={activeLang}
              basePath={`/blog/${post.slug}`}
              availableCodes={availableCodes}
              onSelectLang={onSelectLang}
            />

            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      <article
        dir={langMeta.dir}
        lang={activeLang}
        className="pt-24 sm:pt-28 pb-24 max-w-3xl mx-auto px-5 sm:px-8"
      >
        {/* Semantic Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-zinc-500"
        >
          <Link href="/" className="hover:text-white transition-colors">
            {ui.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href={blogArchiveHref} className="hover:text-white transition-colors">
            {ui.breadcrumbBlog}
          </Link>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-[240px] sm:max-w-md">
            {post.tag}
          </span>
        </nav>

        <header className="space-y-5 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-white">
              {post.tag}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.isoDate}>{post.date}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1
            id="article-headline"
            className="font-archivo font-[800] text-3xl sm:text-4xl md:text-5xl text-white tracking-[-0.025em] leading-[1.12]"
          >
            {post.title}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
            {renderFormattedParagraph(post.excerpt)}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-white/10 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-zinc-600 block text-[10px] uppercase tracking-wider">
                {ui.authorLabel}
              </span>
              <Link href="/" className="text-white hover:underline">
                Kürşat Yılmaz
              </Link>
            </div>
            <div>
              <span className="text-zinc-600 block text-[10px] uppercase tracking-wider">
                {ui.publishedLabel}
              </span>
              <span className="text-white font-semibold">{post.isoDate}</span>
            </div>
            {post.metrics.map((metric) => (
              <div key={metric.label}>
                <span className="text-zinc-600 block text-[10px] uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="text-white font-semibold">{metric.val}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Cover Image — Uncropped Editorial Frame with Ambient Backdrop */}
        <figure className="relative w-full rounded-2xl overflow-hidden border border-white/12 bg-[#070709] mb-8 p-2 sm:p-4 flex items-center justify-center min-h-[240px] max-h-[560px]">
          <img
            src={post.imageUrl}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          <img
            id="article-cover-image"
            src={post.imageUrl}
            alt={post.title}
            className="relative z-10 w-auto max-w-full max-h-[520px] h-auto object-contain rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
          />
        </figure>

        {/* GEO Executive Brief / TL;DR Card */}
        <aside
          id="article-tldr"
          aria-label={ui.tldrTitle}
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0f] p-5 sm:p-6 mb-8"
        >
          <Spotlight size={320} />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{ui.tldrTitle}</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {langMeta.hreflang}
              </span>
            </div>

            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              {renderFormattedParagraph(post.excerpt)}
            </p>

            <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs font-mono">
              {post.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5"
                >
                  <dt className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    {metric.label}
                  </dt>
                  <dd className="text-sm text-white font-semibold mt-0.5">
                    {metric.val}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        {/* Article Body — 3-Beat Editorial Typography */}
        <div
          id="article-body-content"
          ref={articleBodyRef}
          className="space-y-6 font-normal"
        >
          {post.content.map((paragraph, idx) => {
            const isLeadHook = idx === 0;
            const isPunchline =
              idx === post.content.length - 1 && post.content.length > 1;

            if (isLeadHook) {
              return (
                <p
                  key={idx}
                  data-beat="hook"
                  className="text-lg sm:text-[21px] text-white font-medium leading-[1.7] tracking-[-0.01em]"
                >
                  {renderFormattedParagraph(paragraph)}
                </p>
              );
            }

            if (isPunchline) {
              return (
                <p
                  key={idx}
                  data-beat="punchline"
                  className="relative pl-4 sm:pl-5 py-2.5 border-l-2 border-emerald-400/70 bg-white/[0.025] rounded-r-xl text-base sm:text-[18px] text-white font-medium leading-[1.7]"
                >
                  {renderFormattedParagraph(paragraph)}
                </p>
              );
            }

            return (
              <p
                key={idx}
                data-beat="analysis"
                className="text-base sm:text-[17.5px] text-zinc-300 leading-[1.8]"
              >
                {renderFormattedParagraph(paragraph)}
              </p>
            );
          })}
        </div>

        {/* 1-Click Architectural Dilemma Poll + Live Discussion Bridge + Native Comments */}
        <ArticleEngagementHub
          slug={post.slug}
          title={post.title}
          category={rawPost.category}
          activeLang={activeLang}
          articleUrl={articleUrl}
        />

        {/* Interactive Citation & Share Toolbar */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#0a0a0d] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            {ui.shareTitle}
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black text-xs font-mono text-zinc-200 transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{ui.copiedLink}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{ui.copyLink}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyCitation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black text-xs font-mono text-zinc-200 transition-all"
            >
              {copiedCitation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{ui.copiedCitation}</span>
                </>
              ) : (
                <>
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>{ui.copyCitation}</span>
                </>
              )}
            </button>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-zinc-300 hover:bg-white hover:text-black transition-all"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-zinc-300 hover:bg-white hover:text-black transition-all"
            >
              <TwitterXIcon className="w-3 h-3" />
            </a>

            <a
              href={rssHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ui.rssFeed}
              title={ui.rssFeed}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-zinc-300 hover:bg-white hover:text-black transition-all"
            >
              <Rss className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Contextual Engineering Note & Direct Contact + Animated Free Newsletter */}
        <section
          aria-label="Engineering Actions"
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Category-Aware System Note + TypeformContactModal */}
          <motion.div
            id="article-engineering-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0f] p-5 flex flex-col justify-between gap-4 hover:border-white/25 transition-colors"
          >
            <Spotlight size={280} />
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>{contextNote.badge}</span>
              </div>
              <h2 className="font-archivo font-[800] text-lg text-white leading-snug">
                {contextNote.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {contextNote.body}
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-2.5 pt-2">
              <TypeformContactModal />
            </div>
          </motion.div>

          {/* Animated Free Engineering Newsletter */}
          <NewsletterSignupBox
            id="article-newsletter"
            source={post.slug}
            activeLang={activeLang}
            delay={0.08}
          />
        </section>

        {/* AEO Interactive Technical Q&A / FAQ Accordion */}
        <section
          id="article-faq"
          aria-labelledby="article-faq-heading"
          className="mt-12 space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
            <HelpCircle className="w-4 h-4 text-zinc-300" />
            <h2 id="article-faq-heading">{ui.faqTitle}</h2>
          </div>

          <div className="space-y-2.5">
            {faqs.map((item, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group rounded-2xl border border-white/10 bg-[#0b0b0e] open:border-white/25 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-sm sm:text-base font-semibold text-white select-none">
                  <span>{item.question}</span>
                  <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:text-white" />
                </summary>
                <div className="px-5 pb-4 pt-1 text-sm sm:text-[15px] text-zinc-300 leading-relaxed border-t border-white/[0.06]">
                  {renderFormattedParagraph(item.answer)}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related / Next Dispatches */}
        {relatedPosts.length > 0 && (
          <section className="mt-14 pt-10 border-t border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                {ui.relatedTitle}
              </h2>
              <Link
                href={blogArchiveHref}
                className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                <span>{ui.allArticles}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => {
                const relHref =
                  activeLang === "tr"
                    ? `/blog/${rel.slug}`
                    : `/blog/${rel.slug}?lang=${activeLang}`;
                return (
                  <Link
                    key={rel.slug}
                    href={relHref}
                    hrefLang={langMeta.hreflang}
                    className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0b0b0e] p-4 hover:border-white/30 transition-all"
                  >
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                        {rel.tag}
                      </span>
                      <h3 className="font-archivo font-[800] text-sm text-white leading-snug line-clamp-2 group-hover:text-zinc-200">
                        {rel.title}
                      </h3>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>{rel.date}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <footer className="mt-14 pt-8 border-t border-white/10 flex flex-col gap-4">
          <Link
            href="/sponsor"
            className="mb-4 rounded-2xl border border-white/15 bg-[#0a0a0c] hover:bg-white/[0.04] hover:border-white/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors group"
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                <Sparkles className="w-3 h-3 text-zinc-300" />
                <span>{activeLang === "tr" ? "SPONSORLUK & AR-GE PARTNERLİĞİ" : "SPONSORSHIP & R&D PARTNERSHIP"}</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium">
                {activeLang === "tr"
                  ? "127.4K+ zirve mühendislik erişimiyle AI, Cloud & Oyun teknolojinizi öne çıkarın"
                  : "Put your AI, Cloud, or Game-Dev tool in front of 127.4K+ peak engineering reach"}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full bg-white text-black text-xs font-mono font-bold group-hover:bg-zinc-200 transition-colors">
              <span>{activeLang === "tr" ? "Media Kit" : "Media Kit"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <div className="text-xs font-mono text-zinc-500">
            {ui.footerSubtitle}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
            {[
              {
                label: "LinkedIn",
                href:
                  postDiscussion.links.find((l) => l.id === "linkedin")?.href ??
                  "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
                icon: <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />,
              },
              {
                label: "X",
                href:
                  postDiscussion.links.find((l) => l.id === "x")?.href ??
                  "https://x.com/DevKursat",
                icon: <TwitterXIcon className="w-3 h-3 shrink-0" />,
              },
              {
                label: "DEV.to",
                href:
                  postDiscussion.links.find((l) => l.id === "devto")?.href ??
                  "https://dev.to/kursatyz",
                icon: <DevtoIcon className="w-3.5 h-3.5 shrink-0" />,
              },
              {
                label: "Medium",
                href:
                  postDiscussion.links.find((l) => l.id === "medium")?.href ??
                  "https://medium.com/@ykursat054",
                icon: <MediumIcon className="w-3.5 h-3.5 shrink-0" />,
              },
              {
                label: "GitHub",
                href: "https://github.com/DevKursat",
                icon: <GithubIcon className="w-3.5 h-3.5 shrink-0" />,
              },
              {
                label: "RSS",
                href: rssHref,
                icon: <Rss className="w-3.5 h-3.5 shrink-0" />,
              },
            ].map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={channel.label}
                className="flex h-10 px-3.5 items-center justify-between gap-2 rounded-xl border border-white/12 bg-white/[0.03] text-xs font-mono text-zinc-200 hover:bg-white hover:text-black hover:border-white transition-all group"
              >
                <span className="inline-flex items-center gap-2 min-w-0 truncate">
                  {channel.icon}
                  <span className="truncate">{channel.label}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
              </a>
            ))}
          </div>
        </footer>
      </article>
    </>
  );
}
