"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import {
  BLOG_LANGUAGES,
  getBlogLangMeta,
  getBlogUiCopy,
  resolveBlogLang,
  type BlogLang,
  type BlogLangMeta,
} from "@/data/blogPosts";
import { useLanguage } from "@/context/LanguageContext";

export const BLOG_LANG_STORAGE_KEY = "ky_blog_lang";

export function detectBrowserBlogLang(): BlogLang {
  if (typeof navigator === "undefined") return "en";
  const rawCandidates: string[] = [];
  if (navigator.languages && navigator.languages.length > 0) {
    rawCandidates.push(...navigator.languages);
  }
  if (navigator.language) {
    rawCandidates.push(navigator.language);
  }
  try {
    const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (intlLocale) rawCandidates.push(intlLocale);
  } catch {
    // ignore Intl locale resolution issues
  }

  for (const rawLocale of rawCandidates) {
    if (!rawLocale) continue;
    const base = rawLocale.toLowerCase().split(/[-_]/)[0] as BlogLang;
    if (BLOG_LANGUAGES.some((item) => item.code === base)) {
      return base;
    }
  }
  return "en";
}

export function resolveClientBlogLang(explicitQueryLang: string | null): BlogLang {
  const trimmed = explicitQueryLang?.trim();
  if (trimmed) {
    const resolvedQuery = resolveBlogLang(trimmed);
    if (typeof window !== "undefined") {
      localStorage.setItem(BLOG_LANG_STORAGE_KEY, resolvedQuery);
    }
    return resolvedQuery;
  }

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(BLOG_LANG_STORAGE_KEY);
    if (saved && BLOG_LANGUAGES.some((item) => item.code === saved)) {
      return saved as BlogLang;
    }
  }

  return detectBrowserBlogLang();
}

interface SlidingLanguageTrackProps {
  languages: BlogLangMeta[];
  activeLang: BlogLang;
  ariaLabel: string;
  layoutId: string;
  getHref: (code: BlogLang) => string;
  onSelect: (code: BlogLang) => void;
}

const PILL_GAP_PX = 6;

