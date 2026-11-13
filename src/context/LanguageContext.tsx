"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "tr" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Nav
    "nav.work": "Projeler",
    "nav.writing": "Yazılar",
    "nav.contact": "İletişim",

    // Hero Girizgah (Dengeli 2 Satır)
    "hero.stage2.line1": "Sessiz bir zihin,",
    "hero.stage2.line2": "Derin bir vizyon.",

    "hero.stage3.line1": "Koda dökülen,",
    "hero.stage3.line2": "Otonom gelecek.",

    // Ticker Lines (ScrollTextLines)
    "ticker.line1": "OTONOM AI MİMARİSİ ✦ SIFIR GECİKME & YÜKSEK ETKİ ✦ FİKİRDEN CANLI ÜRÜNE ✦ BİLİŞSEL AJAN SİSTEMLERİ",
    "ticker.line2": "DERİN MÜHENDİSLİK ✦ SEZGİSEL KULLANICI DENEYİMİ ✦ AKILLI İŞ AKIŞLARI ✦ ÖLÇEKLENEBİLİR GELECEK",

    // Work / Projects (İtibar & Unutma.)
    "work.tag": "// ÜZERİNDE ÇALIŞTIKLARIM",
    "work.titleMain": "Sözde kalmayan,",
    "work.titleAccent": "çalışan",
    "work.titleEnd": "sistemler.",
    
    // Proje 1: İtibar (https://itibar.app)
    "work.proj1.title": "İtibar",
    "work.proj1.tagline": "itibar'dan tasarruf olmaz.",
    "work.proj1.category": "01 — B2B İtibar Savunma & Hukuk Analizi",
    "work.proj1.desc":
      "Organize 1-yıldızlı haksız yorum saldırılarına karşı deterministik politika kural motoru, TCK/TTK yasal dayanakları ve macOS Headless Chrome PDF raporlama boru hattıyla çalışan otonom B2B itibar savunma platformu.",
    "work.proj1.m1Label": "Kural Motoru",
    "work.proj1.m1Val": "%100 Deterministik",
    "work.proj1.m2Label": "İhlal Tespiti",
    "work.proj1.m2Val": "24+ Yasal Sınıf",
    "work.proj1.m3Label": "Raporlama",
    "work.proj1.m3Val": "Headless Chrome",
    "work.proj1.liveUrl": "https://itibar.app",
    "work.proj1.liveBtn": "itibar.app'i Keşfet",

    // Proje 2: Unutma. (https://unutma.itibar.app)
    "work.proj2.title": "Unutma.",
    "work.proj2.tagline": "Mesafe tanımaz, unutulmaz.",
    "work.proj2.category": "02 — Sivil Teknoloji & Regülasyon",
    "work.proj2.desc":
      "Cezaevlerindeki tutuklu ve hükümlülere fildişi kâğıt, gerçek mum mühür ve PTT Taahhütlü mektup gönderimini sağlayan; infaz mevzuatına uyumlu yapay zekâ asistanlı sivil teknoloji platformu.",
    "work.proj2.m1Label": "Teslimat",
    "work.proj2.m1Val": "%100 Fiziksel Posta",
    "work.proj2.m2Label": "Asistan",
    "work.proj2.m2Val": "Mevzuata Uyumlu AI",
    "work.proj2.m3Label": "Kapsam",
    "work.proj2.m3Val": "81 İl & Cezaevleri",
    "work.proj2.liveUrl": "https://unutma.itibar.app",
    "work.proj2.liveBtn": "unutma.app'e Git",

    "work.source": "Kaynak Kod",
    "work.archive.title": "100+ Açık Kaynak Repo ve Deney",
    "work.archive.desc":
      "GitHub üzerinde prototipler, algoritmik modeller ve deneysel açık kaynak mimarilerden oluşan kapsamlı bir çalışma arşivi.",
    "work.archive.btn": "GitHub'da İncele",

    // Blog Header (Mühendislik Notları)
    "blog.tag": "// GÜNLÜK NOTLAR & YAYINLAR",
    "blog.titleMain": "Yazıya dökülen,",
    "blog.titleAccent": "derin",
    "blog.titleEnd": "deneyimler.",
    "blog.read": "Yazıyı Oku",
    "blog.close": "Kapat",
    "blog.linkedin.title": "10.000+ Takipçi ile Günlük Teknoloji Gündemi",
    "blog.linkedin.desc":
      "LinkedIn üzerinde her gün yapay zekâ mimarisi, otonom sistemler ve teknoloji dünyasındaki kırılma noktalarını analiz eden derinlemesine yayınlar.",
    "blog.linkedin.btn": "LinkedIn'de İncele",

    // Contact Scroller Stages (Ahenkli & Kafiyeli 2 Satır)
    "contact.stage1.line1": "Göz göze gelen,",
    "contact.stage1.line2": "Sessiz bir güven.",
    "contact.stage2.line1": "Fikirler gerçeğe,",
    "contact.stage2.line2": "Birlikte geleceğe.",
    "contact.stage3.line1": "Geleceği birlikte,",
    "contact.stage3.line2": "inşa edelim.",
    "contact.stage3.desc":
      "Yüksek etkili yapay zeka ürün mühendisliği ve otonom sistemler mimarisi.",

    // Morphing Popover Butonları & Formu
    "contact.btn.message": "Mesaj Gönder",
    "contact.btn.channels": "Kanallar & İletişim",
    "contact.form.title": "Doğrudan İletişim Formu",
    "contact.form.desc":
      "Projeniz, ekibiniz veya mimari vizyonunuz hakkında kısa bir not bırakın.",
    "contact.form.name": "Adınız & Soyadınız",
    "contact.form.email": "E-posta Adresiniz",
    "contact.form.message": "Mesajınız",
    "contact.form.submit": "Mesajı İlet",
    "contact.form.sent": "Mesaj Hazırlandı",
    "contact.channels.title": "İletişim & Dizin",
    "contact.channels.subtitle": "İstanbul • Aktif Frekans",
    "contact.tag": "İLETİŞİM PROTOKOLÜ",
    "contact.title": "Geleceği birlikte inşa edelim.",
    "contact.desc":
      "Yüksek etkili yapay zeka ürün mühendisliği, çoklu ajan sistemleri mimarisi ve stratejik teknoloji liderliği için doğrudan frekans.",
    "contact.dispatch": "DOĞRUDAN İLETİŞİM",
    "contact.copy": "KOPYALA",
    "contact.copied": "KOPYALANDI",

    // Footer
    "footer.rights": "Tüm hakları saklıdır.",
  },
  en: {
    // Nav
    "nav.work": "Work",
    "nav.writing": "Writing",
    "nav.contact": "Contact",

    // Hero Girizgah (Balanced 2 Lines)
    "hero.stage2.line1": "Silent mind,",
    "hero.stage2.line2": "Deep vision.",

    "hero.stage3.line1": "Autonomous logic,",
    "hero.stage3.line2": "Engineered future.",

    // Ticker Lines (ScrollTextLines)
    "ticker.line1": "AUTONOMOUS AI ARCHITECTURE ✦ ZERO LATENCY & HIGH IMPACT ✦ VISION TO PRODUCTION ✦ COGNITIVE AGENT SYSTEMS",
    "ticker.line2": "DEEP ENGINEERING ✦ INTUITIVE USER EXPERIENCE ✦ AUTONOMOUS WORKFLOWS ✦ SCALE AT INFINITY",

    // Work / Projects (İtibar & Unutma.)
    "work.tag": "// RECENT CRAFTS",
    "work.titleMain": "Built with purpose,",
    "work.titleAccent": "engineered",
    "work.titleEnd": "to run.",
    
    // Project 1: İtibar (https://itibar.app)
    "work.proj1.title": "İtibar",
    "work.proj1.tagline": "There is no compromise on reputation.",
    "work.proj1.category": "01 — B2B Reputation Defense & Statutory Law",
    "work.proj1.desc":
      "Autonomous B2B reputation defense platform running on deterministic policy classification, statutory Turkish Commercial / Criminal law rules, and macOS Headless Chrome executive PDF report compilation.",
    "work.proj1.m1Label": "Rule Engine",
    "work.proj1.m1Val": "100% Deterministic",
    "work.proj1.m2Label": "Violations",
    "work.proj1.m2Val": "24+ Legal Classes",
    "work.proj1.m3Label": "Pipeline",
    "work.proj1.m3Val": "Headless Chrome",
    "work.proj1.liveUrl": "https://itibar.app",
    "work.proj1.liveBtn": "Explore itibar.app",

    // Project 2: Unutma. (https://unutma.itibar.app)
    "work.proj2.title": "Unutma.",
    "work.proj2.tagline": "Bridging distance with timeless ink.",
    "work.proj2.category": "02 — Civic Tech & Regulatory Platform",
    "work.proj2.desc":
      "Civic tech and postal communication platform enabling users to send wax-sealed certified letters on ivory paper to inmates, compliant with prison regulations and assisted by AI.",
    "work.proj2.m1Label": "Delivery",
    "work.proj2.m1Val": "100% Physical Mail",
    "work.proj2.m2Label": "Assistant",
    "work.proj2.m2Val": "Compliant AI",
    "work.proj2.m3Label": "Coverage",
    "work.proj2.m3Val": "81 Cities & Prisons",
    "work.proj2.liveUrl": "https://unutma.itibar.app",
    "work.proj2.liveBtn": "Open unutma.app",

    "work.source": "Source",
    "work.archive.title": "100+ Open Repositories & Experiments",
    "work.archive.desc":
      "A comprehensive archive of prototypes, algorithmic experiments, and open-source explorations on GitHub.",
    "work.archive.btn": "Explore on GitHub",

    // Blog Header
    "blog.tag": "// DAILY ESSAYS & DISPATCHES",
    "blog.titleMain": "Distilled into code,",
    "blog.titleAccent": "daily",
    "blog.titleEnd": "insights.",
    "blog.read": "Read Essay",
    "blog.close": "Close",
    "blog.linkedin.title": "10,000+ Followers & Daily Tech Dispatches",
    "blog.linkedin.desc":
      "Daily analytical publications decoding autonomous AI architecture, distributed systems, and frontier technology breakthroughs on LinkedIn.",
    "blog.linkedin.btn": "Connect on LinkedIn",

    // Contact Scroller Stages (Rhymed & Poetic 2 Lines)
    "contact.stage1.line1": "Eyes meet,",
    "contact.stage1.line2": "in silent trust.",
    "contact.stage2.line1": "From pure vision,",
    "contact.stage2.line2": "into creation.",
    "contact.stage3.line1": "Building the future,",
    "contact.stage3.line2": "together.",
    "contact.stage3.desc":
      "High-impact AI product engineering and autonomous systems architecture.",

    // Morphing Popover Buttons & Form
    "contact.btn.message": "Send Message",
    "contact.btn.channels": "Channels & Directory",
    "contact.form.title": "Direct Dispatch Form",
    "contact.form.desc":
      "Drop a quick note regarding your project, team, or architectural vision.",
    "contact.form.name": "Your Name",
    "contact.form.email": "Your Email",
    "contact.form.message": "Your Message",
    "contact.form.submit": "Transmit Dispatch",
    "contact.form.sent": "Dispatch Prepared",
    "contact.channels.title": "Channels & Directory",
    "contact.channels.subtitle": "Istanbul • Active Frequency",
    "contact.tag": "COMMUNICATION PROTOCOL",
    "contact.title": "Let's build the next leap.",
    "contact.desc":
      "Open to high-impact AI product engineering, multi-agent platform architecture, and strategic technology advisory.",
    "contact.dispatch": "DIRECT DISPATCH",
    "contact.copy": "COPY",
    "contact.copied": "COPIED",

    // Footer
    "footer.rights": "All rights reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "tr",
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("tr");

  useEffect(() => {
    const saved = localStorage.getItem("ky_portfolio_lang") as Language | null;
    if (saved === "tr" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("ky_portfolio_lang", newLang);
  };

  const toggleLang = () => {
    const next = lang === "tr" ? "en" : "tr";
    setLang(next);
  };

  const t = (key: string) => {
    return translations[lang][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
