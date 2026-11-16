export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kürşat Yılmaz",
    alternateName: "Kursat Yilmaz",
    jobTitle: "AI Product Engineer",
    description:
      "Kürşat Yılmaz is an AI Product Engineer specializing in autonomous multi-agent systems, multimodal intelligence pipelines, low-latency UI engineering, and production LLM orchestration.",
    url: "https://kursat.itibar.app",
    image: "https://kursat.itibar.app/og-image.jpg",
    sameAs: [
      "https://github.com/DevKursat",
      "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/",
      "https://x.com/DevKursat",
      "https://dev.to/devkursat",
      "https://hashnode.com/@kursatyz",
      "https://medium.com/@ykursat054",
      "https://www.indiehackers.com/kursatyz",
      "https://news.ycombinator.com/user?id=kursatyz",
      "https://bsky.app/profile/kursatyz.bsky.social",
      "https://www.reddit.com/user/Delicious_Character6/",
      "https://contra.com/kursat_yilmaz_ei1ue08l/work",
      "https://bionluk.com/kurstayilmaz",
      "https://www.fiverr.com/kurs_tt",
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
    url: "https://kursat.itibar.app",
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
