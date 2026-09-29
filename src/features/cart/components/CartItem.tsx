"use client";

import Image from "next/image";
import { GiftIcon, TrashIcon } from "@/components/icons";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import type { CartLine } from "@/features/cart/types/cart.types";
import { getLineTotal } from "@/features/cart/utils/cart.utils";
import { productCopy } from "@/lib/i18n/dictionaries/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

type CartItemProps = {
  line: CartLine;
  onIncrement: (lineId: string) => void;
  onDecrement: (lineId: string) => void;
  onRemove: (lineId: string) => void;
};

export function CartItem({
  line,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const { dict, fill, locale } = useI18n();
  // Resolve the name at render time so switching language updates the bag.
  const name = productCopy[locale]?.[line.productId]?.name ?? line.name;

  return (
    <article className="flex flex-col gap-4 border border-line bg-surface p-4 sm:flex-row sm:items-center">
      <div className="relative size-24 shrink-0 overflow-hidden bg-shell">
        {line.image ? (
          <Image
            src={line.image}
            alt={fill(dict.product.bottleAlt, { name })}
            fill
            loading="lazy"
            sizes="96px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h2 className="font-serif text-[20px] text-ink">{name}</h2>
        <p
          dir="ltr"
          className="text-[11px] tracking-[0.12em] text-muted uppercase rtl:text-end"
        >
          {line.variantLabel}
        </p>
        {line.giftWrapping ? (
          <p className="flex items-center gap-1.5 text-[11px] text-gold">
            <GiftIcon size={13} aria-hidden="true" />
            {dict.cart.signatureWrapping}
          </p>
        ) : null}
        <p className="mt-1 text-[13px] text-muted tabular-nums">
          {fill(dict.cart.each, { price: line.unitPrice })}
        </p>
      </div>

      <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
        <QuantityStepper
          value={line.quantity}
          onChange={(next) =>
            next > line.quantity ? onIncrement(line.id) : onDecrement(line.id)
          }
          label={name}
        />
        <p className="text-[15px] font-semibold text-ink tabular-nums">
          ${getLineTotal(line)}
        </p>
        <button
          type="button"
          onClick={() => onRemove(line.id)}
          aria-label={fill(dict.cart.removeLabel, { name })}
          className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted uppercase transition-colors duration-300 hover:text-ink"
        >
          <TrashIcon size={13} />
          {dict.cart.remove}
        </button>
      </div>
    </article>
  );
}
