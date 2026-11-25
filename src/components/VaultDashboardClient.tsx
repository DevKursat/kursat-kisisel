"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  ExternalLink,
  Inbox,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  RefreshCw,
  Reply,
  Send,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import type {
  CommentPlatform,
  JobPlatform,
  JobStatus,
  JobThreadEvent,
  OpsCommentItem,
  OpsEmailItem,
  OpsJobItem,
  OpsStorePayload,
  OpsSuggestionItem,
} from "@/lib/opsStore";

interface TelemetryLite {
  generatedAt: string;
  mode: "local" | "cloud";
  snapshotSyncedAt: string;
  summary: {
    blogCount: number;
    blogQualityPassCount: number;
    radarTodayCount: number;
    radarTotalCount: number;
    devtoPublishedCount: number;
    devtoTotalReactions: number;
    devtoTotalComments: number;
  };
  radarLogs: Array<{
    ts: string;
    platform: string;
    target: string;
    title?: string;
    url: string;
    replyPreview?: string;
  }>;
  blogAudit: Array<{
    slug: string;
    title: string;
    isoDate: string;
    wordCountTr: number;
    langCount: number;
    qualityPass: boolean;
  }>;
}

interface UnifiedPayload {
  store: OpsStorePayload;
  telemetry: TelemetryLite;
}

type TabId = "freelance" | "comments" | "mail";
type JobFilterId = "applied" | "replied" | "followup" | "opportunities" | "closed";

const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  sent: "Başvuruldu (Yanıt Bekleniyor)",
  replied: "Yanıt Geldi",
  interview: "Görüşmede",
  offer_received: "Teklif Geldi",
  won: "Kazanıldı",
  rejected: "Olumsuz / Kapandı",
  discovered: "Açık Fırsat (Form/Link)",
  pending_approval: "Açık Fırsat",
  approved: "Süreçte",
  archived: "Arşiv",
};

const PLATFORM_LABELS: Record<JobPlatform, string> = {
  upwork: "Upwork",
  fiverr: "Fiverr",
  bionluk: "Bionluk",
  contra: "Contra",
  linkedin: "LinkedIn",
  wellfound: "Wellfound",
  reddit: "Reddit",
  hn: "Hacker News",
  direct: "Doğrudan / B2B",
};

const CHANNEL_LABELS: Record<NonNullable<OpsJobItem["channel"]>, string> = {
  zoho_email: "Zoho Mail + CV",
  form: "Başvuru Formu",
  marketplace: "Pazar Yeri",
  reddit_post: "Reddit İlanı",
};

