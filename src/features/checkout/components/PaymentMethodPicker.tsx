"use client";

import { CheckIcon, GiftIcon, LeafIcon } from "@/components/icons";
import type { PaymentMethod } from "@/features/checkout/types/checkout.types";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type PaymentMethodPickerProps = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};

/**
 * Two radio cards. Real radio inputs stay in the markup — visually hidden —
 * so arrow-key navigation and screen-reader grouping work for free.
 */
export function PaymentMethodPicker({
  value,
  onChange,
}: PaymentMethodPickerProps) {
  const { dict } = useI18n();

  const options: Array<{
    id: PaymentMethod;
    label: string;
    note: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "cash-on-delivery",
      label: dict.checkout.cashOnDelivery,
      note: dict.checkout.cashOnDeliveryNote,
      icon: <GiftIcon size={18} />,
    },
    {
      id: "bank-transfer",
      label: dict.checkout.bankTransfer,
      note: dict.checkout.bankTransferNote,
      icon: <LeafIcon size={18} />,
    },
  ];

  return (
    <fieldset className="grid gap-3 sm:grid-cols-2">
      <legend className="sr-only">{dict.checkout.paymentHeading}</legend>

      {options.map((option) => {
        const selected = value === option.id;

        return (
          <label
            key={option.id}
            className={cn(
              "flex cursor-pointer gap-3 rounded border p-4 transition-colors duration-300",
              "has-[:focus-visible]:outline has-[:focus-visible]:outline-2",
              "has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
              selected
                ? "border-ink bg-sand"
                : "border-line bg-surface hover:border-muted",
            )}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.id}
              checked={selected}
              onChange={() => onChange(option.id)}
              className="sr-only"
            />

            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                selected ? "bg-inverse text-on-inverse" : "bg-shell text-gold",
              )}
            >
              {selected ? <CheckIcon size={16} /> : option.icon}
            </span>

            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-ink">
                {option.label}
              </span>
              <span className="mt-1 block text-[11px] leading-relaxed text-muted">
                {option.note}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
