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

export default function LinksPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans antialiased">
      {/* Back to main site link */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 hover:border-white/30 text-xs text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 shadow-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-mono">kursat.itibar.app</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 px-5 sm:px-8 py-16 sm:py-20 lg:py-16 items-start">
        {/* ============================================================ */}
        {/* SOL SÜTUN: KY MONOLİT (DESKTOPTA SABİT STICKY, MOBİLDE GÖRSEL ÇAPA) */}
        {/* ============================================================ */}
        <aside className="lg:col-span-5 lg:sticky lg:top-16 flex flex-col justify-between space-y-6">
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[9/13] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl group">
            <Image
              src="/images/ky-monolith.jpg"
              alt="Kürşat Yılmaz Brutalist Monolith"
              fill
              priority
              className="object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
            />
            {/* Subtle luxury ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

            {/* Monolith Overlay Narrative */}
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>OFFICIAL HUB</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-archivo">
                KÜRŞAT YILMAZ
              </h2>
              <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-xs">
                Yapay zeka mimarisi, animasyon ve dijital varlıkların resmi merkezi.
              </p>
            </div>
          </div>

          {/* Hızlı İletişim / Direkt Butonlar */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/kursat.yz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-xs font-medium text-zinc-200 hover:text-white transition-all active:scale-95"
            >
              <WhatsappIcon className="w-4 h-4 fill-current text-emerald-400" />
              <span>WhatsApp: @kursat.yz</span>
            </a>

            <button
              onClick={() => handleCopy("email", "kursat@itibar.app")}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-xs font-medium text-zinc-200 hover:text-white transition-all active:scale-95"
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
        </aside>

        {/* ============================================================ */}
        {/* SAĞ SÜTUN: SOSYAL MEDYA, ANİMASYON VE KİŞİSEL PLATFORMLAR */}
        {/* ============================================================ */}
        <section className="lg:col-span-7 space-y-8">
          {/* Awwwards Header */}
          <div className="pb-3 border-b border-white/10 flex items-baseline justify-between">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-archivo">
              kürşat yılmaz<span className="text-zinc-500 font-light lowercase">. LINKS</span>
            </h1>
            <span className="text-xs font-mono text-zinc-500">
              DOĞRULANMIŞ HESAPLAR
            </span>
          </div>

          {/* 1. KATEGORİ: ANİMASYON, MEDYA & MİZAH */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-1 flex items-center justify-between">
              <span>Animasyon, Medya & Mizah</span>
              <span className="text-[10px] text-zinc-600">@kursatsi • @kursat.yz</span>
            </div>

            <div className="space-y-2.5">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@kursatsi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                    <YouTubeIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      YouTube
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">@kursatsi • Kanal & Animasyonlar</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@kursat.yz"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <TikTokIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      TikTok
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">@kursat.yz • Animasyon & Sokak Mizahı</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Instagram (Animasyon/Mizah) */}
              <a
                href="https://www.instagram.com/kursatsi/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <InstagramIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      Instagram (Animasyon & Mizah)
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">@kursatsi • Karakterler & Klipler</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Spotify Artist */}
              <a
                href="https://open.spotify.com/intl-tr/artist/5NQc0XkMOuLmfSrgNaz3YP"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <SpotifyIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      Spotify Sanatçı Profili
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">Kürşat Yılmaz • Müzik & Sesler</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* X / Twitter (Animasyon) */}
              <a
                href="https://x.com/kursatsi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <TwitterXIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      X (Twitter) Animasyon
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">@kursatsi • Duyurular & Kesitler</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/kursatsi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                    <FacebookIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      Facebook
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">kursatsi • Topluluk Sayfası</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* 2. KATEGORİ: KİŞİSEL PROFİLLER, SİTELER & PROJELER */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-1 flex items-center justify-between">
              <span>Kişisel Siteler, Projeler & Mühendislik</span>
              <span className="text-[10px] text-zinc-600">Kürşat Yılmaz</span>
            </div>

            <div className="space-y-2.5">
              {/* İtibar */}
              <a
                href="https://itibar.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0 font-extrabold text-sm font-archivo">
                    İ
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      İtibar
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">itibar.app • Yapay Zeka Dijital İtibar Motoru</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Unutma. */}
              <a
                href="https://unutma.itibar.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0 font-extrabold text-sm font-archivo">
                    U
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      Unutma.
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">unutma.itibar.app • Otonom Hafıza & Asistan</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Özgeçmiş / CV */}
              <a
                href="https://devkursat.github.io/cv/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      Özgeçmiş / CV
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">devkursat.github.io/cv • Lead AI Product Developer</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/DevKursat"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <GithubIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      GitHub
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">github.com/DevKursat • Açık Kaynak & Sistemler</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/kürşatyılmaz/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <LinkedinIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      LinkedIn
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">linkedin.com/in/kürşatyılmaz</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* X / Twitter (Kişisel) */}
              <a
                href="https://x.com/DevKursat"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <TwitterXIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      X (Twitter) Kişisel
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">@DevKursat • Yapay Zeka & Mühendislik</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Instagram (Kişisel) */}
              <a
                href="https://www.instagram.com/kursat.yz/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                    <InstagramIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      Instagram Kişisel
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">@kursat.yz • Kişisel Profil</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* DEV.to */}
              <a
                href="https://dev.to/devkursat"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <DevtoIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-white">
                      DEV.to
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">dev.to/devkursat • Teknik Makaleler</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Awwwards Minimalist Footer */}
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
