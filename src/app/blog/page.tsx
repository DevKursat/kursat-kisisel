"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Plus, Terminal, Search, Calendar, Clock, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Spotlight } from "@/components/core/spotlight";
import { ProgressiveBlur } from "@/components/core/progressive-blur";
import CustomCursor from "@/components/CustomCursor";
import { LinkedinIcon, TwitterXIcon, DevtoIcon } from "@/components/Icons";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "@/components/core/morphing-dialog";

interface BlogPostItem {
  slug: string;
  tag: string;
  category: "mimari" | "donanim" | "llm" | "guvenlik";
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readTime: string;
  imageUrl: string;
  metrics: { label: string; val: string }[];
  content: string[];
}

const ALL_POSTS_TR: BlogPostItem[] = [
  {
    slug: "claude-code-secret-leak-gitignore-skandali",
    tag: "GÜVENLİK OTOPSİSİ",
    category: "guvenlik",
    title: "1.5 Trilyon Dolarlık Değerleme, Sıfır .gitignore: Claude Code 2.500 Canlı Sırrı GitHub'a Nasıl Saçtı?",
    excerpt: "Terminalde 'Yes, and don't ask again' butonuna basan geliştiricilerin veritabanı şifreleri ve API anahtarları .claude/settings.local.json üzerinden 2.000 public repoya sızdı.",
    date: "14 Kas 2026",
    isoDate: "2026-11-14",
    readTime: "4 dk okuma",
    imageUrl: "/blog/claude-code-secret-leak-gitignore-skandali.jpg",
    metrics: [
      { label: "SIZAN CANLI SIR", val: "2.539 Secret" },
      { label: "ETKİLENEN REPO", val: "1.994 Public" },
    ],
    content: [
      "Anthropic 1.5 trilyon dolar değerlemeyle halka arza hazırlanırken, amiral gemisi Claude Code geliştiricilerin veritabanı şifrelerini ve API anahtarlarını güle oynaya public GitHub repolarına saçtı. Apiiro araştırmacılarının ortaya çıkardığı tabloya göre 1.994 public repoda 2.539 canlı sır tespit edildi.",
      "Mekanizma o kadar komik ki insan sinirlenmeye bile kıyamıyor. Terminalde ajan sizden izin isterken o masum 'Yes, and don't ask again' seçeneğine tıkladığınız an, düz metin komut satırını içindeki PGPASSWORD ve API anahtarlarıyla birlikte .claude/settings.local.json dosyasına gömüyor. Dosyayı proje düzeyinde .gitignore kuralına otomatik eklemediği için de o gizli anahtarlar ilk git push ile tüm dünyaya açılıyor.",
      "Üstelik geleneksel tarama araçları (Gitleaks, TruffleHog) komut satırı içine gömülü bu dizgilerin önemli bir bölümünü standart regex kalıplarının dışında kaldığı için yakalayamadı. Bu durum, kapısına milyon dolarlık zırhlı güvenlik sistemi taktırıp evin yedek anahtarını paspasın altına koyan site yönetimi kafasıdır. Yapay zeka ajanına kod yazdırırken konfor uğruna otomatiğe bağlanan her onay butonu, şirketin üretim ortamını halka açık panoya asıyor.",
    ],
  },
  {
    slug: "microsoft-ve-claude-cokus-bulut-sla-yalani",
    tag: "MİMARİ OTOPSİ",
    category: "mimari",
    title: 'Bulutun %99.99 SLA Yalanı: Microsoft ve Claude Aynı Gün Çökünce Korkan CTO\'lar',
    excerpt: "Microsoft 365 12 saat kilitlendi, Anthropic auth motoru Claude Code oturumlarını kesti. Dijital egemenliğini kapalı bulutlara devreden kurumsal dünyanın kırılganlık anatomisi.",
    date: "13 Kas 2026",
    isoDate: "2026-11-13",
    readTime: "4 dk okuma",
    imageUrl: "/blog/microsoft-ve-claude-cokus-bulut-sla-yalani.png",
    metrics: [
      { label: "KESİNTİ SÜRESİ", val: "12+ Saat" },
      { label: "ETKİLENEN ALTYAPI", val: "M365 & Claude" },
    ],
    content: [
      "Yıllık bütçe toplantılarında 'her şeyi buluta taşıdık, artık %99.99 SLA garantimiz var' diye sunum yapan kurumsal slaytların mürekkebi yine kurudu. Bugün Microsoft 365 küresel çapta fişi çekti; Outlook, Teams, Exchange ve Copilot tam 12 saat boyunca dünya genelinde milyonlarca şirketi taş devrine döndürdü. Aynı saatlerde Anthropic tarafı da auth krizine girip Claude Code oturumlarını kilitleyince, kurumsal dünyanın bütün dijital egemenliği tek bir öğleden sonrada buharlaştı.",
      "Mesele bir sunucunun çökmesi değil. Mesele, trilyon dolarlık teknoloji tekellerinin pazarladığı 'biz sizin yerinize her şeyi yönetiriz, siz sadece faturayı ödeyin' konforunun aslında dev bir dijital rehin alma operasyonu olması. Kendi sunucusunu yönetmekten korkup bütün operasyonunu iki tane kapalı API ve üç tane bulut servisine bağlayan şirketler; bugün çalışanlarına 'mailler gitmiyor, WhatsApp'tan yazışalım' derken teknolojiyi değil çaresizliği yönettiler.",
      "Bir şirketin kendi donanımında, kendi konteynerinde veya kendi yerel ağında çalıştıramadığı hiçbir yazılım o şirkete ait değildir. Sadece aylık kira ödediğiniz şık bir bağımlılıktır. Ve o kirayı verdiğiniz efendiler içeride bir auth servisini patlattığında, yüzlerce kıdemli mühendisiniz ekrana boş boş bakıp kahve içmekten başka hiçbir şey yapamaz.",
    ],
  },
  {
    slug: "meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari",
    tag: "MİMARİ OTOPSİ",
    category: "mimari",
    title: 'Meta Mühendisinin AI İtirafı: "Kodun %90\'ını Yapay Zekâya Yazdırdık, Canlı Ortam Çöktü"',
    excerpt: "Yönetimler 'daha çok commit' baskısı kurdukça mimari kırılganlık sessizce büyüdü. İlk karmaşık ağ dalgalanmasında prod ortamının çöküş anatomisi.",
    date: "11 Kas 2026",
    isoDate: "2026-11-11",
    readTime: "4 dk okuma",
    imageUrl: "/blog/meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari.png",
    metrics: [
      { label: "YAPAY ZEKA PAYI", val: "%90 Üretim" },
      { label: "KIRILMA ALANI", val: "Edge-Cases" },
    ],
    content: [
      "Yönetimler 'daha çok commit' baskısı kurdukça, mühendislerin kovulmamak için tek çaresi kodun %90'ını yapay zekâya ürettirmek oldu. Çıktı hacmi ve verimlilik grafikleri tavana vururken, gerçek mimari kırılganlık sessizce büyüdü.",
      "Meta'da kıdemli bir yazılım mühendisinin itiraf ettiği gibi: Kod üretimi 10 katına fırladı ancak kimse üretilen kodun sınır durumlarını (edge-cases) derinlemesine bilmediği için ilk karmaşık ağ dalgalanmasında prod ortamı çöktü.",
      "Yapay zekâ sözdizimini (syntax) mükemmel yazar ama sistem mimarisi, dağıtık mutabakat ve deterministik kararlılık insanın sorumluluğundadır.",
    ],
  },
  {
    slug: "nvidia-jensen-huang-cin-casusluk-skandali",
    tag: "DONANIM ARBİTRAJI",
    category: "donanim",
    title: "3.5 Trilyon Dolarlık Ulusal Güvenlik Duvarı: Bir Deri Ceket ve Klasik Bal Tuzağı",
    excerpt: "Washington ambargolarla tensör çiplerini kilitlerken, Singapur merkezli klasik bir paravan şirket ağıyla delinen donanım tekeli.",
    date: "10 Kas 2026",
    isoDate: "2026-11-10",
    readTime: "5 dk okuma",
    imageUrl: "/blog/nvidia-jensen-huang-cin-casusluk-skandali.png",
    metrics: [
      { label: "PİYASA DEĞERİ", val: "$3.5 Trilyon" },
      { label: "ROTASYON", val: "Singapur" },
    ],
    content: [
      "Washington'ın Çin'e en küçük tensör çipi gitmesin diye dünyayı ambargolarla inlettiği bir dönemde; 3.5 trilyon dolarlık Nvidia tekeli ve Pentagon'un yapay zeka omurgası, Singapur merkezli klasik bir paravan şirket ağıyla delindi.",
      "Aman Çin’e 8-bit kuantizasyonlu H100 gitmesin diye uygulanan yaptırımların, fiziksel tedarik zincirindeki en ilkel insan zaafları karşısında nasıl yetersiz kaldığının çarpıcı bir anatomisi.",
      "Donanım gücü sınırlansa da, otonom zekâ ve açık kaynak algoritmalar sınır tanımaz.",
    ],
  },
  {
    slug: "ai-bumerangi-muhendislerin-donusu",
    tag: "SİSTEM MÜHENDİSLİĞİ",
    category: "mimari",
    title: "'Yapay Zeka Yerimizi Alacak' Kibri İflas Etti: Kovulan Mühendislerin Dönüşü",
    excerpt: "Büyük dil modelleri sözdizimi üretir; fakat gece 03:00'te veritabanı kilitlendiğinde veya ödeme hattı yarış durumuna girdiğinde prompt yazamazsınız.",
    date: "9 Kas 2026",
    isoDate: "2026-11-09",
    readTime: "6 dk okuma",
    imageUrl: "/blog/ai-bumerangi-muhendislerin-donusu.png",
    metrics: [
      { label: "İŞTEN ÇIKARMA", val: "Geri Döndü" },
      { label: "HATA DOMAİNİ", val: "Distributed" },
    ],
    content: [
      "Son bir yılda yönetim kurullarında en çok alkışlanan sunum şuydu: 'Yapay zeka artık kodun %80'ini yazıyor, mühendis kadromuzu yarıya indirip bilançoyu parlatabiliriz.' Bu kibirle hareket eden şirketlerin karşılaştığı fatura ağır oldu.",
      "Büyük dil modelleri sözdizimi üretmekte muazzam bir hız kazandırdı. Ancak yazılım mühendisliği hiçbir zaman klavyeye hızlı basmak değildi.",
      "Üretim ortamında gece saat 03:00'te veritabanı kilitlendiğinde veya ödeme geçidi yarış durumuna (race condition) girdiğinde, bir prompt yazarak sistemi kurtaramazsınız.",
    ],
  },
  {
    slug: "sam-altman-ram-krizi",
    tag: "TRANSFORMER MİMARİSİ",
    category: "donanim",
    title: "Sam Altman'ın 100 Milyar Dolarlık RAM Çıkmazı: GPU'lar Hızlandı, Hafıza Duvarı Çarptı",
    excerpt: "Milyarlarca dolarlık HBM3e yatırımlarına rağmen, yapay zeka modelleri artık ham tensör çekirdeklerine değil, bellek bant genişliğine kurban gidiyor.",
    date: "8 Kas 2026",
    isoDate: "2026-11-08",
    readTime: "5 dk okuma",
    imageUrl: "/blog/sam-altman-ram-krizi.png",
    metrics: [
      { label: "HAFİZA DUVARI", val: "HBM3e" },
      { label: "KV-CACHE", val: "128k Sınırı" },
    ],
    content: [
      "Sam Altman'ın 'trilyon dolarlık çip dökümhanesi' çağrısının perde arkasındaki gerçek: Hesaplama gücü katlanırken, bellek mimarisi fiziksel limitlerine ulaştı.",
      "Transformer mimarilerinin en büyük açmazı olan KV-Cache şişmesi, 128k bağlam pencerelerinde sunucuları kilitliyor.",
      "Yüksek performanslı yapay zeka ürün mühendisliğinde donanım satın almak yetersizdir; kuantizasyon, flash-attention ve bellek bant genişliği optimizasyonu şarttır.",
    ],
  },
  {
    slug: "claude-code-trojan-npm-analiz",
    tag: "YAZILIM TEDARİK ZİNCİRİ",
    category: "guvenlik",
    title: "Anthropic Claude Code ve Trojan Anatomisi: Yazılım Tedarik Zincirinde Zero Trust",
    excerpt: "Geliştirici ortamlarına sızan gizli NPM paketleri ve otonom terminal ajanlarının denetimsiz paket kurulumlarındaki riskler.",
    date: "7 Kas 2026",
    isoDate: "2026-11-07",
    readTime: "5 dk okuma",
    imageUrl: "/blog/claude-hacker-news.jpg",
    metrics: [
      { label: "RİSK SINIFI", val: "NPM Poison" },
      { label: "SAVUNMA", val: "Zero-Trust" },
    ],
    content: [
      "Terminal ajanlarının popülerleşmesiyle birlikte saldırganlar, popüler NPM kütüphanelerinin harf hatası (typosquatting) versiyonlarını doğrudan LLM'lerin öneri kalıplarına enjekte etmeye başladı.",
      "Otonom araçların 'npm install' komutlarını onay almadan çalıştırması, kurumsal geliştirici makinelerini uzaktan kontrol edilen botlara dönüştürebilir.",
      "Kürşat Yılmaz mimarilerinde tüm harici paket bağımlılıkları deterministik sandbox içinde doğrulanmadan üretim ortamına alınmaz.",
    ],
  },
  {
    slug: "ollama-performans-vergisi-vllm",
    tag: "LLM ÇIKARIM MOTORLARI",
    category: "llm",
    title: "Ollama'nın 'Kolaylık Vergisi': Yerel Çıkarımda Neden Saf llama.cpp ve vLLM Kazanıyor?",
    excerpt: "Yerel geliştirici araçlarının prodüksiyonda eşzamanlı istekler altında PagedAttention ve KV-Cache optimizasyon kayıpları.",
    date: "6 Kas 2026",
    isoDate: "2026-11-06",
    readTime: "5 dk okuma",
    imageUrl: "/blog/ollama-performans-vergisi-vllm.png",
    metrics: [
      { label: "GECİKME FARKI", val: "%42 Düşüş" },
      { label: "MOTOR", val: "PagedAttention" },
    ],
    content: [
      "Geliştiricilerin dizüstü bilgisayarlarında sevimli bir ikondan ibaret olan Ollama, gerçek bir Kubernetes kümesinde eşzamanlı 100 kullanıcıya hizmet veremez.",
      "vLLM ve TensorRT-LLM mimarilerinin sürekli batchleme (continuous batching) ve PagedAttention motorları olmadan kurumsal AI ölçeklenemez.",
      "Oyuncağı üretimden ayıran çizgi: Sentetik gecikme süresi (latency) ve token-başına-maliyet denetimidir.",
    ],
  },
  {
    slug: "qwen-acik-kaynak-silikon-vadisi",
    tag: "AÇIK KAYNAK AI",
    category: "llm",
    title: "Çin Açık Kaynağının Zaferi: Qwen'in 'Sonuna Kadar Açık Kaynak' Resti ve Silikon Vadisi Tekeli",
    excerpt: "Kapalı kapılar ardındaki tescilli modellerin karşısında, açık ağırlıklı (open-weights) Qwen modellerinin küresel üstünlüğü.",
    date: "5 Kas 2026",
    isoDate: "2026-11-05",
    readTime: "6 dk okuma",
    imageUrl: "/blog/qwen-acik-kaynak-silikon-vadisi.png",
    metrics: [
      { label: "LİSANS", val: "Apache 2.0" },
      { label: "BENCHMARK", val: "SOTA Tier 1" },
    ],
    content: [
      "Silikon Vadisi şirketleri 'güvenlik' bahanesiyle modelleri API parmaklıkları arkasına hapsederken, açık kaynak Qwen modelleri açık ağırlıklarla dünya pazarını ele geçirdi.",
      "Kurumsal şirketlerin kendi verileri üzerinde fine-tune edebileceği bağımsız açık modeller, geleceğin teknolojik egemenliğinin anahtarıdır.",
    ],
  },
  {
    slug: "openai-1-2-milyon-dolarlik-linux-exploit-skandali",
    tag: "AJAN GÜVENLİĞİ",
    category: "guvenlik",
    title: "OpenAI'ın 1.2 Milyon Dolarlık Linux Exploit Şovu: Açık Kaynak Topluluğuna Kesilen Ağır Fatura",
    excerpt: "Kod yorumlayıcı ve ajan konteynerlarının Linux çekirdeğindeki zafiyetlerle ana sisteme sızma vektörleri.",
    date: "4 Kas 2026",
    isoDate: "2026-11-04",
    readTime: "5 dk okuma",
    imageUrl: "/blog/openai-1-2-milyon-dolarlik-linux-exploit-skandali.png",
    metrics: [
      { label: "ÖDÜL", val: "$1.2M BugBounty" },
      { label: "KATMAN", val: "Kernel Sandbox" },
    ],
    content: [
      "Ajan sanal makinelerinden kaçış zafiyetleri, otonom sistemlerde sıfır güven (zero-trust) mimarisini zorunlu kılmaktadır.",
      "Çalışma zamanında koşan her otonom ajan için hipervizör seviyesinde izolasyon ve deterministik filtreler gereklidir.",
    ],
  },
  {
    slug: "10-kasim-teknolojik-egemenlik-ve-ataturk",
    tag: "TEKNOLOJİK EGEMENLİK",
    category: "mimari",
    title: "10 Kasım ve Teknolojik Egemenlik: 'İstikbal Göklerdedir'den Amerikan API Bayiliğine",
    excerpt: "Bir ülkenin bağımsızlığı, sunucuların nerede çalıştığı ve model ağırlıklarının kime ait olduğuyla doğrudan bağlantılıdır.",
    date: "10 Kas 2026",
    isoDate: "2026-11-10",
    readTime: "7 dk okuma",
    imageUrl: "/blog/10-kasim-teknolojik-egemenlik-ve-ataturk.png",
    metrics: [
      { label: "VİZYON", val: "Tam Bağımsızlık" },
      { label: "MİMARİ", val: "Yerli Ağırlık" },
    ],
    content: [
      "Cumhuriyetin ilk yıllarında uçak fabrikaları ve demir ağlarla kurulan sanayi bağımsızlığı vizyonu, 21. yüzyılda yerini yabancı bulut sağlayıcılarının API lisanslarına bırakamaz.",
      "Gerçek teknolojik egemenlik, kendi hesaplama altyapınız üzerinde koşan deterministik modeller ve kendi donanımınızda çalışan otonom sistemlerle mümkündür.",
    ],
  },
];

