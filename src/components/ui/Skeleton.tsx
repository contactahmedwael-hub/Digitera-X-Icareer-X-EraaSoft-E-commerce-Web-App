import { cn } from "@/lib/utils/cn";

type SkeletonProps = {
  className?: string;
};

/** Shimmering placeholder used while data is loading. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "skeleton-sheen block rounded animate-[shimmer_1.4s_ease-in-out_infinite]",
        className,
      )}
    />
  );
}
