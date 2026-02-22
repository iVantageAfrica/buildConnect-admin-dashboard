import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Sans, Inter, Poppins } from "next/font/google";
import { Providers } from "@/libs/providers";


const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Build Connect",
  description: "Powered by iVantage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${poppins.variable} ${inter.variable} antialiased`}
      >
                <Providers>  {children}</Providers>
     
      </body>
    </html>
  );
}