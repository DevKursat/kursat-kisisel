import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari",
  "tag": "MİMARİ OTOPSİ",
  "category": "mimari",
  "title": "Meta Mühendisinin AI İtirafı: \"Kodun %90'ını Yapay Zekâya Yazdırdık, Canlı Ortam Çöktü\"",
  "excerpt": "Yönetimler 'daha çok commit' baskısı kurdukça mimari kırılganlık sessizce büyüdü. İlk karmaşık ağ dalgalanmasında prod ortamının çöküş anatomisi.",
  "date": "11 Kas 2026",
  "isoDate": "2026-11-11",
  "readTime": "4 dk okuma",
  "imageUrl": "/blog/meta-muhendisi-yapay-zeka-kod-itirafi-ve-kirilgan-mimari.png",
  "metrics": [
    {
      "label": "YAPAY ZEKA PAYI",
      "val": "%90 Üretim"
    },
    {
      "label": "KIRILMA ALANI",
      "val": "Edge-Cases"
    }
  ],
  "content": [
    "Yönetimler 'daha çok commit' baskısı kurdukça, mühendislerin kovulmamak için tek çaresi kodun %90'ını yapay zekâya ürettirmek oldu. Çıktı hacmi ve verimlilik grafikleri tavana vururken, gerçek mimari kırılganlık sessizce büyüdü.",
    "Meta'da kıdemli bir yazılım mühendisinin itiraf ettiği gibi: Kod üretimi 10 katına fırladı ancak kimse üretilen kodun sınır durumlarını (edge-cases) derinlemesine bilmediği için ilk karmaşık ağ dalgalanmasında prod ortamı çöktü.",
    "Yapay zekâ sözdizimini (syntax) mükemmel yazar ama sistem mimarisi, dağıtık mutabakat ve deterministik kararlılık insanın sorumluluğundadır."
  ],
  "translations": {
    "en": {
      "tag": "ARCHITECTURAL AUTOPSY",
      "title": "Meta Engineer's AI Confession: 'We Had AI Write 90% of the Code, and Production Collapsed'",
      "excerpt": "As management demanded higher commit velocity, silent architectural fragility accumulated until the first complex network spike took down production.",
      "date": "Nov 11, 2026",
      "readTime": "4 min read",
      "metrics": [
        {
          "label": "AI CODE SHARE",
          "val": "90% Generated"
        },
        {
          "label": "FAILURE DOMAIN",
          "val": "Edge-Cases"
        }
      ],
      "content": [
        "As executive dashboards pressed for relentless commit velocity, engineers had little choice but to let LLMs generate 90% of their codebase. Throughput metrics hit all-time highs while unexamined architectural debt silently compounded beneath the surface.",
        "As a senior Meta engineer admitted, code output jumped 10x—yet nobody truly understood the subtle edge cases of the generated logic. On the very first complex network jitter, production collapsed.",
        "LLMs produce immaculate syntax at high speed, but system invariants, distributed consensus, and deterministic resilience remain the non-negotiable responsibility of human engineers."
      ]
    },
    "de": {
      "tag": "ARCHITEKTUR-AUTOPSIE",
      "title": "KI-Geständnis eines Meta-Ingenieurs: '90 % des Codes kamen von der KI—dann brach die Produktion zusammen'",
      "excerpt": "Unter dem Druck nach immer mehr Commits wuchs die architektonische Fragilität im Verborgenen, bis die erste Netzschwankung das System kippte.",
      "date": "11. Nov. 2026",
      "readTime": "4 Min. Lesezeit",
      "metrics": [
        {
          "label": "KI-CODE-ANTEIL",
          "val": "90 % Generiert"
        },
        {
          "label": "FEHLERDOMÄNE",
          "val": "Edge-Cases"
        }
      ],
      "content": [
        "Als das Management immer mehr Commits einforderte, ließen Entwickler 90 % des Codes von KI generieren. Während Produktivitätscharts Rekorde meldeten, wuchs im Hintergrund stille architektonische Fragilität.",
        "Wie ein Senior-Ingenieur bei Meta einräumte, verzehnfachte sich der Code-Output—doch niemand kannte die Grenzfälle des generierten Codes genau, sodass die Produktion bei der ersten komplexen Netzschwankung abstürzte.",
        "KI beherrscht Syntax perfekt, aber Systemarchitektur, verteilter Konsens und deterministische Stabilität bleiben menschliche Ingenieursverantwortung."
      ]
    },
    "es": {
      "tag": "AUTOPSIA ARQUITECTÓNICA",
      "title": "La confesión de un ingeniero de Meta: 'Hicimos que la IA escribiera el 90% del código y producción colapsó'",
      "excerpt": "Mientras la dirección exigía más commits, la fragilidad arquitectónica creció en silencio hasta derribar producción en el primer pico de red.",
      "date": "11 nov 2026",
      "readTime": "4 min lectura",
      "metrics": [
        {
          "label": "CUOTA DE IA",
          "val": "90% Generado"
        },
        {
          "label": "DOMINIO DE FALLO",
          "val": "Edge-Cases"
        }
      ],
      "content": [
        "A medida que la gerencia presionaba por más commits, la única salida de muchos ingenieros fue delegar el 90% del código a la IA. Las métricas de volumen se dispararon mientras la fragilidad estructural crecía en silencio.",
        "Como confesó un ingeniero sénior de Meta, la producción de código se multiplicó por diez, pero nadie conocía a fondo los casos límite del código generado; ante la primera fluctuación compleja de red, producción se cayó.",
        "La IA redacta sintaxis impecable, pero la arquitectura de sistemas, el consenso distribuido y la estabilidad determinista siguen siendo responsabilidad del ingeniero humano."
      ]
    }
  }
};

export default post;
