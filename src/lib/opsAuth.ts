import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const OPS_COOKIE_NAME = "ky_ops_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

interface AttemptRecord {
  count: number;
  lockedUntil: number;
}

const loginAttempts = new Map<string, AttemptRecord>();

function getSessionSecret(): string {
  const explicit = process.env.OPS_SESSION_SECRET;
  if (explicit && explicit.length >= 16) return explicit;
  const fallbackSeed = process.env.OPS_PIN_HASH || process.env.OPS_ACCESS_TOKEN || "";
  if (!fallbackSeed) {
    throw new Error("OPS_SESSION_SECRET or OPS_PIN_HASH must be configured.");
  }
  return createHmac("sha256", "ky-ops-session-key").update(fallbackSeed).digest("hex");
}

function safeEqualStrings(aStr: string, bStr: string): boolean {
  const a = Buffer.from(aStr, "utf8");
  const b = Buffer.from(bStr, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "local";
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true, retryAfterSeconds: 0 };

  if (record.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((record.lockedUntil - now) / 1000),
    };
  }

  if (record.lockedUntil > 0 && record.lockedUntil <= now) {
    loginAttempts.delete(ip);
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedAttempt(ip: string): { locked: boolean; remainingAttempts: number } {
  const now = Date.now();
  const current = loginAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  const nextCount = current.count + 1;

  if (nextCount >= MAX_FAILED_ATTEMPTS) {
    loginAttempts.set(ip, { count: nextCount, lockedUntil: now + LOCKOUT_MS });
    return { locked: true, remainingAttempts: 0 };
  }

  loginAttempts.set(ip, { count: nextCount, lockedUntil: 0 });
  return { locked: false, remainingAttempts: MAX_FAILED_ATTEMPTS - nextCount };
}

export function clearFailedAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

export function verifyOpsPin(pin: string): boolean {
  const trimmed = pin.trim();
  if (!trimmed) return false;

  const pinHash = process.env.OPS_PIN_HASH;
  if (pinHash && pinHash.includes(":")) {
    const [salt, expectedHex] = pinHash.split(":");
    if (!salt || !expectedHex) return false;
    const derived = scryptSync(trimmed, salt, 32).toString("hex");
    return safeEqualStrings(derived, expectedHex);
  }

  const legacyToken = process.env.OPS_ACCESS_TOKEN;
  if (legacyToken) {
    return safeEqualStrings(trimmed, legacyToken);
  }

  return false;
}

export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(JSON.stringify({ sub: "kursat", exp }), "utf8").toString("base64url");
  const sig = createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  try {
    const expectedSig = createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
    if (!safeEqualStrings(sig, expectedSig)) return false;

    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      sub?: string;
      exp?: number;
    };
    if (decoded.sub !== "kursat") return false;
    if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifyOpsSyncToken(request: Request): boolean {
  const expected = process.env.OPS_SYNC_SECRET;
  if (!expected) return false;

  const headerToken = request.headers.get("x-ops-sync-token") || "";
  const authHeader = request.headers.get("authorization") || "";
  const bearerToken = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : "";

  const candidate = headerToken || bearerToken;
  if (!candidate) return false;
  return safeEqualStrings(candidate, expected);
}

export async function isOpsAuthenticated(request?: Request): Promise<boolean> {
  if (request && verifyOpsSyncToken(request)) {
    return true;
  }

  if (request) {
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${OPS_COOKIE_NAME}=`));
    if (match) {
      const val = decodeURIComponent(match.slice(OPS_COOKIE_NAME.length + 1));
      if (verifySessionToken(val)) return true;
    }
  }

  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(OPS_COOKIE_NAME)?.value;
    return verifySessionToken(session);
  } catch {
    return false;
  }
}

export function getSessionCookieOptions() {
  return {
    name: OPS_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
