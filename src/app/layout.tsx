import "./globals.css";
import Navbar from "./compnents/Navbar";
import { AirportProvider } from "./context/AppContext";
import { Metadata } from "next";
import FooterSection from "./compnents/FooterSection";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <AirportProvider>{children}</AirportProvider>
        <FooterSection/>
      </body>
    </html>
  );
}
