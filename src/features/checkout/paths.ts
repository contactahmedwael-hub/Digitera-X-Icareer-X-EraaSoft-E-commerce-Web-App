export const checkoutPaths = {
  checkout: "/checkout",
  order: (orderId: string) => `/orders/${orderId}`,
} as const;
