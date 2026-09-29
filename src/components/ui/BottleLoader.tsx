import { cn } from "@/lib/utils/cn";

type BottleLoaderProps = {
  label?: string;
  className?: string;
  /** Full-viewport overlay while a route is loading. */
  fullscreen?: boolean;
};

/**
 * Brand loader: a flacon with a drop of oil falling inside it.
 * Hand-drawn SVG plus CSS keyframes — no animation library.
 */
export function BottleLoader({
  label = "Loading",
  className,
  fullscreen = false,
}: BottleLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-5",
        fullscreen
          ? "fixed inset-0 z-50 bg-page/90 backdrop-blur-[2px]"
          : "py-10",
        className,
      )}
    >
      <svg
        viewBox="0 0 48 60"
        width={88}
        height={110}
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold drop-shadow-[0_0_18px_rgba(197,168,128,0.55)]"
      >
        <path d="M19 4h10v6H19z" />
        <path d="M17 12h14l5 8v29a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V20z" />
        <circle
          cx="24"
          cy="30"
          r="4.5"
          fill="currentColor"
          stroke="none"
          className="origin-center animate-[pour_1.3s_ease-in-out_infinite] text-gold"
        />
        <path d="M14 46h20" strokeWidth={1.4} />
      </svg>
      <span className="text-[13px] font-semibold tracking-[0.22em] text-ink uppercase">
        {label}
      </span>
    </div>
  );
}