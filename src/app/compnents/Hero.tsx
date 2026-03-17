"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      className={` bg-[url('/clouds.jpg')] bg-cover relative overflow-hidden`}
    >
      {/* Decorative curved shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      {/* Large curved background shape */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[50%] lg:w-[60%] h-1/2 md:h-full">
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
      <div
       
        className="relative   max-w-7xl mx-auto px-6 pt-8 pb-32"
      >
        <div
        data-aos="fade-right"
        className="absolute hidden lg:block  -left-90 z-10">
          <Image
            src="/airplane.png"
            alt="Airplane"
            width={1000}
            height={800}
            className=""
          />
        </div>

        {/* Hero Content */}
        <div className="grid   lg:grid-cols-2 gap-12 items-center mt-12 md:mt-20">
          {/* Left Image Section */}
          <div className="relative order-2 md:order-1">
            {/* Airplane Image with shadow */}
          </div>

          {/* Right Text Section */}
          <div className="order-1 text-white cinzel md:pl-10   mb-8 md:mb-50 mt-5 md:mt-10 md:order-2 text-left md:text-left relative z-10">
            <h1 className=" text-4xl  md:text-5xl drop-shadow-md/50  md:text-6xl font-bold  leading-tight">
              Your Ticket to
              <br />
              <span className="">Explore the World</span>
            </h1>

            <p className="mt-2 md:mt-6  text-base md:leading-relaxed max-w-lg">
              Discover the world at your fingertips. Our flight booking service
              opens doors to global destinations, making travel dreams a reality
              with convenience and ease.
            </p>
          </div>
        </div>

        {/* Floating Search Card */}
      </div>
    </section>
  );
}
