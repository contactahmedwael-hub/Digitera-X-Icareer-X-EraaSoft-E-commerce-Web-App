"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, WhatsAppIcon } from "@/components/icons";
import {
  PHONE_NUMBER,
  RAW_PHONE,
} from "@/features/content/components/contact-profiles";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function AnnouncementBar() {
  const { dict } = useI18n();
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
      className="relative flex items-center justify-between border-b border-gold/15 bg-gradient-to-r from-night via-[#22201e] to-night px-3 py-2 text-on-night transition-colors duration-300 sm:px-8"
    >
      <button
        type="button"
        onClick={prev}
        aria-label="Previous announcement"
        className="flex size-7 items-center justify-center rounded-full text-on-night/50 transition-all hover:bg-gold/15 hover:text-gold focus-visible:outline-none"
      >
        <ChevronLeftIcon size={12} />
      </button>

      <div className="relative mx-3 flex flex-1 items-center justify-center overflow-hidden text-center">
        <div
          key={index}
          className="flex flex-wrap items-center justify-center gap-2 animate-[fade-in_0.35s_cubic-bezier(0.22,1,0.36,1)] text-[11px] font-medium tracking-wider text-on-night uppercase sm:text-[12px]"
        >
          <span className="inline-block size-1.5 rounded-full bg-gold animate-pulse" />
          <span>{items[index]}</span>

          {isWhatsAppItem && (
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 hover:text-emerald-300 transition-all"
            >
              <WhatsAppIcon size={12} />
              <span dir="ltr" className="font-mono text-[11px]">
                {PHONE_NUMBER}
              </span>
            </a>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={next}
        aria-label="Next announcement"
        className="flex size-7 items-center justify-center rounded-full text-on-night/50 transition-all hover:bg-gold/15 hover:text-gold focus-visible:outline-none"
      >
        <ChevronRightIcon size={12} />
      </button>
    </aside>
  );
}
