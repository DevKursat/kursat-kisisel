import fs from "node:fs/promises";
import path from "node:path";
import { BLOG_LANGUAGES, BLOG_POSTS, type BlogLang } from "@/data/blogPosts";
import opsSnapshot from "@/data/opsSnapshot.json";

const PIPELINE_ROOT = "/Users/kursat/social-pipeline";

export interface PerformanceLogRow {
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

export interface RadarLogEntry {
  ts: string;
  platform: "x" | "devto";
  target: string;
  title?: string;
  url: string;
  targetAgeMinutes?: number;
  replyPreview?: string;
}

export interface DevtoArticleMetric {
  id: number;
  title: string;
  url: string;
  published_at: string;
  public_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
  page_views_count?: number;
  username: string;
}

export interface BlogAuditRow {
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

async function fileExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readJsonSafe<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function readJsonlSafe<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as T;
        } catch {
          return null;
        }
      })
      .filter((item): item is T => item !== null);
  } catch {
    return [];
  }
}

async function fetchDevtoArticles(): Promise<DevtoArticleMetric[]> {
  const handles = ["kursatyz", "devkursat"];
  const results = await Promise.all(
    handles.map(async (username) => {
      try {
        const res = await fetch(
          `https://dev.to/api/articles?username=${encodeURIComponent(username)}&per_page=30`,
          {
            headers: { "User-Agent": "kursat-ops-telemetry/1.0" },
            cache: "no-store",
          }
        );
        if (!res.ok) return [];
        const data = (await res.json()) as Array<Record<string, unknown>>;
        if (!Array.isArray(data)) return [];
        return data.map((item) => ({
          id: Number(item.id || 0),
          title: String(item.title || ""),
          url: String(item.url || ""),
          published_at: String(item.published_at || ""),
          public_reactions_count: Number(item.public_reactions_count || 0),
          comments_count: Number(item.comments_count || 0),
          reading_time_minutes: Number(item.reading_time_minutes || 0),
          username,
        }));
      } catch {
        return [];
      }
    })
  );

  const merged = results.flat();
  const seen = new Set<string>();
  return merged
    .filter((item) => {
      if (!item.url || seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
}

function auditBlogCorpus(): BlogAuditRow[] {
  const requiredOtherLangs = BLOG_LANGUAGES.map((l) => l.code).filter(
    (code): code is Exclude<BlogLang, "tr"> => code !== "tr"
  );

  return BLOG_POSTS.map((post) => {
    const trText = post.content.join(" ");
    const wordCountTr = trText.trim().split(/\s+/).filter(Boolean).length;
    const paragraphCountTr = post.content.length;
    const presentLangs =
      1 +
      requiredOtherLangs.filter((code) => Boolean(post.translations?.[code]))
        .length;

    const warnings: string[] = [];
    if (paragraphCountTr < 5) warnings.push(`< 5 paragraf (${paragraphCountTr})`);
    if (wordCountTr < 350) warnings.push(`Kısa metin (${wordCountTr} kelime)`);
    if (presentLangs < BLOG_LANGUAGES.length) {
      warnings.push(`Eksik dil (${presentLangs}/${BLOG_LANGUAGES.length})`);
    }

    return {
      slug: post.slug,
      title: post.title,
      category: post.category,
      isoDate: post.isoDate,
      declaredReadTime: post.readTime,
      wordCountTr,
      paragraphCountTr,
      langCount: presentLangs,
      qualityPass: warnings.length === 0,
      warnings,
    };
  });
}

export async function collectOpsTelemetry() {
  const hasLocalPipeline = await fileExists(
    path.join(PIPELINE_ROOT, "data", "performance-log.jsonl")
  );

  const performanceLog: PerformanceLogRow[] = hasLocalPipeline
    ? await readJsonlSafe<PerformanceLogRow>(
        path.join(PIPELINE_ROOT, "data", "performance-log.jsonl")
      )
    : (opsSnapshot.performanceLog as PerformanceLogRow[]);

  const radarLog: RadarLogEntry[] = hasLocalPipeline
    ? await readJsonlSafe<RadarLogEntry>(
        path.join(PIPELINE_ROOT, "data", "radar-log.jsonl")
      )
    : ((opsSnapshot.radarLog || []) as RadarLogEntry[]);

  const radarState = hasLocalPipeline
    ? await readJsonSafe<Record<string, unknown> | null>(
        path.join(PIPELINE_ROOT, "pipeline", "radar_state.json"),
        null
      )
    : (opsSnapshot.radarState as Record<string, unknown> | null);

  const latestPublish = hasLocalPipeline
    ? await readJsonSafe<Record<string, unknown> | null>(
        path.join(PIPELINE_ROOT, "pipeline", "latest_publish.json"),
        null
      )
    : (opsSnapshot.latestPublish as Record<string, unknown> | null);

  const queueRaw = hasLocalPipeline
    ? await readJsonSafe<Array<Record<string, unknown>>>(
        path.join(PIPELINE_ROOT, "pipeline", "queue.json"),
        []
      )
    : (opsSnapshot.queue as Array<Record<string, unknown>>);

  const queueSummary = (Array.isArray(queueRaw) ? queueRaw : []).map((q) => ({
    id: String(q.id || ""),
    title: String(q.title || ""),
    scheduledDate: String(q.scheduledDate || ""),
    scheduledWindow: q.scheduledWindow ? String(q.scheduledWindow) : null,
    status: String(q.status || "unknown"),
    publishedAt: q.publishedAt ? String(q.publishedAt) : null,
    publishedUrls: (q.publishedUrls as Record<string, string | null>) || null,
  }));

  const [devtoArticles, blogAudit] = await Promise.all([
    fetchDevtoArticles(),
    Promise.resolve(auditBlogCorpus()),
  ]);

  const validPerfRows = performanceLog.filter(
    (r) => typeof r.impressions === "number" && r.impressions !== null
  );
  const totalImpressions = validPerfRows.reduce(
    (acc, r) => acc + (r.impressions || 0),
    0
  );
  const totalCommentsPerf = validPerfRows.reduce(
    (acc, r) => acc + (r.comments || 0),
    0
  );
  const pendingBackfillCount = performanceLog.filter(
    (r) => r.impressions === null || r.comments === null
  ).length;

  const devtoTotalReactions = devtoArticles.reduce(
    (acc, a) => acc + a.public_reactions_count,
    0
  );
  const devtoTotalComments = devtoArticles.reduce(
    (acc, a) => acc + a.comments_count,
    0
  );

  const categoryCounts = BLOG_POSTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return {
    generatedAt: new Date().toISOString(),
    mode: hasLocalPipeline ? "local" : "cloud",
    snapshotSyncedAt: opsSnapshot.syncedAt,
    summary: {
      totalImpressions,
      totalCommentsPerf,
      avgImpressions:
        validPerfRows.length > 0
          ? Math.round(totalImpressions / validPerfRows.length)
          : 0,
      pendingBackfillCount,
      blogTotalPosts: BLOG_POSTS.length,
      blogLanguagesCount: BLOG_LANGUAGES.length,
      blogQualityPassCount: blogAudit.filter((b) => b.qualityPass).length,
      devtoArticlesCount: devtoArticles.length,
      devtoTotalReactions,
      devtoTotalComments,
      categoryCounts,
    },
    performanceLog: [...performanceLog].reverse(),
    radarState,
    radarLog: [...radarLog].reverse().slice(0, 30),
    devtoArticles,
    blogAudit,
    latestPublish: latestPublish
      ? {
          id: String(latestPublish.id || ""),
          title: String(latestPublish.title || ""),
          scheduledDate: String(latestPublish.scheduledDate || ""),
          status: String(latestPublish.status || ""),
          publishedAt: latestPublish.publishedAt
            ? String(latestPublish.publishedAt)
            : null,
          publishedUrls:
            (latestPublish.publishedUrls as Record<string, string | null>) ||
            null,
        }
      : null,
    queue: queueSummary.reverse(),
  };
}
