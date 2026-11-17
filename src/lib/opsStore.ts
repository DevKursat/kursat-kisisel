import fs from "node:fs/promises";
import path from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

export type JobPlatform =
  | "upwork"
  | "fiverr"
  | "bionluk"
  | "contra"
  | "linkedin"
  | "wellfound"
  | "reddit"
  | "hn"
  | "direct";

export type JobStatus =
  | "discovered"
  | "pending_approval"
  | "approved"
  | "sent"
  | "interview"
  | "offer_received"
  | "won"
  | "archived";

export interface OpsJobItem {
  id: string;
  platform: JobPlatform;
  title: string;
  clientName: string;
  budget: string;
  currency: "USD" | "EUR" | "TRY";
  matchScore: number;
  url: string;
  proposalDraft: string;
  status: JobStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type BrandGroup = "blog" | "bocek";

export type CommentPlatform =
  | "kursat_blog"
  | "devto"
  | "hashnode"
  | "linkedin"
  | "x"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook";

export type CommentStatus = "pending" | "approved" | "sent" | "skipped";

export interface OpsCommentItem {
  id: string;
  brandGroup: BrandGroup;
  platform: CommentPlatform;
  accountHandle: string;
  contentTitle: string;
  contentUrl: string;
  authorName: string;
  commentText: string;
  replyDraft: string;
  personaUsed: "tech_founder" | "bocek_street";
  status: CommentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OpsPlatformCard {
  id: string;
  name: string;
  category: "freelance" | "blog" | "bocek" | "inbox";
  handle: string;
  dashboardUrl: string;
  profileUrl: string;
  statusNote: string;
  alertBadge?: string;
  metricsText?: string;
}

export interface OpsRadarAction {
  id: string;
  ts: string;
  platform: "x" | "devto" | "reddit" | "hn";
  target: string;
  title?: string;
  url: string;
  replyPreview?: string;
  engagementStatus?: string;
}

export type EmailCategory = "b2b_offer" | "sponsorship" | "freelance" | "billing" | "general";
export type EmailPriority = "high" | "normal" | "low";
export type EmailStatus = "unread" | "approved" | "sent" | "archived";

export type SuggestionStatus = "pending" | "selected" | "rejected" | "produced";

export interface OpsSuggestionItem {
  id: string;
  brandGroup: BrandGroup;
  title: string;
  vseScore?: number;
  summary: string;
  imageCandidates?: string[];
  selectedImageUrl?: string;
  userNote?: string;
  status: SuggestionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OpsEmailItem {
  id: string;
  account: string;
  from: string;
  subject: string;
  category: EmailCategory;
  priority: EmailPriority;
  summary: string;
  replyDraft: string;
  status: EmailStatus;
  receivedAt: string;
  updatedAt: string;
}

export interface PlatformContentStat {
  platform: CommentPlatform;
  brandGroup: BrandGroup;
  label: string;
  views: number;
  comments: number;
  pendingReplies: number;
  lastActivityAt?: string;
}

export interface OpsSummaryDoc {
  freelanceStats: {
    totalApplied: number;
    activeInterviews: number;
    incomingOffers: number;
    wonCount: number;
    pipelineUsd: number;
    lastScanAt: string | null;
  };
  contentStats: {
    blogViews: number;
    blogComments: number;
    bocekViews: number;
    bocekComments: number;
    pendingReplies: number;
    radarTodayCount: number;
    lastSyncAt: string | null;
  };
  platformStats?: PlatformContentStat[];
  mailStats: {
    unreadCount: number;
    highPriorityCount: number;
    lastCheckAt: string | null;
  };
  pendingTriggers?: Array<{
    id: string;
    type: "new_suggestions" | "sync_now";
    createdAt: string;
  }>;
  platforms: OpsPlatformCard[];
  updatedAt: string;
}

export interface OpsStorePayload {
  storageMode: "firestore" | "local";
  summary: OpsSummaryDoc;
  jobs: OpsJobItem[];
  comments: OpsCommentItem[];
  emails: OpsEmailItem[];
  suggestions: OpsSuggestionItem[];
  radarActions: OpsRadarAction[];
}

const LOCAL_STORE_PATH = path.join(process.cwd(), "data", "ops-local-store.json");

const DEFAULT_PLATFORMS: OpsPlatformCard[] = [
  {
    id: "upwork",
    name: "Upwork",
    category: "freelance",
    handle: "Kursat Y.",
    dashboardUrl: "https://www.upwork.com/nx/find-work/best-matches",
    profileUrl: "https://www.upwork.com/freelancers/~0194776fc1f6b59652",
    statusNote: "$30/hr · AI Product Engineer & Tech Writer",
    alertBadge: "Connects: 0 · ID Doğrulama Bekliyor",
  },
  {
    id: "fiverr",
    name: "Fiverr",
    category: "freelance",
    handle: "kurs_tt",
    dashboardUrl: "https://www.fiverr.com/seller_dashboard",
    profileUrl: "https://www.fiverr.com/kurs_tt",
    statusNote: "New Seller · Profile 8/12",
    alertBadge: "4 Okunmamış Mesaj",
  },
  {
    id: "bionluk",
    name: "Bionluk",
    category: "freelance",
    handle: "kurstayilmaz",
    dashboardUrl: "https://bionluk.com/alici-istekleri",
    profileUrl: "https://bionluk.com/kurstayilmaz",
    statusNote: "1000 bicoin hazır · 2 aktif ilan",
    alertBadge: "1000 bicoin boşta",
  },
  {
    id: "contra",
    name: "Contra",
    category: "freelance",
    handle: "kursatyz",
    dashboardUrl: "https://contra.com/w/kursatyz/home",
    profileUrl: "https://contra.com/w/kursatyz/home",
    statusNote: "%0 Komisyon · Work & Services kurulumu",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "blog",
    handle: "Kürşat Yılmaz",
    dashboardUrl: "https://www.linkedin.com/messaging/",
    profileUrl: "https://www.linkedin.com/in/kursatyilmaz/",
    statusNote: "B2B Inbound & Teknik Otorite",
  },
  {
    id: "zoho-mail",
    name: "Zoho Mail",
    category: "inbox",
    handle: "kursat@itibar.app",
    dashboardUrl: "https://mail.zoho.eu/",
    profileUrl: "https://mail.zoho.eu/",
    statusNote: "Resmî B2B & Sponsorluk Gelen Kutusu",
  },
  {
    id: "bocek-ig",
    name: "Instagram (Böcek)",
    category: "bocek",
    handle: "@kursatsi",
    dashboardUrl: "https://www.instagram.com/kursatsi/",
    profileUrl: "https://www.instagram.com/kursatsi/",
    statusNote: "9:16 Reels + FB Crosspost (18:30)",
  },
  {
    id: "bocek-tt",
    name: "TikTok (Böcek)",
    category: "bocek",
    handle: "@kursat.yz",
    dashboardUrl: "https://www.tiktok.com/@kursat.yz",
    profileUrl: "https://www.tiktok.com/@kursat.yz",
    statusNote: "9:16 Dikey · Repost aktif",
  },
  {
    id: "bocek-yt",
    name: "YouTube Shorts (Böcek)",
    category: "bocek",
    handle: "@kursatsi",
    dashboardUrl: "https://studio.youtube.com/",
    profileUrl: "https://www.youtube.com/@kursatsi",
    statusNote: "Kadıköy Simülasyonu Playlist",
  },
  {
    id: "bocek-x",
    name: "X (Böcek)",
    category: "bocek",
    handle: "@kursatsi",
    dashboardUrl: "https://x.com/kursatsi",
    profileUrl: "https://x.com/kursatsi",
    statusNote: "Mizah/Video hesabı (B2B'den izole)",
  },
];

function createDefaultStore(): Omit<OpsStorePayload, "storageMode"> {
  const now = new Date().toISOString();
  return {
    summary: {
      freelanceStats: {
        totalApplied: 0,
        activeInterviews: 0,
        incomingOffers: 0,
        wonCount: 0,
        pipelineUsd: 0,
        lastScanAt: null,
      },
      contentStats: {
        blogViews: 0,
        blogComments: 0,
        bocekViews: 0,
        bocekComments: 0,
        pendingReplies: 0,
        radarTodayCount: 0,
        lastSyncAt: null,
      },
      mailStats: {
        unreadCount: 0,
        highPriorityCount: 0,
        lastCheckAt: null,
      },
      platforms: DEFAULT_PLATFORMS,
      updatedAt: now,
    },
    jobs: [],
    comments: [],
    emails: [],
    suggestions: [],
    radarActions: [],
  };
}

let cachedDb: Firestore | null | undefined;

export function getFirestoreDb(): Firestore | null {
  if (cachedDb !== undefined) return cachedDb;

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY?.trim();

  if (!projectId || !clientEmail || !privateKeyRaw) {
    cachedDb = null;
    return null;
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
  if (!getApps().length) {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }

  cachedDb = getFirestore();
  return cachedDb;
}

async function readLocalStore(): Promise<Omit<OpsStorePayload, "storageMode">> {
  try {
    const raw = await fs.readFile(LOCAL_STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<Omit<OpsStorePayload, "storageMode">>;
    const defaults = createDefaultStore();
    return {
      summary: {
        ...defaults.summary,
        ...parsed.summary,
        platforms: parsed.summary?.platforms?.length
          ? parsed.summary.platforms
          : defaults.summary.platforms,
      },
      jobs: Array.isArray(parsed.jobs) ? parsed.jobs : [],
      comments: Array.isArray(parsed.comments) ? parsed.comments : [],
      emails: Array.isArray(parsed.emails) ? parsed.emails : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      radarActions: Array.isArray(parsed.radarActions) ? parsed.radarActions : [],
    };
  } catch {
    return createDefaultStore();
  }
}

async function writeLocalStore(data: Omit<OpsStorePayload, "storageMode">): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_STORE_PATH), { recursive: true });
  await fs.writeFile(LOCAL_STORE_PATH, JSON.stringify(data, null, 2), "utf8");
}

function recomputeSummaryStats(
  summary: OpsSummaryDoc,
  jobs: OpsJobItem[],
  comments: OpsCommentItem[],
  emails: OpsEmailItem[],
  radarActions: OpsRadarAction[]
): OpsSummaryDoc {
  const sentStatuses = new Set<JobStatus>(["sent", "interview", "offer_received", "won"]);
  const totalApplied = jobs.filter((j) => sentStatuses.has(j.status)).length;
  const activeInterviews = jobs.filter((j) => j.status === "interview").length;
  const incomingOffers = jobs.filter((j) => j.status === "offer_received").length;
  const wonCount = jobs.filter((j) => j.status === "won").length;

  const pipelineUsd = jobs
    .filter((j) => j.status !== "archived")
    .reduce((acc, j) => {
      const numeric = Number(j.budget.replace(/[^0-9.]/g, ""));
      if (!Number.isFinite(numeric)) return acc;
      if (j.currency === "TRY") return acc + Math.round(numeric / 35);
      return acc + Math.round(numeric);
    }, 0);

  const pendingReplies = comments.filter((c) => c.status === "pending").length;
  const today = new Date().toISOString().slice(0, 10);
  const radarTodayCount = radarActions.filter((r) => r.ts.startsWith(today)).length;
  const unreadCount = emails.filter((e) => e.status === "unread").length;
  const highPriorityCount = emails.filter((e) => e.status === "unread" && e.priority === "high").length;

  return {
    ...summary,
    freelanceStats: {
      ...summary.freelanceStats,
      totalApplied,
      activeInterviews,
      incomingOffers,
      wonCount,
      pipelineUsd,
    },
    contentStats: {
      ...summary.contentStats,
      pendingReplies,
      radarTodayCount: Math.max(radarTodayCount, summary.contentStats.radarTodayCount),
    },
    mailStats: {
      ...summary.mailStats,
      unreadCount,
      highPriorityCount,
    },
    updatedAt: new Date().toISOString(),
  };
}

export async function loadOpsStore(): Promise<OpsStorePayload> {
  const db = getFirestoreDb();
  if (!db) {
    const local = await readLocalStore();
    return {
      storageMode: "local",
      ...local,
      summary: recomputeSummaryStats(
        local.summary,
        local.jobs,
        local.comments,
        local.emails,
        local.radarActions
      ),
    };
  }

  const defaults = createDefaultStore();
  const [summarySnap, jobsSnap, commentsSnap, emailsSnap, suggestionsSnap, radarSnap] =
    await Promise.all([
      db.collection("ops_state").doc("summary").get(),
      db.collection("ops_jobs").orderBy("updatedAt", "desc").limit(50).get(),
      db.collection("ops_comments").orderBy("createdAt", "desc").limit(60).get(),
      db.collection("ops_emails").orderBy("receivedAt", "desc").limit(40).get(),
      db.collection("ops_suggestions").orderBy("createdAt", "desc").limit(30).get(),
      db.collection("ops_radar").orderBy("date", "desc").limit(7).get(),
    ]);

  const summary = summarySnap.exists
    ? ({ ...defaults.summary, ...(summarySnap.data() as Partial<OpsSummaryDoc>) } as OpsSummaryDoc)
    : defaults.summary;

  const jobs = jobsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<OpsJobItem, "id">) }));
  const comments = commentsSnap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<OpsCommentItem, "id">),
  }));
  const emails = emailsSnap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<OpsEmailItem, "id">),
  }));
  const suggestions = suggestionsSnap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<OpsSuggestionItem, "id">),
  }));
  const radarActions: OpsRadarAction[] = [];
  for (const doc of radarSnap.docs) {
    const data = doc.data() as { actions?: OpsRadarAction[] };
    if (Array.isArray(data.actions)) {
      radarActions.push(...data.actions);
    }
  }

  return {
    storageMode: "firestore",
    summary: recomputeSummaryStats(summary, jobs, comments, emails, radarActions),
    jobs,
    comments,
    emails,
    suggestions,
    radarActions,
  };
}

