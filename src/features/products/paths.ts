export const productPaths = {
  list: "/products",
  detail: (productId: string) => `/products/${productId}`,
} as const;
