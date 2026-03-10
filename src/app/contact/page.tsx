"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MessageCircleMore } from "lucide-react";


const contacts = [
  {
    icon: "💬",
    iconBg: "bg-green-500/70",
    title: "WhatsApp Support",
    desc: "Fastest response. Message us anytime — we reply within minutes during business hours.",
    link: "https://wa.me/919630974127",
    linkLabel: "+91 9630974127",
    hoverBorder: "hover:border-green-500/50",
    linkColor: "text-green-400",
    external: true,
  },
  {
    icon: "📞",
    iconBg: "bg-blue-500/70",
    title: "Call Us Directly",
    desc: "Speak with a flight specialist for urgent issues, complex bookings or immediate help.",
    link: "tel:+919630974127",
    linkLabel: "+91 9630974127",
    hoverBorder: "hover:border-blue-400/50",
    linkColor: "text-blue-300",
    external: false,
  },
  {
    icon: "✉️",
    iconBg: "bg-violet-500/70",
    title: "Email Support",
    desc: "For non-urgent queries, documentation and refund requests. Reply within 4–6 hours.",
    link: "mailto:deenutravels777@gmail.com",
    linkLabel: "support@deenutravels.com",
    hoverBorder: "hover:border-violet-400/50",
    linkColor: "text-violet-300",
    external: false,
  },
];

const hours = [
  ["Mon - Fri", "6:00 AM - 11:00 PM", false],
  ["Saturday", "7:00 AM - 9:00 PM", false],
  ["Sunday", "8:00 AM - 6:00 PM", false],
  ["WhatsApp", "24 / 7", true],
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  flightNumber: string;
  bookingRef: string;
  issueType: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  flightNumber: "",
  bookingRef: "",
  issueType: "",
  message: "",
};

export const Page = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // async + await + try/catch/finally — required for "use server" actions
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(false);

  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: `[Support] ${form.issueType || "New Enquiry"} - ${form.firstName} ${form.lastName}`,
        html: `
        <h2 style="font-family:sans-serif;color:#1e6fff;">New Contact Form Submission</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;width:140px;">Name</td><td style="padding:8px;">${form.firstName} ${form.lastName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${form.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${form.phone || "-"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Flight Number</td><td style="padding:8px;">${form.flightNumber || "-"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Booking Ref</td><td style="padding:8px;">${form.bookingRef || "-"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Issue Type</td><td style="padding:8px;">${form.issueType || "-"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${form.message || "-"}</td></tr>
        </table>
        `,
      }),
    });

    if (!res.ok) throw new Error("Email failed");

    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 5000);
  } catch (err) {
    console.error(err);
    setError(true);
  } finally {
    setLoading(false);
  }
};

  const input =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-blue-200/30 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all";

  const label =
    "block text-[14px] font-semibold text-white uppercase tracking-widest mb-2";

  return (
    <div className="relative min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,111,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-full mt-20 mx-auto px-5 sm:px-8">
        <section className="pt-8 pb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
            24/7 Support Active
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.03] tracking-tight max-w-2xl">
            We're here for
            <br />
            every <span className="text-blue-500">flight</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg font-medium max-w-lg leading-relaxed">
            Booking issues, cancellations, delays, baggage - our team is ready
            to help through every step of your journey.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="https://wa.me/919630974127"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-xl text-sm hover:shadow-[0_8px_20px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 transition-all"
            >
              WhatsApp Us Now
            </Link>
            <a
              href="tel:+919630974127"
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              Call Support
            </a>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {contacts.map((c) => (
            <Link
              key={c.title}
              href={c.link}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer" : undefined}
              className={`group block bg-blue-500 hover:bg-blue-600 border border-white/[0.08] hover:shadow-lg/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${c.hoverBorder} no-underline`}
            >
              <div
                className={`w-12 h-12 ${c.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-5`}
              >
                {c.icon}
              </div>
              <h3 className="font-extrabold text-lg text-white tracking-tight mb-2">
                {c.title}
              </h3>
              <p className="leading-relaxed mb-5 font-medium text-white">
                {c.desc}
              </p>
              <div
                className={`font-semibold flex items-center gap-1.5 ${c.linkColor}`}
              >
                {c.linkLabel}
                <span className="group-hover:translate-x-1 transition-transform inline-block"></span>
              </div>
            </Link>
          ))}
        </div>

        <section
          id="contact"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">
              Send us a message
            </h2>
            <p className="text-sm leading-relaxed mb-8 font-light">
              Fill out the form and our team will respond within 2 hours.
            </p>

            <Link
              href="https://wa.me/919630974127"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 bg-green-400 border border-green-500/20 rounded-2xl p-5 mb-6 hover:bg-green-500 hover:border-green-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-green-700/30 rounded-xl flex items-center justify-center text-2xl shrink-0">
                <MessageCircleMore stroke="white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-0.5">
                  Chat on WhatsApp
                </p>
                <p className="text-white text-xs font-light">
                  +91 9630974127 Replies in minutes
                </p>
              </div>
              <span className="text-white text-2xl group-hover:translate-x-1 transition-transform">
                <ArrowRight />
              </span>
            </Link>

            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4">
                Support Hours
              </p>
              {hours.map(([day, time, isGreen]) => (
                <div
                  key={String(day)}
                  className="flex justify-between text-sm py-2.5 border-b border-white/[0.06] last:border-0"
                >
                  <span className="text-black font-medium">{day}</span>
                  <span
                    className={`font-semibold ${isGreen ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-blue-400 border border-white rounded-2xl p-7 flex flex-col gap-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Rahul"
                  className={input}
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={label}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Sharma"
                  className={input}
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className={label}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="rahul@example.com"
                className={input}
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={label}>WhatsApp / Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 00000 00000"
                className={input}
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Flight Number</label>
                <input
                  type="text"
                  name="flightNumber"
                  placeholder="e.g. AI 202"
                  className={input}
                  value={form.flightNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={label}>Booking Ref.</label>
                <input
                  type="text"
                  name="bookingRef"
                  placeholder="e.g. XYZ123"
                  className={input}
                  value={form.bookingRef}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className={label}>Issue Type</label>
              <select
                name="issueType"
                className={input + " cursor-pointer"}
                value={form.issueType}
                onChange={handleChange}
              >
                <option value="" className="bg-[#0d1b3e]">
                  Select issue...
                </option>
                {[
                  "Flight Cancellation",
                  "Flight Delay",
                  "Booking Change",
                  "Baggage Issue",
                  "Refund Request",
                  "Check-in Support",
                  "Upgrade Request",
                  "Other",
                ].map((o) => (
                  <option key={o} className="bg-[#0d1b3e]">
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={label}>Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Describe your issue in detail..."
                className={input + " resize-y"}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl py-4 text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(30,111,255,0.5)] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_18px_rgba(30,111,255,0.35)]"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {submitted && (
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/25 rounded-xl px-4 py-3 text-green-400 text-sm">
                <span>check</span> Message sent! We will reply within 2 hours.
              </div>
            )}

            {error && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-400 text-sm">
                <span>x</span> Something went wrong. Please try WhatsApp or call
                us directly.
              </div>
            )}
          </form>
        </section>

        <footer className="border-t  py-7 flex flex-wrap items-center justify-between gap-4 text-xs  mb-4">
          <span>2025 SkyAssist Flight Support. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:underline transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline transition-colors">
              Terms of Service
            </a>
            <a
              href="https://wa.me/919630974127"
              target="_blank"
              rel="noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Page;
