import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const MESSAGES_FILE = path.join(process.cwd(), "data", "messages.json");
const NTFY_TOPIC = "kursat-li-7f3a91";
const TELEGRAM_BOT_TOKEN = "8852830220:AAHIe0yNdswdq9qYc5mSv4uTtIp_ORpIwvk";
const TELEGRAM_CHAT_ID = "8262872103";

async function notifyTelegramSafe(text: string) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });
  } catch (err) {
    console.error("Telegram notification error:", err);
  }
}

async function appendRecordSafe(record: Record<string, unknown>) {
  try {
    await fs.mkdir(path.dirname(MESSAGES_FILE), { recursive: true });
    let messages: Record<string, unknown>[] = [];
    try {
      const data = await fs.readFile(MESSAGES_FILE, "utf-8");
      messages = JSON.parse(data);
    } catch {
      // File does not exist yet
    }
    messages.unshift(record);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch {
    // Ignore read-only filesystem errors on serverless runtimes (Vercel)
  }
}

async function notifyNtfySafe(title: string, body: string) {
  try {
    const safeTitle = title.replace(/[^\x00-\x7F]/g, "").trim() || "Portfolio Alert";
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: "POST",
      headers: {
        Title: safeTitle,
        Priority: "high",
        Tags: "envelope,sparkles",
      },
      body: Buffer.from(body, "utf8"),
    });
  } catch (err) {
    console.error("ntfy notification error:", err);
  }
}

async function notifyResendSafe(subject: string, text: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["kursat@itibar.app"],
        subject,
        text,
      }),
    });
  } catch (err) {
    console.error("Resend email error:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body?.type === "newsletter") {
      const cleanEmail = typeof body.email === "string" ? body.email.trim() : "";
      if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
        return NextResponse.json(
          { error: "Lütfen geçerli bir e-posta adresi girin." },
          { status: 400 }
        );
      }

      const subscriber = {
        id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        type: "newsletter",
        createdAt: new Date().toISOString(),
        email: cleanEmail,
        source: typeof body.source === "string" ? body.source : "blog",
        lang: typeof body.lang === "string" ? body.lang : "tr",
        read: false,
      };

      await appendRecordSafe(subscriber);

      const summaryText = `Yeni Bulten Abonesi\nE-posta: ${subscriber.email}\nKaynak Yazi: ${subscriber.source}\nDil: ${subscriber.lang}`;
      await Promise.all([
        notifyNtfySafe("New Newsletter Subscriber", summaryText),
        notifyResendSafe(`Yeni Blog Abonesi: ${subscriber.email}`, summaryText),
        notifyTelegramSafe(`📬 Yeni Bülten Abonesi:\n${summaryText}`),
      ]);

      return NextResponse.json({
        success: true,
        subscriberId: subscriber.id,
        receivedAt: subscriber.createdAt,
      });
    }

    const { name, email, phone, role, message } = body ?? {};
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Lütfen gerekli alanları (isim, e-posta, mesaj) doldurun." },
        { status: 400 }
      );
    }

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type: "contact",
      createdAt: new Date().toISOString(),
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      role: role ? String(role) : null,
      message: String(message).trim(),
      read: false,
    };

    await appendRecordSafe(newMessage);

    const textPayload = `İsim: ${newMessage.name}\nE-posta: ${newMessage.email}\nTelefon: ${newMessage.phone || "-"}\nKategori: ${newMessage.role || "-"}\n\nMesaj:\n${newMessage.message}`;
    const isSponsor = /sponsor|kredi|grant|partner|media kit/i.test(String(newMessage.role || ""));
    await Promise.all([
      notifyNtfySafe(
        `New Portfolio Message: ${newMessage.role || "General"}`,
        textPayload
      ),
      notifyResendSafe(
        `Yeni Portfolio Mesajı: ${newMessage.name} [${newMessage.role || "Genel"}]`,
        textPayload
      ),
      notifyTelegramSafe(
        `${isSponsor ? "🤝💼 YENİ SPONSORLUK / PARTNERLİK TALEBİ!" : "📩 Yeni Portfolio İletişim Mesajı:"}\n\n${textPayload}`
      ),
    ]);

    return NextResponse.json({
      success: true,
      messageId: newMessage.id,
      receivedAt: newMessage.createdAt,
    });
  } catch (error) {
    console.error("Contact API hatası:", error);
    return NextResponse.json(
      { error: "Mesaj iletilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

// Gelen mesajları listelemek için GET endpoint'i
export async function GET() {
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    const messages = JSON.parse(data);
    return NextResponse.json({ count: messages.length, messages });
  } catch {
    return NextResponse.json({ count: 0, messages: [] });
  }
}
