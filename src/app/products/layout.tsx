import type { ReactNode } from "react";
import { Instrument_Serif, Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export default function ProductsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${manrope.variable} ${instrumentSerif.variable} min-h-full bg-[#faf8f5] font-[family-name:var(--font-manrope)] text-[#1a1a1a]`}
    >
      {children}
    </div>
  );
}
