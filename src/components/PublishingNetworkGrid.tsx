"use client";

import { ArrowUpRight, Flame, Rss, Sparkles } from "lucide-react";
import { PUBLISHING_CHANNELS, type PublishingChannel } from "@/data/publishingChannels";
import {
  ApostoIcon,
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
      return <DevtoIcon className="w-4 h-4 shrink-0" />;
    case "hashnode":
      return <HashnodeIcon className="w-4 h-4 shrink-0 text-blue-400 group-hover/item:text-current transition-colors" />;
    case "medium":
      return <MediumIcon className="w-4 h-4 shrink-0" />;
    case "dailydev":
      return <Sparkles className="w-4 h-4 shrink-0 text-purple-400 group-hover/item:text-current transition-colors" />;
    case "indiehackers":
      return <IndieHackersIcon className="w-4 h-4 shrink-0 text-sky-400 group-hover/item:text-current transition-colors" />;
    case "hackernews":
      return <Flame className="w-4 h-4 shrink-0 text-orange-400 group-hover/item:text-current transition-colors" />;
    case "aposto":
      return <ApostoIcon className="w-4 h-4 shrink-0 text-rose-400 group-hover/item:text-current transition-colors" />;
    case "linkedin":
      return <LinkedinIcon className="w-4 h-4 shrink-0 text-blue-400 group-hover/item:text-current transition-colors" />;
    case "x":
      return <TwitterXIcon className="w-3.5 h-3.5 shrink-0" />;
    case "reddit":
      return <RedditIcon className="w-4 h-4 shrink-0 text-orange-500 group-hover/item:text-current transition-colors" />;
    case "bluesky":
      return <BlueskyIcon className="w-4 h-4 shrink-0 text-cyan-400 group-hover/item:text-current transition-colors" />;
    case "rss":
      return <Rss className="w-4 h-4 shrink-0 text-amber-400 group-hover/item:text-current transition-colors" />;
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

  return (
    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 w-full">
      {PUBLISHING_CHANNELS.map((channel) => {
        const href =
          channel.id === "rss" && rssHref ? rssHref : channel.href;
        const focus = isTr ? channel.focusTr : channel.focusEn;

        return (
          <a
            key={channel.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={channel.label}
            className="group/item relative flex flex-col justify-between gap-2.5 p-3.5 rounded-2xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 overflow-hidden active:scale-[0.99]"
          >
            {/* Subtle brand ambient glow on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${channel.glow} opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />

            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0 group-hover/item:border-white/25 transition-colors">
                  {renderChannelIcon(channel.id)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-archivo font-bold tracking-tight text-white truncate">
                      {channel.label}
                    </span>
                    <span className="px-1.5 py-0.5 text-[8px] font-mono tracking-widest uppercase rounded bg-white/[0.07] text-zinc-400 border border-white/10 shrink-0">
                      {channel.badge}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                    {channel.handle}
                  </p>
                </div>
              </div>

              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/item:text-white group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0" />
            </div>

            <p className="relative z-10 text-[11px] font-sans text-zinc-400/90 group-hover/item:text-zinc-200 transition-colors line-clamp-1">
              {focus}
            </p>
          </a>
        );
      })}
    </div>
  );
}
