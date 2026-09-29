"use client";

import { useProductListParams } from "@/features/products/hooks/useProductListParams";

/** US-02: search term lives in the URL. */
export function useProductSearch() {
  const { getValue, setParams } = useProductListParams();

  return {
    search: getValue("search") ?? "",
    setSearch: (value: string) => setParams({ search: value.trim() }),
  };
}
