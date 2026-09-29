import { cn } from "@/lib/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded border border-line bg-surface px-3 py-2 text-[13px] text-ink outline-none transition-colors duration-300 placeholder:text-muted focus:border-gold",
        className,
      )}
      {...props}
    />
  );
}
