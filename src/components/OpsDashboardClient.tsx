"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Database,
  ExternalLink,
  Lock,
  LogOut,
  Radio,
  RefreshCw,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface PerformanceRow {
  date: string;
  slug?: string;
  topic: string;
  platform: string;
  vse: number;
  publishTime: string;
  impressions: number | null;
  comments: number | null;
  notes?: string;
}

interface RadarLogEntry {
  ts: string;
  platform: "x" | "devto";
  target: string;
  title?: string;
  url: string;
  targetAgeMinutes?: number;
  replyPreview?: string;
}

interface DevtoArticle {
  id: number;
  title: string;
  url: string;
  published_at: string;
  public_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
  username: string;
}

interface BlogAuditRow {
  slug: string;
  title: string;
  category: string;
  isoDate: string;
  declaredReadTime: string;
  wordCountTr: number;
  paragraphCountTr: number;
  langCount: number;
  qualityPass: boolean;
  warnings: string[];
}

interface QueueItem {
  id: string;
  title: string;
  scheduledDate: string;
  scheduledWindow: string | null;
  status: string;
  publishedAt: string | null;
  publishedUrls: Record<string, string | null> | null;
}

interface OpsTelemetryPayload {
  generatedAt: string;
  mode: "local" | "cloud";
  snapshotSyncedAt: string;
  summary: {
    totalImpressions: number;
    totalCommentsPerf: number;
    avgImpressions: number;
    pendingBackfillCount: number;
    blogTotalPosts: number;
    blogLanguagesCount: number;
    blogQualityPassCount: number;
    devtoArticlesCount: number;
    devtoTotalReactions: number;
    devtoTotalComments: number;
    categoryCounts: Record<string, number>;
  };
  performanceLog: PerformanceRow[];
  radarState: {
    date?: string;
    repliesCountToday?: number;
    repliedTweetIds?: string[];
    repliedTargetsToday?: string[];
    devtoCommentsCountToday?: number;
    commentedArticleUrls?: string[];
  } | null;
  radarLog: RadarLogEntry[];
  devtoArticles: DevtoArticle[];
  blogAudit: BlogAuditRow[];
  latestPublish: QueueItem | null;
  queue: QueueItem[];
}

const STORAGE_KEY = "ky_ops_token";

function formatNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "—";
  return new Intl.NumberFormat("tr-TR").format(n);
}

