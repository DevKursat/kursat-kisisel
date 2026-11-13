import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const MESSAGES_FILE = path.join(process.cwd(), "data", "messages.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, role, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Lütfen gerekli alanları (isim, e-posta, mesaj) doldurun." },
        { status: 400 }
      );
    }

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      role: role || null,
      message: message.trim(),
      read: false,
    };

    // 1. Dosyaya kaydet (Asla kaybolmaz)
    let messages = [];
    try {
      const data = await fs.readFile(MESSAGES_FILE, "utf-8");
      messages = JSON.parse(data);
    } catch {
      // Dosya henüz yoksa oluşturulacak
    }
    messages.unshift(newMessage);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");

    // 2. Eğer Resend API Key varsa doğrudan kursat@itibar.app adresine e-posta yolla
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
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
            subject: `Yeni Portfolio Mesajı: ${newMessage.name} [${newMessage.role || "Genel"}]`,
            text: `İsim: ${newMessage.name}\nE-posta: ${newMessage.email}\nTelefon: ${newMessage.phone || "-"}\nKategori: ${newMessage.role || "-"}\n\nMesaj:\n${newMessage.message}`,
          }),
        });
      } catch (err) {
        console.error("Resend e-posta gönderim hatası:", err);
      }
    }

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
