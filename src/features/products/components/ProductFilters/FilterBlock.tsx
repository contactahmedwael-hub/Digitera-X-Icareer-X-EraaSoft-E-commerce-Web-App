"use client";

import { CheckIcon } from "@/components/icons";
import type { FilterOption } from "@/features/products/components/ProductFilters/filter-options";
import { cn } from "@/lib/utils/cn";

type CheckboxTone = "gold" | "ink";

type FilterBlockProps = {
  title: string;
  options: FilterOption[];
  selected: string[];
  tone: CheckboxTone;
  onToggle: (id: string) => void;
};

export function FilterBlock({
  title,
  options,
  selected,
  tone,
  onToggle,
}: FilterBlockProps) {
  return (
    <fieldset className="flex w-full flex-col items-start gap-4">
      <legend className="text-[12px] font-bold tracking-wide text-ink uppercase">
        {title}
      </legend>

      <div className="flex w-full flex-col items-start gap-3">
        {options.map((option) => {
          const checked = selected.includes(option.id);

          return (
            <label
              key={option.id}
              className="group flex w-full cursor-pointer items-center gap-2.5"
            >
              <input
                type="checkbox"
                className="peer sr-only"
                checked={checked}
                onChange={() => onToggle(option.id)}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-[2px] border border-line text-on-inverse",
                  "transition-all duration-200 group-hover:border-muted",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
                  checked &&
                    tone === "gold" &&
                    "border-gold bg-gold text-[#faf8f5]",
                  checked && tone === "ink" && "border-inverse bg-inverse",
                  !checked && "bg-surface",
                )}
              >
                {checked ? <CheckIcon size={10} strokeWidth={2.5} /> : null}
              </span>
              <span className="text-[13px] whitespace-nowrap text-ink transition-colors duration-200 group-hover:text-gold">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
