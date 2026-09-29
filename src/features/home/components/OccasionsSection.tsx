"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { occasions } from "@/features/home/home.content";
import { useTaxonomy } from "@/features/products/hooks/useProductCopy";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function OccasionsSection() {
  const { dict } = useI18n();
  const taxonomy = useTaxonomy();

  return (
    <section
      aria-labelledby="occasions-heading"
      className="flex flex-col gap-8 px-4 py-12 sm:gap-10 sm:px-6 md:px-10 lg:gap-12 lg:px-20 lg:py-[100px]"
    >
      <SectionHeader
        id="occasions-heading"
        title={dict.home.occasionsTitle}
        subtitle={dict.home.occasionsSubtitle}
      />

      <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {occasions.map((card) => (
          <li key={card.id}>
            <Link
              href={card.href}
              className="group flex flex-col gap-3 sm:gap-4"
            >
              <span className="relative block h-[160px] w-full overflow-hidden rounded-md sm:h-[200px] lg:h-[240px]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-serif text-[18px] text-ink transition-colors duration-300 group-hover:text-gold sm:text-[24px]">
                  {taxonomy.occasion(card.id)}
                </span>
                <span className="text-[12px] text-muted sm:text-[13px]">
                  {taxonomy.occasionBlurb(card.id)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
