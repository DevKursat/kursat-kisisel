"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Mail, Sparkles } from "lucide-react";
import { Spotlight } from "@/components/core/spotlight";
import type { BlogLang } from "@/data/blogIndex";

interface NewsletterSignupBoxProps {
  id: string;
  source: string;
  activeLang: BlogLang;
  className?: string;
  delay?: number;
}

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

  const isTr = activeLang === "tr";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim();
    if (!cleaned || !cleaned.includes("@") || !cleaned.includes(".")) {
      setStatus("error");
      setErrorMsg(
        isTr
          ? "Geçerli bir e-posta adresi girin."
          : "Enter a valid email address."
      );
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
          source,
          lang: activeLang,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg(
        isTr
          ? "Kayıt sırasında hata oluştu, lütfen tekrar deneyin."
          : "Could not subscribe right now, please try again."
      );
    }
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 280, damping: 24, delay }}
      className={`relative overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0f] p-5 flex flex-col justify-between gap-4 hover:border-white/25 transition-colors ${className}`}
    >
      <Spotlight size={280} />

      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
          <Mail className="w-3.5 h-3.5 text-zinc-300" />
          <span>
            {isTr ? "ÜCRETSİZ HAFTALIK BÜLTEN" : "FREE ENGINEERING DISPATCH"}
          </span>
        </div>
        <h2 className="font-archivo font-[800] text-lg text-white leading-snug">
          {isTr
            ? "Yeni mimari otopsiler gelen kutunuzda"
            : "Get new architectural autopsies via email"}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {isTr
            ? "Spam yok. Yalnızca gerçek üretim sistemleri, güvenlik vakaları ve AI maliyet analizleri."
            : "Zero spam. Only production post-mortems, security advisories, and AI unit economics."}
        </p>
      </div>

      <div className="relative z-10 pt-1">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="subscribed-pill"
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-mono text-emerald-300"
            >
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isTr
                    ? "Abone Olundu — Kaydınız alındı."
                    : "Subscribed — Welcome aboard."}
                </span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
                  placeholder={isTr ? "ornek@sirket.com" : "you@company.com"}
                  aria-label="Email address for newsletter"
                  className="flex-1 min-w-0 h-10 rounded-full border border-white/15 bg-black/70 px-4 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  disabled={status === "loading"}
                  className="h-10 px-4 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 disabled:opacity-60 transition-colors shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>{isTr ? "Katıl" : "Subscribe"}</span>
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
