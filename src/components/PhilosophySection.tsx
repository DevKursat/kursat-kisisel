"use client";

import { CheckCircle2, Cpu, ShieldCheck, Zap, GitBranch, Terminal } from "lucide-react";

const AXIOMS = [
  {
    number: "01",
    title: "Deterministic Guardrails",
    description:
      "Stochastic LLMs without deterministic evaluation loops fail in production. Every agentic output must pass through schema validation, AST parsers, and sandboxed test execution before it touches user state.",
  },
  {
    number: "02",
    title: "Sub-100ms Latency Budget",
    description:
      "Latency is not an optimization pass; it is a foundational UX primitive. We prioritize speculative decoding, token streaming, and local WebAssembly inference to eliminate cognitive lag.",
  },
  {
    number: "03",
    title: "Context Window Hygiene",
    description:
      "Unbounded prompt stuffing leads to semantic drift and bloated cloud invoices. We design sparse retrieval architectures with episodic memory pruning and hierarchical summary trees.",
  },
  {
    number: "04",
    title: "Zero-Trust Agentic Execution",
    description:
      "Autonomous agents write code, execute tools, and mutate environments inside isolated microVMs with cryptographic boundaries, ensuring rock-solid stability and impenetrable security.",
  },
];

const CAPABILITIES = [
  {
    category: "AI & AGENTIC SYSTEMS",
    items: ["Multi-Agent Topologies (LangGraph)", "Agentic Coding Loops", "Semantic Caching & Vector Search", "Tool-Calling & Function Orchestration", "Prompt Distillation & Evaluation"],
  },
  {
    category: "ENGINEERING & PLATFORM",
    items: ["Next.js (App Router) & React 19", "High-Performance TypeScript", "Python & FastAPI Async Backends", "WebSockets & WebRTC Streams", "Tailwind CSS & Motion Systems"],
  },
  {
    category: "INFRASTRUCTURE & COMPUTE",
    items: ["Vercel Edge & Serverless Functions", "Docker & Firecracker MicroVMs", "PostgreSQL & Vector Embeddings", "CI/CD & Automated Verification", "Observability & Trace Telemetry"],
  },
];

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-32 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-20 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[11px] font-mono text-zinc-400 mb-4">
              <Zap className="w-3.5 h-3.5 text-zinc-300" />
              <span>THE ENGINEERING AXIOMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white uppercase font-sans">
              Philosophy & Stack
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md font-light">
            Core principles developed through thousands of hours of architectural refinement,
            benchmarking, and shipping intelligent web products.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {AXIOMS.map((axiom) => (
            <div
              key={axiom.number}
              className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-white/[0.015] hover:border-white/25 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500 tracking-widest">
                  [{axiom.number} // AXIOM]
                </span>
                <span className="w-2 h-2 rounded-full bg-white/20" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                {axiom.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                {axiom.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Capabilities Matrix */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-8 sm:p-12">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>CORE TECHNICAL CAPABILITIES // TAXONOMY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAPABILITIES.map((cap) => (
              <div key={cap.category} className="space-y-4">
                <div className="text-sm font-semibold tracking-tight text-white border-b border-white/10 pb-3 font-mono">
                  {cap.category}
                </div>
                <ul className="space-y-2.5">
                  {cap.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-zinc-400 font-mono"
                    >
                      <span className="text-zinc-600">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
