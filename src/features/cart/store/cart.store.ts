"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AddToCartInput,
  CartLine,
} from "@/features/cart/types/cart.types";
import { getCartLineId } from "@/features/cart/utils/cart.utils";

const MAX_QUANTITY = 99;

type CartStore = {
  lines: CartLine[];
  addItem: (input: AddToCartInput) => void;
  removeItem: (lineId: string) => void;
  increment: (lineId: string) => void;
  decrement: (lineId: string) => void;
  clear: () => void;
};

function clampQuantity(value: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, value));
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      lines: [],

      addItem: ({ quantity = 1, ...input }) =>
        set((state) => {
          const id = getCartLineId(
            input.productId,
            input.variantId,
            input.giftWrapping,
          );
          const existing = state.lines.find((line) => line.id === id);

          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.id === id
                  ? {
                      ...line,
                      quantity: clampQuantity(line.quantity + quantity),
                    }
                  : line,
              ),
            };
          }

          return {
            lines: [
              ...state.lines,
              { ...input, id, quantity: clampQuantity(quantity) },
            ],
          };
        }),

      removeItem: (lineId) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.id !== lineId),
        })),

      increment: (lineId) =>
        set((state) => ({
          lines: state.lines.map((line) =>
            line.id === lineId
              ? { ...line, quantity: clampQuantity(line.quantity + 1) }
              : line,
          ),
        })),

      decrement: (lineId) =>
        set((state) => ({
          lines: state.lines.flatMap((line) => {
            if (line.id !== lineId) {
              return [line];
            }
            return line.quantity <= 1
              ? []
              : [{ ...line, quantity: line.quantity - 1 }];
          }),
        })),

      clear: () => set({ lines: [] }),
    }),
    {
      // The bag survives a refresh; it never leaves this browser.
      name: "odoratus-cart",
      version: 1,
    },
  ),
);
