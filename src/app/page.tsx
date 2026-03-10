"use client";

import FlightDetails from "./compnents/FlightDetails";
import FooterSection from "./compnents/FooterSection";
import Hero from "./compnents/Hero";
import TourPackages from "./compnents/ToursPackages";

// Define TypeScript interfaces

export default function Home() {

  


  return (
    <>
      <Hero />
      <FlightDetails />
      <TourPackages />
      <FooterSection/>
    </>
  );
}
