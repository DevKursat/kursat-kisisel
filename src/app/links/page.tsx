"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Mail, FileText, Sparkles, Flame } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
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

interface LinkBanner {
  id: string;
  title: string;
  handle: string;
  url: string;
  image?: string;
  watermark?: React.ReactNode;
  icon: React.ReactNode;
  badge?: string;
  glow?: string;
}

const KISISEL_LINKS: LinkBanner[] = [
  {
    id: "itibar",
    title: "İtibar",
    handle: "itibar.app • Yapay Zeka Dijital İtibar Motoru",
    url: "https://itibar.app",
    image: "/projects/itibar.jpg",
    icon: <span className="font-black text-sm font-archivo">İ</span>,
    badge: "AI PRODUCT",
  },
  {
    id: "unutma",
    title: "Unutma.",
    handle: "unutma.itibar.app • Otonom Hafıza & Asistan",
    url: "https://unutma.itibar.app",
    image: "/projects/unutma.jpg",
    icon: <span className="font-black text-sm font-archivo">U</span>,
    badge: "APP",
  },
  {
    id: "spotify",
    title: "Spotify",
    handle: "Kürşat Yılmaz • Sanatçı Profili & Sesler",
    url: "https://open.spotify.com/intl-tr/artist/5NQc0XkMOuLmfSrgNaz3YP",
    watermark: <SpotifyIcon className="w-full h-full fill-current" />,
    icon: <SpotifyIcon className="w-4 h-4 fill-current text-emerald-400" />,
    badge: "ARTIST",
    glow: "from-emerald-500/15 via-transparent to-transparent",
  },
  {
    id: "cv",
    title: "Özgeçmiş / CV",
    handle: "devkursat.github.io/cv • Lead AI Product Developer",
    url: "https://devkursat.github.io/cv/",
    watermark: <FileText className="w-full h-full stroke-[1.2]" />,
    icon: <FileText className="w-4 h-4 text-emerald-400" />,
    badge: "RESUME",
    glow: "from-emerald-500/10 via-transparent to-transparent",
  },
  {
    id: "github",
    title: "GitHub",
    handle: "github.com/DevKursat • Açık Kaynak & Sistemler",
    url: "https://github.com/DevKursat",
    watermark: <GithubIcon className="w-full h-full fill-current" />,
    icon: <GithubIcon className="w-4 h-4 fill-current" />,
    glow: "from-white/10 via-transparent to-transparent",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    handle: "linkedin.com/in/kürşatyılmaz",
    url: "https://www.linkedin.com/in/kürşatyılmaz/",
    watermark: <LinkedinIcon className="w-full h-full fill-current" />,
    icon: <LinkedinIcon className="w-4 h-4 fill-current text-blue-400" />,
    glow: "from-blue-600/15 via-transparent to-transparent",
  },
  {
    id: "twitter-kisisel",
    title: "X (Twitter)",
    handle: "@DevKursat • Yapay Zeka & Sistem Mühendisliği",
    url: "https://x.com/DevKursat",
    watermark: <TwitterXIcon className="w-full h-full fill-current" />,
    icon: <TwitterXIcon className="w-4 h-4 fill-current" />,
    glow: "from-zinc-400/10 via-transparent to-transparent",
  },
  {
    id: "instagram-kisisel",
    title: "Instagram",
    handle: "@kursat.yz • Kişisel Profil",
    url: "https://www.instagram.com/kursat.yz/",
    watermark: <InstagramIcon className="w-full h-full fill-current" />,
    icon: <InstagramIcon className="w-4 h-4 fill-current text-pink-400" />,
    glow: "from-pink-500/15 via-transparent to-transparent",
  },
  {
    id: "devto",
    title: "DEV.to",
    handle: "dev.to/devkursat • Teknik Makaleler & Mimariler",
    url: "https://dev.to/devkursat",
    watermark: <DevtoIcon className="w-full h-full fill-current" />,
    icon: <DevtoIcon className="w-4 h-4 fill-current" />,
    glow: "from-zinc-300/10 via-transparent to-transparent",
  },
];

