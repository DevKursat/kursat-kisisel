import { timingSafeEqual } from "node:crypto";

export function getExpectedOpsToken(): string {
  return process.env.OPS_ACCESS_TOKEN || "kursat-ops-2026";
}

export function verifyOpsToken(request: Request): boolean {
  const expected = getExpectedOpsToken();
  const headerToken = request.headers.get("x-ops-token") || "";
  const authHeader = request.headers.get("authorization") || "";
  const bearerToken = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : "";

  const url = new URL(request.url);
  const queryToken = url.searchParams.get("token") || "";

  const candidate = headerToken || bearerToken || queryToken;
  if (!candidate) return false;

  const a = Buffer.from(candidate, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
