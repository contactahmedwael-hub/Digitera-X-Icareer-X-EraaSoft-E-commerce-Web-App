"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type ListParamUpdate = Record<
  string,
  string | string[] | number | undefined
>;

/**
 * Single source of truth for the listing URL. Filters, search, sort and
 * pagination all read from and write to the query string, so the page is
 * shareable and the back button works.
 */
export function useProductListParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getList = useCallback(
    (key: string) => searchParams.getAll(key).filter(Boolean),
    [searchParams],
  );

  const getValue = useCallback(
    (key: string) => searchParams.get(key) ?? undefined,
    [searchParams],
  );

  const setParams = useCallback(
    (updates: ListParamUpdate, options?: { resetPage?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);

        if (Array.isArray(value)) {
          value.forEach((entry) => params.append(key, entry));
          return;
        }

        if (value !== undefined && value !== "") {
          params.set(key, String(value));
        }
      });

      if (options?.resetPage !== false) {
        params.delete("page");
      }

      const serialized = params.toString();
      router.push(serialized ? `${pathname}?${serialized}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const toggleListValue = useCallback(
    (key: string, value: string) => {
      const current = searchParams.getAll(key);
      const next = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value];

      setParams({ [key]: next });
    },
    [searchParams, setParams],
  );

  return { getList, getValue, setParams, toggleListValue };
}
