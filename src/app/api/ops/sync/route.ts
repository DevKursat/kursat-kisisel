import { NextResponse } from "next/server";
import { isOpsAuthenticated } from "@/lib/opsAuth";
import {
  clearOpsTriggers,
  deleteJobsByIds,
  loadOpsStore,
  syncWorkerPayload,
  updateCommentFields,
  updateEmailFields,
  updateJobFields,
  updateSuggestionFields,
  type OpsCommentItem,
  type OpsEmailItem,
  type OpsJobItem,
  type OpsPlatformCard,
  type OpsRadarAction,
  type OpsSuggestionItem,
  type OpsSummaryDoc,
} from "@/lib/opsStore";

export async function GET(request: Request) {
  if (!(await isOpsAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await loadOpsStore();
  return NextResponse.json(
    {
      approvedJobs: store.jobs.filter((j) => j.status === "approved"),
      approvedComments: store.comments.filter((c) => c.status === "approved"),
      approvedEmails: store.emails.filter((e) => e.status === "approved"),
      selectedSuggestions: store.suggestions.filter((s) => s.status === "selected"),
      pendingTriggers: store.summary.pendingTriggers || [],
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  if (!(await isOpsAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      jobs?: OpsJobItem[];
      comments?: OpsCommentItem[];
      emails?: OpsEmailItem[];
      suggestions?: OpsSuggestionItem[];
      radarActions?: OpsRadarAction[];
      contentStats?: Partial<OpsSummaryDoc["contentStats"]>;
      platforms?: OpsPlatformCard[];
      scanTimestamp?: string;
      deleteJobIds?: string[];
      markSentJobIds?: string[];
      markSentCommentIds?: string[];
      markSentEmailIds?: string[];
      markProducedSuggestionIds?: string[];
      clearTriggerIds?: string[];
    };

    if (body.clearTriggerIds?.length) {
      await clearOpsTriggers(body.clearTriggerIds);
    }

    if (body.deleteJobIds?.length) {
      await deleteJobsByIds(body.deleteJobIds);
    }

    for (const jobId of body.markSentJobIds || []) {
      await updateJobFields(jobId, { status: "sent" });
    }

    for (const commentId of body.markSentCommentIds || []) {
      await updateCommentFields(commentId, { status: "sent" });
    }

    for (const emailId of body.markSentEmailIds || []) {
      await updateEmailFields(emailId, { status: "sent" });
    }

    for (const sugId of body.markProducedSuggestionIds || []) {
      await updateSuggestionFields(sugId, { status: "produced" });
    }

    const result = await syncWorkerPayload({
      jobs: body.jobs,
      comments: body.comments,
      emails: body.emails,
      suggestions: body.suggestions,
      radarActions: body.radarActions,
      contentStats: body.contentStats,
      platforms: body.platforms,
      scanTimestamp: body.scanTimestamp,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Ops sync error:", error);
    return NextResponse.json({ error: "Failed to sync ops data" }, { status: 500 });
  }
}