export async function upsertJob(job: OpsJobItem): Promise<void> {
  const db = getFirestoreDb();
  if (!db) {
    const store = await readLocalStore();
    const idx = store.jobs.findIndex((j) => j.id === job.id);
    if (idx >= 0) store.jobs[idx] = job;
    else store.jobs.unshift(job);
    store.summary = recomputeSummaryStats(store.summary, store.jobs, store.comments, store.emails, store.radarActions);
    await writeLocalStore(store);
    return;
  }

  await db.collection("ops_jobs").doc(job.id).set(job, { merge: true });
}

export async function updateJobFields(
  id: string,
  patch: Partial<Omit<OpsJobItem, "id">>
): Promise<boolean> {
  const updatedAt = new Date().toISOString();
  const db = getFirestoreDb();
  if (!db) {
    const store = await readLocalStore();
    const idx = store.jobs.findIndex((j) => j.id === id);
    if (idx < 0) return false;
    store.jobs[idx] = { ...store.jobs[idx], ...patch, updatedAt };
    store.summary = recomputeSummaryStats(store.summary, store.jobs, store.comments, store.emails, store.radarActions);
    await writeLocalStore(store);
    return true;
  }

  const ref = db.collection("ops_jobs").doc(id);
  const snap = await ref.get();
  if (!snap.exists) return false;
  await ref.update({ ...patch, updatedAt });
  return true;
}

