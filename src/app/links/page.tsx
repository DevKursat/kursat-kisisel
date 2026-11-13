"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  Mail,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Clapperboard,
  Cpu,
  Layers,
  FileText,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
  SpotifyIcon,
  TwitterXIcon,
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  DevtoIcon,
  WhatsappIcon,
  CvIcon,
} from "@/components/Icons";
import { useLanguage } from "@/context/LanguageContext";

interface LinkItem {
  id: string;
  category: "media" | "tech";
  title: string;
  handle: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badge?: string;
  featured?: boolean;
}

const LINKS: LinkItem[] = [
  // ==========================================
  // 1. ANİMASYON, MEDYA & MİZAH (@kursatsi & @kursat.yz)
  // ==========================================
  {
    id: "youtube",
    category: "media",
    title: "YouTube",
    handle: "@kursatsi",
    description: "Animasyon, hiciv ve absürt kurgu evreni.",
    url: "https://www.youtube.com/@kursatsi",
    icon: YouTubeIcon,
    accentColor: "from-red-500/20 via-red-500/5 to-transparent",
    badge: "Resmi Kanal",
    featured: true,
  },
  {
    id: "tiktok",
    category: "media",
    title: "TikTok",
    handle: "@kursat.yz",
    description: "Animasyon yayınları ve viral sokak kurguları.",
    url: "https://www.tiktok.com/@kursat.yz",
    icon: TikTokIcon,
    accentColor: "from-cyan-500/20 via-pink-500/5 to-transparent",
    badge: "Animasyon Yayını",
    featured: true,
  },
  {
    id: "instagram-media",
    category: "media",
    title: "Instagram",
    handle: "@kursatsi",
    description: "Karakter eskizleri, animasyon kesitleri & mizah.",
    url: "https://www.instagram.com/kursatsi/",
    icon: InstagramIcon,
    accentColor: "from-pink-500/20 via-purple-500/5 to-transparent",
    badge: "Animasyon & Medya",
  },
  {
    id: "spotify",
    category: "media",
    title: "Spotify Artist",
    handle: "Kürşat Yılmaz",
    description: "Resmi sanatçı profili ve yayınlanan parçalar.",
    url: "https://open.spotify.com/intl-tr/artist/5NQc0XkMOuLmfSrgNaz3YP",
    icon: SpotifyIcon,
    accentColor: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    badge: "Sanatçı Profili",
  },
  {
    id: "x-media",
    category: "media",
    title: "X (Twitter)",
    handle: "@kursatsi",
    description: "Animasyon dünyası, gündem ve absürt tespitler.",
    url: "https://x.com/kursatsi",
    icon: TwitterXIcon,
    accentColor: "from-zinc-500/20 via-zinc-500/5 to-transparent",
    badge: "Mizah & Medya",
  },
  {
    id: "facebook",
    category: "media",
    title: "Facebook",
    handle: "kursatsi",
    description: "Topluluk ve video paylaşımları.",
    url: "https://www.facebook.com/kursatsi",
    icon: FacebookIcon,
    accentColor: "from-blue-600/20 via-blue-600/5 to-transparent",
  },

  // ==========================================
  // 2. YAPAY ZEKA, GİRİŞİMLER & TEKNOLOJİ
  // ==========================================
  {
    id: "itibar",
    category: "tech",
    title: "İtibar Platformu",
    handle: "itibar.app",
    description: "B2B İtibar Savunma & Hukuki Mevzuat Motoru.",
    url: "https://itibar.app",
    icon: Cpu,
    accentColor: "from-emerald-500/25 via-emerald-500/5 to-transparent",
    badge: "Canlı Girişim",
    featured: true,
  },
  {
    id: "unutma",
    category: "tech",
    title: "Unutma. Platformu",
    handle: "unutma.itibar.app",
    description: "Cezaevleri için mühürlü fiziksel mektup platformu.",
    url: "https://unutma.itibar.app",
    icon: FileText,
    accentColor: "from-amber-500/20 via-amber-500/5 to-transparent",
    badge: "Canlı Girişim",
    featured: true,
  },
  {
    id: "github",
    category: "tech",
    title: "GitHub",
    handle: "DevKursat",
    description: "Açık kaynak sistemler, AI mimarileri ve depolar.",
    url: "https://github.com/DevKursat",
    icon: GithubIcon,
    accentColor: "from-zinc-400/20 via-zinc-500/5 to-transparent",
    badge: "Kod & Mimari",
  },
  {
    id: "linkedin",
    category: "tech",
    title: "LinkedIn",
    handle: "kürşatyılmaz",
    description: "Yapay zeka ürün mühendisliği ve derin analizler.",
    url: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
    icon: LinkedinIcon,
    accentColor: "from-blue-500/20 via-blue-500/5 to-transparent",
    badge: "10K+ Takipçi",
  },
  {
    id: "x-tech",
    category: "tech",
    title: "X (Twitter Tech)",
    handle: "@DevKursat",
    description: "Global AI mimarileri, benchmarklar & Silikon Vadisi.",
    url: "https://x.com/DevKursat",
    icon: TwitterXIcon,
    accentColor: "from-white/15 via-white/5 to-transparent",
    badge: "Global Tech",
  },
  {
    id: "instagram-personal",
    category: "tech",
    title: "Instagram (Kişisel)",
    handle: "@kursat.yz",
    description: "Kişisel yaşam, seyahatler ve günlük kareler.",
    url: "https://www.instagram.com/kursat.yz/",
    icon: InstagramIcon,
    accentColor: "from-purple-500/20 via-pink-500/5 to-transparent",
    badge: "Kişisel Profil",
  },
  {
    id: "devto",
    category: "tech",
    title: "DEV.to",
    handle: "devkursat",
    description: "Teknik makaleler, model mimarileri ve derin rehberler.",
    url: "https://dev.to/devkursat",
    icon: DevtoIcon,
    accentColor: "from-zinc-400/20 via-zinc-400/5 to-transparent",
  },
  {
    id: "cv",
    category: "tech",
    title: "Özgeçmiş / CV",
    handle: "Lead AI Product Developer",
    description: "Detaylı kariyer geçmişi, patentler ve teknik yetkinlikler.",
    url: "/cv.pdf",
    icon: CvIcon,
    accentColor: "from-emerald-400/20 via-emerald-400/5 to-transparent",
    badge: "PDF Dosyası",
  },
];

