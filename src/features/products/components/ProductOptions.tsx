"use client";

import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductOptionsProps = {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionId: string, value: string) => void;
};

/** US-04: selectable product options. */
export function ProductOptions({
  product,
  selectedOptions,
  onChange,
}: ProductOptionsProps) {
  const selectedVolume = selectedOptions.volume;

  return (
    <div className="space-y-6">
      {product.volumes.length > 0 ? (
        <div className="flex w-full flex-col gap-3">
          <p className="text-[12px] font-bold uppercase">Select Volume</p>
          <div className="grid grid-cols-3 gap-3">
            {product.volumes.map((volume) => {
              const selected = selectedVolume === volume.label;

              return (
                <button
                  key={volume.label}
                  type="button"
                  onClick={() => onChange("volume", volume.label)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded border border-solid px-2 py-3",
                    selected
                      ? "border-2 border-[#1a1a1a] bg-white"
                      : "border-[#ebe6de] bg-transparent",
                  )}
                >
                  <span
                    className={cn(
                      "text-[14px]",
                      selected ? "font-bold" : "font-medium",
                    )}
                  >
                    {volume.label}
                  </span>
                  <span className="text-[11px] text-[#605a54]">
                    {formatWholePrice(volume.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      {product.options.map((option) => (
        <label key={option.id} className="block">
          <span className="mb-1 block text-sm font-medium">{option.name}</span>
          <Select
            value={selectedOptions[option.id] ?? option.values[0]}
            onChange={(event) => onChange(option.id, event.target.value)}
          >
            {option.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </label>
      ))}
    </div>
  );
}
