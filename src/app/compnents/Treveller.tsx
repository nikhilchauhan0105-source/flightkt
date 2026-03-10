import { useState, useRef, useEffect } from "react";
import { useAirport } from "../context/AppContext";

function TravelerClassSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy/Premium Economy");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { traveler, setTraveler } =useAirport();


  // const travelClassMap: { [key: string]: number } = {
  //   "Economy/Premium Economy": 0,
  //   "Premium Economy": 1,
  //   "Business": 2,
  //   "First Class": 3,
  // };

  const travelerdetails = {
    adults: adults,
    children: children,
    infants: infants,
    travelClass: travelClass,
  };




  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalTravelers = adults + children + infants;

  const handleApply = () => {
    setTraveler(travelerdetails);
    setIsOpen(false);
  };

  return (
    <div className="col-span-2   bg-white px-4 py-3 relative" ref={dropdownRef}>
      <label className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1">
        Travellers & Class{" "}
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {/* Clickable area */}
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="font-bold text-xl text-gray-900">
          {totalTravelers}{" "}
          <span className="text-base font-normal">
            Traveller{totalTravelers !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="text-xs text-gray-500">{travelClass}</div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-6 z-50 w-screen max-w-full sm:max-w-175 left-0 sm:left-auto">
          {/* Adults */}
          <div className="mb-6">
            <div className="font-semibold text-black text-sm mb-1">
              ADULTS (12y +)
            </div>
            <div className="text-xs text-gray-500 mb-3">
              on the day of travel
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => setAdults(num)}
                  className={`w-10 h-10 rounded ${
                    adults === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setAdults(Math.max(9, adults))}
                className={`w-10 h-10 rounded ${
                  adults > 9
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                9+
              </button>
            </div>
          </div>

          {/* Children and Infants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Children */}
            <div>
              <div className="font-semibold text-black text-sm mb-1">
                CHILDREN (2y - 12y)
              </div>
              <div className="text-xs text-gray-500 mb-3">
                on the day of travel
              </div>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setChildren(num)}
                    className={`w-10 h-10 rounded ${
                      children === num
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => setChildren(Math.max(6, children))}
                  className={`w-10 h-10 rounded ${
                    children > 6
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  6+
                </button>
              </div>
            </div>

            {/* Infants */}
            <div>
              <div className="font-semibold text-black text-sm mb-1">
                INFANTS (below 2y)
              </div>
              <div className="text-xs text-gray-500 mb-3">
                on the day of travel
              </div>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setInfants(num)}
                    className={`w-10 h-10 rounded ${
                      infants === num
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => setInfants(Math.max(6, infants))}
                  className={`w-10 h-10 rounded ${
                    infants > 6
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  6+
                </button>
              </div>
            </div>
          </div>

          {/* Travel Class */}
          <div className="mb-6">
            <div className="font-semibold text-black text-sm mb-3">
              CHOOSE TRAVEL CLASS
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Economy/Premium Economy",
                "Premium Economy",
                "Business",
                "First Class",
              ].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setTravelClass(cls)}
                  className={`px-3 py-2 text-sm rounded ${
                    travelClass === cls
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex justify-end">
            <button
              onClick={handleApply}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-8 py-2 rounded-full font-medium"
            >
              APPLY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TravelerClassSelector;
