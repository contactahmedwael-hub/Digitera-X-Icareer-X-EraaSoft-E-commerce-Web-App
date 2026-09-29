"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Loading placeholder shaped like the real details page, so nothing shifts. */
export function ProductDetailsSkeleton() {
  const { dict } = useI18n();

  return (
    <div
      role="status"
      aria-live="polite"
      className="px-4 py-8 sm:px-6 md:px-10 lg:px-20"
    >
      <span className="sr-only">{dict.common.loading}</span>

      <Skeleton className="h-4 w-52" />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Skeleton className="aspect-4/5 w-full" />

        <div className="flex flex-col gap-5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="mt-2 grid grid-cols-3 gap-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>

          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    </div>
  );
}
