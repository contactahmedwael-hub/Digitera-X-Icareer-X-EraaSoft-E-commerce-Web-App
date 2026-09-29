import { cn } from "@/lib/utils/cn";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded border border-line bg-surface px-3 py-2 text-[13px] text-ink outline-none transition-colors duration-300 focus:border-gold",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
