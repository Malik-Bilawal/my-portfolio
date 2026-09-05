import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = RATE_LIMIT.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  RATE_LIMIT.set(ip, recent);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
    }

    const emailUser = process.env.CONTACT_EMAIL;
    const emailPass = process.env.CONTACT_EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        { error: "Email not configured. Env vars missing." },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass.replace(/\s/g, ""),
      },
    });

    // Verify connection first
    try {
      await transporter.verify();
    } catch (verifyErr: unknown) {
      const msg = verifyErr instanceof Error ? verifyErr.message : "Unknown verify error";
      console.error("SMTP verify failed:", msg);
      return NextResponse.json(
        { error: "Email connection failed. Check credentials. Details: " + msg },
        { status: 500 }
      );
    }

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00f0ff;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #1e1e2e;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #111118; padding: 16px; border-radius: 8px; border-left: 3px solid #00f0ff;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
          <hr style="border: 1px solid #1e1e2e;" />
          <p style="color: #666; font-size: 12px;">Sent from Muhammad Bilawal's Portfolio</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Contact form error:", msg);
    return NextResponse.json({ error: "Failed: " + msg }, { status: 500 });
  }
}
