import "./globals.css";
import Navbar from "./compnents/Navbar";
import { AirportProvider } from "./context/AppContext";
import FooterSection from "./compnents/FooterSection";
import AOSProvider from "./AOSProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AOSProvider>
          <Navbar />
          <AirportProvider>{children}</AirportProvider>
          <FooterSection />
        </AOSProvider>
      </body>
    </html>
  );
}
