import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "openai-chatgpt-wallet-ve-lovable-veri-sizintisi",
  "tag": "GÜVENLİK OTOPSİSİ",
  "category": "guvenlik",
  "title": "Ajanlara Kredi Kartı Vermek: ChatGPT Wallet ve Pasaport Sızdıran 'Vibe Coding' Çılgınlığı",
  "excerpt": "OpenAI otonom alışveriş ajanlarına cüzdan bağlarken, yapay zeka ile üretilen binlerce uygulama eksik RLS yüzünden pasaportları ve 200.000+ özel mesajı internete açtı.",
  "date": "15 Kas 2026",
  "isoDate": "2026-11-15",
  "readTime": "3 dk okuma",
  "imageUrl": "/blog/openai-chatgpt-wallet-ve-lovable-veri-sizintisi.jpg",
  "metrics": [
    {
      "label": "SIZAN ÖZEL MESAJ",
      "val": "200.000+"
    },
    {
      "label": "TARANAN PROJE",
      "val": "159.000+"
    }
  ],
  "content": [
    "OpenAI, 'dots' adını verdiği otonom ajanların ABD'deki Pro kullanıcıları adına alışveriş yapabilmesi için ChatGPT Wallet'ı duyurdu. Aynı hafta güvenlik araştırmacıları, Lovable gibi yapay zeka tabanlı 'vibe coding' platformlarıyla üretilen 159.000'den fazla projeyi tarayıp binlerce uygulamanın veritabanı yetkilendirmesini unuttuğu için pasaport numaralarını, faturaları ve 200.000'den fazla özel mesajı internete açık bıraktığını ortaya çıkardı.",
    "Mimari arbitraj ve risk matematiği ortada: Standart bir tokenized kart geçidinde tek bir yetkisiz işlem yalnızca kart limitiyle sınırlı ~%1.5–%2.9 ters ibraz (chargeback) maliyeti ve yaklaşık 120–180 ms ödeme doğrulama gecikmesi üretirken, Postgres üzerinde `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` satırını atlayıp istemci tarafına `anon` anahtarıyla doğrudan PostgREST erişimi veren bir AI uygulamasında 0 ms ek doğrulama maliyeti uğruna tüm tablo tek bir `GET` isteğiyle dışarı akıyor. Yüzeyde 50 TL'lik geliştirme süresinden tasarruf edildiği sanılırken, KVKK/GDPR ihlali ve pasaport sızıntısı başına doğan yasal yükümlülük tüm projenin birim ekonomisini anında negatife çeviriyor.",
    "Bir yanda Face ID ve tek kullanımlık ödeme token'ı ile güvenli otonom alışveriş pazarlanırken, diğer yanda prompt'tan üretilen arka uçlarda en temel `auth.uid() = user_id` kısıtı bile yazılmadan canlıya basılan uygulamalar kullanıcı verilerini sızdırıyor. Bu tablo, fren hidroliği boşaltılmış bir arabaya otopilot takıp 'direksiyon deri kaplama, kaza riski sıfır' diye lansman yapmaya benziyor.",
    "Sorunun kökü, LLM'lerin 'çalışan demo' üretme optimizasyonu ile üretim ortamının 'fail-closed' (varsayılan olarak reddeden) güvenlik ihtiyacı arasındaki yapısal çelişkidir. Yapay zeka arayüzü dakikalar içinde ayağa kaldırırken veritabanı politikasını yazmadığında uygulama görünürde hatasız çalışır; geliştirici de test ekranında veriyi gördüğü için sistemin güvenli olduğunu varsayar. Oysa yetkisiz bir kullanıcının aynı uç noktaya ham HTTP isteği atmasını engelleyen mekanizma React bileşeni değil, sunucu ve veritabanı katmanındaki deterministik politika motorudur.",
    "Kodun arkasındaki veritabanı erişim sınırını denetleyemeyen bir ekosisteme şimdi bir de cüzdan ve otonom harcama yetkisi bağlamak, mühendislik borcunu çözmeden patlama yarıçapını büyütmektir. Üretim ortamında güveni şık onay butonları değil, her tabloda varsayılan kapalı (deny-all) politika ve bağımsız CI güvenlik kapıları sağlar."
  ],
  "translations": {
    "en": {
      "tag": "SECURITY AUTOPSY",
      "title": "Handing Credit Cards to AI Agents: ChatGPT Wallet Meets the 'Vibe Coding' Data Leak",
      "excerpt": "As OpenAI connects wallets to autonomous shopping agents, thousands of AI-generated apps leaked passport numbers and 200,000+ private messages over missing RLS.",
      "date": "Nov 15, 2026",
      "readTime": "3 min read",
      "metrics": [
        {
          "label": "LEAKED MESSAGES",
          "val": "200,000+"
        },
        {
          "label": "AUDITED PROJECTS",
          "val": "159,000+"
        }
      ],
      "content": [
        "OpenAI just rolled out ChatGPT Wallet for US Pro users, letting its 'dots' agents autonomously shop and check out via tokenized cards. In the exact same week, security researchers analyzing over 159,000 projects built on AI 'vibe coding' platforms like Lovable found thousands of production apps missing basic backend authorization and Row Level Security—exposing passport numbers, invoices, and 200,000+ private messages to the open web.",
        "Look at the engineering unit economics and blast-radius math: a tokenized checkout call adds roughly 120–180 ms of gateway latency and caps dispute overhead around card-network chargeback bands, whereas shipping a Postgres backend without `ENABLE ROW LEVEL SECURITY` while exposing a client `anon` key drops authorization latency to 0 ms—and lets a single unauthenticated `GET` request dump every customer row in the table. Saving ten minutes of schema engineering turns into catastrophic GDPR/breach liability per leaked passport.",
        "Shipping autonomous payment flows while AI-generated backends still forget basic `auth.uid() = user_id` database access policies is like putting autopilot on a car with drained brake lines and bragging about the stitched leather seats.",
        "The structural flaw is the mismatch between how LLMs optimize for a working demo and how production security demands fail-closed defaults. When an AI coding tool omits an RLS policy, the happy-path preview still renders cleanly, tricking builders into shipping wide-open REST endpoints. Frontend conditional rendering never protects a database; deterministic server-side policies and token verification do.",
        "Giving AI agents access to wallets before the industry enforces deterministic backend authorization only scales the blast radius. Production safety comes from deny-by-default database boundaries and automated CI policy checks, not polished UI confirmation buttons."
      ]
    },
    "de": {
      "tag": "SICHERHEITS-AUTOPSIE",
      "title": "Kreditkarten für KI-Agenten: ChatGPT Wallet trifft auf das 'Vibe Coding'-Datenleck",
      "excerpt": "Während OpenAI Shopping-Agenten mit Wallets verknüpft, legten Tausende KI-generierte Apps wegen fehlender RLS-Regeln Reisepässe und über 200.000 Privatnachrichten offen.",
      "date": "15. Nov. 2026",
      "readTime": "3 Min. Lesezeit",
      "metrics": [
        {
          "label": "GELEAKTE NACHRICHTEN",
          "val": "200.000+"
        },
        {
          "label": "GEPRÜFTE PROJEKTE",
          "val": "159.000+"
        }
      ],
      "content": [
        "OpenAI hat ChatGPT Wallet für US-Pro-Nutzer gestartet, damit 'dots'-Agenten autonom einkaufen und über tokenisierte Karten bezahlen können. In derselben Woche deckten Sicherheitsforscher bei der Analyse von über 159.000 Projekten auf 'Vibe Coding'-Plattformen wie Lovable auf, dass Tausenden Live-Apps grundlegende Backend-Autorisierung und Row Level Security fehlen—wodurch Passnummern, Rechnungen und über 200.000 Privatnachrichten offen im Netz standen.",
        "Die Architektur- und Risikoökonomie ist eindeutig: Während ein tokenisierter Checkout rund 120–180 ms Gateway-Latenz hinzufügt und finanzielle Risiken auf einzelne Transaktionen begrenzt, spart ein Postgres-Backend ohne `ENABLE ROW LEVEL SECURITY` und mit offenem Client-`anon`-Key zwar 0 ms Autorisierungslatenz, ermöglicht aber jedem nicht authentifizierten `GET`-Aufruf den vollständigen Tabellenabzug. Zehn Minuten gesparte Schema-Arbeit kippen bei geleakten Ausweisdaten sofort in ruinöse DSGVO-Haftung.",
        "Autonome Bezahlprozesse auszuliefern, während KI-generierte Backends noch grundlegende `auth.uid() = user_id`-Zugriffsregeln vergessen, ist wie ein Autopilot im Auto ohne Bremsdruck, bei dem man die Ledersitze lobt.",
        "Das strukturelle Problem liegt im Gegensatz zwischen LLM-Demo-Optimierung und produktiver Fail-Closed-Sicherheit. Fehlt eine RLS-Regel, funktioniert der Happy Path in der Vorschau scheinbar fehlerfrei und verleitet Teams zum Livegang mit offenen REST-Endpunkten. Frontend-Logik schützt keine Datenbank; das leisten nur deterministische Server- und Datenbankrichtlinien.",
        "Agenten Zugriff auf Wallets zu geben, bevor deterministische Backend-Autorisierung erzwungen wird, vergrößert nur den Schadensradius. Echte Produktionssicherheit entsteht durch Deny-by-Default-Datenbankgrenzen und automatisierte CI-Prüfungen, nicht durch glänzende UI-Bestätigungsbuttons."
      ]
    },
    "es": {
      "tag": "AUTOPSIA DE SEGURIDAD",
      "title": "Dar tarjetas de crédito a agentes de IA: ChatGPT Wallet frente a la fuga de datos del 'Vibe Coding'",
      "excerpt": "Mientras OpenAI conecta billeteras a agentes de compra autónomos, miles de apps creadas con IA expusieron pasaportes y más de 200.000 mensajes privados por falta de RLS.",
      "date": "15 nov 2026",
      "readTime": "3 min lectura",
      "metrics": [
        {
          "label": "MENSAJES FILTRADOS",
          "val": "200.000+"
        },
        {
          "label": "PROYECTOS AUDITADOS",
          "val": "159.000+"
        }
      ],
      "content": [
        "OpenAI lanzó ChatGPT Wallet para suscriptores Pro en EE. UU., permitiendo que sus agentes 'dots' compren y paguen de forma autónoma mediante tarjetas tokenizadas. En la misma semana, investigadores que analizaron más de 159.000 proyectos creados en plataformas de 'vibe coding' como Lovable hallaron miles de aplicaciones en producción sin autorización de backend ni Row Level Security, exponiendo números de pasaporte, facturas y más de 200.000 mensajes privados.",
        "La matemática de riesgo y economía unitaria es implacable: una pasarela tokenizada añade unos 120–180 ms de latencia por transacción y acota el fraude al límite de la tarjeta, mientras que desplegar Postgres sin `ENABLE ROW LEVEL SECURITY` y con clave `anon` pública reduce la latencia de autorización a 0 ms a cambio de permitir que una sola petición `GET` sin sesión extraiga toda la tabla. Ahorrar diez minutos de diseño de esquema dispara la responsabilidad regulatoria por cada pasaporte filtrado.",
        "Desplegar pagos autónomos cuando los backends generados por IA aún olvidan políticas básicas como `auth.uid() = user_id` es como instalar piloto automático en un coche sin líquido de frenos y presumir de la tapicería.",
        "La raíz del fallo está en la brecha entre optimizar para una demo rápida y exigir una arquitectura fail-closed en producción. Si falta la regla RLS, el flujo principal sigue funcionando en pantalla y engaña al creador para publicar APIs abiertas. El renderizado condicional en el cliente jamás protege una base de datos; solo lo hacen las políticas deterministas en servidor.",
        "Entregar billeteras a agentes de IA antes de asegurar la autorización determinista del backend solo multiplica el radio de impacto. La seguridad real nace de políticas deny-by-default en base de datos y controles automáticos en CI, no de botones elegantes en la interfaz."
      ]
    }
  }
};

export default post;
