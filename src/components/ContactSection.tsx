"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Send, ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { TextEffect } from "./core/text-effect";
import TypeformContactModal from "./TypeformContactModal";
import { LinkedinIcon, InstagramIcon, DevtoIcon, GithubIcon, CvIcon, WhatsappIcon } from "./Icons";

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const totalFrames = 239;

  // High-DPR High-Quality Canvas Drawing
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

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

  // Preload all 239 frames from /contact-frames/
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    const padZero = (n: number) => n.toString().padStart(4, "0");

    const firstImg = new Image();
    firstImg.src = "/contact-frames/frame_0001.jpg";
    firstImg.onload = () => {
      if (isCancelled) return;
      images[0] = firstImg;
      drawFrame(0);
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/contact-frames/frame_${padZero(i)}.jpg`;
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

  // Window resize handler (Retina DPR support)
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

  // Scroll tracking and smooth LERP
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

      const target = p * (totalFrames - 1);
      targetFrameRef.current = target;
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

  const copyEmail = () => {
    navigator.clipboard.writeText("kursat@itibar.app");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  // Stage 1: Göz göze gelen / sessiz bir güven (progress 0.02 -> 0.34)
  let stage1Opacity = 0;
  let stage1TranslateY = 30;
  if (progress >= 0.02 && progress <= 0.34) {
    if (progress < 0.16) {
      const tProgress = (progress - 0.02) / (0.16 - 0.02);
      stage1Opacity = tProgress;
      stage1TranslateY = 30 * (1 - tProgress);
    } else {
      const tProgress = (progress - 0.16) / (0.34 - 0.16);
      stage1Opacity = 1 - tProgress;
      stage1TranslateY = -tProgress * 100;
    }
  }

  // Stage 2: Fikirler gerçeğe / birlikte geleceğe (progress 0.36 -> 0.66)
  let stage2Opacity = 0;
  let stage2TranslateY = 30;
  if (progress >= 0.36 && progress <= 0.66) {
    if (progress < 0.49) {
      const tProgress = (progress - 0.36) / (0.49 - 0.36);
      stage2Opacity = tProgress;
      stage2TranslateY = 30 * (1 - tProgress);
    } else {
      const tProgress = (progress - 0.49) / (0.66 - 0.49);
      stage2Opacity = 1 - tProgress;
      stage2TranslateY = -tProgress * 100;
    }
  }

  // Stage 3: The Warm Smile Finale (progress 0.68 -> 1.0)
  let stage3Opacity = 0;
  let stage3TranslateY = 40;
  if (progress >= 0.68) {
    const tProgress = Math.min(1, (progress - 0.68) / 0.22);
    stage3Opacity = tProgress;
    stage3TranslateY = 40 * (1 - tProgress);
  }

  const isStage1InView = progress >= 0.03 && progress <= 0.33;
  const isStage2InView = progress >= 0.37 && progress <= 0.65;
  const isStage3InView = progress >= 0.68;

  return (
    <div
      ref={containerRef}
      id="contact"
      className="relative z-30 w-full h-[360vh] bg-[#000000]"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center">
        {/* Fullscreen Video Canvas (Scrubbed with Scroll) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/35 to-black/45" />

        {/* ============================================================ */}
        {/* STAGE 1: GİRİŞ VİDEOSUYLA AYNI TARZ VE ANITSAL TİPOGRAFİ     */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none will-change-transform"
          style={{
            opacity: stage1Opacity,
            transform: `translate3d(0, ${stage1TranslateY}px, 0)`,
            display: isStage1InView ? "flex" : "none",
          }}
        >
          <div className="max-w-5xl space-y-2 sm:space-y-4">
            <div className="font-archivo font-[800] uppercase tracking-[-0.03em] text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.98)] leading-[0.94] whitespace-nowrap">
              {isStage1InView && (
                <TextEffect
                  key={`${lang}-contact-stage1-1`}
                  preset="fade-in-blur"
                  speedReveal={1.2}
                  speedSegment={0.6}
                >
                  {t("contact.stage1.line1")}
                </TextEffect>
              )}
            </div>

            <div className="font-instrument italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.98)] leading-[0.96] whitespace-nowrap">
              {isStage1InView && (
                <TextEffect
                  key={`${lang}-contact-stage1-2`}
                  preset="fade-in-blur"
                  delay={0.12}
                  speedReveal={1.2}
                  speedSegment={0.6}
                >
                  {t("contact.stage1.line2")}
                </TextEffect>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STAGE 2: 2. GİRİZGAH — FİKİRLER GERÇEĞE, BİRLİKTE GELECEĞE   */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none will-change-transform"
          style={{
            opacity: stage2Opacity,
            transform: `translate3d(0, ${stage2TranslateY}px, 0)`,
            display: isStage2InView ? "flex" : "none",
          }}
        >
          <div className="max-w-5xl space-y-2 sm:space-y-4">
            <div className="font-archivo font-[800] uppercase tracking-[-0.03em] text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.98)] leading-[0.94] whitespace-nowrap">
              {isStage2InView && (
                <TextEffect
                  key={`${lang}-contact-stage2-1`}
                  preset="fade-in-blur"
                  speedReveal={1.2}
                  speedSegment={0.6}
                >
                  {t("contact.stage2.line1")}
                </TextEffect>
              )}
            </div>

            <div className="font-instrument italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_15px_50px_rgba(0,0,0,0.98)] leading-[0.96] whitespace-nowrap">
              {isStage2InView && (
                <TextEffect
                  key={`${lang}-contact-stage2-2`}
                  preset="fade-in-blur"
                  delay={0.12}
                  speedReveal={1.2}
                  speedSegment={0.6}
                >
                  {t("contact.stage2.line2")}
                </TextEffect>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STAGE 3: UÇAN SOSYAL MEDYA LOGOLARI (MASAÜSTÜNDE YANLARDA)    */}
        {/* MOBİLDE YÜZÜ BOŞ BIRAKMAK İÇİN ALTTAKİ DOCK'A TAŞINIR         */}
        {/* ============================================================ */}
        {isStage3InView && (
          <>
            {/* SOL BOŞLUK: LINKEDIN, GITHUB & CV (SADECE MASAÜSTÜ/TABLET) */}
            <div
              className="hidden sm:flex absolute left-8 md:left-14 lg:left-24 top-[26%] sm:top-[28%] z-20 flex-col gap-3.5 sm:gap-4 pointer-events-auto will-change-transform"
              style={{ opacity: stage3Opacity }}
            >
              {/* LinkedIn Pure Logo Orb */}
              <motion.a
                href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ y: [0, -8, 0], rotate: [0, -1.2, 0] }}
                transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut" }}
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/70 backdrop-blur-2xl text-zinc-300 hover:text-black hover:bg-white hover:border-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.85)] group select-none"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5 text-zinc-300 group-hover:text-black transition-colors" />
              </motion.a>

              {/* GitHub Pure Logo Orb */}
              <motion.a
                href="https://github.com/devkursat"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                transition={{ repeat: Infinity, duration: 5.0, delay: 0.5, ease: "easeInOut" }}
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/70 backdrop-blur-2xl text-zinc-300 hover:text-black hover:bg-white hover:border-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.85)] group select-none"
                title="GitHub"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5.5 h-5.5 text-zinc-300 group-hover:text-black transition-colors" />
              </motion.a>

              {/* CV / Resume Pure Logo Orb */}
              <motion.a
                href="/Kursat_Yilmaz_CV_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ y: [0, -8, 0], rotate: [0, -1, 0] }}
                transition={{ repeat: Infinity, duration: 4.6, delay: 0.9, ease: "easeInOut" }}
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/70 backdrop-blur-2xl text-zinc-300 hover:text-black hover:bg-white hover:border-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.85)] group select-none"
                title="Özgeçmiş / CV (PDF)"
                aria-label="CV"
              >
                <CvIcon className="w-5 h-5 text-zinc-300 group-hover:text-black transition-colors" />
              </motion.a>
            </div>

            {/* SAĞ BOŞLUK: INSTAGRAM, DEV.TO & E-POSTA (SADECE MASAÜSTÜ/TABLET) */}
            <div
              className="hidden sm:flex absolute right-8 md:right-14 lg:right-24 top-[26%] sm:top-[28%] z-20 flex-col gap-3.5 sm:gap-4 items-end pointer-events-auto will-change-transform"
              style={{ opacity: stage3Opacity }}
            >
              {/* Instagram Pure Logo Orb */}
              <motion.a
                href="https://instagram.com/kursat.yz"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ y: [0, -9, 0], rotate: [0, 1.2, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, delay: 0.3, ease: "easeInOut" }}
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/70 backdrop-blur-2xl text-zinc-300 hover:text-black hover:bg-white hover:border-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.85)] group select-none"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5 text-zinc-300 group-hover:text-black transition-colors" />
              </motion.a>

              {/* Dev.to Pure Logo Orb */}
              <motion.a
                href="https://dev.to/devkursat"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ y: [0, -11, 0], rotate: [0, -1.5, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, delay: 0.7, ease: "easeInOut" }}
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/70 backdrop-blur-2xl text-zinc-300 hover:text-black hover:bg-white hover:border-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.85)] group select-none"
                title="Dev.to"
                aria-label="Dev.to"
              >
                <DevtoIcon className="w-5 h-5 text-zinc-300 group-hover:text-black transition-colors" />
              </motion.a>

              {/* Quick Email Copy Pure Logo Orb */}
              <motion.button
                type="button"
                onClick={copyEmail}
                animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 5.4, delay: 1.1, ease: "easeInOut" }}
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/70 backdrop-blur-2xl text-zinc-300 hover:text-black hover:bg-white hover:border-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.85)] group select-none"
                title={copiedEmail ? t("contact.copied") : "kursat@itibar.app"}
                aria-label="E-posta"
              >
                {copiedEmail ? (
                  <Check className="w-5 h-5 text-emerald-400 group-hover:text-emerald-700 transition-colors" />
                ) : (
                  <Mail className="w-5 h-5 text-zinc-300 group-hover:text-black transition-colors" />
                )}
              </motion.button>
            </div>
          </>
        )}

        {/* Empty top anchor */}
        <div className="relative z-10 w-full h-8" />

        {/* ============================================================ */}
        {/* STAGE 3 FINALE: TEK BUTON (MESAJ GÖNDER) & ANITSAL FOOTER     */}
        {/* ============================================================ */}
        <div
          className="relative z-30 w-full flex flex-col items-center justify-end px-4 sm:px-6 will-change-transform mt-auto"
          style={{
            opacity: stage3Opacity,
            transform: `translate3d(0, ${stage3TranslateY}px, 0)`,
            pointerEvents: progress >= 0.68 ? "auto" : "none",
          }}
        >
          {/* Giriş Videosuyla Uyumlu 2 Satır Başlık */}
          <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8 text-center">
            <div className="font-archivo font-[800] uppercase tracking-[-0.03em] text-2xl sm:text-4xl md:text-5xl text-white drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] leading-[1.05]">
              {lang === "tr" ? "Fikirlerin ötesinde," : "Beyond the concept,"}
            </div>
            <div className="font-instrument italic font-normal text-3xl sm:text-5xl md:text-6xl text-white drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] leading-[1.05]">
              {lang === "tr" ? "birlikte üretelim." : "building the leap."}
            </div>
          </div>

          {/* MESAJ GÖNDER (TYPEFORM MODAL) & SAĞINDA YUVARLAK WHATSAPP İKON BUTONU */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-4 sm:mb-8">
            <TypeformContactModal />

            {/* Sadece Yuvarlak WhatsApp İkon Butonu — Kullanıcı Adı: kursat.yz */}
            <a
              href="https://wa.me/kursat.yz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] rounded-full border border-white/25 hover:border-emerald-500/60 bg-black/70 hover:bg-emerald-950/30 backdrop-blur-2xl text-emerald-400 hover:text-emerald-300 transition-all shadow-[0_15px_45px_rgba(0,0,0,0.95)] active:scale-95 group select-none shrink-0"
              title="WhatsApp: @kursat.yz"
              aria-label="WhatsApp: @kursat.yz"
            >
              <WhatsappIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* MOBİL İÇİN APPLE VISIONOS YATAY CAM DOCK (YÜZÜ TAMAMEN FERAH VE SİNEMATİK BIRAKIR) */}
          <div className="flex sm:hidden items-center justify-center mb-6 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-black/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              {/* Sol 3'lü */}
              <a
                href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-black hover:bg-white transition-all active:scale-95"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/devkursat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-black hover:bg-white transition-all active:scale-95"
                title="GitHub"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="/Kursat_Yilmaz_CV_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-black hover:bg-white transition-all active:scale-95"
                title="Özgeçmiş / CV"
                aria-label="CV"
              >
                <CvIcon className="w-3.5 h-3.5" />
              </a>

              {/* İnce Ayırıcı Çizgi */}
              <div className="w-[1px] h-3.5 bg-white/20 mx-0.5" />

              {/* Sağ 3'lü */}
              <a
                href="https://instagram.com/kursat.yz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-black hover:bg-white transition-all active:scale-95"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://dev.to/devkursat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-black hover:bg-white transition-all active:scale-95"
                title="Dev.to"
                aria-label="Dev.to"
              >
                <DevtoIcon className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-black hover:bg-white transition-all active:scale-95"
                title={copiedEmail ? t("contact.copied") : "kursat@itibar.app"}
                aria-label="E-posta"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Mail className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* MONUMENTAL NAME WITH TEXTEFFECT (PER='CHAR' PRESET='FADE')   */}
          {/* "TAM ADIM UYMUYORSA KRST YLMZ YAZALIM VE BİRAZ GİRSİN ALTA"   */}
          {/* ============================================================ */}
          <div className="w-full overflow-hidden flex justify-center pointer-events-none select-none -mb-1 sm:-mb-2">
            <div className="font-archivo font-[900] text-[12vw] sm:text-[13vw] md:text-[13.5vw] tracking-[-0.03em] text-white/[0.08] leading-[0.82] uppercase whitespace-nowrap block translate-y-[8%] sm:translate-y-[10%]">
              <TextEffect per="char" preset="fade" trigger={isStage3InView}>
                KRST YLMZ
              </TextEffect>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