export default function LinksPage() {
  const [activeTab, setActiveTab] = useState<"all" | "media" | "tech">("all");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { lang, setLang } = useLanguage();

  const copyEmail = () => {
    navigator.clipboard.writeText("kursat@itibar.app");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const filteredLinks = LINKS.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <main className="relative min-h-screen bg-[#000000] text-white selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      {/* Cinematic Ambient Background Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(56,189,248,0.06),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.06),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-20">
        {/* Top Bar: Return to Home & Language Switcher */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black text-xs font-mono text-zinc-300 transition-all active:scale-95 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>{lang === "tr" ? "Portfolyoya Dön" : "Back to Home"}</span>
          </Link>

          <button
            type="button"
            onClick={() => setLang(lang === "tr" ? "en" : "tr")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-white/30 text-xs font-mono text-zinc-300 transition-all active:scale-95 cursor-pointer"
          >
            <span className={lang === "tr" ? "text-emerald-400 font-bold" : "text-zinc-500"}>
              TR
            </span>
            <span className="text-zinc-600">/</span>
            <span className={lang === "en" ? "text-emerald-400 font-bold" : "text-zinc-500"}>
              EN
            </span>
          </button>
        </div>

        {/* HERO PROFILE CARD */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          {/* Avatar with Animated Pulse Border */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500/50 via-teal-500/30 to-emerald-500/50 blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white/20 overflow-hidden bg-black shadow-2xl">
              <Image
                src="/hero-start.jpg"
                alt="Kürşat Yılmaz"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Live Status Indicator */}
            <div className="absolute bottom-1 right-1 flex items-center justify-center w-6 h-6 rounded-full bg-black/90 border border-emerald-500/50">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Name & Title */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                Kürşat Yılmaz
              </h1>
              <span
                className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-emerald-400 text-xs"
                title="Verified Architect"
              >
                ✦
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-emerald-400/90 font-medium tracking-wide uppercase">
              {lang === "tr"
                ? "AI Product Engineer & Autonomous Systems Architect"
                : "AI Product Engineer & Autonomous Systems Architect"}
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md mx-auto pt-1 leading-relaxed">
              {lang === "tr"
                ? "Otonom yazılım sistemleri, yapay zeka ürün mimarisi ve absürt animasyon evreni."
                : "Autonomous AI architectures, production engineering & absurd animated narratives."}
            </p>
          </div>

          {/* Direct Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <a
              href="https://wa.me/kursat.yz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-500/20 text-xs font-mono text-emerald-300 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <WhatsappIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: @kursat.yz</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white hover:text-black text-xs font-mono text-zinc-300 transition-all active:scale-95 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5" />
                  <span>kursat@itibar.app</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* SMART SEGMENTED FILTER SWITCH */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === "tr" ? "Hepsi" : "All"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("media")}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeTab === "media"
                  ? "bg-emerald-400 text-black font-semibold shadow-[0_0_15px_rgba(52,211,153,0.35)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5" />
              <span>{lang === "tr" ? "Animasyon & Medya" : "Animation & Media"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tech")}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeTab === "tech"
                  ? "bg-emerald-400 text-black font-semibold shadow-[0_0_15px_rgba(52,211,153,0.35)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{lang === "tr" ? "AI & Mühendislik" : "AI & Engineering"}</span>
            </button>
          </div>
        </div>

        {/* BENTO LINKS LIST */}
        <div className="space-y-2.5 sm:space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, delay: index * 0.02 }}
                  className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 select-none ${
                    item.featured
                      ? "border-emerald-500/35 bg-gradient-to-r from-emerald-500/10 via-white/[0.02] to-transparent hover:border-emerald-500/60 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  }`}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Platform Icon with Ambient Backlight */}
                    <div
                      className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-300 ${
                        item.featured
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                          : "border-white/10 bg-white/5 text-zinc-300 group-hover:text-white group-hover:border-white/20"
                      }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {/* Titles & Meta */}
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 uppercase shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-zinc-400 truncate">
                        {item.handle}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-light truncate mt-0.5 hidden sm:block">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {/* Right Arrow / Action Indicator */}
                  <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 group-hover:bg-white group-hover:text-black flex items-center justify-center text-zinc-400 transition-all shrink-0 ml-2">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* PODCAST FINALE: KÜRŞAT & BÖCEK (DOĞAL STÜDYO ENTEGRASYONU) */}
        {/* ======================================================== */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-white/10">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#111114] via-[#09090b] to-[#050505] shadow-[0_20px_70px_rgba(0,0,0,0.9)] group">
            {/* Ambient Spotlight */}
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/15 rounded-full blur-3xl opacity-60" />

            {/* Behind The Scenes Studio Photo */}
            <div className="relative w-full h-[240px] sm:h-[320px] overflow-hidden">
              <Image
                src="/images/bocek-podcast.jpg"
                alt="Kürşat & Böcek Studio Broadcast"
                fill
                className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              {/* Cinematic Vignette Blends */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>STUDIO ARCHIVE • ON-AIR</span>
                </span>
              </div>
            </div>

            {/* Studio Narrative & Caption */}
            <div className="p-5 sm:p-7 relative z-10 space-y-2 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-archivo font-[800] text-lg sm:text-xl text-white tracking-tight uppercase">
                  {lang === "tr" ? "Kürşat & Böcek" : "Kürşat & Böcek"}
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-md">
                  {lang === "tr"
                    ? "“Koda dökülen mantık, mikrofonda yaşayan absürtlük. Sokak simülasyonları ve gecenin nabzı.”"
                    : "“Logic sculpted in code, raw satire at the microphone. Street chronicles & nightly satire.”"}
                </p>
              </div>

              <a
                href="https://www.youtube.com/@kursatsi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-mono text-zinc-200 transition-all shrink-0 group active:scale-95 shadow-md"
              >
                <span>{lang === "tr" ? "Yayını İzle" : "Watch Broadcast"}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* MINIMAL MONUMENTAL FOOTER */}
        <footer className="mt-12 pt-8 border-t border-white/10 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-zinc-500">
            <span>© 2026 KÜRŞAT YILMAZ</span>
            <span>•</span>
            <span className="text-emerald-400/80">KURSAT.ITIBAR.APP</span>
          </div>
          <p className="text-[11px] text-zinc-600 font-light">
            {lang === "tr"
              ? "Tüm dijital varlıklar, projeler ve resmi kanallar tek bir merkezde."
              : "All digital entities, ventures & official channels united."}
          </p>
        </footer>
      </div>
    </main>
  );
}
