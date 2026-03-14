"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Stat {
  id: string;
  value: string;
  label: string;
}

interface Value {
  id: string;
  icon: ReactNode;
  title: string;
  desc: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  bio: string;
}

interface TimelineItem {
  id: string;
  year: string;
  event: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const stats: Stat[] = [
  { id: "stat-destinations", value: "190+", label: "Destinations" },
  { id: "stat-travelers", value: "2M+", label: "Happy Travelers" },
  { id: "stat-airlines", value: "450+", label: "Airline Partners" },
  { id: "stat-support", value: "24/7", label: "Customer Support" },
];

const values: Value[] = [
  {
    id: "value-trust",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    title: "Trust & Transparency",
    desc: "No hidden fees, no surprises. Every fare we show is the fare you pay — we believe honest pricing builds lasting relationships.",
  },
  {
    id: "value-innovation",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Innovation First",
    desc: "From AI-powered price alerts to real-time seat tracking, we push the frontier of travel technology so you can focus on the journey.",
  },
  {
    id: "value-care",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    title: "Traveler Care",
    desc: "Our support team is human, responsive, and genuinely invested in making your travel experience smooth from booking to boarding.",
  },
  {
    id: "value-sustainability",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
    title: "Sustainable Travel",
    desc: "We partner with carbon-offset programs and surface eco-friendly route options so every journey can be a little kinder to the planet.",
  },
];

const team: TeamMember[] = [
  {
    id: "team-aryan",
    name: "Aryan Mehta",
    role: "Co-founder & CEO",
    initials: "AM",
    color: "from-blue-500 to-cyan-400",
    bio: "Former airline ops lead turned tech entrepreneur. Aryan has spent 15 years obsessing over the gap between how travel should feel and how it actually does.",
  },
  {
    id: "team-priya",
    name: "Priya Nair",
    role: "Co-founder & CTO",
    initials: "PN",
    color: "from-sky-500 to-blue-600",
    bio: "Ex-Google engineer and avid solo traveler. Priya built the pricing engine that saves our customers millions in fare differences every year.",
  },
  {
    id: "team-leo",
    name: "Leo Fernandez",
    role: "Head of Design",
    initials: "LF",
    color: "from-blue-400 to-indigo-500",
    bio: "Believes great design is invisible. Leo's team craft experiences that feel effortless — because the best UI is the one you never notice.",
  },
  {
    id: "team-sara",
    name: "Sara Kim",
    role: "Head of Partnerships",
    initials: "SK",
    color: "from-cyan-400 to-sky-500",
    bio: "Negotiated 450+ airline deals across 6 continents. Sara's network is the reason you always find a seat, even on the busiest routes.",
  },
];

const timeline: TimelineItem[] = [
  {
    id: "tl-2018",
    year: "2018",
    event:
      "FlightKT founded in a Mumbai co-working space with 3 people and one big idea.",
  },
  {
    id: "tl-2019",
    year: "2019",
    event:
      "Launched beta to 10,000 early-access travelers. Reached ₹1Cr in bookings within 90 days.",
  },
  {
    id: "tl-2021",
    year: "2021",
    event:
      "Crossed 500K registered users. Expanded to Southeast Asia and the Middle East.",
  },
  {
    id: "tl-2023",
    year: "2023",
    event:
      "Introduced AI price prediction — now saving travelers an average of 18% per booking.",
  },
  {
    id: "tl-2025",
    year: "2025",
    event:
      "2 million travelers and counting. Named one of Asia's fastest-growing travel platforms.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function AnimatedStat({ id, value, label }: Stat): ReactNode {
  return (
    <div id={id} className="text-center group">
      <p className="text-4xl sm:text-5xl font-black text-white tracking-tight group-hover:scale-110 transition-transform duration-300">
        {value}
      </p>
      <p className="text-sky-200 text-sm mt-1 font-medium tracking-widest uppercase">
        {label}
      </p>
    </div>
  );
}

function ValueCard({ id, icon, title, desc }: Value): ReactNode {
  return (
    <div
      id={id}
      className="bg-white rounded-2xl p-7 border border-sky-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 group"
    >
      <div className="w-12 h-12 bg-blue-50 group-hover:bg-primary text-blue-600 group-hover:text-white rounded-xl flex items-center justify-center mb-5 transition-all duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}


interface TimelineRowProps extends TimelineItem {
  index: number;
  total: number;
  isActive: boolean;
  onClick: (id: string) => void;
}

function TimelineRow({
  id,
  year,
  event,
  index,
  total,
  isActive,
  onClick,
}: TimelineRowProps): ReactNode {
  return (
    <div
      id={id}
      className="flex gap-6 cursor-pointer group"
      onClick={() => onClick(id)}
    >
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 border-2 flex-shrink-0
            ${
              isActive
                ? "bg-blue-600 border-blue-600 text-white scale-110 shadow-lg shadow-blue-200"
                : "bg-white border-blue-200 text-blue-400 group-hover:border-blue-400"
            }`}
        >
          {year.slice(2)}
        </div>
        {index < total - 1 && (
          <div
            className={`w-0.5 flex-1 min-h-[40px] transition-colors duration-300 ${isActive ? "bg-blue-400" : "bg-blue-100"}`}
          />
        )}
      </div>
      <div
        className={`pb-8 pt-1.5 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-80"}`}
      >
        <p className="text-blue-500 font-bold text-sm mb-1">{year}</p>
        <p className="text-gray-700 text-base leading-relaxed">{event}</p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage(): ReactNode {
  const [activeTimeline, setActiveTimeline] = useState<string>("tl-2025");

  return (
    <main className="bg-white font-sans overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating plane silhouette */}
        <div className="absolute right-0 top-0 w-full h-full pointer-events-none select-none flex items-center justify-end pr-8 opacity-10">
          <svg viewBox="0 0 800 500" className="w-[700px] h-auto" fill="white">
            <path d="M750 200 L400 250 L80 120 L120 140 L380 240 L360 310 L260 290 L250 310 L380 340 L400 400 L420 340 L520 360 L510 310 L410 290 L420 250 L750 200Z" />
          </svg>
        </div>

        {/* Glowing orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-blue-300/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl w-full mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sky-100 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .527.226 1.028.622 1.376l3.332 2.942a1 1 0 001.338 0l3.332-2.942c.396-.348.622-.849.622-1.376l.002-1.069-2.328-.996a1 1 0 01.788-1.838l4 1.714c.14.06.267.145.356.257l2.644-1.131a1 1 0 000-1.84l-7-3z" />
              </svg>
              Our Story
            </span>

            <h1 className="text-5xl  sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              We exist to make
              <span className="block text-cyan-300"> the world </span>
              feel smaller.
            </h1>

            <p className="text-sky-100 text-lg sm:text-xl leading-relaxed max-w-xl mb-10">
              FlightKT was born from a simple frustration — booking a flight
              shouldn&apos;t require a PhD in fare matrices. We built the
              platform we always wished existed.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                id="hero-cta-search"
                href="#"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3.5 rounded-xl hover:bg-sky-50 transition-colors text-sm shadow-lg shadow-blue-900/20"
              >
                Search Flights
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
              <a
                id="hero-cta-story"
                href="#our-story"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm backdrop-blur-sm"
              >
                Read Our Story
              </a>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full leading-none">
          <svg
            viewBox="0 0 1440 60"
            fill="white"
            preserveAspectRatio="none"
            className="w-full h-12"
          >
            <path d="M0,40 C480,0 960,60 1440,20 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-500 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s: Stat) => (
              <AnimatedStat key={s.id} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section id="our-story" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-3 block">
                Our Mission
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
                Every journey starts with a single click.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">
                We started FlightKT because travel should be liberating, not
                exhausting. The average traveler spends 4+ hours comparing fares
                across a dozen sites — we cut that to under 60 seconds.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Today, two million travelers trust us to find them the best seat
                at the best price, backed by real-time data from over 450
                airline partners worldwide.
              </p>
            
            </div>

            {/* Visual card stack */}
            <div className="relative h-80 lg:h-96">
              <div className="absolute top-6 left-6 right-0 bottom-0 bg-sky-100 rounded-3xl" />
              <div className="absolute top-3 left-3 right-3 bottom-3 bg-blue-200/60 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-sky-400 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-lg">
                      FlightKT
                    </span>
                  </div>
                  <span className="text-sky-200 text-xs font-medium">
                    Since 2018
                  </span>
                </div>

                <div>
                  <p className="text-sky-100 text-xs uppercase tracking-widest mb-1">
                    Top Route This Month
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-white text-2xl font-black">DEL</span>
                    <div className="flex-1 flex items-center gap-1">
                      <div className="h-px flex-1 bg-white/30" />
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      <div className="h-px flex-1 bg-white/30" />
                    </div>
                    <span className="text-white text-2xl font-black">DXB</span>
                  </div>
                  <p className="text-sky-200 text-sm mt-1">
                    Delhi → Dubai • from ₹8,499
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sky-200 text-xs">Avg. Savings</p>
                    <p className="text-white font-bold text-lg">18%</p>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <p className="text-sky-200 text-xs">Bookings Today</p>
                    <p className="text-white font-bold text-lg">3,241</p>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <p className="text-sky-200 text-xs">Live Deals</p>
                    <p className="text-white font-bold text-lg">94</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-sky-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
              What Drives Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
              Our Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v: Value) => (
              <ValueCard key={v.id} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-3 block">
              The Journey
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
              How We Got Here
            </h2>
          </div>
          <div className="flex flex-col gap-0">
            {timeline.map((item: TimelineItem, i: number) => (
              <TimelineRow
                key={item.id}
                {...item}
                index={i}
                total={timeline.length}
                isActive={activeTimeline === item.id}
                onClick={setActiveTimeline}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA Banner ── */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Ready to take off?
          </h2>
          <p className="text-sky-100 text-lg mb-10">
            Join 2 million travelers who trust FlightKT for every journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              id="cta-start-searching"
              href="#"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-sky-50 transition-colors shadow-xl shadow-blue-900/20 text-sm"
            >
              Start Searching
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </a>
            <Link href={"/contact"}
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-sm backdrop-blur-sm"
            >

              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
