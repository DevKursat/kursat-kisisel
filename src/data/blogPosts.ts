export type BlogLang = "tr" | "en" | "zh" | "hi" | "es" | "ar" | "pt" | "de" | "ja";

export interface BlogLangMeta {
  code: BlogLang;
  label: string;
  locale: string;
  dir: "ltr" | "rtl";
}

export const BLOG_LANGUAGES: BlogLangMeta[] = [
  { code: "tr", label: "TR", locale: "tr_TR", dir: "ltr" },
  { code: "en", label: "EN", locale: "en_US", dir: "ltr" },
  { code: "zh", label: "中文", locale: "zh_CN", dir: "ltr" },
  { code: "hi", label: "हिन्दी", locale: "hi_IN", dir: "ltr" },
  { code: "es", label: "ES", locale: "es_ES", dir: "ltr" },
  { code: "ar", label: "AR", locale: "ar_SA", dir: "rtl" },
  { code: "pt", label: "PT", locale: "pt_BR", dir: "ltr" },
  { code: "de", label: "DE", locale: "de_DE", dir: "ltr" },
  { code: "ja", label: "JA", locale: "ja_JP", dir: "ltr" },
];

export interface BlogPostTranslation {
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  metrics: { label: string; val: string }[];
  content: string[];
}

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
  translations?: Partial<Record<Exclude<BlogLang, "tr">, BlogPostTranslation>>;
}

export function resolveBlogLang(raw?: string | null): BlogLang {
  if (!raw) return "tr";
  const normalized = raw.toLowerCase().trim() as BlogLang;
  return BLOG_LANGUAGES.some((l) => l.code === normalized) ? normalized : "tr";
}

export function getBlogLangMeta(lang: BlogLang): BlogLangMeta {
  return BLOG_LANGUAGES.find((l) => l.code === lang) ?? BLOG_LANGUAGES[0];
}

export function getLocalizedPost(post: BlogPostItem, lang: BlogLang): BlogPostItem {
  if (lang === "tr" || !post.translations?.[lang]) {
    return post;
  }
  const trData = post.translations[lang]!;
  return {
    ...post,
    tag: trData.tag,
    title: trData.title,
    excerpt: trData.excerpt,
    date: trData.date,
    readTime: trData.readTime,
    metrics: trData.metrics,
    content: trData.content,
  };
}

export const SITE_URL = "https://kursat.itibar.app";