export default function OpsDashboardClient() {
  const [token, setToken] = useState<string>("");
  const [tokenInput, setTokenInput] = useState<string>("");
  const [data, setData] = useState<OpsTelemetryPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"audit" | "devto" | "queue">("audit");

  // Backfill state for null performance rows
  const [backfillKey, setBackfillKey] = useState<string | null>(null);
  const [bfImpressions, setBfImpressions] = useState<string>("");
  const [bfComments, setBfComments] = useState<string>("");
  const [bfNotes, setBfNotes] = useState<string>("");
  const [actionBusy, setActionBusy] = useState<boolean>(false);

  const fetchTelemetry = useCallback(async (activeToken: string) => {
    if (!activeToken) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ops/telemetry", {
        headers: { "x-ops-token": activeToken },
        cache: "no-store",
      });
      if (res.status === 401) {
        sessionStorage.removeItem(STORAGE_KEY);
        setToken("");
        setData(null);
        setError("Yetkisiz erişim kodu. Tekrar deneyin.");
        return;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = (await res.json()) as OpsTelemetryPayload;
      setData(json);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Telemetri verisi alınamadı."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null;
    if (saved) {
      setToken(saved);
      void fetchTelemetry(saved);
    }
  }, [fetchTelemetry]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = tokenInput.trim();
    if (!cleaned) return;
    sessionStorage.setItem(STORAGE_KEY, cleaned);
    setToken(cleaned);
    await fetchTelemetry(cleaned);
  };

  const handleLock = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setTokenInput("");
    setData(null);
    setError("");
  };

  const handleSyncSnapshot = async () => {
    if (!token) return;
    setActionBusy(true);
    try {
      const res = await fetch("/api/ops/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-ops-token": token,
        },
        body: JSON.stringify({ action: "sync_snapshot" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Sync başarısız");
      await fetchTelemetry(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync hatası");
    } finally {
      setActionBusy(false);
    }
  };

  const handleBackfillSubmit = async (row: PerformanceRow) => {
    if (!token) return;
    setActionBusy(true);
    setError("");
    try {
      const res = await fetch("/api/ops/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-ops-token": token,
        },
        body: JSON.stringify({
          action: "backfill_metrics",
          date: row.date,
          topic: row.topic,
          impressions: Number(bfImpressions),
          comments: Number(bfComments),
          notes: bfNotes.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Güncelleme başarısız");
      setBackfillKey(null);
      setBfImpressions("");
      setBfComments("");
      setBfNotes("");
      await fetchTelemetry(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt güncellenemedi");
    } finally {
      setActionBusy(false);
    }
  };

  if (!token || !data) {
    return (
      <main className="min-h-screen bg-[#060608] text-zinc-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/12 bg-[#0b0b10] p-7 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
              MISSION CONTROL // OPS
            </span>
            <Lock className="w-4 h-4 text-zinc-500" />
          </div>

          <div className="space-y-1.5">
            <h1 className="font-archivo font-[800] text-2xl tracking-tight text-white">
              Kürşat Yılmaz Ops Kokpiti
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Platform etkileşim telemetrisi, VSE 2.0 doğruluk ölçümü ve otonom
              radar denetimi için erişim kodunu girin.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="OPS_ACCESS_TOKEN"
              autoFocus
              className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
            />
            {error && (
              <p className="text-xs font-mono text-rose-400">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white text-black font-semibold text-sm py-3 hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Doğrulanıyor..." : "Kokpite Gir"}
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <Link href="/blog" className="hover:text-zinc-300">
              ← Bloga Dön
            </Link>
            <span>noindex / private</span>
          </div>
        </div>
      </main>
    );
  }

  const xRepliesToday = data.radarState?.repliesCountToday ?? 0;
  const devtoCommentsToday = data.radarState?.devtoCommentsCountToday ?? 0;

  return (
    <main className="min-h-screen bg-[#060608] text-zinc-100 px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/15 bg-white/[0.04] font-mono text-[10px] uppercase tracking-widest text-zinc-300">
                <Terminal className="w-3 h-3 text-emerald-400" />
                KÜRSAT YILMAZ // MISSION CONTROL
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider border ${
                  data.mode === "local"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {data.mode === "local"
                  ? "LOCAL PIPELINE + LIVE API"
                  : "VERCEL LIVE API + SNAPSHOT"}
              </span>
            </div>
            <h1 className="font-archivo font-[800] text-2xl sm:text-3xl text-white tracking-tight">
              İçerik, Etkileşim &amp; Radar Telemetrisi
            </h1>
            <p className="text-xs font-mono text-zinc-500">
              Son okuma: {new Date(data.generatedAt).toLocaleString("tr-TR")} •
              Snapshot: {new Date(data.snapshotSyncedAt).toLocaleString("tr-TR")}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {data.mode === "local" && (
              <button
                type="button"
                onClick={handleSyncSnapshot}
                disabled={actionBusy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-mono text-emerald-300 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Database className="w-3.5 h-3.5" />
                Snapshot Senkronize Et
              </button>
            )}
            <button
              type="button"
              onClick={() => fetchTelemetry(token)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Yenile
            </button>
            <button
              type="button"
              onClick={handleLock}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/12 bg-white/[0.02] hover:bg-rose-500/15 hover:border-rose-500/30 text-xs font-mono text-zinc-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Kilitle
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs font-mono text-rose-300">
            {error}
          </div>
        )}

        {/* Top KPI Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/12 bg-[#0b0b10] p-5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <span>Ölçülen Toplam Gösterim</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-archivo font-[800] text-white">
              {formatNumber(data.summary.totalImpressions)}
            </div>
            <div className="text-xs font-mono text-zinc-500">
              Ort. {formatNumber(data.summary.avgImpressions)} / yayın •{" "}
              {data.summary.pendingBackfillCount > 0 ? (
                <span className="text-amber-400">
                  {data.summary.pendingBackfillCount} satır metrik bekliyor
                </span>
              ) : (
                <span className="text-emerald-400">Tüm satırlar güncel</span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-[#0b0b10] p-5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <span>DEV.to Canlı API Etkileşimi</span>
              <ArrowUpRight className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-archivo font-[800] text-white">
              {formatNumber(data.summary.devtoTotalReactions)}
              <span className="text-sm font-mono font-normal text-zinc-400 ml-2">
                reaksiyon
              </span>
            </div>
            <div className="text-xs font-mono text-zinc-500">
              {data.summary.devtoArticlesCount} makale •{" "}
              {data.summary.devtoTotalComments} yorum
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-[#0b0b10] p-5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <span>Bugünkü Sniper Radar Kotası</span>
              <Radio className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-archivo font-[800] text-white">
              {xRepliesToday}/8 <span className="text-sm text-zinc-500">X</span>{" "}
              <span className="text-zinc-600">•</span> {devtoCommentsToday}/3{" "}
              <span className="text-sm text-zinc-500">DEV</span>
            </div>
            <div className="text-xs font-mono text-zinc-500">
              Tarih: {data.radarState?.date || "—"} (Pinned &amp; &gt;12s kilitli)
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-[#0b0b10] p-5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <span>Blog Kalite Kapısı</span>
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-archivo font-[800] text-white">
              {data.summary.blogQualityPassCount}/{data.summary.blogTotalPosts}
            </div>
            <div className="text-xs font-mono text-zinc-500">
              {data.summary.blogLanguagesCount} çekirdek dil (`tr/en/de/es`)
            </div>
          </div>
        </section>

        {/* Platform Breakdown */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-4 space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
              LinkedIn (Kürşat Yılmaz)
            </div>
            <div className="text-lg font-bold text-white">
              {formatNumber(data.summary.totalImpressions)} gösterim
            </div>
            <p className="text-xs text-zinc-400">
              {formatNumber(data.summary.totalCommentsPerf)} loglanmış yorum • En
              iyi pencere: 12:35 / 18:30
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-4 space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              DEV.to (@kursatyz / @devkursat)
            </div>
            <div className="text-lg font-bold text-white">
              {data.summary.devtoArticlesCount} canlı makale
            </div>
            <p className="text-xs text-zinc-400">
              {data.summary.devtoTotalReactions} reaksiyon •{" "}
              {data.summary.devtoTotalComments} yorum (Canlı API)
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-4 space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">
              X / Twitter (@DevKursat)
            </div>
            <div className="text-lg font-bold text-white">
              {xRepliesToday} sniper yanıt bugün
            </div>
            <p className="text-xs text-zinc-400">
              {data.radarState?.repliedTargetsToday?.length || 0} farklı teknik
              lider hedefi
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-4 space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
              Blog Kategorileri (kursat.itibar.app)
            </div>
            <div className="text-lg font-bold text-white">
              {data.summary.blogTotalPosts} teknik dosya
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              guvenlik:{data.summary.categoryCounts.guvenlik || 0} • mimari:
              {data.summary.categoryCounts.mimari || 0} • donanim:
              {data.summary.categoryCounts.donanim || 0} • llm:
              {data.summary.categoryCounts.llm || 0}
            </p>
          </div>
        </section>

        {/* VSE 2.0 Performance Log */}
        <section className="rounded-2xl border border-white/12 bg-[#0b0b10] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-archivo font-[700] text-lg text-white">
                VSE 2.0 Tahmin vs. Gerçekleşen Performans Logu
              </h2>
              <p className="text-xs text-zinc-400">
                `performance-log.jsonl` kayıtları — eksik (`null`) 24 saatlik
                metrikleri buradan doğrudan işleyebilirsin.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Tarih / Saat</th>
                  <th className="px-4 py-3">Konu</th>
                  <th className="px-4 py-3">Platform</th>
                  <th className="px-4 py-3">VSE</th>
                  <th className="px-4 py-3">Gösterim</th>
                  <th className="px-4 py-3">Yorum</th>
                  <th className="px-4 py-3">Notlar / İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {data.performanceLog.map((row) => {
                  const rowKey = `${row.date}-${row.topic}`;
                  const isPending =
                    row.impressions === null || row.comments === null;
                  const isEditing = backfillKey === rowKey;

                  return (
                    <tr key={rowKey} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono text-zinc-300 whitespace-nowrap">
                        {row.date}{" "}
                        <span className="text-zinc-500">{row.publishTime}</span>
                      </td>
                      <td className="px-4 py-3 text-white font-medium max-w-xs">
                        {row.topic}
                      </td>
                      <td className="px-4 py-3 font-mono uppercase text-zinc-400">
                        {row.platform}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-white">
                          {row.vse}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-emerald-300">
                        {isPending ? (
                          <span className="text-amber-400">BEKLİYOR</span>
                        ) : (
                          formatNumber(row.impressions)
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-zinc-200">
                        {formatNumber(row.comments)}
                      </td>
                      <td className="px-4 py-3 text-zinc-400">
                        {isEditing ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              type="number"
                              placeholder="Gösterim"
                              value={bfImpressions}
                              onChange={(e) => setBfImpressions(e.target.value)}
                              className="w-24 rounded-lg border border-white/20 bg-black px-2 py-1 text-xs font-mono text-white"
                            />
                            <input
                              type="number"
                              placeholder="Yorum"
                              value={bfComments}
                              onChange={(e) => setBfComments(e.target.value)}
                              className="w-20 rounded-lg border border-white/20 bg-black px-2 py-1 text-xs font-mono text-white"
                            />
                            <input
                              type="text"
                              placeholder="Not (opsiyonel)"
                              value={bfNotes}
                              onChange={(e) => setBfNotes(e.target.value)}
                              className="w-36 rounded-lg border border-white/20 bg-black px-2 py-1 text-xs text-white"
                            />
                            <button
                              type="button"
                              disabled={actionBusy}
                              onClick={() => handleBackfillSubmit(row)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black font-semibold text-xs cursor-pointer"
                            >
                              Kaydet
                            </button>
                            <button
                              type="button"
                              onClick={() => setBackfillKey(null)}
                              className="px-2 py-1 rounded-lg border border-white/15 text-xs text-zinc-400 cursor-pointer"
                            >
                              İptal
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate max-w-xs">
                              {row.notes || "—"}
                            </span>
                            {data.mode === "local" && (
                              <button
                                type="button"
                                onClick={() => {
                                  setBackfillKey(rowKey);
                                  setBfImpressions(
                                    row.impressions !== null
                                      ? String(row.impressions)
                                      : ""
                                  );
                                  setBfComments(
                                    row.comments !== null
                                      ? String(row.comments)
                                      : ""
                                  );
                                  setBfNotes(row.notes || "");
                                }}
                                className="shrink-0 px-2 py-1 rounded-lg border border-white/15 hover:bg-white/10 font-mono text-[10px] text-zinc-200 cursor-pointer"
                              >
                                {isPending ? "24s Metrik Gir" : "Düzenle"}
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sniper Radar Audit */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/12 bg-[#0b0b10] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-archivo font-[700] text-base text-white">
                Bugünkü X Sniper Yanıtları ({xRepliesToday}/8)
              </h2>
              <span className="font-mono text-[10px] text-zinc-500">
                {data.radarState?.date || "—"}
              </span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {(data.radarState?.repliedTweetIds || []).length === 0 ? (
                <p className="text-xs text-zinc-500">Bugün henüz yanıt yok.</p>
              ) : (
                (data.radarState?.repliedTweetIds || []).map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.06] px-3 py-2 text-xs font-mono text-zinc-300 transition-colors"
                  >
                    <span className="truncate">{url}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
                  </a>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-[#0b0b10] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-archivo font-[700] text-base text-white">
                Bugünkü DEV.to Yorumları ({devtoCommentsToday}/3)
              </h2>
              <span className="font-mono text-[10px] text-zinc-500">
                {data.radarLog.length} yeni radar logu
              </span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {(data.radarState?.commentedArticleUrls || []).length === 0 ? (
                <p className="text-xs text-zinc-500">
                  Bugün henüz DEV.to yorumu yok.
                </p>
              ) : (
                (data.radarState?.commentedArticleUrls || []).map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.06] px-3 py-2 text-xs font-mono text-zinc-300 transition-colors"
                  >
                    <span className="truncate">{url}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
                  </a>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Bottom Tabbed Inspector: Blog Quality Gate / Live DEV.to / Queue */}
        <section className="rounded-2xl border border-white/12 bg-[#0b0b10] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab("audit")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                activeTab === "audit"
                  ? "bg-white text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              Blog Kalite Kapısı ({data.blogAudit.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("devto")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                activeTab === "devto"
                  ? "bg-white text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              DEV.to Canlı Makaleler ({data.devtoArticles.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("queue")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                activeTab === "queue"
                  ? "bg-white text-black font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              Yayın Kuyruğu ({data.queue.length})
            </button>
          </div>

          {activeTab === "audit" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  <tr>
                    <th className="px-4 py-3">Tarih</th>
                    <th className="px-4 py-3">Makale</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Kelime (TR)</th>
                    <th className="px-4 py-3">Paragraf</th>
                    <th className="px-4 py-3">Diller</th>
                    <th className="px-4 py-3">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {data.blogAudit.map((row) => (
                    <tr key={row.slug} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono text-zinc-400 whitespace-nowrap">
                        {row.isoDate}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/blog/${row.slug}`}
                          target="_blank"
                          className="text-white hover:underline font-medium"
                        >
                          {row.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-mono text-zinc-400">
                        {row.category}
                      </td>
                      <td className="px-4 py-3 font-mono text-zinc-200">
                        {row.wordCountTr}
                      </td>
                      <td className="px-4 py-3 font-mono text-zinc-200">
                        {row.paragraphCountTr}
                      </td>
                      <td className="px-4 py-3 font-mono text-zinc-300">
                        {row.langCount}/4
                      </td>
                      <td className="px-4 py-3">
                        {row.qualityPass ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            PASS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-mono text-[11px]">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {row.warnings.join(" • ")}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "devto" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  <tr>
                    <th className="px-4 py-3">Tarih</th>
                    <th className="px-4 py-3">Hesap</th>
                    <th className="px-4 py-3">Başlık</th>
                    <th className="px-4 py-3">Reaksiyon</th>
                    <th className="px-4 py-3">Yorum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {data.devtoArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono text-zinc-400 whitespace-nowrap">
                        {art.published_at.slice(0, 10)}
                      </td>
                      <td className="px-4 py-3 font-mono text-sky-400">
                        @{art.username}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={art.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white hover:underline font-medium"
                        >
                          {art.title}
                        </a>
                      </td>
                      <td className="px-4 py-3 font-mono text-emerald-300">
                        {art.public_reactions_count}
                      </td>
                      <td className="px-4 py-3 font-mono text-zinc-200">
                        {art.comments_count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "queue" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  <tr>
                    <th className="px-4 py-3">Tarih / Pencere</th>
                    <th className="px-4 py-3">Başlık</th>
                    <th className="px-4 py-3">Durum</th>
                    <th className="px-4 py-3">Yayın Linkleri</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {data.queue.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono text-zinc-400 whitespace-nowrap">
                        {item.scheduledDate}{" "}
                        {item.scheduledWindow ? `(${item.scheduledWindow})` : ""}
                      </td>
                      <td className="px-4 py-3 text-white font-medium">
                        {item.title}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] uppercase ${
                            item.status === "published"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-amber-500/15 text-amber-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-zinc-400">
                        <div className="flex items-center gap-3 flex-wrap">
                          {item.publishedUrls?.blog && (
                            <a
                              href={item.publishedUrls.blog}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:underline"
                            >
                              Blog
                            </a>
                          )}
                          {item.publishedUrls?.linkedin && (
                            <a
                              href={item.publishedUrls.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              LinkedIn
                            </a>
                          )}
                          {item.publishedUrls?.x && (
                            <a
                              href={item.publishedUrls.x}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-200 hover:underline"
                            >
                              X
                            </a>
                          )}
                          {item.publishedUrls?.devto && (
                            <a
                              href={item.publishedUrls.devto}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sky-400 hover:underline"
                            >
                              DEV.to
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
