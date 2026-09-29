"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { SearchOverlayPanel } from "@/components/shared/SearchOverlay/SearchOverlayPanel";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

type SearchOverlayProps = {
  className?: string;
};

/**
 * The search icon plus the sheet it opens. The panel is only mounted while
 * open, so its effects (focus, scroll lock, listeners) exist only then.
 */
export function SearchOverlay({ className }: SearchOverlayProps) {
  const router = useRouter();
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");

  function close() {
    setOpen(false);
    setTerm("");
  }

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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.nav.searchLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={className}
      >
        <SearchIcon size={18} />
      </button>

      {open ? (
        <SearchOverlayPanel
          term={term}
          onTermChange={setTerm}
          onSubmit={handleSubmit}
          onClose={close}
          onPick={close}
        />
      ) : null}
    </>
  );
}
