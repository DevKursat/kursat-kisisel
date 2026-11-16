import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "claude-code-secret-leak-gitignore-skandali",
  "tag": "GÜVENLİK OTOPSİSİ",
  "category": "guvenlik",
  "title": "1.5 Trilyon Dolarlık Değerleme, Sıfır .gitignore: Claude Code 2.500 Canlı Sırrı GitHub'a Nasıl Saçtı?",
  "excerpt": "Terminalde 'Yes, and don't ask again' butonuna basan geliştiricilerin veritabanı şifreleri ve API anahtarları .claude/settings.local.json üzerinden 2.000 public repoya sızdı.",
  "date": "14 Kas 2026",
  "isoDate": "2026-11-14",
  "readTime": "4 dk okuma",
  "imageUrl": "/blog/claude-code-secret-leak-gitignore-skandali.jpg",
  "metrics": [
    {
      "label": "SIZAN CANLI SIR",
      "val": "2.539 Secret"
    },
    {
      "label": "ETKİLENEN REPO",
      "val": "1.994 Public"
    }
  ],
  "content": [
    "Anthropic 1.5 trilyon dolar değerlemeyle halka arza hazırlanırken, amiral gemisi Claude Code geliştiricilerin veritabanı şifrelerini ve API anahtarlarını güle oynaya public GitHub repolarına saçtı. Apiiro araştırmacılarının ortaya çıkardığı tabloya göre 1.994 public repoda 2.539 canlı sır tespit edildi.",
    "Mekanizma o kadar komik ki insan sinirlenmeye bile kıyamıyor. Terminalde ajan sizden izin isterken o masum 'Yes, and don't ask again' seçeneğine tıkladığınız an, düz metin komut satırını içindeki PGPASSWORD ve API anahtarlarıyla birlikte .claude/settings.local.json dosyasına gömüyor. Dosyayı proje düzeyinde .gitignore kuralına otomatik eklemediği için de o gizli anahtarlar ilk git push ile tüm dünyaya açılıyor.",
    "Üstelik geleneksel tarama araçları (Gitleaks, TruffleHog) komut satırı içine gömülü bu dizgilerin önemli bir bölümünü standart regex kalıplarının dışında kaldığı için yakalayamadı. Bu durum, kapısına milyon dolarlık zırhlı güvenlik sistemi taktırıp evin yedek anahtarını paspasın altına koyan site yönetimi kafasıdır. Yapay zeka ajanına kod yazdırırken konfor uğruna otomatiğe bağlanan her onay butonu, şirketin üretim ortamını halka açık panoya asıyor."
  ],
  "translations": {
    "en": {
      "tag": "SECURITY AUTOPSY",
      "title": "$1.5 Trillion Valuation, Zero .gitignore: How Claude Code Spilled 2,500 Live Secrets onto GitHub",
      "excerpt": "Clicking 'Yes, and don't ask again' in the terminal persisted database passwords and API keys into .claude/settings.local.json—exposing nearly 2,000 public repos.",
      "date": "Nov 14, 2026",
      "readTime": "4 min read",
      "metrics": [
        {
          "label": "LEAKED LIVE SECRETS",
          "val": "2,539 Secrets"
        },
        {
          "label": "EXPOSED REPOS",
          "val": "1,994 Public"
        }
      ],
      "content": [
        "While Anthropic gears up for an IPO at a reported $1.5 trillion valuation, its flagship Claude Code CLI scattered developers' database passwords and API keys across public GitHub repositories. Research from Apiiro uncovered 2,539 live credentials sitting inside 1,994 public repositories.",
        "The mechanism is almost comical: the moment a developer clicks 'Yes, and don't ask again' on a terminal permission prompt, the raw shell command—complete with inline PGPASSWORD values and API tokens—is persisted directly inside .claude/settings.local.json. Because the tool does not enforce project-level .gitignore coverage by default, the very next git push publishes those secrets to the world.",
        "Worse still, traditional secret scanners like Gitleaks and TruffleHog missed a substantial share of these command-embedded strings because they fell outside standard token regexes. Automating approval dialogs for convenience without deterministic secret isolation turns every developer workstation into a public billboard for production credentials."
      ]
    },
    "de": {
      "tag": "SICHERHEITS-AUTOPSIE",
      "title": "1,5 Billionen Dollar Bewertung, null .gitignore: Wie Claude Code 2.500 Live-Secrets auf GitHub streute",
      "excerpt": "Ein Klick auf 'Yes, and don't ask again' speicherte Datenbank-Passwörter und API-Keys in .claude/settings.local.json—und legte 1.994 öffentliche Repos offen.",
      "date": "14. Nov. 2026",
      "readTime": "4 Min. Lesezeit",
      "metrics": [
        {
          "label": "GELEAKTE SECRETS",
          "val": "2.539"
        },
        {
          "label": "BETROFFENE REPOS",
          "val": "1.994 Öffentlich"
        }
      ],
      "content": [
        "Während Anthropic mit einer Bewertung von 1,5 Billionen Dollar auf den Börsengang zusteuert, verteilte sein Flaggschiff Claude Code Datenbank-Passwörter und API-Keys in öffentliche GitHub-Repositories. Apiiro-Forscher entdeckten 2.539 aktive Zugangsdaten in 1.994 öffentlichen Repos.",
        "Der Mechanismus ist fast grotesk: Klickt ein Entwickler im Terminal auf 'Yes, and don't ask again', wird der Klartextbefehl samt PGPASSWORD und API-Tokens in .claude/settings.local.json gespeichert. Da die Datei nicht automatisch im .gitignore landet, veröffentlicht der nächste git push sämtliche Geheimnisse.",
        "Zudem übersahen klassische Scanner wie Gitleaks und TruffleHog einen Großteil dieser in Shell-Befehle eingebetteten Strings. Bequemlichkeits-Auto-Freigaben ohne deterministische Secret-Isolation machen die Produktionsumgebung zum öffentlichen Aushang."
      ]
    },
    "es": {
      "tag": "AUTOPSIA DE SEGURIDAD",
      "title": "Valoración de 1,5 billones, cero .gitignore: Cómo Claude Code filtró 2.500 secretos en vivo en GitHub",
      "excerpt": "Pulsar 'Yes, and don't ask again' guardó contraseñas y claves API en .claude/settings.local.json, exponiéndolas en 1.994 repositorios públicos.",
      "date": "14 nov 2026",
      "readTime": "4 min lectura",
      "metrics": [
        {
          "label": "SECRETOS EXPUESTOS",
          "val": "2.539"
        },
        {
          "label": "REPOS AFECTADOS",
          "val": "1.994 Públicos"
        }
      ],
      "content": [
        "Mientras Anthropic prepara su salida a bolsa con una valoración de 1,5 billones de dólares, su herramienta estrella Claude Code esparció contraseñas de bases de datos y claves API por repositorios públicos de GitHub. Los investigadores de Apiiro detectaron 2.539 credenciales activas en 1.994 repositorios públicos.",
        "El mecanismo resulta casi cómico: en el instante en que el desarrollador pulsa 'Yes, and don't ask again', la línea de comandos completa—junto con variables como PGPASSWORD y tokens API—se guarda en texto plano dentro de .claude/settings.local.json. Al no añadirse automáticamente al .gitignore del proyecto, el primer git push las publica ante todo el mundo.",
        "Incluso herramientas tradicionales como Gitleaks o TruffleHog pasaron por alto gran parte de estas cadenas incrustadas en comandos. Automatizar confirmaciones por comodidad sin aislamiento determinista de secretos expone la infraestructura productiva en un tablón público."
      ]
    }
  }
};

export default post;
