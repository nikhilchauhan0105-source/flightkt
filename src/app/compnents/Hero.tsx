"use client";

import Image from "next/image";
import { MapPin, Calendar, Search } from "lucide-react";

export default function Hero() {
  return (
    <section
      className={` bg-[url('/clouds.jpg')] bg-cover relative   overflow-hidden`}
    >
      {/* Decorative curved shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      {/* Large curved background shape */}
      <div className="absolute top-0 left-0 w-[60%] h-full">
        <svg
          viewBox="0 0 600 800"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L600,0 Q400,400 600,800 L0,800 Z"
            fill="rgba(147, 197, 253, 0.3)"
          />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-32">
        <div className="absolute  -left-90 z-10">
          <Image
            src="/airplane.png"
            alt="Airplane"
            width={1000}
            height={800}
            className=""
          />
        </div>

        {/* Hero Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
          {/* Left Image Section */}
          <div className="relative order-2 md:order-1">
            {/* Airplane Image with shadow */}
          </div>

          {/* Right Text Section */}
          <div className="order-1 text-white cinzel mb-50 mt-10 md:order-2 text-left md:text-left relative z-10">
            <h1 className="text-5xl  md:text-6xl font-bold  leading-tight">
              Your Ticket to
              <br />
              <span className="">Explore the World</span>
            </h1>

            <p className="mt-6  text-base leading-relaxed max-w-lg">
              Discover the world at your fingertips. Our flight booking service
              opens doors to global destinations, making travel dreams a reality
              with convenience and ease.
            </p>
          </div>
        </div>

        {/* Floating Search Card */}
        <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-16 w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            {/* From Input */}
            <div className="flex items-center gap-3 col-span-2 bg-gray-50 px-4 py-4 rounded-xl border border-gray-200 hover:border-blue-300 transition">
              <MapPin size={20} className="text-gray-600" />
              <div className="flex flex-col flex-1">
                <label className="text-xs text-gray-500 font-medium mb-1">
                  From
                </label>
                <input
                  type="text"
                  placeholder="Pick the location"
                  className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* To Input */}
            <div className="flex items-center gap-3 col-span-2 bg-gray-50 px-4 py-4 rounded-xl border border-gray-200 hover:border-blue-300 transition">
              <MapPin size={20} className="text-gray-600" />
              <div className="flex flex-col flex-1">
                <label className="text-xs text-gray-500 font-medium mb-1">
                  To
                </label>
                <input
                  type="text"
                  placeholder="Pick the location"
                  className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-4 rounded-xl border border-gray-200 hover:border-blue-300 transition">
              <Calendar size={20} className="text-gray-600" />
              <div className="flex flex-col flex-1">
                <label className="text-xs text-gray-500 font-medium mb-1">
                  Departure
                </label>
                <input
                  type="text"
                  placeholder="Pick the date"
                  className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-4 rounded-xl border border-gray-200 hover:border-blue-300 transition">
              <Calendar size={20} className="text-gray-600" />
              <div className="flex flex-col flex-1">
                <label className="text-xs text-gray-500 font-medium mb-1">
                  Return
                </label>
                <input
                  type="text"
                  placeholder="Pick the date"
                  className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-blue-600 text-white px-6 py-4 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
