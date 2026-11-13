"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LinkedinIcon, TwitterXIcon, DevtoIcon } from "./Icons";
import { Spotlight } from "./core/spotlight";
import { CoverflowGallery, CoverflowEssay } from "./core/coverflow";

export default function BlogSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  // 100+ Repodan sonra Blog sayfasının yukarı doğru yükselmesi
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 0.9], [180, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.5, 0.85, 1]);

  const essays: CoverflowEssay[] = [
    {
      id: "meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari",
      tag: lang === "tr" ? "MİMARİ OTOPSİ" : "ARCHITECTURAL AUTOPSY",
      title:
        lang === "tr"
          ? 'Meta Mühendisinin AI İtirafı: "Kodun %90\'ını Yapay Zekâya Yazdırdık, Canlı Ortam Çöktü"'
          : 'Meta Engineer\'s AI Confession: "We Had AI Generate 90% of Our Code, and Production Collapsed"',
      excerpt:
        lang === "tr"
          ? "Sözdizimi üretimi 10 katına fırlarken biriken gizli mimari borç ve deterministik kararlılık prensipleri."
          : "Hidden architectural debt accumulating behind 10x syntax velocity, and the reality of deterministic resilience.",
      date: lang === "tr" ? "11 Kas 2026" : "Nov 11, 2026",
      readTime: lang === "tr" ? "4 dk okuma" : "4 min read",
      imageUrl: "/blog/meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari.png",
      metrics: [
        { label: lang === "tr" ? "YAPAY ZEKA PAYI" : "AI SYNTAX", val: "%90 Üretim" },
        { label: lang === "tr" ? "KIRILMA ALANI" : "FAILURE DOMAIN", val: "Edge-Load" },
      ],
      content:
        lang === "tr"
          ? [
              "Yönetimler 'daha çok commit' baskısı kurdukça, mühendislerin kovulmamak için tek çaresi kodun %90'ını yapay zekâya ürettirmek oldu. Çıktı hacmi ve verimlilik grafikleri tavana vururken, gerçek mimari kırılganlık sessizce büyüdü.",
              "Meta'da kıdemli bir yazılım mühendisinin itiraf ettiği gibi: Kod üretimi 10 katına fırladı ancak kimse üretilen kodun sınır durumlarını (edge-cases) derinlemesine bilmediği için ilk karmaşık ağ dalgalanmasında prod ortamı çöktü.",
              "Yapay zekâ sözdizimini (syntax) mükemmel yazar; fakat dağıtık sistem mimarisi, kilitlenme önleme ve hata alanları (fault domains) insanın tavizsiz sorumluluğundadır.",
            ]
          : [
              "Under escalating pressure for commit velocity, engineers turned to automated syntax generation for 90% of their output.",
              "While productivity dashboards reported record gains, unverified architectural debt compound silently beneath distributed transaction layers.",
              "AI produces flawless syntax; but distributed invariants, state machines, and failover boundaries remain the craft of the human architect.",
            ],
      links: {
        linkedin: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
        twitter: "https://x.com/DevKursat",
        devto: "https://dev.to/devkursat",
      },
    },
    {
      id: "nvidia-jensen-huang-cin-casusluk-skandali",
      tag: lang === "tr" ? "DONANIM ARBİTRAJI" : "HARDWARE ARBITRAGE",
      title:
        lang === "tr"
          ? "3.5 Trilyon Dolarlık Ulusal Güvenlik Duvarı: Bir Deri Ceket ve Klasik Bal Tuzağı"
          : "The $3.5 Trillion National Security Illusion: Leather Jackets & Physical Arbitrage",
      excerpt:
        lang === "tr"
          ? "Washington tensör çiplerini ambargolarla kilitlerken, fiziksel tedarik zincirindeki en ilkel insan zaaflarının anatomisi."
          : "How physical distribution chains and corporate human vulnerability challenge global technological embargoes.",
      date: lang === "tr" ? "10 Kas 2026" : "Nov 10, 2026",
      readTime: lang === "tr" ? "5 dk okuma" : "5 min read",
      imageUrl: "/blog/nvidia-jensen-huang-cin-casusluk-skandali.png",
      metrics: [
        { label: lang === "tr" ? "PİYASA DEĞERİ" : "MARKET CAP", val: "$3.5 Trilyon" },
        { label: lang === "tr" ? "ROTASYON" : "ROUTING", val: "Singapur" },
      ],
      content:
        lang === "tr"
          ? [
              "Washington'ın Çin'e en küçük tensör çipi gitmesin diye dünyayı ambargolarla inlettiği bir dönemde; 3.5 trilyon dolarlık Nvidia tekeli ve Pentagon'un yapay zeka omurgası, Singapur merkezli klasik bir paravan şirket ağıyla delindi.",
              "Aman Çin’e 8-bit kuantizasyonlu H100 gitmesin diye uygulanan yaptırımların, fiziksel tedarik zincirindeki en ilkel insan zaafları karşısında nasıl yetersiz kaldığının çarpıcı bir anatomisi.",
              "Donanım gücü sınırlansa da, otonom zekâ ve açık kaynak algoritmalar sınır tanımaz.",
            ]
          : [
              "While sweeping export controls targeted accelerated tensor compute, the global semiconductor perimeter encountered classic physical distribution arbitrage.",
              "A forensic analysis of regulatory software barriers encountering human logistical weaknesses.",
              "Hardware access can be regulated, but open algorithmic architectures know no boundaries.",
            ],
      links: {
        linkedin: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
        twitter: "https://x.com/DevKursat",
        devto: "https://dev.to/devkursat",
      },
    },
    {
      id: "ai-bumerangi-muhendislerin-donusu",
      tag: lang === "tr" ? "SİSTEM MÜHENDİSLİĞİ" : "SYSTEMS CRAFT",
      title:
        lang === "tr"
          ? "'Yapay Zeka Yerimizi Alacak' Kibri İflas Etti: Kovulan Mühendislerin Dönüşü"
          : "The 'AI Will Replace Us' Hubris Collapses: Return of the Principal Engineers",
      excerpt:
        lang === "tr"
          ? "LLM'ler sözdizimi üretir; gece 03:00'te veritabanı kilitlendiğinde veya ödeme hattı yarış durumuna girdiğinde prompt yazamazsınız."
          : "LLMs generate syntax; when the database deadlocks at 3 AM or transactions race, you cannot debug with a prompt.",
      date: lang === "tr" ? "9 Kas 2026" : "Nov 9, 2026",
      readTime: lang === "tr" ? "6 dk okuma" : "6 min read",
      imageUrl: "/blog/ai-bumerangi-muhendislerin-donusu.png",
      metrics: [
        { label: lang === "tr" ? "KADRO REZERVİ" : "TALENT BOUNCE", val: "Tersine Göç" },
        { label: lang === "tr" ? "HATA DOMAİNİ" : "FAILURE MODE", val: "Race-Condition" },
      ],
      content:
        lang === "tr"
          ? [
              "Yapay zeka artık kodun %80'ini yazıyor, mühendis kadromuzu yarıya indirip bilançoyu parlatabiliriz diyen şirketlerin karşılaştığı fatura ağır oldu.",
              "Üretim ortamında gece saat 03:00'te veritabanı kilitlendiğinde veya ödeme geçidi yarış durumuna girdiğinde, bir prompt yazarak sistemi kurtaramazsınız.",
              "Büyük dil modelleri sözdizimi üretmekte muazzam bir hız kazandırdı; ancak yazılım mühendisliği hiçbir zaman klavyeye hızlı basmak değildi.",
            ]
          : [
              "Companies that slashed engineering headcount under the premise of AI code generation quickly met harsh production reality.",
              "When distributed transactions deadlock at peak throughput, generative syntax provides zero root-cause resolution.",
              "Software engineering has always been about invariant preservation, not keyboard typing speed.",
            ],
      links: {
        linkedin: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
        twitter: "https://x.com/DevKursat",
        devto: "https://dev.to/devkursat",
      },
    },
    {
      id: "sam-altman-ram-krizi",
      tag: lang === "tr" ? "TRANSFORMER MİMARİSİ" : "TRANSFORMER MEMORY",
      title:
        lang === "tr"
          ? "Sam Altman'ın 100 Milyar Dolarlık RAM Çıkmazı: GPU'lar Hızlandı, Hafıza Duvarı Çarptı"
          : "Sam Altman's $100 Billion RAM Wall: Compute Accelerated, Memory Stalled",
      excerpt:
        lang === "tr"
          ? "Milyarlarca dolarlık HBM3e yatırımlarına rağmen, modeller artık tensör çekirdeklerine değil bellek bant genişliğine takılıyor."
          : "Despite billions in accelerated HBM3e silicon, models are bottlenecked by memory bandwidth rather than FLOPs.",
      date: lang === "tr" ? "8 Kas 2026" : "Nov 8, 2026",
      readTime: lang === "tr" ? "5 dk okuma" : "5 min read",
      imageUrl: "/blog/sam-altman-ram-krizi.png",
      metrics: [
        { label: lang === "tr" ? "HAFİZA DUVARI" : "MEMORY WALL", val: "HBM3e / KV" },
        { label: lang === "tr" ? "BAĞLAM SINIRI" : "CONTEXT CEIL", val: "128k Bound" },
      ],
      content:
        lang === "tr"
          ? [
              "Transformer mimarilerinin en büyük açmazı olan KV-Cache şişmesi, 128k bağlam pencerelerinde sunucuları kilitliyor.",
              "Yüksek performanslı yapay zeka ürün mühendisliğinde donanım satın almak yetersizdir; kuantizasyon, flash-attention ve bellek bant genişliği optimizasyonu şarttır.",
            ]
          : [
              "KV-cache bloat remains the core bottleneck for massive context windows in production transformer serving.",
              "Silicon compute is abundant; true competitive advantage lies in quantization kernel optimization and memory layout.",
            ],
      links: {
        linkedin: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
        twitter: "https://x.com/DevKursat",
        devto: "https://dev.to/devkursat",
      },
    },
    {
      id: "claude-code-trojan-npm-analiz",
      tag: lang === "tr" ? "AJAN GÜVENLİĞİ" : "AGENT RUNTIME SECURITY",
      title:
        lang === "tr"
          ? "Anthropic Claude Code ve Trojan Anatomisi: Yazılım Tedarik Zincirinde Zero Trust"
          : "Anthropic Claude Code & The Trojan Threat: Zero Trust Software Supply Chains",
      excerpt:
        lang === "tr"
          ? "Geliştirici ortamlarına sızan gizli paketler ve otonom terminal ajanlarının denetimsiz paket kurulum riskleri."
          : "Typosquatted packages and autonomous terminal agent exploits in modern software supply chains.",
      date: lang === "tr" ? "7 Kas 2026" : "Nov 7, 2026",
      readTime: lang === "tr" ? "5 dk okuma" : "5 min read",
      imageUrl: "/blog/claude-hacker-news.jpg",
      metrics: [
        { label: lang === "tr" ? "RİSK SINIFI" : "RISK VECTOR", val: "NPM Poison" },
        { label: lang === "tr" ? "SAVUNMA" : "CONTAINMENT", val: "Zero-Trust" },
      ],
      content:
        lang === "tr"
          ? [
              "Otonom araçların terminal komutlarını denetimsiz çalıştırması, kurumsal geliştirici makinelerini uzaktan kontrol edilen botlara dönüştürebilir.",
              "Kürşat Yılmaz mimarilerinde tüm harici bağımlılıklar deterministik sandbox içinde doğrulanmadan üretim ortamına alınmaz.",
            ]
          : [
              "Unchecked autonomous terminal execution turns development machines into attack surfaces.",
              "Zero-trust execution boundaries and deterministic isolation must precede all agent actions.",
            ],
      links: {
        linkedin: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
        twitter: "https://x.com/DevKursat",
        devto: "https://dev.to/devkursat",
      },
    },
    {
      id: "ollama-performans-vergisi-vllm",
      tag: lang === "tr" ? "LLM ÇIKARIM MOTORLARI" : "INFERENCE ENGINES",
      title:
        lang === "tr"
          ? "Ollama'nın 'Kolaylık Vergisi': Yerel Çıkarımda Neden Saf llama.cpp ve vLLM Kazanıyor?"
          : "Ollama's 'Convenience Tax': Why Production Serving Demands Native vLLM & llama.cpp",
      excerpt:
        lang === "tr"
          ? "Geliştirici araçlarının prodüksiyonda eşzamanlı istekler altında PagedAttention ve KV-Cache optimizasyon kayıpları."
          : "Why desktop local tools buckle under concurrent enterprise load, and how PagedAttention solves the throughput equation.",
      date: lang === "tr" ? "6 Kas 2026" : "Nov 6, 2026",
      readTime: lang === "tr" ? "5 dk okuma" : "5 min read",
      imageUrl: "/blog/ollama-performans-vergisi-vllm.png",
      metrics: [
        { label: lang === "tr" ? "GECİKME FARKI" : "LATENCY REDUX", val: "%42 Düşüş" },
        { label: lang === "tr" ? "MOTOR" : "ENGINE CORE", val: "PagedAttention" },
      ],
      content:
        lang === "tr"
          ? [
              "Geliştiricilerin dizüstü bilgisayarlarında sevimli bir ikondan ibaret olan araçlar, gerçek bir Kubernetes kümesinde eşzamanlı 100 kullanıcıya hizmet veremez.",
              "vLLM ve TensorRT-LLM mimarilerinin sürekli batchleme (continuous batching) ve PagedAttention motorları olmadan kurumsal AI ölçeklenemez.",
            ]
          : [
              "Toy desktop runtimes cannot sustain hundred-user concurrency under rigorous SLAs.",
              "Continuous batching and virtual memory page attention are non-negotiable for low-latency inference.",
            ],
      links: {
        linkedin: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
        twitter: "https://x.com/DevKursat",
        devto: "https://dev.to/devkursat",
      },
    },
    {
      id: "10-kasim-teknolojik-egemenlik-ve-ataturk",
      tag: lang === "tr" ? "TEKNOLOJİK EGEMENLİK" : "SOVEREIGN ARCHITECTURES",
      title:
        lang === "tr"
          ? "10 Kasım ve Teknolojik Egemenlik: 'İstikbal Göklerdedir'den Amerikan API Bayiliğine"
          : "Technological Sovereignty: From Independent Industrial Vision to Sovereign AI Compute",
      excerpt:
        lang === "tr"
          ? "Bir ülkenin bağımsızlığı, sunucuların nerede çalıştığı ve model ağırlıklarının kime ait olduğuyla doğrudan bağlantılıdır."
          : "True national independence in the 21st century rests on sovereign compute and autonomous algorithmic custody.",
      date: lang === "tr" ? "10 Kas 2026" : "Nov 10, 2026",
      readTime: lang === "tr" ? "7 dk okuma" : "7 min read",
      imageUrl: "/blog/10-kasim-teknolojik-egemenlik-ve-ataturk.png",
      metrics: [
        { label: lang === "tr" ? "VİZYON" : "DOCTRINE", val: "Tam Bağımsızlık" },
        { label: lang === "tr" ? "MİMARİ" : "INFRASTRUCTURE", val: "Yerli Ağırlık" },
      ],
      content:
        lang === "tr"
          ? [
              "Cumhuriyetin sanayi bağımsızlığı vizyonu, 21. yüzyılda yerini yabancı bulut sağlayıcılarının API lisanslarına bırakamaz.",
              "Gerçek teknolojik egemenlik, kendi hesaplama altyapınız üzerinde koşan deterministik modeller ve kendi donanımınızda çalışan otonom sistemlerle mümkündür.",
            ]
          : [
              "True sovereign independence requires domestic model custody and resilient local hardware execution.",
              "Relying solely on foreign closed-source API gateways introduces systemic geopolitical vulnerability.",
            ],
      links: {
        linkedin: "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
        twitter: "https://x.com/DevKursat",
        devto: "https://dev.to/devkursat",
      },
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="writing"
      className="relative z-20 pt-16 sm:pt-20 pb-16 bg-[#08080a] text-white rounded-t-[44px] border-t border-white/15 shadow-[0_-40px_100px_rgba(0,0,0,0.98)] overflow-hidden"
    >
      {/* 3D Elevated Motion Wrapper */}
      <motion.div
        style={{
          translateY,
          scale,
          opacity,
        }}
        className="max-w-6xl mx-auto px-4 sm:px-8 will-change-transform"
      >
        {/* Editorial Header - Exact Typography & Two-Line Rhythm Matching 'Üzerinde Çalıştıklarım' */}
        <div className="mb-6 sm:mb-8 space-y-1.5">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase font-mono">
            {t("blog.tag")}
          </p>
          <h2 className="font-archivo font-[800] text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-white leading-[1.12]">
            <span className="block whitespace-nowrap">{t("blog.titleMain")}</span>
            <span className="block whitespace-nowrap">
              <span className="font-instrument italic font-normal text-white">
                {t("blog.titleAccent")}
              </span>{" "}
              {t("blog.titleEnd")}
            </span>
          </h2>
        </div>

        {/* 3D Motion.dev Coverflow Gallery (Interactive Drag, 3D Angles & Modal Morphing) */}
        <div className="mb-10 sm:mb-12">
          <CoverflowGallery items={essays} />
        </div>

        {/* 10.000+ Followers LinkedIn Portal (Matching the 100+ GitHub Container) */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141416] to-[#0a0a0c] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 group hover:border-white/25 transition-all">
          <Spotlight size={420} />

          <div className="relative z-10 max-w-xl space-y-1">
            <h3 className="font-archivo font-[800] text-xl sm:text-2xl text-white tracking-tight">
              {t("blog.linkedin.title")}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
              {t("blog.linkedin.desc")}
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-colors shrink-0"
            >
              <LinkedinIcon className="w-4 h-4 text-black" />
              <span>{t("blog.linkedin.btn")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </a>

            {/* Small X (Twitter) Capsule */}
            <a
              href="https://x.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all shrink-0"
              aria-label="X (Twitter)"
            >
              <TwitterXIcon className="w-3.5 h-3.5" />
            </a>

            {/* Small Dev.to Capsule */}
            <a
              href="https://dev.to/devkursat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all shrink-0"
              aria-label="Dev.to"
            >
              <DevtoIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
