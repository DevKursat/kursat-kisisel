"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedSummary, type BlogPostSummary } from "@/data/blogIndex";
import { Spotlight } from "./core/spotlight";
import { CoverflowGallery, CoverflowEssay } from "./core/coverflow";
import PublishingNetworkGrid from "./PublishingNetworkGrid";

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
        devto: "https://dev.to/kursatyz",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141416] to-[#0a0a0c] p-5 sm:p-7 flex flex-col gap-5 group hover:border-white/25 transition-all"
        >
          <Spotlight size={420} />

          <div className="relative z-10 max-w-2xl space-y-1.5">
            <h3 className="font-archivo font-[800] text-xl sm:text-2xl text-white tracking-tight">
              {t("blog.linkedin.title")}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
              {t("blog.linkedin.desc")}
            </p>
          </div>

          <PublishingNetworkGrid
            lang={lang}
            rssHref={lang === "tr" ? "/rss.xml" : `/rss.xml?lang=${lang}`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
