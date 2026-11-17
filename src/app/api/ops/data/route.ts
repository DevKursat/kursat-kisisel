import { NextResponse } from "next/server";
import { isOpsAuthenticated } from "@/lib/opsAuth";
import { loadOpsStore } from "@/lib/opsStore";
import { collectOpsTelemetry } from "@/lib/opsTelemetry";

export async function GET(request: Request) {
  if (!(await isOpsAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [store, telemetry] = await Promise.all([
      loadOpsStore(),
      collectOpsTelemetry(),
    ]);

    return NextResponse.json(
      { store, telemetry },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Ops unified data error:", error);
    return NextResponse.json(
      { error: "Failed to load ops data" },
      { status: 500 }
    );
  }
}
