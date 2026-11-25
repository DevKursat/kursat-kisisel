"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Calculator,
  Check,
  CheckSquare,
  Copy,
  Cpu,
  Download,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Square,
} from "lucide-react";
import { Spotlight } from "@/components/core/spotlight";
import NewsletterSignupBox from "@/components/NewsletterSignupBox";
import { LinkedinIcon, TwitterXIcon } from "@/components/Icons";

type ToolTab = "vram" | "agents" | "checklist";
type UiLang = "tr" | "en";

interface ModelPreset {
  id: string;
  label: string;
  totalParamsB: number;
  kvBytesPerTokenFp16: number; // bytes per token for KV cache at FP16
}

const MODELS: ModelPreset[] = [
  { id: "8b", label: "8B Dense (Llama / Qwen 8B)", totalParamsB: 8, kvBytesPerTokenFp16: 131072 },
  { id: "32b", label: "32B Dense (Qwen / DeepSeek 32B)", totalParamsB: 32.5, kvBytesPerTokenFp16: 262144 },
  { id: "70b", label: "70B Dense (Llama 3.3 70B)", totalParamsB: 70.6, kvBytesPerTokenFp16: 327680 },
  { id: "120b-moe", label: "120B MoE (Active 16B)", totalParamsB: 120, kvBytesPerTokenFp16: 196608 },
];

interface ApiTier {
  id: string;
  labelTr: string;
  labelEn: string;
  inputPerM: number;
  outputPerM: number;
}

const API_TIERS: ApiTier[] = [
  {
    id: "frontier",
    labelTr: "Frontier Kapalı API ($2.50 / $10.00 / 1M)",
    labelEn: "Frontier Closed API ($2.50 / $10.00 per 1M)",
    inputPerM: 2.5,
    outputPerM: 10.0,
  },
  {
    id: "mid",
    labelTr: "Orta Katman Reasoning ($0.80 / $3.20 / 1M)",
    labelEn: "Mid-Tier Reasoning ($0.80 / $3.20 per 1M)",
    inputPerM: 0.8,
    outputPerM: 3.2,
  },
  {
    id: "flash",
    labelTr: "Hızlı / Ucuz API ($0.20 / $0.80 / 1M)",
    labelEn: "Flash / Budget API ($0.20 / $0.80 per 1M)",
    inputPerM: 0.2,
    outputPerM: 0.8,
  },
];

interface GpuNode {
  id: string;
  label: string;
  vramGb: number;
  monthlyUsd: number;
  tokPerSec8B: number;
}

const GPU_NODES: GpuNode[] = [
  { id: "rtx5090", label: "1x RTX 5090 (32 GB Bare-Metal)", vramGb: 32, monthlyUsd: 290, tokPerSec8B: 190 },
  { id: "dual5090", label: "2x RTX 5090 (64 GB Bare-Metal)", vramGb: 64, monthlyUsd: 560, tokPerSec8B: 340 },
  { id: "a100-80", label: "1x NVIDIA A100 (80 GB Dedicated)", vramGb: 80, monthlyUsd: 1150, tokPerSec8B: 260 },
  { id: "h100-80", label: "1x NVIDIA H100 (80 GB SXM)", vramGb: 80, monthlyUsd: 1890, tokPerSec8B: 520 },
  { id: "dual-h100", label: "2x NVIDIA H100 (160 GB NVLink)", vramGb: 160, monthlyUsd: 3750, tokPerSec8B: 960 },
];

