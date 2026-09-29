"use client";

import { useId, useState } from "react";
import { AlertIcon, EyeIcon, EyeOffIcon } from "@/components/icons";
import type { ValidationKey } from "@/features/auth/types/auth.types";
import { useAuthMessages } from "@/features/auth/hooks/useAuthMessages";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type AuthFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: ValidationKey;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * One labelled field. Password fields grow a reveal toggle; errors are wired to
 * the input through `aria-describedby` so screen readers announce them.
 */
export function AuthField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  icon,
  children,
}: AuthFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const { dict } = useI18n();
  const messageFor = useAuthMessages();
  const [revealed, setRevealed] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && revealed ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-wide text-muted uppercase"
      >
        {label}
      </label>

      <div
        className={cn(
          "flex items-center gap-2 rounded border bg-surface px-3 transition-colors duration-300",
          "focus-within:border-gold",
          error ? "border-[#c4564a]" : "border-line",
        )}
      >
        {icon ? (
          <span className="shrink-0 text-muted" aria-hidden="true">
            {icon}
          </span>
        ) : null}

        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 bg-transparent py-3 text-[13px] text-ink outline-none placeholder:text-muted"
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setRevealed((open) => !open)}
            aria-label={
              revealed ? dict.auth.hidePassword : dict.auth.showPassword
            }
            aria-pressed={revealed}
            className="shrink-0 rounded p-1 text-muted transition-colors duration-300 hover:text-ink"
          >
            {revealed ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </button>
        ) : null}
      </div>

      {children}

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
