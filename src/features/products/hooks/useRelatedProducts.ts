"use client";

import { useQuery } from "@tanstack/react-query";
import { productQueryKeys } from "@/features/products/hooks/product-query-keys";
import { productsService } from "@/features/products/services/products.service";
import type { ProductId } from "@/features/products/types/product.types";

/** "Olfactory Companions" shown under the product details. */
export function useRelatedProducts(productId: ProductId, limit = 4) {
  return useQuery({
    queryKey: productQueryKeys.related(productId, limit),
    queryFn: () => productsService.listRelated(productId, limit),
    enabled: Boolean(productId),
  });
}
