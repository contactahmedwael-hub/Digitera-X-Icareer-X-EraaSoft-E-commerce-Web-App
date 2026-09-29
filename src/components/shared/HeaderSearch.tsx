"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { SearchSuggestions } from "@/components/shared/SearchOverlay/SearchSuggestions";
import { useDismissable } from "@/components/shared/useDismissable";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type HeaderSearchProps = {
  className?: string;
};

/** Site search. Typing shows the same perfume suggestions as the mobile overlay. */
export function HeaderSearch({ className }: HeaderSearchProps) {
  const router = useRouter();
  const { dict } = useI18n();
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function close() {
    setOpen(false);
  }

  useDismissable(open, containerRef, close);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = term.trim();
    close();
    router.push(
      trimmed
        ? `${productPaths.list}?search=${encodeURIComponent(trimmed)}`
        : productPaths.list,
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={handleSubmit}
        className={cn(
          "flex w-full items-center gap-2 rounded-full border border-line bg-transparent px-3 py-2",
          "transition-colors duration-300 focus-within:border-gold",
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
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setTerm(event.target.value);
            setOpen(true);
          }}
          placeholder={dict.nav.searchPlaceholder}
          autoComplete="off"
          className="min-w-0 w-[150px] flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-muted"
        />
      </form>

      {open ? (
        <div className="absolute end-0 top-full z-50 mt-2 w-[min(100%,22rem)] min-w-[18rem] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_50px_-24px_rgba(26,26,26,0.55)]">
          <SearchSuggestions
            term={term}
            onPick={() => {
              setTerm("");
              close();
            }}
          />
        </div>
      ) : null}
    </div>
  );
}