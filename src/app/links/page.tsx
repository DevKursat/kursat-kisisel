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
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans antialiased">
      {/* 1. TOP VIDEO HERO BANNER (Dissolves seamlessly into page) */}
      <div className="relative w-full h-[280px] sm:h-[340px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient fade - melts top video into the black page background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-transparent" />

        {/* Back to main site link */}
        <div className="absolute top-5 left-5 z-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-white/20 text-xs text-zinc-300 hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>kursat.itibar.app</span>
          </Link>
        </div>
      </div>

      {/* 2. PROFILE HEADER OVERLAPPING VIDEO */}
      <div className="relative z-10 max-w-md mx-auto px-4 -mt-20 text-center">
        {/* Profile Avatar */}
        <div className="relative inline-block mx-auto mb-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl relative bg-zinc-900 mx-auto">
            <Image
              src="/images/bocek-avatar.jpg"
              alt="Kürşat Yılmaz"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Name & Handle */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Kürşat Yılmaz
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-mono">
          @kursatsi • @kursat.yz
        </p>

        {/* Quick Contact Buttons */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <a
            href="https://wa.me/kursat.yz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            <WhatsappIcon className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => handleCopy("email", "kursat@itibar.app")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
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

        {/* 3. LINKS SECTIONS */}
        <div className="mt-8 space-y-6 text-left">
          {/* Section: Animasyon & Medya */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5 px-1">
              Animasyon & Medya
            </div>
            <div className="space-y-2">
              <a
                href="https://www.youtube.com/@kursatsi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                    <YouTubeIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      YouTube
                    </div>
                    <div className="text-xs text-zinc-500">@kursatsi</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.tiktok.com/@kursat.yz"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <TikTokIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      TikTok
                    </div>
                    <div className="text-xs text-zinc-500">@kursat.yz (Animasyon Yayını)</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.instagram.com/kursatsi/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <InstagramIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Instagram (Animasyon)
                    </div>
                    <div className="text-xs text-zinc-500">@kursatsi</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://open.spotify.com/intl-tr/artist/5NQc0XkMOuLmfSrgNaz3YP"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
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
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <TwitterXIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      X (Twitter)
                    </div>
                    <div className="text-xs text-zinc-500">@kursatsi</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.facebook.com/kursatsi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                    <FacebookIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Facebook
                    </div>
                    <div className="text-xs text-zinc-500">kursatsi</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Section: Kişisel Siteler, Projeler & Mühendislik */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5 px-1">
              Kişisel & Projeler
            </div>
            <div className="space-y-2">
              <a
                href="https://itibar.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 font-bold text-xs">
                    İ
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      İtibar
                    </div>
                    <div className="text-xs text-zinc-500">itibar.app</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://unutma.itibar.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 font-bold text-xs">
                    U
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Unutma.
                    </div>
                    <div className="text-xs text-zinc-500">unutma.itibar.app</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
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
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <GithubIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      GitHub
                    </div>
                    <div className="text-xs text-zinc-500">@DevKursat</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.linkedin.com/in/kürşatyılmaz/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <LinkedinIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      LinkedIn
                    </div>
                    <div className="text-xs text-zinc-500">kürşatyılmaz</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://x.com/DevKursat"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <TwitterXIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      X (Twitter)
                    </div>
                    <div className="text-xs text-zinc-500">@DevKursat</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.instagram.com/kursat.yz/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <InstagramIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      Instagram (Kişisel)
                    </div>
                    <div className="text-xs text-zinc-500">@kursat.yz</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://dev.to/devkursat"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <DevtoIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      DEV.to
                    </div>
                    <div className="text-xs text-zinc-500">devkursat</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. NATURAL ATMOSPHERIC FADE: KÜRŞAT & BÖCEK (NO BOX CONTAINER, DISSOLVES SEAMLESSLY INTO BACKGROUND) */}
      <div className="relative w-full max-w-2xl mx-auto mt-20 pt-8 overflow-hidden pointer-events-none select-none">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/images/bocek-podcast.jpg"
            alt="Kürşat & Böcek"
            fill
            className="object-cover object-bottom"
          />
          {/* Top fade: Melts seamlessly into the black site background */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#000000]/60 to-[#000000]" />
          {/* Bottom & side fade: Melts smoothly into the footer */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000000]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000]" />
        </div>
      </div>

      {/* 5. MINIMAL MONUMENTAL FOOTER */}
      <footer className="relative z-10 py-10 border-t border-white/5 text-center text-xs text-zinc-500 font-normal">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center justify-center gap-2">
          <span>© 2026 Kürşat Yılmaz • Tüm hakları saklıdır.</span>
          <Link
            href="/"
            className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            kursat.itibar.app
          </Link>
        </div>
      </footer>
    </main>
  );
}
