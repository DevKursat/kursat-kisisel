"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Mail, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollProgress } from "@/components/core/scroll-progress";
import { Spotlight } from "@/components/core/spotlight";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import opsSnapshot from "@/data/opsSnapshot.json";

const TIER_OPTIONS_TR = [
  "Sponsorluk: Tekil Yayın ($450–$750)",
  "Sponsorluk: Derin Teknik Benchmark Otopsisi ($950–$1,800)",
  "Stratejik Kredi / API / Oyun Ar-Ge Partnerliği (Gemini / Kimi / Cloud)",
  "Aylık Kategori Tekeli & Ar-Ge Partnerliği ($2,500/ay)",
];

const TIER_OPTIONS_EN = [
  "Sponsorship: Single-Dispatch Partner ($450–$750)",
  "Sponsorship: Deep-Dive Engineering Teardown ($950–$1,800)",
  "Strategic API / GPU / Game-Dev R&D Credit Grant (Gemini / Kimi / Cloud)",
  "Monthly Category Exclusivity & R&D Partner ($2,500/mo)",
];

export default function SponsorPage() {
  const { lang, toggleLang } = useLanguage();
  const isTr = lang === "tr";

  const authority = (opsSnapshot as any).authorityMetrics || {
    peakLinkedInImpressions: 127466,
    top3FlagshipAvgImpressions: 67822,
    verifiedB2BImpressions: 211930,
    shortFormEcosystemViews: 109200,
    cumulativeEcosystemReach: 321130,
  };

  const topDispatches = useMemo(() => {
    const raw = Array.isArray((opsSnapshot as any).performanceLog)
      ? (opsSnapshot as any).performanceLog
      : [];
    return [...raw]
      .filter((item: any) => typeof item.impressions === "number" && item.impressions > 0)
      .sort((a: any, b: any) => b.impressions - a.impressions)
      .slice(0, 6);
  }, []);

  const maxImpressions = topDispatches[0]?.impressions || 127466;

  const tierOptions = isTr ? TIER_OPTIONS_TR : TIER_OPTIONS_EN;
  const [selectedTierIdx, setSelectedTierIdx] = useState(1);
  const selectedRole = tierOptions[selectedTierIdx] || tierOptions[1];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSelectPackage = (idx: number) => {
    setSelectedTierIdx(idx);
    const formEl = document.getElementById("sponsor-form");
    if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("kursat@itibar.app");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg(
        isTr
          ? "Lütfen adınızı, kurumsal e-postanızı ve işbirliği brief'inizi doldurun."
          : "Please fill in your name/company, work email, and collaboration brief."
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setErrorMsg(err?.message || (isTr ? "Gönderim başarısız." : "Submission failed."));
    } finally {
      setSubmitting(false);
    }
  };

  const benchmarkBars = [
    {
      code: "01",
      label: isTr ? "Tekli Gönderi Zirve Erişim" : "Peak Single-Dispatch Reach",
      value: Number(authority.peakLinkedInImpressions).toLocaleString("en-US"),
      pct: Math.round(
        (Number(authority.peakLinkedInImpressions) / Number(authority.cumulativeEcosystemReach)) * 100
      ),
      note: isTr ? "LinkedIn amiral gemisi" : "Verified LinkedIn flagship",
    },
    {
      code: "02",
      label: isTr ? "Top-3 Amiral Gemisi Ortalaması" : "Top-3 Flagship Average",
      value: Number(authority.top3FlagshipAvgImpressions).toLocaleString("en-US"),
      pct: Math.round(
        (Number(authority.top3FlagshipAvgImpressions) / Number(authority.cumulativeEcosystemReach)) * 100
      ),
      note: isTr ? "Apple · Claude · Altman" : "Apple · Claude · Altman",
    },
    {
      code: "03",
      label: isTr ? "11 Kanallı Ekosistem Erişimi" : "11-Channel Cumulative Reach",
      value: `${Number(authority.cumulativeEcosystemReach).toLocaleString("en-US")}`,
      pct: 100,
      note: isTr ? "4 Dil + /llms-full.txt" : "4 Languages + /llms-full.txt",
    },
    {
      code: "04",
      label: isTr ? "Kıdemli Karar Verici Oranı" : "Senior Decision-Maker Share",
      value: "78%",
      pct: 78,
      note: isTr ? "CTO · Kurucu · Baş Müh." : "CTO · Founder · Principal Eng.",
    },
  ];

  const rdTracks = [
    {
      code: "01 // GOOGLE CLOUD & GEMINI TÜRKİYE",
      title: isTr ? "Gemini 4 & Vertex AI Benchmark Hattı" : "Gemini 4 & Vertex AI Benchmarking",
      body: isTr
        ? "Otonom ajanlarımız ve oyun geliştirme iş yüklerimizde Gemini API / Vertex AI modellerini canlı üretim verileriyle kıyaslayıp 4 dilde vaka analizleri yayınlıyoruz."
        : "Production testing of Gemini API and Vertex AI across multi-agent and interactive game loops, published across 4 languages.",
      ask: isTr ? "Google for Startups / Vertex Kredi Hibesi + Co-Marketing" : "Cloud / Vertex Credit Grant + Regional Co-Marketing",
    },
    {
      code: "02 // MOONSHOT AI (KIMI)",
      title: isTr ? "Kimi Uzun Bağlam & Kodlama Testleri" : "Kimi Long-Context & Agent Orchestration",
      body: isTr
        ? "Yüksek hacimli çıkarım maliyet kıyaslarımızda Kimi API performansını, token ekonomisini ve oyun içi NPC orkestrasyonunu belgeleriz."
        : "Independent unit-economics and latency teardowns benchmarked against frontier closed APIs.",
      ask: isTr ? "$2,000–$5,000 API Token Hibesi + Lansman Sponsorluğu" : "$2,000–$5,000 API Token Grant + Sponsored Teardown",
    },
    {
      code: "03 // GAME-DEV & 3D AI STACK",
      title: isTr ? "Oyun Geliştirme, 3D & Ses Motorları" : "Interactive Game Builds, 3D & Voice AI",
      body: isTr
        ? "Aktif geliştirdiğimiz oyun ve animasyon boru hatlarında Unity, Meshy, Inworld, ElevenLabs ve Fal.ai araçlarını gerçek gecikme metrikleriyle vitrine çıkarıyoruz."
        : "Transparent build logs showcasing Meshy, Inworld, ElevenLabs, and Fal.ai directly inside live shipped game builds.",
      ask: isTr ? "Studio / Pro Kredi Paketi ($1,500–$3,000+)" : "Studio / Enterprise License Grant + Build Showcase",
    },
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      {/* Hairline Reading Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
        <ScrollProgress className="h-[2px] bg-gradient-to-r from-white/20 via-white to-white" />
      </div>

      {/* Minimal Obsidian Navbar — Matches /blog */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#000000]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>{isTr ? "Ana Sayfa" : "Home"}</span>
          </Link>

          <Link
            href="/"
            className="font-archivo font-[800] text-sm tracking-tight text-white hover:opacity-80 transition-opacity truncate uppercase"
          >
            KÜRŞAT YILMAZ
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black text-[11px] font-mono text-zinc-200 transition-colors cursor-pointer"
            >
              {isTr ? "EN" : "TR"}
            </button>

            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-24 space-y-24">
        {/* SECTION 1: ASYMMETRIC SPLIT EDITORIAL HERO + LIVE TELEMETRY LEDGER */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
              {isTr
                ? "// EXECUTIVE MEDIA KIT & AR-GE PARTNERLİĞİ"
                : "// EXECUTIVE MEDIA KIT & R&D PARTNERSHIPS"}
            </p>

            <h1 className="font-archivo font-[800] text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-white leading-[1.08]">
              <span className="block">{isTr ? "Sözde kalmayan," : "Proven reach,"}</span>
              <span className="block">
                <span className="font-instrument italic font-normal text-white">
                  {isTr ? "kanıtlanmış" : "engineered"}
                </span>{" "}
                {isTr ? "mühendislik erişimi." : "for authority."}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-normal">
              {isTr
                ? "Klişe influencer reklamları değil; tekil gönderide 127.4K+ gösterime ulaşan mimari analizler, üretim birim ekonomi benchmark'ları ve 4 dilde (TR/EN/DE/ES) kalıcı AI arama indeksi. Nakit sponsorlukların yanı sıra aktif ajan ve oyun projelerimiz için stratejik API & bulut GPU partnerlikleri."
                : "No generic ad reads. Production teardowns reaching 127.4K+ impressions on a single LinkedIn dispatch, unit-economics benchmarks, and 4-language permanent indexing—paired with strategic API and Cloud GPU grants for our active AI agent and game builds."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectPackage(1)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                <span>{isTr ? "Partnerlik Başlat" : "Initiate Partnership"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="#dispatch-ledger"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-zinc-200 transition-colors"
              >
                <span>{isTr ? "Canlı Kayıtları İncele" : "View Dispatch Ledger"}</span>
              </a>
            </div>
          </div>

          {/* Right Split: Live Telemetry Benchmark Chart Card */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0a0a0c] p-6 sm:p-7 space-y-5">
              <Spotlight size={320} />
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-xs font-mono text-zinc-300 tracking-wider">
                    {isTr ? "CANLI TELEMETRİ ÖZETİ" : "LIVE TELEMETRY LEDGER"}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {isTr ? "4 DİL · 11 KANAL" : "4 LANGS · 11 CHANNELS"}
                </span>
              </div>

              <div className="relative z-10 space-y-4">
                {benchmarkBars.map((bar, idx) => (
                  <div key={bar.code} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs text-zinc-300 font-medium">{bar.label}</span>
                      <span className="font-mono text-sm sm:text-base font-bold text-white tabular-nums">
                        {bar.value}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${idx === 0 ? "bg-white" : "bg-zinc-500"}`}
                        style={{ width: `${Math.max(14, bar.pct)}%` }}
                      />
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500">{bar.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: VERIFIED DISPATCH LEDGER (SORTED HIGHEST REACH FIRST) */}
        <section id="dispatch-ledger" className="space-y-8 border-t border-white/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                {isTr ? "// DOĞRULANMIŞ PERFORMANS ARŞİVİ" : "// VERIFIED DISPATCH LEDGER"}
              </p>
              <h2 className="font-archivo font-[800] text-2xl sm:text-4xl tracking-[-0.02em] text-white">
                {isTr ? "En Yüksek Erişimli Vaka Analizleri" : "Top Performing Technical Case Studies"}
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-500">
              {isTr
                ? "Kaynak: opsSnapshot.json (yüksekten düşüğe sıralı)"
                : "Source: opsSnapshot.json (sorted highest impressions first)"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.1] bg-[#0a0a0c] divide-y divide-white/[0.07] overflow-hidden">
            {topDispatches.map((item: any, idx: number) => {
              const barPct = Math.max(
                6,
                Math.round((Number(item.impressions) / maxImpressions) * 100)
              );
              const href = item.slug
                ? `/blog/${item.slug}`
                : "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/";
              const isExternal = !item.slug;

              const rowContent = (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-5 sm:px-6 py-4 hover:bg-white/[0.03] transition-colors">
                  <div className="md:col-span-6 space-y-1 min-w-0">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500">
                      <span>[{String(idx + 1).padStart(2, "0")}]</span>
                      <span>{item.date}</span>
                      <span>VSE {item.vse ?? "—"}/100</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-white truncate">
                      {item.topic}
                    </h3>
                  </div>

                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${idx === 0 ? "bg-white" : "bg-zinc-500"}`}
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                    <span className="font-mono text-sm font-semibold text-white tabular-nums w-20 text-right shrink-0">
                      {Number(item.impressions).toLocaleString("en-US")}
                    </span>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 text-xs font-mono text-zinc-400">
                    {typeof item.comments === "number" && (
                      <span className="tabular-nums">
                        {item.comments} {isTr ? "yorum" : "replies"}
                      </span>
                    )}
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </div>
                </div>
              );

              return isExternal ? (
                <a
                  key={`${item.date}-${idx}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {rowContent}
                </a>
              ) : (
                <Link key={`${item.date}-${idx}`} href={href}>
                  {rowContent}
                </Link>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: 3 ARCHITECTURAL PARTNERSHIP TIERS */}
        <section className="space-y-8 border-t border-white/10 pt-16">
          <div className="space-y-1.5">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
              {isTr
                ? "// NAKİT & API / GPU KREDİ HİBRİT MODELİ"
                : "// CASH & API / GPU CREDIT HYBRID STRUCTURE"}
            </p>
            <h2 className="font-archivo font-[800] text-2xl sm:text-4xl tracking-[-0.02em] text-white">
              {isTr ? "Sponsorluk & Stratejik Partnerlik Paketleri" : "Partnership Tiers"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tier 01 */}
            <div className="rounded-2xl border border-white/[0.1] bg-[#0a0a0c] p-6 sm:p-7 flex flex-col justify-between gap-6 hover:border-white/25 transition-colors">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500 tracking-widest">
                    [01 // LAUNCH]
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-archivo font-[700] text-xl text-white">
                    {isTr ? "Tekil Amiral Gemisi" : "Single-Dispatch Partner"}
                  </h3>
                  <div className="font-archivo font-[800] text-3xl text-white tabular-nums pt-1">
                    $450 – $750
                  </div>
                  <p className="text-xs font-mono text-zinc-400">
                    {isTr
                      ? "veya eşdeğer $1,500+ API / Cloud GPU Kredisi"
                      : "or equivalent $1,500+ API / Cloud GPU Credits"}
                  </p>
                </div>

                <ul className="space-y-2.5 text-sm text-zinc-300 pt-2 border-t border-white/[0.08]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "1 yüksek VSE'li LinkedIn analizi altında kurumsal/teknik ortak vurgusu"
                        : "Dedicated partner attribution on 1 flagship LinkedIn dispatch"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "kursat.itibar.app üzerinde 4 dilli kalıcı makale sponsor kartı"
                        : "Permanent 4-language sponsor block on kursat.itibar.app"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "DEV.to, X (@DevKursat) ve RSS/daily.dev çapraz dağıtım"
                        : "Cross-syndication via DEV.to, X (@DevKursat), and daily.dev"}
                    </span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPackage(0)}
                className="w-full py-3 px-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                {isTr ? "Bu Paketi Seç" : "Select Launch Tier"}
              </button>
            </div>

            {/* Tier 02 — Primary Moment */}
            <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-[#111115] p-6 sm:p-7 flex flex-col justify-between gap-6">
              <Spotlight size={340} />
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-200 tracking-widest">
                    [02 // BENCHMARK TEARDOWN]
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-archivo font-[700] text-xl text-white">
                    {isTr ? "Derin Teknik Benchmark" : "Engineering Teardown"}
                  </h3>
                  <div className="font-archivo font-[800] text-3xl text-white tabular-nums pt-1">
                    $950 – $1,800
                  </div>
                  <p className="text-xs font-mono text-zinc-300">
                    {isTr
                      ? "veya $3,000+ Frontier AI / Oyun AI Kredi Hibesi"
                      : "or $3,000+ Frontier AI / Game-Dev Credit Grant"}
                  </p>
                </div>

                <ul className="space-y-2.5 text-sm text-zinc-200 pt-2 border-t border-white/[0.1]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "Model/API veya oyun AI motorunuzun gerçek üretim ve oyun yüklerinde testi"
                        : "Production workload benchmark of your model, API, or game-dev engine"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "500–850 kelimelik 4 dilli benchmark makalesi + /llms-full.txt indeksi"
                        : "500–850 word 4-language benchmark article + /llms-full.txt citation"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "LinkedIn ana yayın + X thread + DEV.to + Reddit organik teknik tartışma"
                        : "LinkedIn flagship + X thread + DEV.to + organic engineering thread"}
                    </span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPackage(1)}
                className="relative z-10 w-full py-3 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                {isTr ? "Benchmark ile Başvur" : "Book Deep-Dive Teardown"}
              </button>
            </div>

            {/* Tier 03 */}
            <div className="rounded-2xl border border-white/[0.1] bg-[#0a0a0c] p-6 sm:p-7 flex flex-col justify-between gap-6 hover:border-white/25 transition-colors">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500 tracking-widest">
                    [03 // R&D RETAINER]
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-archivo font-[700] text-xl text-white">
                    {isTr ? "Aylık Kategori Partneri" : "Monthly Category Retainer"}
                  </h3>
                  <div className="font-archivo font-[800] text-3xl text-white tabular-nums pt-1">
                    $2,500 / {isTr ? "ay" : "mo"}
                  </div>
                  <p className="text-xs font-mono text-zinc-400">
                    {isTr
                      ? "veya Kurumsal Bulut/GPU Hibesi + Bölgesel DevRel"
                      : "or Enterprise Cloud/GPU Grant + Regional DevRel"}
                  </p>
                </div>

                <ul className="space-y-2.5 text-sm text-zinc-300 pt-2 border-t border-white/[0.08]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "Ay boyunca 4 ana yayında tam kategori tekeli ve rakipsiz konum"
                        : "Full category exclusivity across 4 monthly flagship dispatches"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "Tüm /blog/* makalelerinin altında kalıcı partner rozeti & bağlantı"
                        : "Persistent partner attribution across every /blog/* page"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "Otonom ajanlar + aktif oyun projelerimizde resmi altyapı kullanımı"
                        : "Official stack integration ('Powered by') in agent & game builds"}
                    </span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPackage(3)}
                className="w-full py-3 px-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                {isTr ? "Aylık Partnerlik Görüş" : "Discuss Monthly Retainer"}
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 4: FRONTIER AI, CLOUD & GAME-DEV R&D TRACK */}
        <section className="space-y-8 border-t border-white/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                {isTr
                  ? "// STRATEJİK AR-GE KREDİ HİBELERİ"
                  : "// STRATEGIC R&D & CREDIT GRANTS"}
              </p>
              <h2 className="font-archivo font-[800] text-2xl sm:text-4xl tracking-[-0.02em] text-white">
                {isTr
                  ? "Google Gemini Türkiye, Kimi & Oyun Teknolojisi Partnerliği"
                  : "Google Gemini, Kimi (Moonshot AI) & Game-Dev Stack"}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPackage(2)}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              <span>{isTr ? "Kredi Partnerliği Teklif Et" : "Propose Credit Grant"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rdTracks.map((track) => (
              <div
                key={track.code}
                className="rounded-2xl border border-white/[0.1] bg-[#0a0a0c] p-6 space-y-4 flex flex-col justify-between hover:border-white/25 transition-colors"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[11px] text-zinc-500 tracking-wider block">
                    {track.code}
                  </span>
                  <h3 className="text-lg font-archivo font-[700] text-white leading-snug">
                    {track.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {track.body}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-zinc-300">
                  {track.ask}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: DIRECT PARTNER DESK FORM (/api/contact) */}
        <section
          id="sponsor-form"
          className="rounded-2xl border border-white/[0.12] bg-[#0a0a0c] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
              {isTr ? "// DOĞRUDAN İLETİŞİM HATTI" : "// DIRECT PARTNER DESK"}
            </p>
            <h2 className="font-archivo font-[800] text-2xl sm:text-3xl text-white">
              {isTr ? "Partnerlik Başvurusu Başlat" : "Start a Partnership Brief"}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {isTr
                ? "Formu doldurduğunuzda talebiniz doğrudan Telegram ve kurumsal posta kutuma (kursat@itibar.app) anlık bildirim olarak düşer. Ortalama dönüş süresi 4 saattir."
                : "Submissions trigger an instant alert directly to my desk (Telegram + kursat@itibar.app). Typical response time is under 4 hours."}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4 text-zinc-300" />
                  <span>kursat@itibar.app</span>
                </span>
                <span className="text-zinc-500">
                  {copiedEmail ? (isTr ? "Kopyalandı ✓" : "Copied ✓") : isTr ? "Kopyala" : "Copy"}
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  {isTr ? "İsim / Şirket" : "Name / Company"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isTr ? "Örn. Ahmet Yılmaz — Cloud Corp" : "e.g. Alex Chen — Cloud Corp"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.12] bg-black/60 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  {isTr ? "Kurumsal E-posta" : "Work Email"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.12] bg-black/60 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                {isTr ? "Paket / İşbirliği Modeli" : "Package / Collaboration Tier"}
              </label>
              <select
                value={selectedTierIdx}
                onChange={(e) => setSelectedTierIdx(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.12] bg-black/80 text-sm text-white focus:outline-none focus:border-white/40"
              >
                {tierOptions.map((opt, idx) => (
                  <option key={idx} value={idx}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                {isTr ? "Ürün Linki, Hedef Tarih & Kısa Brief" : "Product URL, Timeline & Brief"}
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  isTr
                    ? "Hangi modelinizi, API'nizi veya geliştirici/oyun aracınızı öne çıkarmak istersiniz? Nakit bütçe veya API/GPU kredi detayını yazabilirsiniz."
                    : "Tell us about your model, API, DevTool, or game-dev platform and target launch window."
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.12] bg-black/60 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
                required
              />
            </div>

            {errorMsg && (
              <div className="text-xs font-mono text-zinc-200 bg-white/[0.06] border border-white/25 rounded-xl px-3.5 py-2.5">
                {errorMsg}
              </div>
            )}

            {submitted && (
              <div className="text-xs font-mono text-white bg-white/[0.08] border border-white/30 rounded-xl px-3.5 py-2.5">
                {isTr
                  ? "Talebiniz alındı ve anlık bildirim olarak iletildi. En kısa sürede dönüş yapılacaktır."
                  : "Inquiry received and routed instantly. We will get back to you shortly."}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-mono text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {submitting
                  ? isTr
                    ? "İletiliyor..."
                    : "Sending..."
                  : isTr
                    ? "Sponsorluk Talebini Gönder"
                    : "Submit Partnership Inquiry"}
              </span>
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
