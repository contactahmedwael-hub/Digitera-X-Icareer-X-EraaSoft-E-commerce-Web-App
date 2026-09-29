"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@/components/icons";
import { showToast } from "@/components/ui/toast";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type AddToCartButtonProps = AddToCartInput & {
  disabled?: boolean;
  className?: string;
};

/** Adds the selected variant and confirms it inline — no toast library. */
export function AddToCartButton({
  disabled = false,
  className,
  ...input
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { dict, fill } = useI18n();
  const [added, setAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  function handleClick() {
    addItem(input);
    setAdded(true);
    showToast({
      title: dict.product.added,
      message: `${input.name} (${input.variantLabel})`,
      image: input.image,
      type: "success",
      action: {
        label: dict.nav.cart,
        href: "/cart",
      },
    });
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setAdded(false), 2200);
  }

  const total = input.unitPrice * (input.quantity ?? 1);

  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-2", className)}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded bg-inverse py-4",
          "text-[13px] font-bold text-on-inverse uppercase",
          "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:opacity-90 active:scale-[0.99]",
          "disabled:cursor-not-allowed disabled:bg-[#b8b2aa] disabled:active:scale-100",
        )}
      >
        {added ? <CheckIcon size={15} /> : null}
        {disabled
          ? dict.product.unavailable
          : added
            ? dict.product.added
            : fill(dict.product.addToCartWithPrice, { total })}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-[11px] text-success transition-opacity duration-300",
          added ? "opacity-100" : "opacity-0",
        )}
      >
        {added
          ? fill(dict.product.addedBody, {
              name: input.name,
              variant: input.variantLabel,
            })
          : ""}
      </p>
    </div>
  );
}
