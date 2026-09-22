/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";

export function CartNavLink() {
  const { quantity } = useCart();

  return (
    <Link
      href={cartPaths.cart}
      className="flex items-center gap-1.5"
      aria-label={`Cart${quantity > 0 ? `, ${quantity} items` : ""}`}
    >
      <img src="/icons/shopping-bag.svg" alt="" width={20} height={20} />
      {quantity > 0 ? (
        <span className="rounded-full bg-[#c5a880] px-1.5 py-0.5 text-[10px] font-bold text-white">
          {quantity}
        </span>
      ) : null}
    </Link>
  );
}
