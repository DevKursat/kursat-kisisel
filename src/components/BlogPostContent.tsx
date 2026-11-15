"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
} from "lucide-react";
import {
  BLOG_LANGUAGES,
  BLOG_POSTS,
  SITE_URL,
  generatePostFaqs,
  getBlogLangMeta,
  getBlogUiCopy,
  getLocalizedPost,
  resolveBlogLang,
  type BlogLang,
  type BlogPostItem,
} from "@/data/blogPosts";
import { ScrollProgress } from "@/components/core/scroll-progress";
import { Spotlight } from "@/components/core/spotlight";
import BlogLanguageSwitcher, {
  BLOG_LANG_STORAGE_KEY,
  resolveClientBlogLang,
} from "@/components/BlogLanguageSwitcher";
import { LinkedinIcon, TwitterXIcon, DevtoIcon } from "@/components/Icons";

export function BlogPostArticleBody({ rawPost }: { rawPost: BlogPostItem }) {
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
      activeLang={activeLang}
      hasExplicitQueryLang={Boolean(rawLang)}
      onSelectLang={setActiveLang}
    />
  );
}

export function ArticleMarkup({
  rawPost,
  activeLang = "tr",
  hasExplicitQueryLang = false,
  onSelectLang,
}: {
  rawPost: BlogPostItem;
  activeLang?: BlogLang;
  hasExplicitQueryLang?: boolean;
  onSelectLang?: (lang: BlogLang) => void;
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

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

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== rawPost.slug)
    .sort((a, b) => {
      const aMatch = a.category === rawPost.category ? 0 : 1;
      const bMatch = b.category === rawPost.category ? 0 : 1;
      if (aMatch !== bMatch) return aMatch - bMatch;
      return b.isoDate.localeCompare(a.isoDate);
    })
    .slice(0, 3)
    .map((p) => getLocalizedPost(p, activeLang));

  useEffect(() => {
    document.title = `${post.title} — Kürşat Yılmaz`;
    if (hasExplicitQueryLang && typeof window !== "undefined") {
      localStorage.setItem(BLOG_LANG_STORAGE_KEY, activeLang);
    }
  }, [post.title, activeLang, hasExplicitQueryLang]);

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
              description: post.excerpt,
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
                  text: item.answer,
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
            KÜRŞAT YILMAZ{" "}
            <span className="font-mono text-zinc-500 font-normal text-xs ml-1.5 hidden sm:inline">
              // {ui.journalBadge}
            </span>
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
              href="https://x.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-all"
              aria-label="X"
            >
              <TwitterXIcon className="w-3 h-3" />
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
            {post.excerpt}
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

        {/* Cover Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-8">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

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
              {post.excerpt}
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

        {/* Article Body */}
        <div className="space-y-6 text-zinc-200 text-base sm:text-lg leading-relaxed font-normal">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

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
                  {item.answer}
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

        <footer className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs font-mono text-zinc-500">
            {ui.footerSubtitle}
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-black" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-black" />
            </a>
            <a
              href="https://dev.to/devkursat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 bg-white/5 text-xs text-zinc-300 hover:bg-white hover:text-black transition-all"
            >
              <DevtoIcon className="w-3.5 h-3.5" />
              <span>DEV.to</span>
            </a>
          </div>
        </footer>
      </article>
    </>
  );
}
