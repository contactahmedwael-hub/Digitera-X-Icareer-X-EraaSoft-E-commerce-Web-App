"use client";

import { useQuery } from "@tanstack/react-query";
import { productQueryKeys } from "@/features/products/hooks/product-query-keys";
import { productsService } from "@/features/products/services/products.service";
import type { ProductListQuery } from "@/features/products/types/product.types";

export function useProducts(query: ProductListQuery) {
  return useQuery({
    queryKey: productQueryKeys.list(query),
    queryFn: () => productsService.list(query),
  });
}
