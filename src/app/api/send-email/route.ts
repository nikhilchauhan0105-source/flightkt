// src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND!);

export async function POST(req: NextRequest) {
  try {
    const { subject, html } = await req.json();

    const result = await resend.emails.send({
      to: "support.ptravels@gmail.com",
      from: "OrcDev <onboarding@resend.dev>",
      subject: subject || "New Enquiry",
      html: html || "<p>No message</p>",
    });

    console.log("Resend result:", result);

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
