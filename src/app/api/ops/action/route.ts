import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { isOpsAuthenticated } from "@/lib/opsAuth";
import {
  updateCommentFields,
  updateEmailFields,
  updateJobFields,
  updateSuggestionFields,
  upsertJob,
  type JobPlatform,
  type JobStatus,
  type OpsJobItem,
} from "@/lib/opsStore";

const execFileAsync = promisify(execFile);
const PIPELINE_ROOT = "/Users/kursat/social-pipeline";
const PERF_LOG_PATH = path.join(PIPELINE_ROOT, "data", "performance-log.jsonl");
const SYNC_SCRIPT_PATH = path.join(
  PIPELINE_ROOT,
  "pipeline",
  "sync_ops_snapshot.mjs"
);

export async function POST(request: Request) {
  if (!(await isOpsAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const action = String(body.action || "");

    if (action === "approve_comment") {
      const id = String(body.id || "").trim();
      const replyDraft = body.replyDraft !== undefined ? String(body.replyDraft).trim() : undefined;
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

      const ok = await updateCommentFields(id, {
        status: "approved",
        ...(replyDraft !== undefined ? { replyDraft } : {}),
      });
      if (!ok) return NextResponse.json({ error: "Comment not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    if (action === "skip_comment") {
      const id = String(body.id || "").trim();
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

      const ok = await updateCommentFields(id, { status: "skipped" });
      if (!ok) return NextResponse.json({ error: "Comment not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    if (action === "approve_email_reply") {
      const id = String(body.id || "").trim();
      const replyDraft = body.replyDraft !== undefined ? String(body.replyDraft).trim() : undefined;
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

      const ok = await updateEmailFields(id, {
        status: "approved",
        ...(replyDraft !== undefined ? { replyDraft } : {}),
      });
      if (!ok) return NextResponse.json({ error: "Email not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    if (action === "archive_email") {
      const id = String(body.id || "").trim();
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

      const ok = await updateEmailFields(id, { status: "archived" });
      if (!ok) return NextResponse.json({ error: "Email not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    if (action === "select_suggestion") {
      const id = String(body.id || "").trim();
      const selectedImageUrl =
        body.selectedImageUrl !== undefined ? String(body.selectedImageUrl).trim() : undefined;
      const userNote = body.userNote !== undefined ? String(body.userNote).trim() : undefined;
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

      const ok = await updateSuggestionFields(id, {
        status: "selected",
        ...(selectedImageUrl ? { selectedImageUrl } : {}),
        ...(userNote !== undefined ? { userNote } : {}),
      });
      if (!ok) return NextResponse.json({ error: "Suggestion not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    if (action === "reject_suggestion") {
      const id = String(body.id || "").trim();
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

      const ok = await updateSuggestionFields(id, { status: "rejected" });
      if (!ok) return NextResponse.json({ error: "Suggestion not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    if (action === "approve_job") {
      const id = String(body.id || "").trim();
      const proposalDraft =
        body.proposalDraft !== undefined ? String(body.proposalDraft).trim() : undefined;
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

      const ok = await updateJobFields(id, {
        status: "approved",
        ...(proposalDraft !== undefined ? { proposalDraft } : {}),
      });
      if (!ok) return NextResponse.json({ error: "Job not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    if (action === "update_job_status") {
      const id = String(body.id || "").trim();
      const status = String(body.status || "").trim() as JobStatus;
      if (!id || !status) {
        return NextResponse.json({ error: "id and status required" }, { status: 400 });
      }

      const ok = await updateJobFields(id, { status });
      if (!ok) return NextResponse.json({ error: "Job not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    if (action === "add_job") {
      const title = String(body.title || "").trim();
      const platform = (String(body.platform || "direct").trim() as JobPlatform) || "direct";
      const clientName = String(body.clientName || "Doğrudan / B2B").trim();
      const budget = String(body.budget || "$1,500").trim();
      const currency = (String(body.currency || "USD").trim() as "USD" | "EUR" | "TRY") || "USD";
      const url = String(body.url || "").trim();
      const proposalDraft = String(body.proposalDraft || "").trim();
      const status = (String(body.status || "discovered").trim() as JobStatus) || "discovered";

      if (!title) {
        return NextResponse.json({ error: "title required" }, { status: 400 });
      }

      const now = new Date().toISOString();
      const job: OpsJobItem = {
        id: `job_${randomUUID().slice(0, 8)}`,
        platform,
        title,
        clientName,
        budget,
        currency,
        matchScore: Number(body.matchScore) || 90,
        url,
        proposalDraft,
        status,
        createdAt: now,
        updatedAt: now,
      };
      await upsertJob(job);
      return NextResponse.json({ ok: true, job });
    }

    try {
      await fs.access(PERF_LOG_PATH);
    } catch {
      return NextResponse.json(
        {
          error:
            "Local pipeline directory is not accessible in cloud serverless runtime. Run backfill/sync from localhost:3000.",
        },
        { status: 400 }
      );
    }

    if (action === "backfill_metrics") {
      const date = String(body.date || "").trim();
      const topic = String(body.topic || "").trim();
      const impressions = Number(body.impressions);
      const comments = Number(body.comments);
      const notes = body.notes ? String(body.notes).trim() : undefined;

      if (
        !date ||
        !topic ||
        !Number.isFinite(impressions) ||
        !Number.isFinite(comments)
      ) {
        return NextResponse.json(
          { error: "date, topic, impressions, and comments are required." },
          { status: 400 }
        );
      }

      const raw = await fs.readFile(PERF_LOG_PATH, "utf8");
      const lines = raw
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      let updated = false;
      const nextLines = lines.map((line) => {
        try {
          const parsed = JSON.parse(line) as Record<string, unknown>;
          if (parsed.date === date && parsed.topic === topic) {
            updated = true;
            return JSON.stringify({
              ...parsed,
              impressions: Math.max(0, Math.round(impressions)),
              comments: Math.max(0, Math.round(comments)),
              ...(notes ? { notes } : {}),
            });
          }
        } catch {
          // keep malformed line untouched
        }
        return line;
      });

      if (!updated) {
        return NextResponse.json(
          { error: "Matching performance-log.jsonl row not found." },
          { status: 404 }
        );
      }

      await fs.writeFile(PERF_LOG_PATH, nextLines.join("\n") + "\n", "utf8");
      await execFileAsync("node", [SYNC_SCRIPT_PATH]);
      return NextResponse.json({ ok: true, updated: true });
    }

    if (action === "sync_snapshot") {
      const { stdout } = await execFileAsync("node", [SYNC_SCRIPT_PATH]);
      return NextResponse.json({ ok: true, message: stdout.trim() });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Ops action error:", error);
    return NextResponse.json({ error: "Failed to execute ops action" }, { status: 500 });
  }
}
