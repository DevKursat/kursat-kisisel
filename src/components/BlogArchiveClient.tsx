"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Flame,
  Search,
  BookOpen,
  Rss,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { Spotlight } from "@/components/core/spotlight";
import { ProgressiveBlur } from "@/components/core/progressive-blur";
import { ScrollProgress } from "@/components/core/scroll-progress";
import BlogLanguageSwitcher, {
  resolveClientBlogLang,
} from "@/components/BlogLanguageSwitcher";
import NewsletterSignupBox from "@/components/NewsletterSignupBox";
import TypeformContactModal from "@/components/TypeformContactModal";
import PublishingNetworkGrid from "@/components/PublishingNetworkGrid";
import { PUBLISHING_CHANNELS } from "@/data/publishingChannels";
import {
  BlueskyIcon,
  LinkedinIcon,
  TwitterXIcon,
  DevtoIcon,
  HashnodeIcon,
  IndieHackersIcon,
  MediumIcon,
  RedditIcon,
  GithubIcon,
} from "@/components/Icons";
import {
  SITE_URL,
  getBlogLangMeta,
  getBlogUiCopy,
  getLocalizedSummary,
  resolveBlogLang,
  type BlogLang,
  type BlogPostSummary,
} from "@/data/blogIndex";

export default function BlogArchiveClient({
  posts,
}: {
  posts: BlogPostSummary[];
}) {
  return (
    <Suspense
      fallback={
        <BlogArchiveContent posts={posts} initialLang="tr" rawQueryLang={null} />
      }
    >
      <BlogArchiveWithSearchParams posts={posts} />
    </Suspense>
  );
}

function BlogArchiveWithSearchParams({
  posts,
}: {
  posts: BlogPostSummary[];
}) {
  const searchParams = useSearchParams();
  const rawLang = searchParams.get("lang");
  const initialLang = resolveBlogLang(rawLang);

  return (
    <BlogArchiveContent
      posts={posts}
      initialLang={initialLang}
      rawQueryLang={rawLang}
    />
  );
}

function BlogArchiveContent({
  posts,
  initialLang,
  rawQueryLang,
}: {
  posts: BlogPostSummary[];
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

  const localizedPosts = posts.map((post) =>
    getLocalizedSummary(post, activeLang)
  );

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
    url:
      activeLang === "tr"
        ? `${SITE_URL}/blog`
        : `${SITE_URL}/blog?lang=${activeLang}`,
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

          {/* Syndication Hub: Cross-Platform Writing Network */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mr-1 shrink-0">
              {activeLang === "tr" ? "YAYIN AĞI:" : "SYNDICATION:"}
            </span>
            {PUBLISHING_CHANNELS.map((channel) => {
              const href = channel.id === "rss" ? rssHref : channel.href;
              return (
                <a
                  key={channel.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black hover:border-white text-[11px] font-mono text-zinc-300 transition-all group/hub shrink-0"
                >
                  {channel.id === "devto" && <DevtoIcon className="w-3 h-3 shrink-0" />}
                  {channel.id === "hashnode" && <HashnodeIcon className="w-3 h-3 shrink-0" />}
                  {channel.id === "medium" && <MediumIcon className="w-3 h-3 shrink-0" />}
                  {channel.id === "dailydev" && <Sparkles className="w-3 h-3 shrink-0" />}
                  {channel.id === "indiehackers" && <IndieHackersIcon className="w-3 h-3 shrink-0" />}
                  {channel.id === "hackernews" && <Flame className="w-3 h-3 shrink-0" />}
                  {channel.id === "linkedin" && <LinkedinIcon className="w-3 h-3 shrink-0" />}
                  {channel.id === "x" && <TwitterXIcon className="w-2.5 h-2.5 shrink-0" />}
                  {channel.id === "reddit" && <RedditIcon className="w-3 h-3 shrink-0" />}
                  {channel.id === "bluesky" && <BlueskyIcon className="w-3 h-3 shrink-0" />}
                  {channel.id === "rss" && <Rss className="w-3 h-3 shrink-0" />}
                  <span>{channel.label}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-40 group-hover/hub:opacity-100 transition-opacity" />
                </a>
              );
            })}
          </div>
        </header>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 pb-6 border-b border-white/10">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap lg:flex-wrap pb-0.5 lg:pb-0">
            {[
              { id: "all", label: `${ui.catAll} (${posts.length})` },
              { id: "mimari", label: ui.catMimari },
              { id: "donanim", label: ui.catDonanim },
              { id: "llm", label: ui.catLlm },
              { id: "guvenlik", label: ui.catGuvenlik },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 px-3.5 py-2 lg:py-1.5 rounded-full text-xs font-mono transition-all ${
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
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              aria-label={ui.searchPlaceholder}
              className="w-full bg-white/[0.03] border border-white/12 rounded-xl lg:rounded-full pl-9 pr-9 py-2.5 lg:py-2 text-sm lg:text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-[#0c0c0e] font-mono transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={ui.clearFilters}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
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
                  className="absolute inset-0 w-full h-full object-cover scale-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.08]"
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

        {/* Animated Archive Newsletter & Direct Engineering Contact */}
        <motion.section
          aria-label="Newsletter & Direct Advisory"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0f] p-5 flex flex-col justify-between gap-4 hover:border-white/25 transition-colors"
          >
            <Spotlight size={280} />
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>
                  {activeLang === "tr"
                    ? "MÜHENDİSLİK & DANIŞMANLIK"
                    : "SYSTEMS & ADVISORY"}
                </span>
              </div>
              <h2 className="font-archivo font-[800] text-lg text-white leading-snug">
                {activeLang === "tr"
                  ? "Doğrudan mimari ve AI sistem görüşmesi"
                  : "Partner on production AI & architecture"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {activeLang === "tr"
                  ? "Otonom ajan güvenliği, veri sızıntısı önleme ve yüksek trafikli sistemler için doğrudan iletişime geçin."
                  : "Collaborate directly on autonomous agents, deterministic isolation, and high-throughput products."}
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-2.5 pt-1">
              <TypeformContactModal />
            </div>
          </motion.div>

          <NewsletterSignupBox
            id="archive-newsletter"
            source="blog-archive"
            activeLang={activeLang}
            delay={0.08}
          />
        </motion.section>

        {/* Community Banner at bottom (LinkedIn, X, DEV.to, Medium, GitHub, RSS) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="mt-8 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141416] to-[#0a0a0c] p-5 sm:p-7 flex flex-col gap-5"
        >
          <Spotlight size={420} />

          <div className="relative z-10 max-w-2xl space-y-1.5">
            <h3 className="font-archivo font-[800] text-xl sm:text-2xl text-white tracking-tight">
              {ui.communityTitle}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
              {ui.communityDesc}
            </p>
          </div>

          <PublishingNetworkGrid lang={activeLang} rssHref={rssHref} />
        </motion.div>
      </div>
    </main>
  );
}
