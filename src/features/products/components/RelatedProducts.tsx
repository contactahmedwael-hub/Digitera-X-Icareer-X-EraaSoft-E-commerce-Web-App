"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useRelatedProducts } from "@/features/products/hooks/useRelatedProducts";
import { useI18n } from "@/lib/i18n/I18nProvider";

type RelatedProductsProps = {
  productId: string;
};

/** "Olfactory Companions" — fragrances of synonymous sophistication. */
export function RelatedProducts({ productId }: RelatedProductsProps) {
  const relatedQuery = useRelatedProducts(productId);
  const { dict } = useI18n();
  const products = relatedQuery.data ?? [];

  if (!relatedQuery.isLoading && products.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-heading"
      className="bg-shell px-4 py-14 sm:px-6 md:px-10 lg:px-20 lg:py-16"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h2
          id="related-heading"
          className="font-serif text-[32px] text-ink sm:text-[48px]"
        >
          {dict.product.relatedTitle}
        </h2>
        <p className="text-[13px] text-muted uppercase sm:text-[14px]">
          {dict.product.relatedSubtitle}
        </p>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {relatedQuery.isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-[420px] w-full" />
            ))
          : products.map((product, index) => (
              <div
                key={product.id}
                className="animate-[fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </section>
  );
}
