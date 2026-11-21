"use client";

import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SponsorHeroBackdrop from "@/components/sponsor/SponsorHeroBackdrop";
import opsSnapshot from "@/data/opsSnapshot.json";

const EDITORIAL_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500&display=swap";

const TIER_OPTIONS_TR = [
  "Sponsorluk: Hızlı Lansman ($450–$750 veya $1,500+ Kredi)",
  "Sponsorluk: Derin Benchmark ($950–$1,800 veya $3,000+ Kredi)",
  "Stratejik Kredi Hibesi / Aylık Ar-Ge Partnerliği (API · GPU · Oyun)",
] as const;

const TIER_OPTIONS_EN = [
  "Sponsorship: Launch Spotlight ($450–$750 or $1,500+ Credits)",
  "Sponsorship: Engineering Teardown ($950–$1,800 or $3,000+ Credits)",
  "Strategic Credit Grant / Monthly R&D Partner (API · GPU · Game-Dev)",
] as const;

interface AuthorityMetrics {
  peakLinkedInImpressions: number;
  top3FlagshipAvgImpressions: number;
  verifiedB2BImpressions: number;
  shortFormEcosystemViews: number;
  cumulativeEcosystemReach: number;
}

interface PerformanceLogItem {
  date: string;
  slug?: string;
  topic: string;
  platform: string;
  impressions?: number | null;
  comments?: number | null;
}

interface OpsSnapshotData {
  authorityMetrics?: AuthorityMetrics;
  performanceLog?: PerformanceLogItem[];
}

interface TierCardSpec {
  idx: number;
  code: string;
  titleLead: string;
  titleAccent: string;
  price: string;
  creditAlt: string;
  badge?: string;
  bullets: string[];
  cta: string;
  pillLabel: string;
  highlighted?: boolean;
}

const DEFAULT_AUTHORITY: AuthorityMetrics = {
  peakLinkedInImpressions: 127466,
  top3FlagshipAvgImpressions: 67822,
  verifiedB2BImpressions: 212444,
  shortFormEcosystemViews: 109200,
  cumulativeEcosystemReach: 321644,
};

function subscribeViewport(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getViewportSnapshot() {
  return document.documentElement.clientWidth;
}

function getViewportServerSnapshot(): number | null {
  return null;
}

function useViewportWidth() {
  return useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getViewportServerSnapshot
  );
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const isShown = visible || reducedMotion;

  return (
    <div
      ref={ref}
      className={className}
      style={
        reducedMotion
          ? { opacity: 1, transform: "none", filter: "none" }
          : {
              opacity: isShown ? 1 : 0,
              transform: isShown ? "none" : "translateY(64px) scale(0.96)",
              filter: isShown ? "none" : "blur(12px)",
              transition:
                "opacity 1100ms cubic-bezier(0.16,1,0.3,1), transform 1100ms cubic-bezier(0.16,1,0.3,1), filter 1100ms cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: `${delayMs}ms`,
            }
      }
    >
      {children}
    </div>
  );
}

interface RollingPillProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  variant?: "outline" | "solid";
  size?: "desktop" | "mobile" | "md";
  className?: string;
}

function RollingPill({
  label,
  href,
  onClick,
  type = "button",
  disabled = false,
  external = false,
  variant = "outline",
  size = "desktop",
  className = "",
}: RollingPillProps) {
  const sizeClass =
    size === "desktop"
      ? "h-[36px] px-[18px] text-[15px]"
      : size === "mobile"
        ? "h-[36px] px-[18px] text-[14px]"
        : "h-[42px] px-[22px] text-[14px]";

  const variantClass =
    variant === "solid"
      ? "border border-[#F3EFEA] bg-[#F3EFEA] text-[#050505] hover:text-[#F3EFEA] hover:shadow-[0_10px_28px_rgba(243,239,234,0.22)]"
      : "border border-[#F3EFEA]/55 bg-[#050505]/45 backdrop-blur-sm text-[#F3EFEA] hover:text-[#050505] hover:shadow-[0_10px_26px_rgba(243,239,234,0.16)]";

  const fillClass = variant === "solid" ? "bg-[#050505]" : "bg-[#F3EFEA]";

  const baseClass = `group relative inline-flex items-center justify-center overflow-hidden rounded-full font-light tracking-[0.01em] whitespace-nowrap transition-[transform,box-shadow,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClass} ${variantClass} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 rounded-full ${fillClass} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100`}
      />
      <span className="relative z-10 block overflow-hidden leading-[1.2]">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        >
          {label}
        </span>
      </span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
        >
          {inner}
        </a>
      );
    }

    if (href.startsWith("#")) {
      return (
        <a href={href} className={baseClass}>
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClass}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
    >
      {inner}
    </button>
  );
}

