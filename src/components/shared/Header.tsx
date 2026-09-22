/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";

const NAV_LINKS = [
  { href: productPaths.list, label: "Home", active: true },
  { href: productPaths.list, label: "Shop", active: false },
  { href: productPaths.list, label: "Categories", active: false },
  { href: productPaths.list, label: "The Atelier", active: false },
];

export function Header() {
  return (
    <header className="bg-[#faf8f5] text-[#1a1a1a]">
      <p className="bg-[#1a1a1a] px-4 py-3 text-center text-[10px] font-semibold tracking-[0.08em] text-white uppercase sm:text-[11px]">
        Complimentary signature gift wrapping on all orders above $150
      </p>
      <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-solid border-[#ebe6de] px-4 sm:h-[90px] sm:px-6 md:px-10 lg:px-20">
        <nav className="hidden min-w-0 items-center gap-6 xl:flex xl:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-[13px] font-semibold uppercase"
                  : "text-[13px] font-medium uppercase text-[#605a54]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={productPaths.list}
          className="shrink-0 font-[family-name:var(--font-instrument-serif)] text-[26px] tracking-[0.12em] sm:text-[32px] lg:text-[38px]"
        >
          O D O R A T U S
        </Link>
        <div className="flex min-w-0 items-center justify-end gap-4 sm:gap-6 lg:gap-8">
          <form
            action={productPaths.list}
            className="hidden w-[200px] items-center gap-2 rounded-full border border-solid border-[#ebe6de] px-3 py-2 md:flex"
          >
            <img src="/icons/search.svg" alt="" width={14} height={14} />
            <input
              name="search"
              placeholder="Search fragrances..."
              aria-label="Search fragrances"
              className="w-full bg-transparent text-[12px] text-[#1a1a1a] outline-none placeholder:text-[#605a54]"
            />
          </form>
          <button type="button" aria-label="Account" className="shrink-0">
            <img src="/icons/user.svg" alt="" width={20} height={20} />
          </button>
          <CartNavLink />
        </div>
      </div>
    </header>
  );
}
