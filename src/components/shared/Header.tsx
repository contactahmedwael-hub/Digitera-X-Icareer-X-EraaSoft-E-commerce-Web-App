"use client";

import { useState } from "react";
import Link from "next/link";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { AnnouncementBar } from "@/components/shared/AnnouncementBar";
import { AccountMenu } from "@/components/shared/AccountMenu";
import { HeaderNav } from "@/components/shared/HeaderNav";
import { HeaderSearch } from "@/components/shared/HeaderSearch";
import { SearchOverlay } from "@/components/shared/SearchOverlay";
import { LocaleToggle } from "@/components/shared/LocaleToggle";
import { MobileAccountLinks } from "@/components/shared/MobileAccountLinks";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { usePrimaryNav } from "@/components/shared/navigation";
import { useScrolled } from "@/components/shared/useScrolled";
import { CartNavLink } from "@/features/cart";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

const iconButton =
  "flex size-8 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-shell hover:text-gold sm:size-9";

export function Header() {
  const { dict } = useI18n();
  const nav = usePrimaryNav();
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      {/* The announcement slides away once the visitor starts reading. */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100",
        )}
      >
        <AnnouncementBar />
      </div>

      <div
        className={cn(
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "px-3 pt-3 sm:px-5" : "px-0 pt-0",
        )}
      >
        <div
          className={cn(
            "flex h-[64px] w-full items-center justify-between gap-1 px-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "sm:gap-3 sm:px-6 md:px-8 lg:h-[90px] lg:gap-4 lg:px-20",
            scrolled
              ? "rounded-2xl border border-line bg-page/90 shadow-[0_10px_40px_-24px_rgba(26,26,26,0.5)] backdrop-blur-md lg:px-10"
              : "rounded-none border-b border-line bg-page",
          )}
        >
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(iconButton, "lg:hidden")}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <HeaderNav nav={nav} />

          <Link
            href="/"
            className={cn(
              "shrink-0 font-serif whitespace-nowrap text-ink transition-all duration-500 hover:opacity-70",
              scrolled
                ? "text-[15px] sm:text-[22px] lg:text-[28px]"
                : "text-[16px] sm:text-[24px] lg:text-[38px]",
            )}
          >
            {dict.common.brand}
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-0.5 sm:gap-2">
            <HeaderSearch className="hidden xl:flex" />
            <SearchOverlay className={cn(iconButton, "xl:hidden")} />
            <LocaleToggle className={iconButton} />
            <ThemeToggle className={iconButton} />
            <AccountMenu className={cn(iconButton, "hidden sm:flex")} />
            <CartNavLink />
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="primary-navigation"
          className="mx-3 mt-2 rounded-2xl border border-line bg-surface px-4 py-4 shadow-[0_10px_40px_-24px_rgba(26,26,26,0.5)] sm:mx-5 lg:hidden"
        >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line py-3 text-[13px] font-medium text-ink uppercase transition-colors last:border-0 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <HeaderSearch className="mt-4 w-full" />
        <MobileAccountLinks onNavigate={() => setMenuOpen(false)} />
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-muted uppercase"
        >
          <CloseIcon size={14} />
          {dict.nav.closeMenu}
        </button>
      </div>
      ) : null}
    </header>
  );
}