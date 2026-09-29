"use client";

import { MinusIcon, PlusIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
};

/** Accessible +/- stepper. Both controls are real buttons with labels. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
  className,
}: QuantityStepperProps) {
  const { dict } = useI18n();
  const name = label ?? dict.product.quantity;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-5 rounded border border-line bg-surface px-4 py-3.5",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`${dict.product.decrease} — ${name}`}
        className="text-muted transition-colors duration-200 hover:text-ink disabled:cursor-not-allowed disabled:text-[#c9c3ba]"
      >
        <MinusIcon size={16} />
      </button>

      <output
        aria-live="polite"
        aria-label={name}
        className="min-w-4 text-center text-[14px] font-semibold text-ink tabular-nums"
      >
        {value}
      </output>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`${dict.product.increase} — ${name}`}
        className="text-muted transition-colors duration-200 hover:text-ink disabled:cursor-not-allowed disabled:text-[#c9c3ba]"
      >
        <PlusIcon size={16} />
      </button>
    </div>
  );
}
