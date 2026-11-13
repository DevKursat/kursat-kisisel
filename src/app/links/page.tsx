"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Check, Mail } from "lucide-react";
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
  image: string;
  icon: React.ReactNode;
  badge?: string;
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
    id: "cv",
    title: "Özgeçmiş / CV",
    handle: "devkursat.github.io/cv • Lead AI Product Developer",
    url: "https://devkursat.github.io/cv/",
    image: "/blog/ai-bumerangi-muhendislerin-donusu.png",
    icon: <span className="font-mono text-xs font-bold">CV</span>,
    badge: "RESUME",
  },
  {
    id: "github",
    title: "GitHub",
    handle: "github.com/DevKursat • Açık Kaynak & Mimariler",
    url: "https://github.com/DevKursat",
    image: "/projects/aetheris.jpg",
    icon: <GithubIcon className="w-4 h-4 fill-current" />,
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    handle: "linkedin.com/in/kürşatyılmaz",
    url: "https://www.linkedin.com/in/kürşatyılmaz/",
    image: "/blog/geo.jpg",
    icon: <LinkedinIcon className="w-4 h-4 fill-current" />,
  },
  {
    id: "twitter-kisisel",
    title: "X (Twitter)",
    handle: "@DevKursat • AI, Sistemler & Vizyon",
    url: "https://x.com/DevKursat",
    image: "/blog/swarm.jpg",
    icon: <TwitterXIcon className="w-4 h-4 fill-current" />,
  },
  {
    id: "instagram-kisisel",
    title: "Instagram",
    handle: "@kursat.yz • Kişisel Profil",
    url: "https://www.instagram.com/kursat.yz/",
    image: "/blog/latency.jpg",
    icon: <InstagramIcon className="w-4 h-4 fill-current" />,
  },
  {
    id: "devto",
    title: "DEV.to",
    handle: "dev.to/devkursat • Teknik Makaleler",
    url: "https://dev.to/devkursat",
    image: "/blog/meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari.png",
    icon: <DevtoIcon className="w-4 h-4 fill-current" />,
  },
];

const ANIMASYON_LINKS: LinkBanner[] = [
  {
    id: "youtube",
    title: "YouTube",
    handle: "@kursatsi • Stüdyo, Podcast & Animasyon",
    url: "https://www.youtube.com/@kursatsi",
    image: "/images/bocek-podcast.jpg",
    icon: <YouTubeIcon className="w-5 h-5 fill-current" />,
    badge: "YAYIN",
  },
  {
    id: "tiktok",
    title: "TikTok",
    handle: "@kursat.yz • Animasyon & Sokak Mizahı",
    url: "https://www.tiktok.com/@kursat.yz",
    image: "/blog/meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari.png",
    icon: <TikTokIcon className="w-4 h-4 fill-current" />,
    badge: "VİRAL",
  },
  {
    id: "instagram-mizah",
    title: "Instagram",
    handle: "@kursatsi • Karakterler & Mizah Klipleri",
    url: "https://www.instagram.com/kursatsi/",
    image: "/blog/qwen-acik-kaynak-silikon-vadisi.png",
    icon: <InstagramIcon className="w-4 h-4 fill-current" />,
    badge: "REELS",
  },
  {
    id: "spotify",
    title: "Spotify",
    handle: "Kürşat Yılmaz • Sanatçı Profili & Sesler",
    url: "https://open.spotify.com/intl-tr/artist/5NQc0XkMOuLmfSrgNaz3YP",
    image: "/blog/latency.jpg",
    icon: <SpotifyIcon className="w-4 h-4 fill-current" />,
    badge: "AUDIO",
  },
  {
    id: "twitter-mizah",
    title: "X (Twitter)",
    handle: "@kursatsi • Duyurular & Video Kesitleri",
    url: "https://x.com/kursatsi",
    image: "/blog/swarm.jpg",
    icon: <TwitterXIcon className="w-4 h-4 fill-current" />,
  },
  {
    id: "facebook",
    title: "Facebook",
    handle: "kursatsi • Topluluk Sayfası",
    url: "https://www.facebook.com/kursatsi",
    image: "/blog/openai-1-2-milyon-dolarlik-linux-exploit-skandali.png",
    icon: <FacebookIcon className="w-4 h-4 fill-current" />,
  },
];

