"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  Mail,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  GithubIcon,
  TwitterXIcon,
  LinkedinIcon,
  InstagramIcon,
  DevtoIcon,
  WhatsappIcon,
  YouTubeIcon,
  TikTokIcon,
  SpotifyIcon,
  FacebookIcon,
} from "@/components/Icons";

interface LinkItem {
  id: string;
  title: string;
  handle: string;
  url: string;
  icon: React.ReactNode;
  badge?: string;
  accent?: string;
}

const MIZAH_ANIMASYON_LINKS: LinkItem[] = [
  {
    id: "youtube",
    title: "YouTube",
    handle: "@kursatsi • Stüdyo & Animasyonlar",
    url: "https://www.youtube.com/@kursatsi",
    icon: <YouTubeIcon className="w-5 h-5 fill-current" />,
    badge: "YAYIN",
    accent: "text-red-400 bg-red-500/10 border-red-500/20",
  },
  {
    id: "tiktok",
    title: "TikTok",
    handle: "@kursat.yz • Animasyon & Sokak Mizahı",
    url: "https://www.tiktok.com/@kursat.yz",
    icon: <TikTokIcon className="w-4 h-4 fill-current" />,
    badge: "VİRAL",
    accent: "text-white bg-white/10 border-white/20",
  },
  {
    id: "instagram-mizah",
    title: "Instagram",
    handle: "@kursatsi • Karakterler, Kesitler & Mizah",
    url: "https://www.instagram.com/kursatsi/",
    icon: <InstagramIcon className="w-4 h-4 fill-current" />,
    badge: "REELS",
    accent: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  {
    id: "spotify",
    title: "Spotify",
    handle: "Kürşat Yılmaz • Sanatçı Profili & Sesler",
    url: "https://open.spotify.com/intl-tr/artist/5NQc0XkMOuLmfSrgNaz3YP",
    icon: <SpotifyIcon className="w-4 h-4 fill-current" />,
    badge: "AUDIO",
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "twitter-mizah",
    title: "X (Twitter)",
    handle: "@kursatsi • Duyurular & Video Kesitleri",
    url: "https://x.com/kursatsi",
    icon: <TwitterXIcon className="w-4 h-4 fill-current" />,
    accent: "text-zinc-200 bg-white/5 border-white/15",
  },
  {
    id: "facebook",
    title: "Facebook",
    handle: "kursatsi • Topluluk Sayfası",
    url: "https://www.facebook.com/kursatsi",
    icon: <FacebookIcon className="w-4 h-4 fill-current" />,
    accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
];

const KISISEL_TECH_LINKS: LinkItem[] = [
  {
    id: "itibar",
    title: "İtibar",
    handle: "itibar.app • Yapay Zeka Dijital İtibar Motoru",
    url: "https://itibar.app",
    icon: <span className="font-black text-sm font-archivo">İ</span>,
    badge: "PRODUCT",
    accent: "text-white bg-white/10 border-white/20",
  },
  {
    id: "unutma",
    title: "Unutma.",
    handle: "unutma.itibar.app • Otonom Hafıza & Asistan",
    url: "https://unutma.itibar.app",
    icon: <span className="font-black text-sm font-archivo">U</span>,
    badge: "AI APP",
    accent: "text-white bg-white/10 border-white/20",
  },
  {
    id: "cv",
    title: "Özgeçmiş / CV",
    handle: "devkursat.github.io/cv • Lead AI Product Developer",
    url: "https://devkursat.github.io/cv/",
    icon: <FileText className="w-4 h-4" />,
    badge: "CV",
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "github",
    title: "GitHub",
    handle: "github.com/DevKursat • Açık Kaynak Mimariler",
    url: "https://github.com/DevKursat",
    icon: <GithubIcon className="w-4 h-4 fill-current" />,
    accent: "text-white bg-white/5 border-white/15",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    handle: "linkedin.com/in/kürşatyılmaz",
    url: "https://www.linkedin.com/in/kürşatyılmaz/",
    icon: <LinkedinIcon className="w-4 h-4 fill-current" />,
    accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "twitter-kisisel",
    title: "X (Twitter) Kişisel",
    handle: "@DevKursat • Yapay Zeka & Sistem Mühendisliği",
    url: "https://x.com/DevKursat",
    icon: <TwitterXIcon className="w-4 h-4 fill-current" />,
    accent: "text-zinc-200 bg-white/5 border-white/15",
  },
  {
    id: "instagram-kisisel",
    title: "Instagram Kişisel",
    handle: "@kursat.yz • Kişisel Profil",
    url: "https://www.instagram.com/kursat.yz/",
    icon: <InstagramIcon className="w-4 h-4 fill-current" />,
    accent: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  {
    id: "devto",
    title: "DEV.to",
    handle: "dev.to/devkursat • Derin Teknik Analizler",
    url: "https://dev.to/devkursat",
    icon: <DevtoIcon className="w-4 h-4 fill-current" />,
    accent: "text-white bg-white/5 border-white/15",
  },
];

export default function LinksPage() {
  const [activeTab, setActiveTab] = useState<"mizah" | "kisisel">("mizah");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentLinks = activeTab === "mizah" ? MIZAH_ANIMASYON_LINKS : KISISEL_TECH_LINKS;

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans antialiased">
      {/* Back to Home Button */}
      <div className="fixed top-5 left-5 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 hover:border-white/30 text-xs text-zinc-300 hover:text-white transition-all active:scale-95 shadow-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-mono">kursat.itibar.app</span>
        </Link>
      </div>

      {/* AWWWARDS TRUE 50/50 SPLIT SCREEN LAYOUT */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 lg:h-screen lg:overflow-hidden">
        {/* ============================================================ */}
        {/* LEFT COLUMN: THE MONOLITH SLAB (IMMERSIVE, NO BOX BORDERS)   */}
        {/* ============================================================ */}
        <aside className="lg:col-span-5 h-[280px] sm:h-[360px] lg:h-full relative flex items-center justify-center bg-[#000000] lg:border-r border-white/5 overflow-hidden">
          <div className="relative w-full h-full max-w-lg lg:max-h-[90vh] mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)]">
              <Image
                src="/images/ky-monolith.jpg"
                alt="Kürşat Yılmaz Brutalist Monolith"
                fill
                priority
                className="object-cover object-center scale-102 hover:scale-105 transition-transform duration-1000 ease-out"
              />
              {/* Cinematic ambient fades */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60" />

              {/* Minimalist monolithic watermark */}
              <div className="absolute bottom-6 left-6 z-10 hidden lg:block">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                  MONOLITH ARCHIVE • 2026
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: KURSAT. links + CATEGORY TOGGLE + CARDS        */}
        {/* ============================================================ */}
        <section className="lg:col-span-7 lg:h-full lg:overflow-y-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-16 flex flex-col justify-between">
          <div className="space-y-8 max-w-xl mx-auto w-full">
            {/* 1. EXACT AWWWARDS HEADER: KURSAT. links */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-archivo">
                  KURSAT<span className="text-zinc-500 font-light lowercase">. links</span>
                </h1>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  OFFICIAL DIRECTORY
                </span>
              </div>

              {/* 2. CATEGORY TOGGLE (MİZAH & ANİMASYON vs KİŞİSEL & PROJELER) */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                  <button
                    onClick={() => setActiveTab("mizah")}
                    className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                      activeTab === "mizah"
                        ? "bg-white text-black font-semibold shadow-lg scale-100"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    MİZAH & ANİMASYON
                  </button>

                  <button
                    onClick={() => setActiveTab("kisisel")}
                    className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                      activeTab === "kisisel"
                        ? "bg-white text-black font-semibold shadow-lg scale-100"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    KİŞİSEL & PROJELER
                  </button>
                </div>

                <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500">
                  {currentLinks.length} HESAP
                </span>
              </div>
            </div>

            {/* 3. TACTILE GLASS LINK CARDS (5-8 FOCUSED ITEMS BASED ON TAB) */}
            <div className="space-y-3">
              {currentLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 sm:p-4.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99] shadow-sm"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 ${
                        item.accent || "text-white bg-white/5 border-white/10"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-white group-hover:text-white transition-colors truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 font-mono truncate mt-0.5">
                        {item.handle}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/10 flex items-center justify-center transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </a>
              ))}
            </div>

            {/* 4. QUICK DIRECT CONTACT BAR (WHATSAPP & EMAIL) */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://wa.me/kursat.yz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all active:scale-95"
              >
                <WhatsappIcon className="w-3.5 h-3.5 fill-current text-emerald-400" />
                <span>WhatsApp: @kursat.yz</span>
              </a>

              <button
                onClick={() => handleCopy("email", "kursat@itibar.app")}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all active:scale-95"
              >
                {copiedKey === "email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>kursat@itibar.app</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 5. AWWWARDS MINIMALIST FOOTER */}
          <footer className="pt-10 pb-4 max-w-xl mx-auto w-full border-t border-white/10 space-y-1.5 text-left">
            <p className="text-xs text-zinc-400 font-light">
              Yapay Zeka Mimarisi, Otonom Sistemler ve Sokak Çizgisi.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              <span className="text-zinc-300">@kursatsi • @kursat.yz</span>
              <span>•</span>
              <span>2026</span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