function extractFallbackEmail(notes?: string): string {
  if (!notes) return "";
  const m = notes.match(/Direkt E-posta:\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
  return m ? m[1].trim() : "";
}

function buildDisplayEvents(job: OpsJobItem): JobThreadEvent[] {
  if (Array.isArray(job.threadEvents) && job.threadEvents.length > 0) {
    return [...job.threadEvents].sort((a, b) => String(a.ts).localeCompare(String(b.ts)));
  }

  const events: JobThreadEvent[] = [];
  const email = job.contactEmail || extractFallbackEmail(job.notes);
  const sentTime = job.sentAt || job.createdAt;
  const isSentLike = ["sent", "replied", "interview", "offer_received", "won", "rejected"].includes(
    job.status
  );

  if (isSentLike) {
    events.push({
      id: "synth_out",
      ts: sentTime,
      direction: "outbound",
      to: email || undefined,
      snippet: email
        ? `${email} adresine CV ekli başvuru gönderildi.`
        : "Başvuru / form gönderimi tamamlandı.",
    });
  }

  if (job.followUpSentAt) {
    events.push({
      id: "synth_fu",
      ts: job.followUpSentAt,
      direction: "followup",
      to: email || undefined,
      snippet: "3. gün otomatik takip (follow-up) e-postası gönderildi.",
    });
  }

  if (job.lastInboundPreview) {
    const isAck = job.lastInboundPreview.startsWith("[Otomatik");
    events.push({
      id: "synth_in",
      ts: job.lastInboundAt || job.updatedAt,
      direction: isAck ? "auto_ack" : "inbound",
      from: job.lastInboundFrom,
      subject: job.lastInboundSubject,
      snippet: job.lastInboundPreview,
    });
  }

  return events;
}

function formatShortDate(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusBadgeStyle(job: OpsJobItem): { label: string; cls: string } {
  if (job.status === "won") {
    return {
      label: "🏆 Kazanıldı",
      cls: "bg-emerald-500/20 border-emerald-400/50 text-emerald-200",
    };
  }
  if (job.status === "offer_received") {
    return {
      label: "💰 Teklif Geldi",
      cls: "bg-emerald-500/15 border-emerald-400/40 text-emerald-300",
    };
  }
  if (job.status === "interview") {
    return {
      label: "🔥 Görüşme / Mülakat",
      cls: "bg-amber-500/20 border-amber-400/50 text-amber-200",
    };
  }
  if (job.status === "replied") {
    return {
      label: "📩 İşveren Yanıtladı",
      cls: "bg-sky-500/20 border-sky-400/50 text-sky-200",
    };
  }
  if (job.status === "rejected") {
    return {
      label: "Olumsuz / Kapandı",
      cls: "bg-rose-500/10 border-rose-500/30 text-rose-300",
    };
  }
  if (job.status === "sent") {
    if (job.followUpSentAt) {
      return {
        label: "🔁 Follow-Up Gönderildi",
        cls: "bg-violet-500/15 border-violet-400/35 text-violet-200",
      };
    }
    if (job.lastInboundPreview?.startsWith("[Otomatik")) {
      return {
        label: "✓ Gönderildi · Alındı Teyitli",
        cls: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      };
    }
    return {
      label: "📤 Gönderildi · Yanıt Bekleniyor",
      cls: "bg-zinc-900 border-zinc-700 text-zinc-200",
    };
  }
  return {
    label: JOB_STATUS_LABELS[job.status] || job.status,
    cls: "bg-zinc-900 border-zinc-800 text-zinc-400",
  };
}

export default function VaultDashboardClient() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<TabId>("freelance");
  const [jobFilter, setJobFilter] = useState<JobFilterId>("applied");
  const [data, setData] = useState<UnifiedPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [brandFilter, setBrandFilter] = useState<"all" | "blog" | "bocek">("all");
  const [statusFilter, setStatusFilter] = useState<"pending" | "approved" | "sent" | "all">("pending");
  const [platformFilter, setPlatformFilter] = useState<"all" | CommentPlatform>("all");
  const [draftEdits, setDraftEdits] = useState<Record<string, string>>({});
  const [selectedImages, setSelectedImages] = useState<Record<string, string>>({});

  const [showAddJob, setShowAddJob] = useState(false);
  const [newJob, setNewJob] = useState({
    platform: "direct" as JobPlatform,
    title: "",
    clientName: "",
    budget: "$1,500",
    currency: "USD" as "USD" | "EUR" | "TRY",
    url: "",
    proposalDraft: "",
    status: "sent" as JobStatus,
  });

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ops/data", { cache: "no-store" });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) throw new Error("Veri yüklenemedi");
      const payload = (await res.json()) as UnifiedPayload;
      setData(payload);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/ops/auth", { cache: "no-store" });
        const json = (await res.json()) as { authenticated?: boolean };
        const isAuthed = Boolean(json.authenticated);
        setAuthenticated(isAuthed);
        if (isAuthed) {
          await fetchData();
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, [fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await fetch("/api/ops/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setAuthError(json.error || "Giriş başarısız.");
        return;
      }
      setPinInput("");
      setAuthenticated(true);
      await fetchData();
    } catch {
      setAuthError("Bağlantı hatası.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/ops/auth", { method: "DELETE" });
    setAuthenticated(false);
    setData(null);
  };

  const runAction = async (id: string, body: Record<string, unknown>, successMsg: string) => {
    setActionBusyId(id);
    try {
      const res = await fetch("/api/ops/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        showToast(json.error || "İşlem başarısız.");
        return;
      }
      showToast(successMsg);
      await fetchData();
    } catch {
      showToast("İstek gönderilemedi.");
    } finally {
      setActionBusyId(null);
    }
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title.trim()) return;
    await runAction(
      "add-job",
      { action: "add_job", ...newJob },
      "Başvuru / iş kaydı eklendi."
    );
    setNewJob({
      platform: "direct",
      title: "",
      clientName: "",
      budget: "$1,500",
      currency: "USD",
      url: "",
      proposalDraft: "",
      status: "sent",
    });
    setShowAddJob(false);
  };

  const jobBuckets = useMemo(() => {
    const all = data?.store.jobs || [];
    const statusPriority: Record<string, number> = {
      offer_received: 1,
      interview: 2,
      replied: 3,
      won: 4,
      sent: 5,
      rejected: 6,
      discovered: 7,
      pending_approval: 8,
      approved: 9,
      archived: 10,
    };

    const sortFn = (a: OpsJobItem, b: OpsJobItem) => {
      const pa = statusPriority[a.status] ?? 99;
      const pb = statusPriority[b.status] ?? 99;
      if (pa !== pb) return pa - pb;
      const ta = a.lastInboundAt || a.sentAt || a.updatedAt || a.createdAt;
      const tb = b.lastInboundAt || b.sentAt || b.updatedAt || b.createdAt;
      return String(tb).localeCompare(String(ta));
    };

    const applied = all
      .filter((j) =>
        ["sent", "replied", "interview", "offer_received", "won"].includes(j.status)
      )
      .sort(sortFn);

    const replied = all
      .filter(
        (j) =>
          ["replied", "interview", "offer_received", "won"].includes(j.status) ||
          (Boolean(j.lastInboundPreview) && !j.lastInboundPreview?.startsWith("[Otomatik"))
      )
      .sort(sortFn);

    const followup = all.filter((j) => Boolean(j.followUpSentAt)).sort(sortFn);

    const opportunities = all
      .filter((j) => ["discovered", "pending_approval", "approved"].includes(j.status))
      .sort((a, b) => Number(b.matchScore) - Number(a.matchScore));

    const closed = all
      .filter((j) => j.status === "rejected" || j.status === "archived")
      .sort(sortFn);

    return { applied, replied, followup, opportunities, closed };
  }, [data]);

  const visibleJobs = useMemo(() => {
    if (jobFilter === "replied") return jobBuckets.replied;
    if (jobFilter === "followup") return jobBuckets.followup;
    if (jobFilter === "opportunities") return jobBuckets.opportunities;
    if (jobFilter === "closed") return jobBuckets.closed;
    return jobBuckets.applied;
  }, [jobFilter, jobBuckets]);

  const platformBreakdown = useMemo(() => {
    const defs: Array<{
      platform: CommentPlatform;
      label: string;
      brandGroup: "blog" | "bocek";
      handle: string;
      url: string;
    }> = [
      { platform: "instagram", label: "Instagram", brandGroup: "bocek", handle: "@kursatsi", url: "https://www.instagram.com/kursatsi/" },
      { platform: "tiktok", label: "TikTok", brandGroup: "bocek", handle: "@kursat.yz", url: "https://www.tiktok.com/@kursat.yz" },
      { platform: "youtube", label: "YouTube", brandGroup: "bocek", handle: "@kursatsi", url: "https://studio.youtube.com/" },
      { platform: "x", label: "X", brandGroup: "bocek", handle: "@kursatsi / @DevKursat", url: "https://x.com/kursatsi" },
      { platform: "facebook", label: "Facebook", brandGroup: "bocek", handle: "@kursatsi", url: "https://www.facebook.com/kursatsi" },
      { platform: "kursat_blog", label: "Kürşat Blog", brandGroup: "blog", handle: "kursat.itibar.app", url: "https://kursat.itibar.app/blog" },
      { platform: "devto", label: "DEV.to", brandGroup: "blog", handle: "@kursatyz", url: "https://dev.to/kursatyz" },
      { platform: "linkedin", label: "LinkedIn", brandGroup: "blog", handle: "Kürşat Yılmaz", url: "https://www.linkedin.com/in/kursatyilmaz/" },
      { platform: "hashnode", label: "Hashnode", brandGroup: "blog", handle: "@kursatyz", url: "https://hashnode.com/" },
    ];

    const comments = data?.store.comments || [];
    const serverStats = data?.store.summary.platformStats || [];

    return defs.map((d) => {
      const platComments = comments.filter((c) => c.platform === d.platform);
      const pending = platComments.filter((c) => c.status === "pending").length;
      const sent = platComments.filter((c) => c.status === "sent").length;
      const approved = platComments.filter((c) => c.status === "approved").length;
      const stat = serverStats.find((s) => s.platform === d.platform);
      const devtoExtraComments =
        d.platform === "devto" ? data?.telemetry.summary.devtoTotalComments ?? 0 : 0;

      return {
        ...d,
        views: stat?.views ?? 0,
        totalComments: Math.max(stat?.comments ?? 0, platComments.length, devtoExtraComments),
        pending,
        approved,
        sent,
        lastActivityAt: stat?.lastActivityAt || platComments[0]?.createdAt || null,
      };
    });
  }, [data]);

  const filteredComments = useMemo(() => {
    return (data?.store.comments || []).filter((c) => {
      if (brandFilter !== "all" && c.brandGroup !== brandFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (platformFilter !== "all" && c.platform !== platformFilter) return false;
      return true;
    });
  }, [data, brandFilter, statusFilter, platformFilter]);

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-[#08090c] text-zinc-100 flex items-center justify-center">
        <div className="text-sm text-zinc-400 animate-pulse">Kasa kontrol ediliyor...</div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#08090c] text-zinc-100 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl space-y-5"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">Özel Operasyon Kasası</h1>
              <p className="text-xs text-zinc-400">kursat.itibar.app // Gizli Alan</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="vault-pin" className="text-xs text-zinc-400 block">
              Erişim Şifresi
            </label>
            <input
              id="vault-pin"
              type="password"
              inputMode="numeric"
              autoFocus
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm tracking-widest text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none"
            />
          </div>

          {authError && (
            <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={authLoading || !pinInput.trim()}
            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-semibold text-sm py-2.5 transition"
          >
            {authLoading ? "Doğrulanıyor..." : "Kasayı Aç"}
          </button>
        </form>
      </main>
    );
  }

  const summary = data?.store.summary;
  const freelancePlatforms = (summary?.platforms || []).filter(
    (p) => p.category === "freelance" || p.category === "inbox" || p.id === "linkedin"
  );
  const bocekPlatforms = (summary?.platforms || []).filter((p) => p.category === "bocek");

  return (
    <main className="min-h-screen bg-[#08090c] text-zinc-100 pb-16">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-500/30 bg-zinc-900/95 px-4 py-2.5 text-xs font-medium text-emerald-300 shadow-xl">
          {toast}
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#08090c]/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold">Kürşat Ops Kasası</h1>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-medium border border-zinc-700 bg-zinc-900 text-zinc-300">
                  {data?.store.storageMode === "firestore" ? "Firebase Canlı" : "Yerel Depo"}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Otonom Başvuru & Zoho Mail Yanıt Takibi · Sıfır Onay Bürokrasisi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Yenile
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-rose-950/50 hover:border-rose-500/30 px-3 py-1.5 text-xs text-zinc-300 hover:text-rose-300 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Kilitle
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto max-w-6xl px-4 flex gap-1 overflow-x-auto">
          {[
            {
              id: "freelance" as TabId,
              label: `1. Başvurular & Yanıt Takibi (${jobBuckets.applied.length})`,
              icon: Briefcase,
            },
            {
              id: "mail" as TabId,
              label: `2. kursat@itibar.app Mail Akışı (${data?.store.emails.length || 0})`,
              icon: Mail,
            },
            {
              id: "comments" as TabId,
              label: `3. Blog & Böcek Etkileşim (${summary?.contentStats.pendingReplies || 0})`,
              icon: MessageSquare,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition ${
                  active
                    ? "border-emerald-400 text-emerald-300"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-6 space-y-6">
        {/* TAB 1: AUTONOMOUS APPLICATIONS & REPLY TRACKER */}
        {activeTab === "freelance" && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                {
                  label: "Gönderilen Başvuru",
                  value: summary?.freelanceStats.totalApplied ?? jobBuckets.applied.length,
                  sub: "Otonom Zoho Mail + Form",
                },
                {
                  label: "Follow-Up Giden",
                  value: jobBuckets.followup.length,
                  sub: "3. gün otomatik takip",
                },
                {
                  label: "Yanıt Gelen / Görüşme",
                  value: jobBuckets.replied.length,
                  accent: jobBuckets.replied.length > 0 ? "text-emerald-400" : "text-zinc-100",
                  sub: "Gerçek işveren dönüşü",
                },
                {
                  label: "Teklif / Kazanılan",
                  value:
                    (summary?.freelanceStats.incomingOffers ?? 0) +
                    (summary?.freelanceStats.wonCount ?? 0),
                  accent: "text-emerald-400",
                  sub: "Kazanılınca tarama durur",
                },
                {
                  label: "Son Tarama & Mail Sync",
                  value: formatShortDate(summary?.freelanceStats.lastScanAt),
                  sub: `Zoho: ${formatShortDate(summary?.mailStats?.lastCheckAt)}`,
                },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4"
                >
                  <p className="text-[11px] text-zinc-400">{kpi.label}</p>
                  <p className={`mt-1 text-lg font-semibold ${kpi.accent || "text-zinc-100"}`}>
                    {kpi.value}
                  </p>
                  <p className="mt-0.5 text-[10px] text-zinc-500">{kpi.sub}</p>
                </div>
              ))}
            </div>

            {/* Filter Bar + Manual Add */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {[
                  {
                    id: "applied" as JobFilterId,
                    label: `Gönderilen & Süreçtekiler (${jobBuckets.applied.length})`,
                  },
                  {
                    id: "replied" as JobFilterId,
                    label: `Yanıt Gelenler (${jobBuckets.replied.length})`,
                  },
                  {
                    id: "followup" as JobFilterId,
                    label: `Follow-Up Gidenler (${jobBuckets.followup.length})`,
                  },
                  {
                    id: "opportunities" as JobFilterId,
                    label: `Form / Pazar Yeri Linkleri (${jobBuckets.opportunities.length})`,
                  },
                  {
                    id: "closed" as JobFilterId,
                    label: `Olumsuz / Arşiv (${jobBuckets.closed.length})`,
                  },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setJobFilter(f.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                      jobFilter === f.id
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddJob((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-medium text-xs px-3 py-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Manuel Başvuru Kaydet
              </button>
            </div>

            {/* Manual Add Job Form */}
            {showAddJob && (
              <form
                onSubmit={handleAddJob}
                className="rounded-xl border border-emerald-500/30 bg-zinc-950 p-4 space-y-3"
              >
                <h3 className="text-xs font-semibold text-emerald-300">
                  Dışarıdan Yaptığın Başvuruyu Takibe Ekle
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <select
                    value={newJob.platform}
                    onChange={(e) =>
                      setNewJob((s) => ({ ...s, platform: e.target.value as JobPlatform }))
                    }
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                  >
                    {Object.entries(PLATFORM_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Pozisyon / Proje Başlığı"
                    value={newJob.title}
                    onChange={(e) => setNewJob((s) => ({ ...s, title: e.target.value }))}
                    className="sm:col-span-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Bütçe / Maaş (örn. $4,000/mo)"
                    value={newJob.budget}
                    onChange={(e) => setNewJob((s) => ({ ...s, budget: e.target.value }))}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Şirket / Müşteri Adı"
                    value={newJob.clientName}
                    onChange={(e) => setNewJob((s) => ({ ...s, clientName: e.target.value }))}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                  />
                  <input
                    type="url"
                    placeholder="İlan / Başvuru URL"
                    value={newJob.url}
                    onChange={(e) => setNewJob((s) => ({ ...s, url: e.target.value }))}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Gönderilen mesaj / not..."
                  value={newJob.proposalDraft}
                  onChange={(e) => setNewJob((s) => ({ ...s, proposalDraft: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddJob(false)}
                    className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-zinc-950"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            )}

            {/* Application & Thread Cards */}
            <section className="space-y-3">
              {!visibleJobs.length ? (
                <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-400">
                  Bu filtrede kayıt yok. Arka plan servisi yeni başvurular gönderdiğinde veya Zoho
                  Mail üzerinden işveren yanıtı geldiğinde otomatik olarak burada güncellenir.
                </div>
              ) : (
                <div className="space-y-3">
                  {visibleJobs.map((job: OpsJobItem) => {
                    const badge = getStatusBadgeStyle(job);
                    const events = buildDisplayEvents(job);
                    const recipientEmail = job.contactEmail || extractFallbackEmail(job.notes);
                    const sentIso = job.sentAt || job.createdAt;
                    const plannedFollowUpIso =
                      job.status === "sent" && !job.followUpSentAt && recipientIsoValid(sentIso)
                        ? new Date(Date.parse(sentIso) + 3 * 24 * 60 * 60 * 1000).toISOString()
                        : null;

                    return (
                      <div
                        key={job.id}
                        className={`rounded-xl border bg-zinc-950 p-4 space-y-3 ${
                          job.status === "interview" ||
                          job.status === "replied" ||
                          job.status === "offer_received"
                            ? "border-emerald-500/40 ring-1 ring-emerald-500/20"
                            : "border-zinc-800/80"
                        }`}
                      >
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${badge.cls}`}
                              >
                                {badge.label}
                              </span>
                              <span className="rounded-md bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-[10px] font-semibold uppercase text-zinc-300">
                                {PLATFORM_LABELS[job.platform] || job.platform}
                              </span>
                              {job.channel && (
                                <span className="rounded-md bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">
                                  {CHANNEL_LABELS[job.channel] || job.channel}
                                </span>
                              )}
                              {job.budget && (
                                <span className="text-xs font-semibold text-emerald-300">
                                  {job.budget}
                                </span>
                              )}
                            </div>

                            <h3 className="text-sm font-semibold text-zinc-100">
                              {job.clientName} — <span className="font-normal text-zinc-200">{job.title}</span>
                            </h3>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-400">
                              {recipientEmail && (
                                <span className="inline-flex items-center gap-1 text-zinc-300">
                                  <Mail className="w-3 h-3 text-emerald-400" />
                                  {recipientEmail}
                                </span>
                              )}
                              <span>Gönderim: {formatShortDate(sentIso)}</span>
                              {plannedFollowUpIso && recipientEmail && (
                                <span className="inline-flex items-center gap-1 text-zinc-500">
                                  <Clock className="w-3 h-3" />
                                  Oto Follow-Up: {formatShortDate(plannedFollowUpIso)}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={job.status}
                              disabled={actionBusyId === job.id}
                              onChange={(e) =>
                                runAction(
                                  job.id,
                                  { action: "update_job_status", id: job.id, status: e.target.value },
                                  "Durum güncellendi."
                                )
                              }
                              className="rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-200"
                            >
                              {Object.entries(JOB_STATUS_LABELS).map(([k, v]) => (
                                <option key={k} value={k}>
                                  {v}
                                </option>
                              ))}
                            </select>
                            {job.url && (
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800"
                              >
                                İlan <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Thread / Process Timeline */}
                        {events.length > 0 && (
                          <div className="rounded-lg border border-zinc-800/90 bg-zinc-900/50 p-3 space-y-2">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                              Süreç & Mail Geçmişi ({events.length})
                            </p>
                            <div className="space-y-2">
                              {events.map((ev, idx) => {
                                const isInbound = ev.direction === "inbound";
                                const isAck = ev.direction === "auto_ack";
                                const isFollowUp = ev.direction === "followup";
                                return (
                                  <div
                                    key={ev.id || `${job.id}_ev_${idx}`}
                                    className={`rounded-md border px-3 py-2 text-xs ${
                                      isInbound
                                        ? "border-emerald-500/40 bg-emerald-500/10 text-zinc-100"
                                        : isAck
                                          ? "border-zinc-700/80 bg-zinc-900/90 text-zinc-300"
                                          : isFollowUp
                                            ? "border-violet-500/30 bg-violet-500/10 text-zinc-200"
                                            : "border-zinc-800 bg-zinc-950/70 text-zinc-300"
                                    }`}
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                                      <span className="font-semibold flex items-center gap-1.5">
                                        {isInbound ? (
                                          <>
                                            <Inbox className="w-3.5 h-3.5 text-emerald-400" />
                                            İşveren Yanıtı {ev.from ? `(${ev.from})` : ""}
                                          </>
                                        ) : isAck ? (
                                          <>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                            Otomatik Başvuru Alındı Teyidi
                                          </>
                                        ) : isFollowUp ? (
                                          <>
                                            <Reply className="w-3.5 h-3.5 text-violet-300" />
                                            3. Gün Takip Maili Gönderildi
                                          </>
                                        ) : (
                                          <>
                                            <Send className="w-3.5 h-3.5 text-sky-400" />
                                            İlk Başvuru Gönderildi
                                          </>
                                        )}
                                      </span>
                                      <span className="text-zinc-500">{formatShortDate(ev.ts)}</span>
                                    </div>
                                    {ev.subject && (
                                      <p className="mt-1 text-[11px] text-zinc-400">
                                        Konu: {ev.subject}
                                      </p>
                                    )}
                                    <p className="mt-1 leading-relaxed text-xs whitespace-pre-line">
                                      {ev.snippet}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Collapsible Proposal / Sent Email Body */}
                        {job.proposalDraft && (
                          <details className="group rounded-lg border border-zinc-800/70 bg-zinc-900/30 px-3 py-2">
                            <summary className="cursor-pointer text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 select-none">
                              Gönderilen Başvuru / Pitch Metnini Göster
                            </summary>
                            <pre className="mt-2 whitespace-pre-wrap font-sans text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/70 pt-2">
                              {job.proposalDraft}
                            </pre>
                          </details>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Quick-Launch Account Cards (Moved cleanly below active pipeline) */}
            <details className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
              <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-zinc-400 select-none">
                Platform Hesapları & Hızlı Bağlantılar ({freelancePlatforms.length})
              </summary>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {freelancePlatforms.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 flex flex-col justify-between gap-2.5"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-zinc-100">{p.name}</span>
                        <span className="text-[11px] text-zinc-400">{p.handle}</span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{p.statusNote}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={p.dashboardUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-2.5 py-1 text-[11px] font-medium text-zinc-200 transition"
                      >
                        Panele Git <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}

        {/* TAB 2: MAIL SUMMARY */}
        {activeTab === "mail" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                <p className="text-[11px] text-zinc-400">İş & B2B Mail Kaydı</p>
                <p className="mt-1 text-xl font-semibold text-zinc-100">
                  {data?.store.emails.length ?? 0}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                <p className="text-[11px] text-zinc-400">Yüksek Öncelikli</p>
                <p className="mt-1 text-xl font-semibold text-amber-400">
                  {summary?.mailStats?.highPriorityCount ?? 0}
                </p>
              </div>
              <div className="col-span-2 rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-zinc-200">
                    kursat@itibar.app (Otonom Zoho EU Sync)
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Bülten ve spam elenir; yalnızca başvuru yanıtları ve iş teklifleri düşer.
                  </p>
                </div>
                <a
                  href="https://mail.zoho.eu/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200"
                >
                  Zoho Mail Aç <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {!(data?.store.emails || []).length ? (
              <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-400">
                Henüz işveren yanıtı veya B2B teklif maili yok. Zoho Mail arka plan taraması
                çalıştıkça ilgili kayıtlar burada görünür.
              </div>
            ) : (
              <div className="space-y-3">
                {(data?.store.emails || []).map((m: OpsEmailItem) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase border ${
                            m.priority === "high"
                              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                              : "bg-zinc-900 border-zinc-700 text-zinc-300"
                          }`}
                        >
                          {m.priority === "high" ? "İşveren Yanıtı" : m.category}
                        </span>
                        <span className="text-xs font-semibold text-zinc-200">{m.from}</span>
                      </div>
                      <span className="text-[11px] text-zinc-500">
                        {formatShortDate(m.receivedAt)}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-100">{m.subject}</h3>
                      <p className="mt-1 text-xs text-zinc-300 leading-relaxed">{m.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMMENTS & ENGAGEMENT */}
        {activeTab === "comments" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "Blog Toplam Okunma", value: summary?.contentStats.blogViews ?? 0 },
                { label: "Blog Toplam Yorum", value: summary?.contentStats.blogComments ?? 0 },
                { label: "Böcek Toplam İzlenme", value: summary?.contentStats.bocekViews ?? 0 },
                { label: "Böcek Toplam Yorum", value: summary?.contentStats.bocekComments ?? 0 },
                {
                  label: "Onay Bekleyen Cevap",
                  value: summary?.contentStats.pendingReplies ?? 0,
                  accent: "text-amber-400",
                },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4"
                >
                  <p className="text-[11px] text-zinc-400">{kpi.label}</p>
                  <p className={`mt-1 text-xl font-semibold ${kpi.accent || "text-zinc-100"}`}>
                    {kpi.value.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-zinc-400 mr-1">Böcek Hesapları:</span>
              {bocekPlatforms.map((p) => (
                <a
                  key={p.id}
                  href={p.dashboardUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-300"
                >
                  {p.name} <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              ))}
            </div>

            {(data?.store.suggestions || []).filter((s) => s.status === "pending").length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Blog & Böcek Önerileri (Seçim Bekleyenler)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(data?.store.suggestions || [])
                    .filter((s) => s.status === "pending")
                    .map((sug: OpsSuggestionItem) => {
                      const chosenImg =
                        selectedImages[sug.id] ||
                        sug.selectedImageUrl ||
                        sug.imageCandidates?.[0] ||
                        "";
                      const noteVal = draftEdits[`sug_${sug.id}`] ?? sug.userNote ?? "";
                      return (
                        <div
                          key={sug.id}
                          className="rounded-xl border border-emerald-500/25 bg-zinc-950 p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase border ${
                                sug.brandGroup === "bocek"
                                  ? "bg-pink-500/10 border-pink-500/30 text-pink-300"
                                  : "bg-sky-500/10 border-sky-500/30 text-sky-300"
                              }`}
                            >
                              {sug.brandGroup === "bocek" ? "Böcek Senaryosu" : "Blog Konusu"}
                            </span>
                            {sug.vseScore !== undefined && (
                              <span className="text-[11px] font-semibold text-emerald-300">
                                VSE: {sug.vseScore}/100
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-zinc-100">{sug.title}</h3>
                            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                              {sug.summary}
                            </p>
                          </div>

                          {sug.imageCandidates && sug.imageCandidates.length > 0 && (
                            <div className="space-y-1.5">
                              <p className="text-[11px] text-zinc-400">Kapak Görseli Seç:</p>
                              <div className="flex gap-2 overflow-x-auto pb-1">
                                {sug.imageCandidates.map((imgUrl, idx) => (
                                  <button
                                    key={imgUrl}
                                    type="button"
                                    onClick={() =>
                                      setSelectedImages((prev) => ({ ...prev, [sug.id]: imgUrl }))
                                    }
                                    className={`shrink-0 rounded-lg border overflow-hidden transition ${
                                      chosenImg === imgUrl
                                        ? "border-emerald-400 ring-2 ring-emerald-400/30"
                                        : "border-zinc-800 opacity-70 hover:opacity-100"
                                    }`}
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={imgUrl}
                                      alt={`Aday ${idx + 1}`}
                                      className="h-14 w-20 object-cover"
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <input
                            type="text"
                            placeholder="Opsiyonel notun..."
                            value={noteVal}
                            onChange={(e) =>
                              setDraftEdits((prev) => ({
                                ...prev,
                                [`sug_${sug.id}`]: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200"
                          />

                          <div className="flex justify-end gap-2">
                            <button
                              disabled={actionBusyId === sug.id}
                              onClick={() =>
                                runAction(
                                  sug.id,
                                  { action: "reject_suggestion", id: sug.id },
                                  "Öneri geçildi."
                                )
                              }
                              className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400"
                            >
                              Geç
                            </button>
                            <button
                              disabled={actionBusyId === sug.id}
                              onClick={() =>
                                runAction(
                                  sug.id,
                                  {
                                    action: "select_suggestion",
                                    id: sug.id,
                                    selectedImageUrl: chosenImg,
                                    userNote: noteVal,
                                  },
                                  "Öneri seçildi ve üretim kuyruğuna alındı."
                                )
                              }
                              className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs px-3.5 py-1.5 transition"
                            >
                              Bunu Seç & Üretime Al
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
              <span>
                Otonom Yorum & Metrik Hasadı: <strong className="text-zinc-200">3 saatte bir</strong>
              </span>
              <div className="flex items-center gap-3">
                <span>
                  Son Senkron:{" "}
                  {summary?.contentStats.lastSyncAt
                    ? new Date(summary.contentStats.lastSyncAt).toLocaleString("tr-TR")
                    : "Henüz sync yok"}
                </span>
                <button
                  disabled={actionBusyId === "request_suggestions"}
                  onClick={() =>
                    runAction(
                      "request_suggestions",
                      { action: "request_suggestions" },
                      "Yeni Blog & Böcek önerisi isteği kuyruğa alındı."
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition"
                >
                  <Sparkles className="w-3 h-3" />
                  Yeni Öneri İste
                </button>
              </div>
            </div>

            <section className="space-y-2.5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {platformBreakdown
                  .filter((p) => brandFilter === "all" || p.brandGroup === brandFilter)
                  .map((p) => {
                    const selected = platformFilter === p.platform;
                    return (
                      <button
                        key={p.platform}
                        type="button"
                        onClick={() =>
                          setPlatformFilter((prev) => (prev === p.platform ? "all" : p.platform))
                        }
                        className={`text-left rounded-xl border p-3 transition ${
                          selected
                            ? "border-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-400/30"
                            : "border-zinc-800/80 bg-zinc-950 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold text-zinc-100">{p.label}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase ${
                              p.brandGroup === "bocek"
                                ? "bg-pink-500/15 text-pink-300"
                                : "bg-sky-500/15 text-sky-300"
                            }`}
                          >
                            {p.brandGroup === "bocek" ? "Böcek" : "Blog"}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[10px] text-zinc-500 truncate">{p.handle}</p>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="text-zinc-300">{p.totalComments} yorum</span>
                          {p.pending > 0 ? (
                            <span className="text-amber-400 font-semibold">
                              {p.pending} bekliyor
                            </span>
                          ) : (
                            <span className="text-zinc-500">{p.sent} yanıt</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "Tüm Markalar" },
                  { id: "blog", label: "Blog & Teknik" },
                  { id: "bocek", label: "Böcek (@kursatsi)" },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setBrandFilter(b.id as typeof brandFilter);
                      setPlatformFilter("all");
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                      brandFilter === b.id
                        ? "border-sky-500/40 bg-sky-500/10 text-sky-300"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "pending", label: "Onay Bekleyenler" },
                  { id: "approved", label: "Kuyruktakiler" },
                  { id: "sent", label: "Gönderilenler" },
                  { id: "all", label: "Tüm Durumlar" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStatusFilter(s.id as typeof statusFilter)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                      statusFilter === s.id
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {!filteredComments.length ? (
              <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-400">
                Bu filtrede bekleyen yorum yok.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredComments.map((c: OpsCommentItem) => {
                  const replyText = draftEdits[c.id] ?? c.replyDraft;
                  return (
                    <div
                      key={c.id}
                      className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase border ${
                              c.brandGroup === "bocek"
                                ? "bg-pink-500/10 border-pink-500/30 text-pink-300"
                                : "bg-sky-500/10 border-sky-500/30 text-sky-300"
                            }`}
                          >
                            {c.brandGroup === "bocek" ? "Böcek Personası" : "Kürşat Teknik"}
                          </span>
                          <span className="text-xs font-medium text-zinc-200">
                            {c.platform.toUpperCase()} ({c.accountHandle})
                          </span>
                          <span className="text-[11px] text-zinc-500">· {c.status}</span>
                        </div>
                        {c.contentUrl && (
                          <a
                            href={c.contentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200"
                          >
                            {c.contentTitle || "İçeriğe Git"} <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="rounded-lg bg-zinc-900/70 border border-zinc-800 p-3">
                        <p className="text-[11px] font-semibold text-zinc-400">@{c.authorName}</p>
                        <p className="mt-1 text-xs text-zinc-200">{c.commentText}</p>
                      </div>

                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={replyText}
                          onChange={(e) =>
                            setDraftEdits((prev) => ({ ...prev, [c.id]: e.target.value }))
                          }
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-100 focus:border-emerald-500/50 focus:outline-none"
                        />
                        {c.status === "pending" && (
                          <div className="flex justify-end gap-2">
                            <button
                              disabled={actionBusyId === c.id}
                              onClick={() =>
                                runAction(
                                  c.id,
                                  { action: "skip_comment", id: c.id },
                                  "Yorum atlandı."
                                )
                              }
                              className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Atla
                            </button>
                            <button
                              disabled={actionBusyId === c.id}
                              onClick={() =>
                                runAction(
                                  c.id,
                                  { action: "approve_comment", id: c.id, replyDraft: replyText },
                                  "Cevap onaylandı."
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs px-3.5 py-1.5 transition"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Onayla & Gönder
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function recipientIsoValid(iso?: string): boolean {
  if (!iso) return false;
  return Number.isFinite(Date.parse(iso));
}
