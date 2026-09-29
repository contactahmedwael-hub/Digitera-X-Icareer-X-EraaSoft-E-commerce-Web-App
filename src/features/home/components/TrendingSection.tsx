"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { ProductCard, useProducts } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** "Olfactory Signatures" — the four most coveted extractions. */
export function TrendingSection() {
  const { dict } = useI18n();
  const productsQuery = useProducts({ sort: "price-desc", pageSize: 4 });
  const products = productsQuery.data?.items ?? [];

  return (
    <section
      aria-labelledby="trending-heading"
      className="flex flex-col gap-8 px-4 py-12 sm:gap-10 sm:px-6 md:px-10 lg:gap-12 lg:px-20 lg:py-[100px]"
    >
      <SectionHeader
        id="trending-heading"
        title={dict.home.trendingTitle}
        subtitle={dict.home.trendingSubtitle}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {productsQuery.isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-[440px] w-full" />
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