export default function LinksPage() {
  const [activeTab, setActiveTab] = useState<"kisisel" | "animasyon">("kisisel");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentLinks = activeTab === "kisisel" ? KISISEL_LINKS : ANIMASYON_LINKS;

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans antialiased">
      {/* Back to Home floating pill */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 hover:border-white/30 text-xs text-zinc-300 hover:text-white transition-all active:scale-95 shadow-2xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-mono">kursat.itibar.app</span>
        </Link>
      </div>

      {/* AWWWARDS EXACT SPLIT LAYOUT: FULL-BLEED MONOLITH ON LEFT, SCROLLING BANNERS ON RIGHT */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* ============================================================ */}
        {/* LEFT: FULL-BLEED MONOLITH (ZERO BOX PADDING, OCCUPIES 100% OF HALF) */}
        {/* ============================================================ */}
        <div className="w-full lg:w-1/2 lg:fixed lg:inset-y-0 lg:left-0 h-[48vh] sm:h-[55vh] lg:h-screen relative overflow-hidden bg-black select-none pointer-events-none lg:pointer-events-auto">
          <Image
            src="/images/ky-monolith.jpg"
            alt="Kürşat Yılmaz Brutalist Monolith"
            fill
            priority
            className="object-cover object-center scale-100 lg:scale-105 hover:scale-108 transition-transform duration-1000 ease-out"
          />

          {/* Luxury ambient vignettes seamlessly melting edges into black */}
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

        {/* Spacer for desktop fixed left side */}
        <div className="hidden lg:block lg:w-1/2" />

        {/* ============================================================ */}
        {/* RIGHT: KURSAT. links + TOGGLE + WIDE AWWWARDS BANNER CARDS   */}
        {/* ============================================================ */}
        <div className="w-full lg:w-1/2 min-h-screen px-5 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-16 lg:py-20 flex flex-col justify-between relative z-10 bg-[#000000] lg:bg-transparent">
          <div className="space-y-8 max-w-xl mx-auto w-full">
            {/* Header: Exact Awwwards Style "KURSAT. links" */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-archivo">
                  KURSAT<span className="text-zinc-500 font-light lowercase">. links</span>
                </h1>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  DOĞRULANMIŞ HESAPLAR
                </span>
              </div>

              {/* TOGGLE SWITCH: KİŞİSEL (1.) vs ANİMASYON (2.) */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                  <button
                    onClick={() => setActiveTab("kisisel")}
                    className={`px-5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                      activeTab === "kisisel"
                        ? "bg-white text-black font-bold shadow-lg"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    KİŞİSEL
                  </button>

                  <button
                    onClick={() => setActiveTab("animasyon")}
                    className={`px-5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                      activeTab === "animasyon"
                        ? "bg-white text-black font-bold shadow-lg"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    ANİMASYON
                  </button>
                </div>

                <span className="text-[11px] font-mono text-zinc-500">
                  {currentLinks.length} BAĞLANTI
                </span>
              </div>
            </div>

            {/* WIDE CINEMATIC AWWWARDS BANNER CARDS */}
            <div className="space-y-3.5">
              {currentLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full aspect-[22/8] sm:aspect-[24/7] rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl active:scale-[0.99]"
                >
                  {/* Atmospheric Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Contrast Glass Overlay */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/70 group-hover:via-black/25 transition-colors duration-500" />

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

            {/* Quick Contact Bar */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/kursat.yz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all active:scale-95"
              >
                <WhatsappIcon className="w-4 h-4 fill-current text-emerald-400" />
                <span>WhatsApp: @kursat.yz</span>
              </a>

              <button
                onClick={() => handleCopy("email", "kursat@itibar.app")}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all active:scale-95"
              >
                {copiedKey === "email" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Kopyalandı</span>
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

          {/* Minimalist Awwwards Footer */}
          <footer className="pt-12 pb-4 max-w-xl mx-auto w-full border-t border-white/10 space-y-1.5 text-left">
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Yapay Zeka Mimarisi, Otonom Sistemler ve Sokak Çizgisi.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              <span className="text-zinc-300">@kursatsi • @kursat.yz</span>
              <span>•</span>
              <span>2026</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
