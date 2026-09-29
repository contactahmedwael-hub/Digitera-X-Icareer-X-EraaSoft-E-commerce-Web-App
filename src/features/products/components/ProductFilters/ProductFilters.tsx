"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { FilterBlock } from "@/features/products/components/ProductFilters/FilterBlock";
import {
  CATEGORIES,
  OCCASIONS,
  SCENT_FAMILIES,
} from "@/features/products/components/ProductFilters/filter-options";
import { PriceRangeFilter } from "@/features/products/components/ProductFilters/PriceRangeFilter";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { useTaxonomy } from "@/features/products/hooks/useProductCopy";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

/** US-03: every filter writes to the URL, so the listing stays shareable. */
export function ProductFilters() {
  const [open, setOpen] = useState(false);
  const filters = useProductFilters();
  const { dict, fill } = useI18n();
  const taxonomy = useTaxonomy();

  const selectedCount =
    filters.categories.length +
    filters.scentFamilies.length +
    filters.occasions.length +
    (filters.minPrice || filters.maxPrice ? 1 : 0);

  return (
    <aside
      aria-label={dict.listing.filtersPanel}
      className="w-full shrink-0 lg:w-[260px]"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between border border-line bg-surface px-4 py-3 text-[12px] font-semibold text-ink uppercase lg:hidden"
        aria-expanded={open}
        aria-controls="product-filter-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <span>
          {dict.listing.filters}
          {selectedCount > 0 ? ` (${selectedCount})` : ""}
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            "transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id="product-filter-panel"
        className={cn(
          "flex-col items-start gap-8",
          open ? "mt-6 flex" : "hidden",
          "lg:mt-0 lg:flex",
        )}
      >
        {selectedCount > 0 ? (
          <button
            type="button"
            onClick={filters.clearAll}
            className="text-[11px] font-semibold tracking-wide text-gold uppercase transition-colors hover:text-ink"
          >
            {fill(dict.listing.clearAll, { count: selectedCount })}
          </button>
        ) : null}

        <FilterBlock
          title={dict.listing.category}
          options={CATEGORIES.map((o) => ({
            ...o,
            label: taxonomy.category(o.id),
          }))}
          selected={filters.categories}
          tone="gold"
          onToggle={filters.toggleCategory}
        />
        <div className="h-px w-full bg-line" />

        <FilterBlock
          title={dict.listing.scentFamily}
          options={SCENT_FAMILIES.map((o) => ({
            ...o,
            label: taxonomy.scentFamily(o.id),
          }))}
          selected={filters.scentFamilies}
          tone="ink"
          onToggle={filters.toggleScentFamily}
        />
        <div className="h-px w-full bg-line" />

        <FilterBlock
          title={dict.listing.occasion}
          options={OCCASIONS.map((o) => ({
            ...o,
            label: taxonomy.occasion(o.id),
          }))}
          selected={filters.occasions}
          tone="ink"
          onToggle={filters.toggleOccasion}
        />
        <div className="h-px w-full bg-line" />

        <PriceRangeFilter
          min={filters.minPrice}
          max={filters.maxPrice}
          onCommit={filters.setPriceRange}
        />
      </div>
    </aside>
  );
}
