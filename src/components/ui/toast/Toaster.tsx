"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckIcon, CloseIcon, AlertIcon } from "@/components/icons";
import { useToastStore, type Toast } from "@/components/ui/toast/toast.store";
import { cn } from "@/lib/utils/cn";

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed top-5 inset-x-0 z-50 flex flex-col items-center gap-2.5 px-4 sm:top-6 sm:right-6 sm:inset-x-auto sm:items-end"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </aside>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const isSuccess = toast.type === "success" || !toast.type;
  const isWarning = toast.type === "warning";

  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto flex w-full max-w-[380px] items-center gap-3.5 rounded-2xl border bg-surface/95 p-3.5 shadow-2xl backdrop-blur-md",
        "animate-[fade-up_0.35s_cubic-bezier(0.22,1,0.36,1)_both]",
        isSuccess && "border-gold/40 shadow-[0_12px_32px_-10px_rgba(197,168,128,0.35)]",
        isWarning && "border-amber-500/40 shadow-[0_12px_32px_-10px_rgba(245,158,11,0.35)]",
        toast.type === "info" && "border-line shadow-lg",
      )}
    >
      {/* Toast Thumbnail Image or Icon Badge */}
      {toast.image ? (
        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-line bg-shell">
          <Image
            src={toast.image}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            isSuccess && "bg-emerald-500/10 text-emerald-600",
            isWarning && "bg-amber-500/10 text-amber-600",
            toast.type === "info" && "bg-gold/15 text-gold",
          )}
        >
          {isSuccess && <CheckIcon size={18} />}
          {isWarning && <AlertIcon size={18} />}
          {toast.type === "info" && <CheckIcon size={18} />}
        </div>
      )}

      {/* Message and Title */}
      <div className="flex flex-1 min-w-0 flex-col gap-0.5 text-start">
        <p className="text-[13px] font-semibold text-ink leading-tight truncate">
          {toast.title}
        </p>
        {toast.message ? (
          <p className="text-[11px] text-muted leading-snug line-clamp-2">
            {toast.message}
          </p>
        ) : null}

        {/* Optional Action (e.g. "View Bag") */}
        {toast.action ? (
          <div className="mt-1.5 flex items-center gap-2">
            {toast.action.href ? (
              <Link
                href={toast.action.href}
                onClick={onDismiss}
                className="text-[11px] font-bold text-gold uppercase tracking-wider underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                {toast.action.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick?.();
                  onDismiss();
                }}
                className="text-[11px] font-bold text-gold uppercase tracking-wider underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                {toast.action.label}
              </button>
            )}
          </div>
        ) : null}
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-shell hover:text-ink"
      >
        <CloseIcon size={14} />
      </button>
    </div>
  );
}
