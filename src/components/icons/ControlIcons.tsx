import { iconDefaults, type IconProps } from "@/components/icons/icon.types";

export function SunIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...iconDefaults}
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
    </svg>
  );
}

export function MoonIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...iconDefaults}
      {...props}
    >
      <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z" />
    </svg>
  );
}

/** Two glyphs side by side — the usual "translate" mark. */
export function TranslateIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...iconDefaults}
      {...props}
    >
      <path d="M3 5h8M7 5V3.5M9 5c0 3.6-2.4 6.6-6 8M5 9c1 2 2.8 3.4 5 4.2" />
      <path d="M12 20l4.2-10 4.2 10M13.7 16.6h5" />
    </svg>
  );
}
