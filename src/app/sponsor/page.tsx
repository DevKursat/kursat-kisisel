"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Cpu,
  Gamepad2,
  Globe2,
  Layers,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Spotlight } from "@/components/core/spotlight";
import opsSnapshot from "@/data/opsSnapshot.json";

const TIER_OPTIONS_TR = [
  "Sponsorluk: Tekil Yayın ($450-$750)",
  "Sponsorluk: Teknik Benchmark Otopsisi ($950-$1800)",
  "Stratejik Kredi / API / Oyun Ar-Ge Partnerliği (Gemini / Kimi / Cloud)",
  "Aylık Kategori Partnerliği ($2500/ay)",
];

const TIER_OPTIONS_EN = [
  "Sponsorship: Single-Dispatch Partner ($450-$750)",
  "Sponsorship: Deep-Dive Engineering Teardown ($950-$1800)",
  "Strategic API / GPU / Game-Dev R&D Credit Grant (Gemini / Kimi / Cloud)",
  "Monthly Category Partner ($2500/mo)",
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
          ? "Lütfen adınızı, kurumsal e-postanızı ve işbirliği mesajınızı girin."
          : "Please enter your name/company, work email, and collaboration brief."
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
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }
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

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-emerald-500/30">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-black/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isTr ? "Ana Sayfa" : "Home"}</span>
          </Link>

          <Link
            href="/blog"
            className="font-archivo font-[800] text-sm tracking-tight text-white uppercase"
          >
            KÜRŞAT YILMAZ • MEDIA KIT
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-[11px] font-mono text-zinc-200 transition-colors cursor-pointer"
            >
              {isTr ? "EN" : "TR"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-16">
        {/* Section 1: Executive Authority Hero & Live Telemetry Banner */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono uppercase tracking-widest text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isTr
                  ? "CANLI TELEMETRİLİ MEDYA KİTİ & AR-GE PARTNERLİĞİ"
                  : "LIVE TELEMETRY MEDIA KIT & R&D PARTNERSHIPS"}
              </span>
            </div>

            <h1 className="font-archivo font-[800] text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-[1.08]">
              {isTr
                ? "Mühendislik Otoritesi & Küresel AI Dağıtım Ağı"
                : "Engineering Authority & Global AI Distribution Network"}
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
              {isTr
                ? "Reklam kokan içerikler değil; 127.4K+ zirve tekil erişim kanıtlı derin mimari analizler, birim ekonomi kıyasları ve 4 dilde kalıcı AI arama indeksi. Nakit sponsorlukların yanı sıra aktif AI ajanları ve oyun geliştirme projelerimiz için stratejik API / Cloud GPU kredi partnerlikleri."
                : "No generic hype. Proven architectural breakdowns up to 127.4K single-dispatch reach, unit-economics teardowns, and 4-language permanent AI search indexing—plus strategic API & Cloud GPU credit partnerships powering our autonomous agents and game-dev pipelines."}
            </p>
          </div>

          {/* 4 Big Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0f] p-5">
              <Spotlight size={240} />
              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                  {isTr ? "TEKLİ GÖNDERİ ZİRVE" : "PEAK SINGLE DISPATCH"}
                </span>
                <div className="font-archivo font-[800] text-3xl text-white">
                  {Number(authority.peakLinkedInImpressions).toLocaleString("en-US")}
                </div>
                <p className="text-xs text-zinc-400">
                  {isTr
                    ? "LinkedIn amiral gemisi gösterim rekoru"
                    : "Verified peak single-post LinkedIn impressions"}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0f] p-5">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
                  {isTr ? "TOP 3 ORTALAMASI" : "TOP-3 FLAGSHIP AVG"}
                </span>
                <div className="font-archivo font-[800] text-3xl text-white">
                  {Number(authority.top3FlagshipAvgImpressions).toLocaleString("en-US")}
                </div>
                <p className="text-xs text-zinc-400">
                  {isTr
                    ? "Zirve 3 analizin ortalama tekil erişimi"
                    : "Average reach across top 3 flagship analyses"}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0f] p-5">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">
                  {isTr ? "EKOSİSTEM ERİŞİMİ" : "CUMULATIVE REACH"}
                </span>
                <div className="font-archivo font-[800] text-3xl text-white">
                  {(Math.floor(Number(authority.cumulativeEcosystemReach) / 1000) || 321)}K+
                </div>
                <p className="text-xs text-zinc-400">
                  {isTr
                    ? "11 kanal · 4 dil (TR/EN/DE/ES) + /llms-full.txt"
                    : "11 channels · 4 languages + GEO/AEO index"}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0f] p-5">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                  {isTr ? "HEDEF KİTLE PROFİLİ" : "AUDIENCE SENIORITY"}
                </span>
                <div className="font-archivo font-[800] text-3xl text-white">78%</div>
                <p className="text-xs text-zinc-400">
                  {isTr
                    ? "Kıdemli Mühendis, CTO, Kurucu & Oyun Geliştirici"
                    : "Senior Engineers, AI Architects, CTOs & Founders"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Proven High-Impact Case Studies (Sorted Highest First) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isTr
                    ? "KANITLANMIŞ ERİŞİM KAYITLARI (YÜKSEKTEN DÜŞÜĞE)"
                    : "VERIFIED DISPATCH LOGS (HIGHEST REACH FIRST)"}
                </span>
              </div>
              <h2 className="font-archivo font-[800] text-2xl sm:text-3xl text-white">
                {isTr ? "En Yüksek Erişimli Vaka Analizleri" : "Top Performing Case Studies"}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">
              {isTr ? "Kaynak: opsSnapshot.json canlı telemetri" : "Source: live opsSnapshot.json telemetry"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topDispatches.map((item: any, idx: number) => (
              <motion.div
                key={`${item.date}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-[#0b0b0f] p-5 flex flex-col justify-between gap-4 hover:border-white/25 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
                    <span>{item.date}</span>
                    <span className="px-2 py-0.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
                      VSE {item.vse ?? "—"}/100
                    </span>
                  </div>
                  <h3 className="font-archivo font-[700] text-base sm:text-lg text-white leading-snug">
                    {item.topic}
                  </h3>
                  {item.notes && (
                    <p className="text-xs text-zinc-400 line-clamp-2">{item.notes}</p>
                  )}
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-white font-bold text-base">
                      {Number(item.impressions).toLocaleString("en-US")}
                    </span>{" "}
                    <span className="text-zinc-500">
                      {isTr ? "görüntüleme" : "impressions"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {typeof item.comments === "number" && (
                      <span className="text-zinc-400">
                        {item.comments} {isTr ? "yorum" : "comments"}
                      </span>
                    )}
                    {item.slug && (
                      <Link
                        href={`/blog/${item.slug}`}
                        className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                      >
                        <span>{isTr ? "Oku" : "Read"}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Hybrid Cash + API/GPU/Game-Dev Credit Tiers */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {isTr
                  ? "NAKİT & API / GPU KREDİ HİBRİT MODELİ"
                  : "CASH & API/GPU CREDIT HYBRID TIERS"}
              </span>
            </div>
            <h2 className="font-archivo font-[800] text-2xl sm:text-3xl text-white">
              {isTr ? "Sponsorluk & Stratejik Partnerlik Paketleri" : "Sponsorship & Partnership Packages"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Tier 1 */}
            <div className="rounded-2xl border border-white/12 bg-[#0b0b0f] p-6 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  {isTr ? "PAKET 01 · HIZLI LANSMAN" : "TIER 01 · LAUNCH PARTNER"}
                </div>
                <h3 className="font-archivo font-[800] text-xl text-white">
                  {isTr ? "Tekil Amiral Gemisi Entegrasyonu" : "Single-Dispatch Launch Partner"}
                </h3>
                <div>
                  <div className="font-archivo font-[800] text-3xl text-white">$450 – $750</div>
                  <div className="text-xs font-mono text-emerald-400 mt-1">
                    {isTr
                      ? "veya eşdeğer $1,500+ API / Cloud GPU Kredisi"
                      : "or equivalent $1,500+ API / Cloud GPU Credits"}
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "1 yüksek VSE'li LinkedIn analizi altında kurumsal/teknik ortak vurgusu"
                        : "1 high-VSE LinkedIn flagship dispatch attribution & technical highlight"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "kursat.itibar.app üzerinde 4 dilli (TR/EN/DE/ES) kalıcı makale sponsor kartı"
                        : "4-language (TR/EN/DE/ES) permanent sponsor card inside kursat.itibar.app"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "DEV.to, X (@DevKursat) ve RSS/daily.dev üzerinden çapraz dağıtım"
                        : "Cross-syndication via DEV.to, X (@DevKursat), and RSS/daily.dev"}
                    </span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleSelectPackage(0)}
                className="w-full py-3 px-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black font-mono text-xs font-semibold transition-all cursor-pointer"
              >
                {isTr ? "Bu Paketi Seç" : "Select Launch Package"}
              </button>
            </div>

            {/* Tier 2 Featured */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-[#0d1112] p-6 flex flex-col justify-between gap-6">
              <Spotlight size={320} />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                  {isTr ? "EN ÇOK TERCİH EDİLEN" : "MOST POPULAR"}
                </div>
                <h3 className="font-archivo font-[800] text-xl text-white">
                  {isTr ? "Derin Teknik Benchmark & Ürün Otopsisi" : "Deep-Dive Engineering Teardown"}
                </h3>
                <div>
                  <div className="font-archivo font-[800] text-3xl text-white">$950 – $1,800</div>
                  <div className="text-xs font-mono text-emerald-400 mt-1">
                    {isTr
                      ? "veya $3,000+ Frontier AI / Game-Dev Pro Kredi Paketi"
                      : "or $3,000+ Frontier AI / Game-Dev Pro Credit Grant"}
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-200">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "Model/API veya oyun AI motorunuzun gerçek üretim ve oyun iş yüklerinde canlı testi"
                        : "Hands-on production & game-dev workload testing of your model, API, or engine"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "500–850 kelimelik 4 dilli benchmark makalesi + /llms-full.txt AI arama indeksi"
                        : "500–850 word 4-language benchmark article + /llms-full.txt AI search citation"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "LinkedIn ana yayın + X thread + DEV.to + Reddit (organic tech breakdown)"
                        : "LinkedIn flagship + X thread + DEV.to + native technical community discussion"}
                    </span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleSelectPackage(1)}
                className="relative z-10 w-full py-3 px-4 rounded-xl bg-white text-black hover:bg-emerald-300 font-mono text-xs font-bold transition-all cursor-pointer"
              >
                {isTr ? "Benchmark Paketiyle Başvur" : "Book Deep-Dive Teardown"}
              </button>
            </div>

            {/* Tier 3 */}
            <div className="rounded-2xl border border-white/12 bg-[#0b0b0f] p-6 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  {isTr ? "PAKET 03 · KATEGORİ TEKELİ" : "TIER 03 · R&D RETAINER"}
                </div>
                <h3 className="font-archivo font-[800] text-xl text-white">
                  {isTr ? "Aylık Stratejik Ekosistem & Ar-Ge Partneri" : "Monthly Category Exclusivity & R&D"}
                </h3>
                <div>
                  <div className="font-archivo font-[800] text-3xl text-white">$2,500 / {isTr ? "ay" : "mo"}</div>
                  <div className="text-xs font-mono text-emerald-400 mt-1">
                    {isTr
                      ? "veya Kurumsal Bulut/GPU Hibesi + Bölgesel DevRel Partnerliği"
                      : "or Enterprise Cloud/GPU Grant + Regional DevRel Ambassadorship"}
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "Ay boyunca 4 ana yayında tam kategori tekeli ve rakipsiz konumlandırma"
                        : "Full category exclusivity across 4 monthly flagship technical dispatches"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "Tüm /blog/* sayfalarının altında kalıcı partner rozeti & yönlendirme"
                        : "Persistent partner attribution across every /blog/* article footer"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isTr
                        ? "Aktif otonom ajanlar + oyun projelerimizde resmi altyapı kullanımı ('Powered by')"
                        : "Official infrastructure integration ('Powered by') in active agent & game builds"}
                    </span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleSelectPackage(3)}
                className="w-full py-3 px-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black font-mono text-xs font-semibold transition-all cursor-pointer"
              >
                {isTr ? "Aylık Partnerlik Görüş" : "Discuss Monthly Retainer"}
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Special Call for Frontier AI, Cloud & Game-Dev AI Labs */}
        <section className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0e1217] via-[#0b0b0f] to-[#120d14] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-purple-300">
                <Cpu className="w-4 h-4" />
                <span>
                  {isTr
                    ? "ÖZEL ÇAĞRI: FRONTIER AI, BULUT & OYUN YAPAY ZEKASI LABORATUVARLARI"
                    : "SPECIAL TRACK: FRONTIER AI, CLOUD & GAME-DEV AI LABS"}
                </span>
              </div>
              <h2 className="font-archivo font-[800] text-2xl sm:text-3xl text-white">
                {isTr
                  ? "Google Gemini Türkiye, Kimi (Moonshot AI) & Oyun Geliştirme Partnerliği"
                  : "Google Gemini, Kimi (Moonshot AI) & Game-Dev AI Partnerships"}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPackage(2)}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-500/20 border border-purple-400/40 hover:bg-purple-500/30 text-xs font-mono font-semibold text-purple-100 transition-colors cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>{isTr ? "API / Oyun Kredisi Teklif Et" : "Propose API / Game-Dev Grant"}</span>
            </button>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {isTr
              ? "itibar.app, unutma.app ve çoklu ajan sistemlerinin yanında şu an aktif oyun ve etkileşimli 3D/NPC projeleri de geliştiriyoruz. Google Cloud / Vertex AI, Moonshot AI (Kimi), OpenRouter, Fal.ai, Meshy, Inworld veya ElevenLabs gibi ekipler için en verimli model: API Token Hibesi, Erken Erişim Sandbox ve Cloud GPU Kredisi karşılığında şeffaf üretim benchmark'ları ve 4 dilli mühendislik vaka analizleri üretmek."
              : "Alongside production multi-agent systems (itibar.app, unutma.app), we are actively shipping interactive games and 3D/NPC pipelines. For teams at Google Gemini / Cloud, Moonshot AI (Kimi), OpenRouter, Fal.ai, Meshy, Inworld, or ElevenLabs, we offer API Token Grants & GPU Credit partnerships backed by transparent engineering benchmarks across 4 languages."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-1">
              <div className="text-emerald-300 font-semibold flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Google Gemini / Vertex AI</span>
              </div>
              <p className="text-zinc-400 font-sans">
                {isTr
                  ? "Gemini 4 & Antigravity harness testleri, Google for Startups bulut kredisi ve Türkiye DevRel görünürlüğü."
                  : "Gemini 4 & agent harness benchmarks, cloud compute grants, and regional developer adoption."}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-1">
              <div className="text-blue-300 font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Moonshot AI (Kimi) & Açık Ağırlıklar</span>
              </div>
              <p className="text-zinc-400 font-sans">
                {isTr
                  ? "Uzun bağlam kodlama ve oyun içi ajan orkestrasyonunda Kimi API token hibesi karşılığı bağımsız birim ekonomi kıyası."
                  : "Long-context coding & game-agent orchestration teardowns backed by Kimi API token grants."}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-1">
              <div className="text-purple-300 font-semibold flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>{isTr ? "Oyun & Medya AI Araçları" : "Game-Dev & 3D AI Stack"}</span>
              </div>
              <p className="text-zinc-400 font-sans">
                {isTr
                  ? "3D asset, NPC diyalog ve gerçek zamanlı ses motorlarının canlı oyun geliştirme günlüklerinde sergilenmesi."
                  : "Real-world showcase of 3D asset, NPC dialogue, and voice pipelines inside active game builds."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Direct Sponsorship & Partnership Application Form */}
        <section
          id="sponsor-form"
          className="rounded-3xl border border-white/15 bg-[#0b0b0f] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{isTr ? "DOĞRUDAN İLETİŞİM HATTI" : "DIRECT PARTNER DESK"}</span>
            </div>
            <h2 className="font-archivo font-[800] text-2xl sm:text-3xl text-white">
              {isTr ? "Partnerlik Başvurusu Başlat" : "Start a Sponsorship Inquiry"}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {isTr
                ? "Formu doldurduğunuz anda teklifiniz doğrudan Telegram ve kurumsal posta kutuma (kursat@itibar.app) anlık bildirim olarak düşer. Ortalama dönüş süresi 4 saattir."
                : "Submissions trigger an instant alert directly to my desk (Telegram + kursat@itibar.app). Typical response time is under 4 hours."}
            </p>

            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/12 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>kursat@itibar.app</span>
                </span>
                <span className="text-zinc-400">
                  {copiedEmail ? (isTr ? "Kopyalandı ✓" : "Copied ✓") : (isTr ? "Kopyala" : "Copy")}
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  {isTr ? "İsim / Şirket" : "Name / Company"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isTr ? "Örn. Ahmet Yılmaz — X Cloud" : "e.g. Alex Chen — Cloud Corp"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/70 text-sm text-white focus:outline-none focus:border-emerald-400"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400"
                required
              />
            </div>

            {errorMsg && (
              <div className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-3.5 py-2.5">
                {errorMsg}
              </div>
            )}

            {submitted && (
              <div className="text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3.5 py-2.5">
                {isTr
                  ? "✅ Talebiniz alındı ve anlık bildirim olarak iletildi! En kısa sürede dönüş yapılacaktır."
                  : "✅ Inquiry received and routed instantly! We will get back to you shortly."}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black hover:bg-emerald-300 font-mono text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
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
