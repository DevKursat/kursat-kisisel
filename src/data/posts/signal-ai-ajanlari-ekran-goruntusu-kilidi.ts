import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "signal-ai-ajanlari-ekran-goruntusu-kilidi",
  "tag": "GÜVENLİK & OS OTOPSİSİ",
  "category": "guvenlik",
  "title": "Uçtan Uca Şifreleme Ekrana Çarpınca: Signal'ın iOS 27 'Block Siri AI' Kilidi ve macOS DRM Çifte Standardı",
  "excerpt": "Signal, iOS 27'de varsayılan 'Block Siri AI' ekran görüntüsü kilidini ve Android'de otomatik ekran korumasını devreye aldı; macOS 27 dipnotu ise Apple'ın Netflix DRM'ini koruyup özel şifreli mesajların ekran koruma API'sini kaldırdığını ifşa etti.",
  "date": "22 Kas 2026",
  "isoDate": "2026-11-22",
  "readTime": "3 dk okuma",
  "imageUrl": "/blog/signal-ai-ajanlari-ekran-goruntusu-kilidi.png",
  "metrics": [
    {
      "label": "SALDIRI YÜZEYİ ARBİTRAJI",
      "val": "2²⁵⁶ Kripto ➔ 0 ms Ekran"
    },
    {
      "label": "MACOS 27 ÇİFTE STANDART",
      "val": "DRM Kilitli ➔ Özel Mesaj Açık"
    }
  ],
  "content": [
    "20 Kasım 2026'da Signal Başkanı Meredith Whittaker, *\"Signal is Serious About Protecting Your Privacy\"* başlıklı resmî uyarıyla işletim sistemi üreticilerine açık cephe açtı. Geçen yıl Windows 11'deki Microsoft Recall ajanını varsayılan ekran görüntüsü engeliyle durdurmak zorunda kalan Signal, şimdi aynı savunma hattını mobil tarafa çekti: iOS 27'de varsayılan açık gelen **`Block Siri AI`** kilidi uygulama içi ve App Switcher ekran görüntülerini kesiyor; Android tarafında ise bir yapay zekâ asistanının ekranı okumaya çalıştığı algılandığı anda **`Screen security`** koruması otomatik devreye giriyor. Hedefteki özellikler açık: Apple'ın `Onscreen Awareness` (Siri AI) ve Google'ın `Gemini Intelligence` ajanları.",
    "Saldırı yüzeyi ve maliyet arbitrajı açısından ortada acımasız bir mühendislik asimetrisi var. Signal'ın bağımsız denetimlerden geçmiş `256-bit` Double Ratchet kriptografik protokolünü ağ üzerinden kaba kuvvetle kırmak `2²⁵⁶` işlem gerektirir; yani evrenin ömrü yetmez. Buna karşılık işletim sistemi çekirdeğine gömülen bir ajan, `compositor` çerçeve belleğini veya `accessibility` düğüm ağacını okuyarak şifresi çözülmüş düz metni **`0 ms` kriptoanaliz maliyetiyle** ve neredeyse sıfır ek işlem yüküyle ele geçirir. Üstelik bu teorik bir senaryo değil: Tam da aynı hafta Reuters sızıntılarıyla gündeme gelen Meta'nın `Muse` ajanının kullanıcı sohbetlerini birbirine karıştırıp özel verileri ve yetkisiz uygulama referanslarını sızdırması, engelli kullanıcılar için tasarlanan erişilebilirlik izinlerinin yapay zekâ ajanları için nasıl birer işletim sistemi maymuncuğuna dönüştüğünü kanıtladı.",
    "On yılı aşkın süredir mektubu kırılmaz bir çelik kasayla taşıdık, fakat bugün masanın tam üstüne her satırı saniyeler içinde fotoğraflayan bir işletim sistemi asistanı oturttuk. İşin en çıplak skandalı ise Signal duyurusunun macOS 27'ye ayrılan 3 numaralı dipnotunda gizli: Apple, yalnızca dijital yayın akışlarını ve DRM korumalı Hollywood içeriklerini koruyan ekran engelleme API'lerini ayakta tutarken, Signal gibi gizlilik uygulamalarının tekil ekran görüntüsünü engelleyebileceği genel sistem API'lerini kullanımdan kaldırmış. Dizi kilitli, mesajın açıkta.",
    "Kök mimari darboğaz son derece net: Kullanıcı alanında (`user-space`) çalışan hiçbir uygulama, üzerinde koştuğu ev sahibi işletim sisteminden (`compositor`, `filesystem`, `notification bus`, `accessibility API`) daha güçlü bir sınır çizemez. Signal ekibi aylardır iOS ve Android üzerinde adli inceleme yürüterek bu ajanların arka planda ne yaptığını anlamaya çalıştığını ve mevcut önlemin **`eksik (incomplete)`** olduğunu dürüstçe itiraf ediyor. Ekran görüntüsü engeli dosya sisteminde halihazırda duran verilere veya başka sinsi veri yollarına erişimi durduramıyor, tüm Android üreticilerinde aynı hassasiyetle çalışmıyor ve macOS 27 kullanıcılarına yalnızca `System Settings > Siri > Excluded Apps` altına Signal'ı elle eklemeyi önerebiliyor. Üstelik bulut tekellerinin parlatmaya çalıştığı \"gizli bilişim (confidential computing)\" söylemi de bu yapıyı çözmüyor; çünkü gizlilik garantisinin sınırını belirleme yetkisi hâlâ işletim sistemi tekellerinin elinde kalıyor.",
    "Platform ekonomisi penceresinden bakıldığında her uygulamanın üstünden ekran okuyan yerleşik bir ajan konumlandırmak, Silikon Vadisi'nin en kârlı dağıtım hendeğidir. Üçüncü taraf yazılımlarla tek bir API anlaşması yapmadan veya gelir paylaşmadan tüm uygulama arayüzlerini bedava bağlam çıkarma yüzeyine dönüştürür. Ancak CTO'lar ve güvenlik mimarları için tablo sessiz bir uyumluluk yükümlülüğüdür: Regülasyona tabi yazışmalar, yönetim kurulu kararları ve kritik canlı ortam müdahale kanalları TLS ve uçtan uca şifreleme taşısa bile mobil uç noktadaki OS telemetri hatlarından sızma riskiyle baş başa kalır.",
    "Tehdit modeliniz hâlâ istemci cihazı yekpare ve güvenilir bir kale varsayıyorsa, kabloyu zırhlayıp camı ardına kadar açık bırakıyorsunuz demektir. İşletim sistemi tekelleri yalnızca telifli filmler için değil, hassas uygulamalar için de donanım destekli ve belgelenmiş ekran yalıtım anahtarı sunana kadar cihazınıza gömülü her yapay zekâ asistanı yamalanmamış bir yan kanal olmaya devam edecek:)"
  ],
  "translations": {
    "en": {
      "tag": "SECURITY & OS AUTOPSY",
      "title": "When End-to-End Encryption Hits the Glass: Signal's iOS 27 'Block Siri AI' Lock and macOS's DRM Double Standard",
      "excerpt": "Signal enabled default 'Block Siri AI' screenshot restrictions on iOS 27 and automatic screen-security triggers on Android—while its macOS 27 footnote exposed how Apple preserves strict screen locks for streaming DRM yet deprecates them for private encrypted messaging.",
      "date": "Nov 22, 2026",
      "readTime": "3 min read",
      "metrics": [
        {
          "label": "ATTACK SURFACE ARBITRAGE",
          "val": "2²⁵⁶ Crypto ➔ 0 ms Screen"
        },
        {
          "label": "MACOS 27 DOUBLE STANDARD",
          "val": "DRM Locked ➔ Chats Exposed"
        }
      ],
      "content": [
        "On November 20, 2026, Signal President Meredith Whittaker published *\"Signal is Serious About Protecting Your Privacy,\"* drawing a hard boundary against operating system monopolies. Having previously rolled out default screenshot blocking on Windows 11 to neutralize Microsoft Recall, Signal has now brought the fight to mobile OS agents: iOS 27 ships with a default-on **`Block Siri AI`** toggle that disables in-app and App Switcher screenshots, while Signal on Android automatically triggers **`Screen security`** the moment it detects an AI assistant attempting to inspect the display. The announcement targets Apple's `Onscreen Awareness` (Siri AI) and Google's `Gemini Intelligence` head-on.",
        "From an attack-surface and cost-arbitrage standpoint, the asymmetry is brutal. Breaking Signal's formally verified `256-bit` Double Ratchet protocol over the wire demands `2²⁵⁶` operations—cryptographically infeasible at any compute budget. Reading the rendered compositor buffer or accessibility tree after decryption, however, exposes the exact same plaintext in **`0 ms` of cryptanalysis** at near-zero marginal cost. This is hardly hypothetical: Reuters revelations the exact same week showed Meta's `Muse` AI agent scrambling user threads and exposing private cross-app data through over-privileged access, proving how accessibility frameworks meant for human users have become an OS-wide skeleton key for AI scrapers.",
        "For over a decade, security engineers built unbreakable armored vaults to carry every letter safely across hostile networks, only to seat an always-on OS assistant directly above the desk photographing every line on the glass. The sharpest indictment sits buried in footnote 3 of Signal's macOS 27 disclosure: Apple deprecated general screenshot-blocking interfaces while preserving rock-solid screen-capture locks exclusively for streaming video and DRM-protected media. Movies stay locked; your private chats stay wide open.",
        "The root architectural bottleneck is unforgiving: a user-space sandbox cannot enforce stronger isolation than the host OS governing its `compositor`, `filesystem`, `notification bus`, and `accessibility API`. Signal openly admits its mobile screenshot defense is **`incomplete`**. Blocking screenshots cannot stop OS agents from reading data already persisted to disk, cannot behave uniformly across fragmented Android OEM skins, and leaves macOS 27 users with only a manual workaround under `System Settings > Siri > Excluded Apps`. Nor does \"confidential computing\" marketing resolve the core flaw, because the OS vendor still retains unilateral control over the boundaries of any privacy guarantee.",
        "Viewed through platform economics, embedding a cross-app screen reader at the OS layer is the ultimate distribution moat. It converts every third-party app interface into free retrieval context without negotiating API partnerships or sharing revenue. For CTOs and security architects, that convenience creates silent compliance liability: regulated executive threads, M&A discussions, and incident-response channels rendered on mobile devices sit exposed to OS-level telemetry pipelines regardless of transport TLS or cryptographic strength.",
        "If your threat model still treats the client endpoint as a monolithic trusted zone, you are fortifying the wire while leaving the glass unguarded. Until OS gatekeepers ship documented, hardware-enforced display isolation for privacy-critical applications—not just Hollywood DRM—every built-in AI assistant remains an unpatched side channel:)"
      ]
    },
    "de": {
      "tag": "SICHERHEITS- & OS-AUTOPSIE",
      "title": "Wenn Ende-zu-Ende-Verschlüsselung auf Glas trifft: Signals iOS-27-Sperre 'Block Siri AI' und Apples macOS-DRM-Doppelstandard",
      "excerpt": "Signal aktiviert unter iOS 27 standardmäßig die Screenshot-Sperre 'Block Siri AI' sowie automatischen Bildschirmschutz auf Android – während die Fußnote zu macOS 27 offenlegt, dass Apple Screen-Locks zwar für Streaming-DRM schützt, für private Chats aber abgeschafft hat.",
      "date": "22. Nov. 2026",
      "readTime": "3 Min. Lesezeit",
      "metrics": [
        {
          "label": "ANGRIFFSFLÄCHEN-ARBITRAGE",
          "val": "2²⁵⁶ Krypto ➔ 0 ms Screen"
        },
        {
          "label": "MACOS-27-DOPPELSTANDARD",
          "val": "DRM Gesperrt ➔ Chats Offen"
        }
      ],
      "content": [
        "Am 20. November 2026 zog Signal-Präsidentin Meredith Whittaker mit dem Beitrag *\"Signal is Serious About Protecting Your Privacy\"* eine klare Verteidigungslinie gegen Betriebssystem-Monopole. Nachdem Signal bereits Microsoft Recall unter Windows 11 per standardmäßiger Screenshot-Blockade ausgebremst hatte, folgt nun der mobile Gegenschlag: Unter iOS 27 ist die neue Option **`Block Siri AI`** standardmäßig aktiv und unterbindet Screenshots innerhalb der App sowie im App-Umschalter, während Signal auf Android automatisch **`Screen security`** aktiviert, sobald ein KI-Assistent versucht, den Bildschirm auszulesen. Im Fokus stehen Apples `Onscreen Awareness` (Siri AI) und Googles `Gemini Intelligence`.",
        "Die Angriffsflächen- und Kostenarbitrage offenbart eine gnadenlose Asymmetrie. Das formal verifizierte `256-Bit`-Double-Ratchet-Protokoll von Signal über das Netzwerk per Brute-Force zu brechen erfordert `2²⁵⁶` Operationen – technisch unmöglich. Das Abgreifen des gerenderten `Compositor`-Puffers oder des `Accessibility`-Baums nach der Entschlüsselung liefert denselben Klartext hingegen in **`0 ms` Kryptoanalysezeit** zu vernachlässigbaren Grenzkosten. Wie real das Risiko ist, zeigten Reuters-Berichte derselben Woche über Metas KI-Agenten `Muse`, der Sitzungen vermischte und private App-Daten preisgab – ein Beleg dafür, wie tiefgreifende Barrierefreiheits-APIs zu einem General-Dietrich für KI-Agenten verkommen sind.",
        "Über ein Jahrzehnt lang haben Ingenieure unknackbare Panzerschränke für den Brieftransport gebaut, nur um direkt über den Schreibtisch einen Systemassistenten zu setzen, der jede Zeile vom Display abfotografiert. Der entlarvendste Befund steckt in Fußnote 3 zu macOS 27: Apple hat allgemeine APIs zum Blockieren von Einzel-Screenshots abgekündigt, während strikter Aufnahmeschutz weiterhin exklusiv für Streaming-Medien und DRM-geschützte Inhalte reserviert bleibt. Serien sind geschützt, vertrauliche Nachrichten bleiben offen.",
        "Der architektonische Engpass sitzt tief im Systemmodell: Keine User-Space-Sandbox kann stärkere Isolation durchsetzen als das Host-Betriebssystem über `Compositor`, `Filesystem`, `Notification Bus` und `Accessibility API`. Signal räumt offen ein, dass die eigene Screenshot-Sperre **`unvollständig`** bleibt. Sie verhindert weder den Zugriff auf bereits im Dateisystem liegende Daten noch deckt sie alle Android-Hersteller ab, und auf macOS 27 bleibt Nutzern nur der manuelle Umweg über `System Settings > Siri > Excluded Apps`. Auch \"Confidential Computing\"-Versprechen lösen diese Asymmetrie nicht auf, solange der OS-Anbieter einseitig über die Grenzen der Privatsphäre entscheidet.",
        "Aus Sicht der Plattformökonomie ist ein systemweiter Bildschirmleser der perfekte Distributions-Burggraben: Jede Drittanbieter-Oberfläche wird ohne API-Vertrag oder Umsatzbeteiligung zur kostenlosen Kontextquelle. Für CTOs und Sicherheitsarchitekten entsteht dadurch eine stille Compliance-Haftung: Regulierte Kommunikation, Vorstandsentscheidungen und Incident-Response-Chats auf Mobilgeräten landen trotz TLS und Ende-zu-Ende-Verschlüsselung in OS-Telemetrie-Pipelines.",
        "Wer das Endgerät im eigenen Bedrohungsmodell noch immer als monolithische Vertrauenszone behandelt, panzert die Leitung und lässt das Glas sperrangelweit offen. Solange OS-Monopolisten keinen dokumentierten, hardwareseitig erzwungenen Display-Schutz für datensensible Apps bereitstellen – statt nur für Hollywood-DRM –, bleibt jeder integrierte KI-Assistent ein ungepatchter Seitenkanal:)"
      ]
    },
    "es": {
      "tag": "AUTOPSIA DE SEGURIDAD Y SO",
      "title": "Cuando el cifrado de extremo a extremo choca con la pantalla: el bloqueo 'Block Siri AI' de Signal en iOS 27 y el doble rasero DRM en macOS",
      "excerpt": "Signal activó por defecto el bloqueo de capturas 'Block Siri AI' en iOS 27 y la protección automática en Android, mientras la nota al pie de macOS 27 expone que Apple mantiene blindajes estrictos para DRM de streaming pero retiró las APIs para mensajería cifrada.",
      "date": "22 nov 2026",
      "readTime": "3 min lectura",
      "metrics": [
        {
          "label": "ARBITRAJE DE SUPERFICIE",
          "val": "2²⁵⁶ Cripto ➔ 0 ms Pantalla"
        },
        {
          "label": "DOBLE RASERO MACOS 27",
          "val": "DRM Blindado ➔ Chats Expuestos"
        }
      ],
      "content": [
        "El 20 de noviembre de 2026, la presidenta de Signal, Meredith Whittaker, publicó *\"Signal is Serious About Protecting Your Privacy\"* trazando una línea roja frente a los monopolios de sistemas operativos. Tras bloquear el año pasado las capturas de Microsoft Recall en Windows 11 por defecto, Signal traslada ahora la trinchera al móvil: iOS 27 incorpora activada de serie la opción **`Block Siri AI`**, que impide capturas dentro de la app y en el selector de tareas, mientras que Signal en Android activa automáticamente **`Screen security`** en cuanto detecta un asistente de IA intentando leer la pantalla. El blanco es explícito: `Onscreen Awareness` de Apple (Siri AI) y `Gemini Intelligence` de Google.",
        "El arbitraje de superficie de ataque y coste revela una asimetría implacable. Romper por fuerza bruta en la red el protocolo Double Ratchet de `256 bits` de Signal exige `2²⁵⁶` operaciones, algo criptográficamente inviable. En cambio, leer el búfer del `compositor` o el árbol de accesibilidad tras el descifrado entrega exactamente el mismo texto plano en **`0 ms` de criptoanálisis** y a coste marginal casi nulo. No es teoría: las filtraciones publicadas por Reuters esa misma semana mostraron al agente `Muse` de Meta mezclando conversaciones privadas y exponiendo datos entre aplicaciones gracias a permisos profundos, confirmando cómo las APIs de accesibilidad se convirtieron en una llave maestra para los raspadores de IA.",
        "Durante más de una década construimos cajas fuertes inviolables para transportar cada carta, solo para sentar justo encima de la mesa a un asistente del sistema operativo fotografiando cada línea sobre el cristal. La acusación más cruda se esconde en la nota al pie número 3 sobre macOS 27: Apple dejó obsoletas las APIs generales de bloqueo de capturas mientras conserva protecciones estrictas exclusivamente para plataformas de vídeo en streaming y contenido con DRM. Las series quedan bajo llave; tus mensajes cifrados quedan a la vista.",
        "El cuello de botella arquitectónico es inflexible: ninguna caja de arena en espacio de usuario (`user-space`) puede imponer un aislamiento superior al del sistema operativo anfitrión que gobierna el `compositor`, el `filesystem`, el `notification bus` y la `accessibility API`. Signal admite sin rodeos que su defensa mediante capturas es **`incompleta`**. No frena a los agentes que leen archivos ya almacenados en disco, no cubre por igual a todos los fabricantes Android y en macOS 27 obliga al usuario a añadir Signal manualmente en `System Settings > Siri > Excluded Apps`. Tampoco el discurso comercial de la \"computación confidencial\" corrige esta falla mientras el proveedor del SO decida unilateralmente los límites de la privacidad.",
        "Desde la economía de plataformas, incrustar un lector de pantalla transversal a nivel de sistema es el foso de distribución definitivo: convierte la interfaz de cualquier tercero en contexto gratuito sin acuerdos de API ni reparto de ingresos. Para los CTO y arquitectos de seguridad, esa comodidad genera un pasivo silencioso de cumplimiento normativo: conversaciones reguladas, decisiones directivas y canales de respuesta a incidentes quedan expuestos a la telemetría del SO pese al cifrado TLS y de extremo a extremo.",
        "Si tu modelo de amenazas sigue asumiendo el dispositivo cliente como una fortaleza monolítica de confianza, estás blindando el cable mientras dejas el cristal abierto de par en par. Hasta que los monopolios de sistemas operativos ofrezcan un aislamiento de pantalla documentado y respaldado por hardware para aplicaciones sensibles —y no solo para el DRM de Hollywood—, cada asistente de IA integrado seguirá siendo un canal lateral sin parchear:)"
      ]
    }
  }
};

export default post;