const ANIMASYON_LINKS: LinkBanner[] = [
  {
    id: "youtube",
    title: "YouTube",
    handle: "@kursatsi • Stüdyo, Podcast & Animasyon",
    url: "https://www.youtube.com/@kursatsi",
    image: "/images/bocek-podcast.jpg",
    icon: <YouTubeIcon className="w-5 h-5 fill-current text-red-500" />,
    badge: "YAYIN",
  },
  {
    id: "tiktok",
    title: "TikTok",
    handle: "@kursat.yz • Animasyon & Sokak Mizahı",
    url: "https://www.tiktok.com/@kursat.yz",
    watermark: <TikTokIcon className="w-full h-full fill-current" />,
    icon: <TikTokIcon className="w-4 h-4 fill-current" />,
    badge: "VİRAL",
    glow: "from-cyan-500/15 via-transparent to-red-500/10",
  },
  {
    id: "instagram-mizah",
    title: "Instagram",
    handle: "@kursatsi • Karakterler, Kesitler & Mizah",
    url: "https://www.instagram.com/kursatsi/",
    watermark: <InstagramIcon className="w-full h-full fill-current" />,
    icon: <InstagramIcon className="w-4 h-4 fill-current text-pink-400" />,
    badge: "REELS",
    glow: "from-pink-500/15 via-transparent to-transparent",
  },
  {
    id: "twitter-mizah",
    title: "X (Twitter)",
    handle: "@kursatsi • Duyurular & Video Kesitleri",
    url: "https://x.com/kursatsi",
    watermark: <TwitterXIcon className="w-full h-full fill-current" />,
    icon: <TwitterXIcon className="w-4 h-4 fill-current" />,
    glow: "from-zinc-400/10 via-transparent to-transparent",
  },
  {
    id: "facebook",
    title: "Facebook",
    handle: "kursatsi • Topluluk Sayfası",
    url: "https://www.facebook.com/kursatsi",
    watermark: <FacebookIcon className="w-full h-full fill-current" />,
    icon: <FacebookIcon className="w-4 h-4 fill-current text-blue-400" />,
    glow: "from-blue-600/15 via-transparent to-transparent",
  },
];

