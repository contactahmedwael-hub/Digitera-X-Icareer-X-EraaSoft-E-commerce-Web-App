"use client";

import type { PasswordStrength } from "@/features/auth/types/auth.types";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type PasswordStrengthMeterProps = {
  strength: PasswordStrength;
};

const filledSegments: Record<PasswordStrength, number> = {
  weak: 1,
  fair: 2,
  strong: 3,
};

const segmentColor: Record<PasswordStrength, string> = {
  weak: "bg-[#c4564a]",
  fair: "bg-gold",
  strong: "bg-success",
};

/** Three bars plus a word. The word carries the meaning; colour only echoes it. */
export function PasswordStrengthMeter({
  strength,
}: PasswordStrengthMeterProps) {
  const { dict } = useI18n();

  const label = {
    weak: dict.auth.strengthWeak,
    fair: dict.auth.strengthFair,
    strong: dict.auth.strengthStrong,
  }[strength];

  const filled = filledSegments[strength];

  return (
    <div className="mt-1 flex items-center gap-2">
      <div className="flex flex-1 gap-1" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-500",
              index < filled ? segmentColor[strength] : "bg-line",
            )}
          />
        ))}
      </div>
      <p className="text-[10px] font-semibold tracking-wide text-muted uppercase">
        <span className="sr-only">{dict.auth.strength}: </span>
        {label}
      </p>
    </div>
  );
}
