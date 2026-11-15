"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  BookOpen,
  Rss,
  X,
} from "lucide-react";
import { Spotlight } from "@/components/core/spotlight";
import { ProgressiveBlur } from "@/components/core/progressive-blur";
import { ScrollProgress } from "@/components/core/scroll-progress";
import BlogLanguageSwitcher, {
  resolveClientBlogLang,
} from "@/components/BlogLanguageSwitcher";
import { LinkedinIcon, TwitterXIcon, DevtoIcon } from "@/components/Icons";

import {
  BLOG_POSTS,
  SITE_URL,
  getBlogLangMeta,
  getBlogUiCopy,
  getLocalizedPost,
  resolveBlogLang,
  type BlogLang,
} from "@/data/blogPosts";

export default function BlogArchivePage() {
  return (
    <Suspense
      fallback={<BlogArchiveContent initialLang="tr" rawQueryLang={null} />}
    >
      <BlogArchiveWithSearchParams />
    </Suspense>
  );
}

function BlogArchiveWithSearchParams() {
  const searchParams = useSearchParams();
  const rawLang = searchParams.get("lang");
  const initialLang = resolveBlogLang(rawLang);

  return (
    <BlogArchiveContent
      initialLang={initialLang}
      rawQueryLang={rawLang}
    />
  );
}

