"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Download,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Spotlight } from "@/components/core/spotlight";
import type { BlogLang } from "@/data/blogIndex";

interface NewsletterSignupBoxProps {
  id: string;
  source: string;
  activeLang: BlogLang;
  className?: string;
  delay?: number;
}

const LEAD_MAGNET_COPY: Record<
  BlogLang,
  {
    badge: string;
    title: string;
    desc: string;
    placeholder: string;
    cta: string;
    invalidEmail: string;
    errorGeneric: string;
    unlockedTitle: string;
    unlockedSub: string;
    openInteractive: string;
    downloadMd: string;
  }
> = {
  tr: {
    badge: "ÜCRETSİZ MİMARİ KALKAN + İLK 15 DK ERKEN ERİŞİM",
    title: "24 Maddelik Production AI Güvenlik & Maliyet Kontrol Listesi",
    desc: "Abone olduğunuz anda bare-metal/vLLM maliyet arbitrajı, RLS sınırları ve ajan sandbox denetim matrisi açılır; yeni otopsiler akışa düşmeden ilk 15 dakikada size gelir.",
    placeholder: "ornek@sirket.com",
    cta: "Kilidi Aç",
    invalidEmail: "Geçerli bir e-posta adresi girin.",
    errorGeneric: "Kayıt sırasında hata oluştu, lütfen tekrar deneyin.",
    unlockedTitle: "Erişim Açıldı — İlk 15 Dk Listesindesiniz",
    unlockedSub:
      "24 maddelik Production AI & Bare-Metal denetim matrisini hemen kullanabilirsiniz:",
    openInteractive: "İnteraktif Matrisi Aç",
    downloadMd: ".MD İndir",
  },
  en: {
    badge: "FREE ARCHITECTURE SHIELD + FIRST-15M DISPATCH",
    title: "24-Point Production AI Security & Cost Audit Checklist",
    desc: "Instantly unlock the bare-metal/vLLM unit-economics, RLS isolation, and agent sandbox audit matrix—plus get new autopsies 15 minutes before public feeds.",
    placeholder: "you@company.com",
    cta: "Unlock Free",
    invalidEmail: "Enter a valid email address.",
    errorGeneric: "Could not subscribe right now, please try again.",
    unlockedTitle: "Unlocked — You're on the First-15m Dispatch",
    unlockedSub:
      "Grab your 24-point Production AI & Bare-Metal audit matrix right away:",
    openInteractive: "Open Interactive Audit",
    downloadMd: "Download .MD",
  },
  de: {
    badge: "KOSTENLOSER ARCHITEKTUR-SCHILD + EARLY ACCESS",
    title: "24-Punkte Production-KI Sicherheits- & Kosten-Checkliste",
    desc: "Schalten Sie sofort die Prüfmatrix für Bare-Metal/vLLM-Kosten, RLS-Isolation und Agent-Sandboxing frei — plus neue Analysen 15 Min. vorab.",
    placeholder: "name@firma.de",
    cta: "Freischalten",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    errorGeneric: "Fehler bei der Anmeldung, bitte erneut versuchen.",
    unlockedTitle: "Freigeschaltet — Sie sind im Early-Dispatch",
    unlockedSub:
      "Nutzen Sie direkt die interaktive 24-Punkte Production-KI Prüfmatrix:",
    openInteractive: "Interaktive Matrix öffnen",
    downloadMd: ".MD Laden",
  },
  es: {
    badge: "ESCUDO DE ARQUITECTURA GRATIS + ACCESO ANTICIPADO",
    title: "Checklist de 24 Puntos: Seguridad y Costos IA en Producción",
    desc: "Desbloquea al instante la matriz de auditoría bare-metal/vLLM, aislamiento RLS y sandboxing de agentes, y recibe nuevos análisis 15 min antes.",
    placeholder: "tu@empresa.com",
    cta: "Desbloquear",
    invalidEmail: "Introduce un correo electrónico válido.",
    errorGeneric: "No se pudo completar el registro, inténtalo de nuevo.",
    unlockedTitle: "Desbloqueado — Estás en la Lista Prioritaria",
    unlockedSub:
      "Accede ahora a la matriz de auditoría IA en producción de 24 puntos:",
    openInteractive: "Abrir Matriz Interactiva",
    downloadMd: "Bajar .MD",
  },
};

