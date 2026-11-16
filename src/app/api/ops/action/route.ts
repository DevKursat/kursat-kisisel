import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { verifyOpsToken } from "@/lib/opsAuth";

const execFileAsync = promisify(execFile);
const PIPELINE_ROOT = "/Users/kursat/social-pipeline";
const PERF_LOG_PATH = path.join(PIPELINE_ROOT, "data", "performance-log.jsonl");
const SYNC_SCRIPT_PATH = path.join(
  PIPELINE_ROOT,
  "pipeline",
  "sync_ops_snapshot.mjs"
);

export async function POST(request: Request) {
  if (!verifyOpsToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await fs.access(PERF_LOG_PATH);
  } catch {
    return NextResponse.json(
      {
        error:
          "Local pipeline directory is not accessible in cloud serverless runtime. Run backfill/sync from localhost:3000/ops.",
      },
      { status: 400 }
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const action = String(body.action || "");

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
    return NextResponse.json(
      { error: "Failed to execute ops action" },
      { status: 500 }
    );
  }
}
