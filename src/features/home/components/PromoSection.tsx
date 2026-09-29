"use client";

import Image from "next/image";
import Link from "next/link";
import { promoCtaHref, promoImage } from "@/features/home/home.content";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function PromoSection() {
  const { dict } = useI18n();

  return (
    <section
      aria-labelledby="promo-heading"
      className="flex flex-col bg-sand lg:flex-row"
    >
      <div className="relative h-[240px] w-full sm:h-[320px] lg:h-auto lg:min-h-[450px] lg:flex-1">
        <Image
          src={promoImage}
          alt=""
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-start justify-center gap-5 px-4 py-10 sm:gap-6 sm:px-6 sm:py-12 md:px-10 lg:flex-1 lg:p-16">
        <p className="text-[11px] font-bold text-gold uppercase">
          {dict.home.promoEyebrow}
        </p>
        <h2
          id="promo-heading"
          className="font-serif text-[30px] leading-[1.1] text-ink sm:text-[42px] lg:text-[54px]"
        >
          {dict.home.promoTitle}
        </h2>
        <p className="text-[14px] leading-[1.6] text-muted">
          {dict.home.promoBody}
        </p>
        <Link
          href={promoCtaHref}
          className="rounded bg-inverse px-8 py-4 text-[12px] font-bold text-on-inverse uppercase transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
        >
          {dict.home.promoCta}
        </Link>
      </div>
    </section>
  );
}
