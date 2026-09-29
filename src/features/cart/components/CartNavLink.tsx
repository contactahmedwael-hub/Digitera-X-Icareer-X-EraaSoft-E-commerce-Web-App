"use client";

import Link from "next/link";
import { BagIcon } from "@/components/icons";
import { useCart } from "@/features/cart/hooks/useCart";
import { useCartHydrated } from "@/features/cart/hooks/useCartHydrated";
import { cartPaths } from "@/features/cart/paths";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function CartNavLink() {
  const { quantity: stored } = useCart();
  const hydrated = useCartHydrated();
  const { dict, fill } = useI18n();
  const quantity = hydrated ? stored : 0;

  return (
    <Link
      href={cartPaths.cart}
      className="flex items-center gap-1.5 text-ink transition-colors duration-300 hover:text-gold"
      aria-label={
        quantity > 0
          ? fill(dict.nav.cartCount, { count: quantity })
          : dict.nav.cartEmpty
      }
    >
      <BagIcon size={20} />
      {quantity > 0 ? (
        <span
          aria-hidden="true"
          className="animate-[scale-in_0.3s_ease-out] rounded-full bg-gold px-1.5 py-0.5 text-[10px] font-bold text-[#faf8f5] tabular-nums"
        >
          {quantity > 99 ? "99+" : quantity}
        </span>
      ) : null}
    </Link>
  );
}
