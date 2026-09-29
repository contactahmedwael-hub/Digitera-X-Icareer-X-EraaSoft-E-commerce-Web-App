"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { NavLink } from "@/components/shared/navigation";
import { cn } from "@/lib/utils/cn";

export function HeaderNav({ nav }: { nav: NavLink[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  function isLinkActive(link: NavLink): boolean {
    if (link.key === "home") {
      return pathname === "/";
    }

    // "shop" (المتجر) is ONLY active on /products if no specific subcategory is selected
    if (link.key === "shop") {
      return (
        pathname === "/products" &&
        (!currentCategory || currentCategory === "")
      );
    }

    // "categories" (التصنيفات) is active when category query is pure-extractions
    if (link.key === "categories") {
      return (
        pathname === "/products" &&
        currentCategory === "pure-extractions"
      );
    }

    // "atelier" (الأتيليه) is active when category query is atelier-oils
    if (link.key === "atelier") {
      return (
        pathname === "/products" &&
        currentCategory === "atelier-oils"
      );
    }

    return false;
  }

  return (
    <nav aria-label="Primary" className="hidden flex-1 items-center gap-2 lg:flex">
      {nav.map((link) => {
        const active = isLinkActive(link);

        return (
          <Link
            key={link.key}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center px-4 py-2 text-[13px] font-medium tracking-[0.12em] whitespace-nowrap uppercase transition-all duration-300",
              "rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold",
              active
                ? "font-semibold text-ink bg-line/50 dark:bg-line/70 shadow-xs"
                : "text-muted hover:text-ink hover:bg-shell/40 dark:hover:bg-shell/20",
            )}
          >
            <span>{link.label}</span>
            {active && (
              <span
                aria-hidden="true"
                className="absolute bottom-1.5 left-4 right-4 h-[2px] rounded-full bg-gold shadow-[0_0_10px_rgba(197,168,128,0.7)] animate-[fade-in_0.25s_ease-out]"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
