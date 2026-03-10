import "./globals.css";
import Navbar from "./compnents/Navbar";
import { AirportProvider } from "./context/AppContext";
import { Metadata } from "next";



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
      </body>
    </html>
  );
}
