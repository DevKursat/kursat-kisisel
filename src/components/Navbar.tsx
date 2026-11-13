"use client";

import { useEffect, useState } from "react";
import AudioController from "./AudioController";
import { MonochromeTRFlag } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";
import PageTransitionWipe from "./PageTransitionWipe";
import { ScrollProgress } from "./core/scroll-progress";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [transitioningTarget, setTransitioningTarget] = useState<string | null>(null);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Sadece hero video scroller tamamen bittikten sonra header ve isim belirsin
      const heroThreshold = window.innerHeight * 4.2;
      
      // Sonda contact bölümüne gelindiğinde de girişteki gibi şeffaf olsun ve isim gizlensin
      const contactEl = document.getElementById("contact");
      let inContact = false;
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        inContact = rect.top <= 120;
      }

      setIsScrolled(window.scrollY > heroThreshold && !inContact);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, label: string) => {
    e.preventDefault();
    setTransitioningTarget(label);

    setTimeout(() => {
      if (targetId === "contact") {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          // İletişim tıklandığında videonun en sonuna (progress = 1.0) ışınla
          const targetY = contactEl.offsetTop + contactEl.offsetHeight - window.innerHeight;
          const lenis = (window as any).__lenis;
          if (lenis && typeof lenis.scrollTo === "function") {
            lenis.scrollTo(targetY, { duration: 0.6, immediate: false });
          } else {
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
        }
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          const lenis = (window as any).__lenis;
          if (lenis && typeof lenis.scrollTo === "function") {
            lenis.scrollTo(el, { duration: 1.0 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }, 200);

    setTimeout(() => {
      setTransitioningTarget(null);
    }, 600);
  };

  return (
    <>
      {/* Precision Hairline Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[99990] pointer-events-none">
        <ScrollProgress
          className="h-[2px] bg-[linear-gradient(to_right,rgba(255,255,255,0),#ffffff_75%,#ffffff_100%)] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          springOptions={{
            stiffness: 280,
            damping: 18,
            mass: 0.3,
          }}
        />
      </div>

      <PageTransitionWipe isActive={!!transitioningTarget} targetName={transitioningTarget || ""} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-black/80 backdrop-blur-md border-b border-white/[0.06]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left Side: Monochrome Flag & Language Toggle + Name revealed on scroll */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              onClick={toggleLang}
              title={lang === "tr" ? "Switch to English" : "Türkçe'ye Geç"}
              className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/5 transition-all text-xs font-mono text-zinc-400 hover:text-white"
            >
              <MonochromeTRFlag className="w-3.5 h-2.5 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="hidden sm:inline text-[10px] tracking-wider font-semibold">
                {lang === "tr" ? "İSTANBUL" : "EN"}
              </span>
            </button>

            <a
              href="#"
              className={`text-sm font-archivo font-[800] tracking-tight text-white/90 hover:text-white transition-all duration-500 uppercase ${
                isScrolled
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-3 pointer-events-none"
              }`}
            >
              Kürşat Yılmaz
            </a>
          </div>

          {/* Right Navigation */}
          <nav className="flex items-center gap-3.5 sm:gap-6 text-xs text-zinc-400 font-medium">
            <a
              href="#work"
              onClick={(e) => handleNavClick(e, "work", t("nav.work"))}
              className="hover:text-white transition-colors"
            >
              {t("nav.work")}
            </a>
            <a
              href="#writing"
              onClick={(e) => handleNavClick(e, "writing", t("nav.writing"))}
              className="hover:text-white transition-colors"
            >
              {t("nav.writing")}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact", t("nav.contact"))}
              className="hover:text-white transition-colors"
            >
              {t("nav.contact")}
            </a>
            <AudioController />
          </nav>
        </div>
      </header>
    </>
  );
}
