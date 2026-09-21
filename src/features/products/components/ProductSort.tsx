"use client";

import type { ProductSort } from "@/features/products/types/product.types";

type ProductSortControlProps = {
  value?: ProductSort;
  availableCount: number;
};

const SORT_OPTIONS: Array<{ value: ProductSort; label: string }> = [
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export function ProductSortControl({
  value = "price-desc",
  availableCount,
}: ProductSortControlProps) {
  return (
    <div className="flex w-full flex-col gap-3 border-b border-solid border-[#ebe6de] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-[12px] font-normal uppercase text-[#605a54]">
        {availableCount} fragrances available
      </p>
      <label className="relative flex shrink-0 items-center gap-2">
        <span className="text-[12px] font-semibold whitespace-nowrap text-[#1a1a1a]">
          Sort by:
        </span>
        <select
          aria-label="Sort products"
          defaultValue={value}
          className="cursor-pointer appearance-none bg-transparent pr-5 text-[12px] font-semibold whitespace-nowrap text-[#c5a880] outline-none"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/chevron-down.svg"
          alt=""
          width={14}
          height={14}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
        />
      </label>
    </div>
  );
}