export default function LinksPage() {
  const [activeTab, setActiveTab] = useState<"kisisel" | "animasyon">("kisisel");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Hash Routing support (#kisisel and #animasyon)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (hash === "animasyon" || hash === "animation" || hash === "mizah") {
        setActiveTab("animasyon");
      } else if (hash === "kisisel" || hash === "personal") {
        setActiveTab("kisisel");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const switchTab = (tab: "kisisel" | "animasyon") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tab}`);
    }
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentLinks = activeTab === "kisisel" ? KISISEL_LINKS : ANIMASYON_LINKS;

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans antialiased">
      {/* 1. ORIGINAL SITE CUSTOM FLUID CURSOR */}
      <CustomCursor />

      {/* 2. AWWWARDS TRUE 50/50 SPLIT SCREEN LAYOUT */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* ============================================================ */}
        {/* LEFT: FULL-BLEED MONOLITH (EDGE-TO-EDGE, ZERO BOX CONSTRAINTS) */}
        {/* ============================================================ */}
        <div className="w-full lg:w-1/2 lg:fixed lg:inset-y-0 lg:left-0 h-[48vh] sm:h-[55vh] lg:h-screen relative overflow-hidden bg-black select-none pointer-events-none lg:pointer-events-auto">
          <Image
            src="/images/ky-monolith.jpg"
            alt="Kürşat Yılmaz Brutalist Monolith"
            fill
            priority
            className="object-cover object-center scale-100 lg:scale-105 hover:scale-108 transition-transform duration-1000 ease-out"
          />

          {/* Ambient gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden lg:block" />
          <div className="absolute inset-0 bg-black/20" />

          {/* Desktop Left Watermark */}
          <div className="absolute bottom-8 left-8 z-10 hidden lg:block">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400/80">
              KÜRŞAT YILMAZ • 2026
            </span>
          </div>
        </div>

        {/* Desktop Spacer for Fixed Left Side */}
        <div className="hidden lg:block lg:w-1/2" />

        {/* ============================================================ */}
        {/* RIGHT: KURSAT. links + TOGGLE BAR + CARDS                    */}
        {/* ============================================================ */}
        <div className="w-full lg:w-1/2 min-h-screen px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-16 lg:py-20 flex flex-col justify-between relative z-10 bg-[#000000] lg:bg-transparent">
          <div className="space-y-8 max-w-xl mx-auto w-full">
            {/* Header Area */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-archivo">
                  KURSAT<span className="text-zinc-500 font-light lowercase">. links</span>
                </h1>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  DOĞRULANMIŞ HESAPLAR
                </span>
              </div>

              {/* UNIFIED TOOLBAR: TOGGLE + KINETIC MOTION REDIRECT BUTTON */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                {/* Segmented Switch: KİŞİSEL vs ANİMASYON */}
                <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                  <button
                    onClick={() => switchTab("kisisel")}
                    className={`px-5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                      activeTab === "kisisel"
                        ? "bg-white text-black font-bold shadow-lg"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    KİŞİSEL
                  </button>

                  <button
                    onClick={() => switchTab("animasyon")}
                    className={`px-5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                      activeTab === "animasyon"
                        ? "bg-white text-black font-bold shadow-lg"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    ANİMASYON
                  </button>
                </div>

                {/* DİNAMİK ALEVLİ VE PARILTILI MOTION ANA SAHNE BUTONU */}
                <Link
                  href="/"
                  className="relative group inline-flex shrink-0 p-[2px] rounded-xl overflow-visible active:scale-95 transition-transform duration-200"
                >
                  {/* Katman 1: Dış Alev & Yoğun Neon Kor Işıltısı (Ambient Flame Halo) */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 opacity-80 blur-md group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 animate-flame-pulse pointer-events-none" />

                  {/* Katman 2: Dönen Akışkan Plazma / Magma Ateş Çerçevesi */}
                  <div className="relative rounded-[11px] overflow-hidden p-[1.5px] w-full flex items-center justify-center">
                    <div className="absolute -inset-[250%] animate-flame-spin bg-[conic-gradient(from_0deg_at_50%_50%,#ff1a00_0deg,#ff6a00_50deg,#ffb700_100deg,#ffffff_130deg,#ffb700_160deg,#ff3c00_220deg,#ff0055_280deg,#ff1a00_360deg)] pointer-events-none" />

                    {/* Katman 3: Yükselen Kıvılcım & Kor Parçacıkları (Embers) */}
                    <span className="absolute bottom-1 left-3 w-1 h-1 rounded-full bg-amber-300 animate-ember-1 pointer-events-none" />
                    <span className="absolute bottom-0.5 right-6 w-1 h-1 rounded-full bg-orange-400 animate-ember-2 pointer-events-none" />
                    <span className="absolute bottom-1 left-1/2 w-0.5 h-0.5 rounded-full bg-yellow-100 animate-ember-3 pointer-events-none" />

                    {/* Katman 4: İç Kömür / Obsidyen Cam Zemin & İç Alev Aydınlatması */}
                    <div className="relative z-10 flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-[9.5px] bg-[#0c0705] border border-orange-500/20 shadow-[inset_0_-10px_16px_rgba(255,80,0,0.25),inset_0_1px_1px_rgba(255,200,120,0.4)] transition-all duration-300 group-hover:bg-[#150a06]">
                      {/* Titreyen Alev İkonu */}
                      <Flame className="w-4 h-4 text-orange-400 group-hover:text-amber-300 animate-flame-flicker transition-colors shrink-0" />

                      {/* Alev Gradient Tipografi */}
                      <span className="text-xs font-mono uppercase tracking-[0.2em] font-extrabold bg-gradient-to-r from-amber-200 via-orange-400 to-amber-100 bg-clip-text text-transparent group-hover:from-white group-hover:via-amber-200 group-hover:to-orange-300 transition-all">
                        ANA SAHNE
                      </span>

                      {/* Ok İkonu */}
                      <ArrowUpRight className="w-3.5 h-3.5 text-orange-400 group-hover:text-amber-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* WIDE CINEMATIC CARDS */}
            <div className="space-y-3.5">
              {currentLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full aspect-[22/8] sm:aspect-[24/7] rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl active:scale-[0.99] bg-zinc-950/70"
                >
                  {/* ARKA PLAN: İtibar/Unutma/YouTube İçin Görsel, Diğerleri İçin Sağ Altta Netleşen Dev Watermark Logo */}
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/70 group-hover:via-black/25 transition-colors duration-500" />
                    </>
                  ) : (
                    <>
                      {/* Ambient brand color wash */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.glow || "from-white/5"} via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      {/* SAĞ ALTTAN TAŞMALI & HOVER'DA KESKİNCE NETLEŞEN WATERMARK LOGO */}
                      <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 pointer-events-none select-none overflow-hidden">
                        <div className="w-36 h-36 sm:w-44 sm:h-44 text-white opacity-[0.06] blur-[2px] group-hover:opacity-[0.38] group-hover:blur-0 group-hover:scale-108 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-400 ease-out">
                          {item.watermark}
                        </div>
                      </div>

                      {/* Dark glass surface overlay */}
                      <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300 backdrop-blur-md" />
                    </>
                  )}

                  {/* Card Content: Centered Title + Subtitle */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-4">
                    {item.badge && (
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-400/90 mb-1 drop-shadow">
                        {item.badge}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white uppercase font-archivo group-hover:tracking-wider transition-all duration-300 drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-zinc-300/85 font-mono mt-0.5 group-hover:text-white transition-colors drop-shadow">
                      {item.handle}
                    </p>
                  </div>

                  {/* Top-Right Arrow Indicator */}
                  <div className="absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/30 group-hover:scale-110 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              ))}
            </div>

            {/* QUICK CONTACT BAR: GENEROUS SPACING + CLEAN BUTTONS */}
            <div className="pt-6 pb-12 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://wa.me/kursat.yz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-200 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                <WhatsappIcon className="w-4 h-4 fill-current text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => handleCopy("email", "kursat@itibar.app")}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-200 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                {copiedKey === "email" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-zinc-400" />
                    <span>kursat@itibar.app</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
