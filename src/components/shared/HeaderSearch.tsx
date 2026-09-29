"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type HeaderSearchProps = {
  className?: string;
};

/** Site search. Submitting pushes the term into the listing URL. */
export function HeaderSearch({ className }: HeaderSearchProps) {
  const router = useRouter();
  const { dict } = useI18n();
  const [term, setTerm] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = term.trim();
    router.push(
      trimmed
        ? `${productPaths.list}?search=${encodeURIComponent(trimmed)}`
        : productPaths.list,
    );
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 rounded-full border border-line bg-transparent px-3 py-2",
        "transition-colors duration-300 focus-within:border-gold",
        className,
      )}
    >
      <SearchIcon size={14} className="shrink-0 text-muted" />
      <label htmlFor="site-search" className="sr-only">
        {dict.nav.searchLabel}
      </label>
      <input
        id="site-search"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder={dict.nav.searchPlaceholder}
        className="w-[150px] bg-transparent text-[12px] text-ink outline-none placeholder:text-muted"
      />
    </form>
  );
}
