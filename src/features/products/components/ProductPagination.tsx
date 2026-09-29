"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { useProductPagination } from "@/features/products/hooks/useProductPagination";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ProductPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
};

export function ProductPagination({
  page,
  pageSize,
  total,
}: ProductPaginationProps) {
  const { setPage } = useProductPagination();
  const { dict, fill, dir } = useI18n();
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex w-full items-center justify-center gap-4 pt-8 lg:pt-10"
    >
      <button
        type="button"
        onClick={() => setPage(page - 1)}
        className="border border-line p-3 text-ink transition-colors duration-300 hover:border-ink disabled:cursor-not-allowed disabled:text-[#c9c3ba] disabled:hover:border-line"
        disabled={page <= 1}
        aria-label={dict.listing.previousPage}
      >
        <ArrowLeftIcon className={dir === "rtl" ? "rotate-180" : undefined} />
      </button>

      <p
        aria-live="polite"
        className="text-[13px] whitespace-nowrap text-muted"
      >
        {fill(dict.listing.pageOf, { page, count: pageCount })}
      </p>

      <button
        type="button"
        onClick={() => setPage(page + 1)}
        className="border border-line bg-inverse p-3 text-on-inverse transition-opacity duration-300 hover:opacity-85 disabled:cursor-not-allowed disabled:bg-line disabled:text-[#8a847c]"
        disabled={page >= pageCount}
        aria-label={dict.listing.nextPage}
      >
        <ArrowRightIcon className={dir === "rtl" ? "rotate-180" : undefined} />
      </button>
    </nav>
  );
}
