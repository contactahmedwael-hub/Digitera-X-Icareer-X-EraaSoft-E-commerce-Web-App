"use client";

import Image from "next/image";
import type { CartLine } from "@/features/cart";
import {
  FREE_WRAPPING_THRESHOLD,
  countWrappedItems,
  getWrappingFee,
} from "@/features/cart/utils/gift-wrapping";
import {
  FREE_SHIPPING_THRESHOLD,
  getShippingFee,
} from "@/features/checkout/utils/order";
import { productCopy } from "@/lib/i18n/dictionaries/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

type OrderSummaryPanelProps = {
  lines: CartLine[];
  subtotal: number;
  children?: React.ReactNode;
};

/** The priced breakdown, shared by the checkout form and the confirmation. */
export function OrderSummaryPanel({
  lines,
  subtotal,
  children,
}: OrderSummaryPanelProps) {
  const { dict, fill, locale } = useI18n();
  const shipping = getShippingFee(subtotal);
  const wrapped = countWrappedItems(lines);
  const wrapping = getWrappingFee(lines, subtotal);

  return (
    <aside
      aria-labelledby="order-summary-heading"
      className="h-fit rounded border border-line bg-surface p-5"
    >
      <h2
        id="order-summary-heading"
        className="text-[11px] font-bold tracking-[0.16em] text-ink uppercase"
      >
        {dict.checkout.summaryHeading}
      </h2>

      <ul className="mt-5 flex flex-col gap-3 border-b border-line pb-5">
        {lines.map((line) => {
          // Resolved at render time so switching language updates the list.
          const name = productCopy[locale]?.[line.productId]?.name ?? line.name;

          return (
            <li key={line.id} className="flex items-center gap-3">
              <span className="relative size-12 shrink-0 overflow-hidden rounded bg-shell">
                {line.image ? (
                  <Image
                    src={line.image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                ) : null}
                <span className="absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full bg-inverse text-[10px] font-bold text-on-inverse tabular-nums">
                  {line.quantity}
                </span>
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] text-ink">
                  {name}
                </span>
                <span
                  dir="ltr"
                  className="block text-[11px] text-muted rtl:text-end"
                >
                  {line.variantLabel}
                </span>
              </span>

              <span className="shrink-0 text-[13px] text-ink tabular-nums">
                ${line.unitPrice * line.quantity}
              </span>
            </li>
          );
        })}
      </ul>

      <dl className="mt-5 flex flex-col gap-3 border-b border-line pb-5 text-[13px]">
        <div className="flex items-center justify-between">
          <dt className="text-muted">{dict.checkout.subtotal}</dt>
          <dd className="text-ink tabular-nums">${subtotal}</dd>
        </div>
        {wrapped > 0 ? (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">{dict.cart.giftWrapping}</dt>
            <dd
              className={
                wrapping > 0 ? "text-ink tabular-nums" : "text-success"
              }
            >
              {wrapping > 0 ? `$${wrapping}` : dict.cart.complimentary}
            </dd>
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <dt className="text-muted">{dict.checkout.shipping}</dt>
          <dd
            className={
              shipping === 0 ? "text-success" : "text-ink tabular-nums"
            }
          >
            {shipping === 0 ? dict.checkout.freeShipping : `$${shipping}`}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between">
        <p className="text-[11px] font-bold tracking-[0.16em] text-ink uppercase">
          {dict.checkout.total}
        </p>
        <p
          aria-live="polite"
          className="text-[22px] font-semibold text-ink tabular-nums"
        >
          ${subtotal + shipping + wrapping}
        </p>
      </div>

      {shipping > 0 ? (
        <p className="mt-2 text-[11px] text-muted">
          {fill(dict.checkout.shippingNote, {
            threshold: FREE_SHIPPING_THRESHOLD,
          })}
        </p>
      ) : null}

      {wrapping > 0 ? (
        <p className="mt-1 text-[11px] text-muted">
          {fill(dict.cart.wrappingFrom, { threshold: FREE_WRAPPING_THRESHOLD })}
        </p>
      ) : null}

      {children}
    </aside>
  );
}
