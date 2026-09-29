"use client";

import { LeafIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/I18nProvider";

type ProductEmptyStateProps = {
  hasFilters?: boolean;
  onClearFilters?: () => void;
};

/** Covers both "nothing in the catalogue" and "no results for this search". */
export function ProductEmptyState({
  hasFilters = false,
  onClearFilters,
}: ProductEmptyStateProps) {
  const { dict } = useI18n();

  return (
    <div className="flex w-full flex-col items-center gap-4 border border-line bg-surface px-6 py-16 text-center">
      <LeafIcon size={28} className="text-gold" />

      <h2 className="font-serif text-[24px] text-ink">
        {hasFilters ? dict.listing.emptyFiltered : dict.listing.emptyCatalogue}
      </h2>

      <p className="max-w-sm text-[13px] leading-relaxed text-muted">
        {hasFilters
          ? dict.listing.emptyFilteredBody
          : dict.listing.emptyCatalogueBody}
      </p>

      {hasFilters && onClearFilters ? (
        <Button variant="secondary" onClick={onClearFilters}>
          {dict.listing.clearFilters}
        </Button>
      ) : null}
    </div>
  );
}
