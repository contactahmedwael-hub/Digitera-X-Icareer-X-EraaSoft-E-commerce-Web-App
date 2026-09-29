import { cn } from "@/lib/utils/cn";

type BadgeTone = "neutral" | "muted" | "gold" | "success";

type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const toneClassName: Record<BadgeTone, string> = {
  neutral: "bg-shell text-ink",
  muted: "bg-sand text-muted",
  gold: "bg-gold/10 text-gold",
  success: "bg-success/10 text-success",
};

/** Pill label used for scent family, occasion and status copy. */
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
        "text-[11px] font-semibold uppercase",
        toneClassName[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
