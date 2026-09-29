"use client";

import Link from "next/link";
import { BagIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";
import { useCartHydrated } from "@/features/cart/hooks/useCartHydrated";
import { BottleLoader } from "@/components/ui/BottleLoader";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function CartPage() {
  const { lines, total, quantity, increment, decrement, removeItem } =
    useCart();
  const hydrated = useCartHydrated();
  const { dict, fill } = useI18n();

  if (!hydrated) {
    return <BottleLoader label={dict.cart.opening} />;
  }

  return (
    <section className="px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-14">
      <h1 className="font-serif text-[36px] text-ink sm:text-[44px]">
        {dict.cart.title}
      </h1>
      <p className="mt-1 text-[13px] text-muted">
        {quantity === 0
          ? dict.cart.empty
          : quantity === 1
            ? dict.cart.countOne
            : fill(dict.cart.count, { count: quantity })}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-10">
        <div className="flex flex-col gap-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center gap-4 border border-line bg-surface px-6 py-16 text-center">
              <BagIcon size={28} className="text-gold" />
              <h2 className="font-serif text-[24px] text-ink">
                {dict.cart.emptyTitle}
              </h2>
              <p className="max-w-sm text-[13px] leading-relaxed text-muted">
                {dict.cart.emptyBody}
              </p>
              <Link href={productPaths.list}>
                <Button>{dict.common.browseAll}</Button>
              </Link>
            </div>
          ) : (
            lines.map((line) => (
              <CartItem
                key={line.id}
                line={line}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={removeItem}
              />
            ))
          )}
        </div>

        <CartSummary lines={lines} total={total} quantity={quantity} />
      </div>
    </section>
  );
}
