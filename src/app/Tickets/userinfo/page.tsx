"use client";
import { useState } from "react";
import { useAirport } from "../../context/AppContext";
import Link from "next/link";
import { postData } from "../../utils/strapi";


interface PassengerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  passportNumber: string;
  nationality: string;
}

export default function PassengerInfoPage() {
  const { bookedticket, traveler, bookedPrice } = useAirport();
  const price = bookedPrice?.toFixed(2) || "0.00";
  console.log("price",price);
  

  const handleSubmit = async (e:any) => {
   e.preventDefault();
    const bookingData = {
      flight: bookedticket,
      traveler: traveler,
      passengers: passengers,
      price: price,
    };

    alert("Booking data to be sent to Strapi")
    // console.log(" final data ", bookingData);

  
    const res = await postData("tickets", bookingData);
    console.log("Booking saved to Strapi:", res);
    // await addDoc(collection(db, "bookings"), {
    //   flight: bookedticket,
    //   traveler: traveler,
    //   passengers: passengers,
    // });
  };

  // ✅ Build passenger list based on traveler counts
  const totalPassengers =
    traveler.adults + traveler.children + traveler.infants;

  const getPassengerLabel = (index: number) => {
    if (index < traveler.adults) return `Adult ${index + 1}`;
    if (index < traveler.adults + traveler.children)
      return `Child ${index - traveler.adults + 1}`;
    return `Infant ${index - traveler.adults - traveler.children + 1}`;
  };

  const emptyPassenger = (): PassengerData => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    passportNumber: "",
    nationality: "",
  });

  const [passengers, setPassengers] = useState<PassengerData[]>(
    Array.from({ length: totalPassengers }, emptyPassenger),
  );

  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (index: number, e: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setPassengers(updated);
  };



  const inputBase =
    "w-full bg-transparent border-b-2 py-3 px-1 text-slate-800 placeholder-slate-400 outline-none transition-colors duration-200 text-sm font-medium ";

  const inputClass = (name: string) =>
    `${inputBase} ${
      focused === name
        ? "border-amber-500"
        : "border-slate-300 hover:border-slate-400"
    }`;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-serif">
      {/* Dotted grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 opacity-5 rounded-full blur-3xl pointer-events-none" />

      {/* Main */}
      <main className="max-w-full mt-25 mx-auto px-4 md:px-6 pb-20 relative z-10">
        {/* Flight Summary */}
        <div className="flex items-center justify-between bg-blue-500 border border-white/10 backdrop-blur-md rounded-xl px-6 py-4 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-white text-lg font-sans tracking-wider">
              {bookedticket?.[0]?.departure_airport?.id || ""}
            </span>
            <div className="flex flex-col items-center gap-1">
              <div className="w-20 h-px bg-amber-500/50 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-amber-400 text-xs">
                  ✈
                </span>
              </div>
              <span className=" text-black quicksand  tracking-widest">
                {((bookedticket?.[0]?.duration ?? 0)/60).toFixed(1)} Hr
              </span>
            </div>
            <span className="text-white text-lg font-sans tracking-wider">
              {bookedticket?.[0]?.arrival_airport?.id || ""}
            </span>
          </div>
          <span className="text-white   font-medium text-xl  hidden sm:block">
            Traveler Class{" "}
            {parseInt(traveler.travelClass) === 1
              ? "Economy"
              : parseInt(traveler.travelClass) === 2
                ? "Business"
                : "First Class"}
          </span>
          <span className="text-amber-400 text-lg font-bold font-sans"></span>
        </div>

        {/* ✅ One card per passenger */}
        <form onSubmit={handleSubmit}>
          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="bg-white quicksand rounded-2xl overflow-hidden shadow-md/50 mb-6"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-8 md:px-10 py-7 flex items-center justify-between">
                <div>
                  <p className="text-amber-400 text-xs tracking-widest font-sans mb-2">
                    PASSENGER {index + 1} —{" "}
                    {getPassengerLabel(index).toUpperCase()}
                  </p>
                  <h1 className="text-white text-2xl quicksand font-normal tracking-tight">
                    Who's travelling?
                  </h1>
                </div>
                <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-2xl">
                  👤
                </div>
              </div>

              {/* Form Fields */}
              <div className="px-8 md:px-10 py-9">
                {/* Personal Info */}
                <p className="text-xs text-slate-400 quicksand   mb-6 flex items-center gap-3">
                  <span className="w-6 h-px bg-amber-500   inline-block" />
                  PERSONAL INFORMATION
                  <span className="w-6 h-px bg-amber-500 inline-block" />
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-8 mb-10">
                  <div>
                    <label className="block text-xs text-slate-400 tracking-widest mb-2">
                      FIRST NAME *
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      placeholder="e.g. Arjun"
                      value={passenger.firstName}
                      onChange={(e) => handleChange(index, e)}
                      onFocus={() => setFocused(`firstName-${index}`)}
                      onBlur={() => setFocused("")}
                      className={inputClass(`firstName-${index}`)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 tracking-widest mb-2">
                      LAST NAME *
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      required
                      placeholder="e.g. Sharma"
                      value={passenger.lastName}
                      onChange={(e) => handleChange(index, e)}
                      onFocus={() => setFocused(`lastName-${index}`)}
                      onBlur={() => setFocused("")}
                      className={inputClass(`lastName-${index}`)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 tracking-widest mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="arjun@example.com"
                      value={passenger.email}
                      onChange={(e) => handleChange(index, e)}
                      onFocus={() => setFocused(`email-${index}`)}
                      onBlur={() => setFocused("")}
                      className={inputClass(`email-${index}`)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400  mb-2">
                      PHONE NUMBER *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={passenger.phone}
                      onChange={(e) => handleChange(index, e)}
                      onFocus={() => setFocused(`phone-${index}`)}
                      onBlur={() => setFocused("")}
                      className={inputClass(`phone-${index}`)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 tracking-widest mb-2">
                      DATE OF BIRTH *
                    </label>
                    <input
                      name="dob"
                      type="date"
                      required
                      value={passenger.dob}
                      onChange={(e) => handleChange(index, e)}
                      onFocus={() => setFocused(`dob-${index}`)}
                      onBlur={() => setFocused("")}
                      className={inputClass(`dob-${index}`)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 tracking-widest mb-2">
                      GENDER *
                    </label>
                    <select
                      name="gender"
                      required
                      value={passenger.gender}
                      onChange={(e) => handleChange(index, e)}
                      onFocus={() => setFocused(`gender-${index}`)}
                      onBlur={() => setFocused("")}
                      className={`${inputClass(`gender-${index}`)} cursor-pointer appearance-none`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other / Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />

                {/* Travel Document */}
                <p className="text-xs text-slate-400 tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-6 h-px bg-amber-500 inline-block" />
                  TRAVEL DOCUMENT
                  <span className="w-6 h-px bg-amber-500 inline-block" />
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-8 mb-9">
                  <div>
                    <label className="block text-xs text-slate-400 tracking-widest mb-2">
                      PASSPORT / ID NUMBER
                    </label>
                    <input
                      name="passportNumber"
                      type="text"
                      placeholder="A1234567"
                      value={passenger.passportNumber}
                      onChange={(e) => handleChange(index, e)}
                      onFocus={() => setFocused(`passportNumber-${index}`)}
                      onBlur={() => setFocused("")}
                      className={inputClass(`passportNumber-${index}`)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 tracking-widest mb-2">
                      NATIONALITY
                    </label>
                    <input
                      name="nationality"
                      type="text"
                      placeholder="Indian"
                      value={passenger.nationality}
                      onChange={(e) => handleChange(index, e)}
                      onFocus={() => setFocused(`nationality-${index}`)}
                      onBlur={() => setFocused("")}
                      className={inputClass(`nationality-${index}`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Consent — once at the bottom */}
          <div className="bg-white rounded-2xl px-8 md:px-10 py-7 shadow-md/50 mb-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                required
                className="mt-0.5 w-4 h-4 accent-amber-500 cursor-pointer shrink-0"
              />
              <label
                htmlFor="consent"
                className="text-xs text-slate-500 leading-relaxed font-sans cursor-pointer"
              >
                I confirm that the above details match my travel document and I
                agree to{" "}
                <span className="text-amber-600 hover:underline cursor-pointer">
                  Flight KT's Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-amber-600 hover:underline cursor-pointer">
                  Privacy Policy
                </span>
                .
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Link href={"/Tickets"}>
              <button
                type="button"
                className="text-slate-400 hover:text-white text-xs tracking-widest font-sans transition-colors"
              >
                ← BACK TO FLIGHTS
              </button>
            </Link>
            <button
              type="submit"
              className={`px-10 py-4 rounded-xl font-bold font-sans text-xs tracking-widest transition-all duration-300
                ${
                  submitted
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-95"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/30 hover:-translate-y-0.5 active:scale-95"
                }`}
            >
              {submitted ? "✓  SAVED!" : "CONTINUE TO PAYMENT →"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
