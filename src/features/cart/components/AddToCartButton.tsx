"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";

type AddToCartButtonProps = AddToCartInput & {
  className?: string;
  children?: ReactNode;
};

export function AddToCartButton({
  className,
  children = "Add to cart",
  ...item
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400",
        className,
      )}
      onClick={() => addItem(item)}
    >
      {children}
    </button>
  );
}