const CHECKLIST_SECTIONS: Array<{
  id: string;
  titleTr: string;
  titleEn: string;
  items: Array<{ id: string; tr: string; en: string }>;
}> = [
  {
    id: "rls",
    titleTr: "1. Veritabanı & Kiracı İzolasyonu (Zero-Trust)",
    titleEn: "1. Database & Tenant Isolation (Zero-Trust)",
    items: [
      {
        id: "rls_1",
        tr: "Her Postgres/Supabase tablosunda ENABLE ROW LEVEL SECURITY CI hattında otomatik doğrulanıyor",
        en: "Every Postgres/Supabase table enforces ENABLE ROW LEVEL SECURITY verified in CI",
      },
      {
        id: "rls_2",
        tr: "Service-role anahtarları istemci paketlerinden ve genel edge ortam değişkenlerinden tamamen izole",
        en: "Service-role keys are strictly absent from client bundles and public edge env vars",
      },
      {
        id: "rls_3",
        tr: "Kiracı kimliği (tenant_id) asla JSON gövdesinden değil, yalnızca imzalı JWT claim'inden okunuyor",
        en: "Tenant IDs derive exclusively from signed JWT claims, never raw request payloads",
      },
      {
        id: "rls_4",
        tr: "Her PR'da çapraz kiracı (cross-tenant) okuma/yazma sızıntı testi otomatik koşuyor",
        en: "Automated cross-tenant read/write intrusion test runs on every pull request",
      },
      {
        id: "rls_5",
        tr: "RAG / vektör aramalarında model çağrısından önce zorunlu kiracı metadata ön-filtresi var",
        en: "Vector/RAG retrieval enforces strict tenant metadata pre-filtering before inference",
      },
      {
        id: "rls_6",
        tr: "PITR ve çevrimdışı yedekten geri dönüş tatbikatı son 90 gün içinde gerçek ortamda denendi",
        en: "Point-in-time recovery (PITR) and offline restore drill executed within the last 90 days",
      },
    ],
  },
  {
    id: "sandbox",
    titleTr: "2. Otonom Ajan & Araç Sandbox Güvenliği",
    titleEn: "2. Autonomous Agent & Tool Sandbox Hardening",
    items: [
      {
        id: "sb_1",
        tr: "Kod ve kabuk (shell) çalıştıran ajanlar geçici microVM veya yetkisiz konteynerde koşuyor",
        en: "Code/shell tool execution runs inside ephemeral microVMs or unprivileged containers",
      },
      {
        id: "sb_2",
        tr: "Dış ağ çıkışı (egress) yalnızca izinli domain listesine açık; bulut IMDS (169.254.169.254) bloklu",
        en: "Outbound network egress uses a strict allowlist and blocks cloud IMDS (169.254.169.254)",
      },
      {
        id: "sb_3",
        tr: "Statik API anahtarları yerine kısa ömürlü (ephemeral) OIDC / kapsamlı token kullanılıyor",
        en: "Short-lived scoped OIDC/OAuth tokens replace static long-lived bearer secrets",
      },
      {
        id: "sb_4",
        tr: "Dış kaynaktan okunan metinler yazma yetkili araç çağrılarından önce prompt-injection filtresinden geçiyor",
        en: "Untrusted external content cannot trigger write/delete tools without explicit confirmation",
      },
      {
        id: "sb_5",
        tr: "Sonsuz ajan döngülerine karşı sert adım sınırı (maxSteps <= 12) ve çalışma başı dolar tavanı var",
        en: "Hard step ceiling (maxSteps <= 12) and per-run USD circuit breaker prevent runaway loops",
      },
      {
        id: "sb_6",
        tr: "Bağımlılık kilit dosyaları sabitlenmiş; postinstall ve PyPI .pth tedarik zinciri kancaları denetleniyor",
        en: "Dependency lockfiles are pinned and audited against postinstall / PyPI .pth trojans",
      },
    ],
  },
  {
    id: "econ",
    titleTr: "3. Çıkarım Ekonomisi & KV-Cache Disiplini",
    titleEn: "3. Inference Unit Economics & KV-Cache Discipline",
    items: [
      {
        id: "ec_1",
        tr: "Sistem promptu %100 sabit (append-only); dinamik saat/durum ekiyle KV-cache prefix'i bozulmuyor",
        en: "System prompts remain 100% prefix-stable (no dynamic timestamps busting KV-cache hits)",
      },
      {
        id: "ec_2",
        tr: "Kapalı API faturası ile adanmış vLLM / FP8 GPU kümesi arasındaki başabaş noktası ölçüldü",
        en: "Measured exact break-even threshold between serverless APIs and dedicated vLLM GPUs",
      },
      {
        id: "ec_3",
        tr: "Basit sınıflandırma/yönlendirme çağrıları pahalı frontier model yerine 8B/flash katmanına akıyor",
        en: "Routine routing/extraction hits 8B/flash tiers; frontier models handle only escalations",
      },
      {
        id: "ec_4",
        tr: "p99 ilk token süresi (TTFT < 450ms) ve zaman aşımı bütçesi canlı telemetriyle izleniyor",
        en: "p99 TTFT (< 450ms) and token streaming timeouts are tracked in live telemetry",
      },
      {
        id: "ec_5",
        tr: "Uzun geçmişli oturumlarda bağlam budama (context pruning) karesel maliyet patlamasını önlüyor",
        en: "Deterministic context window pruning prevents quadratic multi-turn token bloat",
      },
      {
        id: "ec_6",
        tr: "Gerçek zamanlı olmayan işler %50 indirimli batch kuyruğunda veya boş GPU saatlerinde işleniyor",
        en: "Offline/async jobs run through discounted batch queues or off-peak GPU capacity",
      },
    ],
  },
  {
    id: "sla",
    titleTr: "4. Bulut SLA Gerçekçiliği & Çöküş Dayanıklılığı",
    titleEn: "4. Cloud SLA Realism & Outage Resilience",
    items: [
      {
        id: "sl_1",
        tr: "Birincil LLM sağlayıcısı 429/5xx döndüğünde 1.5 saniye içinde ikincil sağlayıcıya otomatik geçiş var",
        en: "Multi-provider router fails over automatically on HTTP 429/5xx within 1.5 seconds",
      },
      {
        id: "sl_2",
        tr: "Yan etki üreten her araç çağrısı idempotency anahtarıyla çift çalışmaya karşı korumalı",
        en: "Every side-effecting tool mutation is guarded by deterministic idempotency keys",
      },
      {
        id: "sl_3",
        tr: "Tüm AI sağlayıcıları çökse bile kimlik doğrulama, ödeme ve çekirdek ürün akışı ayakta kalıyor",
        en: "Core auth, billing, and read paths survive a total AI provider blackout (degraded mode)",
      },
      {
        id: "sl_4",
        tr: "Acil durum iletişim ve müdahale dokümanları tek bir kurumsal sohbet uygulamasına bağımlı değil",
        en: "Incident response runbooks & comms live outside a single corporate chat monolith",
      },
      {
        id: "sl_5",
        tr: "Üretim öncesi yük testi steril örneklerle değil, gerçekçi bağlam boyutu ve ani trafikle yapıldı",
        en: "Load testing uses realistic context-length entropy and burst concurrency",
      },
      {
        id: "sl_6",
        tr: "Aktif kullanıcı başı AI maliyeti brüt kâr marjıyla birlikte haftalık olarak takip ediliyor",
        en: "AI inference cost per active tenant is tracked weekly against gross margin",
      },
    ],
  },
];

