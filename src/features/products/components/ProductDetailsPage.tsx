"use client";

import type { ReactNode } from "react";
import { GiftWrappingToggle } from "@/features/products/components/GiftWrappingToggle";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductDetailsSkeleton } from "@/features/products/components/ProductDetailsSkeleton";
import { ProductGallery } from "@/features/products/components/ProductGallery";
import { ProductNotFound } from "@/features/products/components/ProductNotFound";
import { ProductShareButtons } from "@/features/products/components/ProductShareButtons";
import { ProductVariantPicker } from "@/features/products/components/ProductVariantPicker";
import { RelatedProducts } from "@/features/products/components/RelatedProducts";
import { ScentAnatomy } from "@/features/products/components/ScentAnatomy";
import { useProduct } from "@/features/products/hooks/useProduct";
import { useProductSelection } from "@/features/products/hooks/useProductSelection";
import type {
  Product,
  ProductVariant,
} from "@/features/products/types/product.types";
import { isPurchasable } from "@/features/products/utils/product.utils";

export type ProductDetailsActionsContext = {
  product: Product;
  variant?: ProductVariant;
  giftWrapping: boolean;
  quantity: number;
  setQuantity: (next: number) => void;
  disabled: boolean;
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
  const product = productQuery.data ?? undefined;
  const selection = useProductSelection(product);

  if (productQuery.isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (productQuery.isError || !product) {
    return (
      <ProductNotFound
        isError={productQuery.isError}
        onRetry={() => productQuery.refetch()}
      />
    );
  }

  const disabled = !isPurchasable(product, selection.variant);

  return (
    <article className="animate-[fade-in_0.4s_ease-out]">
      <ProductBreadcrumbs productName={product.name} />

      <div className="grid gap-10 px-4 pb-12 sm:px-6 md:px-10 lg:grid-cols-[656fr_560fr] lg:gap-16 lg:px-20 lg:pb-16">
        <ProductGallery product={product} />

        <div className="flex flex-col gap-8">
          <ProductDetails product={product} variant={selection.variant} />

          <div className="h-px w-full bg-line" />

          <ProductVariantPicker
            product={product}
            selectedVariantId={selection.variantId}
            onSelect={selection.selectVariant}
          />

          {product.giftWrappingAvailable ? (
            <GiftWrappingToggle
              checked={selection.giftWrapping}
              onChange={selection.setGiftWrapping}
            />
          ) : null}

          {actions?.({
            product,
            variant: selection.variant,
            giftWrapping: selection.giftWrapping,
            quantity: selection.quantity,
            setQuantity: selection.setQuantity,
            disabled,
          })}

          <ProductShareButtons product={product} />

          <div className="h-px w-full bg-line" />

          <ScentAnatomy product={product} />
        </div>
      </div>

      <RelatedProducts productId={product.id} />
    </article>
  );
}
