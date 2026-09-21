"use client";

/**
 * US-02: keep search state close to the products feature.
 * Wire this hook to the listing query and URL params during implementation.
 */
export function useProductSearch(search = "") {
  return {
    search,
    // TODO(US-02): update the listing query / URL when search changes.
    setSearch: (value: string) => {
      void value;
    },
  };
}
