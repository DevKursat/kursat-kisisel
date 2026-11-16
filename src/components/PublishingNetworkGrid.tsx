"use client";

import { ArrowUpRight, Flame, Rss, Sparkles } from "lucide-react";
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
    case "devto":
      return <DevtoIcon className="w-4 h-4 shrink-0 text-zinc-200" />;
    case "hashnode":
      return <HashnodeIcon className="w-4 h-4 shrink-0 text-blue-400/90" />;
    case "medium":
      return <MediumIcon className="w-4 h-4 shrink-0 text-zinc-200" />;
    case "dailydev":
      return <Sparkles className="w-4 h-4 shrink-0 text-purple-400/90" />;
    case "indiehackers":
      return <IndieHackersIcon className="w-4 h-4 shrink-0 text-sky-400/90" />;
    case "hackernews":
      return <Flame className="w-4 h-4 shrink-0 text-orange-400/90" />;
    case "linkedin":
      return <LinkedinIcon className="w-4 h-4 shrink-0 text-blue-400" />;
    case "x":
      return <TwitterXIcon className="w-3.5 h-3.5 shrink-0 text-zinc-200" />;
    case "reddit":
      return <RedditIcon className="w-4 h-4 shrink-0 text-orange-500/90" />;
    case "bluesky":
      return <BlueskyIcon className="w-4 h-4 shrink-0 text-cyan-400/90" />;
    case "rss":
      return <Rss className="w-4 h-4 shrink-0 text-amber-400/90" />;
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

  const flagship = PUBLISHING_CHANNELS.find((c) => c.id === "linkedin");
  const rss = PUBLISHING_CHANNELS.find((c) => c.id === "rss");
  const platforms = PUBLISHING_CHANNELS.filter(
    (c) => c.id !== "linkedin" && c.id !== "rss"
  );

  return (
    <div className="relative z-10 flex flex-col gap-3 w-full">
      {/* Flagship channel: LinkedIn */}
      {flagship && (
        <a
          href={flagship.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={flagship.label}
          className="group/item flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-white/[0.09] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.2] transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
              {renderChannelIcon(flagship.id)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium tracking-tight text-white">
                  {flagship.label}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {flagship.handle}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isTr ? flagship.focusTr : flagship.focusEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">
              {flagship.badge}
            </span>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover/item:text-white group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-[color,transform] duration-200" />
          </div>
        </a>
      )}

      {/* 3x3 Platform Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {platforms.map((channel) => {
          const focus = isTr ? channel.focusTr : channel.focusEn;

          return (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={channel.label}
              className="group/item flex flex-col justify-between gap-3 p-4 rounded-xl border border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.045] hover:border-white/[0.16] transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                    {renderChannelIcon(channel.id)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium tracking-tight text-zinc-100 group-hover/item:text-white transition-colors">
                      {channel.label}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500 truncate mt-0.5">
                      {channel.handle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                  <span className="text-[10px] font-mono text-zinc-500">
                    {channel.badge}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover/item:text-zinc-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-[color,transform] duration-200" />
                </div>
              </div>

              <p className="text-xs text-zinc-400 group-hover/item:text-zinc-300 transition-colors leading-relaxed">
                {focus}
              </p>
            </a>
          );
        })}
      </div>

      {/* RSS Syndication Bar */}
      {rss && (
        <a
          href={rssHref || rss.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={rss.label}
          className="group/item flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-dashed border-white/[0.1] bg-transparent hover:bg-white/[0.03] hover:border-white/[0.2] transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0">
              {renderChannelIcon(rss.id)}
            </div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 min-w-0">
              <span className="text-xs font-medium text-zinc-200">
                {rss.label}
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                {rss.handle}
              </span>
              <span className="hidden sm:inline text-zinc-700">·</span>
              <span className="text-xs text-zinc-400">
                {isTr ? rss.focusTr : rss.focusEn}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500">
              {rss.badge}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/item:text-white group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-[color,transform] duration-200" />
          </div>
        </a>
      )}
    </div>
  );
}
