"use client";

import { useSyncExternalStore } from "react";
import { useSession } from "@/features/auth";
import { useOrdersStore } from "@/features/checkout/store/orders.store";

function subscribe(onChange: () => void) {
  return useOrdersStore.persist.onFinishHydration(onChange);
}

export function useOrdersHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => useOrdersStore.persist.hasHydrated(),
    () => false,
  );
}

export function useOrders() {
  const stored = useOrdersStore((state) => state.orders);
  const placeOrder = useOrdersStore((state) => state.placeOrder);
  const hydrated = useOrdersHydrated();
  const { user } = useSession();

  // Two people can sign in on one browser, so an order only belongs to the
  // account that placed it.
  const mine = user
    ? stored.filter((order) => order.ownerEmail === user.email)
    : [];

  return {
    // Before hydration the list renders empty, matching the server markup.
    orders: hydrated ? mine : [],
    hydrated,
    placeOrder,
    findOrder: (id: string) => mine.find((order) => order.id === id),
  };
}
