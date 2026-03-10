"use client";

import { useEffect, useRef, useState } from "react";
import { getData } from "../utils/strapi";
import { Ticket, TicketStatus, TicketsResponse } from "../utils/interface";

const statusStyles: Record<TicketStatus | "All", string> = {
  All: "bg-gray-100 text-gray-500",
  Confirmed: "bg-[#e6f9f0] text-[#0d7a4e]",
  Pending: "bg-[#fff7e6] text-[#b45309]",
  Cancelled: "bg-[#fdecea] text-[#b91c1c]",
};

export default function FlightAdminPanel() {
  const [search, setSearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<TicketStatus | "All">("All");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [openCardId, setOpenCardId] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getData("tickets").then((res: TicketsResponse) => {
      setTickets(res.data);
    });
  }, []);

  // Close card when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpenCardId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const stats = {
    total: tickets.length,
    confirmed: tickets.filter((t) => t.status === "Confirmed").length,
    pending: tickets.filter((t) => t.status === "Pending").length,
    cancelled: tickets.filter((t) => t.status === "Cancelled").length,
  };

  // ── Filtered + searched rows ───────────────────────────────────────────────
  const filtered = tickets.filter((t) => {
    const flight = t.flight[0];
    const passenger = t.passengers[0];

    const matchesStatus = filterStatus === "All" || t.status === filterStatus;

    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      t.documentId.toLowerCase().includes(q) ||
      `${passenger?.firstName} ${passenger?.lastName}`
        .toLowerCase()
        .includes(q) ||
      flight?.departure_airport?.iata_code?.toLowerCase().includes(q) ||
      flight?.arrival_airport?.iata_code?.toLowerCase().includes(q) ||
      flight?.airplane?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-[#f0f4ff] font-sans">
      <div className="w-full pt-27 mx-auto px-5 py-7">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          {[
            { label: "Total Bookings", value: stats.total, icon: "🎫" },
            { label: "Confirmed", value: stats.confirmed, icon: "✅" },
            { label: "Pending", value: stats.pending, icon: "⏳" },
            { label: "Cancelled", value: stats.cancelled, icon: "❌" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl px-5 py-4 shadow-sm flex items-center gap-3"
            >
              <span className="text-[26px]">{s.icon}</span>
              <div>
                <div className="text-2xl font-extrabold text-[#1a2b6d]">{s.value}</div>
                <div className="text-xs font-semibold text-gray-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Panel */}
        <div className="bg-white rounded-2xl shadow-md">

          {/* Toolbar */}
          <div className="px-6 py-4 border-b flex gap-3 items-center flex-wrap">
            <div className="flex-1 font-extrabold text-[17px] text-[#1a2b6d]">
              Flight Bookings
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍  Search passenger, ID, route..."
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-[240px] bg-gray-50 focus:outline-none"
            />
            {(["All", "Confirmed", "Pending", "Cancelled"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-[7px] rounded-lg text-sm font-semibold transition ${
                  filterStatus === s
                    ? "bg-[#1a2b6d] text-white"
                    : "bg-gray-100 text-gray-500 hover:opacity-80"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8f9fe]">
                  {[
                    "Booked on", "Passenger", "Route", "Airplane",
                    "Airline", "Date", "Travelers", "Class", "Price", "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-5 py-10 text-center text-sm text-gray-400">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((t: Ticket) => {
                    const flight = t.flight[0];
                    const passenger = t.passengers[0];
                    const fullName = passenger
                      ? `${passenger.firstName} ${passenger.lastName}`
                      : "—";
                    const date = t.createdAt
                      ? new Date(t.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—";
                    const travelersCount =
                      (t.traveler?.adults ?? 0) +
                      (t.traveler?.children ?? 0) +
                      (t.traveler?.infants ?? 0);

                    return (
                      <tr
                        key={t.id}
                        className="border-t border-gray-100 hover:bg-[#f8f9fe] transition"
                      >
                        {/* Booked On */}
                        <td className="px-5 py-3 text-sm text-gray-500 whitespace-nowrap">
                          {date}
                        </td>

                        {/* Passenger */}
                        <td className="px-5 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {fullName}
                          {passenger?.email && (
                            <div className="text-xs text-gray-400 font-normal">
                              {passenger.email}
                            </div>
                          )}
                        </td>

                        {/* Route */}
                        <td className="px-5 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                          {flight?.departure_airport?.id ?? "—"}
                          <span className="mx-1 text-gray-400">→</span>
                          {flight?.arrival_airport?.id ?? "—"}
                        </td>

                        {/* Airplane */}
                        <td className="px-5 py-3 text-gray-700 text-sm">
                          {flight?.airplane ?? "—"}
                        </td>

                        {/* Airline */}
                        <td className="px-5 py-3 text-gray-700 text-sm">
                          {flight?.airline ?? "—"}
                        </td>

                        {/* Departure Date */}
                        <td className="px-5 py-3 text-sm whitespace-nowrap">
                          {flight?.departure_time ?? "—"}
                        </td>

                        {/* ── Travelers cell with detail card ── */}
                        <td
                          className="px-5 py-3 text-sm relative text-gray-600 whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {travelersCount > 0 ? (
                            <span
                              onClick={() =>
                                setOpenCardId(openCardId === t.id ? null : t.id)
                              }
                              className="cursor-pointer font-semibold text-[#1a2b6d] hover:underline"
                            >
                              {travelersCount} pax
                            </span>
                          ) : (
                            "—"
                          )}

                          {/* ── Detail Card ── */}
                          {openCardId === t.id && (
                            <div
                              ref={cardRef}
                              className="absolute z-50 left-0 top-full mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
                            >
                              {/* Card Header */}
                              <div className="bg-gradient-to-r from-[#1a2b6d] to-[#3a57d4] px-5 py-4 flex justify-between items-start">
                                <div>
                                  <p className="text-white font-bold text-sm tracking-wide">
                                    Traveler Details
                                  </p>
                                  <div className="flex gap-2 mt-1.5 flex-wrap">
                                    {t.traveler.adults > 0 && (
                                      <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                        👤 {t.traveler.adults} Adults
                                      </span>
                                    )}
                                    {t.traveler.children > 0 && (
                                      <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                        🧒 {t.traveler.children} Children
                                      </span>
                                    )}
                                    {t.traveler.infants > 0 && (
                                      <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                        👶 {t.traveler.infants} Infants
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={() => setOpenCardId(null)}
                                  className="text-white/60 hover:text-white text-base font-bold mt-0.5 leading-none"
                                >
                                  ✕
                                </button>
                              </div>

                              {/* Primary Contact */}
                              <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                  Primary Contact
                                </p>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-base flex-shrink-0">
                                      ✉️
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[10px] text-gray-400 font-medium">Email</p>
                                      <p className="text-xs text-gray-700 font-semibold truncate">
                                        {t.passengers[0]?.email ?? "Not provided"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-base flex-shrink-0">
                                      📞
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-gray-400 font-medium">Phone</p>
                                      <p className="text-xs text-gray-700 font-semibold">
                                        {t.passengers[0]?.phone ?? "Not provided"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Passengers List */}
                              <div className="px-5 py-4 max-h-56 overflow-y-auto">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                  Passengers ({t.passengers.length})
                                </p>
                                <div className="space-y-2.5">
                                  {t.passengers.length > 0 ? (
                                    t.passengers.map((p, i) => (
                                      <div
                                        key={p.id}
                                        className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                                      >
                                        {/* Avatar */}
                                        <div className="w-8 h-8 rounded-full bg-[#1a2b6d] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                          {p.firstName?.[0]?.toUpperCase() ?? i + 1}
                                        </div>
                                        {/* Details */}
                                        <div className="min-w-0 flex-1">
                                          <p className="text-sm font-bold text-gray-800">
                                            {p.firstName} {p.lastName}
                                          </p>
                                          {p.email && (
                                            <p className="text-[11px] text-gray-400 truncate mt-0.5">
                                              ✉️ {p.email}
                                            </p>
                                          )}
                                          {p.phone && (
                                            <p className="text-[11px] text-gray-400 mt-0.5">
                                              📞 {p.phone}
                                            </p>
                                          )}
                                        
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-xs text-gray-400 italic text-center py-4">
                                      No passenger details available
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Travel Class */}
                        <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                          {t.traveler?.travelClass ?? "—"}
                        </td>

                        {/* Price */}
                        <td className="px-5 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap">
                          {t.price != null
                            ? `₹${t.price.toLocaleString("en-IN")}`
                            : "—"}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-3 whitespace-nowrap">
                          {t.status ? (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[t.status]}`}
                            >
                              {t.status}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
