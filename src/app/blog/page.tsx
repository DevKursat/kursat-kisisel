"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Plus, Terminal, Search, Calendar, Clock, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Spotlight } from "@/components/core/spotlight";
import { ProgressiveBlur } from "@/components/core/progressive-blur";
import CustomCursor from "@/components/CustomCursor";
import { LinkedinIcon, TwitterXIcon, DevtoIcon } from "@/components/Icons";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "@/components/core/morphing-dialog";

import {
  BLOG_LANGUAGES,
  BLOG_POSTS,
  getLocalizedPost,
  type BlogLang,
} from "@/data/blogPosts";

export default function BlogArchivePage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLang, setActiveLang] = useState<BlogLang>(lang === "en" ? "en" : "tr");

  const localizedPosts = BLOG_POSTS.map((post) => getLocalizedPost(post, activeLang));

  const filteredPosts = localizedPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      {/* Precision Custom Fluid Cursor */}
      <CustomCursor />

      {/* Minimal Obsidian Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#000000]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Ana Sayfa</span>
          </Link>

          <div className="font-archivo font-[800] text-sm tracking-tight text-white">
            KÜRŞAT YILMAZ <span className="font-mono text-zinc-500 font-normal text-xs ml-1.5">// GÜNLÜK</span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://x.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-all"
              aria-label="X"
            >
              <TwitterXIcon className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Archive Content */}
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Header */}
        <div className="mb-12 space-y-3">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase font-mono">
            // GÜNLÜK MÜHENDİSLİK NOTLARI & YAYINLAR
          </p>
          <h1 className="font-archivo font-[800] text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-white leading-[1.1]">
            <span className="block">Yazıya dökülen,</span>
            <span className="block">
              <span className="font-instrument italic font-normal text-white">derin</span>{" "}
              deneyimler.
            </span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed pt-1">
            Yapay zekâ sistem mimarisi, GPU/bellek fiziksel sınırları, otonom ajan güvenliği ve teknoloji endüstrisindeki kırılma noktaları üzerine günlük teknik analiz arşivi.
          </p>
        </div>

        {/* Global Language Switcher */}
        <div className="mb-5 flex flex-wrap items-center gap-1.5">
          {BLOG_LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setActiveLang(item.code)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all border ${
                activeLang === item.code
                  ? "bg-white text-black border-white font-semibold"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/25"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: `Tümü (${BLOG_POSTS.length})` },
              { id: "mimari", label: "Sistem Mimarisi" },
              { id: "donanim", label: "Donanım & Çip" },
              { id: "llm", label: "LLM & Çıkarım" },
              { id: "guvenlik", label: "Ajan Güvenliği" },
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Makalelerde ara..."
              className="w-full bg-[#0c0c0e] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono transition-colors"
            />
          </div>
        </div>

        {/* 2-Column Grid of All Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <MorphingDialog
              key={post.slug}
              transition={{
                type: "spring",
                bounce: 0.05,
                duration: 0.28,
              }}
            >
              <article className="flex flex-col h-full rounded-3xl border border-white/10 bg-[#0c0c0e] p-4 sm:p-5 transition-all duration-300 hover:border-white/25 group relative overflow-hidden">
                <Spotlight size={360} />

                {/* Clickable Card Visual Trigger */}
                <MorphingDialogTrigger className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 block select-none">
                  <MorphingDialogImage
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

                  {/* Expand Pill */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:border-white/30 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </div>

                  {/* Overlaid Title & Metadata */}
                  <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full z-10 flex flex-col justify-end">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-2">
                      <span>{post.tag}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <MorphingDialogTitle className="font-archivo font-[800] text-lg sm:text-xl text-white tracking-tight line-clamp-2 leading-snug">
                      {post.title}
                    </MorphingDialogTitle>
                  </div>
                </MorphingDialogTrigger>

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
                    href={
                      activeLang === "tr"
                        ? `/blog/${post.slug}`
                        : `/blog/${post.slug}?lang=${activeLang}`
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-medium text-white transition-all shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Yazıyı Oku</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>

              {/* Morphing Modal Expansion View */}
              <MorphingDialogContainer>
                <MorphingDialogContent
                  style={{ borderRadius: "24px" }}
                  className="pointer-events-auto relative flex h-auto max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto border border-white/15 bg-[#0c0c0e] text-white shadow-2xl"
                >
                  <MorphingDialogClose />

                  <div className="relative w-full aspect-video overflow-hidden bg-black shrink-0">
                    <MorphingDialogImage
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
                        <span>{post.tag}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <MorphingDialogTitle className="font-archivo font-[800] text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                        {post.title}
                      </MorphingDialogTitle>
                    </div>

                    <MorphingDialogDescription>
                      <div className="space-y-4 text-zinc-300 text-base leading-relaxed font-normal">
                        {post.content.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
                        <span>Kürşat Yılmaz — Mimari Notlar</span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-white hover:underline"
                        >
                          <span>Tam Sayfada Aç</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </MorphingDialogDescription>
                  </div>
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center text-zinc-500 font-mono text-sm">
            Aramanızla eşleşen makale bulunamadı.
          </div>
        )}

        {/* Community Banner at bottom */}
        <div className="mt-16 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141416] to-[#0a0a0c] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Spotlight size={420} />

          <div className="relative z-10 max-w-xl space-y-1">
            <h3 className="font-archivo font-[800] text-xl sm:text-2xl text-white tracking-tight">
              10.000+ Takipçi ile Günlük Teknoloji Gündemi
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
              Her gün yayınlanan analizleri doğrudan akışınızda okumak ve tartışmalara katılmak için kanallardan takip edebilirsiniz.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-colors shrink-0"
            >
              <LinkedinIcon className="w-4 h-4 text-black" />
              <span>LinkedIn'de İncele</span>
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
          </div>
        </div>
      </div>
    </main>
  );
}
