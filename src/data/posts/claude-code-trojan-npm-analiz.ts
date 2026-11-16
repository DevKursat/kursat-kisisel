import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "claude-code-trojan-npm-analiz",
  "tag": "YAZILIM TEDARİK ZİNCİRİ",
  "category": "guvenlik",
  "title": "Anthropic Claude Code ve Trojan Anatomisi: Yazılım Tedarik Zincirinde Zero Trust",
  "excerpt": "Geliştirici ortamlarına sızan gizli NPM paketleri ve otonom terminal ajanlarının denetimsiz paket kurulumlarındaki riskler.",
  "date": "7 Kas 2026",
  "isoDate": "2026-11-07",
  "readTime": "5 dk okuma",
  "imageUrl": "/blog/claude-hacker-news.jpg",
  "metrics": [
    {
      "label": "RİSK SINIFI",
      "val": "NPM Poison"
    },
    {
      "label": "SAVUNMA",
      "val": "Zero-Trust"
    }
  ],
  "content": [
    "Terminal ajanlarının popülerleşmesiyle birlikte saldırganlar, popüler NPM kütüphanelerinin harf hatası (typosquatting) versiyonlarını doğrudan LLM'lerin öneri kalıplarına enjekte etmeye başladı.",
    "Otonom araçların 'npm install' komutlarını onay almadan çalıştırması, kurumsal geliştirici makinelerini uzaktan kontrol edilen botlara dönüştürebilir.",
    "Kürşat Yılmaz mimarilerinde tüm harici paket bağımlılıkları deterministik sandbox içinde doğrulanmadan üretim ortamına alınmaz."
  ],
  "translations": {
    "en": {
      "tag": "SOFTWARE SUPPLY CHAIN",
      "title": "Anthropic Claude Code & Trojan Anatomy: Zero Trust in the Software Supply Chain",
      "excerpt": "Stealth NPM packages sneaking into developer environments and the perils of autonomous terminal agents installing unverified dependencies.",
      "date": "Nov 7, 2026",
      "readTime": "5 min read",
      "metrics": [
        {
          "label": "RISK VECTOR",
          "val": "NPM Poison"
        },
        {
          "label": "DEFENSE",
          "val": "Zero-Trust"
        }
      ],
      "content": [
        "As terminal coding agents went mainstream, attackers began poisoning typosquatted variants of popular NPM packages directly into LLM completion patterns.",
        "Allowing autonomous agents to execute 'npm install' without deterministic verification can turn enterprise developer laptops into remotely controlled bots.",
        "In production-grade architectures, no external package dependency enters the build pipeline without isolated sandbox verification."
      ]
    },
    "de": {
      "tag": "SOFTWARE-LIEFERKETTE",
      "title": "Anthropic Claude Code & Trojaner-Anatomie: Zero Trust in der Software-Lieferkette",
      "excerpt": "Versteckte NPM-Pakete in Entwicklerumgebungen und das Risiko unkontrollierter Paketinstallationen durch autonome Terminal-Agenten.",
      "date": "7. Nov. 2026",
      "readTime": "5 Min. Lesezeit",
      "metrics": [
        {
          "label": "RISIKOVEKTOR",
          "val": "NPM-Poisoning"
        },
        {
          "label": "ABWEHR",
          "val": "Zero-Trust"
        }
      ],
      "content": [
        "Mit dem Aufstieg von Terminal-Agenten schleusen Angreifer gezielt Typosquatting-Varianten populärer NPM-Pakete in LLM-Vorschlagsmuster ein.",
        "Wenn autonome Agenten ohne Bestätigung 'npm install' ausführen, können Entwicklerrechner zu ferngesteuerten Bots werden.",
        "Keine externe Abhängigkeit darf ohne deterministische Sandbox-Prüfung in Produktionssysteme gelangen."
      ]
    },
    "es": {
      "tag": "CADENA DE SUMINISTRO",
      "title": "Anthropic Claude Code y anatomía del troyano: Zero Trust en la cadena de suministro de software",
      "excerpt": "Paquetes NPM maliciosos que se infiltran en entornos locales y el riesgo de que agentes autónomos instalen dependencias sin supervisión.",
      "date": "7 nov 2026",
      "readTime": "5 min lectura",
      "metrics": [
        {
          "label": "VECTOR DE RIESGO",
          "val": "NPM Poison"
        },
        {
          "label": "DEFENSA",
          "val": "Zero-Trust"
        }
      ],
      "content": [
        "Con el auge de los agentes de terminal, los atacantes inyectan versiones con errores tipográficos (typosquatting) de librerías NPM populares en las sugerencias de los LLM.",
        "Permitir que un agente autónomo ejecute 'npm install' sin verificación puede convertir portátiles corporativos en nodos controlados remotamente.",
        "Ninguna dependencia externa debe llegar a producción sin validarse previamente dentro de un sandbox determinista."
      ]
    }
  }
};

export default post;
