"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-30 bg-[#000000] text-zinc-500 py-12 border-t border-white/5 text-xs font-normal">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>© 2026 Kürşat Yılmaz. {t("footer.rights")}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#work" className="hover:text-zinc-300 transition-colors">
            {t("nav.work")}
          </a>
          <a href="#writing" className="hover:text-zinc-300 transition-colors">
            {t("nav.writing")}
          </a>
          <a href="#contact" className="hover:text-zinc-300 transition-colors">
            {t("nav.contact")}
          </a>
        </div>
      </div>
    </footer>
  );
}
