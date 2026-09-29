"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { archetypes } from "@/features/home/home.content";
import { useTaxonomy } from "@/features/products/hooks/useProductCopy";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function ScentArchetypes() {
  const { dict } = useI18n();
  const taxonomy = useTaxonomy();

  return (
    <section
      aria-labelledby="archetypes-heading"
      className="flex flex-col gap-8 bg-sand px-4 py-12 sm:gap-10 sm:px-6 md:px-10 lg:gap-12 lg:px-20 lg:py-20"
    >
      <SectionHeader
        id="archetypes-heading"
        title={dict.home.archetypesTitle}
        subtitle={dict.home.archetypesSubtitle}
      />

      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {archetypes.map((tile) => (
          <li key={tile.id}>
            <Link
              href={tile.href}
              className="group relative flex h-[180px] w-full flex-col items-start justify-end overflow-hidden rounded-lg p-4 sm:h-[240px] sm:p-6 lg:h-[280px]"
            >
              <Image
                src={tile.image}
                alt=""
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 23vw, 45vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 to-[#1a1a1a]/20 transition-colors duration-500 group-hover:from-[#1a1a1a]/90"
              />
              <span className="relative flex w-full flex-col gap-1">
                <span className="font-serif text-[20px] text-[#faf8f5] sm:text-[24px] lg:text-[28px]">
                  {taxonomy.scentFamily(tile.id)}
                </span>
                <span className="text-[10px] text-gold uppercase sm:text-[11px]">
                  {taxonomy.archetypeNotes(tile.id)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
