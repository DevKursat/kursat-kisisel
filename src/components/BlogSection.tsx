"use client";

import { useRef } from "react";
import { ArrowUpRight, Rss } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedSummary, type BlogPostSummary } from "@/data/blogIndex";
import {
  LinkedinIcon,
  TwitterXIcon,
  DevtoIcon,
  MediumIcon,
  GithubIcon,
} from "./Icons";
import { Spotlight } from "./core/spotlight";
import { CoverflowGallery, CoverflowEssay } from "./core/coverflow";

export default function BlogSection({
  summaries = [],
}: {
  summaries?: BlogPostSummary[];
}) {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  // 100+ Repodan sonra Blog sayfasının yukarı doğru yükselmesi
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 0.9], [180, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.5, 0.85, 1]);

  const essays: CoverflowEssay[] = summaries.map((rawSummary) => {
    const post = getLocalizedSummary(rawSummary, lang);
    return {
      id: post.slug,
      tag: post.tag,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      imageUrl: post.imageUrl,
      metrics: post.metrics,
      links: {
        linkedin: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
        twitter: "https://x.com/DevKursat",
        devto: "https://dev.to/devkursat",
      },
    };
  });

  return (
    <section
      ref={sectionRef}
      id="writing"
      className="relative z-20 pt-16 sm:pt-20 pb-16 bg-[#08080a] text-white rounded-t-[44px] border-t border-white/15 shadow-[0_-40px_100px_rgba(0,0,0,0.98)] overflow-hidden"
    >
      {/* 3D Elevated Motion Wrapper */}
      <motion.div
        style={{
          translateY,
          scale,
          opacity,
        }}
        className="max-w-6xl mx-auto px-4 sm:px-8 will-change-transform"
      >
        {/* Editorial Header - Exact Typography & Two-Line Rhythm Matching 'Üzerinde Çalıştıklarım' */}
        <div className="mb-6 sm:mb-8 space-y-1.5">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase font-mono">
            {t("blog.tag")}
          </p>
          <h2 className="font-archivo font-[800] text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-white leading-[1.12]">
            <span className="block whitespace-nowrap">{t("blog.titleMain")}</span>
            <span className="block whitespace-nowrap">
              <span className="font-instrument italic font-normal text-white">
                {t("blog.titleAccent")}
              </span>{" "}
              {t("blog.titleEnd")}
            </span>
          </h2>
        </div>

        {/* 3D Motion.dev Coverflow Gallery (Interactive Drag, 3D Angles & Direct Page Navigation) */}
        <div className="mb-10 sm:mb-12">
          <CoverflowGallery items={essays} />
        </div>

        {/* Social & Publishing Channels Portal */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141416] to-[#0a0a0c] p-5 sm:p-7 flex flex-col gap-5 group hover:border-white/25 transition-all">
          <Spotlight size={420} />

          <div className="relative z-10 max-w-2xl space-y-1.5">
            <h3 className="font-archivo font-[800] text-xl sm:text-2xl text-white tracking-tight">
              {t("blog.linkedin.title")}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
              {t("blog.linkedin.desc")}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 w-full">
            {[
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
                icon: <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />,
              },
              {
                label: "X",
                href: "https://x.com/DevKursat",
                icon: <TwitterXIcon className="w-3 h-3 shrink-0" />,
              },
              {
                label: "DEV.to",
                href: "https://dev.to/devkursat",
                icon: <DevtoIcon className="w-3.5 h-3.5 shrink-0" />,
              },
              {
                label: "Medium",
                href: "https://medium.com/@ykursat054",
                icon: <MediumIcon className="w-3.5 h-3.5 shrink-0" />,
              },
              {
                label: "GitHub",
                href: "https://github.com/DevKursat",
                icon: <GithubIcon className="w-3.5 h-3.5 shrink-0" />,
              },
              {
                label: "RSS",
                href: lang === "tr" ? "/rss.xml" : `/rss.xml?lang=${lang}`,
                icon: <Rss className="w-3.5 h-3.5 shrink-0" />,
              },
            ].map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={channel.label}
                className="flex h-10 px-3.5 items-center justify-between gap-2 rounded-xl border border-white/12 bg-white/[0.03] text-xs font-mono text-zinc-200 hover:bg-white hover:text-black hover:border-white transition-all group/item"
              >
                <span className="inline-flex items-center gap-2 min-w-0 truncate">
                  {channel.icon}
                  <span className="truncate">{channel.label}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover/item:opacity-100 transition-opacity shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
