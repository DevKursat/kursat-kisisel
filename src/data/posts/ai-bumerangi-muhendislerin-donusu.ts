import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "ai-bumerangi-muhendislerin-donusu",
  "tag": "SİSTEM MÜHENDİSLİĞİ",
  "category": "mimari",
  "title": "'Yapay Zeka Yerimizi Alacak' Kibri İflas Etti: Kovulan Mühendislerin Dönüşü",
  "excerpt": "Büyük dil modelleri sözdizimi üretir; fakat gece 03:00'te veritabanı kilitlendiğinde veya ödeme hattı yarış durumuna girdiğinde prompt yazamazsınız.",
  "date": "9 Kas 2026",
  "isoDate": "2026-11-09",
  "readTime": "6 dk okuma",
  "imageUrl": "/blog/ai-bumerangi-muhendislerin-donusu.png",
  "metrics": [
    {
      "label": "İŞTEN ÇIKARMA",
      "val": "Geri Döndü"
    },
    {
      "label": "HATA DOMAİNİ",
      "val": "Distributed"
    }
  ],
  "content": [
    "Son bir yılda yönetim kurullarında en çok alkışlanan sunum şuydu: 'Yapay zeka artık kodun %80'ini yazıyor, mühendis kadromuzu yarıya indirip bilançoyu parlatabiliriz.' Bu kibirle hareket eden şirketlerin karşılaştığı fatura ağır oldu.",
    "Büyük dil modelleri sözdizimi üretmekte muazzam bir hız kazandırdı. Ancak yazılım mühendisliği hiçbir zaman klavyeye hızlı basmak değildi.",
    "Üretim ortamında gece saat 03:00'te veritabanı kilitlendiğinde veya ödeme geçidi yarış durumuna (race condition) girdiğinde, bir prompt yazarak sistemi kurtaramazsınız."
  ],
  "translations": {
    "en": {
      "tag": "SYSTEMS ENGINEERING",
      "title": "The 'AI Will Replace Engineers' Hubris Collapses: Return of the Laid-Off Architects",
      "excerpt": "LLMs generate syntax at lightning speed, yet when a database deadlocks at 3:00 AM or a payment pipeline hits a race condition, no prompt can rescue you.",
      "date": "Nov 9, 2026",
      "readTime": "6 min read",
      "metrics": [
        {
          "label": "LAYOFF WAVE",
          "val": "Reversed"
        },
        {
          "label": "FAILURE DOMAIN",
          "val": "Distributed"
        }
      ],
      "content": [
        "The most applauded boardroom pitch of the past year claimed: 'AI writes 80% of our code now—we can halve engineering headcount and polish the balance sheet.' Companies acting on that hubris paid a steep operational bill.",
        "Large language models dramatically accelerated syntax generation, yet software engineering was never about typing fast on a keyboard.",
        "When a production database deadlocks at 3:00 AM or a payment gateway enters a race condition, you cannot prompt-engineer your way out of an outage."
      ]
    },
    "de": {
      "tag": "SYSTEMTECHNIK",
      "title": "Die Arroganz 'KI ersetzt Entwickler' ist gescheitert: Die Rückkehr der entlassenen Ingenieure",
      "excerpt": "LLMs erzeugen rasant Syntax—doch wenn um 3 Uhr nachts die Datenbank blockiert oder eine Race Condition im Checkout auftritt, hilft kein Prompt.",
      "date": "9. Nov. 2026",
      "readTime": "6 Min. Lesezeit",
      "metrics": [
        {
          "label": "ENTLASSUNGEN",
          "val": "Zurückgenommen"
        },
        {
          "label": "FEHLERDOMÄNE",
          "val": "Verteilt"
        }
      ],
      "content": [
        "Kaum eine Vorstandspräsentation erhielt im letzten Jahr mehr Applaus als: 'KI schreibt 80 % des Codes—wir halbieren die Entwicklerteams.' Wer dieser Hybris folgte, zahlte teuer dafür.",
        "Große Sprachmodelle haben das Schreiben von Syntax stark beschleunigt, aber Software Engineering war noch nie schnelles Tippen.",
        "Wenn um 3 Uhr morgens in der Produktion ein Datenbank-Deadlock oder eine Race Condition im Zahlungsfluss auftritt, rettet kein Prompt das System."
      ]
    },
    "es": {
      "tag": "INGENIERÍA DE SISTEMAS",
      "title": "Colapsa la arrogancia de 'la IA nos reemplazará': El regreso de los ingenieros despedidos",
      "excerpt": "Los LLM generan sintaxis velozmente, pero cuando la base de datos se bloquea a las 3:00 AM o falla la pasarela de pago por una race condition, un prompt no basta.",
      "date": "9 nov 2026",
      "readTime": "6 min lectura",
      "metrics": [
        {
          "label": "RECORTES",
          "val": "Revertidos"
        },
        {
          "label": "DOMINIO DE FALLO",
          "val": "Distribuido"
        }
      ],
      "content": [
        "Durante el último año, la diapositiva más aplaudida en los consejos afirmaba: 'La IA escribe el 80% del código; podemos reducir a la mitad el equipo técnico'. Las empresas que creyeron ese espejismo pagaron una factura cara.",
        "Los modelos de lenguaje aceleraron la escritura de sintaxis, pero la ingeniería de software nunca consistió en teclear más rápido.",
        "Cuando una base de datos entra en deadlock a las 3:00 de la madrugada o una pasarela sufre una condición de carrera, ningún prompt rescata el servicio."
      ]
    }
  }
};

export default post;
