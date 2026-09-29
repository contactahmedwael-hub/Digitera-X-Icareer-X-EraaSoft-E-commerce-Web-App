"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { useDismissable } from "@/components/shared/useDismissable";
import { SearchSuggestions } from "@/components/shared/SearchOverlay/SearchSuggestions";
import { useI18n } from "@/lib/i18n/I18nProvider";

type SearchOverlayPanelProps = {
  term: string;
  onTermChange: (term: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onPick: (productId: string) => void;
};

/** The sheet itself. Mounted only while the overlay is open. */
export function SearchOverlayPanel({
  term,
  onTermChange,
  onSubmit,
  onClose,
  onPick,
}: SearchOverlayPanelProps) {
  const { dict } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useDismissable(true, panelRef, onClose);

  useEffect(() => {
    inputRef.current?.focus();

    // The page behind the sheet should not scroll while it is open.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center bg-[#1a1a1a]/45 px-4 pt-[12vh] backdrop-blur-sm animate-[fade-in_0.25s_ease-out_both]"
      role="dialog"
      aria-modal="true"
      aria-label={dict.nav.searchLabel}
    >
      <div
        ref={panelRef}
        className="h-fit w-full max-w-[620px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-30px_rgba(26,26,26,0.7)] animate-[scale-in_0.25s_cubic-bezier(0.22,1,0.36,1)_both]"
      >
        <form
          role="search"
          onSubmit={onSubmit}
          className="flex items-center gap-3 border-b border-line px-4 py-3.5"
        >
          <SearchIcon size={18} className="shrink-0 text-muted" />
          <label htmlFor="overlay-search" className="sr-only">
            {dict.nav.searchLabel}
          </label>
          <input
            ref={inputRef}
            id="overlay-search"
            type="search"
            value={term}
            onChange={(event) => onTermChange(event.target.value)}
            placeholder={dict.nav.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.nav.closeSearch}
            className="shrink-0 rounded-full p-1.5 text-muted transition-colors duration-300 hover:bg-shell hover:text-ink"
          >
            <CloseIcon size={18} />
          </button>
        </form>

        <SearchSuggestions term={term} onPick={onPick} />
      </div>
    </div>
  );
}
