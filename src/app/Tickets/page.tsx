"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAirport } from "../context/AppContext";
import Link from "next/link";

interface Airport {
  name: string;
  id: string;
  time: string;
}

interface FlightSegment {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  legroom: string;
  extensions: string[];
  ticket_also_sold_by?: string[];
  often_delayed_by_over_30_min?: boolean;
}

interface Layover {
  duration: number;
  name: string;
  id: string;
  overnight?: boolean;
}

interface CarbonEmissions {
  this_flight: number;
  typical_for_this_route: number;
  difference_percent: number;
}

interface Flight {
  flights: FlightSegment[];
  layovers: Layover[];
  total_duration: number;
  carbon_emissions: CarbonEmissions;
  price: number;
  type: string;
  airline_logo: string;
  extensions: string[];
  booking_token: string;
}

const Page = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userDetails, setbookedticket ,bookedticket ,setBookedPrice} = useAirport();

  console.log("bookedticket in page.tsx", bookedticket);

  useEffect(() => {
    async function getFlights() {
      if (!userDetails?.Departurelocation?.airport_code) {
        setError("No search details found.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/flights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        });

        if (!res.ok) throw new Error("Failed to fetch flights");

        const data = await res.json();
        console.log("API response:", data);
        setFlights(data.best_flights || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    getFlights();
  }, [userDetails]);
  console.log("Flights state:", flights);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-lg">Searching flights...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-30 max-w-[1140px] mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Best Available Flights For You
      </h2>
      {flights.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No flights available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-2 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-xl text-gray-900">
                    Flight Option {i + 1}
                  </h3>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{(flight.price * 90.68).toFixed(0)}
                  </span>
                </div>
                <div className="flex gap-6 mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-700">
                      {Math.floor(flight.total_duration / 60)}h{" "}
                      {flight.total_duration % 60}m
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Carbon:</span>
                    <span className="font-medium text-gray-700">
                      {(flight.carbon_emissions.this_flight / 1000).toFixed(0)}
                      kg
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        flight.carbon_emissions.difference_percent < 0
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {flight.carbon_emissions.difference_percent}% vs avg
                    </span>
                  </div>
                </div>
              </div>

              {/* Flight Segments */}
              <div className="p-4 space-y-4">
                {flight.flights.map((segment, j) => (
                  <div key={j} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        {j < flight.flights.length - 1 && (
                          <div className="w-0.5 h-full min-h-[60px] bg-blue-200 my-1"></div>
                        )}
                      </div>

                      <div className="flex-1 pb-4">
                        <p className="font-semibold text-lg mb-10 text-gray-900">
                          {segment.departure_airport.id}{" "}
                          {segment.departure_airport.name}
                        </p>
                        <p className="font-semibold text-lg text-gray-900">
                          {segment.arrival_airport.name}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                          <Image
                            width={30}
                            height={30}
                            alt={segment.airline}
                            src={segment.airline_logo}
                          />
                          <span className="font-medium">
                            {segment.airline} {segment.flight_number}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span>{segment.airplane}</span>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Departs: </span>
                            <span className="font-medium text-gray-700">
                              {segment.departure_airport.time}
                            </span>
                          </div>
                          <span className="text-gray-300">|</span>
                          <div>
                            <span className="text-gray-500">Arrives: </span>
                            <span className="font-medium text-gray-700">
                              {segment.arrival_airport.time}
                            </span>
                          </div>
                        </div>
                        {segment.often_delayed_by_over_30_min && (
                          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-700">
                            <span>⚠️</span>
                            <span>Often delayed 30+ min</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {j < flight.flights.length - 1 && flight.layovers[j] && (
                      <div className="ml-16 -mt-2 mb-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs">
                          <span className="font-medium text-gray-700">
                            Layover at {flight.layovers[j].name}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">
                            {Math.floor(flight.layovers[j].duration / 60)}h{" "}
                            {flight.layovers[j].duration % 60}m
                          </span>
                          {flight.layovers[j].overnight && (
                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                              Overnight
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ✅ Book Now Button — inside each flight card */}
              <div className="px-6 pb-4">
                <Link href="/Tickets/userinfo">
                  <button
                    onClick={() => {
                      setbookedticket(flight.flights);
                      setBookedPrice(flight.price * 90.68); // store INR price
                    }}
                    className="bg-blue-500 px-4 text-base hover:shadow-md/50 cursor-pointer hover:scale-[1.1] transition-all duration-200 py-2 rounded-xl text-white font-medium"
                  >
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
