"use client";

import Link from "next/link";
import { ArrowUpIcon, WhatsAppIcon } from "@/components/icons";
import { useScrolled } from "@/components/shared/useScrolled";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

export function FloatingActions() {
  const { dict } = useI18n();
  const scrolled = useScrolled(250);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      aria-label="Floating quick actions"
      className="fixed right-4 bottom-6 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-8"
    >
      {/* Scroll To Top button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={dict.footer.scrollToTop}
        title={dict.footer.scrollToTop}
        className={cn(
          "flex size-11 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-lg backdrop-blur-md transition-all duration-300",
          "hover:border-gold hover:bg-gold hover:text-night hover:scale-105 active:scale-95",
          scrolled
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none",
        )}
      >
        <ArrowUpIcon size={18} />
      </button>

      {/* Floating Contact Hub button navigating to /contact */}
      <Link
        href="/contact"
        aria-label={dict.footer.contactUs}
        title={dict.footer.contactUs}
        className={cn(
          "group flex items-center gap-2.5 rounded-full border border-gold/30 bg-night/95 px-4 py-2.5 text-on-night shadow-xl backdrop-blur-md transition-all duration-300",
          "hover:border-gold hover:bg-night hover:shadow-gold/20 hover:scale-105 active:scale-95",
        )}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <WhatsAppIcon size={14} />
        </span>
        <span className="text-[12px] font-semibold tracking-wide uppercase transition-colors group-hover:text-gold">
          {dict.footer.contactUs}
        </span>
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
      </Link>
    </aside>
  );
}
