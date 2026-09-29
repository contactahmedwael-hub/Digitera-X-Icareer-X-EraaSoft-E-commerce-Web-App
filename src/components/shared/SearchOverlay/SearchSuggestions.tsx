"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, SearchIcon } from "@/components/icons";
import { Skeleton } from "@/components/ui/Skeleton";
import { productPaths, useProducts, type Product } from "@/features/products";
import { useProductCopy } from "@/features/products/hooks/useProductCopy";
import { useI18n } from "@/lib/i18n/I18nProvider";

const MAX_SUGGESTIONS = 5;

type SearchSuggestionsProps = {
  term: string;
  onPick: (productId: string) => void;
};

function SuggestionRow({
  product,
  onPick,
}: {
  product: Product;
  onPick: (productId: string) => void;
}) {
  const copy = useProductCopy(product);
  const image = product.images[0];

  return (
    <Link
      href={productPaths.detail(product.id)}
      onClick={() => onPick(product.id)}
      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-shell"
    >
      <span className="relative size-11 shrink-0 overflow-hidden rounded bg-shell">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="44px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-ink">
          {copy.name}
        </span>
        <span className="block truncate text-[11px] text-muted">
          {copy.notes}
        </span>
      </span>
      <ArrowRightIcon
        size={15}
        aria-hidden="true"
        className="shrink-0 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 rtl:-scale-x-100"
      />
    </Link>
  );
}

/** Live results under the search field. Empty term shows a hint, not a list. */
export function SearchSuggestions({ term, onPick }: SearchSuggestionsProps) {
  const { dict, fill } = useI18n();
  const trimmed = term.trim();
  const { data, isLoading } = useProducts({ search: trimmed || undefined });

  if (!trimmed) {
    return (
      <p className="flex items-center gap-2 px-4 py-5 text-[12px] text-muted">
        <SearchIcon size={14} className="shrink-0" />
        {dict.nav.searchHint}
      </p>
    );
  }

  if (isLoading) {
    return (
      <div role="status" className="flex flex-col gap-2 p-3">
        <span className="sr-only">{dict.common.loading}</span>
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-[60px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  const items = data?.items ?? [];

  if (items.length === 0) {
    return (
      <p aria-live="polite" className="px-4 py-5 text-[12px] text-muted">
        {fill(dict.nav.searchNoResults, { term: trimmed })}
      </p>
    );
  }

  return (
    <div className="p-1.5">
      <div aria-live="polite" className="flex flex-col">
        {items.slice(0, MAX_SUGGESTIONS).map((product) => (
          <SuggestionRow key={product.id} product={product} onPick={onPick} />
        ))}
      </div>

      <Link
        href={`${productPaths.list}?search=${encodeURIComponent(trimmed)}`}
        onClick={() => onPick(trimmed)}
        className="mt-1 flex items-center justify-center gap-2 border-t border-line px-3 py-3 text-[11px] font-semibold tracking-wide text-gold uppercase transition-colors duration-200 hover:text-ink"
      >
        {dict.nav.searchViewAll}
        <ArrowRightIcon size={14} className="rtl:-scale-x-100" />
      </Link>
    </div>
  );
}
