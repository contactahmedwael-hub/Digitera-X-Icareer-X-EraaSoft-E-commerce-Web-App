import { carePages as careAr } from "@/features/content/data/ar/care";
import { housePages as houseAr } from "@/features/content/data/ar/house";
import { legalPages as legalAr } from "@/features/content/data/ar/legal";
import { carePages as careEn } from "@/features/content/data/en/care";
import { housePages as houseEn } from "@/features/content/data/en/house";
import { legalPages as legalEn } from "@/features/content/data/en/legal";
import type {
  ContentPage,
  ContentSlug,
} from "@/features/content/types/content.types";
import type { Locale } from "@/lib/i18n/locale";

const pages: Record<Locale, ContentPage[]> = {
  en: [...careEn, ...houseEn, ...legalEn],
  ar: [...careAr, ...houseAr, ...legalAr],
};

export function getContentPage(
  slug: string,
  locale: Locale,
): ContentPage | undefined {
  return pages[locale].find((page) => page.slug === slug);
}

/** Every slug that has a page, used to pre-render the route. */
export const contentSlugs: ContentSlug[] = pages.en.map((page) => page.slug);
