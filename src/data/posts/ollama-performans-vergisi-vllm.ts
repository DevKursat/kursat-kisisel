import type { BlogPostItem } from "../blogIndex";

const post: BlogPostItem = {
  "slug": "ollama-performans-vergisi-vllm",
  "tag": "LLM ÇIKARIM MOTORLARI",
  "category": "llm",
  "title": "Ollama'nın 'Kolaylık Vergisi': Yerel Çıkarımda Neden Saf llama.cpp ve vLLM Kazanıyor?",
  "excerpt": "Yerel geliştirici araçlarının prodüksiyonda eşzamanlı istekler altında PagedAttention ve KV-Cache optimizasyon kayıpları.",
  "date": "6 Kas 2026",
  "isoDate": "2026-11-06",
  "readTime": "5 dk okuma",
  "imageUrl": "/blog/ollama-performans-vergisi-vllm.png",
  "metrics": [
    {
      "label": "GECİKME FARKI",
      "val": "%42 Düşüş"
    },
    {
      "label": "MOTOR",
      "val": "PagedAttention"
    }
  ],
  "content": [
    "Geliştiricilerin dizüstü bilgisayarlarında sevimli bir ikondan ibaret olan Ollama, gerçek bir Kubernetes kümesinde eşzamanlı 100 kullanıcıya hizmet veremez.",
    "vLLM ve TensorRT-LLM mimarilerinin sürekli batchleme (continuous batching) ve PagedAttention motorları olmadan kurumsal AI ölçeklenemez.",
    "Oyuncağı üretimden ayıran çizgi: Sentetik gecikme süresi (latency) ve token-başına-maliyet denetimidir."
  ],
  "translations": {
    "en": {
      "tag": "LLM INFERENCE ENGINES",
      "title": "Ollama's 'Convenience Tax': Why Native llama.cpp and vLLM Win in Production Inference",
      "excerpt": "Why local developer wrappers bleed PagedAttention and KV-cache efficiency under real concurrent production traffic.",
      "date": "Nov 6, 2026",
      "readTime": "5 min read",
      "metrics": [
        {
          "label": "LATENCY REDUCTION",
          "val": "42% Lower"
        },
        {
          "label": "ENGINE CORE",
          "val": "PagedAttention"
        }
      ],
      "content": [
        "A cute menu-bar daemon designed for developer laptops cannot serve 100 concurrent enterprise users inside a Kubernetes cluster.",
        "Without continuous batching and PagedAttention engines found in vLLM and TensorRT-LLM, production AI throughput simply cannot scale.",
        "What separates a toy prototype from production infrastructure is strict tail-latency discipline and cost-per-token control."
      ]
    },
    "de": {
      "tag": "LLM-INFERENZ-ENGINES",
      "title": "Ollamas 'Bequemlichkeitssteuer': Warum natives llama.cpp und vLLM in der Produktion gewinnen",
      "excerpt": "Warum lokale Entwickler-Wrapper unter echter Nebenläufigkeit PagedAttention- und KV-Cache-Effizienz verlieren.",
      "date": "6. Nov. 2026",
      "readTime": "5 Min. Lesezeit",
      "metrics": [
        {
          "label": "LATENZREDUKTION",
          "val": "42 % Weniger"
        },
        {
          "label": "ENGINE-KERN",
          "val": "PagedAttention"
        }
      ],
      "content": [
        "Ein bequemes Desktop-Tool auf dem Entwickler-Laptop kann keine 100 gleichzeitigen Nutzer in einem Kubernetes-Cluster bedienen.",
        "Ohne Continuous Batching und PagedAttention von vLLM und TensorRT-LLM skaliert produktive KI nicht.",
        "Die Grenze zwischen Spielzeug und Produktion verläuft entlang strikter Latenz- und Kosten-pro-Token-Kontrolle."
      ]
    },
    "es": {
      "tag": "MOTORES DE INFERENCIA LLM",
      "title": "El 'impuesto de comodidad' de Ollama: Por qué llama.cpp puro y vLLM ganan en inferencia",
      "excerpt": "Por qué las herramientas locales de escritorio pierden eficiencia de PagedAttention y KV-Cache bajo concurrencia real en producción.",
      "date": "6 nov 2026",
      "readTime": "5 min lectura",
      "metrics": [
        {
          "label": "REDUCCIÓN LATENCIA",
          "val": "42% Menos"
        },
        {
          "label": "MOTOR CENTRAL",
          "val": "PagedAttention"
        }
      ],
      "content": [
        "Lo que en el portátil del desarrollador parece una utilidad encantadora no puede atender a 100 usuarios simultáneos en un clúster de Kubernetes.",
        "Sin continuous batching ni PagedAttention propios de vLLM y TensorRT-LLM, la IA corporativa no escala.",
        "La frontera entre un juguete y la producción está en la latencia de cola y el control del coste por token."
      ]
    }
  }
};

export default post;
