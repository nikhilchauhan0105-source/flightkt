import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
     <nav className="fixed top-8 z-20  flex max-w-[1280px] w-full absolute left-1/2 -translate-x-1/2 items-center justify-between bg-white/80 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-lg border border-white/20">
             <div className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
               <span className="text-2xl">✈️</span> AirLink
             </div>
   
             <div className="hidden md:flex gap-8 text-gray-700 text-sm font-medium">
               <a href="#" className="hover:text-blue-600 transition">
                 Flight
               </a>
               <a href="#" className="hover:text-blue-600 transition">
                 Train
               </a>
               <a href="#" className="hover:text-blue-600 transition">
                 Bus
               </a>
               <a href="#" className="hover:text-blue-600 transition">
                 Seats
               </a>
               <a href="#" className="hover:text-blue-600 transition">
                 Destinations
               </a>
             </div>
   
             <button className="border-2 border-blue-500 text-blue-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">
               Sign up
             </button>
           </nav>
  );
}
