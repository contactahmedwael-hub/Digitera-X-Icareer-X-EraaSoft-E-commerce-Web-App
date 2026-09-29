"use client";

import { create } from "zustand";
import type { Product } from "@/features/products/types/product.types";

type QuickViewStore = {
  product: Product | null;
  isOpen: boolean;
  open: (product: Product) => void;
  close: () => void;
};

export const useQuickViewStore = create<QuickViewStore>((set) => ({
  product: null,
  isOpen: false,
  open: (product) => set({ product, isOpen: true }),
  close: () => set({ isOpen: false, product: null }),
}));

export function openQuickView(product: Product) {
  useQuickViewStore.getState().open(product);
}
