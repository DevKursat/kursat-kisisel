"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  Flame,
  MessageSquare,
  Send,
  Skull,
  Sparkles,
  Target,
  Vote,
} from "lucide-react";
import { Spotlight } from "@/components/core/spotlight";
import type { BlogLang, BlogPostItem } from "@/data/blogIndex";
import {
  getPostDilemmaPoll,
  getPostDiscussionData,
} from "@/data/postDiscussions";
import {
  BlueskyIcon,
  DevtoIcon,
  HashnodeIcon,
  LinkedinIcon,
  MediumIcon,
  RedditIcon,
  TwitterXIcon,
} from "@/components/Icons";

interface PublicComment {
  id: string;
  authorName: string;
  role: string | null;
  text: string;
  stance: "a" | "b" | null;
  lang: string;
  createdAt: string;
}

interface EngagementResponse {
  slug: string;
  votesA: number;
  votesB: number;
  reactions: {
    bullseye: number;
    fire: number;
    skull: number;
  };
  comments: PublicComment[];
}

const HUB_COPY: Record<
  BlogLang,
  {
    pollBadge: string;
    votesSuffix: string;
    votedNote: string;
    defendTitle: string;
    defendX: string;
    defendLi: string;
    defendDevto: string;
    bridgeBadge: string;
    bridgeTitle: string;
    bridgeDesc: string;
    liveTag: string;
    reachSuffix: string;
    reactTitle: string;
    reactBullseye: string;
    reactFire: string;
    reactSkull: string;
    commentsBadge: string;
    commentsTitle: string;
    namePlaceholder: string;
    rolePlaceholder: string;
    commentPlaceholder: string;
    submitComment: string;
    submitting: string;
    emptyComments: string;
    campALabel: string;
    campBLabel: string;
    toolsBannerBadge: string;
    toolsBannerTitle: string;
    toolsBannerCta: string;
  }
