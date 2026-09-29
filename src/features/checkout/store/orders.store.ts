"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/features/checkout/types/checkout.types";

const MAX_STORED_ORDERS = 20;

type OrdersStore = {
  orders: Order[];
  placeOrder: (order: Order) => void;
};

/**
 * Placed orders, newest first, kept in browser storage. There is no backend,
 * so this is the order history: it lives on one device and nowhere else.
 */
export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],
      placeOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders].slice(0, MAX_STORED_ORDERS),
        })),
    }),
    { name: "odoratus-orders", version: 1 },
  ),
);
