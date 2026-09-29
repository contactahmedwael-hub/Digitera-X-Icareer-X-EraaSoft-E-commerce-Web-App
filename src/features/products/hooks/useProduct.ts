"use client";

import { useQuery } from "@tanstack/react-query";
import { productQueryKeys } from "@/features/products/hooks/product-query-keys";
import { productsService } from "@/features/products/services/products.service";
import type { ProductId } from "@/features/products/types/product.types";

export function useProduct(productId: ProductId) {
  return useQuery({
    queryKey: productQueryKeys.detail(productId),
    queryFn: () => productsService.getById(productId),
    enabled: Boolean(productId),
  });
}
