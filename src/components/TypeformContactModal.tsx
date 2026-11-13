"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ArrowUpRight,
  ArrowLeft,
  Check,
  Sparkles,
  Building2,
  Cpu,
  Zap,
  X,
  CornerDownLeft,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Spotlight } from "./core/spotlight";
import { TextEffect } from "./core/text-effect";
import { WhatsappIcon } from "./Icons";

export default function TypeformContactModal() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const inputRef1 = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tags = [
    {
      id: "ai",
      label: lang === "tr" ? "Otonom AI & Ajanlar" : "Autonomous AI & Agents",
      icon: Cpu,
    },
    {
      id: "fullstack",
      label: lang === "tr" ? "Full-Stack Mimari" : "Full-Stack Architecture",
      icon: Zap,
    },
    {
      id: "enterprise",
      label: lang === "tr" ? "Kurumsal Danışmanlık" : "Enterprise Advisory",
      icon: Building2,
    },
    {
      id: "new",
      label: lang === "tr" ? "Yeni Girişim / Fikir" : "New Venture / Idea",
      icon: Sparkles,
    },
  ];

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (
        typeof window !== "undefined" &&
        (window as unknown as { __lenis?: { stop: () => void } }).__lenis
      ) {
        (window as unknown as { __lenis: { stop: () => void } }).__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (
        typeof window !== "undefined" &&
        (window as unknown as { __lenis?: { start: () => void } }).__lenis
      ) {
        (window as unknown as { __lenis: { start: () => void } }).__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (
        typeof window !== "undefined" &&
        (window as unknown as { __lenis?: { start: () => void } }).__lenis
      ) {
        (window as unknown as { __lenis: { start: () => void } }).__lenis.start();
      }
    };
  }, [isOpen]);

  // Global keydown: Escape to close
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [isOpen, isSubmitting]);

  // Auto-focus input on step change
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      if (step === 1) inputRef1.current?.focus();
      else if (step === 2) {
        if (contactMethod === "email") emailInputRef.current?.focus();
        else phoneInputRef.current?.focus();
      } else if (step === 3) textareaRef.current?.focus();
    }, 220);
    return () => clearTimeout(timer);
  }, [step, isOpen, contactMethod]);

  const handleNext = () => {
    setErrorMsg("");
    if (step === 1) {
      if (!name.trim()) {
        setErrorMsg(
          lang === "tr"
            ? "Lütfen isminizi veya şirket adınızı yazın."
            : "Please enter your name or company."
        );
        return;
      }
      setDirection(1);
      setStep(2);
    } else if (step === 2) {
      if (contactMethod === "email") {
        if (!email.trim() || !email.includes("@")) {
          setErrorMsg(
            lang === "tr"
              ? "Lütfen geçerli bir e-posta adresi yazın."
              : "Please enter a valid email address."
          );
          return;
        }
      } else {
        if (!phone.trim() || phone.trim().length < 6) {
          setErrorMsg(
            lang === "tr"
              ? "Lütfen geçerli bir telefon / WhatsApp numarası yazın."
              : "Please enter a valid phone / WhatsApp number."
          );
          return;
        }
      }
      setDirection(1);
      setStep(3);
    } else if (step === 3) {
      if (!message.trim()) {
        setErrorMsg(
          lang === "tr"
            ? "Lütfen projeniz veya hedefleriniz hakkında birkaç cümle paylaşın."
            : "Please share a few details about your project or vision."
        );
        return;
      }
      handleSubmit();
    }
  };

  const handleBack = () => {
    setErrorMsg("");
    setDirection(-1);
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && step < 3) {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && step === 3) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          preferredContact: contactMethod,
          role: selectedTag || null,
          message: message.trim(),
        }),
      });

      if (!res.ok) throw new Error("Mesaj iletilemedi");

      setTimeout(() => {
        setIsSubmitting(false);
        setDirection(1);
        setStep(4);
      }, 600);
    } catch {
      // Fallback mailto
      const roleText = selectedTag ? ` [İlgi Alanı: ${selectedTag}]` : "";
      const contactInfo =
        contactMethod === "email"
          ? `E-posta: ${email}`
          : `WhatsApp / Tel: ${phone}`;
      const mailto = `mailto:kursat@itibar.app?subject=${encodeURIComponent(
        `Portfolio İletişim: ${name}${roleText}`
      )}&body=${encodeURIComponent(
        `İsim/Şirket: ${name}\n${contactInfo}\n\nMesaj:\n${message}`
      )}`;
      window.location.href = mailto;

      setIsSubmitting(false);
      setDirection(1);
      setStep(4);
    }
  };

  const resetForm = () => {
    setStep(1);
    setName("");
    setSelectedTag("");
    setEmail("");
    setPhone("");
    setContactMethod("email");
    setMessage("");
    setErrorMsg("");
  };

  // Typeform Signature Vertical Slide Animation (Y-axis transition)
  const typeformVariants = {
    enter: (d: number) => ({
      opacity: 0,
      y: d > 0 ? 30 : -30,
      filter: "blur(5px)",
    }),
    center: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.24, ease: "easeOut" as const },
    },
    exit: (d: number) => ({
      opacity: 0,
      y: d > 0 ? -30 : 30,
      filter: "blur(5px)",
      transition: { duration: 0.18, ease: "easeIn" as const },
    }),
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          setIsOpen(true);
          resetForm();
        }}
        className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/25 bg-black/75 backdrop-blur-2xl text-xs sm:text-sm font-semibold text-white hover:bg-white hover:text-black hover:border-white transition-colors duration-300 shadow-[0_15px_45px_rgba(0,0,0,0.95)] group cursor-pointer select-none"
      >
        <Send className="w-4 h-4 text-zinc-300 group-hover:text-black transition-colors" />
        <span>{lang === "tr" ? "Mesaj Gönder" : "Send Message"}</span>
        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
      </motion.button>

      {/* PORTAL TO DOCUMENT.BODY */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div
                className="fixed inset-0 z-[99995] flex items-center justify-center p-4 sm:p-8 overscroll-contain"
                data-lenis-prevent="true"
              >
                {/* 1. SİYAH YERİNE GERÇEK ŞEFFAF SİNEMATİK BUZLU CAM BLUR (VİDEO VE PORTRE ARKADA GÖRÜNÜR) */}
                <motion.div
                  key="frosted-blur-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => !isSubmitting && setIsOpen(false)}
                  className="fixed inset-0 bg-black/35 backdrop-blur-xl sm:backdrop-blur-2xl"
                />

                {/* 2. TYPEFORM FLOATING GLASS CARD */}
                <motion.div
                  key="typeform-hero-card"
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    y: 20,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    y: 20,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 26,
                    mass: 0.8,
                  }}
                  className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/20 bg-[#09090d]/90 backdrop-blur-3xl text-white p-6 sm:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto flex flex-col justify-between my-auto"
                >
                  {/* Spotlight Lighting Effect */}
                  <Spotlight
                    className="from-white/15 via-emerald-500/5 to-transparent"
                    size={400}
                  />

                  {/* Top Bar: Progress Indicator & Clean Round Close Button (No Esc text clutter) */}
                  <div className="relative z-10 flex items-center justify-between mb-6 sm:mb-10">
                    {step < 4 ? (
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-wider">
                        <span className="text-emerald-400 font-semibold">{step}</span>
                        <span className="text-zinc-600">/</span>
                        <span>3</span>
                        <span className="text-zinc-600 ml-1">•</span>
                        <span className="uppercase text-[11px] text-zinc-300 pl-1 font-medium">
                          {step === 1 && (lang === "tr" ? "Kimlik & İlgi" : "Identity & Focus")}
                          {step === 2 && (lang === "tr" ? "İletişim Kanalı" : "Contact Channel")}
                          {step === 3 && (lang === "tr" ? "Vizyon & Mesaj" : "Vision & Message")}
                        </span>
                      </div>
                    ) : (
                      <div className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                        {lang === "tr" ? "✦ Gönderim Başarılı" : "✦ Dispatch Complete"}
                      </div>
                    )}

                    {/* Minimal Circular Close Button */}
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                      title={lang === "tr" ? "Kapat" : "Close"}
                      aria-label="Kapat"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Interactive Screen Content with Vertical Motion */}
                  <div className="relative z-10 flex-1 flex flex-col justify-between min-h-[270px]">
                    <AnimatePresence mode="wait" custom={direction}>
                      {/* ======================================================== */}
                      {/* QUESTION 1: WHO ARE YOU? + NATURAL REFINED CHIPS         */}
                      {/* ======================================================== */}
                      {step === 1 && (
                        <motion.div
                          key="q1"
                          custom={direction}
                          variants={typeformVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-6 sm:space-y-8"
                        >
                          {/* Soru Başlığı (Tekrar eden 1 rakamı kaldırıldı) */}
                          <div className="space-y-1.5">
                            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                              <TextEffect per="char" preset="fade">
                                {lang === "tr" ? "Kiminle tanışıyoruz?" : "Who is this from?"}
                              </TextEffect>
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-400 font-light">
                              {lang === "tr"
                                ? "İsminizi, şirketinizi veya temsil ettiğiniz vizyonu yazın."
                                : "Your name, company, or the vision you represent."}
                            </p>
                          </div>

                          {/* Geniş ve Doğal Typeform Girdi Alanı */}
                          <div className="relative">
                            <input
                              ref={inputRef1}
                              type="text"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                if (errorMsg) setErrorMsg("");
                              }}
                              onKeyDown={handleInputKeyDown}
                              placeholder={
                                lang === "tr"
                                  ? "Adınız veya şirket adınız..."
                                  : "Your name or company..."
                              }
                              className="w-full bg-transparent border-b-2 border-white/20 focus:border-emerald-400 py-2 sm:py-3 text-xl sm:text-3xl text-white placeholder-zinc-600 focus:outline-none font-sans font-medium transition-colors"
                            />
                            {errorMsg && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs font-mono text-rose-400 mt-2"
                              >
                                {errorMsg}
                              </motion.p>
                            )}
                          </div>

                          {/* Doğal, İkonlu İlgi Alanı Seçenekleri (ABCD kaldırıldı) */}
                          <div className="space-y-2.5 pt-1">
                            <div className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">
                              {lang === "tr"
                                ? "Hangi alanda birlikte çalışacağız?"
                                : "What will we build together?"}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                              {tags.map((tag) => {
                                const Icon = tag.icon;
                                const isSelected = selectedTag === tag.label;
                                return (
                                  <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() =>
                                      setSelectedTag(isSelected ? "" : tag.label)
                                    }
                                    className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
                                      isSelected
                                        ? "bg-emerald-500/15 text-white border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                                        : "bg-white/[0.02] text-zinc-300 border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
                                    }`}
                                  >
                                    <div
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                                        isSelected
                                          ? "bg-emerald-400 text-black shadow-md"
                                          : "bg-white/5 border border-white/10 text-emerald-400"
                                      }`}
                                    >
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium">
                                      {tag.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ======================================================== */}
                      {/* QUESTION 2: DENGELİ E-POSTA VEYA WHATSAPP SEÇİMİ         */}
                      {/* ======================================================== */}
                      {step === 2 && (
                        <motion.div
                          key="q2"
                          custom={direction}
                          variants={typeformVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-6 sm:space-y-8"
                        >
                          <div className="space-y-1.5">
                            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                              <TextEffect per="char" preset="fade">
                                {lang === "tr" ? "Size nereden ulaşalım?" : "How can I reach you?"}
                              </TextEffect>
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-400 font-light">
                              {lang === "tr"
                                ? "Size en hızlı şekilde dönüş yapabilmem için iletişim bilginizi girin."
                                : "Provide your preferred channel for a swift direct response."}
                            </p>
                          </div>

                          {/* Doğru Yerde Konumlandırılmış Zarif Cam Kapsül Switch & Girdi Alanı */}
                          <div className="space-y-3 pt-2">
                            {/* Üst Bar: Sol tarafta dinamik etiket, sağ tarafta zarif cam kapsül switch */}
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider pl-1">
                                {contactMethod === "email"
                                  ? (lang === "tr" ? "E-Posta Adresiniz" : "Email Address")
                                  : (lang === "tr" ? "WhatsApp Numarası" : "WhatsApp Number")}
                              </span>

                              {/* İnce Hatlı, Zarif Cam Kapsül Segmented Switch */}
                              <div className="inline-flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-inner">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setContactMethod("email");
                                    if (errorMsg) setErrorMsg("");
                                  }}
                                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                                    contactMethod === "email"
                                      ? "bg-white text-black font-semibold shadow-[0_2px_12px_rgba(255,255,255,0.25)]"
                                      : "text-zinc-400 hover:text-white"
                                  }`}
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                  <span>E-Posta</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setContactMethod("whatsapp");
                                    if (errorMsg) setErrorMsg("");
                                  }}
                                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                                    contactMethod === "whatsapp"
                                      ? "bg-emerald-400 text-black font-semibold shadow-[0_2px_14px_rgba(52,211,153,0.35)]"
                                      : "text-zinc-400 hover:text-white"
                                  }`}
                                >
                                  <WhatsappIcon className="w-3.5 h-3.5" />
                                  <span>WhatsApp</span>
                                </button>
                              </div>
                            </div>

                            {/* Seçilen Kanala Özel Büyük, Ferah Typeform Girdi Alanı */}
                            <div className="relative">
                              {contactMethod === "email" ? (
                                <input
                                  ref={emailInputRef}
                                  type="email"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errorMsg) setErrorMsg("");
                                  }}
                                  onKeyDown={handleInputKeyDown}
                                  placeholder="isim@sirketiniz.com"
                                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-emerald-400 py-2 sm:py-3 text-xl sm:text-3xl text-white placeholder-zinc-600 focus:outline-none font-sans font-medium transition-colors"
                                />
                              ) : (
                                <input
                                  ref={phoneInputRef}
                                  type="tel"
                                  value={phone}
                                  onChange={(e) => {
                                    setPhone(e.target.value);
                                    if (errorMsg) setErrorMsg("");
                                  }}
                                  onKeyDown={handleInputKeyDown}
                                  placeholder="+90 5XX XXX XX XX"
                                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-emerald-400 py-2 sm:py-3 text-xl sm:text-3xl text-white placeholder-zinc-600 focus:outline-none font-sans font-medium transition-colors"
                                />
                              )}

                              {errorMsg && (
                                <motion.p
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-xs font-mono text-rose-400 mt-2.5"
                                >
                                  {errorMsg}
                                </motion.p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ======================================================== */}
                      {/* QUESTION 3: WHAT ARE WE BUILDING?                        */}
                      {/* ======================================================== */}
                      {step === 3 && (
                        <motion.div
                          key="q3"
                          custom={direction}
                          variants={typeformVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-6 sm:space-y-8"
                        >
                          <div className="space-y-1.5">
                            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                              <TextEffect per="char" preset="fade">
                                {lang === "tr"
                                  ? "Birlikte ne inşa ediyoruz?"
                                  : "What are we building?"}
                              </TextEffect>
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-400 font-light">
                              {lang === "tr"
                                ? "Aklınızdaki vizyonu, mimari hedefleri veya projeyi paylaşın."
                                : "Share your architectural vision, project goals, or ideas."}
                            </p>
                          </div>

                          <div>
                            <textarea
                              ref={textareaRef}
                              rows={4}
                              value={message}
                              onChange={(e) => {
                                setMessage(e.target.value);
                                if (errorMsg) setErrorMsg("");
                              }}
                              onKeyDown={handleInputKeyDown}
                              placeholder={
                                lang === "tr"
                                  ? "Düşüncelerinizi buraya dökün..."
                                  : "Type your thoughts here..."
                              }
                              className="w-full bg-white/[0.03] border border-white/15 focus:border-emerald-400 rounded-2xl p-4 sm:p-5 text-base sm:text-lg text-white placeholder-zinc-600 focus:outline-none font-sans transition-colors resize-none shadow-inner"
                            />
                            {errorMsg && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs font-mono text-rose-400 mt-2"
                              >
                                {errorMsg}
                              </motion.p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* ======================================================== */}
                      {/* SUCCESS DISPATCH SCREEN                                  */}
                      {/* ======================================================== */}
                      {step === 4 && (
                        <motion.div
                          key="success"
                          variants={typeformVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="py-6 sm:py-8 flex flex-col items-center text-center space-y-4"
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                          >
                            <Check className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300" />
                            <span className="absolute inset-0 rounded-full animate-ping border border-emerald-400/40 pointer-events-none" />
                          </motion.div>

                          <div className="space-y-1.5 max-w-md">
                            <div className="font-archivo font-[800] uppercase text-2xl sm:text-3xl text-white tracking-tight">
                              <TextEffect per="char" preset="fade">
                                {lang === "tr" ? "Mesajınız Alındı!" : "Message Received!"}
                              </TextEffect>
                            </div>
                            <p className="text-sm text-zinc-300 font-light">
                              {lang === "tr"
                                ? "Mesajınız doğrudan kaydedildi. En kısa sürede geri dönüş sağlayacağım."
                                : "Your message is recorded. I will review and get back to you promptly."}
                            </p>
                          </div>

                          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                            <a
                              href="https://wa.me/kursat.yz"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/40 bg-emerald-950/30 text-xs font-mono text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
                            >
                              <WhatsappIcon className="w-3.5 h-3.5 text-emerald-400" />
                              <span>WhatsApp: @kursat.yz</span>
                            </a>
                            <button
                              type="button"
                              onClick={resetForm}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
                            >
                              <span>{lang === "tr" ? "Yeni Mesaj" : "New Message"}</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* AUTHENTIC TYPEFORM BOTTOM ACTION BAR */}
                    {step < 4 && (
                      <div className="pt-8 sm:pt-10 flex items-center justify-between gap-4 mt-auto">
                        {step > 1 ? (
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleBack}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>{lang === "tr" ? "Geri" : "Back"}</span>
                          </button>
                        ) : (
                          <div />
                        )}

                        {/* Action Button (Enter indicator hidden on mobile) */}
                        <div className="flex items-center gap-3 ml-auto">
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={handleNext}
                            className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-2xl bg-white text-black hover:bg-zinc-200 text-sm font-semibold transition-all shadow-[0_4px_25px_rgba(255,255,255,0.2)] active:scale-95 group cursor-pointer disabled:opacity-60"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin text-black" />
                                <span>{lang === "tr" ? "İletiliyor..." : "Sending..."}</span>
                              </>
                            ) : (
                              <>
                                <span>
                                  {step === 3
                                    ? lang === "tr"
                                      ? "Mesajı Gönder"
                                      : "Submit"
                                    : lang === "tr"
                                    ? "Tamam"
                                    : "OK"}
                                </span>
                                {step === 3 ? (
                                  <Send className="w-3.5 h-3.5 text-black" />
                                ) : (
                                  <Check className="w-4 h-4 text-black stroke-[3]" />
                                )}
                              </>
                            )}
                          </button>

                          {/* Sadece masaüstünde görünen Enter rozeti (Mobilde gizli) */}
                          {!isSubmitting && (
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-400">
                              <span>Enter</span>
                              <CornerDownLeft className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