function SlidingLanguageTrack({
  languages,
  activeLang,
  ariaLabel,
  layoutId,
  getHref,
  onSelect,
}: SlidingLanguageTrackProps) {
  const trackRef = useRef<HTMLElement>(null);

  const getStepPx = useCallback(() => {
    const track = trackRef.current;
    const firstChild = track?.firstElementChild as HTMLElement | null;
    const pillWidth =
      firstChild?.offsetWidth ||
      (typeof window !== "undefined" && window.innerWidth >= 640 ? 88 : 76);
    return pillWidth + PILL_GAP_PX;
  }, []);

  // Center the active language within the 3-slot viewport whenever language changes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const activeIdx = languages.findIndex((item) => item.code === activeLang);
    if (activeIdx >= 0) {
      const targetStart = Math.max(
        0,
        Math.min(languages.length - 3, activeIdx - 1)
      );
      track.scrollTo({
        left: targetStart * getStepPx(),
        behavior: "smooth",
      });
    }
  }, [activeLang, languages, getStepPx]);

  // Translate vertical wheel over the 3-slot track into horizontal scroll without Lenis interference
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        e.stopPropagation();
        track.scrollLeft += e.deltaY;
      }
    };

    track.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      track.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const scrollBySlot = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (direction === -1 && track.scrollLeft <= 2) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }
    if (direction === 1 && track.scrollLeft >= maxScroll - 2) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    track.scrollBy({
      left: direction * getStepPx(),
      behavior: "smooth",
    });
  };

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-[#0a0a0e]/90 backdrop-blur-xl p-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-w-full"
      dir="ltr"
    >
      <button
        type="button"
        onClick={() => scrollBySlot(-1)}
        aria-label="Previous languages"
        className="h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      <nav
        ref={trackRef}
        aria-label={ariaLabel}
        data-lenis-prevent="true"
        className="relative w-[240px] sm:w-[276px] shrink-0 flex items-center gap-[6px] overflow-x-auto snap-x snap-mandatory scroll-smooth select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {languages.map((item) => {
          const isActive = item.code === activeLang;
          return (
            <Link
              key={item.code}
              href={getHref(item.code)}
              hrefLang={item.hreflang}
              lang={item.code}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect(item.code)}
              className={`w-[76px] sm:w-[88px] h-7 shrink-0 snap-start relative isolate inline-flex items-center justify-center gap-1 px-2 rounded-full text-[11px] transition-colors ${
                isActive
                  ? "text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
                />
              )}
              <span className="relative z-10 truncate max-w-[48px] sm:max-w-[56px]">
                {item.nativeName}
              </span>
              <span
                className={`relative z-10 font-mono text-[9px] uppercase tracking-wider ${
                  isActive ? "text-black/70" : "text-zinc-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => scrollBySlot(1)}
        aria-label="Next languages"
        className="h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

interface BlogLanguageSwitcherProps {
  activeLang: BlogLang;
  basePath: string; // e.g. "/blog" or `/blog/${slug}`
  variant?: "navbar" | "editorial";
  availableCodes?: BlogLang[];
  onSelectLang?: (lang: BlogLang) => void;
}

export default function BlogLanguageSwitcher({
  activeLang,
  basePath,
  variant = "editorial",
  availableCodes,
  onSelectLang,
}: BlogLanguageSwitcherProps) {
  const { setLang: setPortfolioLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const instanceId = useId();

  const activeMeta = getBlogLangMeta(activeLang);
  const ui = getBlogUiCopy(activeLang);

  const languages = availableCodes
    ? BLOG_LANGUAGES.filter((l) => availableCodes.includes(l.code))
    : BLOG_LANGUAGES;

  const activeIdx = languages.findIndex((item) => item.code === activeLang);
  const activeIndex = activeIdx >= 0 ? activeIdx : 0;

  const getHref = (code: BlogLang) =>
    code === "tr" ? basePath : `${basePath}?lang=${code}`;

  const handleLanguagePick = (code: BlogLang) => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(BLOG_LANG_STORAGE_KEY, code);
      const meta = getBlogLangMeta(code);
      document.documentElement.lang = code;
      document.documentElement.dir = meta.dir;
    }
    if (code === "tr" || code === "en") {
      setPortfolioLang(code);
    }
    onSelectLang?.(code);
  };

  // Keep <html lang> and <html dir> aligned while browsing blog pages
  useEffect(() => {
    const meta = getBlogLangMeta(activeLang);
    document.documentElement.lang = activeLang;
    document.documentElement.dir = meta.dir;

    return () => {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    };
  }, [activeLang]);

  // Close navbar popover on outside click or Escape
  useEffect(() => {
    if (variant !== "navbar" || !isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [variant, isOpen]);

  if (variant === "navbar") {
    return (
      <div ref={dropdownRef} className="relative" dir="ltr">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label={`${ui.languageLabel}: ${activeMeta.nativeName}`}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/30 text-xs text-zinc-200 hover:text-white backdrop-blur-xl transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="hidden sm:inline font-medium">
            {activeMeta.nativeName}
          </span>
          <span className="font-mono text-[10px] tracking-wider px-1.5 py-0.5 rounded-full bg-white/10 text-zinc-200">
            {activeMeta.label}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-white" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="menu"
              aria-label={ui.readingLanguage}
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-[332px] sm:w-[376px] max-w-[calc(100vw-1rem)] rounded-2xl border border-white/15 bg-[#0a0a0e]/95 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] p-2.5 z-[70] space-y-2.5"
            >
              <div className="px-1 pt-0.5 pb-2 border-b border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                <span>{ui.readingLanguage}</span>
                <span className="text-zinc-300">
                  {activeIndex + 1}/{languages.length}
                </span>
              </div>

              <div className="flex justify-center">
                <SlidingLanguageTrack
                  languages={languages}
                  activeLang={activeLang}
                  ariaLabel={ui.readingLanguage}
                  layoutId={`navbar-lang-pill-${instanceId}`}
                  getHref={getHref}
                  onSelect={handleLanguagePick}
                />
              </div>

              <div
                data-lenis-prevent="true"
                className="max-h-[136px] overflow-y-auto snap-y snap-mandatory space-y-1 pt-1 border-t border-white/[0.07] pr-0.5"
              >
                {languages.map((item) => {
                  const isActive = item.code === activeLang;
                  return (
                    <Link
                      key={item.code}
                      role="menuitemradio"
                      aria-checked={isActive}
                      href={getHref(item.code)}
                      hrefLang={item.hreflang}
                      lang={item.code}
                      onClick={() => handleLanguagePick(item.code)}
                      className={`snap-start flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-all border ${
                        isActive
                          ? "bg-white text-black border-white font-semibold shadow-sm"
                          : "border-transparent text-zinc-300 hover:bg-white/[0.07] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="truncate">{item.nativeName}</span>
                        <span
                          className={`text-[10px] ${
                            isActive ? "text-black/60" : "text-zinc-500"
                          }`}
                        >
                          {item.englishName}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`font-mono text-[10px] ${
                            isActive ? "text-black/70" : "text-zinc-500"
                          }`}
                        >
                          {item.label}
                        </span>
                        {isActive && <Check className="w-3 h-3 text-black" />}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div dir="ltr" className="inline-flex max-w-full">
      <SlidingLanguageTrack
        languages={languages}
        activeLang={activeLang}
        ariaLabel={ui.readingLanguage}
        layoutId={`blog-lang-pill-${instanceId}`}
        getHref={getHref}
        onSelect={handleLanguagePick}
      />
    </div>
  );
}
