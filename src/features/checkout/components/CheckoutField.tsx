"use client";

import { useId } from "react";
import { AlertIcon } from "@/components/icons";
import { useCheckoutMessages } from "@/features/checkout/hooks/useCheckoutMessages";
import type { CheckoutErrorKey } from "@/features/checkout/types/checkout.types";
import { cn } from "@/lib/utils/cn";

type CheckoutFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  error?: CheckoutErrorKey;
  optional?: boolean;
  multiline?: boolean;
  className?: string;
};

export function CheckoutField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  error,
  optional = false,
  multiline = false,
  className,
}: CheckoutFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const messageFor = useCheckoutMessages();

  const controlClassName = cn(
    "w-full rounded border bg-surface px-3 py-3 text-[13px] text-ink outline-none",
    "transition-colors duration-300 placeholder:text-muted focus:border-gold",
    error ? "border-[#c4564a]" : "border-line",
  );

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-wide text-muted uppercase"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required={optional ? undefined : true}
          className={cn(controlClassName, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required={optional ? undefined : true}
          className={controlClassName}
        />
      )}

      {error ? (
        <p
          id={errorId}
          className="flex items-center gap-1.5 text-[11px] text-[#c4564a]"
        >
          <AlertIcon size={13} className="shrink-0" />
          {messageFor(error)}
        </p>
      ) : null}
    </div>
  );
}
