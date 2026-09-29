"use client";

import { useProductListParams } from "@/features/products/hooks/useProductListParams";

/** Page navigation for the listing, kept in the URL. */
export function useProductPagination() {
  const { getValue, setParams } = useProductListParams();
  const parsed = Number(getValue("page"));

  return {
    page: Number.isFinite(parsed) && parsed > 0 ? parsed : 1,
    setPage: (page: number) =>
      setParams({ page: page > 1 ? page : undefined }, { resetPage: false }),
  };
}