> = {
  tr: {
    pollBadge: "1-TIK MİMARİ İKİLEM // TARAFINI SEÇ",
    votesSuffix: "mühendis oyu",
    votedNote: "Oyunuz işlendi — diğer mühendislerin dağılımı açık.",
    defendTitle: "Neden bu taraftasın? Tezini canlı tartışmada savun:",
    defendX: "X'te Yanıtla",
    defendLi: "LinkedIn Tartışması",
    defendDevto: "DEV.to Yorumları",
    bridgeBadge: "CANLI TARTIŞMA KÖPRÜSÜ // PUBLISHED THREADS",
    bridgeTitle: "Bu analizi yayınlandığı platformda tartışın",
    bridgeDesc:
      "Genel profil yerine doğrudan bu yazının aktif sosyal başlıklarına ve geliştirici yorumlarına inin.",
    liveTag: "CANLI BAŞLIK",
    reachSuffix: "doğrulanmış gösterim",
    reactTitle: "Hızlı Mühendislik Tepkisi:",
    reactBullseye: "Tam İsabet",
    reactFire: "Sert Gerçek",
    reactSkull: "Prod Çöktü",
    commentsBadge: "TEKNİK TARTIŞMA PANOSU // SIFIR GİRİŞ SÜRTÜNMESİ",
    commentsTitle: "Mimari Not veya Kontra Argüman Bırak",
    namePlaceholder: "Adınız (ör. Mert K.)",
    rolePlaceholder: "Ünvan / Ekip (opsiyonel, ör. Staff Eng)",
    commentPlaceholder:
      "Bu mimari vakada gözden kaçan darboğaz veya kendi üretim deneyiminiz nedir?",
    submitComment: "Yorumu Yayınla",
    submitting: "Gönderiliyor...",
    emptyComments:
      "İlk teknik kontra argümanı veya saha deneyimini siz bırakın.",
    campALabel: "Taraf A",
    campBLabel: "Taraf B",
    toolsBannerBadge: "ÜCRETSİZ MÜHENDİSLİK ARACI",
    toolsBannerTitle:
      "Kendi API vs. Bare-Metal GPU başabaş noktanızı ve ajan hata riskinizi hesaplayın",
    toolsBannerCta: "Hesaplayıcıyı Aç",
  },
  en: {
    pollBadge: "1-CLICK ARCHITECTURAL DILEMMA // PICK YOUR CAMP",
    votesSuffix: "engineer votes",
    votedNote: "Vote recorded — live engineering split unlocked.",
    defendTitle: "Back up your stance in the live thread:",
    defendX: "Reply on X",
    defendLi: "LinkedIn Thread",
    defendDevto: "DEV.to Comments",
    bridgeBadge: "LIVE DISCUSSION BRIDGE // SYNDICATED THREADS",
    bridgeTitle: "Jump straight into this essay's live threads",
    bridgeDesc:
      "Skip generic profile links—join the active engineering debate directly on each platform.",
    liveTag: "LIVE THREAD",
    reachSuffix: "verified impressions",
    reactTitle: "Quick Engineering Pulse:",
    reactBullseye: "Spot On",
    reactFire: "Hard Truth",
    reactSkull: "Prod Broke",
    commentsBadge: "ENGINEERING BOARD // ZERO LOGIN FRICTION",
    commentsTitle: "Drop an Architectural Note or Counter-Take",
    namePlaceholder: "Your name (e.g. Alex R.)",
    rolePlaceholder: "Role / Stack (optional, e.g. Principal Eng)",
    commentPlaceholder:
      "What bottleneck, benchmark nuance, or production scar tissue would you add?",
    submitComment: "Post Note",
    submitting: "Posting...",
    emptyComments:
      "Be the first engineer to drop a counter-argument or production note.",
    campALabel: "Camp A",
    campBLabel: "Camp B",
    toolsBannerBadge: "FREE ENGINEERING LAB",
    toolsBannerTitle:
      "Run your own LLM API vs. Bare-Metal GPU break-even & multi-agent reliability math",
    toolsBannerCta: "Open Calculators",
  },
  de: {
    pollBadge: "1-KLICK ARCHITEKTUR-DILEMMA // WÄHLEN SIE IHRE SEITE",
    votesSuffix: "Engineering-Stimmen",
    votedNote: "Stimme gezählt — Live-Verteilung freigeschaltet.",
    defendTitle: "Vertreten Sie Ihre These direkt in der Live-Diskussion:",
    defendX: "Auf X antworten",
    defendLi: "LinkedIn-Beitrag",
    defendDevto: "DEV.to-Kommentare",
    bridgeBadge: "LIVE-DISKUSSIONSBRÜCKE // DIREKTE THREADS",
    bridgeTitle: "Diskutieren Sie diese Analyse auf Ihrer Plattform",
    bridgeDesc:
      "Direkter Sprung in die aktiven Threads und Entwicklerkommentare dieses Artikels.",
    liveTag: "LIVE-THREAD",
    reachSuffix: "verifizierte Impressionen",
    reactTitle: "Schnelle Reaktion:",
    reactBullseye: "Volltreffer",
    reactFire: "Harte Realität",
    reactSkull: "Prod-Ausfall",
    commentsBadge: "TECHNISCHES BOARD // OHNE LOGIN-HÜRDE",
    commentsTitle: "Architekturnotiz oder Gegenargument hinterlassen",
    namePlaceholder: "Ihr Name",
    rolePlaceholder: "Rolle (optional, z. B. Tech Lead)",
    commentPlaceholder:
      "Welche Produktions-Erfahrung oder Gegenperspektive ergänzen Sie?",
    submitComment: "Kommentar senden",
    submitting: "Wird gesendet...",
    emptyComments:
      "Hinterlassen Sie die erste technische Einschätzung zu diesem Artikel.",
    campALabel: "Seite A",
    campBLabel: "Seite B",
    toolsBannerBadge: "KOSTENLOSES ENGINEERING-TOOL",
    toolsBannerTitle:
      "Berechnen Sie Ihren eigenen LLM-API vs. Bare-Metal-GPU Break-Even & VRAM-Bedarf",
    toolsBannerCta: "Rechner öffnen",
  },
  es: {
    pollBadge: "DILEMA DE ARQUITECTURA EN 1 CLIC // ELIGE TU BANDO",
    votesSuffix: "votos de ingenieros",
    votedNote: "Voto registrado — distribución en vivo desbloqueada.",
    defendTitle: "Defiende tu postura en el hilo en vivo:",
    defendX: "Responder en X",
    defendLi: "Hilo en LinkedIn",
    defendDevto: "Comentarios DEV.to",
    bridgeBadge: "PUENTE DE DEBATE EN VIVO // HILOS PUBLICADOS",
    bridgeTitle: "Debate este análisis en su hilo original",
    bridgeDesc:
      "Accede directamente a la conversación activa de este artículo en cada red técnica.",
    liveTag: "HILO ACTIVO",
    reachSuffix: "impresiones verificadas",
    reactTitle: "Pulso Rápido:",
    reactBullseye: "En el Blanco",
    reactFire: "Verdad Cruda",
    reactSkull: "Prod Caído",
    commentsBadge: "FORO TÉCNICO // CERO FRICCIÓN DE LOGIN",
    commentsTitle: "Deja una Nota de Arquitectura o Contraargumento",
    namePlaceholder: "Tu nombre",
    rolePlaceholder: "Rol (opcional, ej. Staff Engineer)",
    commentPlaceholder:
      "¿Qué cuello de botella o experiencia real en producción añadirías?",
    submitComment: "Publicar Nota",
    submitting: "Publicando...",
    emptyComments:
      "Sé el primer ingeniero en compartir un contraargumento técnico.",
    campALabel: "Bando A",
    campBLabel: "Bando B",
    toolsBannerBadge: "HERRAMIENTA GRATUITA",
    toolsBannerTitle:
      "Calcula tu punto de equilibrio API LLM vs. GPU Bare-Metal y riesgo multi-agente",
    toolsBannerCta: "Abrir Calculadora",
  },
};

