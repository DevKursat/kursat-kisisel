import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "microsoft-agent-framework-pypi-trojani",
  "tag": "TEDARİK ZİNCİRİ OTOPSİSİ",
  "category": "guvenlik",
  "title": "Ignite Sahnesinde MAI Şovu, PyPI'da .pth Soygunu: Microsoft Agent Framework Skandalı",
  "excerpt": "Microsoft Ignite'ta MAI Code 2 ile güvenlik ve maliyet şovu yaparken, ayda 190 bin indirilen resmi agent-framework PyPI paketi import bile gerektirmeyen .pth kancasıyla Azure ve GitHub OIDC tokenlarını webhook.site'a boşalttı.",
  "date": "18 Kas 2026",
  "isoDate": "2026-11-18",
  "readTime": "4 dk okuma",
  "imageUrl": "/blog/microsoft-agent-framework-pypi-trojani.jpg",
  "metrics": [
    {
      "label": "AYLIK İNDİRME / SÜRÜM",
      "val": "190K / 1.26.1-2"
    },
    {
      "label": "TETİKLEME SÜRESİ",
      "val": "0 ms (Import Yok)"
    }
  ],
  "content": [
    "Microsoft bu hafta San Francisco'daki Ignite sahnesinde OpenAI ve Anthropic'e kafa tutan kendi MAI Code 2 modellerini tanıtırken, ayda yaklaşık 190.000 kez indirilen resmi açık kaynak Python paketi `agent-framework` PyPI üzerinde ele geçirildi. 17 Kasım 2026'da 33 dakika arayla basılan `1.26.1` ve `1.26.2` sürümleri, geliştiricilerin bilgisayarlarındaki ve CI/CD boru hatlarındaki tüm bulut kimliklerini sessizce dışarı akıttı. Üstelik aynı gün Windows 11'in `MissionControlAggregator.dll` ile yereldeki rakip kodlama ajanlarını telemetriye aldığı da ortaya çıkmıştı. Şirket bir yandan işletim sisteminden kimin hangi ajanı açtığını sayarken, diğer yandan kendi resmi ajan paketinden anahtar çaldırdı.",
    "Saldırının teknik zekâsı ve yarattığı risk arbitrajı klasik bir kütüphane zehirlemesinden çok daha yıkıcı: Paketi kodunuzda `import agent_framework` diye çağırmanıza bile gerek yok. Zararlı wheel dosyaları `site-packages` kök dizinine `1.26.1` sürümünde `agent_framework_meta.pth`, `1.26.2` sürümünde ise `af_runtime_diag.pth` dosyalarını bırakıyor. Python yorumlayıcısı başlatıldığı milisaniyede `.pth` dosyalarındaki `import` satırlarını otomatik çalıştırdığı için, o ortamda ister `python`, ister `pytest`, ister `pip` komutunun kendisini çalıştırın, payload **0 ms gecikmeyle** tetikleniyor. Üstelik gerçek `agent-framework-core` bağımlılığını da çektiği için uygulamanız tek bir hata bile vermeden çalışmaya devam ediyor.",
    "Bu durum, evinize en son teknoloji akıllı kilit taktırıp anahtar paspasının altına kasa şifresini bırakmaya benziyor; kapı mükemmel kilitleniyor ama hırsız zaten elektrik sayacını okurken içeri girmiş. Geliştiriciler LLM ajanlarının prompt enjeksiyonu yapıp yapmayacağını tartışırken, ajanların üzerine kurulduğu temel paket yöneticisi katmanı korumasız duruyor.",
    "Sızıntının asıl korkunç tarafı ise yalnızca diskteki statik dosyaları (`~/.azure/*.json`, `.npmrc`, `pip.conf`, `.netrc`, `.git-credentials`, `.docker/config.json`, Hugging Face ve `.env` dosyaları) okumakla yetinmemesi. Yük, `169.254.169.254` üzerindeki Azure Instance Metadata Service (IMDS), `IDENTITY_ENDPOINT` ve `MSI_ENDPOINT` üzerinden aktif olarak yeni Managed Identity erişim jetonları talep ediyor. Azure DevOps üzerinde `SYSTEM_ACCESSTOKEN` ve `SYSTEM_OIDCREQUESTURI` değişkenlerini kullanarak `api://AzureADTokenExchange` için yeni federasyon OIDC tokenı üretiyor, `1.26.2` sürümünde ise GitHub Actions OIDC jetonlarını da topluyor. Elde edilen tüm JSON yükü `zlib` ile sıkıştırılıp `Base64` formatına çevrildikten sonra `webhook.site` üzerindeki sabit bir uç noktaya HTTPS `POST` isteğiyle gönderiliyor. Yani sadece kayıtlı şifreleri rotate etmek bile, o anda dinamik olarak üretilmiş aktif oturum tokenlarını kurtarmaya yetmiyor.",
    "Kök mimari neden gayet açık: Modern AI ajan ekosistemleri geliştirici makinelerine ve CI/CD koşucularına tam yetkili bulut kimlikleri verirken, Python `site-packages` dizinini hâlâ tek bir düzlemde ve denetimsiz bırakıyor. Sabit hash kilitlemesi (`pip install --require-hashes`), izole konteyner çalıştırıcıları ve kısa ömürlü ağ çıkışı (egress) politikaları olmayan her derleme hattı, tek bir `pip install` komutuyla tüm bulut hesabını halka açıyor.",
    "Trilyon dolarlık teknoloji devleri sahnede otonom ajan güvenliği satarken, kendi paket yayınlama boru hatlarını bile koruyamıyor. Ajanlarınızı çalıştırdığınız ortamda sıkı egress duvarı ve hash doğrulaması yoksa, kurduğunuz şey bir AI altyapısı değil; başkalarının faturalarını ödeyeceğiniz açık bir ATM'dir :)"
  ],
  "translations": {
    "en": {
      "tag": "SUPPLY CHAIN AUTOPSY",
      "title": "MAI Code 2 on Stage, .pth Credential Theft on PyPI: The Microsoft Agent Framework Breach",
      "excerpt": "While Microsoft touted MAI Code 2 security at Ignite, its official agent-framework PyPI package (190K monthly downloads) shipped malicious .pth startup hooks that exfiltrated Azure and GitHub OIDC tokens to webhook.site without even being imported.",
      "date": "Nov 18, 2026",
      "readTime": "4 min read",
      "metrics": [
        {
          "label": "MONTHLY DOWNLOADS",
          "val": "190K / v1.26.1-2"
        },
        {
          "label": "TRIGGER LATENCY",
          "val": "0 ms (No Import)"
        }
      ],
      "content": [
        "While Microsoft executives took the Ignite stage in San Francisco to pitch their in-house `MAI Code 2` models as cheaper and safer alternatives to OpenAI and Anthropic, attackers hijacked Microsoft's official open-source Python package `agent-framework` on PyPI (~190,000 monthly downloads). Published 33 minutes apart on November 17, 2026, versions `1.26.1` and `1.26.2` silently drained cloud credentials from developer laptops and CI/CD runners. On the very same news cycle, reverse-engineering revealed Windows 11's `MissionControlAggregator.dll` quietly cataloging rival local coding agents. Microsoft was counting which agent you launched at the OS layer while losing control of its own agent package on PyPI.",
        "The attack mechanics expose a brutal risk arbitrage: the payload never waits for an `import agent_framework` statement. Both malicious wheels drop `.pth` startup hooks directly into `site-packages`—`agent_framework_meta.pth` in `1.26.1` and `af_runtime_diag.pth` in `1.26.2`. Because Python executes import lines inside `.pth` files on every interpreter initialization, invoking `python`, `pytest`, or even `pip` itself triggers the stealer in **0 ms**. Meanwhile, the package still pulls the legitimate `agent-framework-core` dependency so your application keeps running without a single traceback.",
        "It is the software equivalent of installing a biometric vault door while leaving the master key taped to the utility meter outside. Engineering teams spend weeks debating prompt-injection guardrails while leaving the underlying Python dependency layer completely unguarded.",
        "Worse, the stealer goes far beyond static files on disk (`~/.azure/*.json`, `.npmrc`, `pip.conf`, `.netrc`, `.git-credentials`, `.docker/config.json`, Hugging Face, and `.env` secrets). It actively mints fresh cloud identities at runtime: querying Azure's Instance Metadata Service (`169.254.169.254`), `IDENTITY_ENDPOINT`, and `MSI_ENDPOINT` for Managed Identity tokens, using `SYSTEM_ACCESSTOKEN` and `SYSTEM_OIDCREQUESTURI` in Azure DevOps to request federated `api://AzureADTokenExchange` tokens, and harvesting GitHub Actions OIDC tokens in `1.26.2`. Everything is packed into JSON, `zlib`-compressed, `Base64`-encoded, and sent via HTTPS `POST` to a hardcoded `webhook.site` endpoint. Simply rotating static secrets on disk does not invalidate tokens minted on the fly.",
        "The root architectural flaw is clear: AI agent stacks hand full cloud and repository privileges to developer environments and CI runners while leaving `site-packages` flat and unverified. Without strict hash pinning (`--require-hashes`), isolated execution sandboxes, and outbound network egress allowlists, one `pip install` compromises the entire cloud perimeter.",
        "Trillion-dollar vendors love selling autonomous agent security from keynote stages while failing to lock down their own publishing pipelines. If your agent runners lack strict egress filtering and cryptographic dependency pinning, you are not running an AI platform—you are operating an unguarded ATM :)"
      ]
    },
    "de": {
      "tag": "LIEFERKETTEN-AUTOPSIE",
      "title": "MAI Code 2 auf der Bühne, .pth-Diebstahl auf PyPI: Der Microsoft Agent Framework Vorfall",
      "excerpt": "Während Microsoft auf der Ignite mit MAI Code 2 wirbt, wurde das offizielle PyPI-Paket agent-framework (190.000 Downloads/Monat) mit .pth-Hooks kompromittiert, die Azure- und GitHub-OIDC-Token ohne Import abgreifen.",
      "date": "18. Nov. 2026",
      "readTime": "4 Min. Lesezeit",
      "metrics": [
        {
          "label": "MONATLICHE DOWNLOADS",
          "val": "190K / v1.26.1-2"
        },
        {
          "label": "AUSLÖSEZEIT",
          "val": "0 ms (Kein Import)"
        }
      ],
      "content": [
        "Während Microsoft auf der Ignite in San Francisco seine eigenen `MAI Code 2`-Modelle als sicherere und günstigere Alternative zu OpenAI und Anthropic anpries, übernahmen Angreifer das offizielle Open-Source-PyPI-Paket `agent-framework` (~190.000 Downloads pro Monat). Die am 17. November 2026 im Abstand von 33 Minuten veröffentlichten Versionen `1.26.1` und `1.26.2` schleusten einen Credential-Stealer in Entwicklerumgebungen und CI/CD-Pipelines ein. Zeitgleich wurde bekannt, dass Windows 11 über `MissionControlAggregator.dll` lokale Konkurrenz-Agenten protokolliert.",
        "Die technische Raffinesse liegt im Risiko-Arbitrage: Der Schadcode erfordert nicht einmal ein `import agent_framework`. Beide kompromittierten Wheels legen `.pth`-Dateien direkt in `site-packages` ab (`agent_framework_meta.pth` in `1.26.1` und `af_runtime_diag.pth` in `1.26.2`). Da Python bei jedem Interpreter-Start Import-Anweisungen in `.pth`-Dateien automatisch ausführt, startet der Stealer bei jedem `python`- oder `pip`-Aufruf mit **0 ms Verzögerung**, während `agent-framework-core` regulär weiterläuft.",
        "Das gleicht einer Hochsicherheitstür am Serverraum, während der Generalschlüssel außen am Stromzähler hängt. Teams diskutieren wochenlang über Prompt-Injection-Filter, lassen aber die Paketebene ungeschützt.",
        "Besonders kritisch: Das Skript liest nicht nur lokale Dateien (`~/.azure/*.json`, `.npmrc`, `pip.conf`, `.netrc`, `.git-credentials`, `.docker/config.json`, Hugging Face, `.env`), sondern fordert aktiv neue Cloud-Token an. Es fragt Azure IMDS (`169.254.169.254`), `IDENTITY_ENDPOINT` und `MSI_ENDPOINT` ab, tauscht in Azure DevOps über `SYSTEM_OIDCREQUESTURI` föderierte OIDC-Token aus und greift in `1.26.2` GitHub-Actions-OIDC-Token ab. Die Daten werden `zlib`-komprimiert, `Base64`-kodiert und per `POST` an `webhook.site` gesendet.",
        "Die architektonische Ursache ist offensichtlich: KI-Agenten-Stacks erhalten weitreichende Cloud-Rechte, laufen aber in flachen Python-Umgebungen ohne Hash-Pinning (`--require-hashes`) oder strenge Egress-Firewalls.",
        "Tech-Giganten verkaufen auf Keynotes gerne autonome Sicherheit, scheitern aber an der eigenen Paket-Pipeline. Ohne Egress-Kontrolle und kryptografische Verifizierung betreiben Sie keine KI-Plattform, sondern einen offenen Geldautomaten :)"
      ]
    },
    "es": {
      "tag": "AUTOPSIA DE CADENA",
      "title": "MAI Code 2 en el escenario y robo .pth en PyPI: la brecha de Microsoft Agent Framework",
      "excerpt": "Mientras Microsoft presumía de MAI Code 2 en Ignite, su paquete oficial agent-framework en PyPI (190K descargas/mes) distribuyó ganchos .pth que exfiltraron tokens OIDC de Azure y GitHub sin siquiera ser importado.",
      "date": "18 nov 2026",
      "readTime": "4 min lectura",
      "metrics": [
        {
          "label": "DESCARGAS MENSUALES",
          "val": "190K / v1.26.1-2"
        },
        {
          "label": "LATENCIA DE DISPARO",
          "val": "0 ms (Sin Import)"
        }
      ],
      "content": [
        "Mientras Microsoft subía al escenario de Ignite en San Francisco para vender sus modelos `MAI Code 2` como una alternativa más barata y segura frente a OpenAI y Anthropic, atacantes comprometieron su paquete oficial `agent-framework` en PyPI (~190.000 descargas mensuales). Publicadas el 17 de noviembre de 2026 con 33 minutos de diferencia, las versiones `1.26.1` y `1.26.2` vaciaron credenciales en equipos locales y pipelines CI/CD, el mismo día en que se descubrió que Windows 11 rastrea agentes rivales mediante `MissionControlAggregator.dll`.",
        "El mecanismo deja al descubierto una asimetría brutal: ni siquiera hace falta ejecutar `import agent_framework`. Ambos paquetes maliciosos depositan archivos `.pth` en `site-packages` (`agent_framework_meta.pth` y `af_runtime_diag.pth`). Como Python ejecuta esas líneas cada vez que arranca el intérprete, cualquier comando `python` o `pip` dispara el robo en **0 ms** mientras `agent-framework-core` sigue funcionando sin errores.",
        "Es como instalar una puerta biométrica en la oficina mientras dejas la clave maestra pegada en el contador eléctrico exterior.",
        "Lo más grave es que el payload no se limita a leer archivos en disco (`~/.azure/*.json`, `.npmrc`, `pip.conf`, `.netrc`, `.git-credentials`, `.docker/config.json`, Hugging Face y `.env`). También solicita tokens nuevos en tiempo real consultando Azure IMDS (`169.254.169.254`), `IDENTITY_ENDPOINT` y `MSI_ENDPOINT`, genera tokens OIDC federados en Azure DevOps y captura tokens OIDC de GitHub Actions en la `1.26.2`. Todo se comprime con `zlib`, se codifica en `Base64` y se envía por `POST` a `webhook.site`.",
        "La raíz del problema es arquitectónica: los entornos de agentes IA concentran permisos críticos sin verificación criptográfica de hashes (`--require-hashes`) ni listas blancas de salida de red (egress).",
        "Los gigantes venden seguridad autónoma en sus conferencias mientras descuidan su propia cadena de publicación. Sin control de salida y verificación estricta, tu infraestructura IA es solo un cajero automático abierto :)"
      ]
    }
  }
};

export default post;
