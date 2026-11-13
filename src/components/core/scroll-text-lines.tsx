"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface MarqueeRowProps {
  phrases: string[];
  direction?: "left" | "right";
  duration?: number;
}

function MarqueeRow({
  phrases,
  direction = "left",
  duration = 32,
}: MarqueeRowProps) {
  // 4 özdeş kopya render edilir; geniş ekranlarda bile asla boşluk oluşmaz.
  // Container genişliğinin %25'i tam 1 kopya uzunluğudur.
  // 0 -> -25% (veya -25% -> 0) kayması, piksel düzeyinde kusursuz ve sıfır atlamalı sonsuz döngü üretir.
  const copies = [0, 1, 2, 3];

  return (
    <div className="relative w-full overflow-hidden whitespace-nowrap py-1 sm:py-2 select-none flex">
      {/* İki uçta tatlı karanlık yumuşatma (vignette) */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-44 z-10 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-44 z-10 bg-gradient-to-l from-black via-black/80 to-transparent" />

      <motion.div
        className="flex items-center gap-10 sm:gap-16 w-max shrink-0 will-change-transform"
        animate={{
          x: direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        }}
      >
        {copies.map((copyIdx) => (
          <div
            key={copyIdx}
            className="flex items-center gap-10 sm:gap-16 shrink-0"
          >
            {phrases.map((phrase, idx) => {
              const isOutlined = (idx + copyIdx) % 2 === 1;
              return (
                <div key={idx} className="flex items-center gap-10 sm:gap-16">
                  <span
                    className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none transition-colors duration-300 ${
                      isOutlined
                        ? "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.22)] hover:[-webkit-text-stroke:1.5px_rgba(52,211,153,0.7)]"
                        : "text-white/95 hover:text-white"
                    }`}
                  >
                    {phrase}
                  </span>
                  <span className="text-emerald-400 text-2xl sm:text-4xl select-none opacity-80">
                    ✦
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollTextLines() {
  const { lang } = useLanguage();

  const line1Phrases =
    lang === "tr"
      ? [
          "OTONOM AI MİMARİSİ",
          "SIFIR GECİKME & YÜKSEK ETKİ",
          "FİKİRDEN CANLI ÜRÜNE",
          "BİLİŞSEL AJAN SİSTEMLERİ",
        ]
      : [
          "AUTONOMOUS AI ARCHITECTURE",
          "ZERO LATENCY & HIGH IMPACT",
          "VISION TO PRODUCTION",
          "COGNITIVE AGENT SYSTEMS",
        ];

  const line2Phrases =
    lang === "tr"
      ? [
          "DERİN MÜHENDİSLİK",
          "SEZGİSEL KULLANICI DENEYİMİ",
          "AKILLI İŞ AKIŞLARI",
          "ÖLÇEKLENEBİLİR GELECEK",
        ]
      : [
          "DEEP ENGINEERING",
          "INTUITIVE USER EXPERIENCE",
          "AUTONOMOUS WORKFLOWS",
          "SCALE AT INFINITY",
        ];

  return (
    <section className="relative py-8 sm:py-12 bg-black overflow-hidden border-y border-white/10">
      {/* Arka plan hafif zümrüt aurası */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.035),transparent_70%)]" />

      <div className="space-y-2 sm:space-y-4">
        {/* Satır 1: Sola Akış */}
        <MarqueeRow phrases={line1Phrases} direction="left" duration={30} />

        {/* Satır 2: Sağa Akış */}
        <MarqueeRow phrases={line2Phrases} direction="right" duration={34} />
      </div>
    </section>
  );
}