export const BLOG_POSTS: BlogPostItem[] = [
  {
    slug: "nvidia-jensen-huang-megaspeed-skandali",
    tag: "DONANIM OTOPSİSİ",
    category: "donanim",
    title: "12 Milyar Dolarlık Arka Kapı: Jensen Huang İstifası ve Silikon Vadisi'nin 'Stand with Jensen' İkiyüzlülüğü",
    excerpt: "Singapur ve Malezya paravanları üzerinden Çin'e akan milyarlarca dolarlık kısıtlı GPU, Kongre celpleri ve ardından 135.000 imzayla başlatılan kurtarma tiyatrosu.",
    date: "15 Kas 2026",
    isoDate: "2026-11-15",
    readTime: "4 dk okuma",
    imageUrl: "/blog/nvidia-jensen-huang-megaspeed-skandali.jpg",
    metrics: [
      { label: "ARACI ÇİP SİPARİŞİ", val: "12 Milyar $" },
      { label: "İMZA KAMPANYASI", val: "135.000+" },
    ],
    content: [
      "33 yıllık koltuğunu bir günde bırakıp istifa eden Nvidia CEO'su Jensen Huang için Silikon Vadisi üç günde 135.000 imzalı 'Stand with Jensen' dilekçesi topladı. Ortada küçük bir detay var: Mesele masum bir ofis dedikodusu değil, Singapur merkezli Megaspeed ve Malezya bağlantılı paravan hatlar üzerinden Çin'e aktığı iddia edilen 12 milyar dolarlık kısıtlı GPU ticareti.",
      "Yıllardır ABD Kongresi'ne çıkıp 'ihracat kontrollerine harfiyen uyuyoruz, ulusal güvenlik bizim önceliğimiz' diye vaaz veren bir donanım tekelinin, aynı anda Güneydoğu Asya'daki aracı bulut ortakları üzerinden milyarlarca dolarlık çip siparişi geçmesi; kendi evine alarm sistemi satıp arka bahçe kapısını komşunun kamyonuna açık bırakan güvenlik şirketine benziyor. Yönetim kurulu iç soruşturma açıp ABD Kongresi belgeleri ve ifadeleri masaya koyunca, 600 milyar doları aşan piyasa değeri dalgalanması arasında istifa faturası kesildi.",
      "İşin en komik kısmı ise Elon Musk dahil teknoloji baronlarının hemen ertesi gün açtığı imza kampanyası oldu. Milyar dolarlık donanım tedarik zincirini devlet regülasyonlarının etrafından dolaştıran bir CEO söz konusu olduğunda, 'liyakat' ve 'etik' kuralları bir anda 'haksızlığa uğrayan dahi kurucu' romantizmine dönüşüyor. Sıradan bir mühendis şirket sunucusuna izinsiz SSH açsa kapının önüne koyan bu düzen, konu kendi hisse senedi olduğunda Change.org'dan hallice dilekçelerle adalet dağıtıyor.",
    ],
    translations: {
      en: {
        tag: "HARDWARE AUTOPSY",
        title: "The $12 Billion Back Door: Jensen Huang's Resignation and Silicon Valley's 'Stand with Jensen' Hypocrisy",
        excerpt: "Billions in restricted GPUs routed to China via Singapore and Malaysia shell partners, Congressional subpoenas, and a 135,000-signature rescue theater.",
        date: "Nov 15, 2026",
        readTime: "4 min read",
        metrics: [
          { label: "BROKERED GPU ORDERS", val: "$12 Billion" },
          { label: "PETITION SIGNATURES", val: "135,000+" },
        ],
        content: [
          "Within 72 hours of Nvidia CEO Jensen Huang abruptly resigning after 33 years at the helm, Silicon Valley rallied over 135,000 signatures for a 'Stand with Jensen' reinstatement campaign. There is just one minor detail everyone glosses over: this is not innocent office gossip, it is an alleged $12 billion pipeline of restricted GPUs brokered toward China through Singapore-based Megaspeed and Southeast Asian intermediaries.",
          "For years, the hardware monopoly stood before the U.S. Congress preaching strict adherence to export controls and national security, while billions in constrained silicon allegedly flowed through indirect cloud partners. It is the corporate equivalent of selling armored front doors while leaving the backyard gate unlocked for freight trucks. Once board inquiries and Congressional preservation demands collided with a $600B+ market-cap swing, the resignation bill came due.",
          "The punchline is watching billionaire founders—including Elon Musk—launch an open-letter rescue tour the very next morning. When a junior engineer leaves an unauthorized SSH port open, they are escorted out before lunch. When a trillion-dollar monopoly routes around federal export guardrails, 'meritocracy' suddenly turns into a Change.org petition.",
        ],
      },
      zh: {
        tag: "硬件剖析",
        title: "120亿美元的后门：黄仁勋辞职与硅谷“力挺Jensen”的虚伪剧场",
        excerpt: "经由新加坡与马来西亚中间商流向中国的数十亿美元受限GPU、美国国会传票，以及随后13.5万人签名的公关救场。",
        date: "2026年11月15日",
        readTime: "4 分钟阅读",
        metrics: [
          { label: "中间商芯片订单", val: "120亿美元" },
          { label: "请愿签名数", val: "135,000+" },
        ],
        content: [
          "执掌英伟达33年的CEO黄仁勋突然辞职后，硅谷在短短三天内为“Stand with Jensen”请愿书收集了超过13.5万个签名。但所有人都在刻意忽略一个关键细节：这并不是无伤大雅的办公室八卦，而是涉及通过新加坡Megaspeed及东南亚关联渠道向中国输送高达120亿美元受限GPU的调查风暴。",
          "多年来，这家硬件巨头在国会山反复强调自己严格遵守出口管制与国家安全底线，与此同时却任由间接云合作伙伴经手百亿美元级别的芯片订单。这就像一家安保公司高价兜售防盗门，却把后院大门向货运卡车敞开。当董事会内部调查与国会调查令撞上超过6000亿美元的市值震荡时，辞职只是迟早的代价。",
          "最讽刺的一幕是包括埃隆·马斯克在内的科技大佬们第二天就高调发起联名挽留。普通工程师若擅自开放一个SSH端口，午饭前就会被保安请出大楼；而当万亿级硬件垄断者绕开监管红线时，“精英治理”立刻变成了一场堪比请愿网站的浪漫主义表演。",
        ],
      },
      hi: {
        tag: "हार्डवेयर पोस्टमॉर्टम",
        title: "12 बिलियन डॉलर का बैकडोर: जेन्सेन हुआंग का इस्तीफा और सिलिकॉन वैली का 'Stand with Jensen' पाखंड",
        excerpt: "सिंगापुर और मलेशिया के शेल पार्टनर्स के जरिए चीन तक पहुंचे प्रतिबंधित GPU, अमेरिकी कांग्रेस के समन और 1.35 लाख हस्ताक्षरों का ड्रामा।",
        date: "15 नवम्बर 2026",
        readTime: "4 मिनट",
        metrics: [
          { label: "ब्रोकर चिप ऑर्डर", val: "$12 बिलियन" },
          { label: "याचिका हस्ताक्षर", val: "135,000+" },
        ],
        content: [
          "Nvidia के 33 साल पुराने CEO जेन्सेन हुआंग के अचानक इस्तीफे के 72 घंटों के भीतर, सिलिकॉन वैली ने 'Stand with Jensen' अभियान के लिए 1,35,000 से अधिक हस्ताक्षर जुटा लिए। लेकिन एक छोटी सी बात सब नजरअंदाज कर रहे हैं: यह कोई मामूली ऑफिस गपशप नहीं, बल्कि सिंगापुर की Megaspeed और दक्षिण-पूर्व एशियाई मध्यस्थों के जरिए चीन को कथित तौर पर $12 बिलियन के प्रतिबंधित GPU भेजने का मामला है।",
          "सालों तक अमेरिकी कांग्रेस के सामने निर्यात नियमों और राष्ट्रीय सुरक्षा का उपदेश देने वाली हार्डवेयर मोनोपॉली के चिप्स कथित तौर पर इनडायरेक्ट क्लाउड पार्टनर्स के रास्ते बहते रहे। यह ठीक वैसा ही है जैसे कोई सिक्योरिटी कंपनी बख्तरबंद दरवाजा बेचे और पिछवाड़े का गेट ट्रकों के लिए खुला छोड़ दे। जब बोर्ड की जांच और कांग्रेस के नोटिस $600 बिलियन से ज्यादा की मार्केट कैप उठापटक से टकराए, तो इस्तीफा तय था।",
          "सबसे मजेदार हिस्सा यह है कि एलन मस्क समेत टेक दिग्गजों ने अगले ही दिन ऑनलाइन याचिका शुरू कर दी। एक जूनियर इंजीनियर बिना अनुमति SSH पोर्ट खोल दे तो लंच से पहले नौकरी जाती है, लेकिन जब ट्रिलियन-डॉलर मोनोपॉली नियमों को बाईपास करे तो 'मेरिटोक्रेसी' तुरंत एक इमोशनल कैंपेन बन जाती है।",
        ],
      },
      es: {
        tag: "AUTOPSIA DE HARDWARE",
        title: "La puerta trasera de 12.000 millones: La renuncia de Jensen Huang y la hipocresía de 'Stand with Jensen'",
        excerpt: "Miles de millones en GPUs restringidas desviadas hacia China vía Singapur y Malasia, citaciones del Congreso y un teatro de 135.000 firmas.",
        date: "15 nov 2026",
        readTime: "4 min lectura",
        metrics: [
          { label: "PEDIDOS DE CHIPS", val: "12.000 M$" },
          { label: "FIRMAS REUNIDAS", val: "135.000+" },
        ],
        content: [
          "En solo 72 horas tras la repentina dimisión de Jensen Huang después de 33 años al frente de Nvidia, Silicon Valley reunió más de 135.000 firmas en la campaña 'Stand with Jensen'. Solo hay un pequeño detalle que todos omiten: no se trata de un chisme de oficina, sino de una presunta ruta de 12.000 millones de dólares en GPUs restringidas hacia China a través de Megaspeed en Singapur y filiales del Sudeste Asiático.",
          "Durante años, el monopolio del hardware predicó ante el Congreso estadounidense su cumplimiento estricto de los controles de exportación, mientras miles de millones en silicio circulaban por socios cloud indirectos. Es el equivalente corporativo de vender puertas blindadas y dejar abierto el portón trasero. Cuando la investigación interna y las citaciones del Congreso chocaron con una sacudida bursátil superior a 600.000 millones, llegó la factura.",
          "Lo más cómico fue ver a barones tecnológicos como Elon Musk lanzar una petición de rescate al día siguiente. Si un ingeniero abre un puerto SSH sin permiso, sale despedido antes del almuerzo; si un monopolio de billones esquiva controles federales, la 'meritocracia' se convierte en una campaña de firmas.",
        ],
      },
      ar: {
        tag: "تشريح العتاد",
        title: "الباب الخلفي بـ 12 مليار دولار: استقالة جنسن هوانغ ونفاق حملة 'Stand with Jensen' في وادي السيليكون",
        excerpt: "مليارات الدولارات من معالجات الرسوميات المقيدة المتدفقة نحو الصين عبر وسطاء في سنغافورة وماليزيا، واستدعاءات الكونغرس ومسرحية الـ 135 ألف توقيع.",
        date: "15 نوفمبر 2026",
        readTime: "4 دقائق",
        metrics: [
          { label: "طلبات الرقائق الوسيطة", val: "12 مليار $" },
          { label: "توقيعات الحملة", val: "135,000+" },
        ],
        content: [
          "خلال 72 ساعة فقط من الاستقالة المفاجئة للرئيس التنفيذي لشركة إنفيديا جنسن هوانغ بعد 33 عاماً في منصبه، جمع وادي السيليكون أكثر من 135 ألف توقيع لحملة 'Stand with Jensen' للمطالبة بإعادته. هناك تفصيل صغير يتجاهله الجميع: القضية ليست مجرد إشاعة مكتبية، بل شبكة طلبات مزعومة بقيمة 12 مليار دولار من معالجات GPU المقيدة التي وصلت إلى الصين عبر شركة Megaspeed في سنغافورة وشركات وسيطة في جنوب شرق آسيا.",
          "لسنوات طويلة، وقف احتكار العتاد أمام الكونغرس الأمريكي ليتحدث عن الالتزام الصارم بضوابط التصدير والأمن القومي، بينما كانت المليارات من الرقائق تتدفق عبر شركاء سحابة غير مباشرين. يشبه الأمر شركة أمنية تبيع أبواباً مصفحة وتترك بوابة الحديقة الخلفية مفتوحة للشاحنات. وعندما اصطدمت تحقيقات مجلس الإدارة واستدعاءات الكونغرس بتقلبات تجاوزت 600 مليار دولار في القيمة السوقية، حان وقت دفع الفاتورة.",
          "الجزء الأكثر سخرية هو رؤية أقطاب التكنولوجيا، ومنهم إيلون ماسك، يطلقون عريضة إنقاذ في اليوم التالي مباشرة. عندما يفتح مهندس عادي منفذ SSH غير مصرح به يُطرد قبل الغداء، أما عندما يلتف احتكار تريليوني حول ضوابط التصدير الفيدرالية، تتحول 'الجدارة' فجأة إلى عريضة توقيعات عاطفية.",
        ],
      },
      pt: {
        tag: "AUTÓPSIA DE HARDWARE",
        title: "A Porta dos Fundos de US$ 12 Bilhões: A Renúncia de Jensen Huang e a Hipocrisia do 'Stand with Jensen'",
        excerpt: "Bilhões em GPUs restritas escoadas para a China via Singapura e Malásia, intimações do Congresso e o teatro de 135 mil assinaturas.",
        date: "15 nov 2026",
        readTime: "4 min de leitura",
        metrics: [
          { label: "PEDIDOS DE CHIPS", val: "US$ 12 Bi" },
          { label: "ASSINATURAS", val: "135.000+" },
        ],
        content: [
          "Em apenas 72 horas após a renúncia abrupta de Jensen Huang depois de 33 anos no comando da Nvidia, o Vale do Silício reuniu mais de 135.000 assinaturas na campanha 'Stand with Jensen'. Há apenas um pequeno detalhe ignorado por todos: não se trata de fofoca de escritório, mas de uma suposta rota de US$ 12 bilhões em GPUs restritas intermediadas para a China via Megaspeed, em Singapura.",
          "Durante anos, o monopólio de hardware pregou ao Congresso americano respeito absoluto aos controles de exportação, enquanto bilhões em silício circulavam por parceiros indiretos no Sudeste Asiático. É o equivalente corporativo a vender portas blindadas deixando o portão dos fundos destrancado. Quando a investigação interna e as intimações do Congresso colidiram com uma oscilação superior a US$ 600 bilhões em valor de mercado, a conta chegou.",
          "A piada pronta veio no dia seguinte com bilionários como Elon Musk puxando um abaixo-assinado de resgate. Se um engenheiro abre uma porta SSH sem permissão, é demitido antes do almoço; quando um monopólio trilionário contorna regras federais, a 'meritocracia' vira petição online.",
        ],
      },
      de: {
        tag: "HARDWARE-AUTOPSIE",
        title: "Die 12-Milliarden-Dollar-Hintertür: Jensen Huangs Rücktritt und die 'Stand with Jensen'-Heuchelei",
        excerpt: "Milliarden an regulierten GPUs über Singapur und Malaysia Richtung China, US-Kongress-Vorladungen und eine 135.000-Unterschriften-Show.",
        date: "15. Nov. 2026",
        readTime: "4 Min. Lesezeit",
        metrics: [
          { label: "VERMITTELTE CHIPS", val: "12 Mrd. $" },
          { label: "UNTERSCHRIFTEN", val: "135.000+" },
        ],
        content: [
          "Binnen 72 Stunden nach dem abrupten Rücktritt von Nvidia-CEO Jensen Huang nach 33 Jahren sammelte das Silicon Valley über 135.000 Unterschriften für 'Stand with Jensen'. Ein kleines Detail wird dabei gern übersehen: Es geht nicht um harmlosen Bürotratsch, sondern um mutmaßlich 12 Milliarden Dollar an regulierten GPUs, die über Megaspeed in Singapur und südostasiatische Zwischenhändler nach China gelenkt wurden.",
          "Jahrelang predigte das Hardware-Monopol vor dem US-Kongress strikte Exportkontrollen und nationale Sicherheit, während über indirekte Cloud-Partner Milliardenwerte bewegt wurden. Das ist wie ein Sicherheitsdienst, der Panzertüren verkauft, aber das Hintertor für Lkw offen lässt. Als interne Board-Untersuchungen und Kongress-Vorladungen auf über 600 Milliarden Dollar Börsenschwankung trafen, war der Rücktritt fällig.",
          "Am absurdesten ist die Rettungskampagne von Tech-Milliardären wie Elon Musk am nächsten Morgen. Öffnet ein Entwickler unbefugt einen SSH-Port, fliegt er vor dem Mittagessen raus; umgeht ein Billionen-Konzern Exportregeln, wird plötzlich eine Petition gestartet.",
        ],
      },
      ja: {
        tag: "ハードウェア解剖",
        title: "120億ドルの裏口：ジェンスン・フアン辞任とシリコンバレー「Stand with Jensen」の偽善",
        excerpt: "シンガポールとマレーシア経由で中国へ流れたとされる規制対象GPU、米議会の召喚状、そして13.5万人の署名茶番劇。",
        date: "2026年11月15日",
        readTime: "4分で読了",
        metrics: [
          { label: "仲介チップ注文額", val: "120億ドル" },
          { label: "署名キャンペーン", val: "135,000+" },
        ],
        content: [
          "NvidiaのCEOを33年間務めたジェンスン・フアンが電撃辞任してからわずか72時間で、シリコンバレーは「Stand with Jensen」の復帰署名に13万5,000筆以上を集めた。だが誰も触れようとしない小さな事実がある。これは単なる社内のゴシップではなく、シンガポールのMegaspeedや東南アジアの仲介網を通じて中国へ流れたとされる120億ドル規模の規制GPU取引をめぐる問題だ。",
          "長年、米議会の前で「輸出規制と国家安全保障を厳格に順守している」と説教を垂れていたハードウェア独占企業の裏で、間接的なクラウド提携先を通じた巨額のチップ発注が続いていた。防弾ドアを売りながら裏口をトラック向けに開け放す警備会社と同じだ。取締役会の調査と議会の追及、そして6,000億ドル超の時価総額乱高下が重なった結果、辞任という請求書が回ってきた。",
          "最も滑稽なのは、翌朝にはイーロン・マスクらテック界の重鎮が署名運動を始めたことだ。現場のエンジニアが無断でSSHポートを開ければ昼前に解雇されるのに、1兆ドル企業のトップが輸出規制をすり抜けた途端、「実力主義」はただの署名ごっこに成り下がる。",
        ],
      },
    },
  },
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
