"use client";

import { useProductListParams } from "@/features/products/hooks/useProductListParams";
import type { ProductSort } from "@/features/products/types/product.types";

/** US-01: sort state lives in the URL so the listing stays shareable. */
export function useProductSort(fallback: ProductSort = "price-desc") {
  const { getValue, setParams } = useProductListParams();
  const sort = (getValue("sort") as ProductSort | undefined) ?? fallback;

  return {
    sort,
    setSort: (value: ProductSort) => setParams({ sort: value }),
  };
}
