"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Briefcase,
  CheckCircle2,
  Database,
  ExternalLink,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Radio,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import type {
  JobPlatform,
  JobStatus,
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

type TabId = "freelance" | "comments" | "mail" | "radar" | "system";

const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  discovered: "Keşfedildi",
  pending_approval: "Onay Bekliyor",
  approved: "Onaylandı (Gönderilecek)",
  sent: "Gönderildi",
  interview: "Görüşmede",
  offer_received: "Teklif Geldi",
  won: "Kazanıldı",
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

export default function VaultDashboardClient() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<TabId>("freelance");
  const [data, setData] = useState<UnifiedPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [commentFilter, setCommentFilter] = useState<"pending" | "blog" | "bocek" | "all">("pending");
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
      "Yeni iş fırsatı eklendi."
    );
    setNewJob({
      platform: "direct",
      title: "",
      clientName: "",
      budget: "$1,500",
      currency: "USD",
      url: "",
      proposalDraft: "",
    });
    setShowAddJob(false);
  };

  const filteredComments = useMemo(() => {
    const list = data?.store.comments || [];
    if (commentFilter === "pending") return list.filter((c) => c.status === "pending");
    if (commentFilter === "blog") return list.filter((c) => c.brandGroup === "blog");
    if (commentFilter === "bocek") return list.filter((c) => c.brandGroup === "bocek");
    return list;
  }, [data, commentFilter]);

  const combinedRadar = useMemo(() => {
    const storeRadar = data?.store.radarActions || [];
    const logRadar = (data?.telemetry.radarLogs || []).map((r, i) => ({
      id: `log-${i}-${r.ts}`,
      ts: r.ts,
      platform: r.platform as "x" | "devto",
      target: r.target,
      title: r.title,
      url: r.url,
      replyPreview: r.replyPreview,
      engagementStatus: "log",
    }));
    const merged = [...storeRadar];
    for (const item of logRadar) {
      if (!merged.some((m) => m.url === item.url && m.ts === item.ts)) {
        merged.push(item);
      }
    }
    return merged.sort((a, b) => b.ts.localeCompare(a.ts));
  }, [data]);

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
                Freelance Otonomi + Blog & Böcek Etkileşim Merkezi
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
            { id: "freelance" as TabId, label: "1. Freelance & İşler", icon: Briefcase },
            {
              id: "comments" as TabId,
              label: `2. Yorum & Onay (${summary?.contentStats.pendingReplies || 0})`,
              icon: MessageSquare,
            },
            {
              id: "mail" as TabId,
              label: `3. Mail Özeti (${summary?.mailStats?.unreadCount || 0})`,
              icon: Mail,
            },
            { id: "radar" as TabId, label: "4. Günlük Radar", icon: Radio },
            { id: "system" as TabId, label: "5. Sistem & Telemetri", icon: Activity },
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
        {/* TAB 1: FREELANCE */}
        {activeTab === "freelance" && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "Yapılan Başvuru", value: summary?.freelanceStats.totalApplied ?? 0 },
                { label: "Aktif Görüşme", value: summary?.freelanceStats.activeInterviews ?? 0 },
                {
                  label: "Gelen İş Teklifi",
                  value: summary?.freelanceStats.incomingOffers ?? 0,
                  accent: "text-emerald-400",
                },
                { label: "Kazanılan İş", value: summary?.freelanceStats.wonCount ?? 0 },
                {
                  label: "Pipeline Değeri",
                  value: `$${(summary?.freelanceStats.pipelineUsd ?? 0).toLocaleString()}`,
                },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4"
                >
                  <p className="text-[11px] text-zinc-400">{kpi.label}</p>
                  <p className={`mt-1 text-xl font-semibold ${kpi.accent || "text-zinc-100"}`}>
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick-Launch Account Cards */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Hesaplara Hızlı Geçiş & Durumlar
                </h2>
                <button
                  onClick={() => setShowAddJob((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs px-3 py-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Yeni İş / Gerçek Hayat Fırsatı Ekle
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {freelancePlatforms.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-zinc-100">{p.name}</span>
                        <span className="text-[11px] text-zinc-400">{p.handle}</span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{p.statusNote}</p>
                      {p.alertBadge && (
                        <p className="mt-2 inline-block rounded-md bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 text-[11px] text-amber-300">
                          {p.alertBadge}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={p.dashboardUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 transition"
                      >
                        Panele Git <ExternalLink className="w-3 h-3" />
                      </a>
                      {p.profileUrl !== p.dashboardUrl && (
                        <a
                          href={p.profileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 text-[11px] text-zinc-400 transition"
                        >
                          Profil <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Add Job Form */}
            {showAddJob && (
              <form
                onSubmit={handleAddJob}
                className="rounded-xl border border-emerald-500/30 bg-zinc-950 p-4 space-y-3"
              >
                <h3 className="text-xs font-semibold text-emerald-300">
                  Manuel İş / Gerçek Hayat Fırsatı Kaydet
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
                    placeholder="İş / Proje Başlığı"
                    value={newJob.title}
                    onChange={(e) => setNewJob((s) => ({ ...s, title: e.target.value }))}
                    className="sm:col-span-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Bütçe (örn. $2,500)"
                    value={newJob.budget}
                    onChange={(e) => setNewJob((s) => ({ ...s, budget: e.target.value }))}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Müşteri / Şirket"
                    value={newJob.clientName}
                    onChange={(e) => setNewJob((s) => ({ ...s, clientName: e.target.value }))}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                  />
                  <input
                    type="url"
                    placeholder="İlan / Konuşma URL"
                    value={newJob.url}
                    onChange={(e) => setNewJob((s) => ({ ...s, url: e.target.value }))}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Teklif taslağı / notlar..."
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

            {/* Jobs & Proposals Pipeline */}
            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Otonom Taranan İşler & Başvuru Kuyruğu ({data?.store.jobs.length ?? 0})
              </h2>

              {!data?.store.jobs.length ? (
                <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-400">
                  Henüz iş kaydı yok. Antigravity + EgoBrowser taraması çalıştığında veya manuel
                  fırsat eklediğinde tüm başvurular ve gelen iş teklifleri burada görünecek.
                </div>
              ) : (
                <div className="space-y-3">
                  {data.store.jobs.map((job: OpsJobItem) => {
                    const draft = draftEdits[job.id] ?? job.proposalDraft;
                    return (
                      <div
                        key={job.id}
                        className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="rounded-md bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-[10px] font-semibold uppercase text-zinc-300">
                                {PLATFORM_LABELS[job.platform] || job.platform}
                              </span>
                              <span className="rounded-md bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                                Skor: {job.matchScore}/100
                              </span>
                              <span className="text-xs font-semibold text-zinc-200">
                                {job.budget}
                              </span>
                            </div>
                            <h3 className="mt-1.5 text-sm font-semibold text-zinc-100">
                              {job.title}
                            </h3>
                            <p className="text-xs text-zinc-400">{job.clientName}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={job.status}
                              disabled={actionBusyId === job.id}
                              onChange={(e) =>
                                runAction(
                                  job.id,
                                  { action: "update_job_status", id: job.id, status: e.target.value },
                                  "İş durumu güncellendi."
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

                        {draft !== undefined && (
                          <div className="space-y-2">
                            <textarea
                              rows={3}
                              value={draft}
                              onChange={(e) =>
                                setDraftEdits((prev) => ({ ...prev, [job.id]: e.target.value }))
                              }
                              placeholder="Teklif metni..."
                              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-200 focus:border-emerald-500/50 focus:outline-none"
                            />
                            {(job.status === "discovered" || job.status === "pending_approval") && (
                              <div className="flex justify-end">
                                <button
                                  disabled={actionBusyId === job.id}
                                  onClick={() =>
                                    runAction(
                                      job.id,
                                      { action: "approve_job", id: job.id, proposalDraft: draft },
                                      "Teklif onaylandı ve EgoBrowser gönderim kuyruğuna alındı."
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs px-3 py-1.5 transition"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                  Onayla & Gönder Kuyruğuna Al
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 2: COMMENTS & ENGAGEMENT */}
        {activeTab === "comments" && (
          <div className="space-y-6">
            {/* Content KPIs */}
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

            {/* Bocek Quick Links */}
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

            {/* Blog & Bocek Topic/Scenario Suggestions */}
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
                            placeholder="Opsiyonel notun (ör. 2'yi yapalım, sonuna şu detayı ekle)..."
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

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "pending", label: "Onay Bekleyenler" },
                { id: "blog", label: "Blog & Teknik" },
                { id: "bocek", label: "Böcek (@kursatsi)" },
                { id: "all", label: "Tümü" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCommentFilter(f.id as typeof commentFilter)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                    commentFilter === f.id
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Comment Cards */}
            {!filteredComments.length ? (
              <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-400">
                Bu filtrede bekleyen yorum yok. EgoBrowser blog ve böcek sayfalarından yorum
                çektiğinde tarzına uygun taslaklar burada onayını bekleyecek.
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
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                          <Sparkles className="w-3.5 h-3.5" />
                          Tarzına Uygun Hazırlanan Cevap Taslağı
                        </div>
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
                                  "Cevap onaylandı ve gönderim kuyruğuna alındı."
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

        {/* TAB 3: MAIL SUMMARY */}
        {activeTab === "mail" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                <p className="text-[11px] text-zinc-400">Okunmamış / Özetlenen</p>
                <p className="mt-1 text-xl font-semibold text-zinc-100">
                  {summary?.mailStats?.unreadCount ?? 0}
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
                  <p className="text-xs font-semibold text-zinc-200">Gelen Kutuları</p>
                  <p className="text-[11px] text-zinc-400">
                    kursat@itibar.app (Zoho EU) · tckursat@icloud.com
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
                Henüz özetlenen mail yok. Otonom mail özetleyici çalıştığında gelen mailler
                kategorize edilip cevap taslağıyla burada listelenecek.
              </div>
            ) : (
              <div className="space-y-3">
                {(data?.store.emails || []).map((m: OpsEmailItem) => {
                  const replyText = draftEdits[m.id] ?? m.replyDraft;
                  return (
                    <div
                      key={m.id}
                      className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase border ${
                              m.priority === "high"
                                ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                                : "bg-zinc-900 border-zinc-700 text-zinc-300"
                            }`}
                          >
                            {m.priority === "high" ? "Acil / Önemli" : m.category}
                          </span>
                          <span className="text-xs font-semibold text-zinc-200">{m.from}</span>
                          <span className="text-[11px] text-zinc-500">→ {m.account}</span>
                        </div>
                        <span className="text-[11px] text-zinc-500">
                          {new Date(m.receivedAt).toLocaleString("tr-TR")} · {m.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-zinc-100">{m.subject}</h3>
                        <p className="mt-1 text-xs text-zinc-300 leading-relaxed">{m.summary}</p>
                      </div>

                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={replyText}
                          onChange={(e) =>
                            setDraftEdits((prev) => ({ ...prev, [m.id]: e.target.value }))
                          }
                          placeholder="Yanıt taslağı..."
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-100 focus:border-emerald-500/50 focus:outline-none"
                        />
                        {m.status === "unread" && (
                          <div className="flex justify-end gap-2">
                            <button
                              disabled={actionBusyId === m.id}
                              onClick={() =>
                                runAction(
                                  m.id,
                                  { action: "archive_email", id: m.id },
                                  "Mail arşivlendi."
                                )
                              }
                              className="rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400"
                            >
                              Arşivle
                            </button>
                            <button
                              disabled={actionBusyId === m.id}
                              onClick={() =>
                                runAction(
                                  m.id,
                                  {
                                    action: "approve_email_reply",
                                    id: m.id,
                                    replyDraft: replyText,
                                  },
                                  "Mail yanıtı onaylandı ve gönderim kuyruğuna alındı."
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs px-3.5 py-1.5 transition"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Yanıtı Onayla & Gönder
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

        {/* TAB 4: RADAR */}
        {activeTab === "radar" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Gün İçi Radar Gönderimleri ({combinedRadar.length})
              </h2>
              <span className="text-xs text-zinc-400">
                Bugün: {data?.telemetry.summary.radarTodayCount ?? 0} aksiyon
              </span>
            </div>

            {!combinedRadar.length ? (
              <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-400">
                Henüz radar aksiyonu yok.
              </div>
            ) : (
              <div className="space-y-2.5">
                {combinedRadar.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-3.5 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-zinc-900 border border-zinc-700 px-1.5 py-0.5 text-[10px] uppercase font-semibold text-zinc-300">
                          {r.platform}
                        </span>
                        <span className="text-xs font-medium text-zinc-200">{r.target}</span>
                      </div>
                      <span className="text-[11px] text-zinc-500">
                        {new Date(r.ts).toLocaleString("tr-TR")}
                      </span>
                    </div>
                    {r.title && <p className="text-xs text-zinc-400">{r.title}</p>}
                    {r.replyPreview && (
                      <p className="text-xs text-zinc-300 bg-zinc-900/60 rounded-lg p-2 border border-zinc-800/80">
                        {r.replyPreview}
                      </p>
                    )}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline w-fit"
                    >
                      Gönderiye Git <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SYSTEM & TELEMETRY */}
        {activeTab === "system" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                  <Database className="w-4 h-4 text-emerald-400" />
                  Veritabanı Modu
                </div>
                <p className="mt-2 text-xs text-zinc-400">
                  {data?.store.storageMode === "firestore"
                    ? "Firebase Firestore (Spark Ücretsiz Plan) aktif."
                    : "Yerel JSON deposu aktif. Firebase Service Account env değişkenleri girildiğinde otomatik buluta geçer."}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                <p className="text-xs font-semibold text-zinc-200">Blog Kalite Denetimi</p>
                <p className="mt-2 text-lg font-semibold text-emerald-400">
                  {data?.telemetry.summary.blogQualityPassCount ?? 0} /{" "}
                  {data?.telemetry.summary.blogCount ?? 0} Geçti
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                <p className="text-xs font-semibold text-zinc-200">DEV.to Etkileşimi</p>
                <p className="mt-2 text-xs text-zinc-300">
                  {data?.telemetry.summary.devtoPublishedCount ?? 0} yazı ·{" "}
                  {data?.telemetry.summary.devtoTotalReactions ?? 0} reaksiyon ·{" "}
                  {data?.telemetry.summary.devtoTotalComments ?? 0} yorum
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-zinc-300">Son Blog Yazıları Kalite Durumu</h3>
                {data?.telemetry.mode === "local" && (
                  <button
                    disabled={actionBusyId === "sync_snapshot"}
                    onClick={() =>
                      runAction(
                        "sync_snapshot",
                        { action: "sync_snapshot" },
                        "Yerel snapshot senkronize edildi."
                      )
                    }
                    className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1 text-[11px] text-zinc-200 hover:bg-zinc-800"
                  >
                    Snapshot Senkronize Et
                  </button>
                )}
              </div>
              <div className="divide-y divide-zinc-800/70">
                {(data?.telemetry.blogAudit || []).slice(0, 8).map((b) => (
                  <div key={b.slug} className="py-2 flex items-center justify-between gap-3 text-xs">
                    <span className="text-zinc-200 truncate">{b.title}</span>
                    <span className="shrink-0 text-[11px] text-zinc-400">
                      {b.wordCountTr} kelime · {b.langCount} dil ·{" "}
                      {b.qualityPass ? "✅" : "⚠️"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