export default function ToolsHubClient() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<UiLang>("tr");
  const [activeTab, setActiveTab] = useState<ToolTab>("vram");
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Tool 1: VRAM & Break-Even State
  const [modelId, setModelId] = useState("32b");
  const [quant, setQuant] = useState<"fp16" | "fp8" | "int4">("fp8");
  const [dailyRequests, setDailyRequests] = useState(25000);
  const [avgInputTok, setAvgInputTok] = useState(1800);
  const [avgOutputTok, setAvgOutputTok] = useState(450);
  const [concurrency, setConcurrency] = useState(16);
  const [contextLen, setContextLen] = useState(8192);
  const [apiTierId, setApiTierId] = useState("frontier");
  const [gpuNodeId, setGpuNodeId] = useState("a100-80");

  // Tool 2: Multi-Agent Reliability State
  const [stepReliability, setStepReliability] = useState(97.5);
  const [chainSteps, setChainSteps] = useState(12);
  const [dailyRuns, setDailyRuns] = useState(5000);
  const [prefixTokens, setPrefixTokens] = useState(6500);
  const [bustsKvCache, setBustsKvCache] = useState(true);

  // Tool 3: 24-Point Audit Checklist
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const qTab = searchParams.get("tab");
    if (qTab === "vram" || qTab === "agents" || qTab === "checklist") {
      setActiveTab(qTab);
    }
    const qLang = searchParams.get("lang");
    if (qLang === "en" || qLang === "tr") {
      setLang(qLang);
    } else if (typeof navigator !== "undefined") {
      setLang(navigator.language?.toLowerCase().startsWith("tr") ? "tr" : "en");
    }

    const qReqs = Number(searchParams.get("reqs"));
    if (Number.isFinite(qReqs) && qReqs >= 100) setDailyRequests(qReqs);
    const qModel = searchParams.get("model");
    if (qModel && MODELS.some((m) => m.id === qModel)) setModelId(qModel);
    const qSteps = Number(searchParams.get("steps"));
    if (Number.isFinite(qSteps) && qSteps >= 1 && qSteps <= 50) setChainSteps(qSteps);
    const qRel = Number(searchParams.get("rel"));
    if (Number.isFinite(qRel) && qRel >= 80 && qRel <= 99.9) setStepReliability(qRel);

    try {
      const savedChecks = localStorage.getItem("ky_prod_ai_audit_v1");
      if (savedChecks) setCheckedIds(JSON.parse(savedChecks));
    } catch {}
  }, [searchParams]);

  const isTr = lang === "tr";

  // --- TOOL 1 CALCULATIONS ---
  const vramCalc = useMemo(() => {
    const model = MODELS.find((m) => m.id === modelId) ?? MODELS[1];
    const api = API_TIERS.find((a) => a.id === apiTierId) ?? API_TIERS[0];
    const gpu = GPU_NODES.find((g) => g.id === gpuNodeId) ?? GPU_NODES[2];

    const bytesPerParam = quant === "fp16" ? 2.0 : quant === "fp8" ? 1.0 : 0.55;
    const kvScale = quant === "fp16" ? 1.0 : 0.5; // FP8 KV cache halves KV footprint

    const weightsGb = model.totalParamsB * bytesPerParam * 1.08; // +8% CUDA/activation overhead
    const kvCacheGb =
      (concurrency * contextLen * model.kvBytesPerTokenFp16 * kvScale) /
      (1024 * 1024 * 1024);
    const runtimeOverheadGb = 2.2;
    const totalVramGb = +(weightsGb + kvCacheGb + runtimeOverheadGb).toFixed(1);

    const fitsSelectedGpu = totalVramGb <= gpu.vramGb;
    const recommendedGpu =
      GPU_NODES.find((g) => g.vramGb >= totalVramGb) ??
      GPU_NODES[GPU_NODES.length - 1];
    const nodesNeeded = Math.max(1, Math.ceil(totalVramGb / gpu.vramGb));
    const effectiveGpuMonthly = gpu.monthlyUsd * nodesNeeded;

    const monthlyInputM = (dailyRequests * avgInputTok * 30) / 1_000_000;
    const monthlyOutputM = (dailyRequests * avgOutputTok * 30) / 1_000_000;
    const monthlyTotalTokensM = +(monthlyInputM + monthlyOutputM).toFixed(1);

    const monthlyApiUsd = Math.round(
      monthlyInputM * api.inputPerM + monthlyOutputM * api.outputPerM
    );
    const monthlyDeltaUsd = monthlyApiUsd - effectiveGpuMonthly;
    const annualDeltaUsd = monthlyDeltaUsd * 12;
    const breakEvenDays =
      monthlyApiUsd > 0
        ? Math.max(1, Math.round((effectiveGpuMonthly / monthlyApiUsd) * 30))
        : 999;

    return {
      model,
      api,
      gpu,
      weightsGb: +weightsGb.toFixed(1),
      kvCacheGb: +kvCacheGb.toFixed(1),
      totalVramGb,
      fitsSelectedGpu,
      recommendedGpu,
      nodesNeeded,
      effectiveGpuMonthly,
      monthlyTotalTokensM,
      monthlyApiUsd,
      monthlyDeltaUsd,
      annualDeltaUsd,
      breakEvenDays,
    };
  }, [
    modelId,
    quant,
    dailyRequests,
    avgInputTok,
    avgOutputTok,
    concurrency,
    contextLen,
    apiTierId,
    gpuNodeId,
  ]);

  // --- TOOL 2 CALCULATIONS ---
  const agentCalc = useMemo(() => {
    const p = stepReliability / 100;
    const survivalProb = Math.pow(p, chainSteps);
    const survivalPct = +(survivalProb * 100).toFixed(1);
    const failedPer1000 = Math.round((1 - survivalProb) * 1000);

    // Token cost comparison: stable prefix cache (90% discount on prefix) vs busted KV prefix (full price every turn + retries)
    const inputPricePerM = 2.5; // Frontier reference
    const monthlyTurns = dailyRuns * chainSteps * 30;
    const totalPrefixM = (monthlyTurns * prefixTokens) / 1_000_000;

    const cachedMonthlyUsd = Math.round(totalPrefixM * (inputPricePerM * 0.18));
    const retryOverheadFactor = 1 + (1 - survivalProb) * 0.65;
    const bustedMonthlyUsd = Math.round(
      totalPrefixM * inputPricePerM * retryOverheadFactor
    );
    const monthlyTaxUsd = Math.max(0, bustedMonthlyUsd - cachedMonthlyUsd);

    return {
      survivalPct,
      failedPer1000,
      cachedMonthlyUsd,
      bustedMonthlyUsd,
      monthlyTaxUsd,
    };
  }, [stepReliability, chainSteps, dailyRuns, prefixTokens]);

  // --- TOOL 3 CALCULATIONS ---
  const totalChecklistItems = 24;
  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const readinessScore = Math.round((checkedCount / totalChecklistItems) * 100);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("ky_prod_ai_audit_v1", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const sharePermalink = useMemo(() => {
    const base = "https://kursat.itibar.app/tools";
    if (activeTab === "vram") {
      return `${base}?tab=vram&model=${modelId}&reqs=${dailyRequests}&lang=${lang}`;
    }
    if (activeTab === "agents") {
      return `${base}?tab=agents&steps=${chainSteps}&rel=${stepReliability}&lang=${lang}`;
    }
    return `${base}?tab=checklist&lang=${lang}`;
  }, [activeTab, modelId, dailyRequests, chainSteps, stepReliability, lang]);

  const shareSummaryText = useMemo(() => {
    if (activeTab === "vram") {
      return isTr
        ? `${vramCalc.monthlyTotalTokensM}M token/ay iş yükünde Kapalı API faturası $${vramCalc.monthlyApiUsd.toLocaleString("en-US")}/ay iken bare-metal vLLM (${vramCalc.totalVramGb} GB VRAM) $${vramCalc.effectiveGpuMonthly.toLocaleString("en-US")}/ay tutuyor. Kendi başabaş noktanızı ölçün — @DevKursat`
        : `At ${vramCalc.monthlyTotalTokensM}M tokens/mo, serverless APIs burn $${vramCalc.monthlyApiUsd.toLocaleString("en-US")}/mo vs $${vramCalc.effectiveGpuMonthly.toLocaleString("en-US")}/mo on dedicated vLLM (${vramCalc.totalVramGb} GB VRAM). Run your own break-even math — @DevKursat`;
    }
    if (activeTab === "agents") {
      return isTr
        ? `Tek adımda %${stepReliability} çalışan bir AI ajanı, ${chainSteps} adımlık otonom zincirde %${agentCalc.survivalPct} başarıya düşüyor (1.000 çalışmada ${agentCalc.failedPer1000} çöküş). — @DevKursat`
        : `A ${stepReliability}% reliable LLM step drops to ${agentCalc.survivalPct}% end-to-end survival across a ${chainSteps}-step agent loop (${agentCalc.failedPer1000}/1,000 failed runs). — @DevKursat`;
    }
    return isTr
      ? `24 Maddelik Production AI Güvenlik, RLS & Maliyet Denetiminden %${readinessScore} puan aldım. Kendi mimarinizi test edin — @DevKursat`
      : `Scored ${readinessScore}/100 on the 24-Point Production AI Security, RLS & Unit-Economics Audit. Test your stack — @DevKursat`;
  }, [
    activeTab,
    isTr,
    vramCalc,
    stepReliability,
    chainSteps,
    agentCalc,
    readinessScore,
  ]);

  const handleCopyPermalink = async () => {
    try {
      await navigator.clipboard.writeText(sharePermalink);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {}
  };

  const handleExportAuditReport = () => {
    const lines: string[] = [
      `# Production AI Architecture Audit Report (${readinessScore}/100)`,
      `Generated via: https://kursat.itibar.app/tools?tab=checklist`,
      "",
    ];
    for (const sec of CHECKLIST_SECTIONS) {
      lines.push(`## ${isTr ? sec.titleTr : sec.titleEn}`);
      for (const item of sec.items) {
        const mark = checkedIds[item.id] ? "x" : " ";
        lines.push(`- [${mark}] ${isTr ? item.tr : item.en}`);
      }
      lines.push("");
    }
    const blob = new Blob([lines.join("\n")], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `production-ai-audit-${readinessScore}pct.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Sticky Top Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#000000]/85 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>{isTr ? "Ana Sayfa" : "Home"}</span>
            </Link>
            <Link
              href="/blog"
              className="hidden sm:inline-flex text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              {isTr ? "Teknik Günlük" : "Journal"}
            </Link>
          </div>

          <Link
            href="/"
            className="font-archivo font-[800] text-sm tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            KÜRŞAT YILMAZ <span className="text-zinc-500 font-mono font-normal">// LAB</span>
          </Link>

          <button
            type="button"
            onClick={() => setLang((l) => (l === "tr" ? "en" : "tr"))}
            className="px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
          >
            {isTr ? "EN" : "TR"}
          </button>
        </div>
      </nav>

      <div className="pt-24 sm:pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Hero Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono uppercase tracking-widest text-emerald-300">
            <Calculator className="w-3.5 h-3.5" />
            <span>
              {isTr
                ? "ÜCRETSİZ MÜHENDİSLİK LABORATUVARI // SIFIR PAZARLAMA MASALI"
                : "FREE PRODUCTION ENGINEERING LAB // ZERO VENDOR FLUFF"}
            </span>
          </div>

          <h1 className="font-archivo font-[800] text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-[1.08]">
            {isTr
              ? "Bulut Faturasını ve Ajan Çöküşünü Matematiğe Dökün."
              : "Audit Your Inference Economics & Agent Failure Math."}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-lg max-w-3xl leading-relaxed">
            {isTr
              ? "Kapalı API'lerin ne zaman bare-metal vLLM karşısında zarar yazdığını, KV-cache VRAM sınırını ve çok adımlı ajanların üretimde neden çöktüğünü gerçek sayılarla simüle edin."
              : "Calculate the exact break-even point between serverless LLM APIs and dedicated vLLM GPUs, size KV-cache VRAM without OOM surprises, and model p^N multi-agent failure compounding."}
          </p>

          {/* 3-Tool Switcher */}
          <div className="pt-2 flex flex-wrap gap-2">
            {(
              [
                {
                  id: "vram" as const,
                  icon: <Cpu className="w-3.5 h-3.5" />,
                  tr: "1. API vs. Bare-Metal GPU & VRAM",
                  en: "1. API vs. Bare-Metal GPU & VRAM",
                },
                {
                  id: "agents" as const,
                  icon: <GitBranch className="w-3.5 h-3.5" />,
                  tr: "2. Çoklu Ajan (p^N) & KV-Cache Vergisi",
                  en: "2. Multi-Agent (p^N) & KV-Cache Tax",
                },
                {
                  id: "checklist" as const,
                  icon: <ShieldCheck className="w-3.5 h-3.5" />,
                  tr: `3. 24-Madde Production Denetimi (%${readinessScore})`,
                  en: `3. 24-Point Production Audit (${readinessScore}%)`,
                },
              ] as const
            ).map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                    active
                      ? "border-white bg-white text-black font-bold shadow-lg"
                      : "border-white/12 bg-white/[0.03] text-zinc-300 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  <span>{isTr ? tab.tr : tab.en}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* ========================================================= */}
        {/* TAB 1: LLM API VS BARE-METAL GPU & VRAM CALCULATOR        */}
        {/* ========================================================= */}
        {activeTab === "vram" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls Column */}
            <div className="lg:col-span-7 rounded-2xl border border-white/12 bg-[#0b0b0f] p-5 sm:p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {isTr ? "İŞ YÜKÜ & SİLİKON PARAMETRELERİ" : "WORKLOAD & SILICON PARAMETERS"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "MVP", reqs: 3000, model: "8b", gpu: "rtx5090" },
                    { label: "Scale-Up", reqs: 35000, model: "32b", gpu: "a100-80" },
                    { label: "Enterprise", reqs: 160000, model: "70b", gpu: "dual-h100" },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setDailyRequests(p.reqs);
                        setModelId(p.model);
                        setGpuNodeId(p.gpu);
                      }}
                      className="px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black text-[11px] font-mono text-zinc-300 transition-colors cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-mono text-zinc-400">
                    {isTr ? "Açık Ağırlık Model Boyutu" : "Open-Weight Model Size"}
                  </span>
                  <select
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    className="w-full h-11 rounded-xl border border-white/15 bg-black px-3 text-xs sm:text-sm font-mono text-white"
                  >
                    {MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5 block">
                  <span className="text-xs font-mono text-zinc-400">
                    {isTr ? "Kuantizasyon / Hassasiyet" : "Quantization Precision"}
                  </span>
                  <select
                    value={quant}
                    onChange={(e) =>
                      setQuant(e.target.value as "fp16" | "fp8" | "int4")
                    }
                    className="w-full h-11 rounded-xl border border-white/15 bg-black px-3 text-xs sm:text-sm font-mono text-white"
                  >
                    <option value="fp16">BF16 / FP16 (2.0 B/param)</option>
                    <option value="fp8">FP8 vLLM Production (1.0 B/param)</option>
                    <option value="int4">INT4 AWQ / GPTQ (0.55 B/param)</option>
                  </select>
                </label>

                <label className="space-y-1.5 block">
                  <span className="text-xs font-mono text-zinc-400">
                    {isTr ? "Kıyaslanan Kapalı API" : "Compared Serverless API"}
                  </span>
                  <select
                    value={apiTierId}
                    onChange={(e) => setApiTierId(e.target.value)}
                    className="w-full h-11 rounded-xl border border-white/15 bg-black px-3 text-xs sm:text-sm font-mono text-white"
                  >
                    {API_TIERS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {isTr ? a.labelTr : a.labelEn}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5 block">
                  <span className="text-xs font-mono text-zinc-400">
                    {isTr ? "Hedef Bare-Metal / GPU Sunucu" : "Target Dedicated GPU Node"}
                  </span>
                  <select
                    value={gpuNodeId}
                    onChange={(e) => setGpuNodeId(e.target.value)}
                    className="w-full h-11 rounded-xl border border-white/15 bg-black px-3 text-xs sm:text-sm font-mono text-white"
                  >
                    {GPU_NODES.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label} (${g.monthlyUsd}/mo)
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-400">
                      {isTr ? "Günlük İstek Sayısı" : "Daily Requests"}
                    </span>
                    <span className="text-white font-bold tabular-nums">
                      {dailyRequests.toLocaleString("en-US")} / {isTr ? "gün" : "day"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={250000}
                    step={500}
                    value={dailyRequests}
                    onChange={(e) => setDailyRequests(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">
                        {isTr ? "Ort. Girdi Token" : "Avg Input Tokens"}
                      </span>
                      <span className="text-white font-bold tabular-nums">
                        {avgInputTok} tok
                      </span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={16000}
                      step={100}
                      value={avgInputTok}
                      onChange={(e) => setAvgInputTok(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">
                        {isTr ? "Ort. Çıktı Token" : "Avg Output Tokens"}
                      </span>
                      <span className="text-white font-bold tabular-nums">
                        {avgOutputTok} tok
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={4000}
                      step={50}
                      value={avgOutputTok}
                      onChange={(e) => setAvgOutputTok(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">
                        {isTr ? "Eşzamanlı Aktif İstek" : "Peak Concurrency"}
                      </span>
                      <span className="text-white font-bold tabular-nums">
                        {concurrency}x
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={128}
                      step={1}
                      value={concurrency}
                      onChange={(e) => setConcurrency(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">
                        {isTr ? "Aktif Bağlam Penceresi" : "Active Context Window"}
                      </span>
                      <span className="text-white font-bold tabular-nums">
                        {contextLen.toLocaleString("en-US")} tok
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2048}
                      max={65536}
                      step={2048}
                      value={contextLen}
                      onChange={(e) => setContextLen(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b10] p-5 sm:p-6 flex flex-col justify-between gap-5">
              <Spotlight size={340} />
              <div className="relative z-10 space-y-5">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isTr ? "CANLI ARBİTRAJ SONUCU" : "LIVE ARBITRAGE VERDICT"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3.5">
                    <span className="block text-[10px] font-mono uppercase text-zinc-500">
                      {isTr ? "AYLIK KAPALI API" : "MONTHLY CLOUD API"}
                    </span>
                    <span className="mt-1 block font-archivo font-[800] text-2xl text-white tabular-nums">
                      ${vramCalc.monthlyApiUsd.toLocaleString("en-US")}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {vramCalc.monthlyTotalTokensM}M tok / {isTr ? "ay" : "mo"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.07] p-3.5">
                    <span className="block text-[10px] font-mono uppercase text-emerald-300">
                      {isTr ? "AYLIK BARE-METAL GPU" : "MONTHLY DEDICATED GPU"}
                    </span>
                    <span className="mt-1 block font-archivo font-[800] text-2xl text-emerald-300 tabular-nums">
                      ${vramCalc.effectiveGpuMonthly.toLocaleString("en-US")}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-300">
                      {vramCalc.nodesNeeded}x {vramCalc.gpu.id.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* VRAM Breakdown */}
                <div className="rounded-xl border border-white/10 bg-black/60 p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">
                      {isTr ? "Gereken Toplam VRAM:" : "Total Required VRAM:"}
                    </span>
                    <span
                      className={`font-bold tabular-nums ${
                        vramCalc.fitsSelectedGpu
                          ? "text-emerald-300"
                          : "text-amber-300"
                      }`}
                    >
                      {vramCalc.totalVramGb} GB /{" "}
                      {vramCalc.gpu.vramGb * vramCalc.nodesNeeded} GB
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400 flex flex-wrap justify-between gap-2">
                    <span>
                      {isTr ? "Ağırlık:" : "Weights:"} {vramCalc.weightsGb} GB
                    </span>
                    <span>KV-Cache: {vramCalc.kvCacheGb} GB</span>
                    <span>CUDA: 2.2 GB</span>
                  </div>

                  {!vramCalc.fitsSelectedGpu && (
                    <div className="flex items-start gap-2 pt-1 text-[11px] font-mono text-amber-300">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>
                        {isTr
                          ? `Tek kart VRAM sınırı aşıldı (${vramCalc.nodesNeeded}x düğüm fiyatlandırıldı veya ${vramCalc.recommendedGpu.label} seçin).`
                          : `Exceeds single-node VRAM (priced as ${vramCalc.nodesNeeded}x nodes, or switch to ${vramCalc.recommendedGpu.label}).`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Verdict Box */}
                <div className="rounded-xl border-l-2 border-emerald-400 bg-white/[0.03] p-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    {isTr ? "MİMARİ HÜKÜM" : "ARCHITECTURAL VERDICT"}
                  </span>
                  {vramCalc.monthlyDeltaUsd > 250 ? (
                    <p className="text-xs sm:text-sm text-zinc-100 leading-relaxed">
                      {isTr
                        ? `Kapalı API her ay fazladan $${vramCalc.monthlyDeltaUsd.toLocaleString("en-US")} (yılda $${vramCalc.annualDeltaUsd.toLocaleString("en-US")}) yakıyor. Adanmış vLLM kümesi ayın ${vramCalc.breakEvenDays}. gününde kendini amorti ediyor.`
                        : `Serverless APIs overcharge you by $${vramCalc.monthlyDeltaUsd.toLocaleString("en-US")}/mo ($${vramCalc.annualDeltaUsd.toLocaleString("en-US")}/yr). Dedicated vLLM breaks even on day ${vramCalc.breakEvenDays} of every month.`}
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                      {isTr
                        ? `Bu trafik hacminde (${vramCalc.monthlyTotalTokensM}M token/ay) bare-metal GPU kiralamak anlamsız. DevOps şovu yapmayın; kapalı API'de kalıp ürünü büyütün.`
                        : `At ${vramCalc.monthlyTotalTokensM}M tokens/mo, running dedicated GPUs burns money on idle silicon. Skip premature DevOps theater and stay on serverless APIs until volume scales.`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MULTI-AGENT (p^N) & KV-CACHE TAX SIMULATOR         */}
        {/* ========================================================= */}
        {activeTab === "agents" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl border border-white/12 bg-[#0b0b0f] p-5 sm:p-6 space-y-5">
              <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 pb-3 border-b border-white/10">
                {isTr
                  ? "OTONOM ZİNCİR & ÖNBELLEK PARAMETRELERİ"
                  : "AUTONOMOUS LOOP & KV-CACHE PARAMETERS"}
              </span>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-400">
                      {isTr
                        ? "Tek Adım Araç Çağırma Başarısı (p)"
                        : "Single-Step Tool Call Accuracy (p)"}
                    </span>
                    <span className="text-white font-bold tabular-nums">
                      %{stepReliability.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={88}
                    max={99.8}
                    step={0.2}
                    value={stepReliability}
                    onChange={(e) => setStepReliability(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-400">
                      {isTr
                        ? "Zincirdeki Otonom Adım Sayısı (N)"
                        : "Sequential Agent Steps per Run (N)"}
                    </span>
                    <span className="text-white font-bold tabular-nums">
                      {chainSteps} {isTr ? "adım" : "steps"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={40}
                    step={1}
                    value={chainSteps}
                    onChange={(e) => setChainSteps(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">
                        {isTr ? "Günlük Ajan Çalıştırma" : "Daily Workflow Runs"}
                      </span>
                      <span className="text-white font-bold tabular-nums">
                        {dailyRuns.toLocaleString("en-US")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={50000}
                      step={200}
                      value={dailyRuns}
                      onChange={(e) => setDailyRuns(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">
                        {isTr
                          ? "Sistem + Araç Şeması Boyutu"
                          : "System + Tool Schema Prefix"}
                      </span>
                      <span className="text-white font-bold tabular-nums">
                        {prefixTokens.toLocaleString("en-US")} tok
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={24000}
                      step={500}
                      value={prefixTokens}
                      onChange={(e) => setPrefixTokens(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setBustsKvCache((v) => !v)}
                    className={`w-full rounded-xl border p-3.5 text-left text-xs font-mono transition-all cursor-pointer ${
                      bustsKvCache
                        ? "border-amber-400/50 bg-amber-500/10 text-amber-200"
                        : "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                    }`}
                  >
                    {bustsKvCache
                      ? isTr
                        ? "⚠️ AKTİF DURUM: Sistem promptuna her turda canlı saat/durum ekleniyor (KV-Cache %100 bozuluyor)"
                        : "⚠️ CURRENT: Mutating system prompt mid-loop with timestamps/state (100% KV-Cache invalidation)"
                      : isTr
                      ? "✅ AKTİF DURUM: Append-Only sabit sistem promptu (%90 Prefix Cache isabeti)"
                      : "✅ CURRENT: Append-Only immutable system prompt (90% Prefix Cache hit rate)"}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b10] p-5 sm:p-6 flex flex-col justify-between gap-5">
              <Spotlight size={340} />
              <div className="relative z-10 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <span className="block text-[10px] font-mono uppercase text-zinc-500">
                      {isTr ? "UÇTAN UCA BAŞARI (p^N)" : "END-TO-END SURVIVAL"}
                    </span>
                    <span
                      className={`mt-1 block font-archivo font-[800] text-3xl tabular-nums ${
                        agentCalc.survivalPct >= 85
                          ? "text-emerald-300"
                          : agentCalc.survivalPct >= 65
                          ? "text-amber-300"
                          : "text-red-400"
                      }`}
                    >
                      %{agentCalc.survivalPct}
                    </span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <span className="block text-[10px] font-mono uppercase text-zinc-500">
                      {isTr ? "1.000 İŞTE ÇÖKEN" : "FAILED PER 1,000 RUNS"}
                    </span>
                    <span className="mt-1 block font-archivo font-[800] text-3xl text-white tabular-nums">
                      {agentCalc.failedPer1000}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/60 p-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">
                      {isTr ? "Sabit Prefix Önbellekli:" : "Prefix-Stable Cached:"}
                    </span>
                    <span className="text-emerald-300 font-bold">
                      ${agentCalc.cachedMonthlyUsd.toLocaleString("en-US")}/mo
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">
                      {isTr ? "Dinamik Prompt + Retry:" : "Mutated Prompt + Retries:"}
                    </span>
                    <span className="text-amber-300 font-bold">
                      ${agentCalc.bustedMonthlyUsd.toLocaleString("en-US")}/mo
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between">
                    <span className="text-zinc-300">
                      {isTr ? "Aylık KV-Cache Vergisi:" : "Monthly Cache-Bust Tax:"}
                    </span>
                    <span className="text-white font-bold">
                      +${agentCalc.monthlyTaxUsd.toLocaleString("en-US")}/mo
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border-l-2 border-emerald-400 bg-white/[0.03] p-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    {isTr ? "MİMARİ REÇETE" : "ARCHITECTURAL FIX"}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {isTr
                      ? `${chainSteps} adımlı serbest bir LLM döngüsü bilişsel mimari değil, zar atmaktır. Durum geçişlerini deterministik koda alın, sistem promptunu dondurun ve araç çağrılarını idempotent hale getirin.`
                      : `A ${chainSteps}-step unconstrained LLM loop isn't cognitive architecture—it's rolling dice in production. Move state transitions into deterministic code, freeze your system prompt prefix, and enforce idempotent tool schemas.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: INTERACTIVE 24-POINT PRODUCTION AI AUDIT           */}
        {/* ========================================================= */}
        {activeTab === "checklist" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/15 bg-[#0b0b10] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                  {isTr
                    ? "CANLI PRODUCTION HAZIRLIK SKORU"
                    : "LIVE PRODUCTION READINESS SCORE"}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-archivo font-[800] text-3xl sm:text-4xl text-white tabular-nums">
                    {readinessScore} / 100
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    ({checkedCount}/{totalChecklistItems}{" "}
                    {isTr ? "madde doğrulandı" : "controls verified"})
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleExportAuditReport}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {isTr ? "Denetim Raporunu İndir (.MD)" : "Export Audit Report (.MD)"}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CHECKLIST_SECTIONS.map((sec) => (
                <div
                  key={sec.id}
                  className="rounded-2xl border border-white/12 bg-[#0b0b0f] p-5 space-y-3.5"
                >
                  <h2 className="font-archivo font-[800] text-base text-white">
                    {isTr ? sec.titleTr : sec.titleEn}
                  </h2>
                  <div className="space-y-2">
                    {sec.items.map((item) => {
                      const done = Boolean(checkedIds[item.id]);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleCheck(item.id)}
                          className={`w-full flex items-start gap-2.5 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                            done
                              ? "border-emerald-500/40 bg-emerald-500/10 text-white"
                              : "border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/25"
                          }`}
                        >
                          {done ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                          )}
                          <span className="text-xs leading-relaxed">
                            {isTr ? item.tr : item.en}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIRAL BENCHMARK SHARE BAR */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/15 bg-[#0a0a0f] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-1 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              {isTr
                ? "EKİBİNLE VEYA AKIŞTA PAYLAŞ"
                : "SHARE YOUR BENCHMARK SNAPSHOT"}
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
              {shareSummaryText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                shareSummaryText
              )}&url=${encodeURIComponent(sharePermalink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold transition-colors"
            >
              <TwitterXIcon className="w-3 h-3" />
              <span>{isTr ? "X'te Paylaş" : "Share on X"}</span>
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                sharePermalink
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white hover:text-black text-xs font-mono text-white transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <button
              type="button"
              onClick={handleCopyPermalink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white hover:text-black text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isTr ? "Kopyalandı" : "Copied"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isTr ? "Hesap Linki" : "Permalink"}</span>
                </>
              )}
            </button>
          </div>
        </motion.section>

        {/* Bottom Lead Magnet + Advisory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <NewsletterSignupBox
            id="tools-newsletter"
            source={`tools-${activeTab}`}
            activeLang={lang}
          />

          <Link
            href="/blog"
            className="rounded-2xl border border-white/12 bg-[#0b0b0f] hover:border-white/30 p-5 flex flex-col justify-between gap-4 transition-all group"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                {isTr ? "DERİN MİMARİ OTOPSİLER // 4 DİL" : "ARCHITECTURAL AUTOPSIES // 4 LANGUAGES"}
              </span>
              <h2 className="font-archivo font-[800] text-lg text-white">
                {isTr
                  ? "Gerçek Üretim Çöküşlerini ve Silikon Arbitrajını Okuyun"
                  : "Read Real Production Post-Mortems & Silicon Arbitrage"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {isTr
                  ? "Bulut SLA kesintileri, tedarik zinciri trojanları ve kapalı model fiyat tuzakları üzerine 500–850 kelimelik kanıtlı analizler."
                  : "500–850 word deep dives into cloud SLA failures, supply-chain trojans, and frontier LLM pricing traps."}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 group-hover:text-white transition-colors">
              <span>{isTr ? "Tüm Analizlere Git" : "Browse All Dispatches"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
