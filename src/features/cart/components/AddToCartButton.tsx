"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";

type AddToCartButtonProps = AddToCartInput;

export function AddToCartButton(props: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button onClick={() => addItem(props)}>Add to cart</Button>
  );
}
