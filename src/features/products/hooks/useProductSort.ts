"use client";

import type { ProductSort } from "@/features/products/types/product.types";

/**
 * US-01: keep sort state close to the products feature.
 * Wire this hook to the listing query and URL params during implementation.
 */
export function useProductSort(sort?: ProductSort) {
  return {
    sort,
    // TODO(US-01): update the listing query / URL when sort changes.
    setSort: (value: ProductSort | undefined) => {
      void value;
    },
  };
}
