import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const key = process.env.WEB3FORMS_KEY;
  if (!key) {
    return NextResponse.json(
      { success: false, message: "Form not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      message.trim().length < 10
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid submission" },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      body: JSON.stringify({
        access_key: key,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        botcheck: "",
        from_name: "Portfolio Website",
      }),
    });

    // Web3Forms (Cloudflare) may return HTML instead of JSON — parse defensively
    const text = await res.text();
    let data: { success?: boolean; message?: string } | null = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Form service is temporarily unreachable — please email its.bilawal33@gmail.com instead.",
        },
        { status: 502 }
      );
    }

    if (!res.ok || !data.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            data.message ||
            "Submission failed — please try again or email directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong — please email its.bilawal33@gmail.com instead.",
      },
      { status: 502 }
    );
  }
}
