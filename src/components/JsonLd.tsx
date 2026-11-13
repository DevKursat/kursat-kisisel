export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kürşat Yılmaz",
    alternateName: "Kursat Yilmaz",
    jobTitle: "AI Product Engineer",
    description:
      "Kürşat Yılmaz is an AI Product Engineer specializing in autonomous multi-agent systems, multimodal intelligence pipelines, low-latency UI engineering, and production LLM orchestration.",
    url: "https://kursatyilmaz.dev",
    image: "https://kursatyilmaz.dev/og-image.jpg",
    sameAs: [
      "https://github.com/kursat-yilmaz",
      "https://linkedin.com",
      "https://x.com",
      "https://dev.to",
    ],
    knowsAbout: [
      "AI Product Engineering",
      "Multi-Agent Systems",
      "Autonomous Agent Architectures",
      "Generative AI & LLM Orchestration",
      "Low-Latency Streaming (WebSockets, WebRTC)",
      "Next.js & React Full-Stack Development",
      "Python, FastAPI & LangGraph",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Computer Science & Engineering",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kürşat Yılmaz — AI Product Engineer Portfolio",
    url: "https://kursatyilmaz.dev",
    description:
      "Official portfolio and engineering notes of Kürşat Yılmaz, AI Product Engineer.",
    author: {
      "@type": "Person",
      name: "Kürşat Yılmaz",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Kürşat Yılmaz?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kürşat Yılmaz is an AI Product Engineer who builds autonomous agent swarms, multimodal vision pipelines, and high-performance intelligent web products.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Kürşat Yılmaz use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kürşat specializes in Next.js, TypeScript, Python, FastAPI, LangGraph, WebGPU, WebRTC, Docker, and Firecracker microVM sandboxes for deterministic AI systems.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I find Kürşat Yılmaz's code and articles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "His active projects and 100+ experimental repositories are available on GitHub, alongside engineering essays syndicated across his portfolio, LinkedIn, X, and Dev.to.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
