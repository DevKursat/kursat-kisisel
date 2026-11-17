import { NextResponse } from "next/server";
import {
  checkRateLimit,
  clearFailedAttempts,
  createSessionToken,
  getClientIp,
  getSessionCookieOptions,
  isOpsAuthenticated,
  OPS_COOKIE_NAME,
  recordFailedAttempt,
  verifyOpsPin,
} from "@/lib/opsAuth";

export async function GET(request: Request) {
  const authenticated = await isOpsAuthenticated(request);
  return NextResponse.json(
    { authenticated },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: `Çok fazla hatalı deneme. ${Math.ceil(limit.retryAfterSeconds / 60)} dakika sonra tekrar dene.`,
        retryAfterSeconds: limit.retryAfterSeconds,
      },
      { status: 429 }
    );
  }

  let pin = "";
  try {
    const body = (await request.json()) as { pin?: string };
    pin = String(body.pin || "");
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!verifyOpsPin(pin)) {
    await new Promise((r) => setTimeout(r, 350));
    const attempt = recordFailedAttempt(ip);
    const msg = attempt.locked
      ? "5 hatalı deneme yapıldı. Güvenlik için 15 dakika kilitlendi."
      : `Hatalı şifre. Kalan deneme: ${attempt.remainingAttempts}`;
    return NextResponse.json({ error: msg }, { status: 401 });
  }

  clearFailedAttempts(ip);
  const token = createSessionToken();
  const response = NextResponse.json({ ok: true, authenticated: true });
  response.cookies.set(OPS_COOKIE_NAME, token, getSessionCookieOptions());
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true, authenticated: false });
  response.cookies.set(OPS_COOKIE_NAME, "", {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}