export async function updateCommentFields(
  id: string,
  patch: Partial<Omit<OpsCommentItem, "id">>
): Promise<boolean> {
  const updatedAt = new Date().toISOString();
  const db = getFirestoreDb();
  if (!db) {
    const store = await readLocalStore();
    const idx = store.comments.findIndex((c) => c.id === id);
    if (idx < 0) return false;
    store.comments[idx] = { ...store.comments[idx], ...patch, updatedAt };
    store.summary = recomputeSummaryStats(store.summary, store.jobs, store.comments, store.emails, store.radarActions);
    await writeLocalStore(store);
    return true;
  }

  const ref = db.collection("ops_comments").doc(id);
  const snap = await ref.get();
  if (!snap.exists) return false;
  await ref.update({ ...patch, updatedAt });
  return true;
}

export async function updateEmailFields(
  id: string,
  patch: Partial<Omit<OpsEmailItem, "id">>
): Promise<boolean> {
  const updatedAt = new Date().toISOString();
  const db = getFirestoreDb();
  if (!db) {
    const store = await readLocalStore();
    const idx = store.emails.findIndex((e) => e.id === id);
    if (idx < 0) return false;
    store.emails[idx] = { ...store.emails[idx], ...patch, updatedAt };
    store.summary = recomputeSummaryStats(
      store.summary,
      store.jobs,
      store.comments,
      store.emails,
      store.radarActions
    );
    await writeLocalStore(store);
    return true;
  }

  const ref = db.collection("ops_emails").doc(id);
  const snap = await ref.get();
  if (!snap.exists) return false;
  await ref.update({ ...patch, updatedAt });
  return true;
}

