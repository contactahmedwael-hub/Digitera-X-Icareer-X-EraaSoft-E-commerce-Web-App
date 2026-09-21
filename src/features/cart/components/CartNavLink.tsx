"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";

export function CartNavLink() {
  const { quantity } = useCart();

  return (
    <Link href={cartPaths.cart} className="hover:text-zinc-600">
      Cart{quantity > 0 ? ` (${quantity})` : ""}
    </Link>
  );
}
