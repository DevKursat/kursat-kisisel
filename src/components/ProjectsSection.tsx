"use client";

import { ArrowUpRight, Plus, ExternalLink, Globe } from "lucide-react";
import { GithubIcon } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";
import { Spotlight } from "./core/spotlight";
import { ProgressiveBlur } from "./core/progressive-blur";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "./core/morphing-dialog";

export default function ProjectsSection() {
  const { lang, t } = useLanguage();

  const projects = [
    {
      id: "itibar",
      title: t("work.proj1.title"),
      tagline: t("work.proj1.tagline"),
      category: t("work.proj1.category"),
      desc: t("work.proj1.desc"),
      image: "/projects/itibar.jpg",
      detailImage: "/projects/itibar-detail.jpg",
      liveUrl: "https://itibar.app",
      liveDisplay: "itibar.app",
      liveBtn: t("work.proj1.liveBtn"),
      metrics: [
        { label: t("work.proj1.m1Label"), val: t("work.proj1.m1Val") },
        { label: t("work.proj1.m2Label"), val: t("work.proj1.m2Val") },
        { label: t("work.proj1.m3Label"), val: t("work.proj1.m3Val") },
      ],
      details:
        lang === "tr"
          ? [
              "24+ ihlal türünü saptayan sıfır bağımlılıklı deterministik kural motoru.",
              "TCK, TTK ve platform politikalarına dayalı resmi yasal itiraz dilekçesi derleyicisi.",
              "macOS Headless Chrome ile oluşturulan ve karar verici hekime WhatsApp üzerinden iletilen yönetici PDF raporlama hattı.",
            ]
          : [
              "Zero-dependency deterministic rule engine detecting 24+ policy & statutory violation classes.",
              "Formal legal petition compiler grounded in Turkish Commercial Code (TTK) and Criminal Code (TCK).",
              "Automated macOS Headless Chrome executive PDF report generation dispatched via WhatsApp to decision makers.",
            ],
    },
    {
      id: "unutma",
      title: t("work.proj2.title"),
      tagline: t("work.proj2.tagline"),
      category: t("work.proj2.category"),
      desc: t("work.proj2.desc"),
      image: "/projects/unutma.jpg",
      detailImage: "/projects/unutma-detail.jpg",
      liveUrl: "https://unutma.itibar.app",
      liveDisplay: "unutma.app",
      liveBtn: t("work.proj2.liveBtn"),
      metrics: [
        { label: t("work.proj2.m1Label"), val: t("work.proj2.m1Val") },
        { label: t("work.proj2.m2Label"), val: t("work.proj2.m2Val") },
        { label: t("work.proj2.m3Label"), val: t("work.proj2.m3Val") },
      ],
      details:
        lang === "tr"
          ? [
              "Fildişi kâğıt, gerçek mum mühür ve PTT Taahhütlü barkod ile fiziksel mektup gönderim boru hattı.",
              "Cezaevi disiplin ve infaz mevzuatına tam uyumlu yapay zekâ mektup asistanı.",
              "81 ildeki tüm T-Tipi, F-Tipi ve Kapalı Ceza İnfaz Kurumları için otomatik cezaevi ve koğuş adresleme dizini.",
            ]
          : [
              "Physical dispatch pipeline delivering wax-sealed letters on ivory paper via certified national postal tracking.",
              "Regulatory AI assistant ensuring full compliance with prison censorship and correctional communication guidelines.",
              "Intelligent facility directory resolving ward and block codes across all 81 provinces.",
            ],
    },
  ];

  return (
    <section
      id="work"
      className="relative z-10 md:sticky md:top-0 bg-[#000000] text-white pt-16 sm:pt-20 pb-16"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Editorial Style Intro Header - Strictly 2 Lines */}
        <div className="mb-6 sm:mb-8 space-y-1.5">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase font-mono">
            {t("work.tag")}
          </p>
          <h2 className="font-archivo font-[800] text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-white leading-[1.12]">
            <span className="block whitespace-nowrap">{t("work.titleMain")}</span>
            <span className="block whitespace-nowrap">
              <span className="font-instrument italic font-normal text-white">
                {t("work.titleAccent")}
              </span>{" "}
              {t("work.titleEnd")}
            </span>
          </h2>
        </div>

        {/* 2 Flagship Projects Side-by-Side: İtibar & Unutma. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {projects.map((proj) => (
            <MorphingDialog
              key={proj.id}
              transition={{
                type: "spring",
                bounce: 0.05,
                duration: 0.28,
              }}
            >
              <div className="flex flex-col h-full rounded-3xl border border-white/10 bg-[#0c0c0e] p-4 sm:p-5 transition-all duration-300 hover:border-white/25 group relative overflow-hidden">
                <Spotlight size={360} />

                {/* Clickable Card Visual Trigger - Sleek 16/10 Proportion */}
                <MorphingDialogTrigger className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 block select-none">
                  <MorphingDialogImage
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Progressive Blur Layer over the lower 55% */}
                  <ProgressiveBlur
                    className="pointer-events-none absolute bottom-0 left-0 h-[58%] w-full"
                    blurIntensity={7}
                  />

                  {/* Dark gradient base to maintain contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                  {/* Floating Expand Pill / Icon */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:border-white/30 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </div>

                  {/* Overlaid Information on the Progressive Blur */}
                  <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full z-10 flex flex-col justify-end">
                    <MorphingDialogTitle className="font-archivo font-[800] text-xl sm:text-2xl text-white tracking-tight">
                      {proj.title}
                    </MorphingDialogTitle>
                    <p className="text-xs sm:text-[13px] text-zinc-300 line-clamp-2 mt-1 font-normal leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                </MorphingDialogTrigger>

                {/* Bottom Bar: Telemetry Metrics + Direct Live Website Link */}
                <div className="relative z-10 pt-3 px-1 mt-auto flex items-center justify-between gap-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <div>
                      <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">
                        {proj.metrics[0].label}
                      </span>
                      <span className="text-white font-semibold">
                        {proj.metrics[0].val}
                      </span>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <div>
                      <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">
                        {proj.metrics[1].label}
                      </span>
                      <span className="text-white font-semibold">
                        {proj.metrics[1].val}
                      </span>
                    </div>
                  </div>

                  {/* Direct Live Website Button */}
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-medium text-white transition-all shrink-0"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{proj.liveDisplay}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
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
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    <div>
                      <MorphingDialogTitle className="font-archivo font-[800] text-3xl sm:text-4xl text-white tracking-tight">
                        {proj.title}
                      </MorphingDialogTitle>
                      <p className="font-instrument italic text-zinc-400 text-lg mt-1">
                        &ldquo;{proj.tagline}&rdquo;
                      </p>
                    </div>

                    <MorphingDialogDescription>
                      <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
                        {proj.desc}
                      </p>

                      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                        {proj.metrics.map((m, idx) => (
                          <div key={idx}>
                            <div className="text-[11px] text-zinc-500 font-mono uppercase">
                              {m.label}
                            </div>
                            <div className="text-base font-semibold text-white mt-1 font-mono">
                              {m.val}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                        <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                          Mimari Çözüm & Canlı Altyapı
                        </h4>
                        <ul className="space-y-2 text-sm text-zinc-400">
                          {proj.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-500/70 font-mono select-none">
                                //
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-white/10">
                        <span className="text-xs text-zinc-500 font-mono">
                          Canlı Üretim Ortamı
                        </span>
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all"
                        >
                          <Globe className="w-4 h-4 text-black" />
                          <span>{proj.liveBtn}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </MorphingDialogDescription>
                  </div>
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          ))}
        </div>

        {/* 100+ GitHub Experiments Portal */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141416] to-[#0a0a0c] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 group hover:border-white/25 transition-all">
          <Spotlight size={420} />

          <div className="relative z-10 max-w-xl space-y-1">
            <h3 className="font-archivo font-[800] text-xl sm:text-2xl text-white tracking-tight">
              {t("work.archive.title")}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
              {t("work.archive.desc")}
            </p>
          </div>

          <a
            href="https://github.com/DevKursat"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-colors shrink-0"
          >
            <GithubIcon className="w-4 h-4 text-black" />
            <span>{t("work.archive.btn")}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-black" />
          </a>
        </div>
      </div>
    </section>
  );
}
