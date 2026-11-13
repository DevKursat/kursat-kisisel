"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
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

interface LinkBannerItem {
  title: string;
  subtitle: string;
  url: string;
  image: string;
  badge?: string;
}

const LINK_BANNERS: LinkBannerItem[] = [
  {
    title: "YouTube",
    subtitle: "@kursatsi • Stüdyo & Animasyon",
    url: "https://www.youtube.com/@kursatsi",
    image: "/images/bocek-podcast.jpg",
    badge: "ON-AIR",
  },
  {
    title: "TikTok",
    subtitle: "@kursat.yz • Animasyon Yayını",
    url: "https://www.tiktok.com/@kursat.yz",
    image: "/blog/meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari.png",
    badge: "VİRAL",
  },
  {
    title: "İtibar",
    subtitle: "itibar.app • Dijital İtibar & Yapay Zeka",
    url: "https://itibar.app",
    image: "/projects/itibar.jpg",
    badge: "PRODUCT",
  },
  {
    title: "Unutma.",
    subtitle: "unutma.itibar.app • Akıllı Not & Hafıza",
    url: "https://unutma.itibar.app",
    image: "/projects/unutma.jpg",
    badge: "APP",
  },
  {
    title: "Spotify",
    subtitle: "Sanatçı Profili • Kürşat Yılmaz",
    url: "https://open.spotify.com/intl-tr/artist/5NQc0XkMOuLmfSrgNaz3YP",
    image: "/blog/latency.jpg",
    badge: "MUSIC",
  },
  {
    title: "Blog & Yazılar",
    subtitle: "Yapay Zeka Mimarisi & Teardown",
    url: "/blog",
    image: "/blog/ollama-performans-vergisi-vllm.png",
    badge: "WRITING",
  },
  {
    title: "Özgeçmiş / CV",
    subtitle: "Lead AI Product Developer",
    url: "/cv.pdf",
    image: "/blog/ai-bumerangi-muhendislerin-donusu.png",
    badge: "CV",
  },
  {
    title: "GitHub",
    subtitle: "github.com/DevKursat",
    url: "https://github.com/DevKursat",
    image: "/projects/aetheris.jpg",
    badge: "CODE",
  },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans antialiased">
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 hover:border-white/30 text-xs text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 shadow-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-mono">kursat.itibar.app</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-5 sm:px-8 py-16 sm:py-20 lg:py-16 items-start">
        {/* LEFT COLUMN: THE MONOLITH (STICKY ON DESKTOP, VISUAL ANCHOR ON MOBILE) */}
        <aside className="lg:col-span-5 lg:sticky lg:top-16 flex flex-col justify-between space-y-8">
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[9/14] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl group">
            <Image
              src="/images/ky-monolith.jpg"
              alt="Kürşat Yılmaz Monolith"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Dark luxury atmospheric vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

            {/* Monolith Overlay Title */}
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                CREATIVE AI & ANIMATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-archivo">
                KÜRŞAT YILMAZ
              </h2>
              <p className="text-xs text-zinc-400 font-light max-w-xs">
                Koda dökülen mantık, mikrofonda yaşayan absürtlük. Sokak simülasyonları ve gecenin nabzı.
              </p>
            </div>
          </div>

          {/* Quick Social Icons Strip on Left */}
          <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
            <a
              href="https://wa.me/kursat.yz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
            >
              <WhatsappIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://www.instagram.com/kursat.yz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
            >
              <InstagramIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://x.com/kursatsi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Twitter"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
            >
              <TwitterXIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://www.linkedin.com/in/kürşatyılmaz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
            >
              <LinkedinIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://github.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
            >
              <GithubIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://www.facebook.com/kursatsi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
            >
              <FacebookIcon className="w-4 h-4 fill-current" />
            </a>
          </div>
        </aside>

        {/* RIGHT COLUMN: THE CINEMATIC AWWWARDS-STYLE LINK BANNERS */}
        <section className="lg:col-span-7 space-y-6">
          {/* Header matching Awwwards typography */}
          <div className="pb-2 border-b border-white/10 flex items-baseline justify-between">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-archivo">
              kürşat yılmaz<span className="text-zinc-500 font-light lowercase">. LINKS</span>
            </h1>
            <span className="text-xs font-mono text-zinc-500">
              {LINK_BANNERS.length} BAĞLANTI
            </span>
          </div>

          {/* Wide Letterbox Visual Banners */}
          <div className="space-y-4">
            {LINK_BANNERS.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : undefined}
                rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative block w-full aspect-[21/8] sm:aspect-[24/8] rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg active:scale-[0.99]"
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Dark Contrast Glass Overlay */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60 group-hover:via-black/25 transition-colors duration-500" />

                {/* Card Content (Centered Title + Subtitle) */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
                  {item.badge && (
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-400/90 mb-1">
                      {item.badge}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-archivo group-hover:tracking-wider transition-all duration-300 drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-300/80 font-mono mt-0.5 group-hover:text-white transition-colors">
                    {item.subtitle}
                  </p>
                </div>

                {/* Top-Right Arrow Indicator */}
                <div className="absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/30 group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>

          {/* Minimalist Awwwards-style Footer */}
          <footer className="pt-8 border-t border-white/10 space-y-2 text-left">
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Yapay Zeka Mimarisi, Otonom Sistemler ve Sokak Çizgisi.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              <span>@kursatsi • @kursat.yz</span>
              <span>•</span>
              <span className="text-zinc-400">2026</span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
