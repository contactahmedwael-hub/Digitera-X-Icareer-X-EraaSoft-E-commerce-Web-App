"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { useProduct } from "@/features/products/hooks/useProduct";
import type { Product } from "@/features/products/types/product.types";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    return Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );
  }, [product, selectedOptions]);

  if (productQuery.isLoading) {
    return <p className="text-sm text-zinc-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-sm text-zinc-600">Product not found.</p>;
  }

  return (
    <section className="grid gap-8 px-4 py-8 sm:px-6 md:px-10 lg:grid-cols-2 lg:px-20 lg:py-10">
      <ProductImages product={product} />
      <div className="space-y-6">
        <ProductDetails product={product} />
        <ProductOptions
          product={product}
          selectedOptions={resolvedOptions}
          onChange={(optionId, value) =>
            setSelectedOptions((current) => ({
              ...current,
              [optionId]: value,
            }))
          }
        />
        {actions?.({ product, selectedOptions: resolvedOptions })}
      </div>
    </section>
  );
}
