"use client";

import { ChevronDownIcon } from "@/components/icons";
import { useProductSort } from "@/features/products/hooks/useProductSort";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { ProductSort } from "@/features/products/types/product.types";

type ProductSortControlProps = {
  availableCount: number;
  isLoading?: boolean;
};

export function ProductSortControl({
  availableCount,
  isLoading = false,
}: ProductSortControlProps) {
  const { sort, setSort } = useProductSort();
  const { dict, fill } = useI18n();

  const options: Array<{ value: ProductSort; label: string }> = [
    { value: "price-desc", label: dict.listing.sortPriceDesc },
    { value: "price-asc", label: dict.listing.sortPriceAsc },
    { value: "name-asc", label: dict.listing.sortNameAsc },
    { value: "name-desc", label: dict.listing.sortNameDesc },
  ];

  return (
    <div className="flex w-full flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p aria-live="polite" className="text-[12px] text-muted uppercase">
        {isLoading
          ? dict.common.loading
          : availableCount === 1
            ? dict.listing.availableOne
            : fill(dict.listing.available, { count: availableCount })}
      </p>

      <label className="relative flex shrink-0 items-center gap-2">
        <span className="text-[12px] font-semibold whitespace-nowrap text-ink">
          {dict.listing.sortBy}
        </span>
        <select
          aria-label={dict.listing.sortLabel}
          value={sort}
          onChange={(event) => setSort(event.target.value as ProductSort)}
          className="cursor-pointer appearance-none bg-transparent pr-5 text-[12px] font-semibold whitespace-nowrap text-gold outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-gold"
        />
      </label>
    </div>
  );
}
