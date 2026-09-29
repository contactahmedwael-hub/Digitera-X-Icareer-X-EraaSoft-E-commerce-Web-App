"use client";

import { Badge } from "@/components/ui/Badge";
import {
  useProductCopy,
  useTaxonomy,
} from "@/features/products/hooks/useProductCopy";
import type {
  Product,
  ProductVariant,
} from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type ProductDetailsProps = {
  product: Product;
  variant?: ProductVariant;
};

const statusColor = {
  "in-stock": "text-success",
  "made-to-order": "text-gold",
  "out-of-stock": "text-muted",
} as const;

const dotColor = {
  "in-stock": "bg-success",
  "made-to-order": "bg-gold",
  "out-of-stock": "bg-muted",
} as const;

/** US-04: headline product information for the selected variant. */
export function ProductDetails({ product, variant }: ProductDetailsProps) {
  const { dict, fill } = useI18n();
  const copy = useProductCopy(product);
  const taxonomy = useTaxonomy();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="neutral">
          {fill(dict.product.scentFamilyBadge, {
            value: taxonomy.scentFamily(product.scentFamily),
          })}
        </Badge>
        <Badge tone="muted">
          {fill(dict.product.occasionBadge, {
            value: taxonomy.occasion(product.occasion),
          })}
        </Badge>
      </div>

      <h1 className="font-serif text-[36px] leading-tight text-ink sm:text-[48px]">
        {copy.name}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p
          aria-live="polite"
          className="text-[24px] font-semibold text-ink tabular-nums"
        >
          {formatWholePrice(variant?.price ?? 0)}
        </p>

        <p
          className={cn(
            "flex items-center gap-1.5 text-[13px] font-semibold",
            statusColor[product.availability],
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "size-2 shrink-0 rounded-full",
              dotColor[product.availability],
            )}
          />
          {dict.availability[product.availability]}
        </p>
      </div>
    </div>
  );
}
