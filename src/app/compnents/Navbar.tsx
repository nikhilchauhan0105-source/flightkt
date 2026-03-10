import Image from "next/image";
import Link from "next/link";



export default function Navbar() {
  return (
    <nav className="fixed  z-50  flex  w-full  left-1/2 -translate-x-1/2 items-center justify-between bg-white text-black px-2 sm:px-8 py-2 sm:py-4   shadow-sm/50 md:shadow-lg/40 border border-white/20">
      <div className="flex items-center gap-2 font-semibold ">
        <Link href={"/"}>
          <span className="font-semibold text-2xl">
            <Image src={"/flightkt-logo.jpeg"}
            height={100}
            width={100}
            className=""
            alt=""/>
         
          </span>
        </Link>
      
      </div>

      <div className=" flex gap-8  text-xs md:text-sm font-medium">
        <Link
         href="/contact" className=" text-xs md:text-lg hover:bg-black  hover:text-white  duration-150 hover:shadow-md/50  border border-black/50 rounded-full px-4 py-1.5  transition">
         <button className="cursor-pointer">Customer Support</button>
        </Link>
      </div>

  
    </nav>
  );
}
