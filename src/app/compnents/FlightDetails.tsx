"use client";

import { useEffect, useState } from "react";
import AirportDropdown from "./FromInput";
import ToAirportDropdown from "./ToInput";
import TravelerClassSelector from "./Treveller";
import { ChevronDown } from "lucide-react";
import { useAirport, UserDetails } from "../context/AppContext";
import Link from "next/link";

export const FlightDetails = () => {
  const radio = ["OneWay", "Round Trip", "Multi City"];

  const [airports, setAirports] = useState([]);

  // If your backend is running on port 3000, 8000, 5000, etc.
  useEffect(() => {
    const API_URL = "https://aerokey-api.vercel.app/v1/airports";

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setAirports(data.airports);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const { ticketType, setTicketType } = useAirport();
  const { departureSelectedAirport, arrivalSelectedAirport } = useAirport();
  const { departureDate, setDepartureDate } = useAirport();
  const { returnDate, setReturnDate } = useAirport();
  const { traveler } = useAirport();
  // console.log(traveler);
  
  const { setUserDetails } = useAirport();


const handleasearch = () => {
  const UserDetails: UserDetails = {

    Departurelocation: departureSelectedAirport,
    Arrivallocation: arrivalSelectedAirport,
    DepartureDate: departureDate,
    ReturnDate: returnDate,
    traveler: traveler,
  };

  setUserDetails(UserDetails); 
};
  

  return (
    <>
      {" "}
      <section className="  relative px-3">
        <div
        data-aos="fade-up"
          className=" w-full max-w-7xl relative z-20 m-auto -mt-40 shadow-md/50 md:shadow-lg/50 bg-white  rounded-2xl p-4 border border-gray-100"
        >
          {/* Trip Type Options */}
          <div className=" flex items-center gap-6 mb-6">
            {radio.map((obj, i) => (
              <label
                key={i}
                className="flex  items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="tripType"
                  value={obj}
                  onChange={(e) => setTicketType(e.target.value)}
                  defaultChecked
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
                <span className="text-[9px] sm:text-base font-semibold text-gray-800">
                  {obj}
                </span>
              </label>
            ))}
          </div>
          <div className="ml-auto text-md text-gray-600 font-medium">
            Book International and Domestic Flights
          </div>
          {/* Main Search Grid */}
          <div className="grid grid-cols-1 rounded-2xl  lg:grid-cols-12 gap-0 items-stretch border border-gray-200 rounded-lg ">
            {/* From Input */}
            <AirportDropdown airports={airports} />

            {/* To Input */}
            <ToAirportDropdown airports={airports} />
            {/* Departure Date */}
            <div className="col-span-2 bg-white px-4 py-3 border-r border-gray-200">
              <label className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1">
                Departure <ChevronDown size={10} />
              </label>
              <input
                type="date"
                onChange={(e) => setDepartureDate(e.target.value)}
                value={departureDate ?? ""}
                min={new Date().toISOString().split("T")[0]}
                className="font-bold  text-base sm:text-xl text-gray-900 border-none outline-none bg-transparent cursor-pointer w-full"
              />
              <div className="text-xs text-gray-500">Tuesday</div>
            </div>
            {/* Return Date */}
            {ticketType === "Round Trip" ? (
              <div className="col-span-2 bg-white px-4 py-3 border-r border-gray-200">
                <label className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1">
                  Return <ChevronDown size={10} />
                </label>
                <input
                  type="date"
                  onChange={(e) =>
                    ticketType === "Round Trip" && setReturnDate(e.target.value)
                  }
                  value={returnDate ?? ""}
                  min={new Date().toISOString().split("T")[0]}
                  className="font-bold text-xl text-gray-900 border-none outline-none bg-transparent cursor-pointer w-full"
                />
                <div className="text-xs text-gray-500">Tap to add a date</div>
              </div>
            ) : (
              ""
            )}
            {/* Travellers & Class */}
            <TravelerClassSelector />
          </div>

          {/* Search Button */}
          <div className="mt-2 flex w-full justify-center">
            <Link className="w-full" href={"/Tickets"}>
              <button
                onClick={() => handleasearch()}
                className="bg-primary w-full hover:bg-blue-700 hover:shadow-md/50 cursor-pointer transition-all duration-150 text-white sm:px-20 py-1 sm:py-2 rounded-full text-lg font-bold shadow-lg "
              >
                SEARCH
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlightDetails;
