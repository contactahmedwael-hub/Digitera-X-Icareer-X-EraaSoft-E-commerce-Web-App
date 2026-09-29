"use client";

import { useEffect, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { useProductSearch } from "@/features/products/hooks/useProductSearch";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** US-02: debounced search that writes the term into the listing URL. */
export function ProductSearch() {
  const { search, setSearch } = useProductSearch();
  const { dict } = useI18n();
  const [term, setTerm] = useState(search);

  useEffect(() => {
    if (term === search) {
      return;
    }

    const timeout = setTimeout(() => setSearch(term), 350);
    return () => clearTimeout(timeout);
  }, [term, search, setSearch]);

  return (
    <div className="flex w-full items-center gap-2 border border-line bg-surface px-3 py-2 transition-colors focus-within:border-gold">
      <SearchIcon className="shrink-0 text-muted" />
      <label htmlFor="product-search" className="sr-only">
        {dict.nav.searchLabel}
      </label>
      <input
        id="product-search"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder={dict.nav.searchPlaceholder}
        className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
      />
    </div>
  );
}
