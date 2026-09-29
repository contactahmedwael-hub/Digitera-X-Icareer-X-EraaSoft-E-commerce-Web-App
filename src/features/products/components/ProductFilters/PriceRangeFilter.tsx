"use client";

import { useState } from "react";
import { PRICE_BOUNDS } from "@/features/products/components/ProductFilters/filter-options";
import { formatWholePrice } from "@/features/products/utils/product.utils";
import { useI18n } from "@/lib/i18n/I18nProvider";

type PriceRangeFilterProps = {
  min?: string;
  max?: string;
  onCommit: (min?: number, max?: number) => void;
};

const STEP = 5;

/**
 * Two native range inputs layered over one track: keyboard operable by
 * default, and no slider library.
 */
export function PriceRangeFilter({
  min,
  max,
  onCommit,
}: PriceRangeFilterProps) {
  const { dict } = useI18n();
  const lowerBound = Number(min ?? PRICE_BOUNDS.min);
  const upperBound = Number(max ?? PRICE_BOUNDS.max);

  const [lower, setLower] = useState(lowerBound);
  const [upper, setUpper] = useState(upperBound);
  const [committed, setCommitted] = useState({ lowerBound, upperBound });

  // Re-sync with the URL (e.g. after "Clear all") during render rather than
  // in an effect, so there is no cascading re-render.
  if (
    committed.lowerBound !== lowerBound ||
    committed.upperBound !== upperBound
  ) {
    setCommitted({ lowerBound, upperBound });
    setLower(lowerBound);
    setUpper(upperBound);
  }

  const span = PRICE_BOUNDS.max - PRICE_BOUNDS.min;
  const left = ((lower - PRICE_BOUNDS.min) / span) * 100;
  const right = ((upper - PRICE_BOUNDS.min) / span) * 100;

  const commit = (nextLower: number, nextUpper: number) =>
    onCommit(
      nextLower > PRICE_BOUNDS.min ? nextLower : undefined,
      nextUpper < PRICE_BOUNDS.max ? nextUpper : undefined,
    );

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-[12px] font-bold tracking-wide text-ink uppercase">
        {dict.listing.priceRange}
      </p>

      <div className="relative h-6 w-full">
        <span className="absolute top-2.5 h-1 w-full bg-line" />
        <span
          className="absolute top-2.5 h-1 bg-gold"
          style={{ left: `${left}%`, width: `${Math.max(0, right - left)}%` }}
        />

        <input
          type="range"
          aria-label={dict.listing.minPrice}
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={STEP}
          value={lower}
          onChange={(event) =>
            setLower(Math.min(Number(event.target.value), upper - STEP))
          }
          onPointerUp={() => commit(lower, upper)}
          onKeyUp={() => commit(lower, upper)}
          className="range-thumb absolute top-0 h-6 w-full"
        />
        <input
          type="range"
          aria-label={dict.listing.maxPrice}
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={STEP}
          value={upper}
          onChange={(event) =>
            setUpper(Math.max(Number(event.target.value), lower + STEP))
          }
          onPointerUp={() => commit(lower, upper)}
          onKeyUp={() => commit(lower, upper)}
          className="range-thumb absolute top-0 h-6 w-full"
        />
      </div>

      <div
        aria-live="polite"
        className="flex w-full items-start justify-between text-[12px] whitespace-nowrap text-ink tabular-nums"
      >
        <p>{formatWholePrice(lower)}</p>
        <p>{formatWholePrice(upper)}</p>
      </div>
    </div>
  );
}
