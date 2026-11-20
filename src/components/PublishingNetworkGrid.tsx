"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Flame,
  Handshake,
  Rss,
  Sparkles,
} from "lucide-react";
import { PUBLISHING_CHANNELS, type PublishingChannel } from "@/data/publishingChannels";
import {
  BlueskyIcon,
  DevtoIcon,
  HashnodeIcon,
  IndieHackersIcon,
  LinkedinIcon,
  MediumIcon,
  RedditIcon,
  TwitterXIcon,
} from "./Icons";

function renderChannelIcon(id: PublishingChannel["id"]) {
  switch (id) {
    case "linkedin":
      return <LinkedinIcon className="w-4 h-4 shrink-0 text-blue-400" />;
    case "x":
      return <TwitterXIcon className="w-3.5 h-3.5 shrink-0 text-zinc-200" />;
    case "devto":
      return <DevtoIcon className="w-4 h-4 shrink-0 text-zinc-200" />;
    case "reddit":
      return <RedditIcon className="w-4 h-4 shrink-0 text-orange-400/90" />;
    case "hackernews":
      return <Flame className="w-4 h-4 shrink-0 text-orange-400/90" />;
    case "medium":
      return <MediumIcon className="w-4 h-4 shrink-0 text-zinc-200" />;
    case "hashnode":
      return <HashnodeIcon className="w-4 h-4 shrink-0 text-blue-400/90" />;
    case "dailydev":
      return <Sparkles className="w-4 h-4 shrink-0 text-zinc-200" />;
    case "indiehackers":
      return <IndieHackersIcon className="w-4 h-4 shrink-0 text-sky-400/90" />;
    case "bluesky":
      return <BlueskyIcon className="w-4 h-4 shrink-0 text-cyan-400/90" />;
    case "rss":
      return <Rss className="w-4 h-4 shrink-0 text-zinc-300" />;
  }
}

export default function PublishingNetworkGrid({
  lang = "tr",
  rssHref,
}: {
  lang?: string;
  rssHref?: string;
}) {
  const isTr = lang === "tr";
  const stripRef = useRef<HTMLDivElement>(null);
  const [copiedRss, setCopiedRss] = useState(false);

  const orderedPlatforms = PUBLISHING_CHANNELS.filter((c) => c.id !== "rss");
  const rss = PUBLISHING_CHANNELS.find((c) => c.id === "rss");
  const resolvedRssHref = rssHref || rss?.href || "/rss.xml";

  const scrollStrip = (direction: -1 | 1) => {
    stripRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  const handleCopyRss = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const fullUrl =
        typeof window !== "undefined"
          ? new URL(resolvedRssHref, window.location.origin).toString()
          : resolvedRssHref;
      await navigator.clipboard.writeText(fullUrl);
      setCopiedRss(true);
      setTimeout(() => setCopiedRss(false), 1800);
    } catch {
      // Ignore if clipboard is unavailable
    }
  };

  return (
    <div className="relative z-10 flex flex-col gap-3 w-full">
      {/* Top Flagship Card: Sponsorship & Media Kit (replaces LinkedIn top slot) */}
      <Link
        href="/sponsor"
        className="group/item flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.24] transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
            <Handshake className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
              <span className="text-sm font-medium tracking-tight text-white">
                {isTr ? "Sponsorluk & Media Kit" : "Sponsor & Media Kit"}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                kursat.itibar.app/sponsor
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
              {isTr
                ? "127.4K+ Zirve Erişim · B2B Mühendislik Otopsileri, Benchmark & API/GPU Ar-Ge Partnerliği"
                : "127.4K+ Peak Reach · B2B Engineering Teardowns, Benchmarks & API/GPU R&D Partnerships"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
          <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 tabular-nums">
            {isTr ? "127.4K+ ERİŞİM" : "127.4K+ REACH"}
          </span>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover/item:text-white group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-[color,transform] duration-200" />
        </div>
      </Link>

      {/* Horizontal Scroll Row of Platform Cards Ordered Highest Engagement First */}
      <div className="relative flex items-center gap-2 w-full">
        <div
          ref={stripRef}
          className="flex-1 min-w-0 flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5 pr-6"
        >
          {orderedPlatforms.map((channel) => {
            const focus = isTr ? channel.focusTr : channel.focusEn;

            return (
              <a
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={channel.label}
                className="group/item w-[270px] sm:w-[300px] shrink-0 snap-start flex flex-col justify-between gap-2.5 px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.18] transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                      {renderChannelIcon(channel.id)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium tracking-tight text-white truncate">
                        {channel.label}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500 truncate">
                        {channel.handle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {channel.badge}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/item:text-white group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-[color,transform] duration-200" />
                  </div>
                </div>

                <p className="text-xs text-zinc-400 group-hover/item:text-zinc-300 transition-colors leading-relaxed line-clamp-2">
                  {focus}
                </p>
              </a>
            );
          })}

          {/* RSS Card at end of horizontal strip */}
          {rss && (
            <a
              href={resolvedRssHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={rss.label}
              className="group/item w-[270px] sm:w-[300px] shrink-0 snap-start flex flex-col justify-between gap-2.5 px-4 py-3.5 rounded-xl border border-dashed border-white/[0.14] bg-transparent hover:bg-white/[0.03] hover:border-white/[0.24] transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                    {renderChannelIcon(rss.id)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium tracking-tight text-zinc-200 truncate">
                      {rss.label}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500 truncate">
                      {rss.handle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyRss}
                    title={isTr ? "RSS bağlantısını kopyala" : "Copy RSS URL"}
                    aria-label={isTr ? "RSS bağlantısını kopyala" : "Copy RSS URL"}
                    className="w-7 h-7 rounded-md border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedRss ? (
                      <Check className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/item:text-white transition-colors" />
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                {isTr ? rss.focusTr : rss.focusEn}
              </p>
            </a>
          )}
        </div>

        {/* Left / Right Horizontal Scroll Controls */}
        <div className="hidden sm:flex flex-col gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => scrollStrip(-1)}
            aria-label={isTr ? "Sola kaydır" : "Scroll left"}
            className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/[0.18] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollStrip(1)}
            aria-label={isTr ? "Sağa kaydır" : "Scroll right"}
            className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/[0.18] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
