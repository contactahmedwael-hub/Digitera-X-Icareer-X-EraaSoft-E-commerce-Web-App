"use client";

import { useId } from "react";
import { AlertIcon, CheckIcon } from "@/components/icons";
import type { ValidationKey } from "@/features/auth/types/auth.types";
import { useAuthMessages } from "@/features/auth/hooks/useAuthMessages";
import { cn } from "@/lib/utils/cn";

type AuthCheckboxProps = {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: ValidationKey;
};

/**
 * A real `<input type="checkbox">` kept visually hidden, so keyboard focus,
 * form semantics and assistive technology all behave normally while the box
 * itself is drawn to match the house style.
 */
export function AuthCheckbox({
  label,
  checked,
  onChange,
  error,
}: AuthCheckboxProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const messageFor = useAuthMessages();

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="peer sr-only"
        />
        <label
          htmlFor={id}
          className={cn(
            "mt-px flex size-[18px] shrink-0 cursor-pointer items-center justify-center rounded-[3px] border",
            "transition-all duration-300 peer-focus-visible:outline peer-focus-visible:outline-2",
            "peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
            checked
              ? "border-inverse bg-inverse text-on-inverse"
              : error
                ? "border-[#c4564a] bg-surface"
                : "border-line bg-surface",
          )}
        >
          {checked ? <CheckIcon size={12} /> : null}
        </label>
        <label
          htmlFor={id}
          className="cursor-pointer text-[12px] leading-relaxed text-muted"
        >
          {label}
        </label>
      </div>

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
