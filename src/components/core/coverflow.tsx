"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, BookOpen, Plus, Sparkles } from "lucide-react";
import { LinkedinIcon, TwitterXIcon, DevtoIcon } from "@/components/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { ProgressiveBlur } from "./progressive-blur";
import { Spotlight } from "./spotlight";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "./morphing-dialog";

export interface CoverflowEssay {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  metrics: { label: string; val: string }[];
  content: string[];
  links: {
    linkedin?: string;
    twitter?: string;
    devto?: string;
  };
}

interface CoverflowProps {
  items: CoverflowEssay[];
}

export function CoverflowGallery({ items }: CoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { lang, t } = useLanguage();
  const total = items.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === total - 1 ? 0 : current + 1));
  };

  const goToLatest = () => {
    setActiveIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Minimal Top Control Strip: Sol tarafta temiz "Tüm Arşivi İncele" (sayısız), sağ tarafta 3 eşit dairesel buton */}
      <div className="w-full flex items-center justify-between gap-4 mb-4 pt-1 pb-3 border-b border-white/10">
        {/* SOL: Sayısız ve Sade "Tüm Arşivi İncele" bağlantısı */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white hover:text-black text-xs font-mono text-zinc-300 hover:border-white transition-all group shrink-0"
        >
          <span>{lang === "tr" ? "Tüm Arşivi İncele" : "View All"}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black transition-colors" />
        </Link>

        {/* SAĞ: Oklarla birebir aynı boyutta yuvarlak [En Güncel İkonu] + [< Geri] + [> İleri] */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Oklarla aynı boyutta yuvarlak "En Güncel" butonu (Metinsiz, zarif ikonlu) */}
          <button
            type="button"
            onClick={goToLatest}
            title={lang === "tr" ? "En Güncel Yazıya Git" : "Jump to Latest"}
            aria-label={lang === "tr" ? "En Güncel Yazıya Git" : "Jump to Latest"}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
              activeIndex === 0
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                : "border-white/15 bg-white/5 text-zinc-400 hover:text-white hover:border-white/25"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Geri Oku */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous article"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-zinc-300 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* İleri Oku */}
          <button
            type="button"
            onClick={next}
            aria-label="Next article"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-zinc-300 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pure 3D Coverflow Stage */}
      <div
        className="relative w-full h-[530px] sm:h-[570px] flex items-center justify-center overflow-hidden touch-pan-y"
        style={{
          perspective: isMobile ? "900px" : "1300px",
        }}
      >
        {/* Interactive Drag Layer with Framer Motion spring physics */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x > 50 || info.velocity.x > 250) {
              prev();
            } else if (info.offset.x < -50 || info.velocity.x < -250) {
              next();
            }
          }}
          className="relative w-full max-w-[320px] sm:max-w-[370px] h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => {
            let offset = index - activeIndex;

            // Circular shortest path wrap-around for infinite carousel
            const half = Math.floor(total / 2);
            if (offset > half) offset -= total;
            if (offset < -half) offset += total;

            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            let x = 0;
            let z = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let filter = "brightness(100%)";

            if (isActive) {
              x = 0;
              z = 40;
              rotateY = 0;
              scale = 1;
              opacity = 1;
              filter = "brightness(100%)";
            } else if (offset > 0) {
              // Right side cards receding and angled inward
              const stepX = isMobile ? 120 : 185;
              const stepZ = isMobile ? -140 : -160;
              x = stepX + (absOffset - 1) * (isMobile ? 80 : 120);
              z = stepZ * absOffset;
              rotateY = isMobile ? -32 : -38 - absOffset * 3;
              scale = Math.max(0.65, 1 - absOffset * (isMobile ? 0.12 : 0.09));
              opacity = absOffset > 3 ? 0 : Math.max(0.15, 1 - absOffset * 0.28);
              filter = `brightness(${Math.max(40, 100 - absOffset * 24)}%)`;
            } else {
              // Left side cards receding and angled inward
              const stepX = isMobile ? -120 : -185;
              const stepZ = isMobile ? -140 : -160;
              x = stepX - (absOffset - 1) * (isMobile ? 80 : 120);
              z = stepZ * absOffset;
              rotateY = isMobile ? 32 : 38 + absOffset * 3;
              scale = Math.max(0.65, 1 - absOffset * (isMobile ? 0.12 : 0.09));
              opacity = absOffset > 3 ? 0 : Math.max(0.15, 1 - absOffset * 0.28);
              filter = `brightness(${Math.max(40, 100 - absOffset * 24)}%)`;
            }

            if (absOffset > (isMobile ? 2 : 3)) {
              opacity = 0;
            }

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  x,
                  z,
                  rotateY,
                  scale,
                  opacity,
                  filter,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  mass: 0.8,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: 50 - absOffset,
                  pointerEvents: opacity === 0 ? "none" : "auto",
                }}
                className="absolute w-full h-[470px] sm:h-[490px]"
              >
                <CardItem
                  item={item}
                  isActive={isActive}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination Dot Track for Touch & Visual Scannability */}
      <div className="flex items-center gap-2 mt-4 sm:mt-5">
        {items.map((_, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                isCurrent
                  ? "w-8 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CardItemProps {
  item: CoverflowEssay;
  isActive: boolean;
  onClick: () => void;
}

function CardItem({ item, isActive, onClick }: CardItemProps) {
  const { lang, t } = useLanguage();

  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.28,
      }}
    >
      <div
        onClick={onClick}
        className={`flex flex-col h-full rounded-3xl border transition-all duration-300 p-4 sm:p-5 relative overflow-hidden group ${
          isActive
            ? "border-white/25 bg-[#0e0e11] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]"
            : "border-white/10 bg-[#09090b] shadow-lg opacity-90"
        }`}
      >
        <Spotlight size={360} />

        {/* Visual Header Trigger */}
        <MorphingDialogTrigger className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 block select-none mb-3">
          <MorphingDialogImage
            src={item.imageUrl}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Progressive Blur over lower 58% */}
          <ProgressiveBlur
            className="pointer-events-none absolute bottom-0 left-0 h-[58%] w-full"
            blurIntensity={7}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

          {/* Floating Expand Icon */}
          <div className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:border-white/30 transition-all">
            <Plus className="w-3.5 h-3.5" />
          </div>

          {/* Tag Pill in Top-Left */}
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
            {item.tag}
          </div>

          {/* Overlaid Meta */}
          <div className="absolute bottom-0 left-0 p-3 sm:p-4 w-full z-10">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <span>{item.date}</span>
              <span>•</span>
              <span>{item.readTime}</span>
            </div>
          </div>
        </MorphingDialogTrigger>

        {/* Article Title & Excerpt */}
        <div className="flex-1 flex flex-col justify-start">
          <h3 className="font-archivo font-[800] text-base sm:text-lg text-white tracking-tight line-clamp-2 leading-snug group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed font-normal mt-1.5 line-clamp-2">
            {item.excerpt}
          </p>
        </div>

        {/* Metrics Telemetry Strip */}
        <div className="pt-2.5 pb-2.5 px-1 my-2 border-t border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div>
            <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">
              {item.metrics[0].label}
            </span>
            <span className="text-white font-semibold">
              {item.metrics[0].val}
            </span>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div>
            <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">
              {item.metrics[1].label}
            </span>
            <span className="text-white font-semibold">
              {item.metrics[1].val}
            </span>
          </div>
        </div>

        {/* Bottom Bar: Direct Read Button + Social Syndication */}
        <div className="pt-2 flex items-center justify-between gap-2 mt-auto">
          {/* Read Modal Trigger Button */}
          <MorphingDialogTrigger className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-medium text-white transition-all shrink-0">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t("blog.read")}</span>
            <ArrowUpRight className="w-3 h-3" />
          </MorphingDialogTrigger>

          {/* Social Syndication Icons */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5"
          >
            {item.links.linkedin && (
              <a
                href={item.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black text-zinc-400 hover:border-white transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-3 h-3" />
              </a>
            )}
            {item.links.twitter && (
              <a
                href={item.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black text-zinc-400 hover:border-white transition-colors"
                title="X / Twitter"
              >
                <TwitterXIcon className="w-3 h-3" />
              </a>
            )}
            {item.links.devto && (
              <a
                href={item.links.devto}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black text-zinc-400 hover:border-white transition-colors"
                title="Dev.to"
              >
                <DevtoIcon className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Morphing Modal Expansion View */}
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{ borderRadius: "24px" }}
          className="pointer-events-auto relative flex h-auto max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto border border-white/15 bg-[#0c0c0e] text-white shadow-2xl"
        >
          <MorphingDialogClose />

          <div className="relative w-full aspect-video overflow-hidden bg-black shrink-0">
            <MorphingDialogImage
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
                <span>{item.tag}</span>
                <span>•</span>
                <span>{item.date}</span>
                <span>•</span>
                <span>{item.readTime}</span>
              </div>
              <MorphingDialogTitle className="font-archivo font-[800] text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                {item.title}
              </MorphingDialogTitle>
            </div>

            <MorphingDialogDescription>
              <div className="space-y-4 text-zinc-300 text-base leading-relaxed font-normal">
                {item.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Kürşat Yılmaz — Mimari Notlar</span>
                <span>© 2026</span>
              </div>
            </MorphingDialogDescription>
          </div>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