function BlogArchiveContent({
  initialLang,
  rawQueryLang,
}: {
  initialLang: BlogLang;
  rawQueryLang: string | null;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLang, setActiveLang] = useState<BlogLang>(initialLang);

  useEffect(() => {
    setActiveLang(resolveClientBlogLang(rawQueryLang));
  }, [rawQueryLang]);

  const langMeta = getBlogLangMeta(activeLang);
  const ui = getBlogUiCopy(activeLang);

  const localizedPosts = BLOG_POSTS.map((post) => getLocalizedPost(post, activeLang));

  const filteredPosts = localizedPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tag.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const getPostHref = (slug: string) =>
    activeLang === "tr" ? `/blog/${slug}` : `/blog/${slug}?lang=${activeLang}`;

  const rssHref =
    activeLang === "tr" ? "/rss.xml" : `/rss.xml?lang=${activeLang}`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${ui.archiveTitleLine1} ${ui.archiveTitleAccent} ${ui.archiveTitleLine2}`,
    description: ui.archiveDesc,
    url: activeLang === "tr" ? `${SITE_URL}/blog` : `${SITE_URL}/blog?lang=${activeLang}`,
    inLanguage: langMeta.hreflang,
    author: {
      "@type": "Person",
      name: "Kürşat Yılmaz",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: localizedPosts.length,
      itemListElement: localizedPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url:
          activeLang === "tr"
            ? `${SITE_URL}/blog/${post.slug}`
            : `${SITE_URL}/blog/${post.slug}?lang=${activeLang}`,
        name: post.title,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Reading Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
        <ScrollProgress className="h-[2px] bg-gradient-to-r from-white/20 via-white to-white" />
      </div>

      {/* Minimal Obsidian Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#000000]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>{ui.home}</span>
          </Link>

          <div className="font-archivo font-[800] text-sm tracking-tight text-white truncate">
            KÜRŞAT YILMAZ{" "}
            <span className="font-mono text-zinc-500 font-normal text-xs ml-1.5 hidden sm:inline">
              // {ui.journalBadge}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <BlogLanguageSwitcher
              variant="navbar"
              activeLang={activeLang}
              basePath="/blog"
              onSelectLang={setActiveLang}
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

      {/* Main Archive Content */}
      <div
        dir={langMeta.dir}
        lang={activeLang}
        className="pt-28 sm:pt-32 pb-24 max-w-5xl mx-auto px-5 sm:px-8"
      >
        {/* Editorial Section Header */}
        <header className="mb-8 space-y-3">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase font-mono">
            {ui.archiveTag}
          </p>
          <h1 className="font-archivo font-[800] text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-white leading-[1.1]">
            <span className="block">{ui.archiveTitleLine1}</span>
            <span className="block">
              <span className="font-instrument italic font-normal text-white">
                {ui.archiveTitleAccent}
              </span>{" "}
              {ui.archiveTitleLine2}
            </span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed pt-1">
            {ui.archiveDesc}
          </p>
        </header>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: `${ui.catAll} (${BLOG_POSTS.length})` },
              { id: "mimari", label: ui.catMimari },
              { id: "donanim", label: ui.catDonanim },
              { id: "llm", label: ui.catLlm },
              { id: "guvenlik", label: ui.catGuvenlik },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? "bg-white text-black font-semibold"
                    : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              aria-label={ui.searchPlaceholder}
              className="w-full bg-[#0c0c0e] border border-white/10 rounded-full pl-9 pr-8 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={ui.clearFilters}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Grid of All Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col h-full rounded-3xl border border-white/10 bg-[#0c0c0e] p-4 sm:p-5 transition-all duration-300 hover:border-white/25 group relative overflow-hidden"
            >
              <Spotlight size={360} />

              {/* Clickable Card Visual -> Direct Page Navigation */}
              <Link
                href={getPostHref(post.slug)}
                hrefLang={langMeta.hreflang}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 block select-none mb-3"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Progressive Blur Layer over the lower 58% */}
                <ProgressiveBlur
                  className="pointer-events-none absolute bottom-0 left-0 h-[58%] w-full"
                  blurIntensity={7}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                {/* Open Article Arrow Pill */}
                <div className="absolute top-3.5 right-3.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:border-white/30 transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>

                {/* Overlaid Title & Metadata */}
                <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full z-10 flex flex-col justify-end">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-2">
                    <span>{post.tag}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="font-archivo font-[800] text-lg sm:text-xl text-white tracking-tight line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                </div>
              </Link>

              {/* Excerpt Preview for Scannability & SEO */}
              <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed line-clamp-2 px-1 mb-3">
                {post.excerpt}
              </p>

              {/* Bottom Bar: Telemetry Metrics + Read Pill */}
              <div className="relative z-10 pt-3 px-1 mt-auto flex items-center justify-between gap-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <div>
                    <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">
                      {post.metrics[0].label}
                    </span>
                    <span className="text-white font-semibold">
                      {post.metrics[0].val}
                    </span>
                  </div>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <div>
                    <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">
                      {post.metrics[1].label}
                    </span>
                    <span className="text-white font-semibold">
                      {post.metrics[1].val}
                    </span>
                  </div>
                </div>

                <Link
                  href={getPostHref(post.slug)}
                  hrefLang={langMeta.hreflang}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-medium text-white transition-all shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{ui.readArticle}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <p className="text-zinc-500 font-mono text-sm">{ui.emptyState}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-mono text-zinc-200 transition-all"
            >
              {ui.clearFilters}
            </button>
          </div>
        )}

        {/* Community Banner at bottom */}
        <div className="mt-16 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141416] to-[#0a0a0c] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Spotlight size={420} />

          <div className="relative z-10 max-w-xl space-y-1">
            <h3 className="font-archivo font-[800] text-xl sm:text-2xl text-white tracking-tight">
              {ui.communityTitle}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
              {ui.communityDesc}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-colors shrink-0"
            >
              <LinkedinIcon className="w-4 h-4 text-black" />
              <span>{ui.communityBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </a>

            <a
              href="https://x.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all shrink-0"
              aria-label="X (Twitter)"
            >
              <TwitterXIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://dev.to/devkursat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all shrink-0"
              aria-label="Dev.to"
            >
              <DevtoIcon className="w-4 h-4" />
            </a>

            <a
              href={rssHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 px-3 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all shrink-0"
              aria-label={ui.rssFeed}
            >
              <Rss className="w-3.5 h-3.5" />
              <span>RSS</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
