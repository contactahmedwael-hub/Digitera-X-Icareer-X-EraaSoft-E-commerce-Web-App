import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Header } from "@/components/shared/Header";
import { Providers } from "@/app/providers";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Odoratus",
  description: "An independent olfactory house of slow-luxury fragrances.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#faf8f5] font-[family-name:var(--font-manrope)] text-[#1a1a1a]">
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
