"use client";

import type {
  Product,
  ProductVariant,
} from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type ProductVariantPickerProps = {
  product: Product;
  selectedVariantId?: string;
  onSelect: (variantId: string) => void;
};

/**
 * US-04: bottle size selection.
 * A native radio group, so arrow keys move between sizes and screen readers
 * announce the selected one.
 */
export function ProductVariantPicker({
  product,
  selectedVariantId,
  onSelect,
}: ProductVariantPickerProps) {
  const { dict } = useI18n();

  if (product.variants.length === 0) {
    return null;
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-[12px] font-bold text-ink uppercase">
        {dict.product.selectVolume}
      </legend>

      <div className="flex gap-3">
        {product.variants.map((variant: ProductVariant) => {
          const selected = variant.id === selectedVariantId;
          const disabled = !variant.inStock;

          return (
            <label
              key={variant.id}
              className={cn(
                "flex flex-1 cursor-pointer flex-col items-center gap-1 rounded bg-surface p-3 text-center",
                "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                selected
                  ? "border-2 border-ink"
                  : "border border-line hover:border-muted",
                disabled && "cursor-not-allowed opacity-40",
              )}
            >
              <input
                type="radio"
                name="product-volume"
                value={variant.id}
                checked={selected}
                disabled={disabled}
                onChange={() => onSelect(variant.id)}
                className="sr-only"
              />
              <span
                className={cn(
                  "text-[14px] text-ink",
                  selected ? "font-bold" : "font-medium",
                )}
              >
                {variant.label}
              </span>
              <span className="text-[11px] text-muted tabular-nums">
                {formatWholePrice(variant.price)}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
