"use client";

import { useProductListParams } from "@/features/products/hooks/useProductListParams";

/** US-03: filter state lives in the URL, shared by the whole listing. */
export function useProductFilters() {
  const { getList, getValue, setParams, toggleListValue } =
    useProductListParams();

  return {
    categories: getList("category"),
    scentFamilies: getList("scentFamily"),
    occasions: getList("occasion"),
    minPrice: getValue("minPrice"),
    maxPrice: getValue("maxPrice"),
    toggleCategory: (id: string) => toggleListValue("category", id),
    toggleScentFamily: (id: string) => toggleListValue("scentFamily", id),
    toggleOccasion: (id: string) => toggleListValue("occasion", id),
    setPriceRange: (min?: number, max?: number) =>
      setParams({ minPrice: min, maxPrice: max }),
    clearAll: () =>
      setParams({
        category: [],
        scentFamily: [],
        occasion: [],
        minPrice: undefined,
        maxPrice: undefined,
      }),
  };
}
