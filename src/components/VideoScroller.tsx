"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { TextLoop } from "./core/text-loop";
import { TextEffect } from "./core/text-effect";
import { useLanguage } from "@/context/LanguageContext";

interface VideoScrollerProps {
  totalFrames?: number;
}

export default function VideoScroller({ totalFrames = 143 }: VideoScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const { lang, t } = useLanguage();

  // Scroll progress (0 to 1)
  const [progress, setProgress] = useState(0);

  // Canvas draw with crisp cover
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete) {
      for (let offset = 1; offset < 35; offset++) {
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

  // Preload all frames
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    const padZero = (n: number) => n.toString().padStart(4, "0");

    // İlk kare doğrudan videodan çıkarılan tam 1080p frame_0001.jpg
    const firstImg = new Image();
    firstImg.src = "/frames/frame_0001.jpg";
    firstImg.onload = () => {
      if (isCancelled) return;
      images[0] = firstImg;
      drawFrame(0);
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
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

  // Window resize handler (Retina support)
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

  // Scroll tracking and smooth lerp
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const p = Math.max(0, Math.min(1, -containerTop / totalScrollable));
      setProgress(p);
      targetFrameRef.current = p * (totalFrames - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const updateLerp = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.12;
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

  // Kinetic Transformations
  const stage1Progress = Math.min(1, progress / 0.18);
  const stage1Opacity = Math.max(0, 1 - stage1Progress);
  const stage1TranslateY = -stage1Progress * 300;
  const stage1Blur = stage1Progress * 12;

  let stage2Opacity = 0;
  let stage2TranslateY = 40;
  const isStage2InView = progress >= 0.22 && progress <= 0.55;
  if (isStage2InView) {
    if (progress < 0.35) {
      const tProgress = (progress - 0.22) / (0.35 - 0.22);
      stage2Opacity = tProgress;
      stage2TranslateY = 40 * (1 - tProgress);
    } else {
      const tProgress = (progress - 0.35) / (0.55 - 0.35);
      stage2Opacity = 1 - tProgress;
      stage2TranslateY = -tProgress * 180;
    }
  }

  let stage3Opacity = 0;
  let stage3TranslateY = 40;
  const isStage3InView = progress >= 0.58 && progress <= 0.92;
  if (isStage3InView) {
    if (progress < 0.72) {
      const tProgress = (progress - 0.58) / (0.72 - 0.58);
      stage3Opacity = tProgress;
      stage3TranslateY = 40 * (1 - tProgress);
    } else {
      const tProgress = (progress - 0.72) / (0.92 - 0.72);
      stage3Opacity = 1 - tProgress;
      stage3TranslateY = -tProgress * 180;
    }
  }

  const loopRoles =
    lang === "tr"
      ? [
          "AI Ürün Mühendisi",
          "Çoklu Ajan Mimarı",
          "Full-Stack Geliştirici",
          "Kreatif Teknolojist",
        ]
      : [
          "AI Product Engineer",
          "Multi-Agent Architect",
          "Full-Stack Craftsman",
          "Creative Technologist",
        ];

  return (
    <div ref={containerRef} className="relative w-full h-[550vh] bg-[#000000]">
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Fullscreen Video Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Subtle Dark Vignette for contrast */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/20 to-black/45" />

        {/* ============================================================ */}
        {/* STAGE 1: KÜRŞAT YILMAZ (BÜYÜK, 2 SATIR, ANITSAL VE ASİL)    */}
        {/* ============================================================ */}
        <div
          className={`absolute inset-x-0 bottom-6 sm:bottom-8 md:bottom-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none will-change-transform ${
            progress > 0.22 ? "hidden pointer-events-none" : ""
          }`}
          style={{
            opacity: stage1Opacity,
            transform: `translate3d(0, ${stage1TranslateY}px, 0)`,
            filter: `blur(${stage1Blur}px)`,
            display: progress > 0.22 ? "none" : "flex",
          }}
        >
          {/* 2 Satır, heybetli, ekranda dolu ve çeneden aşağıda kusursuz Archivo 800 başlık */}
          <h1 className="font-archivo font-[800] text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] tracking-[-0.03em] text-white uppercase leading-[0.88] drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] select-none">
            <span className="block">KÜRŞAT</span>
            <span className="block">YILMAZ</span>
          </h1>

          {/* İnce, zarif, orantılı Instrument Serif Meslek Alanı (abartısız, şık) */}
          <div className="mt-3.5 sm:mt-4 text-base sm:text-lg md:text-xl font-instrument italic font-normal text-zinc-300 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] flex items-center justify-center gap-2.5">
            <span className="text-zinc-500 font-sans text-xs not-italic opacity-40">
              —
            </span>
            <TextLoop
              key={lang}
              className="overflow-y-clip"
              interval={2.4}
              transition={{
                type: "spring",
                stiffness: 900,
                damping: 80,
                mass: 10,
              }}
              variants={{
                initial: {
                  y: 16,
                  rotateX: 90,
                  opacity: 0,
                  filter: "blur(3px)",
                },
                animate: {
                  y: 0,
                  rotateX: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                },
                exit: {
                  y: -16,
                  rotateX: -90,
                  opacity: 0,
                  filter: "blur(3px)",
                },
              }}
            >
              {loopRoles.map((role) => (
                <span key={role} className="text-zinc-200 font-instrument italic tracking-wide">
                  {role}
                </span>
              ))}
            </TextLoop>
            <span className="text-zinc-500 font-sans text-xs not-italic opacity-40">
              —
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STAGE 2: 1. Girizgah (Gözler Kapanırken)                     */}
        {/* KESİN 2 SATIR: Sessiz bir zihin, / Derin bir vizyon.        */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none will-change-transform"
          style={{
            opacity: stage2Opacity,
            transform: `translate3d(0, ${stage2TranslateY}px, 0)`,
          }}
        >
          <div className="max-w-5xl space-y-2 sm:space-y-4">
            <div className="font-instrument italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.98)] leading-[0.96] whitespace-nowrap">
              {isStage2InView && (
                <div>
                  <TextEffect
                    key={`${lang}-stage2-1`}
                    preset="fade-in-blur"
                    speedReveal={1.2}
                    speedSegment={0.6}
                  >
                    {t("hero.stage2.line1")}
                  </TextEffect>
                </div>
              )}
            </div>

            <div className="font-instrument italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.98)] leading-[0.96] whitespace-nowrap">
              {isStage2InView && (
                <div>
                  <TextEffect
                    key={`${lang}-stage2-2`}
                    preset="fade-in-blur"
                    delay={0.12}
                    speedReveal={1.2}
                    speedSegment={0.6}
                  >
                    {t("hero.stage2.line2")}
                  </TextEffect>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STAGE 3: 2. Girizgah (Matrix Kod Akışı)                      */}
        {/* KESİN 2 SATIR: KODA DÖKÜLEN, / OTONOM GELECEK.             */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none will-change-transform"
          style={{
            opacity: stage3Opacity,
            transform: `translate3d(0, ${stage3TranslateY}px, 0)`,
          }}
        >
          <div className="max-w-5xl space-y-2 sm:space-y-4">
            <div className="font-archivo font-[800] uppercase tracking-[-0.03em] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.4rem] text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.98)] leading-[0.94] whitespace-nowrap">
              {isStage3InView && (
                <div>
                  <TextEffect
                    key={`${lang}-stage3-1`}
                    preset="fade-in-blur"
                    speedReveal={1.2}
                    speedSegment={0.6}
                  >
                    {t("hero.stage3.line1")}
                  </TextEffect>
                </div>
              )}
            </div>

            <div className="font-archivo font-[800] uppercase tracking-[-0.03em] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.4rem] text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.98)] leading-[0.94] whitespace-nowrap">
              {isStage3InView && (
                <div>
                  <TextEffect
                    key={`${lang}-stage3-2`}
                    preset="fade-in-blur"
                    delay={0.12}
                    speedReveal={1.2}
                    speedSegment={0.6}
                  >
                    {t("hero.stage3.line2")}
                  </TextEffect>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
