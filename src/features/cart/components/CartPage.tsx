"use client";

import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";

export function CartPage() {
  const { lines, total, quantity, increment, decrement, removeItem } =
    useCart();

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_280px]">
      <div>
        <h1 className="text-3xl font-semibold">Cart</h1>
        <div className="mt-6 space-y-3">
          {lines.length === 0 ? (
            <p className="text-sm text-zinc-600">Your cart is empty.</p>
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
      </div>
      <CartSummary total={total} quantity={quantity} />
    </section>
  );
}
