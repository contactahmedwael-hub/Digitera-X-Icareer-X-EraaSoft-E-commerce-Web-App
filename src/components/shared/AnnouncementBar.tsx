"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, WhatsAppIcon } from "@/components/icons";
import {
  PHONE_NUMBER,
  RAW_PHONE,
} from "@/features/content/components/contact-profiles";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function AnnouncementBar() {
  const { dict, dir } = useI18n();
  const items = dict.nav.announcements || [dict.nav.announcement];
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  function prev() {
    setIndex((curr) => (curr - 1 + items.length) % items.length);
  }

  function next() {
    setIndex((curr) => (curr + 1) % items.length);
  }

  const isWhatsAppItem = index === 2;
  const whatsAppHref = `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(
    dict.footer.whatsAppGreeting,
  )}`;

  return (
    <aside
      aria-label="Store Announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      dir="ltr"
      className="border-b border-gold/15 bg-gradient-to-r from-night via-[#22201e] to-night px-2 py-1.5 text-on-night sm:px-8"
    >
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous announcement"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-on-night/50 transition-all hover:bg-gold/15 hover:text-gold focus-visible:outline-none"
        >
          <ChevronLeftIcon size={12} />
        </button>

        <p
          key={index}
          dir={dir}
          className="min-w-0 flex-1 text-center text-[10px] font-medium leading-snug tracking-wide text-on-night uppercase animate-[fade-in_0.35s_cubic-bezier(0.22,1,0.36,1)] sm:text-[12px] sm:tracking-wider"
        >
          {items[index]}
        </p>

        <button
          type="button"
          onClick={next}
          aria-label="Next announcement"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-on-night/50 transition-all hover:bg-gold/15 hover:text-gold focus-visible:outline-none"
        >
          <ChevronRightIcon size={12} />
        </button>
      </div>

      {isWhatsAppItem ? (
        <div className="mt-0 flex justify-center">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-[12px] font-semibold text-emerald-400 transition-all hover:bg-emerald-500/30 hover:text-emerald-300 sm:text-[13px]"
          >
            <WhatsAppIcon size={14} />
            <span dir="ltr" className="whitespace-nowrap font-mono tracking-wide">
              {PHONE_NUMBER}
            </span>
          </a>
        </div>
      ) : null}
    </aside>
  );
}