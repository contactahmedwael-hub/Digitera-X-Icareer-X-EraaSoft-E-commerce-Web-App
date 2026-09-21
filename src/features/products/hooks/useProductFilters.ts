"use client";

/**
 * US-03: keep filter state close to the products feature.
 * Wire this hook to the listing query and URL params during implementation.
 */
export function useProductFilters(category?: string) {
  return {
    category,
    // TODO(US-03): update the listing query / URL when filters change.
    setCategory: (value: string | undefined) => {
      void value;
    },
  };
}
