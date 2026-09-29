"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import type { CartLine } from "@/features/cart/types/cart.types";
import {
  countWrappedItems,
  FREE_WRAPPING_THRESHOLD,
  getWrappingFee,
} from "@/features/cart/utils/gift-wrapping";
import { checkoutPaths } from "@/features/checkout";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

type CartSummaryProps = {
  lines: CartLine[];
  total: number;
  quantity: number;
};

export function CartSummary({ lines, total, quantity }: CartSummaryProps) {
  const { dict, fill } = useI18n();
  const empty = quantity === 0;

  const wrapped = countWrappedItems(lines);
  const wrappingFee = getWrappingFee(lines, total);

  return (
    <aside
      aria-labelledby="cart-summary-heading"
      className="h-fit border border-line bg-surface p-5"
    >
      <h2
        id="cart-summary-heading"
        className="text-[11px] font-bold tracking-[0.16em] text-ink uppercase"
      >
        {dict.cart.summary}
      </h2>

      <dl className="mt-5 flex flex-col gap-3 border-b border-line pb-5 text-[13px]">
        <div className="flex items-center justify-between">
          <dt className="text-muted">{dict.cart.items}</dt>
          <dd className="text-ink tabular-nums">{quantity}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted">{dict.cart.subtotal}</dt>
          <dd className="text-ink tabular-nums">${total}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted">{dict.cart.giftWrapping}</dt>
          <dd
            className={
              wrappingFee > 0
                ? "text-ink tabular-nums"
                : "text-end text-success"
            }
          >
            {wrapped === 0
              ? fill(dict.cart.wrappingFrom, {
                  threshold: FREE_WRAPPING_THRESHOLD,
                })
              : wrappingFee > 0
                ? `$${wrappingFee}`
                : dict.cart.complimentary}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between">
        <p className="text-[11px] font-bold tracking-[0.16em] text-ink uppercase">
          {dict.cart.total}
        </p>
        <p
          aria-live="polite"
          className="text-[22px] font-semibold text-ink tabular-nums"
        >
          ${total + wrappingFee}
        </p>
      </div>

      <p className="mt-2 text-[11px] text-muted">{dict.cart.shippingNote}</p>

      {empty ? null : (
        <Link href={checkoutPaths.checkout} className="mt-5 block">
          <Button variant="primary" size="lg" className="w-full">
            {dict.checkout.placeOrder}
            <ArrowRightIcon size={16} className="rtl:-scale-x-100" />
          </Button>
        </Link>
      )}

      <Link href={productPaths.list} className="mt-2.5 block">
        <Button variant="secondary" className="w-full">
          {empty ? dict.common.browseAll : dict.cart.continueShopping}
        </Button>
      </Link>
    </aside>
  );
}
