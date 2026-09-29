"use client";

import { useSyncExternalStore } from "react";
import { useCartStore } from "@/features/cart/store/cart.store";

function subscribe(onChange: () => void) {
  return useCartStore.persist.onFinishHydration(onChange);
}

/**
 * The cart is restored from browser storage after the first paint, so
 * anything that renders a saved quantity must wait for this to avoid a
 * server/client hydration mismatch.
 */
export function useCartHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );
}
