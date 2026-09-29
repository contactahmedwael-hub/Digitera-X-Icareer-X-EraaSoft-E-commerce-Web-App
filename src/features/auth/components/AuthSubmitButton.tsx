"use client";

import { Button } from "@/components/ui/Button";
import type { SubmitStatus } from "@/features/auth/types/auth.types";

type AuthSubmitButtonProps = {
  status: SubmitStatus;
  idleLabel: string;
  busyLabel: string;
  icon: React.ReactNode;
};

/** Submit control that swaps its label and grows a spinner while busy. */
export function AuthSubmitButton({
  status,
  idleLabel,
  busyLabel,
  icon,
}: AuthSubmitButtonProps) {
  const busy = status === "submitting";

  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      disabled={busy}
      aria-busy={busy}
      className="mt-1 w-full"
    >
      {busy ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        icon
      )}
      {busy ? busyLabel : idleLabel}
    </Button>
  );
}
