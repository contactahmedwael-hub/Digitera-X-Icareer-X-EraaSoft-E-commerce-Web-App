import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-zinc-400",
  secondary:
    "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 disabled:text-zinc-400",
  ghost: "text-zinc-700 hover:bg-zinc-100 disabled:text-zinc-400",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed",
        variantClassName[variant],
        className,
      )}
      {...props}
    />
  );
}
