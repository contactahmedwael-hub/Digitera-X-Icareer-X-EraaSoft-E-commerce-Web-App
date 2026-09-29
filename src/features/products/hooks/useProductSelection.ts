"use client";

import { useMemo, useState } from "react";
import type {
  Product,
  ProductVariant,
} from "@/features/products/types/product.types";
import {
  findVariant,
  getDefaultVariant,
} from "@/features/products/utils/product.utils";

export type ProductSelection = {
  variant?: ProductVariant;
  variantId?: string;
  giftWrapping: boolean;
  quantity: number;
  selectVariant: (variantId: string) => void;
  setGiftWrapping: (next: boolean) => void;
  setQuantity: (next: number) => void;
};

/**
 * US-04: everything the customer picks on the details page.
 * The signature (largest) size is preselected, matching the design.
 */
export function useProductSelection(product?: Product): ProductSelection {
  const [variantId, setVariantId] = useState<string>();
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [shownProductId, setShownProductId] = useState(product?.id);

  // Reset the selection when a different product is shown. Done during
  // render rather than in an effect, so no stale selection is ever painted.
  if (shownProductId !== product?.id) {
    setShownProductId(product?.id);
    setVariantId(product ? getDefaultVariant(product)?.id : undefined);
    setGiftWrapping(false);
    setQuantity(1);
  }

  const variant = useMemo(
    () => (product ? findVariant(product, variantId) : undefined),
    [product, variantId],
  );

  return {
    variant,
    variantId: variant?.id,
    giftWrapping,
    quantity,
    selectVariant: setVariantId,
    setGiftWrapping,
    setQuantity,
  };
}
