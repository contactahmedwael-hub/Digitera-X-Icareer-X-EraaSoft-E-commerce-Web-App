"use client";

import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductPagination } from "@/features/products/components/ProductPagination";
import { ProductSearch } from "@/features/products/components/ProductSearch";
import { ProductSortControl } from "@/features/products/components/ProductSort";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { ProductSearchParams } from "@/features/products/types/product.types";
import { parseProductListQuery } from "@/features/products/utils/product.query";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ProductsPageProps = {
  searchParams: ProductSearchParams;
};

export function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = parseProductListQuery(searchParams);
  const productsQuery = useProducts(query);
  const filters = useProductFilters();
  const { dict, fill } = useI18n();

  const result = productsQuery.data;
  const hasFilters = Boolean(
    query.search ||
    query.category?.length ||
    query.scentFamily?.length ||
    query.occasion?.length ||
    query.minPrice !== undefined ||
    query.maxPrice !== undefined,
  );

  return (
    <section className="overflow-x-hidden bg-page text-ink">
      <ProductBreadcrumbs />

      <div className="flex w-full flex-col items-start px-4 pb-8 sm:px-6 md:px-10 lg:px-20 lg:pb-10">
        <h1 className="w-full font-serif text-[40px] leading-tight text-ink sm:text-[52px] lg:text-[64px] lg:leading-normal">
          {dict.listing.title}
        </h1>
        <p className="mt-2 w-full text-[14px] text-muted sm:mt-0">
          {dict.listing.subtitle}
        </p>
        {query.search ? (
          <p className="mt-3 text-[12px] tracking-wide text-gold uppercase">
            {fill(dict.listing.resultsFor, { term: query.search })}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col items-stretch gap-8 px-4 pb-16 sm:px-6 md:px-10 lg:flex-row lg:items-start lg:gap-12 lg:px-20 lg:pb-[100px]">
        <ProductFilters />

        <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
          <ProductSearch />
          <ProductSortControl
            availableCount={result?.total ?? 0}
            isLoading={productsQuery.isLoading}
          />
          <ProductGrid
            products={result?.items ?? []}
            isLoading={productsQuery.isLoading}
            hasFilters={hasFilters}
            onClearFilters={filters.clearAll}
          />
          <ProductPagination
            page={result?.page ?? 1}
            pageSize={result?.pageSize ?? 6}
            total={result?.total ?? 0}
          />
        </div>
      </div>
    </section>
  );
}
