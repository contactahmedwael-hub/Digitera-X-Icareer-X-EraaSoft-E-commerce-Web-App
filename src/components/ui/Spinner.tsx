import { cn } from "@/lib/utils/cn";

type SpinnerProps = {
  label?: string;
  className?: string;
  /** Full-viewport overlay while a route is loading. */
  fullscreen?: boolean;
};

/**
 * Gold ring spinner used for route-level loading.
 * CSS-only — no animation library.
 */
export function Spinner({
  label = "Loading",
  className,
  fullscreen = false,
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullscreen
          ? "fixed inset-0 z-50 bg-page/80 backdrop-blur-[2px]"
          : "py-16",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-10 animate-spin rounded-full border-2 border-line border-t-gold"
      />
      <span className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
        {label}
      </span>
    </div>
  );
}