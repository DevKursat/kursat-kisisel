import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { FieldValue } from "firebase-admin/firestore";
import { getFirestoreDb } from "@/lib/opsStore";

const LOCAL_ENGAGEMENT_FILE = path.join(process.cwd(), "data", "blog-engagement.json");
const TELEGRAM_BOT_TOKEN = "8852830220:AAHIe0yNdswdq9qYc5mSv4uTtIp_ORpIwvk";
const TELEGRAM_CHAT_ID = "8262872103";

export interface PublicArticleComment {
  id: string;
  authorName: string;
  role: string | null;
  text: string;
  stance: "a" | "b" | null;
  lang: string;
  createdAt: string;
}

export interface ArticleEngagementDoc {
  slug: string;
  votesA: number;
  votesB: number;
  reactions: {
    bullseye: number;
    fire: number;
    skull: number;
  };
  comments: PublicArticleComment[];
  updatedAt: string;
}

function emptyEngagement(slug: string): ArticleEngagementDoc {
  return {
    slug,
    votesA: 0,
    votesB: 0,
    reactions: {
      bullseye: 0,
      fire: 0,
      skull: 0,
    },
    comments: [],
    updatedAt: new Date().toISOString(),
  };
}

function sanitizeSlug(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "")
    .slice(0, 140);
}

