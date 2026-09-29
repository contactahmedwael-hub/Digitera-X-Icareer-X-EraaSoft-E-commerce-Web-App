"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductEmptyState } from "@/features/products/components/ProductEmptyState";
import type { Product } from "@/features/products/types/product.types";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ProductGridProps = {
  products: Product[];
  isLoading?: boolean;
  hasFilters?: boolean;
  onClearFilters?: () => void;
};

export function ProductGrid({
  products,
  isLoading = false,
  hasFilters = false,
  onClearFilters,
}: ProductGridProps) {
  const { dict } = useI18n();

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 xl:grid-cols-3"
      >
        <span className="sr-only">{dict.common.loading}</span>
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-[440px] w-full" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <ProductEmptyState
        hasFilters={hasFilters}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 xl:grid-cols-3">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-[fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
