"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Footer } from "@/components/shared/Footer";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { useProduct } from "@/features/products/hooks/useProduct";
import { useProducts } from "@/features/products/hooks/useProducts";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";
import {
  formatWholePrice,
  getDefaultVolume,
  getRelatedProducts,
} from "@/features/products/utils/product.utils";
import { cn } from "@/lib/utils/cn";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  price: number;
  image?: string;
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
  const catalogQuery = useProducts({ pageSize: 6 });
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [giftWrapping, setGiftWrapping] = useState(true);

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    const defaultVolume = getDefaultVolume(product);
    const fromProduct = Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );

    return {
      ...fromProduct,
      ...(defaultVolume
        ? { volume: selectedOptions.volume ?? defaultVolume.label }
        : {}),
      "Gift wrapping": giftWrapping ? "Yes" : "No",
    };
  }, [giftWrapping, product, selectedOptions]);

  const selectedVolume = product
    ? (product.volumes.find(
        (volume) => volume.label === resolvedOptions.volume,
      ) ?? getDefaultVolume(product))
    : undefined;
  const selectedPrice = selectedVolume?.price ?? product?.price ?? 0;
  const relatedProducts = getRelatedProducts(
    catalogQuery.data?.items ?? [],
    productId,
  );

  if (productQuery.isLoading) {
    return (
      <p className="px-4 py-16 text-sm text-[#605a54] sm:px-6 md:px-10 lg:px-20">
        Loading product...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="px-4 py-16 text-sm text-[#605a54] sm:px-6 md:px-10 lg:px-20">
        Product not found.
      </p>
    );
  }

  return (
    <div className="overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]">
      <ProductBreadcrumbs
        items={[
          { href: productPaths.list, label: "Home" },
          { href: productPaths.list, label: "Shop" },
          { href: productPaths.list, label: "Fragrances" },
          { label: product.name },
        ]}
      />
      <section className="flex flex-col gap-10 px-4 pb-16 sm:px-6 md:px-10 lg:flex-row lg:gap-16 lg:px-20 lg:pb-[100px]">
        <div className="min-w-0 flex-1">
          <ProductImages product={product} />
        </div>
        <div className="flex w-full flex-col gap-8 lg:w-[560px] lg:shrink-0">
          <ProductDetails product={product} price={selectedPrice} />
          <div className="h-px w-full bg-[#ebe6de]" />
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
          <div className="flex items-center justify-between gap-4 rounded-[6px] bg-[#f4f0eb] p-4 sm:p-5">
            <div className="max-w-[380px]">
              <p className="text-[13px] font-semibold">
                Complimentary Signature Gift Wrapping
              </p>
              <p className="mt-1 text-[12px] text-[#605a54]">
                Encased in linen paper box with custom wax seal stamp.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={giftWrapping}
              aria-label="Complimentary signature gift wrapping"
              onClick={() => setGiftWrapping((current) => !current)}
              className={cn(
                "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5",
                giftWrapping ? "justify-end bg-[#c5a880]" : "bg-[#ebe6de]",
              )}
            >
              <span className="size-5 rounded-full bg-white" />
            </button>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center justify-center gap-5 rounded border border-solid border-[#ebe6de] px-4 py-3.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="text-[16px] text-[#605a54]"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                -
              </button>
              <span className="min-w-4 text-center text-[14px] font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="text-[16px] text-[#605a54]"
                onClick={() => setQuantity((current) => current + 1)}
              >
                +
              </button>
            </div>
            <div className="min-w-0 flex-1">
              {actions?.({
                product,
                selectedOptions: resolvedOptions,
                quantity,
                price: selectedPrice,
                image: product.images[0],
              })}
            </div>
          </div>
          <div className="h-px w-full bg-[#ebe6de]" />
          <div className="flex flex-col gap-5">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[28px] sm:text-[32px]">
              Scent Anatomy
            </h2>
            <p className="text-[14px] leading-[1.6] text-[#605a54]">
              {product.scentAnatomy.description}
            </p>
            <div className="flex flex-col gap-3">
              {product.scentAnatomy.layers.map((layer) => (
                <div
                  key={layer.name}
                  className="flex items-start justify-between gap-4 border-b border-solid border-[#ebe6de] py-2"
                >
                  <p className="text-[12px] font-bold uppercase">{layer.name}</p>
                  <p className="text-right text-[13px] text-[#605a54]">
                    {layer.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {relatedProducts.length > 0 ? (
        <section className="flex flex-col gap-8 bg-[#f4f0eb] px-4 py-16 sm:px-6 md:px-10 lg:gap-12 lg:px-20 lg:py-[100px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] sm:text-[48px]">
              Olfactory Companions
            </h2>
            <p className="text-[13px] tracking-[0.08em] text-[#605a54] uppercase sm:text-[14px]">
              Fragrances of synonymous sophistication
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      ) : null}
      <Footer />
    </div>
  );
}
