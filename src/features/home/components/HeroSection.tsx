"use client";

import Image from "next/image";
import Link from "next/link";
import { heroCtaHref, heroImage } from "@/features/home/home.content";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function HeroSection() {
  const { dict } = useI18n();

  return (
    <section
      className={[
        "relative flex flex-col items-start justify-end overflow-hidden",
        // The design frame is 1440 x 680. Holding that ratio on wide screens
        // keeps the photograph's composition instead of cropping into it.
        "min-h-[440px] sm:min-h-[520px] lg:aspect-[1440/680] lg:min-h-[600px]",
        "px-4 pb-10 sm:px-6 sm:pb-12 md:px-10 lg:px-20 lg:pb-20",
      ].join(" ")}
    >
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
      />

      {/*
        The design's flat wash, plus a bottom scrim. The photograph is light on
        the left, which is exactly where the headline sits, so the scrim is what
        keeps the copy readable at every crop.
      */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#1a1a1a]/25" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#111010]/90 via-[#111010]/55 to-transparent"
      />

      <div className="relative flex w-full max-w-[580px] animate-[fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both] flex-col items-start gap-4 sm:gap-6">
        <h1 className="font-serif text-[38px] leading-none text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-[58px] lg:text-[76px]">
          {dict.home.heroTitle}
        </h1>
        <p className="max-w-[46ch] text-[14px] leading-[1.6] text-white/90 sm:text-[16px]">
          {dict.home.heroBody}
        </p>
        <Link
          href={heroCtaHref}
          className="rounded bg-gold px-8 py-4 text-[12px] font-bold text-[#faf8f5] uppercase transition-all duration-300 hover:bg-[#b8996f] active:scale-[0.99] sm:px-10 sm:py-[18px]"
        >
          {dict.home.heroCta}
        </Link>
      </div>
    </section>
  );
}
