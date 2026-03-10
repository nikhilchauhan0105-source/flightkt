import { NextResponse } from "next/server";
export const runtime = "nodejs"; 

export async function POST(request: Request) {
  const userDetails = await request.json();

  const departure_id = userDetails?.Departurelocation?.airport_code;
  const arrival_id = userDetails?.Arrivallocation?.airport_code;
  const outbound_date = userDetails?.DepartureDate;
  const return_date = userDetails?.ReturnDate;
  const adults = userDetails?.traveler?.adults ?? 1;
  const children = userDetails?.traveler?.children ?? 0;
  const infants = userDetails?.traveler?.infants ?? 0;

  // ✅ fix - travelClass 0 is invalid, default to 1 (Economy)
  const raw_class = userDetails?.traveler?.travelClass;
  const travel_class = raw_class && raw_class > 0 ? raw_class : 1;

  if (!departure_id || !arrival_id || !outbound_date) {
    return NextResponse.json(
      { error: "Missing fields", departure_id, arrival_id, outbound_date },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    engine: "google_flights",
    departure_id,
    arrival_id,
    outbound_date,
    type: return_date ? "1" : "2",
    adults: String(adults),
    children: String(children),
    infants_in_seat: String(infants),
    travel_class: String(travel_class), // ✅ always 1, 2, 3, or 4
    currency: "USD",
    api_key: process.env.SERP_API_KEY!,
  });

  if (return_date) params.append("return_date", return_date);

  const response = await fetch(
    `https://serpapi.com/search.json?${params.toString()}`,
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: "SerpAPI failed", details: data },
      { status: response.status },
    );
  }

  return NextResponse.json(data);
}
