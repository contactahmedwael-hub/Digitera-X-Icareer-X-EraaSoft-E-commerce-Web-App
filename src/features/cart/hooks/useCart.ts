"use client";

import { useCartStore } from "@/features/cart/store/cart.store";
import {
  getCartQuantity,
  getCartTotal,
} from "@/features/cart/utils/cart.utils";

export function useCart() {
  const lines = useCartStore((state) => state.lines);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);

  return {
    lines,
    addItem,
    removeItem,
    increment,
    decrement,
    total: getCartTotal(lines),
    quantity: getCartQuantity(lines),
  };
}
