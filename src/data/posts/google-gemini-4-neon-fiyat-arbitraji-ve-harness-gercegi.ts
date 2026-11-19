import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "google-gemini-4-neon-fiyat-arbitraji-ve-harness-gercegi",
  "tag": "LLM & ÇIKARIM OTOPSİSİ",
  "category": "llm",
  "title": "Periyodik Tablo Enflasyonu ve 3x Harness Gerçeği: Google Gemini 4 Neon Otopsisi",
  "excerpt": "Anthropic $1.5 trilyonluk Nasdaq IPO ziline basarken Google iki aydaki dördüncü element modeli Gemini 4 Neon'u ($3/$15, 127 tok/s) sürdü; asıl itiraf ise kendi raporundaki %12.8 → %39.0 harness sıçramasında saklı.",
  "date": "19 Kas 2026",
  "isoDate": "2026-11-19",
  "readTime": "4 dk okuma",
  "imageUrl": "/blog/google-gemini-4-neon-fiyat-arbitraji-ve-harness-gercegi.png",
  "metrics": [
    {
      "label": "FİYAT / HIZ ARBİTRAJI",
      "val": "$3/$15 · 127 tok/s"
    },
    {
      "label": "HARNESS SIÇRAMASI (SWE)",
      "val": "%12.8 → %39.0 (3x)"
    }
  ],
  "content": [
    "Anthropic'in `ANT` koduyla hisse başı $83'ten $107 milyar toplayıp $1.5 trilyonluk tarihi Nasdaq halka arz ziline bastığı 19 Kasım gündeminin tam ortasına Google, son iki aydaki dördüncü periyodik tablo modelini bıraktı: `Gemini 4 Neon`. `Hydrogen`, `Argon`, `Carbon` derken şimdi de `Neon` sahnede ve Hacker News'da 920'yi aşan puan ile 720'den fazla yorumluk yeni bir kavga başlatmış durumda. Anthropic Wall Street'e çeyrek dönemlik bilanço sözü verirken, Google aynı gün geliştiricilerin önüne başka bir kimya denklemi koydu. Rekabet artık mühendislik kadar takvim savaşına döndü.",
    "Birim ekonomi tarafındaki tablo ise hem etkileyici hem de Google içi fiyatlama açısından komik bir arbitraj yaratıyor. `Neon`, 1 milyon token bağlam penceresiyle milyon girdi tokenı başına `$3` (`$0.15` önbellekli girdi — %95 indirim), çıktı tarafında ise düşünme tokenları dahil `$15` etiketine sahip. OpenRouter verilerinde saniyede `127 token` (`tok/s`) üreterek `46 tok/s` hızında kalan `Carbon`'dan yaklaşık `2.76x` daha seri çalışıyor, varsayılan `high` akıl yürütme modunda görev başı maliyeti `Carbon`'dan %32, rakiplerin tepe modellerinden ise Vals Index ve Agent Arena üzerinde %50–%80 daha aşağı çekiyor (`xhigh` modunda dahi %36+ tasarruf). İşin absürt tarafı şu: Google'ın Kasım sonuna kadar uzattığı tanıtım indirimi yüzünden daha ağır olan `Gemini 4 Carbon` ve `Argon` şu an `$2 / $10` fiyatla satıldığı için, ham token bazında orta segment `Neon` geçici olarak ağabeylerinden daha pahalı görünüyor.",
    "Bu isimlendirme ve fiyat karmaşası, menüsünde porsiyon yazmak yerine element sembolü kullanan ve promosyon yüzünden kuzu tandırın yanındaki cacıktan ucuza geldiği bir lokantaya benziyor. Müşteri karnını doyurmak istiyor, garson ise masa başında soy gazlarla yarı metallerin atom ağırlığını anlatıyor. Mühendisler kodunu canlıya almak için hangi API ucunu sabitleyeceğini şaşırırken, laboratuvarlar iki haftada bir element değiştirerek leaderboard kovalamaya devam ediyor.",
    "Asıl mühendislik gerçeği ise süslü benchmark başlıklarında değil, Google'ın kendi teknik yazısının satır aralarında gizli. Kağıt üzerinde `Neon`, Artificial Analysis Intelligence Index'te `61` puanla genel sıralamada `#3`, Coding Agent Index'te `58.6` ile `#1`, FrontierCode 2.0'da (`high`) `%46.2`, Agent Arena'da `4.200+` gerçek oturumda `1336` puanla `#2`, Vending-Bench 2'de `$16,843` ile `#1`, siber zafiyet tespitinde `%90.5`, kök neden yama başarısında `%70.7` ve Gray Swan IPI saldırılarında `%0.0` aşım oranı yakalıyor. Fakat SWE-sweep testindeki şu iki sayı bütün yapay zeka balonunu tek cümlede özetliyor: aynı `Gemini 4 Neon` modeli standart `mini-SWE` iskeletinde yalnızca **`%12.8`** skor alırken, **Google Antigravity** ortamında tam 3 kat fırlayarak **`%39.0`** seviyesine çıkıyor. Üstelik Hacker News tartışmalarındaki geliştiricilerin de yüzüne vurduğu gibi, statik skorlar Claude Opus 5.5'i geçse bile dağınık gerçek repolarda \"benchmaxxing\" şüphesi hâlâ dağılmış değil.",
    "Kök mimari neden gayet açık: Üretim ortamındaki başarıyı belirleyen şey iki haftada bir model adına bakıp API anahtarı değiştirmek değil, modelin etrafına ördüğünüz yürütme iskeletidir (`harness`). Dosya sıkıştırma, bağlam önbellekleme (`$0.15/1M`), gereksiz tekrar okumaları kesen araç yönlendirmesi ve `127 tok/s` seviyesindeki düşük gecikmeli döngü hızı olmadan elinizdeki en akıllı ağırlık bile terminalde kör kalır. Ajan performansının üçte ikisi artık model ağırlığından değil, o ağırlığı yöneten sistem mühendisliğinden geliyor.",
    "İki haftada bir periyodik tablodan yeni bir gaz adı seçmek kimseye sağlam production altyapısı kurmuyor. Siz `Neon` mu `Carbon` mu diye etiket tartışırken, doğru harness'ı kuranlar aynı modelden 3 kat daha fazla iş çıkarıyor :)"
  ],
  "translations": {
    "en": {
      "tag": "LLM & INFERENCE AUTOPSY",
      "title": "Periodic Table Inflation and the 3x Harness Truth: A Google Gemini 4 Neon Autopsy",
      "excerpt": "While Anthropic rang the bell on a $1.5T Nasdaq IPO, Google shipped its fourth periodic-table model in two months—Gemini 4 Neon ($3/$15, 127 tok/s)—buried alongside a 12.8% to 39.0% harness confession.",
      "date": "Nov 19, 2026",
      "readTime": "4 min read",
      "metrics": [
        {
          "label": "PRICE / SPEED ARBITRAGE",
          "val": "$3/$15 · 127 tok/s"
        },
        {
          "label": "HARNESS JUMP (SWE-SWEEP)",
          "val": "12.8% → 39.0% (3x)"
        }
      ],
      "content": [
        "On the exact day Anthropic priced its shares at $83 to raise $107 billion and ring the Nasdaq bell at a $1.5 trillion valuation under ticker `ANT`, Google dropped its fourth periodic-table model in two months: `Gemini 4 Neon`. Following `Hydrogen`, `Argon`, and `Carbon`, `Neon` landed straight atop Hacker News with 920+ points and over 720 comments. While Anthropic signed up for quarterly Wall Street scrutiny, Google handed developers another chemistry puzzle to decode before lunch. The frontier race is as much calendar warfare as it is research.",
        "The unit economics reveal a sharp inference arbitrage paired with an awkward internal pricing paradox. Priced at `$3` per million input tokens (`$0.15` for cached input, a 95% discount) and `$15` per million output tokens (thinking tokens included) across a 1-million-token context window, `Neon` hits `127 tokens/sec` on OpenRouter compared to `Carbon`'s `46 tokens/sec`—roughly `2.76x` faster throughput. At its default `high` reasoning tier, `Neon` cuts cost per task by 32% versus `Carbon` and by 50%–80% against rival frontier models on Vals Index and Agent Arena (still 36%+ cheaper at `xhigh`). Yet because Google extended promotional `$2 / $10` pricing on heavier `Carbon` and `Argon` through late November, the mid-tier `Neon` temporarily costs more per raw token than its larger siblings.",
        "This nomenclature and pricing overlap feels like eating at a restaurant that prints atomic weights instead of portion sizes, where a seasonal promo makes the prime rib cheaper than the side salad. Customers just want dinner on the table, while the waiter lectures them on noble gases versus non-metals. Engineers trying to pin production endpoints want predictable capability tiers, not a biweekly chemistry quiz built around chasing leaderboard margins.",
        "The real engineering confession is not in the headline scores, but buried midway through Google's own announcement. On paper, `Neon` posts `#3 overall (61)` on the Artificial Analysis Intelligence Index (`xhigh`), `#1 (58.6)` on the Coding Agent Index, `46.2%` on FrontierCode 2.0 (`high`), `#2 globally (1336)` across 4,200+ Agent Arena sessions, `#1` on Vending-Bench 2 (`$16,843`), `90.5%` vulnerability detection, `70.7%` root-cause patching, and `0.0%` attack success on Gray Swan's indirect prompt-injection suite. Then comes the number that exposes everything: on **SWE-sweep**, `Gemini 4 Neon` scores **`12.8%`** on the minimal `mini-SWE` harness, and triples to **`39.0%`** inside **Google Antigravity**. Meanwhile, Hacker News threads remain split over \"benchmaxxing,\" with practitioners noting that static leaderboards beat Claude Opus 5.5 while messy multi-file refactors still expose reliability gaps.",
        "The root architectural takeaway is unmistakable: production agent reliability is driven far more by the execution harness around the weights than by swapping models every fortnight for a two-point leaderboard bump. Context compaction, `$0.15/1M` prompt caching, surgical file-edit loops that cut redundant reads, and `127 tok/s` iteration latency decide whether an autonomous run finishes cleanly or burns budget in loops. Two-thirds of the delta in Google's own benchmark came from systems engineering around the model, not the checkpoint itself.",
        "Picking a new element off the periodic table every two weeks does not build resilient production infrastructure. While teams argue over whether to route to `Neon` or `Carbon`, the engineers investing in the harness are extracting 3x more work from the exact same silicon :)"
      ]
    },
    "de": {
      "tag": "LLM- & INFERENZ-AUTOPSIE",
      "title": "Periodensystem-Inflation und die 3x-Harness-Wahrheit: Eine Analyse von Google Gemini 4 Neon",
      "excerpt": "Während Anthropic mit $1,5 Billionen Bewertung an die Nasdaq geht, liefert Google mit Gemini 4 Neon ($3/$15, 127 tok/s) das vierte Element-Modell in zwei Monaten – inklusive eines 12,8 % auf 39,0 % Harness-Geständnisses.",
      "date": "19. Nov. 2026",
      "readTime": "4 Min. Lesezeit",
      "metrics": [
        {
          "label": "PREIS- / TEMPO-ARBITRAGE",
          "val": "$3/$15 · 127 tok/s"
        },
        {
          "label": "HARNESS-SPRUNG (SWE)",
          "val": "12,8 % → 39,0 % (3x)"
        }
      ],
      "content": [
        "Genau an dem Tag, an dem Anthropic seine Aktien zu $83 ausgab, $107 Milliarden einsammelte und unter dem Kürzel `ANT` mit $1,5 Billionen Bewertung an die Nasdaq ging, schob Google das vierte Periodensystem-Modell binnen zwei Monaten nach: `Gemini 4 Neon`. Nach `Hydrogen`, `Argon` und `Carbon` landete `Neon` sofort mit über 920 Punkten und mehr als 720 Kommentaren an der Spitze von Hacker News. Während Anthropic sich der Quartalsdisziplin der Wall Street stellt, gab Google Entwicklern das nächste Chemie-Rätsel mit auf den Weg. Das KI-Wettrennen ist längst ebenso sehr Kalenderkrieg wie Grundlagenforschung.",
        "Bei der Einheitsökonomie zeigt sich ein starker Durchsatz-Vorteil neben einer skurrilen internen Preispanne. `Neon` kostet `$3` pro Million Input-Token (`$0,15` für gecachten Input — 95 % Rabatt) und `$15` pro Million Output-Token inklusive Reasoning-Token bei 1 Million Kontextfenster. Auf OpenRouter erreicht es `127 Token/s` gegenüber `46 Token/s` bei `Carbon` und ist damit rund `2,76x` schneller. Im Standardmodus `high` senkt `Neon` die Kosten pro Aufgabe um 32 % gegenüber `Carbon` und um 50 %–80 % gegenüber konkurrierenden Frontier-Modellen im Vals Index und in der Agent Arena (bei `xhigh` noch über 36 % günstiger). Grotesk wird es durch Googles eigene November-Aktion: Weil das schwerere `Carbon` und `Argon` vorübergehend für `$2 / $10` laufen, liegt das Mittelklasse-Modell `Neon` pro rohem Token kurzzeitig über seinem größeren Bruder.",
        "Dieses Namens- und Preischaos erinnert an ein Restaurant, das statt Portionsgrößen Atomgewichte auf die Karte druckt und durch einen Tagesrabatt das Hauptgericht billiger macht als die Beilage. Ingenieure wollen stabile API-Endpunkte und klare Leistungsklassen, während Laboratorien alle vierzehn Tage neue Edelgase für Leaderboard-Schlagzeilen ausrufen.",
        "Das eigentliche technische Geständnis steht nicht in den Marketing-Grafiken, sondern mitten in Googles eigenem Blogbeitrag. Auf dem Papier erreicht `Neon` Platz `#3 (61)` im Artificial Analysis Intelligence Index (`xhigh`), Platz `#1 (58,6)` im Coding Agent Index, `46,2 %` bei FrontierCode 2.0 (`high`), Platz `#2 (1336)` über 4.200+ Agent-Arena-Sessions, `#1` im Vending-Bench 2 (`$16.843`), `90,5 %` bei der Schwachstellensuche, `70,7 %` beim Root-Cause-Patching und `0,0 %` Angriffsrate im Gray-Swan-IPI-Test. Doch bei **SWE-sweep** bricht die Illusion auf: Auf dem schlichten `mini-SWE`-Harness erzielt `Gemini 4 Neon` lediglich **`12,8 %`**, springt aber in **Google Antigravity** um das Dreifache auf **`39,0 %`**. Gleichzeitig warnen Entwickler auf Hacker News vor \"Benchmaxxing\", da statische Rankings zwar Claude Opus 5.5 überholen, komplexe Multi-File-Refactorings aber weiterhin Reibung zeigen.",
        "Die architektonische Konsequenz ist eindeutig: Über die Zuverlässigkeit produktiver Agenten entscheidet nicht das zweiwöchentliche Modell-Hopping für zwei Benchmark-Punkte mehr, sondern der Ausführungskäfig (`Harness`) rund um die Gewichte. Kontext-Kompaktierung, `$0,15/1M`-Caching, gezieltes Tool-Routing ohne redundante Datei-Reads und `127 tok/s` Iterationsgeschwindigkeit bestimmen den realen ROI. Zwei Drittel des Leistungsgewinns in Googles eigenen Daten stammen aus System-Engineering, nicht aus dem Checkpoint.",
        "Alle zwei Wochen ein neues Element aus dem Periodensystem zu ziehen ersetzt keine saubere Laufzeit-Architektur. Wer stattdessen seinen Agenten-Harness schärft, holt aus demselben Modell schlicht dreimal mehr produktive Arbeit heraus :)"
      ]
    },
    "es": {
      "tag": "AUTOPSIA DE LLM E INFERENCIA",
      "title": "Inflación de la tabla periódica y la verdad del harness 3x: autopsia de Google Gemini 4 Neon",
      "excerpt": "Mientras Anthropic tocaba la campana del Nasdaq con una OPV de $1,5 billones, Google lanzó su cuarto modelo elemental en dos meses —Gemini 4 Neon ($3/$15, 127 tok/s)— junto a una confesión clave: saltar del 12,8 % al 39,0 % solo cambiando el harness.",
      "date": "19 nov 2026",
      "readTime": "4 min lectura",
      "metrics": [
        {
          "label": "ARBITRAJE PRECIO / VELOCIDAD",
          "val": "$3/$15 · 127 tok/s"
        },
        {
          "label": "SALTO DE HARNESS (SWE)",
          "val": "12,8 % → 39,0 % (3x)"
        }
      ],
      "content": [
        "El mismo día en que Anthropic fijó sus acciones en $83 para captar $107.000 millones y estrenarse en el Nasdaq bajo el ticker `ANT` con una valoración de $1,5 billones, Google lanzó su cuarto modelo de la tabla periódica en dos meses: `Gemini 4 Neon`. Tras `Hydrogen`, `Argon` y `Carbon`, `Neon` escaló directo a lo más alto de Hacker News con más de 920 puntos y 720 comentarios. Mientras Anthropic asumía la presión trimestral de Wall Street, Google dejaba a los desarrolladores otro acertijo químico sobre la mesa. La carrera fronteriza ya es tanto guerra de calendario como de investigación.",
        "La economía unitaria muestra un arbitraje notable acompañado de una paradoja interna de precios difícil de ignorar. Con una ventana de 1 millón de tokens, `Neon` cuesta `$3` por millón de tokens de entrada (`$0,15` en caché, un 95 % de descuento) y `$15` por millón de tokens de salida incluyendo razonamiento. En OpenRouter alcanza `127 tok/s` frente a los `46 tok/s` de `Carbon`, casi `2,76x` más rendimiento. En su modo por defecto `high`, reduce el coste por tarea un 32 % frente a `Carbon` y entre un 50 % y un 80 % frente a rivales en Vals Index y Agent Arena (aún más de un 36 % más barato en `xhigh`). Lo absurdo llega por la propia promoción de noviembre de Google: como `Carbon` y `Argon` mantienen una tarifa temporal de `$2 / $10`, el modelo intermedio `Neon` resulta momentáneamente más caro por token bruto que sus hermanos mayores.",
        "Este baile de nomenclatura y tarifas recuerda a un restaurante donde el menú sustituye los tamaños de ración por masas atómicas y un descuento de temporada deja el plato principal más barato que el acompañamiento. Los equipos de ingeniería necesitan endpoints estables y jerarquías claras, no un examen de gases nobles cada dos semanas para exprimir décimas en una tabla pública.",
        "La verdadera confesión técnica no está en los titulares, sino enterrada a mitad del propio blog de Google. Sobre el papel, `Neon` logra el puesto `#3 (61)` en el Artificial Analysis Intelligence Index (`xhigh`), `#1 (58,6)` en el Coding Agent Index, `46,2 %` en FrontierCode 2.0 (`high`), `#2 global (1336)` en más de 4.200 sesiones de Agent Arena, `#1` en Vending-Bench 2 (`$16.843`), `90,5 %` detectando vulnerabilidades, `70,7 %` parcheando la causa raíz y `0,0 %` de éxito en ataques IPI de Gray Swan. Pero en **SWE-sweep** cae el telón: el mismo `Gemini 4 Neon` apenas marca **`12,8 %`** sobre el arnés mínimo `mini-SWE`, y se multiplica por tres hasta **`39,0 %`** dentro de **Google Antigravity**. Mientras tanto, en Hacker News persiste el escepticismo sobre el \"benchmaxxing\" frente a la consistencia práctica de Claude Opus 5.5 en repositorios reales.",
        "La lección arquitectónica es cristalina: la fiabilidad de un agente en producción depende mucho más del entorno de ejecución (`harness`) que de rotar claves de API cada quince días buscando dos puntos más en un benchmark. La compactación de contexto, el caché de entrada a `$0,15/1M`, el enrutado limpio de herramientas sin lecturas redundantes y una latencia de `127 tok/s` deciden si un flujo autónomo termina o se atasca en bucles. Dos tercios de la mejora publicada por Google nacen de ingeniería de sistemas, no de los pesos del modelo.",
        "Sacar otro gas noble de la tabla periódica cada dos semanas no construye infraestructura resistente. Mientras unos debaten entre `Neon` y `Carbon`, quienes diseñan un mejor harness extraen 3 veces más trabajo del mismo silicio :)"
      ]
    }
  }
};

export default post;
