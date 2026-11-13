"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  FileText,
  Mail,
  ArrowLeft,
  Mic,
  Headphones,
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

export default function LinksPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans antialiased relative">
      {/* 1. TOP NAV BAR */}
      <header className="relative z-20 max-w-lg mx-auto px-5 pt-8 pb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-xl border border-white/10 hover:border-white/20 text-xs text-zinc-300 hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-mono">kursat.itibar.app</span>
        </Link>
      </header>

      {/* 2. EDITORIAL HERO (CLEAN, NO AVATAR) */}
      <div className="relative z-10 max-w-md mx-auto px-4 pt-6 pb-4 text-center">
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-archivo">
            Kürşat Yılmaz
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono">
            @kursatsi • @kursat.yz
          </p>
        </div>

        {/* Quick Contact Action Pills */}
        <div className="flex items-center justify-center gap-2.5 mt-5">
          <a
            href="https://wa.me/kursat.yz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-xs font-medium text-zinc-200 hover:text-white transition-all active:scale-95"
          >
            <WhatsappIcon className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => handleCopy("email", "kursat@itibar.app")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-xs font-medium text-zinc-200 hover:text-white transition-all active:scale-95"
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

        {/* 3. TACTILE GLASS LINK DIRECTORY (BEĞENİLEN ŞEFFAF KARTLAR) */}
        <div className="mt-8 space-y-7 text-left">
          {/* Section: Animasyon & Medya */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5 px-1 flex items-center justify-between">
              <span>Animasyon & Medya</span>
            </div>

            <div className="space-y-2">
              <a
                href="https://www.youtube.com/@kursatsi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                    <YouTubeIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      YouTube
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">@kursatsi</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.tiktok.com/@kursat.yz"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <TikTokIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      TikTok
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">@kursat.yz (Animasyon Yayını)</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.instagram.com/kursatsi/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <InstagramIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Instagram (Animasyon)
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">@kursatsi</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://open.spotify.com/intl-tr/artist/5NQc0XkMOuLmfSrgNaz3YP"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <SpotifyIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Spotify
                    </div>
                    <div className="text-xs text-zinc-500">Sanatçı Profili • Kürşat Yılmaz</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://x.com/kursatsi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <TwitterXIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      X (Twitter)
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">@kursatsi</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.facebook.com/kursatsi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                    <FacebookIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Facebook
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">kursatsi</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Section: Kişisel Siteler, Projeler & Mühendislik */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5 px-1 flex items-center justify-between">
              <span>Kişisel & Projeler</span>
            </div>

            <div className="space-y-2">
              <a
                href="https://itibar.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 font-bold text-xs">
                    İ
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      İtibar
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">itibar.app</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://unutma.itibar.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 font-bold text-xs">
                    U
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Unutma.
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">unutma.itibar.app</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Özgeçmiş / CV
                    </div>
                    <div className="text-xs text-zinc-500">Lead AI Product Developer</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://github.com/DevKursat"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <GithubIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      GitHub
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">@DevKursat</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.linkedin.com/in/kürşatyılmaz/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <LinkedinIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      LinkedIn
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">kürşatyılmaz</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://x.com/DevKursat"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <TwitterXIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      X (Twitter)
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">@DevKursat</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.instagram.com/kursat.yz/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <InstagramIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Instagram (Kişisel)
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">@kursat.yz</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://dev.to/devkursat"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <DevtoIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      DEV.to
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">devkursat</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. NATURAL ATMOSPHERIC PODCAST FINALE (FOTOĞRAFIN ÜST KISMI SİTEYE ŞEFFAFLAŞARAK ERİR, ALT KISIM CANLI & DOĞAL) */}
      <section className="relative w-full max-w-xl mx-auto mt-20 pb-16 px-4">
        {/* The photo with smooth top fade into site's pure black */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/images/bocek-podcast.jpg"
            alt="Kürşat & Böcek Podcast"
            fill
            className="object-cover object-bottom"
          />
          {/* Top fade gradient - melts smoothly into site black background */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/30 to-[#000000]" />
          {/* Side soft fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

          {/* On-air badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>STÜDYO • ON-AIR</span>
            </span>
          </div>
        </div>

        {/* Podcast Dialogue & Narration */}
        <div className="mt-5 space-y-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="space-y-1">
            <div className="text-base font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <Mic className="w-4 h-4 text-emerald-400" />
              <span>Kürşat & Böcek</span>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              “Koda dökülen mantık, mikrofonda yaşayan absürtlük. Sokak simülasyonları ve gecenin nabzı.”
            </p>
          </div>

          <a
            href="https://www.youtube.com/@kursatsi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-xs font-medium text-white transition-all shrink-0 active:scale-95"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Yayını Dinle</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </main>
  );
}
