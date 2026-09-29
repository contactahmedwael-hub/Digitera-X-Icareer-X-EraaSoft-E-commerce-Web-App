import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    "bg-inverse text-on-inverse shadow-sm hover:shadow-md hover:opacity-95 active:scale-[0.98] disabled:bg-[#b8b2aa] disabled:shadow-none",
  secondary:
    "border border-line bg-surface text-ink shadow-xs hover:border-gold hover:bg-shell/80 hover:shadow-sm active:scale-[0.98] disabled:text-[#b8b2aa]",
  ghost:
    "text-muted hover:bg-shell/70 hover:text-ink active:scale-[0.98] disabled:text-[#b8b2aa]",
  gold:
    "bg-gold text-[#faf8f5] shadow-sm hover:bg-[#b8996f] hover:shadow-md active:scale-[0.98] disabled:bg-[#d8c7ad] disabled:shadow-none",
};

const sizeClassName: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[11px] rounded-lg tracking-wider",
  md: "h-10 px-4 text-[12px] rounded-xl tracking-wider",
  lg: "h-12 px-6 text-[13px] rounded-xl tracking-wider",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium uppercase select-none cursor-pointer",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-60",
        variantClassName[variant],
        sizeClassName[size],
        className,
      )}
      {...props}
    />
  );
}
