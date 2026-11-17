import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "alibaba-qwen4-max-kapali-model-carki",
  "tag": "LLM & ÇIKARIM OTOPSİSİ",
  "category": "llm",
  "title": "12 Günlük Açık Kaynak Sözü: Alibaba'nın Qwen4-Max İle Kapalı API Çarkı",
  "excerpt": "Alibaba 'sonuna kadar açık kaynak' açıklamasından 12 gün sonra 2.4T parametreli amiral gemisi Qwen4-Max'i tamamen kapalı ağırlıklarla $1.50/$4.50 fiyatlı API'ye kilitledi.",
  "date": "17 Kas 2026",
  "isoDate": "2026-11-17",
  "readTime": "3 dk okuma",
  "imageUrl": "/blog/alibaba-qwen4-max-kapali-model-carki.png",
  "metrics": [
    {
      "label": "AKTİF PARAMETRE / MOe",
      "val": "71B / 2.4T"
    },
    {
      "label": "WORK360 GÖREV MALİYETİ",
      "val": "$1.67 (-%62)"
    }
  ],
  "content": [
    "Alibaba'nın Qwen ekibi daha 12 gün önce geliştirici topluluklarına 'modellerimiz sonuna kadar açık kaynak kalacak' mesajını vermişti. Bugün yayınlanan amiral gemisi `Qwen4-Max` ise 2.4 trilyon toplam parametre, token başına 71 milyar aktif parametre ve 1 milyon token bağlam penceresiyle sahneye çıktı; ancak küçük bir detayla: ağırlıklar artık indirilemiyor, model yalnızca QwenCloud API arkasında kapalı olarak sunuluyor.",
    "Birim ekonomi ve çıkarım mimarisi açısından Qwen4-Max'in kağıt üzerindeki sıçraması inkâr edilemez: Gated DeltaNet (GDN) ile Qwen Sparse Attention (QSA) katmanlarını birleştirip 328 milyar N-gram embedding ekleyerek önceki Qwen3.8-Max'te 95B olan aktif parametreyi 71B'ye düşürmüşler. Bu sayede `Terminal-Bench 4.0` testinde token tüketimi %48–%49 azalırken, Work360 görev başı ortalama maliyet $4.43 seviyesinden $1.67'ye (%62 düşüş) iniyor ve API liste fiyatı $1.50 input / $4.50 output (1M token) olarak konumlanıyor. Fakat kendi bare-metal vLLM veya llama.cpp kümesinde bu ağırlıkları koşturmak isteyen mühendis için maliyet sıfıra değil, doğrudan satıcı kilitlenmesine (vendor lock-in) çıkıyor.",
    "Açık kaynak dünyasında bu filmi daha önce defalarca izledik. Bir laboratuvar 'biz özgürlükçüyüz' diyerek topluluğun ince ayarlarını, benchmark testlerini ve ekosistem entegrasyonlarını bedavaya toplar; modeli frontier seviyesine çıkardığı sabah ise kapıyı kilitleyip ödeme duvarını çeker.",
    "Mühendislik perspektifinden asıl kırılma noktası, `Qwen4-Max` gibi kapalı API'lere yaslanan kurumsal ajan mimarilerinin veri egemenliği ve gecikme kontrolünü tamamen üçüncü bir buluta devretmesidir. Prompt önbelleklemede $0.075/1M gibi agresif indirimler sunulsa da, yarın API kotası daraldığında veya fiyat politikası değiştiğinde elinizde yerel olarak ayağa kaldırabileceğiniz tek bir `safetensors` ağırlık dosyası bile bulunmaz. Nitekim açık ağırlık (`open-weights`) sözü yalnızca küçük modellerle sınırlı kaldığında, strateji açık kaynak değil bedava pazarlama hunisidir.",
    "Yapay zeka dünyasında 'sonuna kadar açık kaynak' yemini, model gerçekten para basacak kıvama geldiği ilk pazartesi sabahı buharlaşır. Ağırlıkları kendi sunucunuza indiremiyorsanız o teknolojiye sahip değilsiniz; sadece aylık faturasını ödediğiniz yeni bir kiracısınız."
  ],
  "translations": {
    "en": {
      "tag": "LLM & INFERENCE AUTOPSY",
      "title": "The 12-Day Open-Source Pledge: Alibaba Locks Qwen4-Max Behind a Closed API",
      "excerpt": "Twelve days after pledging to stick with open source to the end, Alibaba launched its 2.4T MoE flagship Qwen4-Max as a closed-weight API priced at $1.50/$4.50 per 1M tokens.",
      "date": "Nov 17, 2026",
      "readTime": "3 min read",
      "metrics": [
        {
          "label": "ACTIVE / TOTAL MOE",
          "val": "71B / 2.4T"
        },
        {
          "label": "WORK360 TASK COST",
          "val": "$1.67 (-62%)"
        }
      ],
      "content": [
        "Twelve days ago, Alibaba's Qwen team told the open-source developer community that its models would stick to open source to the end. Today they shipped their flagship `Qwen4-Max`—2.4 trillion total parameters, 71 billion active per token, and a 1M-token context window—with one catch: there are no downloadable weights, only a closed QwenCloud API.",
        "On pure inference unit economics, the architecture gains are real: pairing Gated DeltaNet (GDN) layers with Qwen Sparse Attention (QSA) and 328B N-gram embeddings trims active parameters from 95B (Qwen3.8-Max) down to 71B. Token usage on Terminal-Bench 4.0 drops 48%–49%, average Work360 task cost falls 62% from $4.43 to $1.67, and list API pricing lands at $1.50 input / $4.50 output per million tokens. Yet for engineering teams running bare-metal vLLM or llama.cpp clusters, none of that efficiency translates into self-hosted sovereignty—because you cannot deploy a single weight file on your own GPUs.",
        "The open-source community has seen this exact playbook before. A lab builds goodwill, ecosystem tooling, and free community benchmarks under an open-weights banner—and locks the vault door the very morning its flagship tops the leaderboard.",
        "From a systems architecture standpoint, relying on closed frontier endpoints for production agents trades short-term token discounts (even with $0.075/1M cached inputs) for permanent vendor lock-in. When rate limits tighten or compliance boundaries shift, teams without local `safetensors` weights have zero fallback path.",
        "In AI, 'open source forever' expires the first Monday morning a flagship model is competitive enough to monetize. If you cannot pull the weights onto your own metal, you don't own the stack—you're just renting someone else's endpoint."
      ]
    },
    "de": {
      "tag": "LLM & INFERENZ-AUTOPSIE",
      "title": "Zwölf Tage Open-Source-Versprechen: Alibaba sperrt Qwen4-Max in eine geschlossene API",
      "excerpt": "Nur zwölf Tage nach dem Bekenntnis zu Open Source startet Alibaba sein 2,4-Bio.-Flaggschiff Qwen4-Max als Closed-Weight-API für 1,50 $/4,50 $ pro Million Token.",
      "date": "17. Nov. 2026",
      "readTime": "3 Min. Lesezeit",
      "metrics": [
        {
          "label": "AKTIV / GESAMT MOE",
          "val": "71B / 2.4T"
        },
        {
          "label": "WORK360 KOSTEN/AUFGABE",
          "val": "1,67 $ (-62 %)"
        }
      ],
      "content": [
        "Vor gerade einmal zwölf Tagen versprach Alibabas Qwen-Team der Entwickler-Community, bis zum Ende bei Open Source zu bleiben. Heute erscheint das Flaggschiff `Qwen4-Max` mit 2,4 Billionen Parametern, 71 Milliarden aktiven Parametern pro Token und 1 Million Kontextlänge—jedoch ohne herunterladbare Gewichte hinter einer geschlossenen QwenCloud-API.",
        "Technisch und ökonomisch ist der Sprung beachtlich: Durch Gated DeltaNet (GDN), Qwen Sparse Attention (QSA) und 328 Mrd. N-Gramm-Embeddings sinken die aktiven Parameter von 95B auf 71B. Auf Terminal-Bench 4.0 fällt der Token-Verbrauch um bis zu 49 %, während die Kosten pro Work360-Aufgabe um 62 % von 4,43 $ auf 1,67 $ sinken. Doch für Teams mit eigener vLLM- oder llama.cpp-Infrastruktur bleibt diese Effizienz unerreichbar.",
        "Die Open-Source-Welt kennt dieses Drehbuch längst: Erst holt man sich Reichweite, Tooling und kostenlose Benchmarks aus der Community—und am Tag des Durchbruchs fällt das Schloss vor die Modellgewichte.",
        "Architektonisch tauschen Unternehmen damit günstige API-Preise gegen vollständige Anbieterabhängigkeit. Ohne lokale Gewichte gibt es bei Preisänderungen oder Compliance-Vorgaben keinen Ausweg.",
        "In der KI-Industrie endet 'Open Source für immer' an genau dem Montagmorgen, an dem das Flaggschiff-Modell reif für die Monetarisierung ist."
      ]
    },
    "es": {
      "tag": "AUTOPSIA DE LLM E INFERENCIA",
      "title": "La promesa de 12 días: Alibaba encierra Qwen4-Max tras una API cerrada",
      "excerpt": "Doce días después de prometer código abierto hasta el final, Alibaba lanza su modelo insignia Qwen4-Max (2,4T MoE) con pesos cerrados a $1,50/$4,50 por millón de tokens.",
      "date": "17 nov 2026",
      "readTime": "3 min lectura",
      "metrics": [
        {
          "label": "PARÁMETROS ACTIVOS",
          "val": "71B / 2.4T"
        },
        {
          "label": "COSTE WORK360",
          "val": "$1,67 (-62%)"
        }
      ],
      "content": [
        "Hace apenas doce días, el equipo de Qwen en Alibaba prometía a la comunidad que sus modelos seguirían siendo de código abierto hasta el final. Hoy lanzan `Qwen4-Max` con 2,4 billones de parámetros totales, 71B activos por token y 1M de contexto—pero sin pesos descargables, encerrado tras la API comercial de QwenCloud.",
        "En economía unitaria, el salto arquitectónico es real: al combinar Gated DeltaNet (GDN), Qwen Sparse Attention (QSA) y 328B de embeddings N-gram, los parámetros activos bajan de 95B a 71B. En Terminal-Bench 4.0 el consumo de tokens cae un 49 % y el coste por tarea en Work360 se reduce un 62 % (de $4,43 a $1,67), con tarifas de $1,50/$4,50 por millón de tokens. Sin embargo, para quien opera clústeres propios en vLLM o llama.cpp, esa mejora no aporta soberanía alguna.",
        "La industria ya conoce este guion: primero se capta el cariño y las pruebas de la comunidad bajo la bandera abierta, y la mañana en que el modelo lidera las tablas se cierra el grifo.",
        "Desde la arquitectura de sistemas, depender de endpoints cerrados cambia un descuento temporal por un bloqueo permanente de proveedor sin archivos `safetensors` locales de respaldo.",
        "En inteligencia artificial, la promesa de código abierto eterno caduca el primer lunes en que el modelo insignia está listo para cobrar factura."
      ]
    }
  }
};

export default post;
