import { cn } from "@/lib/utils/cn";

type BottleLoaderProps = {
  label?: string;
  className?: string;
};

/**
 * Brand loader: a flacon with a drop of oil falling inside it.
 * Hand-drawn SVG plus CSS keyframes — no animation library.
 */
export function BottleLoader({
  label = "Loading",
  className,
}: BottleLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex flex-col items-center gap-3 py-10", className)}
    >
      <svg
        viewBox="0 0 48 60"
        width={44}
        height={55}
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-ink"
      >
        <path d="M19 4h10v6H19z" />
        <path d="M17 12h14l5 8v29a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V20z" />
        <circle
          cx="24"
          cy="34"
          r="3"
          fill="currentColor"
          stroke="none"
          className="origin-center animate-[pour_1.3s_ease-in-out_infinite] text-gold"
        />
        <path d="M14 46h20" className="text-line" strokeWidth={1} />
      </svg>
      <span className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
        {label}
      </span>
    </div>
  );
}