export default function BlogArchivePage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = ALL_POSTS_TR.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      {/* Precision Custom Fluid Cursor */}
      <CustomCursor />

      {/* Minimal Obsidian Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#000000]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Ana Sayfa</span>
          </Link>

          <div className="font-archivo font-[800] text-sm tracking-tight text-white">
            KÜRŞAT YILMAZ <span className="font-mono text-zinc-500 font-normal text-xs ml-1.5">// GÜNLÜK</span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://x.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white hover:text-black transition-all"
              aria-label="X"
            >
              <TwitterXIcon className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Archive Content */}
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Header */}
        <div className="mb-12 space-y-3">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase font-mono">
            // GÜNLÜK MÜHENDİSLİK NOTLARI & YAYINLAR
          </p>
          <h1 className="font-archivo font-[800] text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-white leading-[1.1]">
            <span className="block">Yazıya dökülen,</span>
            <span className="block">
              <span className="font-instrument italic font-normal text-white">derin</span>{" "}
              deneyimler.
            </span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed pt-1">
            Yapay zekâ sistem mimarisi, GPU/bellek fiziksel sınırları, otonom ajan güvenliği ve teknoloji endüstrisindeki kırılma noktaları üzerine günlük teknik analiz arşivi.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "Tümü (9)" },
              { id: "mimari", label: "Sistem Mimarisi" },
              { id: "donanim", label: "Donanım & Çip" },
              { id: "llm", label: "LLM & Çıkarım" },
              { id: "guvenlik", label: "Ajan Güvenliği" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? "bg-white text-black font-semibold"
                    : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Makalelerde ara..."
              className="w-full bg-[#0c0c0e] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono transition-colors"
            />
          </div>
        </div>

        {/* 2-Column Grid of All Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <MorphingDialog
              key={post.slug}
              transition={{
                type: "spring",
                bounce: 0.05,
                duration: 0.28,
              }}
            >
              <article className="flex flex-col h-full rounded-3xl border border-white/10 bg-[#0c0c0e] p-4 sm:p-5 transition-all duration-300 hover:border-white/25 group relative overflow-hidden">
                <Spotlight size={360} />

                {/* Clickable Card Visual Trigger */}
                <MorphingDialogTrigger className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 block select-none">
                  <MorphingDialogImage
                    src={post.imageUrl}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Progressive Blur Layer over the lower 58% */}
                  <ProgressiveBlur
                    className="pointer-events-none absolute bottom-0 left-0 h-[58%] w-full"
                    blurIntensity={7}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                  {/* Expand Pill */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:border-white/30 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </div>

                  {/* Overlaid Title & Metadata */}
                  <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full z-10 flex flex-col justify-end">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-2">
                      <span>{post.tag}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <MorphingDialogTitle className="font-archivo font-[800] text-lg sm:text-xl text-white tracking-tight line-clamp-2 leading-snug">
                      {post.title}
                    </MorphingDialogTitle>
                  </div>
                </MorphingDialogTrigger>

                {/* Bottom Bar: Telemetry Metrics + Read Pill */}
                <div className="relative z-10 pt-3 px-1 mt-auto flex items-center justify-between gap-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <div>
                      <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">
                        {post.metrics[0].label}
                      </span>
                      <span className="text-white font-semibold">
                        {post.metrics[0].val}
                      </span>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <div>
                      <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">
                        {post.metrics[1].label}
                      </span>
                      <span className="text-white font-semibold">
                        {post.metrics[1].val}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-medium text-white transition-all shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Yazıyı Oku</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </article>

              {/* Morphing Modal Expansion View */}
              <MorphingDialogContainer>
                <MorphingDialogContent
                  style={{ borderRadius: "24px" }}
                  className="pointer-events-auto relative flex h-auto max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto border border-white/15 bg-[#0c0c0e] text-white shadow-2xl"
                >
                  <MorphingDialogClose />

                  <div className="relative w-full aspect-video overflow-hidden bg-black shrink-0">
                    <MorphingDialogImage
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
                        <span>{post.tag}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <MorphingDialogTitle className="font-archivo font-[800] text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                        {post.title}
                      </MorphingDialogTitle>
                    </div>

                    <MorphingDialogDescription>
                      <div className="space-y-4 text-zinc-300 text-base leading-relaxed font-normal">
                        {post.content.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
                        <span>Kürşat Yılmaz — Mimari Notlar</span>
                        <span>© 2026</span>
                      </div>
                    </MorphingDialogDescription>
                  </div>
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center text-zinc-500 font-mono text-sm">
            Aramanızla eşleşen makale bulunamadı.
          </div>
        )}

        {/* Community Banner at bottom */}
        <div className="mt-16 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141416] to-[#0a0a0c] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Spotlight size={420} />

          <div className="relative z-10 max-w-xl space-y-1">
            <h3 className="font-archivo font-[800] text-xl sm:text-2xl text-white tracking-tight">
              10.000+ Takipçi ile Günlük Teknoloji Gündemi
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
              Her gün yayınlanan analizleri doğrudan akışınızda okumak ve tartışmalara katılmak için kanallardan takip edebilirsiniz.
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
              <span>LinkedIn'de İncele</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </a>

            <a
              href="https://x.com/DevKursat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all shrink-0"
              aria-label="X (Twitter)"
            >
              <TwitterXIcon className="w-3.5 h-3.5" />
            </a>

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
      </div>
    </main>
  );
}
