"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface SelectedAirport {
  airport_code?: string; // ✅ added - was missing!
  airport_name?: string;
  airport_type?: string;
  city_name?: string;
  state_code?: string;
  state_name?: string;
  pincode?: string;
  daily_travelers?: number;
}

interface Traveler {
  // ✅ proper interface instead of object
  adults: number;
  children: number;
  infants: number;
  travelClass: string; // ✅ fixed typo "infaints" → "infants"
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

export interface UserDetails {
  Departurelocation: SelectedAirport | null;
  Arrivallocation: SelectedAirport | null;
  DepartureDate: string | null;
  ReturnDate: string | null;
  traveler: Traveler;
}



interface FlightSegment {
  departure_airport: {
    // ✅ ADD THIS
    name: string;
    id: string;
    time: string;
  };
  arrival_airport: {
    // ✅ ADD THIS
    name: string;
    id: string;
    time: string;
  };
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

interface price {
  price: number;
}


interface AirportContextType {
  departureSelectedAirport: SelectedAirport | null;
  setDepartureSelectedAirport: (airport: SelectedAirport | null) => void;
  arrivalSelectedAirport: SelectedAirport | null;
  setArrivalSelectedAirport: (airport: SelectedAirport | null) => void;
  departureDate: string | null;
  setDepartureDate: (date: string | null) => void;
  returnDate: string | null;
  setReturnDate: (date: string | null) => void;
  traveler: Traveler; // ✅ typed, never null
  setTraveler: (traveler: Traveler) => void;
  userDetails: UserDetails | null;
  setUserDetails: (userdetails: UserDetails | null) => void;
  ticketType: string | null;
  setTicketType: (tickettype: string | null) => void;
  bookedticket: Array<FlightSegment> | null;
  setbookedticket: (bookedticked: Array<FlightSegment> | null) => void;
  bookedflights: Flight[];
  setbookedFlights: (flights: Flight[]) => void;
  bookedPrice: number | null;
  setBookedPrice: (price: number | null) => void;
}

const AirportContext = createContext<AirportContextType | undefined>(undefined);

const defaultTraveler: Traveler = {
  // ✅ default values, never null
  adults: 1,
  children: 0,
  infants: 0,
  travelClass: "Economy/Premium Economy",
};

export function AirportProvider({ children }: { children: ReactNode }) {
  const [departureSelectedAirport, setDepartureSelectedAirport] =
    useState<SelectedAirport | null>(null);
  const [arrivalSelectedAirport, setArrivalSelectedAirport] =
    useState<SelectedAirport | null>(null);
  const [departureDate, setDepartureDate] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [traveler, setTraveler] = useState<Traveler>(defaultTraveler); // ✅ never null
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [ticketType, setTicketType] = useState<string | null>(null);
  const [bookedticket, setbookedticket] = useState<Array<FlightSegment> | null>( null,);
  const [bookedflights, setbookedFlights] = useState<Flight[]>([]);
  const [bookedPrice, setBookedPrice] = useState<number | null>(null);

  return (
    <AirportContext.Provider
      value={{
        departureSelectedAirport,
        setDepartureSelectedAirport,
        arrivalSelectedAirport,
        setArrivalSelectedAirport,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        traveler,
        setTraveler,
        userDetails,
        setUserDetails,
        ticketType,
        setTicketType,
        bookedticket,
        setbookedticket,
        bookedflights,
        setbookedFlights,
        bookedPrice,
        setBookedPrice,
      }}
    >
      {children}
    </AirportContext.Provider>
  );
}

export function useAirport() {
  const context = useContext(AirportContext);
  if (!context) {
    throw new Error("useAirport must be used within AirportProvider");
  }
  return context;
}
