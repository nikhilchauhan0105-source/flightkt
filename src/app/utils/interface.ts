// ─── Airport ────────────────────────────────────────────────────────────────

export interface Airport {
  id: number;
  name: string;
  iata_code: string;
  city: string;
  country: string;
}

// ─── Flight ─────────────────────────────────────────────────────────────────

export interface Flight {
  passangers: any;
  passanger: any;
  airline: string;
  id: number;
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number; // in minutes
  airplane: string; // e.g. "Airbus A321neo"
  departure_time?: string; // ISO date string
  arrival_time?: string; // ISO date string
  flight_number?: string; // e.g. "AI 302"
  price?: number;
}

// ─── Passenger ──────────────────────────────────────────────────────────────

export interface Passenger {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// ─── Traveler ───────────────────────────────────────────────────────────────

export type TravelClass = "Economy" | "Business" | "First";

export interface Traveler {
  adults: number;
  children: number;
  infants: number;
  travelClass: TravelClass;
}

// ─── Ticket (raw Strapi entry) ───────────────────────────────────────────────

export type TicketStatus = "Confirmed" | "Pending" | "Cancelled";

export interface Ticket {
  id: number;
  documentId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
  flight: Flight[];
  passengers: Passenger[];
  traveler: Traveler;
  status?: TicketStatus;
  seat?: string; // e.g. "14A"
  price?: number;
}

// ─── Strapi Pagination Meta ──────────────────────────────────────────────────

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

// ─── Strapi List Response ────────────────────────────────────────────────────

export interface StrapiListResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

// Convenience alias for the tickets endpoint
export type TicketsResponse = StrapiListResponse<Ticket>;
