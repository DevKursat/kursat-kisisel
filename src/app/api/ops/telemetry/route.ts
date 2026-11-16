import { NextResponse } from "next/server";
import { verifyOpsToken } from "@/lib/opsAuth";
import { collectOpsTelemetry } from "@/lib/opsTelemetry";

export async function GET(request: Request) {
  if (!verifyOpsToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await collectOpsTelemetry();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Ops telemetry error:", error);
    return NextResponse.json(
      { error: "Failed to collect ops telemetry" },
      { status: 500 }
    );
  }
}
