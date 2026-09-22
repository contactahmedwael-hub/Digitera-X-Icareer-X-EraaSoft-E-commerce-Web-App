/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { productPaths } from "@/features/products";

const COLUMNS = [
  {
    title: "Collections",
    links: ["La Maison", "Private Reserve", "Scented Candles", "Discovery Sets"],
  },
  {
    title: "Customer Care",
    links: [
      "Olfactory Consultation",
      "Shipping & Returns",
      "Atelier Appointments",
      "Care Guide",
    ],
  },
  {
    title: "About Us",
    links: [
      "Our Philosophy",
      "Sourcing Standards",
      "Sustainability Commitments",
      "Journal",
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] px-4 pt-16 pb-10 text-white sm:px-6 md:px-10 lg:px-20 lg:pt-20 lg:pb-10">
      <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-8">
        <div className="flex max-w-[400px] flex-col gap-6">
          <Link
            href={productPaths.list}
            className="font-[family-name:var(--font-instrument-serif)] text-[32px] tracking-[0.12em] lg:text-[40px]"
          >
            O D O R A T U S
          </Link>
          <p className="text-[14px] leading-[1.6] text-[#f2ede4]/80">
            An independent olfactory house cultivating slow-luxury liquid
            narratives. Every bottle is hand-poured in small batches using
            sustainably sourced botanicals.
          </p>
          <div className="flex gap-4">
            {[
              { src: "/icons/instagram.svg", label: "Instagram" },
              { src: "/icons/circle-x.svg", label: "X" },
              { src: "/icons/facebook.svg", label: "Facebook" },
            ].map((social) => (
              <span
                key={social.label}
                className="flex rounded-full bg-white/10 p-2"
                aria-label={social.label}
              >
                <img src={social.src} alt="" width={16} height={16} />
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12 lg:gap-20">
          {COLUMNS.map((column) => (
            <div key={column.title} className="flex w-full max-w-[180px] flex-col gap-5">
              <p className="text-[12px] font-bold uppercase text-[#c5a880]">
                {column.title}
              </p>
              {column.links.map((link) => (
                <p key={link} className="text-[13px] text-white/70">
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-6">
        <div className="h-px w-full bg-white/13" />
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[12px] text-white/50">
            © 2026 Odoratus. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[11px] uppercase text-white/40">
              Secured checkout via
            </p>
            {["visa", "mastercard", "amex"].map((method) => (
              <span
                key={method}
                className="rounded border border-solid border-white/13 px-2 py-1 text-[9px] font-semibold uppercase text-white/60"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
