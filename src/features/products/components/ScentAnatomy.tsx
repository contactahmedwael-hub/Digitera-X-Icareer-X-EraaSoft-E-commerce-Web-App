"use client";

import { useProductCopy } from "@/features/products/hooks/useProductCopy";
import type { Product } from "@/features/products/types/product.types";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ScentAnatomyProps = {
  product: Product;
};

/** US-04: the fragrance pyramid, described note by note. */
export function ScentAnatomy({ product }: ScentAnatomyProps) {
  const { dict, locale } = useI18n();
  const copy = useProductCopy(product);

  // Arabic separates a list with a different comma than English does.
  const separator = locale === "ar" ? "، " : ", ";

  const rows = [
    { key: "top", label: dict.product.topNotes },
    { key: "heart", label: dict.product.heartNotes },
    { key: "base", label: dict.product.baseNotes },
  ] as const;

  return (
    <section
      aria-labelledby="scent-anatomy-heading"
      className="flex flex-col gap-5"
    >
      <h2
        id="scent-anatomy-heading"
        className="font-serif text-[32px] text-ink"
      >
        {dict.product.scentAnatomy}
      </h2>

      <p className="text-[14px] leading-[1.6] text-muted">{copy.description}</p>

      <dl className="flex flex-col gap-3">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex flex-col gap-1 border-b border-line py-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
          >
            <dt className="text-[12px] font-bold text-ink uppercase">
              {row.label}
            </dt>
            <dd className="text-[13px] text-muted sm:text-end">
              {copy.scentNotes[row.key].join(separator)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
