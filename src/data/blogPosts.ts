export interface BlogPostItem {
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

export const SITE_URL = "https://kursat.itibar.app";

export const BLOG_POSTS: BlogPostItem[] = [
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
    title: "Bulutun %99.99 SLA Yalanı: Microsoft ve Claude Aynı Gün Çökünce Korkan CTO'lar",
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

export function getBlogPostBySlug(slug: string): BlogPostItem | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
