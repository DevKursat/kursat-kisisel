import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  slug: "google-gmail-mcp-ve-30-gunluk-hafiza-tuzagi",
  tag: "PLATFORM KİLİDİ & MCP",
  category: "mimari",
  title: "Gmail Açık, Hafıza Yasak: Google'ın AI Ajanlarına Kurduğu MCP Tuzağı",
  excerpt:
    "Google, 1 Şubat 2027'den itibaren tüm yapay zekâ ajanlarını doğrudan REST API yerine kendi MCP sunucularına zorunlu kıldı. Paketin içinden ise sıfırlanan ücretsiz kota, e-posta gönderemeyen otonom uç nokta ve 30 günlük hafıza silme şartı çıktı.",
  date: "27 Kas 2026",
  isoDate: "2026-11-27",
  readTime: "4 dk okuma",
  imageUrl: "/blog/google-gmail-mcp-ve-30-gunluk-hafiza-tuzagi.png",
  metrics: [
    {
      label: "TAKSİMETRE ARBİTRAJI",
      val: "REST Ücretsiz Eşik vs. MCP 1. İstekten $0.10–$0.50/1K",
    },
    {
      label: "OTONOMİ & HAFIZA KİLİDİ",
      val: "/mcp/v1self Gönderim Yok · 30 Gün RAG İmhası",
    },
  ],
  content: [
    "Sahnede anlatılan hikâye kusursuz görünüyordu: Google, sekiz çekirdek **Google Workspace** servisi için resmî **Model Context Protocol (`MCP`)** sunucularını genel kullanıma açtı ve açık standartlara destek verdiğini duyurdu. Ancak aynı hafta sessizce yürürlüğe giren **Workspace AI Tools Addendum** sözleşmesi okunduğunda tablo tersine dönüyor. **`1 Şubat 2027`** tarihinden itibaren bir yapay zekâ ajanı, ajan orkestrasyon katmanı (`AI Harness`) veya dil modeli barındıran herhangi bir yazılımın doğrudan **Gmail, Drive ve Calendar REST API** uç noktalarını çağırması sözleşme ihlali sayılıyor; ajan kimliğini gizlemeye çalışan projelerin erişimi ise anında askıya alınıyor.",
    "Birim ekonomi ve **API maliyet arbitrajı** açısından asıl tuzak fiyatlandırma tablosunda yatıyor. Klasik deterministik yazılımlar (`CRM` senkronizasyonu, yedekleme betikleri) ücretli **Scaled Tier** paketine geçtiklerinde bile her işlem kategorisinde günlük ücretsiz kullanım eşiğini (`daily no-charge allowance`) koruyor. Buna karşılık MCP kapısına mecbur bırakılan yapay zekâ ajanları, günlük **`5.000` istek** tavanlı ücretsiz **Standard Tier** sınırını aşıp **Scaled Tier**'a adım attıkları saniye **tüm ücretsiz kota haklarını kaybediyor**. **`1 Nisan 2027`** itibarıyla Gmail, Drive ve Calendar MCP sunucularında daha **ilk başarılı (`2xx`) istekten** itibaren `Light` (`$0.10 / 1K`), `Medium` (`$0.20 / 1K`), `Plus` (`$0.25 / 1K`) ve `Premium` (`$0.50 / 1K`) tarifesi çalışmaya başlıyor. Üstelik tek bir bileşik (`composite`) MCP araç çağrısı arka planda birden fazla API isteği tetiklediği için faturaya çoklu birim olarak yazılıyor; `HTTP 200` içinde `isError: true` dönen başarısız çağrılar bile dakikalık ve günlük `5.000` kotayı eritmeye devam ediyor.",
    "Mimari kısıtlama bununla da bitmiyor; Google'ın resmî Gmail MCP sunucusu ajanları iki ayrı uç noktaya bölüyor. **`30` aracın** tamamını barındıran birincil `/mcp/v1` uç noktası, hassas işlemlerde etkileşimli kullanıcı onay formu (`MCP form elicitation`) şartı koşuyor. İnsan müdahalesi olmadan arka planda çalışan otonom ajanların ve form protokolünü desteklemeyen istemcilerin kullanabildiği `/mcp/v1self` uç noktasında ise araç sayısı **`25`'e düşüyor**: **`send_message`, `reply` ve `forward` yetkileri tamamen sökülmüş durumda**. Yani otonom e-posta ajanınız gelen kutusunu okuyup taslak (`create_draft`) hazırlayabiliyor ama tek bir e-postayı bile kendi başına gönderemiyor.",
    "Ürün geliştiren ekipleri en ağır vuracak madde ise sözleşmenin **`2(b)`** bendine gizlenmiş durumda. Google; Gmail ve Drive erişiminden türetilen **vektör gömmelerini (`vector embeddings`), bellek indekslerini (`memory indexes`), kullanıcı profillerini ve organizasyon grafiklerini** *\"Google Teknik Bilgisi\"* olarak tanımlıyor ve bunların **`30` günden uzun saklanmasını kesin olarak yasaklıyor**. Şirketinizin geçen yılki tedarikçi sözleşmelerini veya müşteri yazışmalarını anlamlandıran kurumsal bir `RAG` asistanı mı kurdunuz? Her ayın birinde sistemin hafızasını sıfırlamak ve yüz binlerce belgeyi baştan indeksleyerek hem LLM embedding maliyetini hem de Google'ın MCP okuma taksimetresini her 30 günde bir yeniden ödemek zorundasınız. Kapısına \"açık protokol\" tabelası asıp içerideki kiracıya her ay hafıza sildirmek güvenlik değil, dijital gişe memurluğudur. Kapı açık, kelepçe içeride.",
    "Ticari zamanlama ise bu mimari kuşatmanın tesadüf olmadığını kanıtlıyor. Sözleşmenin **`2(g)`** maddesi, Workspace verisi veya türetilmiş indeksler kullanılarak Google servislerine benzer ya da rakip bir ürün geliştirilmesini açıkça yasaklıyor. Tam da dışarıdaki girişimlerin otonom e-posta gönderimi ve uzun süreli kurumsal hafızası budanırken, Google aynı ay yapay zekâlı e-posta ve takvim planlama girişimi **Howie AI**'ı satın aldı; ekosistemin merkezindeki yerleşik **Google Gemini** ise doğal olarak tüm bu üçüncü parti MCP bariyerlerinin üzerinde oturuyor.",
    "CTO'lar, SaaS kurucuları ve sistem mimarları için bu tablo 1990'ların meşhur *\"Benimse, Genişlet, Söndür\" (`Embrace, Extend, Extinguish`)* stratejisinin 2026 modelidir. Ürün yol haritanızı ve kurumsal hafıza katmanınızı tek bir bulut devinin OAuth anahtarına bağladığınızda, tek satırlık sözleşme ekiyle iş modeliniz geceden sabaha kiralık bir vitrine dönüşür. Açık protokol diye alkışladığınız kapının kilidi hâlâ ev sahibinin cebinde duruyor:)",
  ],
  translations: {
    en: {
      tag: "PLATFORM LOCK-IN & MCP",
      title: "Google Forces AI Agents Onto Gmail MCP—Then Wipes Their 30-Day Memory",
      excerpt:
        "Starting February 1, 2027, Google bans AI agents from calling Workspace REST APIs directly in favor of its own MCP servers—stripping free Scaled Tier quotas, blocking autonomous email sends on /mcp/v1self, and capping vector memory at 30 days.",
      date: "Nov 27, 2026",
      readTime: "4 min read",
      metrics: [
        {
          label: "BILLING METER ARBITRAGE",
          val: "REST Free Allowance vs. MCP $0.10–$0.50/1K From Call #1",
        },
        {
          label: "AUTONOMY & MEMORY LOCK",
          val: "No Send on /mcp/v1self · 30-Day Embedding Wipe",
        },
      ],
      content: [
        "On stage, the pitch sounded like a triumph for open standards: Google made eight official **Google Workspace Model Context Protocol (`MCP`)** servers generally available so AI agents could connect out of the box. Read the binding **Workspace AI Tools Addendum** published alongside the rollout, however, and the open-door narrative snaps shut. Starting **`February 1, 2027`**, any software driven by an AI Agent, an `AI Harness`, or an underlying AI model is prohibited from calling **Gmail, Drive, and Calendar REST APIs** directly without routing through Google's MCP servers—and attempting to obfuscate an agent's identity triggers immediate account suspension.",
        "Run the **unit-economics and billing arbitrage**, and the structural tax becomes unmistakable. Traditional non-AI software (`CRM` syncs, deterministic backup jobs) enrolled in Google's paid **Scaled Tier** retains an independent **daily no-charge allowance** across every billing bucket before paying a cent. AI agents forced onto Google's MCP servers get the exact opposite deal: the moment your project outgrows the **`5,000` requests/day** Standard Tier cap and upgrades to Scaled Tier, **your free MCP allowance drops to zero**. Starting **`April 1, 2027`**, Gmail, Drive, and Calendar MCP servers bill from the **very first successful (`2xx`) request** across `Light` (`$0.10 / 1K`), `Medium` (`$0.20 / 1K`), `Plus` (`$0.25 / 1K`), and `Premium` (`$0.50 / 1K`) buckets. Worse, composite MCP tools fire multiple underlying API calls and bill as multiple units, while failed `HTTP 200` tool calls returning `isError: true` still burn your `5,000/day` quota.",
        "Architecturally, Google also splits its Gmail MCP server into two uneven endpoints. The primary `/mcp/v1` endpoint exposes all **`30` tools**, gating sensitive mutations behind interactive **MCP form elicitation** popups. Background autonomous agents and MCP hosts that cannot render interactive approval forms are pushed onto `/mcp/v1self`, where the toolset shrinks to **`25` tools** and **`send_message`, `reply`, and `forward` are completely omitted**. Your autonomous email agent can read threads and create drafts, yet cannot mail the envelope.",
        "The sharpest blade for AI startups sits in **Section `2(b)`** of the Addendum. Google classifies **vector embeddings, memory indexes, user profiles, and organizational graphs** derived from Workspace access as *\"Google Technical Information\"*—and **forbids storing any of it for more than `30` days**. Built an enterprise `RAG` assistant that answers questions across last year's vendor contracts in Gmail and Drive? You now have to lobotomize its vector database on the first of every month and re-ingest the entire corpus from scratch, multiplying both your LLM embedding spend and Google's per-request MCP meter twelve times a year. Hanging an \"open protocol\" sign over the door while charging at request one and wiping tenant memory monthly is not safety—it is tollbooth engineering. Open door, handcuffs inside.",
        "The competitive timing leaves zero mystery. **Section `2(g)`** explicitly bars developers from using Workspace data or derived technical indexes to build any product similar to a Google Workspace service. In the very same month Google kneecapped third-party autonomous email sending and long-term inbox memory, it acquired AI email-scheduling startup **Howie AI**, while native **Google Gemini** operates comfortably inside the first-party moat.",
        "For CTOs, SaaS founders, and systems architects, this is 1990s *Embrace, Extend, Extinguish* rebuilt for the agentic era. When your product's memory layer and execution loop depend on a hyperscaler's OAuth gate, a single Terms of Service addendum can turn your autonomous roadmap into a metered draft-writer overnight. Even when the protocol is open, the landlord still owns the lock:)",
      ],
    },
    de: {
      tag: "PLATTFORM-LOCK-IN & MCP",
      title: "Gmail-MCP-Falle: Google löscht KI-Agenten alle 30 Tage das Gedächtnis",
      excerpt:
        "Ab dem 1. Februar 2027 zwingt Google alle KI-Agenten weg von direkten REST-APIs auf eigene Workspace-MCP-Server – streicht dort das Gratis-Kontingent im Scaled Tier, blockiert autonomes Senden und verbietet Vektor-Speicher über 30 Tage.",
      date: "27. Nov. 2026",
      readTime: "4 Min. Lesezeit",
      metrics: [
        {
          label: "GEBÜHREN-ARBITRAGE",
          val: "REST-Freibetrag vs. MCP 0,10–0,50 $/1K ab Call #1",
        },
        {
          label: "AUTONOMIE- & SPEICHER-SPERRE",
          val: "Kein Senden auf /mcp/v1self · 30-Tage-RAG-Limit",
        },
      ],
      content: [
        "Auf der Bühne klang alles nach offener Standardisierung: Google hat acht offizielle **Google-Workspace-MCP-Server** allgemein verfügbar gemacht. Doch ein Blick in das verbindliche **Workspace AI Tools Addendum** zeigt die Kehrseite. Ab dem **`1. Februar 2027`** darf kein Werkzeug, das von einem KI-Agenten oder `AI Harness` gesteuert wird, direkt auf die **REST-APIs von Gmail, Drive oder Calendar** zugreifen. Wer versucht, einen Agenten als klassische Integration zu tarnen, riskiert die sofortige Kontosperrung.",
        "Ökonomisch steckt die eigentliche Falle in der **Quota- und Preis-Arbitrage**. Klassische Nicht-KI-Anwendungen behalten im kostenpflichtigen **Scaled Tier** in jeder Preiskategorie ein tägliches **Gratis-Kontingent (`daily no-charge allowance`)**. KI-Agenten auf Googles Pflicht-MCP-Servern verlieren dieses Privileg vollständig: Sobald ein Projekt das Standard-Limit von **`5.000` Anfragen pro Tag** überschreitet und in den Scaled Tier wechselt, **entfällt jeder Freibetrag**. Ab dem **`1. April 2027`** wird bei Gmail-, Drive- und Calendar-MCP-Servern ab der **allerersten erfolgreichen (`2xx`) Anfrage** abgerechnet (`$0.10` bis `$0.50` pro `1.000` Einheiten), während zusammengesetzte MCP-Tools mehrfach zählen.",
        "Hinzu kommt die technische Beschneidung des Gmail-MCP-Servers. Während `/mcp/v1` alle **`30` Tools** nur über interaktive Bestätigungsformulare (`MCP form elicitation`) freigibt, fehlen auf dem autonomen Hintergrund-Endpunkt `/mcp/v1self` (**`25` Tools**) ausgerechnet **`send_message`, `reply` und `forward`**. Ein Hintergrund-Agent darf Entwürfe anlegen, aber keine einzige E-Mail selbst absenden.",
        "Am härtesten trifft KI-Produkte jedoch **Abschnitt `2(b)`**: Vektor-Embeddings (`vector embeddings`), Speicherindizes und Organisationsgraphen aus Workspace-Daten gelten als *„Google Technical Information“* und **dürfen maximal `30` Tage gespeichert werden**. Wer einen Unternehmens-`RAG`-Assistenten für historische Verträge baut, muss dessen Vektorgedächtnis jeden Monat löschen und das gesamte Postfach neu indizieren – auf eigene Token- und MCP-Gebührenkosten. Offene Tür draußen, Handschellen drinnen.",
        "Zeitgleich untersagt **Abschnitt `2(g)`**, mit diesen Daten Dienste zu entwickeln, die Google-Workspace-Funktionen ähneln – genau in dem Monat, in dem Google das KI-Scheduling-Startup **Howie AI** übernommen hat und **Google Gemini** nativ im eigenen Ökosystem bevorzugt.",
        "Für CTOs und SaaS-Gründer ist das klassisches *Embrace, Extend, Extinguish* im Gewand des Jahres 2026: Wer Gedächtnis und Ausführung seiner Agenten an fremde OAuth-Schranken kettet, baut auf gemietetem Boden, dessen Maut jederzeit erhöht werden kann:)",
      ],
    },
    es: {
      tag: "BLOQUEO DE PLATAFORMA Y MCP",
      title: "La trampa MCP de Google: Gmail sin memoria de 30 días para agentes IA",
      excerpt:
        "Desde el 1 de febrero de 2027, Google prohíbe a los agentes de IA usar las API REST de Workspace y los obliga a pasar por sus servidores MCP: sin cuota gratuita en Scaled Tier, sin envío autónomo en /mcp/v1self y borrando embeddings cada 30 días.",
      date: "27 nov 2026",
      readTime: "4 min de lectura",
      metrics: [
        {
          label: "ARBITRAJE DE FACTURACIÓN",
          val: "Umbral Gratis REST vs. MCP $0.10–$0.50/1K desde #1",
        },
        {
          label: "BLOQUEO DE AUTONOMÍA Y RAG",
          val: "Sin envío en /mcp/v1self · Borrado a los 30 días",
        },
      ],
      content: [
        "En el escenario parecía una victoria para los estándares abiertos: Google lanzó en disponibilidad general ocho servidores oficiales **Model Context Protocol (`MCP`)** para **Google Workspace**. Pero al leer el **Workspace AI Tools Addendum** vinculante, la apertura se convierte en peaje obligatorio. A partir del **`1 de febrero de 2027`**, cualquier herramienta impulsada por un agente de IA o `AI Harness` tiene prohibido llamar directamente a las **API REST de Gmail, Drive y Calendar**, bajo amenaza de suspensión inmediata si intenta ocultar su naturaleza.",
        "El **arbitraje económico** revela el verdadero coste. Las integraciones tradicionales sin IA que pasan al nivel de pago **Scaled Tier** conservan una franquicia diaria gratuita (`daily no-charge allowance`) por categoría. En cambio, los agentes obligados a usar MCP pierden toda cuota gratuita al superar las **`5.000` solicitudes diarias** del nivel estándar: desde el **`1 de abril de 2027`**, los servidores MCP de Gmail, Drive y Calendar facturan **desde la primera solicitud exitosa (`2xx`)** entre `$0.10` y `$0.50` por cada `1.000` unidades, multiplicando el cobro en herramientas compuestas.",
        "En el plano técnico, el servidor MCP de Gmail divide el acceso en dos extremos. El endpoint `/mcp/v1` ofrece **`30` herramientas** sujetas a formularios interactivos de aprobación (`form elicitation`), mientras que el endpoint autónomo `/mcp/v1self` se reduce a **`25` herramientas** y **elimina por completo `send_message`, `reply` y `forward`**. Tu agente autónomo puede redactar borradores, pero tiene prohibido enviar el correo.",
        "El golpe más duro para startups de IA está en la **cláusula `2(b)`**: Google define los **embeddings vectoriales, índices de memoria y grafos organizativos** como *«Información Técnica de Google»* y **prohíbe almacenarlos más de `30` días**. Un asistente `RAG` corporativo que consulte contratos del año pasado tendrá que borrar su base vectorial cada mes y reindexar todo el buzón pagando de nuevo tanto tokens como lecturas MCP. Puerta abierta fuera, esposas dentro.",
        "Además, la **cláusula `2(g)`** prohíbe usar estos índices para crear productos similares a Workspace justo en el mismo mes en que Google adquirió la startup de agentes de correo **Howie AI**, dejando vía libre a **Google Gemini** dentro de casa.",
        "Para CTOs y fundadores SaaS, es el manual clásico de *Adoptar, Extender y Extinguir* adaptado a la era de los agentes: incluso cuando el protocolo lleva etiqueta abierta, el dueño del edificio sigue teniendo la llave del candado:)",
      ],
    },
  },
};

export default post;