export async function updateSuggestionFields(
  id: string,
  patch: Partial<Omit<OpsSuggestionItem, "id">>
): Promise<boolean> {
  const updatedAt = new Date().toISOString();
  const db = getFirestoreDb();
  if (!db) {
    const store = await readLocalStore();
    const idx = store.suggestions.findIndex((s) => s.id === id);
    if (idx < 0) return false;
    store.suggestions[idx] = { ...store.suggestions[idx], ...patch, updatedAt };
    await writeLocalStore(store);
    return true;
  }

  const ref = db.collection("ops_suggestions").doc(id);
  const snap = await ref.get();
  if (!snap.exists) return false;
  await ref.update({ ...patch, updatedAt });
  return true;
}

export async function addOpsTrigger(type: "new_suggestions" | "sync_now"): Promise<void> {
  const item = {
    id: `trig_${Date.now()}`,
    type,
    createdAt: new Date().toISOString(),
  };
  const db = getFirestoreDb();
  if (!db) {
    const store = await readLocalStore();
    const list = store.summary.pendingTriggers || [];
    list.push(item);
    store.summary.pendingTriggers = list.slice(-10);
    await writeLocalStore(store);
    return;
  }

  const ref = db.collection("ops_state").doc("summary");
  const snap = await ref.get();
  const prev = snap.exists
    ? ((snap.data()?.pendingTriggers as OpsSummaryDoc["pendingTriggers"]) || [])
    : [];
  await ref.set({ pendingTriggers: [...prev, item].slice(-10) }, { merge: true });
}

