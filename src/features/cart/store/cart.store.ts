"use client";

import { create } from "zustand";
import type {
  AddToCartInput,
  CartLine,
} from "@/features/cart/types/cart.types";
import { getCartLineId } from "@/features/cart/utils/cart.utils";

type CartStore = {
  lines: CartLine[];
  addItem: (input: AddToCartInput) => void;
  removeItem: (lineId: string) => void;
  increment: (lineId: string) => void;
  decrement: (lineId: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  lines: [],
  addItem: (input) =>
    set((state) => {
      const id = getCartLineId(input.productId, input.selectedOptions);
      const existing = state.lines.find((line) => line.id === id);

      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
          ),
        };
      }

      return {
        lines: [...state.lines, { ...input, id, quantity: 1 }],
      };
    }),
  removeItem: (lineId) =>
    set((state) => ({
      lines: state.lines.filter((line) => line.id !== lineId),
    })),
  increment: (lineId) =>
    set((state) => ({
      lines: state.lines.map((line) =>
        line.id === lineId ? { ...line, quantity: line.quantity + 1 } : line,
      ),
    })),
  decrement: (lineId) =>
    set((state) => ({
      lines: state.lines.flatMap((line) => {
        if (line.id !== lineId) {
          return [line];
        }
        if (line.quantity <= 1) {
          return [];
        }
        return [{ ...line, quantity: line.quantity - 1 }];
      }),
    })),
}));
