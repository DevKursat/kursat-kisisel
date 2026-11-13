"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  FileText,
  Mail,
  ArrowLeft,
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const totalFrames = 143;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Draw frame on canvas with cover mode
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete) {
      for (let offset = 1; offset < 25; offset++) {
        const left = imagesRef.current[frameIndex - offset];
        if (left && left.complete) {
          img = left;
          break;
        }
        const right = imagesRef.current[frameIndex + offset];
        if (right && right.complete) {
          img = right;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth = canvasWidth;
    let renderHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, []);

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    const padZero = (n: number) => n.toString().padStart(4, "0");

    const firstImg = new window.Image();
    firstImg.src = "/frames/frame_0001.jpg";
    firstImg.onload = () => {
      if (isCancelled) return;
      images[0] = firstImg;
      drawFrame(0);
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new window.Image();
      img.src = `/frames/frame_${padZero(i)}.jpg`;
      img.onload = () => {
        if (isCancelled) return;
        images[i - 1] = img;
        if (Math.round(currentFrameRef.current) === i - 1) {
          drawFrame(i - 1);
        }
      };
      images[i - 1] = img;
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, drawFrame]);

  // Window resize & Retina canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Scroll scrubbing listener with physics lerp
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const p = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      targetFrameRef.current = p * (totalFrames - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const updateLerp = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.14;
        drawFrame(Math.round(currentFrameRef.current));
      }
      animationFrameIdRef.current = requestAnimationFrame(updateLerp);
    };

    animationFrameIdRef.current = requestAnimationFrame(updateLerp);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [totalFrames, drawFrame]);

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans antialiased relative">
      {/* 1. SCROLL-SCRUBBED CANVAS VIDEO ENGINE (Fixed background, reactive to finger scroll) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-35 transition-opacity duration-1000"
        />
        {/* Deep ambient vignette so text always stands out with supreme contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/50 to-[#000000]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#000000]/60 to-[#000000]" />
      </div>

      {/* 2. TOP NAV BAR */}
      <header className="relative z-20 max-w-lg mx-auto px-5 pt-6 pb-2 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-xl border border-white/10 hover:border-white/20 text-xs text-zinc-300 hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-mono">kursat.itibar.app</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[10px] font-mono tracking-wider text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SCROLL SYNC</span>
        </span>
      </header>

      {/* 3. EDITORIAL HERO (NO PROFILE AVATAR PHOTO AS REQUESTED) */}
      <div className="relative z-10 max-w-md mx-auto px-4 pt-10 pb-6 text-center">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
            <span>OFFICIAL HUB</span>
          </div>

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

        {/* 4. LINKS SECTIONS (TACTILE, MINIMALIST MONOCHROME) */}
        <div className="mt-10 space-y-7 text-left">
          {/* Section: Animasyon & Medya */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5 px-1 flex items-center justify-between">
              <span>Animasyon & Medya</span>
              <span className="text-[10px] text-zinc-600">6 KANAL</span>
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
              <span className="text-[10px] text-zinc-600">6 BAĞLANTI</span>
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

      {/* 5. NATURAL SEAMLESS BLEND: KÜRŞAT & BÖCEK (ZERO CONTAINER, FADES GENTLY INTO BLACK VOID) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto mt-24 overflow-hidden pointer-events-none select-none">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/images/bocek-podcast.jpg"
            alt="Kürşat & Böcek"
            fill
            className="object-cover object-bottom"
          />
          {/* Top fade: Melts seamlessly into the black site background */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#000000]/60 to-[#000000]" />
          {/* Bottom & side fade: Melts softly into the footer */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000000]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000]" />
        </div>
      </div>

      {/* 6. MINIMAL MONUMENTAL FOOTER */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center text-xs text-zinc-500 font-normal">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center justify-center gap-2">
          <span>© 2026 Kürşat Yılmaz • Tüm hakları saklıdır.</span>
          <Link
            href="/"
            className="text-[11px] text-zinc-600 hover:text-zinc-400 font-mono transition-colors"
          >
            kursat.itibar.app
          </Link>
        </div>
      </footer>
    </main>
  );
}
