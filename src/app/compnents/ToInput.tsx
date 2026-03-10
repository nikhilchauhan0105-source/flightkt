import React, { useState, useRef, useEffect } from "react";
import { useAirport } from "../context/AppContext";

interface Airport {
  airport_name: any;
  state_name: any;
  state_code: any;
  code: string;
  city_name: string;
  name: string;
}

interface AirportDropdownProps {
  airports: Airport[];
}

const ToAirportDropdown: React.FC<AirportDropdownProps> = ({ airports }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { arrivalSelectedAirport, setArrivalSelectedAirport } = useAirport();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAirports = airports.filter((airport: any) =>
    airport.city_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (airport: Airport): void => {
    setArrivalSelectedAirport(airport);
    setIsOpen(false);
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="col-span-3 cursor-pointer hover:bg-blue-300/20 bg-white px-4 py-3 border border-gray-200 relative"
      ref={dropdownRef}
    >
      <label className="text-xs text-gray-500 font-medium block mb-1">To</label>

      {/* Display selected value */}
      <div className="font-bold text-base sm:text-2xl text-gray-900 mb-0.5 w-full bg-transparent ">
        {arrivalSelectedAirport
          ? arrivalSelectedAirport.city_name
          : "Select Airport"}
      </div>

      <div className="text-sm text-gray-500">
        {arrivalSelectedAirport
          ? `${arrivalSelectedAirport.state_code}, ${arrivalSelectedAirport?.airport_name?.substring(0, 35)}...`
          : "Select an airport"}
      </div>

      {/* Dropdown menu with grid layout */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg/50 z-50 w-full max-w-[400px] max-h-[350px] flex flex-col p-6">
          {/* Search Input */}
          <div className="relative mb-4">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-900 placeholder-gray-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Visa Free Destinations */}
          <div className="overflow-y-auto">
            <h3 className="font-bold text-base text-gray-900 mb-3">
              Visa Free Destinations
            </h3>
            {filteredAirports.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {filteredAirports.map((airport: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(airport)}
                    className="px-3 py-2 font-normal text-[14px] whitespace-nowrap overflow-hidden text-ellipsis border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 text-base text-gray-900 transition-all text-center"
                  >
                    {airport.city_name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">
                No destinations found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToAirportDropdown;