const CHECKLIST_MARKDOWN = `# Production AI Systems: 24-Point Security, RLS & Unit-Economics Audit
Author: Kürşat Yılmaz (https://kursat.itibar.app/tools?tab=checklist)

## 1. Database & Tenant Isolation (Zero-Trust Boundaries)
- [ ] Every Postgres/Supabase table has \`ENABLE ROW LEVEL SECURITY\` verified in CI
- [ ] Service-role keys are strictly absent from client bundles and edge env vars
- [ ] Tenant IDs derive exclusively from signed JWT claims, never request payloads
- [ ] Automated cross-tenant read/write integration test runs on every PR
- [ ] Vector embeddings / RAG chunks enforce per-tenant metadata pre-filtering
- [ ] Point-in-time recovery (PITR) and offline logical backups tested quarterly

## 2. Autonomous Agent & Tool Sandbox Hardening
- [ ] Code/shell tool execution runs inside ephemeral microVMs or unprivileged containers
- [ ] Outbound network egress restricted via strict domain/IP allowlist (blocks IMDS \`169.254.169.254\`)
- [ ] Ephemeral, short-lived OAuth/OIDC tokens replace static bearer keys
- [ ] Prompt/context ingestion strips untrusted instructions before write-capable tool calls
- [ ] Hard cap on recursive tool-call loops (\`maxSteps <= 12\`) and per-run USD budget
- [ ] Dependency lockfiles (\`bun.lock\` / \`package-lock.json\`) block arbitrary postinstall/\`.pth\` hooks

## 3. Inference Unit Economics & KV-Cache Discipline
- [ ] System prompts are 100% static & append-only (no live timestamps busting KV-cache prefixes)
- [ ] Measured break-even threshold between Serverless APIs and dedicated \`vLLM\` / FP8 GPUs
- [ ] Heavy reasoning models route only on escalated queries; routine classification hits 8B/flash tiers
- [ ] Token streaming timeout & p99 TTFT (< 450ms) alerted via production telemetry
- [ ] Context window pruning / summarization prevents quadratic token cost explosion
- [ ] Batch / async queues handle non-interactive workloads at 50% discount or off-peak GPU slots

## 4. Cloud SLA Realism & Degraded-Mode Resilience
- [ ] Multi-provider LLM router fails over automatically on HTTP 429 / 5xx within 1.5s
- [ ] Idempotency keys guard every external side-effecting tool mutation
- [ ] Critical auth & billing paths survive full AI provider blackout (graceful degraded mode)
- [ ] Incident runbooks live outside primary chat/collab monolith (no single-vendor lockout)
- [ ] Real load test run with realistic prompt entropy & burst concurrency
- [ ] Weekly cohort cost-per-active-user tracked alongside gross margin
`;

export default function NewsletterSignupBox({
  id,
  source,
  activeLang,
  className = "",
  delay = 0.05,
}: NewsletterSignupBoxProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const copy = LEAD_MAGNET_COPY[activeLang] ?? LEAD_MAGNET_COPY.tr;

  const handleDownloadChecklist = () => {
    try {
      const blob = new Blob([CHECKLIST_MARKDOWN], {
        type: "text/markdown;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "kursat-yilmaz-production-ai-24-point-audit.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Ignore download restrictions
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim();
    if (!cleaned || !cleaned.includes("@") || !cleaned.includes(".")) {
      setStatus("error");
      setErrorMsg(copy.invalidEmail);
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          email: cleaned,
          source: `${source}:lead-magnet-24pt`,
          lang: activeLang,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg(copy.errorGeneric);
    }
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 280, damping: 24, delay }}
      className={`relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0f] p-5 flex flex-col justify-between gap-4 hover:border-white/30 transition-colors ${className}`}
    >
      <Spotlight size={280} />

      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>{copy.badge}</span>
        </div>
        <h2 className="font-archivo font-[800] text-lg text-white leading-snug">
          {copy.title}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {copy.desc}
        </p>
      </div>

      <div className="relative z-10 pt-1">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="subscribed-magnet"
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 p-3.5 space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{copy.unlockedTitle}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {copy.unlockedSub}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/tools?tab=checklist"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold transition-colors"
                >
                  <span>{copy.openInteractive}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={handleDownloadChecklist}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-black/50 hover:bg-white/10 text-xs font-mono text-white transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copy.downloadMd}</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="newsletter-form"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              onSubmit={handleSubmit}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder={copy.placeholder}
                  aria-label="Email address for engineering checklist and newsletter"
                  className="flex-1 min-w-0 h-11 sm:h-12 rounded-full border border-white/15 bg-black/70 px-4 sm:px-5 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  disabled={status === "loading"}
                  className="h-11 sm:h-12 px-4 sm:px-5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 disabled:opacity-60 transition-colors shrink-0 inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>{copy.cta}</span>
                  )}
                </motion.button>
              </div>
              {status === "error" && errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] font-mono text-red-400 px-1"
                >
                  {errorMsg}
                </motion.p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