function renderChannelIcon(id: string) {
  switch (id) {
    case "linkedin":
      return <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />;
    case "x":
      return <TwitterXIcon className="w-3 h-3 shrink-0" />;
    case "devto":
      return <DevtoIcon className="w-3.5 h-3.5 shrink-0" />;
    case "hashnode":
      return <HashnodeIcon className="w-3.5 h-3.5 shrink-0" />;
    case "medium":
      return <MediumIcon className="w-3.5 h-3.5 shrink-0" />;
    case "bluesky":
      return <BlueskyIcon className="w-3.5 h-3.5 shrink-0" />;
    case "reddit":
      return <RedditIcon className="w-3.5 h-3.5 shrink-0" />;
    default:
      return <MessageSquare className="w-3.5 h-3.5 shrink-0" />;
  }
}

export default function ArticleEngagementHub({
  slug,
  title,
  category,
  activeLang,
  articleUrl,
}: {
  slug: string;
  title: string;
  category: BlogPostItem["category"];
  activeLang: BlogLang;
  articleUrl: string;
}) {
  const copy = HUB_COPY[activeLang] ?? HUB_COPY.tr;
  const pollSpec = useMemo(
    () => getPostDilemmaPoll(slug, category, activeLang),
    [slug, category, activeLang]
  );
  const discussion = useMemo(() => getPostDiscussionData(slug), [slug]);

  const [selectedChoice, setSelectedChoice] = useState<"a" | "b" | null>(null);
  const [liveData, setLiveData] = useState<EngagementResponse>({
    slug,
    votesA: 0,
    votesB: 0,
    reactions: { bullseye: 4, fire: 7, skull: 2 },
    comments: [],
  });
  const [reactedMap, setReactedMap] = useState<Record<string, boolean>>({});

  const [authorName, setAuthorName] = useState("");
  const [role, setRole] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentBusy, setCommentBusy] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    try {
      const storedVote = localStorage.getItem(`ky_poll_${slug}`);
      if (storedVote === "a" || storedVote === "b") {
        setSelectedChoice(storedVote);
      } else {
        setSelectedChoice(null);
      }

      const storedReacts = localStorage.getItem(`ky_react_${slug}`);
      if (storedReacts) {
        setReactedMap(JSON.parse(storedReacts));
      } else {
        setReactedMap({});
      }
    } catch {
      // Ignore storage restrictions
    }

    let cancelled = false;
    fetch(`/api/poll?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: EngagementResponse | null) => {
        if (!cancelled && json) {
          setLiveData({
            slug,
            votesA: Number(json.votesA || 0),
            votesB: Number(json.votesB || 0),
            reactions: {
              bullseye: 4 + Number(json.reactions?.bullseye || 0),
              fire: 7 + Number(json.reactions?.fire || 0),
              skull: 2 + Number(json.reactions?.skull || 0),
            },
            comments: Array.isArray(json.comments) ? json.comments : [],
          });
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const totalA = pollSpec.seedA + liveData.votesA;
  const totalB = pollSpec.seedB + liveData.votesB;
  const grandTotal = Math.max(1, totalA + totalB);
  const pctA = Math.round((totalA / grandTotal) * 100);
  const pctB = 100 - pctA;

  const handleVote = async (choice: "a" | "b") => {
    const prev = selectedChoice;
    if (prev === choice) return;

    setSelectedChoice(choice);
    setLiveData((cur) => ({
      ...cur,
      votesA: Math.max(
        0,
        cur.votesA + (choice === "a" ? 1 : 0) - (prev === "a" ? 1 : 0)
      ),
      votesB: Math.max(
        0,
        cur.votesB + (choice === "b" ? 1 : 0) - (prev === "b" ? 1 : 0)
      ),
    }));

    try {
      localStorage.setItem(`ky_poll_${slug}`, choice);
    } catch {}

    try {
      const res = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          action: "vote",
          choice,
          previousChoice: prev,
        }),
      });
      if (res.ok) {
        const updated = (await res.json()) as EngagementResponse;
        setLiveData((cur) => ({
          ...cur,
          votesA: Number(updated.votesA || 0),
          votesB: Number(updated.votesB || 0),
        }));
      }
    } catch {
      // Keep optimistic state
    }
  };

  const handleReaction = async (key: "bullseye" | "fire" | "skull") => {
    if (reactedMap[key]) return;
    const nextMap = { ...reactedMap, [key]: true };
    setReactedMap(nextMap);
    setLiveData((cur) => ({
      ...cur,
      reactions: {
        ...cur.reactions,
        [key]: cur.reactions[key] + 1,
      },
    }));

    try {
      localStorage.setItem(`ky_react_${slug}`, JSON.stringify(nextMap));
    } catch {}

    try {
      await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          action: "react",
          reaction: key,
        }),
      });
    } catch {}
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError(null);
    setCommentSuccess(false);

    if (authorName.trim().length < 2 || commentText.trim().length < 6) {
      setCommentError(
        activeLang === "tr"
          ? "Lütfen adınızı ve en az 6 karakterlik teknik notunuzu yazın."
          : "Please enter your name and a technical note (min 6 chars)."
      );
      return;
    }

    setCommentBusy(true);
    try {
      const res = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          action: "comment",
          authorName: authorName.trim(),
          role: role.trim() || null,
          text: commentText.trim(),
          stance: selectedChoice,
          lang: activeLang,
        }),
      });
      const json = (await res.json()) as EngagementResponse & { error?: string };
      if (!res.ok) {
        setCommentError(json.error || "Gönderilemedi.");
        return;
      }
      setLiveData((cur) => ({
        ...cur,
        comments: Array.isArray(json.comments) ? json.comments : cur.comments,
      }));
      setCommentText("");
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 3500);
    } catch {
      setCommentError(
        activeLang === "tr"
          ? "Bağlantı hatası oluştu, tekrar deneyin."
          : "Connection error, please try again."
      );
    } finally {
      setCommentBusy(false);
    }
  };

  const chosenText =
    selectedChoice === "a"
      ? pollSpec.optionA
      : selectedChoice === "b"
      ? pollSpec.optionB
      : title;

  const shareVoteTweetHref = `https://x.com/intent/tweet?text=${encodeURIComponent(
    `"${chosenText}" — @DevKursat (${title})`
  )}&url=${encodeURIComponent(articleUrl)}`;

  const linkedinLink =
    discussion.links.find((l) => l.id === "linkedin")?.href ??
    "https://www.linkedin.com/in/k%C3%BCr%C5%9Faty%C4%B1lmaz/recent-activity/all/";
  const xThreadLink =
    discussion.links.find((l) => l.id === "x" && l.isDirectThread)?.href ??
    shareVoteTweetHref;
  const devtoLink =
    discussion.links.find((l) => l.id === "devto")?.href ??
    "https://dev.to/kursatyz";

  return (
    <div className="mt-10 space-y-5">
      {/* 1. 1-CLICK ARCHITECTURAL DILEMMA POLL */}
      <section
        id="article-dilemma-poll"
        aria-label={copy.pollBadge}
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b10] p-5 sm:p-6"
      >
        <Spotlight size={340} />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-400">
              <Vote className="w-3.5 h-3.5" />
              <span>{copy.pollBadge}</span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
              {grandTotal} {copy.votesSuffix}
            </span>
          </div>

          <h2 className="font-archivo font-[800] text-lg sm:text-xl text-white leading-snug">
            {pollSpec.question}
          </h2>

          <div className="grid grid-cols-1 gap-2.5">
            {(
              [
                { key: "a" as const, label: pollSpec.optionA, pct: pctA },
                { key: "b" as const, label: pollSpec.optionB, pct: pctB },
              ] as const
            ).map((opt) => {
              const isPicked = selectedChoice === opt.key;
              const showResults = selectedChoice !== null;

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleVote(opt.key)}
                  className={`group relative w-full overflow-hidden rounded-xl border p-3.5 sm:p-4 text-left transition-all cursor-pointer ${
                    isPicked
                      ? "border-emerald-400/60 bg-emerald-500/[0.08]"
                      : "border-white/12 bg-white/[0.025] hover:border-white/30 hover:bg-white/[0.05]"
                  }`}
                >
                  {showResults && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${opt.pct}%` }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className={`pointer-events-none absolute inset-y-0 left-0 ${
                        isPicked ? "bg-emerald-400/15" : "bg-white/[0.06]"
                      }`}
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono font-bold ${
                          isPicked
                            ? "border-emerald-400 bg-emerald-400 text-black"
                            : "border-white/25 text-zinc-300 group-hover:border-white"
                        }`}
                      >
                        {opt.key.toUpperCase()}
                      </span>
                      <span className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed">
                        {opt.label}
                      </span>
                    </div>

                    {showResults && (
                      <span
                        className={`shrink-0 text-sm sm:text-base font-mono font-bold tabular-nums ${
                          isPicked ? "text-emerald-300" : "text-zinc-300"
                        }`}
                      >
                        %{opt.pct}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Post-Vote Social Bridge CTA */}
          <AnimatePresence>
            {selectedChoice && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <p className="text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{copy.votedNote}</span>
                  </p>
                  <p className="text-xs text-zinc-400">{copy.defendTitle}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href={xThreadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-semibold transition-colors"
                  >
                    <TwitterXIcon className="w-3 h-3" />
                    <span>{copy.defendX}</span>
                  </a>
                  <a
                    href={linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white hover:text-black text-xs font-mono text-zinc-200 transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>{copy.defendLi}</span>
                  </a>
                  <a
                    href={devtoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white hover:text-black text-xs font-mono text-zinc-200 transition-colors"
                  >
                    <DevtoIcon className="w-3.5 h-3.5" />
                    <span>{copy.defendDevto}</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Engineering Pulse Reactions */}
          <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-zinc-400">
              {copy.reactTitle}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  {
                    key: "bullseye" as const,
                    label: copy.reactBullseye,
                    icon: <Target className="w-3.5 h-3.5 text-emerald-400" />,
                    count: liveData.reactions.bullseye,
                  },
                  {
                    key: "fire" as const,
                    label: copy.reactFire,
                    icon: <Flame className="w-3.5 h-3.5 text-amber-400" />,
                    count: liveData.reactions.fire,
                  },
                  {
                    key: "skull" as const,
                    label: copy.reactSkull,
                    icon: <Skull className="w-3.5 h-3.5 text-zinc-300" />,
                    count: liveData.reactions.skull,
                  },
                ] as const
              ).map((r) => {
                const active = Boolean(reactedMap[r.key]);
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => handleReaction(r.key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                      active
                        ? "border-emerald-400/50 bg-emerald-500/15 text-white"
                        : "border-white/12 bg-white/[0.03] text-zinc-300 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {r.icon}
                    <span>{r.label}</span>
                    <span className="text-[11px] text-zinc-400 tabular-nums">
                      {r.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE SYNDICATED DISCUSSION BRIDGE (publishedUrls) */}
      <section
        id="article-discussion-bridge"
        aria-label={copy.bridgeBadge}
        className="rounded-2xl border border-white/12 bg-[#0a0a0e] p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{copy.bridgeBadge}</span>
          </div>
          {discussion.impressions && discussion.impressions > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-mono text-emerald-300 tabular-nums">
              <span>
                {discussion.impressions.toLocaleString("en-US")}+ {copy.reachSuffix}
              </span>
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-archivo font-[800] text-base sm:text-lg text-white">
            {copy.bridgeTitle}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {copy.bridgeDesc}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {discussion.links.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-mono transition-all ${
                item.isDirectThread
                  ? "border-emerald-500/30 bg-emerald-500/[0.06] text-white hover:bg-white hover:text-black hover:border-white"
                  : "border-white/10 bg-white/[0.025] text-zinc-300 hover:bg-white hover:text-black hover:border-white"
              }`}
            >
              <span className="inline-flex items-center gap-2 min-w-0 truncate">
                {renderChannelIcon(item.id)}
                <span className="truncate font-semibold">{item.label}</span>
              </span>
              <span className="inline-flex items-center gap-1 shrink-0">
                {item.isDirectThread && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:bg-black"
                    title={copy.liveTag}
                  />
                )}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </div>

        {/* Cross-Link to /tools Free Calculators */}
        <Link
          href={`/tools?from=${encodeURIComponent(slug)}`}
          className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/12 bg-white/[0.025] hover:bg-white/[0.06] hover:border-white/25 p-3.5 transition-all group"
        >
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              <Calculator className="w-3 h-3" />
              <span>{copy.toolsBannerBadge}</span>
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 font-medium">
              {copy.toolsBannerTitle}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full bg-white text-black text-xs font-mono font-bold group-hover:bg-zinc-200 transition-colors">
            <span>{copy.toolsBannerCta}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </section>

      {/* 3. ZERO-FRICTION NATIVE TECHNICAL COMMENT BOARD */}
      <section
        id="article-comments"
        aria-label={copy.commentsBadge}
        className="rounded-2xl border border-white/12 bg-[#0a0a0e] p-5 sm:p-6 space-y-5"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-zinc-400">
            <MessageSquare className="w-3.5 h-3.5 text-zinc-300" />
            <span>{copy.commentsBadge}</span>
          </div>
          <h3 className="font-archivo font-[800] text-base sm:text-lg text-white">
            {copy.commentsTitle}
          </h3>
        </div>

        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              required
              maxLength={60}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder={copy.namePlaceholder}
              className="h-10 rounded-xl border border-white/12 bg-black/70 px-3.5 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/35"
            />
            <input
              type="text"
              maxLength={60}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder={copy.rolePlaceholder}
              className="h-10 rounded-xl border border-white/12 bg-black/70 px-3.5 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/35"
            />
          </div>

          <textarea
            rows={3}
            required
            maxLength={900}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={copy.commentPlaceholder}
            className="w-full rounded-xl border border-white/12 bg-black/70 p-3.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/35 leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-[11px] font-mono">
              {commentError ? (
                <span className="text-red-400">{commentError}</span>
              ) : commentSuccess ? (
                <span className="text-emerald-400">
                  {activeLang === "tr"
                    ? "Teknik notunuz yayınlandı."
                    : "Your technical note is live."}
                </span>
              ) : selectedChoice ? (
                <span className="text-zinc-400">
                  {activeLang === "tr" ? "Seçili taraf: " : "Selected stance: "}
                  <strong className="text-emerald-300">
                    {selectedChoice === "a" ? copy.campALabel : copy.campBLabel}
                  </strong>
                </span>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={commentBusy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 disabled:opacity-50 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{commentBusy ? copy.submitting : copy.submitComment}</span>
            </button>
          </div>
        </form>

        <div className="pt-3 border-t border-white/10 space-y-3">
          {liveData.comments.length === 0 ? (
            <p className="text-xs font-mono text-zinc-500">
              {copy.emptyComments}
            </p>
          ) : (
            liveData.comments.map((cmt) => (
              <div
                key={cmt.id}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-white font-semibold">
                      {cmt.authorName}
                    </span>
                    {cmt.role && (
                      <span className="text-zinc-400">· {cmt.role}</span>
                    )}
                    {cmt.stance && (
                      <span className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[10px] text-emerald-300">
                        {cmt.stance === "a" ? copy.campALabel : copy.campBLabel}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    {cmt.createdAt.slice(0, 10)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
                  {cmt.text}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
