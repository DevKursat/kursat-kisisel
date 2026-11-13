"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, Mail, Copy, Check, ArrowUpRight } from "lucide-react";

interface LogEntry {
  command?: string;
  response: string | React.ReactNode;
  time: string;
}

export default function TerminalConsole() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      response: (
        <div>
          <span className="text-zinc-300">
            SYSTEM BOOT SEQUENCE COMPLETE. WELCOME TO KÜRŞAT YILMAZ CONSOLE.
          </span>
          <br />
          <span className="text-zinc-500">
            Type <span className="text-white underline">help</span> or click the shortcuts below to explore commands.
          </span>
        </div>
      ),
      time: "00:00:01",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  const getTimestamp = () => {
    const d = new Date();
    return d.toTimeString().split(" ")[0];
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let response: React.ReactNode;

    switch (trimmed) {
      case "help":
        response = (
          <div className="space-y-1 text-zinc-400">
            <div>AVAILABLE COMMANDS:</div>
            <div><span className="text-white font-semibold">about</span> - Brief executive summary of Kürşat Yılmaz</div>
            <div><span className="text-white font-semibold">projects</span> - Flagship and experimental architectures</div>
            <div><span className="text-white font-semibold">skills</span> - Core technology stack and methodologies</div>
            <div><span className="text-white font-semibold">contact</span> - Direct contact channels and email</div>
            <div><span className="text-white font-semibold">clear</span> - Clear the terminal output</div>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="text-zinc-300">
            Kürşat Yılmaz is an AI Product Engineer focused on architecting autonomous agentic systems,
            low-latency multimodal software, and next-generation product interfaces.
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-1 text-zinc-300">
            <div>1. <span className="text-white">AETHERIS</span> — Multi-Agent Autonomous Workspace</div>
            <div>2. <span className="text-white">NEURALLENS</span> — Low-Latency Multimodal Vision Engine</div>
            <div>3. <span className="text-white">100+ OPEN REPOSITORIES</span> on GitHub</div>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="text-zinc-300">
            Languages & Frameworks: Next.js 15, React 19, TypeScript, Python, FastAPI, WebGPU, LangGraph.
            <br />
            Infrastructure: MicroVM sandboxes, Vector stores, WebSockets, Vercel Edge.
          </div>
        );
        break;

      case "contact":
      case "hire":
        response = (
          <div className="text-zinc-300">
            Email: <a href="mailto:tckursat@icloud.com" className="text-white underline">tckursat@icloud.com</a>
            <br />
            GitHub: <a href="https://github.com/devkursat" target="_blank" rel="noreferrer" className="text-white underline">github.com/devkursat</a>
            <br />
            LinkedIn: <a href="https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/" target="_blank" rel="noreferrer" className="text-white underline">linkedin.com/in/kürşatyılmaz</a>
            <br />
            X (Twitter): <a href="https://x.com/DevKursat" target="_blank" rel="noreferrer" className="text-white underline">x.com/DevKursat</a>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        return;

      default:
        response = (
          <span className="text-red-400">
            Command not recognized: &quot;{trimmed}&quot;. Type <span className="text-white underline">help</span> for options.
          </span>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        command: cmd,
        response,
        time: getTimestamp(),
      },
    ]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("kursat@itibar.app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <section id="terminal" className="relative py-32 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
          {/* Left Column: Direct Contact & Headline */}
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[11px] font-mono text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-zinc-300" />
              <span>COMMUNICATION TELEMETRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white uppercase font-sans">
              Let&apos;s Build The Next Leap.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
              Whether you are architecting a new AI venture, scaling an autonomous platform,
              or looking for an AI Product Engineer to lead product design and engineering—I am always open to high-impact challenges.
            </p>

            {/* Email Card */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">
              <div className="text-xs font-mono text-zinc-500 uppercase">DIRECT DISPATCH:</div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm sm:text-base text-white">
                  kursat@itibar.app
                </span>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white hover:text-black text-xs font-mono text-zinc-300 transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <a
                href="https://github.com/kursat-yilmaz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>X / TWITTER</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Box */}
          <div className="w-full lg:max-w-xl rounded-2xl border border-white/15 bg-black/90 shadow-2xl overflow-hidden font-mono text-xs flex flex-col h-[460px]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700" />
                <span className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700" />
                <span className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700" />
                <span className="ml-2 text-zinc-400 text-[11px]">ky_bash — zsh — 80x24</span>
              </div>
              <span className="text-[10px] text-zinc-600">ONLINE</span>
            </div>

            {/* Quick Command Chips */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/[0.01] overflow-x-auto">
              <span className="text-[10px] text-zinc-500 whitespace-nowrap">QUICK:</span>
              {["help", "about", "projects", "skills", "contact", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[11px] text-zinc-400 hover:text-white transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Log Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {logs.map((log, index) => (
                <div key={index} className="space-y-1">
                  {log.command && (
                    <div className="flex items-center gap-2 text-zinc-500">
                      <span className="text-zinc-600">[{log.time}]</span>
                      <span className="text-zinc-400 font-bold">visitor@ky:~$</span>
                      <span className="text-white">{log.command}</span>
                    </div>
                  )}
                  <div className="pl-4 border-l border-white/10">{log.response}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input */}
            <form onSubmit={onSubmit} className="p-3 border-t border-white/10 bg-white/[0.02] flex items-center gap-2">
              <span className="text-zinc-400 font-bold">visitor@ky:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type a command (e.g. contact)..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-zinc-600 font-mono"
              />
              <button
                type="submit"
                aria-label="Send command"
                className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