const SERIF_FONT = {
  fontFamily: "'Instrument Serif', Georgia, serif",
  fontWeight: 400,
} as const;

export default function SponsorExperience() {
  const { lang, toggleLang } = useLanguage();
  const isTr = lang === "tr";

  const viewportWidth = useViewportWidth();
  const reducedMotion = usePrefersReducedMotion();

  const isDesktop = viewportWidth === null ? true : viewportWidth >= 768;
  const desktopScale = viewportWidth !== null ? viewportWidth / 1600 : 0.9;

  useEffect(() => {
    if (document.getElementById("sponsor-editorial-fonts")) return;
    const link = document.createElement("link");
    link.id = "sponsor-editorial-fonts";
    link.rel = "stylesheet";
    link.href = EDITORIAL_FONTS_URL;
    document.head.appendChild(link);
  }, []);

  const snapshot = opsSnapshot as OpsSnapshotData;
  const authority = snapshot.authorityMetrics ?? DEFAULT_AUTHORITY;

  const topDispatches = useMemo(() => {
    const raw = Array.isArray(snapshot.performanceLog) ? snapshot.performanceLog : [];
    return [...raw]
      .filter((item): item is PerformanceLogItem & { impressions: number } =>
        typeof item.impressions === "number" && item.impressions > 0
      )
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 3);
  }, [snapshot.performanceLog]);

  const maxImpressions = topDispatches[0]?.impressions || 127466;

  const tierOptions = isTr ? TIER_OPTIONS_TR : TIER_OPTIONS_EN;
  const [selectedTierIdx, setSelectedTierIdx] = useState(1);
  const selectedRole = tierOptions[selectedTierIdx] ?? tierOptions[1];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSelectPackage = (idx: number) => {
    setSelectedTierIdx(idx);
    const el = document.getElementById("apply");
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("kursat@itibar.app");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      // Clipboard unavailable in restricted browser context
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitted(false);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg(
        isTr
          ? "Lütfen adınızı/şirketinizi, e-postanızı ve kısa notunuzu doldurun."
          : "Please fill in your name/company, work email, and short brief."
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role: selectedRole,
          message: message.trim(),
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : null;
      setErrorMsg(msg || (isTr ? "Gönderim başarısız oldu." : "Submission failed."));
    } finally {
      setSubmitting(false);
    }
  };

  const heroNavItems = [
    {
      label: isTr ? "Slot Ayırt" : "Lock a Slot",
      href: "#apply",
      variant: "solid" as const,
    },
    {
      label: isTr ? "Paketler" : "Deals",
      href: "#models",
      variant: "outline" as const,
    },
    {
      label: isTr ? "Kredi ile Başla" : "Pay in Credits",
      onClick: () => handleSelectPackage(2),
      variant: "outline" as const,
    },
    {
      label: copiedEmail ? (isTr ? "Kopyalandı ✓" : "Copied ✓") : "kursat@itibar.app",
      onClick: handleCopyEmail,
      variant: "outline" as const,
    },
  ];

  const proofMetrics = [
    {
      value: Number(authority.peakLinkedInImpressions).toLocaleString("en-US"),
      label: isTr ? "Tek Gönderi Organik Zirve" : "Single-Post Organic Peak",
    },
    {
      value: Number(authority.cumulativeEcosystemReach).toLocaleString("en-US"),
      label: isTr ? "11 Kanal · 4 Dil Toplam Erişim" : "11 Channels · 4 Languages",
    },
    {
      value: isTr ? "%78" : "78%",
      label: isTr ? "CTO · Kurucu · Baş Mühendis" : "CTO · Founder · Principal",
    },
    {
      value: isTr ? "Nakit / Kredi" : "Cash / Credits",
      label: isTr ? "4 Saatte Dönüş · Aylık Max 4 Slot" : "4h Reply · Max 4 Slots/Mo",
    },
  ];

  const authorityPillars = isTr
    ? [
        "Gerçek Ürün Kurucusu (itibar.app · 100+ Repo)",
        "ChatGPT & Perplexity İçin Kalıcı /llms-full.txt Atfı",
        "Sıfır Ajans — Doğrudan Kurucu İcrası",
      ]
    : [
        "Active Product Builder (itibar.app · 100+ Repos)",
        "Permanent /llms-full.txt AI-Search Citations",
        "Zero Agencies — Direct Founder Execution",
      ];

  const tierCards: TierCardSpec[] = isTr
    ? [
        {
          idx: 0,
          code: "01 // LANSMAN",
          titleLead: "Hızlı",
          titleAccent: "Lansman",
          price: "$450 – $750",
          creditAlt: "veya $1,500+ API / Cloud Kredisi",
          bullets: [
            "1 amiral gemisi LinkedIn yayını (organik karar alıcı erişimi)",
            "4 dilde kalıcı sponsor vitrini (kursat.itibar.app)",
            "X, DEV.to ve daily.dev eşzamanlı dağıtım",
          ],
          cta: "Hemen Ayırt",
          pillLabel: "Hızlı Lansman",
        },
        {
          idx: 1,
          code: "02 // BENCHMARK",
          titleLead: "Derin",
          titleAccent: "Benchmark",
          price: "$950 – $1,800",
          creditAlt: "veya $3,000+ AI / GPU / Oyun Kredisi",
          badge: "EN İYİ ROI",
          highlighted: true,
          bullets: [
            "Ürününüzün gerçek üretim yükünde canlı teknik testi",
            "4 dilli kıyaslama makalesi + kalıcı AI arama (/llms-full.txt) atfı",
            "LinkedIn + X thread + DEV.to + Reddit tam saha yayılımı",
          ],
          cta: "Benchmark Kapat",
          pillLabel: "Derin Benchmark",
        },
        {
          idx: 2,
          code: "03 // KREDİ & AR-GE",
          titleLead: "Kredi &",
          titleAccent: "Ar-Ge",
          price: "Kredi / $2,500 ay",
          creditAlt: "API · Cloud GPU · 3D / Ses Lisansı",
          bullets: [
            "Canlı AI ajan & oyun projelerimde resmi 'Powered by' kullanımı",
            "Ay boyu 4 ana yayında tam kategori tekeli (rakip alınmaz)",
            "Tüm /blog/* arşivinde kalıcı marka konumlandırması",
          ],
          cta: "Kredi ile Başla",
          pillLabel: "Kredi & Ar-Ge",
        },
      ]
    : [
        {
          idx: 0,
          code: "01 // LAUNCH",
          titleLead: "Launch",
          titleAccent: "Spotlight",
          price: "$450 – $750",
          creditAlt: "or $1,500+ API / Cloud Credits",
          bullets: [
            "1 flagship LinkedIn dispatch reaching senior builders organically",
            "Permanent 4-language sponsor spotlight on kursat.itibar.app",
            "Simultaneous syndication on X, DEV.to, and daily.dev",
          ],
          cta: "Claim Launch",
          pillLabel: "Launch",
        },
        {
          idx: 1,
          code: "02 // TEARDOWN",
          titleLead: "Engineering",
          titleAccent: "Teardown",
          price: "$950 – $1,800",
          creditAlt: "or $3,000+ AI / GPU / Game Credits",
          badge: "HIGHEST ROI",
          highlighted: true,
          bullets: [
            "Live production benchmark of your product under real workloads",
            "4-language teardown article + permanent AI-search (/llms-full.txt) citation",
            "Full distribution across LinkedIn + X thread + DEV.to + Reddit",
          ],
          cta: "Book Teardown",
          pillLabel: "Teardown",
        },
        {
          idx: 2,
          code: "03 // CREDIT & R&D",
          titleLead: "Credit &",
          titleAccent: "R&D",
          price: "Credits / $2,500 mo",
          creditAlt: "API Tokens · Cloud GPU · 3D / Voice",
          bullets: [
            "Official 'Powered by' integration inside live AI agent & game builds",
            "Full monthly category exclusivity across 4 flagship dispatches",
            "Persistent brand positioning across the entire /blog/* archive",
          ],
          cta: "Partner via Credits",
          pillLabel: "Credit / R&D",
        },
      ];

  return (
    <div
      className="min-h-screen bg-[#050505] text-[#F3EFEA] antialiased selection:bg-[#F3EFEA] selection:text-[#050505]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ──────────────────────────────────────────────────────────────────────
          1. FULL-VIEWPORT EDITORIAL HERO
         ────────────────────────────────────────────────────────────────────── */}
      <section className="relative h-screen supports-[height:100svh]:h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#050505]">
        {/* One-Shot Cinematic Entrance Monolith Backdrop */}
        <SponsorHeroBackdrop
          isDesktop={isDesktop}
          reducedMotion={reducedMotion}
        />

        {/* Editorial Contrast Scrims */}
        {isDesktop ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.06) 40%, rgba(5,5,5,0.62) 60%, rgba(5,5,5,0.9) 100%)",
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[58%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,5,0.86) 0%, rgba(5,5,5,0.48) 52%, rgba(5,5,5,0) 100%)",
            }}
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[34%]"
          style={{
            background:
              "linear-gradient(0deg, #050505 0%, rgba(5,5,5,0.45) 42%, rgba(5,5,5,0) 100%)",
          }}
        />

        {/* Minimal Top Utility Bar */}
        <header className="absolute top-0 inset-x-0 z-30 px-5 sm:px-8 py-5 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-light tracking-wide text-[#C4BEB4] hover:text-[#F3EFEA] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{isTr ? "Ana Sayfa" : "Home"}</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F3EFEA]/20 bg-[#050505]/50 backdrop-blur-md text-[11px] font-mono text-[#C4BEB4] hover:text-[#F3EFEA] hover:border-[#F3EFEA]/45 transition-colors cursor-pointer"
            >
              <span>{copiedEmail ? (isTr ? "Kopyalandı ✓" : "Copied ✓") : "kursat@itibar.app"}</span>
            </button>

            <button
              type="button"
              onClick={toggleLang}
              aria-label={isTr ? "Switch language to English" : "Dili Türkçe yap"}
              className="px-3 py-1 rounded-full border border-[#F3EFEA]/25 bg-[#050505]/60 backdrop-blur-md text-[11px] font-mono tracking-wider text-[#F3EFEA] hover:bg-[#F3EFEA] hover:text-[#050505] transition-colors cursor-pointer"
            >
              {isTr ? "EN" : "TR"}
            </button>
          </div>
        </header>

        {/* Hero Typography & Pills: Desktop Scaled 1600px Frame vs Mobile Stack */}
        {isDesktop ? (
          <div
            className="absolute left-0 top-0 z-20 pointer-events-none"
            style={{
              width: "1600px",
              height: "580px",
              transformOrigin: "top left",
              transform: `scale(${desktopScale})`,
            }}
          >
            <div
              className="absolute flex flex-col items-start gap-[24px] pointer-events-auto"
              style={{ left: "810px", top: "120px", width: "720px" }}
            >
              <Reveal delayMs={0}>
                <a
                  href="#proof"
                  className="inline-flex items-baseline gap-2.5 hover:opacity-85 transition-opacity"
                >
                  <span className="font-archivo font-[800] text-[24px] leading-[32px] tracking-[-0.02em] uppercase text-[#F3EFEA]">
                    KÜRŞAT YILMAZ
                  </span>
                  <span className="font-mono text-[14px] leading-[24px] tracking-[0.22em] uppercase text-[#C4BEB4]">
                    · PARTNER
                  </span>
                </a>
              </Reveal>

              <h1
                className="text-[71px] leading-[75px] tracking-[0.1px] text-[#F3EFEA] m-0"
                style={SERIF_FONT}
              >
                <Reveal delayMs={200}>
                  <span className="block whitespace-nowrap">
                    {isTr ? "320K+ MÜHENDİS VE CTO" : "320K+ BUILDERS & CTOS."}
                  </span>
                </Reveal>
                <Reveal delayMs={320}>
                  <span className="block whitespace-nowrap">
                    {isTr ? "ÜRÜNÜNÜZÜ KONUŞSUN." : "PUT YOUR STACK FIRST."}
                  </span>
                </Reveal>
              </h1>

              <Reveal delayMs={400}>
                <p className="text-[19px] font-light leading-[28px] text-[#C4BEB4] max-w-[630px]">
                  {isTr
                    ? "Reklam metni okumam; ürününüzü canlı AI ve oyun sistemlerimde test eder, 4 dilde 11 kanala ve AI arama indekslerine taşırım. Nakit veya API / GPU kredisiyle hemen başlayalım."
                    : "I don't read ad scripts—I run your stack in live AI & game builds, benchmark it across 4 languages & 11 channels, and lock permanent AI-search citations. Cash or API/GPU credits."}
                </p>
              </Reveal>

              <nav aria-label={isTr ? "Sponsorluk Hızlı Erişim" : "Sponsorship Quick Navigation"}>
                <ul className="flex flex-wrap gap-[12px] list-none p-0 m-0">
                  {heroNavItems.map((item, idx) => (
                    <li key={item.label}>
                      <Reveal delayMs={480 + idx * 90}>
                        <RollingPill
                          label={item.label}
                          href={item.href}
                          onClick={item.onClick}
                          variant={item.variant}
                          size="desktop"
                        />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        ) : (
          <div className="relative z-20 px-[20px] pt-[62px]">
            <Reveal delayMs={0}>
              <a
                href="#proof"
                className="inline-flex items-baseline gap-2 hover:opacity-85 transition-opacity"
              >
                <span className="font-archivo font-[800] text-[15px] leading-[22px] tracking-[-0.02em] uppercase text-[#F3EFEA]">
                  KÜRŞAT YILMAZ
                </span>
                <span className="font-mono text-[11px] leading-[18px] tracking-[0.2em] uppercase text-[#C4BEB4]">
                  · PARTNER
                </span>
              </a>
            </Reveal>

            <h1
              className="mt-[10px] text-[36px] leading-[40px] text-[#F3EFEA]"
              style={SERIF_FONT}
            >
              <Reveal delayMs={200}>
                <span className="block">
                  {isTr ? "320K+ MÜHENDİS VE CTO" : "320K+ BUILDERS & CTOS."}
                </span>
              </Reveal>
              <Reveal delayMs={320}>
                <span className="block">
                  {isTr ? "ÜRÜNÜNÜZÜ KONUŞSUN." : "PUT YOUR STACK FIRST."}
                </span>
              </Reveal>
            </h1>

            <Reveal delayMs={400}>
              <p className="mt-[10px] text-[14px] font-light leading-[21px] text-[#C4BEB4] max-w-[440px]">
                {isTr
                  ? "Reklam okumam; ürününüzü canlı AI ve oyun sistemlerimde test eder, 4 dilde 11 kanala taşırım. Nakit veya API / GPU kredisiyle hemen başlayalım."
                  : "No ad scripts—I run your stack in live AI & game builds across 4 languages & 11 channels. Cash or API/GPU credits."}
              </p>
            </Reveal>

            <nav aria-label={isTr ? "Sponsorluk Hızlı Erişim" : "Sponsorship Quick Navigation"} className="mt-[16px]">
              <ul className="flex flex-wrap gap-[8px] list-none p-0 m-0">
                {heroNavItems.map((item, idx) => (
                  <li key={item.label}>
                    <Reveal delayMs={480 + idx * 90}>
                      <RollingPill
                        label={item.label}
                        href={item.href}
                        onClick={item.onClick}
                        variant={item.variant}
                        size="mobile"
                      />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Bottom Live Proof Strip */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-[#F3EFEA]/10 bg-[#050505]/70 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6">
            {proofMetrics.map((metric) => (
              <div key={metric.label} className="space-y-0.5">
                <div className="font-mono text-sm sm:text-base font-medium text-[#F3EFEA] tabular-nums">
                  {metric.value}
                </div>
                <div className="text-[11px] sm:text-xs font-light text-[#8E8A84]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          2. VERIFIED PROOF (#proof) & CASH OR CREDITS DEALS (#models)
         ────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24 space-y-20">
        {/* Top 3 Verified Dispatches + Authority Strip */}
        <section id="proof" className="scroll-mt-8 space-y-8">
          <Reveal delayMs={0}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#F3EFEA]/10 pb-6">
              <div className="space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8E8A84]">
                  {isTr ? "01 // NEDEN BİZ?" : "01 // WHY PARTNER HERE"}
                </p>
                <h2 className="font-archivo font-[800] text-3xl sm:text-5xl tracking-[-0.03em] leading-[1.1] text-[#F3EFEA]">
                  {isTr ? (
                    <>
                      İddia değil,{" "}
                      <span className="font-instrument italic font-normal text-[1.08em]">
                        kanıtlanmış
                      </span>{" "}
                      etki.
                    </>
                  ) : (
                    <>
                      Not hype—{" "}
                      <span className="font-instrument italic font-normal text-[1.08em]">
                        verified
                      </span>{" "}
                      impact.
                    </>
                  )}
                </h2>
              </div>
              <span className="font-mono text-[11px] text-[#8E8A84] shrink-0">
                {isTr ? "4 Dil · 11 Kanal · /llms-full.txt" : "4 Languages · 11 Channels · /llms-full.txt"}
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topDispatches.map((item, idx) => {
              const pct = Math.max(12, Math.round((item.impressions / maxImpressions) * 100));
              const href = item.slug
                ? `/blog/${item.slug}`
                : "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/";
              const isExternal = !item.slug;

              const cardBody = (
                <div className="group h-full rounded-2xl border border-[#F3EFEA]/12 bg-[#0A0A0C] p-6 flex flex-col justify-between gap-6 transition-colors duration-300 hover:border-[#F3EFEA]/35 hover:bg-[#0D0D10]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#8E8A84]">
                      <span>
                        0{idx + 1} · {item.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#C4BEB4]">
                        {isTr ? "ORGANİK YAYIN" : "ORGANIC REACH"}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>

                    <h3 className="text-base font-normal text-[#F3EFEA] leading-snug">
                      {item.topic}
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-2xl sm:text-3xl font-medium text-[#F3EFEA] tabular-nums">
                        {item.impressions.toLocaleString("en-US")}
                      </span>
                      {typeof item.comments === "number" && (
                        <span className="font-mono text-[11px] text-[#8E8A84] tabular-nums">
                          {item.comments} {isTr ? "yorum" : "replies"}
                        </span>
                      )}
                    </div>
                    <div className="h-[3px] w-full rounded-full bg-[#F3EFEA]/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#F3EFEA]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );

              return (
                <Reveal key={`${item.date}-${idx}`} delayMs={idx * 90}>
                  {isExternal ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {cardBody}
                    </a>
                  ) : (
                    <Link href={href} className="block h-full">
                      {cardBody}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>

          {/* Compact 1-Row Authority Proof Strip */}
          <Reveal delayMs={150}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl border border-[#F3EFEA]/12 bg-[#0A0A0C]/70 px-5 py-4">
              {authorityPillars.map((pillar) => (
                <div key={pillar} className="flex items-center gap-2.5 text-xs sm:text-[13px] font-light text-[#C4BEB4]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F3EFEA] shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 3 Deal Closer Cards */}
        <section id="models" className="scroll-mt-8 space-y-8 border-t border-[#F3EFEA]/10 pt-16">
          <Reveal delayMs={0}>
            <div className="space-y-3 max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8E8A84]">
                {isTr ? "02 // NAKİT VEYA KREDİ" : "02 // CASH OR CREDITS"}
              </p>
              <h2 className="font-archivo font-[800] text-3xl sm:text-5xl tracking-[-0.03em] leading-[1.1] text-[#F3EFEA]">
                {isTr ? (
                  <>
                    Nakit veya kredi —{" "}
                    <span className="font-instrument italic font-normal text-[1.08em]">
                      işi hemen
                    </span>{" "}
                    bağlayalım.
                  </>
                ) : (
                  <>
                    Cash or credits —{" "}
                    <span className="font-instrument italic font-normal text-[1.08em]">
                      let&apos;s ship
                    </span>{" "}
                    it.
                  </>
                )}
              </h2>
              <p className="text-sm sm:text-base font-light text-[#C4BEB4] leading-relaxed">
                {isTr
                  ? "Ödeme bütçesi ya da API / Cloud GPU / Oyun kredisi fark etmez. Aylık en fazla 4 marka alıyorum."
                  : "Cash budget or API / Cloud GPU / Game credits—both close fast. Strictly capped at 4 brands per month."}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {tierCards.map((card, i) => (
              <Reveal key={card.code} delayMs={i * 100} className="h-full">
                <div
                  className={`h-full rounded-2xl border p-6 sm:p-7 flex flex-col justify-between gap-7 ${
                    card.highlighted
                      ? "border-[#F3EFEA]/35 bg-[#0D0D10]"
                      : "border-[#F3EFEA]/12 bg-[#0A0A0C]"
                  }`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] tracking-[0.16em] text-[#8E8A84] whitespace-nowrap">
                        {card.code}
                      </span>
                      {card.badge ? (
                        <span className="px-2.5 py-0.5 rounded-full border border-[#F3EFEA]/30 text-[10px] font-mono tracking-wider text-[#F3EFEA] whitespace-nowrap shrink-0">
                          {card.badge}
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F3EFEA]/25 shrink-0" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-archivo font-[800] text-2xl sm:text-[26px] tracking-[-0.025em] leading-tight text-[#F3EFEA]">
                        {card.titleLead}{" "}
                        <span className="font-instrument italic font-normal text-[1.12em]">
                          {card.titleAccent}
                        </span>
                      </h3>
                      <div className="font-archivo font-[800] text-xl sm:text-[24px] tracking-[-0.02em] text-[#F3EFEA] tabular-nums pt-1 whitespace-nowrap">
                        {card.price}
                      </div>
                      <p className="font-mono text-xs text-[#C4BEB4] whitespace-nowrap">{card.creditAlt}</p>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-[#F3EFEA]/10 text-sm font-light text-[#C4BEB4]">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#F3EFEA] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <RollingPill
                    label={card.cta}
                    onClick={() => handleSelectPackage(card.idx)}
                    variant={card.highlighted ? "solid" : "outline"}
                    size="md"
                    className="w-full"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            3. FAST DEAL DESK (#apply)
           ──────────────────────────────────────────────────────────────────── */}
        <section
          id="apply"
          className="scroll-mt-8 border-t border-[#F3EFEA]/12 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          <div className="lg:col-span-5 space-y-6">
            <Reveal delayMs={0}>
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8E8A84]">
                  {isTr ? "03 // DOĞRUDAN KAPATALIM" : "03 // CLOSE DIRECTLY"}
                </p>
                <h2 className="font-archivo font-[800] text-3xl sm:text-5xl tracking-[-0.03em] leading-[1.1] text-[#F3EFEA]">
                  {isTr ? (
                    <>
                      Slot kapanmadan{" "}
                      <span className="font-instrument italic font-normal text-[1.08em]">
                        başlayalım.
                      </span>
                    </>
                  ) : (
                    <>
                      Lock your slot{" "}
                      <span className="font-instrument italic font-normal text-[1.08em]">
                        today.
                      </span>
                    </>
                  )}
                </h2>
                <p className="text-sm sm:text-base font-light text-[#C4BEB4] leading-relaxed">
                  {isTr
                    ? "Kısa bir not bırakın — 4 saat içinde doğrudan Telegram ve kursat@itibar.app üzerinden takvimi netleştirelim."
                    : "Drop a 2-line brief—I reply within 4 hours directly to lock scope and launch date."}
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="flex flex-wrap gap-3 pt-1">
                <RollingPill
                  label={copiedEmail ? (isTr ? "Kopyalandı ✓" : "Copied ✓") : "kursat@itibar.app"}
                  onClick={handleCopyEmail}
                  variant="outline"
                  size="md"
                />
                <RollingPill
                  label="LinkedIn DM"
                  href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
                  external
                  variant="outline"
                  size="md"
                />
              </div>
            </Reveal>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
            {/* 3-Pill Tier Selector */}
            <div className="space-y-2">
              <span className="block font-mono text-[11px] uppercase tracking-wider text-[#8E8A84]">
                {isTr ? "İşbirliği Modeli" : "Partnership Tier"}
              </span>
              <div className="flex flex-wrap gap-2">
                {tierCards.map((card) => {
                  const active = selectedTierIdx === card.idx;
                  return (
                    <button
                      key={card.code}
                      type="button"
                      onClick={() => setSelectedTierIdx(card.idx)}
                      className={`px-3.5 py-2 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                        active
                          ? "bg-[#F3EFEA] text-[#050505] border border-[#F3EFEA] font-medium"
                          : "bg-transparent text-[#C4BEB4] border border-[#F3EFEA]/18 hover:border-[#F3EFEA]/45 hover:text-[#F3EFEA]"
                      }`}
                    >
                      {card.pillLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="sponsor-name"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#8E8A84]"
                >
                  {isTr ? "İsim / Şirket" : "Name / Company"}
                </label>
                <input
                  id="sponsor-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isTr ? "Örn. Ahmet Yılmaz — Cloud AI" : "e.g. Alex Chen — Cloud AI"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EFEA]/15 bg-[#0A0A0C] text-sm font-light text-[#F3EFEA] placeholder:text-[#8E8A84]/60 focus:outline-none focus:border-[#F3EFEA]/55"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="sponsor-email"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#8E8A84]"
                >
                  {isTr ? "Kurumsal E-posta" : "Work Email"}
                </label>
                <input
                  id="sponsor-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EFEA]/15 bg-[#0A0A0C] text-sm font-light text-[#F3EFEA] placeholder:text-[#8E8A84]/60 focus:outline-none focus:border-[#F3EFEA]/55"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="sponsor-brief"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#8E8A84]"
              >
                {isTr ? "Ürün Linki, Tarih & Nakit / Kredi Notu" : "Product URL, Timing & Cash / Credit Note"}
              </label>
              <textarea
                id="sponsor-brief"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  isTr
                    ? "Ürün linki, hedef tarih ve nakit/kredi tercihiniz..."
                    : "Product link, target launch window, and cash or credit preference..."
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EFEA]/15 bg-[#0A0A0C] text-sm font-light text-[#F3EFEA] placeholder:text-[#8E8A84]/60 focus:outline-none focus:border-[#F3EFEA]/55"
                required
              />
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-[#F3EFEA]/30 bg-[#F3EFEA]/[0.06] px-4 py-2.5 font-mono text-xs text-[#F3EFEA]">
                {errorMsg}
              </div>
            )}

            {submitted && (
              <div className="rounded-xl border border-[#F3EFEA]/40 bg-[#F3EFEA]/[0.09] px-4 py-2.5 font-mono text-xs text-[#F3EFEA]">
                {isTr
                  ? "Talebiniz anlık bildirim olarak iletildi. En kısa sürede dönüş yapılacaktır."
                  : "Proposal received and routed instantly. You will hear back within 4 hours."}
              </div>
            )}

            <div className="pt-1">
              <RollingPill
                type="submit"
                disabled={submitting}
                variant="solid"
                size="md"
                label={
                  submitting
                    ? isTr
                      ? "İletiliyor..."
                      : "Sending..."
                    : isTr
                      ? "Slotu Kilitle"
                      : "Lock My Slot"
                }
              />
            </div>
          </form>
        </section>

        {/* Minimal Editorial Footer */}
        <footer className="border-t border-[#F3EFEA]/10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8E8A84]">
          <span>KÜRŞAT YILMAZ · İSTANBUL · 2026</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#F3EFEA] transition-colors">
              {isTr ? "Ana Sayfa" : "Home"}
            </Link>
            <Link href="/blog" className="hover:text-[#F3EFEA] transition-colors">
              {isTr ? "Yazılar" : "Essays"}
            </Link>
            <a
              href="https://github.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F3EFEA] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F3EFEA] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