async function readLocalMap(): Promise<Record<string, ArticleEngagementDoc>> {
  try {
    const raw = await fs.readFile(LOCAL_ENGAGEMENT_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeLocalMap(map: Record<string, ArticleEngagementDoc>): Promise<void> {
  try {
    await fs.mkdir(path.dirname(LOCAL_ENGAGEMENT_FILE), { recursive: true });
    await fs.writeFile(LOCAL_ENGAGEMENT_FILE, JSON.stringify(map, null, 2), "utf8");
  } catch {
    // Ignore read-only serverless fs errors when Firestore is active or unavailable
  }
}

async function getEngagementDoc(slug: string): Promise<ArticleEngagementDoc> {
  const db = getFirestoreDb();
  if (db) {
    try {
      const snap = await db.collection("blog_engagement").doc(slug).get();
      if (snap.exists) {
        const d = snap.data() as Partial<ArticleEngagementDoc>;
        return {
          slug,
          votesA: Number(d.votesA || 0),
          votesB: Number(d.votesB || 0),
          reactions: {
            bullseye: Number(d.reactions?.bullseye || 0),
            fire: Number(d.reactions?.fire || 0),
            skull: Number(d.reactions?.skull || 0),
          },
          comments: Array.isArray(d.comments) ? d.comments.slice(0, 50) : [],
          updatedAt: typeof d.updatedAt === "string" ? d.updatedAt : new Date().toISOString(),
        };
      }
    } catch (err) {
      console.error("Firestore blog_engagement read fallback:", err);
    }
  }

  const localMap = await readLocalMap();
  return localMap[slug] ?? emptyEngagement(slug);
}

async function notifyNewCommentSafe(slug: string, comment: PublicArticleComment) {
  try {
    const stanceLabel =
      comment.stance === "a" ? " [Taraf A]" : comment.stance === "b" ? " [Taraf B]" : "";
    const msg = `💬 Blog Yeni Teknik Yorum!\nYazı: ${slug}\nYazar: ${comment.authorName}${comment.role ? ` (${comment.role})` : ""}${stanceLabel}\n\n"${comment.text}"\n\nhttps://kursat.itibar.app/blog/${slug}`;
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: msg,
      }),
    });
  } catch {
    // Non-blocking notification
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = sanitizeSlug(searchParams.get("slug"));
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const doc = await getEngagementDoc(slug);
  return NextResponse.json(doc, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slug = sanitizeSlug(body?.slug);
    const action = typeof body?.action === "string" ? body.action : "";

    if (!slug || !action) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const db = getFirestoreDb();

    if (action === "vote") {
      const choice = body.choice === "a" || body.choice === "b" ? body.choice : null;
      const previous =
        body.previousChoice === "a" || body.previousChoice === "b"
          ? body.previousChoice
          : null;

      if (!choice) {
        return NextResponse.json({ error: "Invalid vote choice" }, { status: 400 });
      }

      if (choice === previous) {
        const current = await getEngagementDoc(slug);
        return NextResponse.json(current);
      }

      const deltaA = (choice === "a" ? 1 : 0) - (previous === "a" ? 1 : 0);
      const deltaB = (choice === "b" ? 1 : 0) - (previous === "b" ? 1 : 0);

      if (db) {
        try {
          const ref = db.collection("blog_engagement").doc(slug);
          await ref.set(
            {
              slug,
              votesA: FieldValue.increment(deltaA),
              votesB: FieldValue.increment(deltaB),
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
          const updated = await getEngagementDoc(slug);
          return NextResponse.json(updated);
        } catch (err) {
          console.error("Firestore vote write fallback:", err);
        }
      }

      const localMap = await readLocalMap();
      const doc = localMap[slug] ?? emptyEngagement(slug);
      doc.votesA = Math.max(0, doc.votesA + deltaA);
      doc.votesB = Math.max(0, doc.votesB + deltaB);
      doc.updatedAt = new Date().toISOString();
      localMap[slug] = doc;
      await writeLocalMap(localMap);
      return NextResponse.json(doc);
    }

    if (action === "react") {
      const key =
        body.reaction === "bullseye" || body.reaction === "fire" || body.reaction === "skull"
          ? body.reaction
          : null;
      if (!key) {
        return NextResponse.json({ error: "Invalid reaction" }, { status: 400 });
      }

      if (db) {
        try {
          const ref = db.collection("blog_engagement").doc(slug);
          await ref.set(
            {
              slug,
              reactions: {
                [key]: FieldValue.increment(1),
              },
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
          const updated = await getEngagementDoc(slug);
          return NextResponse.json(updated);
        } catch (err) {
          console.error("Firestore reaction write fallback:", err);
        }
      }

      const localMap = await readLocalMap();
      const doc = localMap[slug] ?? emptyEngagement(slug);
      doc.reactions[key] = (doc.reactions[key] || 0) + 1;
      doc.updatedAt = new Date().toISOString();
      localMap[slug] = doc;
      await writeLocalMap(localMap);
      return NextResponse.json(doc);
    }

    if (action === "comment") {
      const rawAuthor = typeof body.authorName === "string" ? body.authorName.trim() : "";
      const rawRole = typeof body.role === "string" ? body.role.trim() : "";
      const rawText = typeof body.text === "string" ? body.text.trim() : "";
      const stance = body.stance === "a" || body.stance === "b" ? body.stance : null;
      const lang = typeof body.lang === "string" ? body.lang.slice(0, 5) : "tr";

      if (rawAuthor.length < 2 || rawText.length < 6 || rawText.length > 900) {
        return NextResponse.json(
          { error: "İsim (en az 2 karakter) ve teknik yorum (6–900 karakter) gerekli." },
          { status: 400 }
        );
      }

      // Reject spammy multi-link drops
      const linkMatches = rawText.match(/https?:\/\//gi);
      if (linkMatches && linkMatches.length > 1) {
        return NextResponse.json(
          { error: "Spam koruması: Yorumlarda harici link yığınına izin verilmiyor." },
          { status: 400 }
        );
      }

      const newComment: PublicArticleComment = {
        id: `cmt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        authorName: rawAuthor.slice(0, 60),
        role: rawRole ? rawRole.slice(0, 60) : null,
        text: rawText,
        stance,
        lang,
        createdAt: new Date().toISOString(),
      };

      const existing = await getEngagementDoc(slug);
      const nextComments = [newComment, ...existing.comments].slice(0, 50);

      if (db) {
        try {
          const ref = db.collection("blog_engagement").doc(slug);
          await ref.set(
            {
              slug,
              comments: nextComments,
              updatedAt: newComment.createdAt,
            },
            { merge: true }
          );
          await notifyNewCommentSafe(slug, newComment);
          const updated = await getEngagementDoc(slug);
          return NextResponse.json(updated);
        } catch (err) {
          console.error("Firestore comment write fallback:", err);
        }
      }

      const localMap = await readLocalMap();
      const doc = localMap[slug] ?? emptyEngagement(slug);
      doc.comments = nextComments;
      doc.updatedAt = newComment.createdAt;
      localMap[slug] = doc;
      await writeLocalMap(localMap);
      await notifyNewCommentSafe(slug, newComment);
      return NextResponse.json(doc);
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (err) {
    console.error("Poll/Engagement API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
