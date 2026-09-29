"use client";

import { cn } from "@/lib/utils/cn";

type SwitchProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
  id: string;
  className?: string;
};

/**
 * Native checkbox styled as a switch, so Space toggles it and screen
 * readers announce the state without any ARIA guesswork.
 */
export function Switch({
  checked,
  onChange,
  label,
  description,
  id,
  className,
}: SwitchProps) {
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 rounded-md bg-sand p-5",
        "transition-colors duration-300 hover:bg-shell",
        className,
      )}
    >
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-[13px] font-semibold text-ink">{label}</span>
        {description ? (
          <span id={descriptionId} className="text-[12px] text-muted">
            {description}
          </span>
        ) : null}
      </span>

      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        aria-describedby={descriptionId}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
          checked ? "bg-gold" : "bg-line",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-5 rounded-full bg-surface shadow-sm",
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            checked && "translate-x-5",
          )}
        />
      </span>
    </label>
  );
}
