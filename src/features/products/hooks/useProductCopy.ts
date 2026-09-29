"use client";

import {
  archetypeCopy,
  occasionBlurbs,
  productCopy,
  taxonomyCopy,
  type ProductCopy,
} from "@/lib/i18n/dictionaries/products";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Product } from "@/features/products/types/product.types";

/**
 * Product records stay in one canonical shape; only what a customer reads is
 * swapped per locale. English falls back to the record itself.
 */
export function useProductCopy(product: Product): ProductCopy {
  const { locale } = useI18n();
  const translated = productCopy[locale]?.[product.id];

  return (
    translated ?? {
      name: product.name,
      notes: product.notes,
      description: product.description,
      scentNotes: product.scentNotes,
    }
  );
}

export function useProductName(product: Product): string {
  return useProductCopy(product).name;
}

/** Labels for category / scent family / occasion ids. */
export function useTaxonomy() {
  const { locale } = useI18n();
  const copy = taxonomyCopy[locale];

  return {
    category: (id: string) => copy.category[id] ?? id,
    scentFamily: (id: string) => copy.scentFamily[id] ?? id,
    occasion: (id: string) => copy.occasion[id] ?? id,
    archetypeNotes: (id: string) => archetypeCopy[locale][id] ?? "",
    occasionBlurb: (id: string) => occasionBlurbs[locale][id] ?? "",
  };
}