export async function clearOpsTriggers(ids: string[]): Promise<void> {
  if (!ids.length) return;
  const idSet = new Set(ids);
  const db = getFirestoreDb();
  if (!db) {
    const store = await readLocalStore();
    store.summary.pendingTriggers = (store.summary.pendingTriggers || []).filter(
      (t) => !idSet.has(t.id)
    );
    await writeLocalStore(store);
    return;
  }

  const ref = db.collection("ops_state").doc("summary");
  const snap = await ref.get();
  if (!snap.exists) return;
  const prev = (snap.data()?.pendingTriggers as OpsSummaryDoc["pendingTriggers"]) || [];
  await ref.set(
    { pendingTriggers: prev.filter((t) => !idSet.has(t.id)) },
    { merge: true }
  );
}

export async function syncWorkerPayload(payload: {
  jobs?: OpsJobItem[];
  comments?: OpsCommentItem[];
  emails?: OpsEmailItem[];
  suggestions?: OpsSuggestionItem[];
  radarActions?: OpsRadarAction[];
  contentStats?: Partial<OpsSummaryDoc["contentStats"]>;
  platforms?: OpsPlatformCard[];
  scanTimestamp?: string;
}): Promise<{
  jobsUpserted: number;
  commentsUpserted: number;
  emailsUpserted: number;
  radarUpserted: number;
}> {
  const db = getFirestoreDb();
  const now = new Date().toISOString();

  if (!db) {
    const store = await readLocalStore();

    for (const job of payload.jobs || []) {
      const idx = store.jobs.findIndex((j) => j.id === job.id);
      if (idx >= 0) store.jobs[idx] = { ...store.jobs[idx], ...job, updatedAt: now };
      else store.jobs.unshift(job);
    }

    for (const comment of payload.comments || []) {
      const idx = store.comments.findIndex((c) => c.id === comment.id);
      if (idx >= 0) store.comments[idx] = { ...store.comments[idx], ...comment, updatedAt: now };
      else store.comments.unshift(comment);
    }

    for (const email of payload.emails || []) {
      const idx = store.emails.findIndex((e) => e.id === email.id);
      if (idx >= 0) store.emails[idx] = { ...store.emails[idx], ...email, updatedAt: now };
      else store.emails.unshift(email);
    }

    for (const sug of payload.suggestions || []) {
      const idx = store.suggestions.findIndex((s) => s.id === sug.id);
      if (idx >= 0) store.suggestions[idx] = { ...store.suggestions[idx], ...sug, updatedAt: now };
      else store.suggestions.unshift(sug);
    }

    if (payload.emails?.length) {
      store.summary.mailStats.lastCheckAt = now;
    }

    for (const action of payload.radarActions || []) {
      if (!store.radarActions.some((r) => r.id === action.id)) {
        store.radarActions.unshift(action);
      }
    }

    if (payload.contentStats) {
      store.summary.contentStats = {
        ...store.summary.contentStats,
        ...payload.contentStats,
        lastSyncAt: now,
      };
    }

    if (payload.platforms?.length) {
      store.summary.platforms = payload.platforms;
    }

    if (payload.scanTimestamp) {
      store.summary.freelanceStats.lastScanAt = payload.scanTimestamp;
    }

    store.summary = recomputeSummaryStats(store.summary, store.jobs, store.comments, store.emails, store.radarActions);
    await writeLocalStore(store);

    return {
      jobsUpserted: payload.jobs?.length || 0,
      commentsUpserted: payload.comments?.length || 0,
      emailsUpserted: payload.emails?.length || 0,
      radarUpserted: payload.radarActions?.length || 0,
    };
  }

  const batch = db.batch();

  for (const job of payload.jobs || []) {
    batch.set(db.collection("ops_jobs").doc(job.id), { ...job, updatedAt: now }, { merge: true });
  }

  for (const comment of payload.comments || []) {
    batch.set(
      db.collection("ops_comments").doc(comment.id),
      { ...comment, updatedAt: now },
      { merge: true }
    );
  }

  for (const email of payload.emails || []) {
    batch.set(
      db.collection("ops_emails").doc(email.id),
      { ...email, updatedAt: now },
      { merge: true }
    );
  }

  for (const sug of payload.suggestions || []) {
    batch.set(
      db.collection("ops_suggestions").doc(sug.id),
      { ...sug, updatedAt: now },
      { merge: true }
    );
  }

  if (payload.radarActions?.length) {
    const byDate = new Map<string, OpsRadarAction[]>();
    for (const action of payload.radarActions) {
      const day = action.ts.slice(0, 10);
      const list = byDate.get(day) || [];
      list.push(action);
      byDate.set(day, list);
    }

    for (const [day, actions] of byDate.entries()) {
      const ref = db.collection("ops_radar").doc(day);
      const existing = await ref.get();
      const prev = existing.exists ? ((existing.data()?.actions as OpsRadarAction[]) || []) : [];
      const merged = [...actions];
      for (const p of prev) {
        if (!merged.some((m) => m.id === p.id)) merged.push(p);
      }
      batch.set(ref, { date: day, actions: merged.slice(0, 100), updatedAt: now }, { merge: true });
    }
  }

  const summaryRef = db.collection("ops_state").doc("summary");
  const summarySnap = await summaryRef.get();
  const baseSummary = summarySnap.exists
    ? ({ ...createDefaultStore().summary, ...(summarySnap.data() as Partial<OpsSummaryDoc>) } as OpsSummaryDoc)
    : createDefaultStore().summary;

  if (payload.contentStats) {
    baseSummary.contentStats = {
      ...baseSummary.contentStats,
      ...payload.contentStats,
      lastSyncAt: now,
    };
  }
  if (payload.platforms?.length) {
    baseSummary.platforms = payload.platforms;
  }
  if (payload.scanTimestamp) {
    baseSummary.freelanceStats.lastScanAt = payload.scanTimestamp;
  }
  if (payload.emails?.length) {
    baseSummary.mailStats.lastCheckAt = now;
  }
  baseSummary.updatedAt = now;
  batch.set(summaryRef, baseSummary, { merge: true });

  await batch.commit();

  return {
    jobsUpserted: payload.jobs?.length || 0,
    commentsUpserted: payload.comments?.length || 0,
    emailsUpserted: payload.emails?.length || 0,
    radarUpserted: payload.radarActions?.length || 0,
  };
}
