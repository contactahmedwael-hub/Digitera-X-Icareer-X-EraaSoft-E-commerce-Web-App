import { iconDefaults, type IconProps } from "@/components/icons/icon.types";

/**
 * Odoratus house mark: a faceted flacon with a drop of oil at its heart.
 * Drawn by hand so the brand never depends on an icon package.
 */
export function OdoratusMark({ size = 22, ...props }: IconProps) {
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
      <path d="M10 2.5h4v2.2h-4z" />
      <path d="M9.4 6.9h5.2l2.1 3.3v8.4a2.9 2.9 0 0 1-2.9 2.9h-3.6a2.9 2.9 0 0 1-2.9-2.9v-8.4z" />
      <path d="M12 12.3c1.2 1.4 1.9 2.4 1.9 3.3a1.9 1.9 0 0 1-3.8 0c0-.9.7-1.9 1.9-3.3z" />
    </svg>
  );
}

export function GiftIcon({ size = 16, ...props }: IconProps) {
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
      <path d="M4 10h16v10H4zM4 7h16v3H4zM12 7v13" />
      <path d="M12 7S10.6 4 8.9 4A1.9 1.9 0 0 0 8.9 7.9M12 7s1.4-3 3.1-3a1.9 1.9 0 0 1 0 3.9" />
    </svg>
  );
}

export function LeafIcon({ size = 14, ...props }: IconProps) {
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
      <path d="M19 5c0 8-5.2 12-11 12 0-6.8 4.6-11 11-12z" />
      <path d="M8 17c1.8-3.4 4.2-5.8 7.5-7.5" />
    </svg>
  );
}

export function InstagramIcon({ size = 16, ...props }: IconProps) {
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
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.9 7.2h.01" strokeWidth={2} />
    </svg>
  );
}

export function CircleXIcon({ size = 16, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </svg>
  );
}

export function FacebookIcon({ size = 16, ...props }: IconProps) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 16, ...props }: IconProps) {
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
      <path d="M12 21a9 9 0 0 1-4.3-1.1L3 21l1.1-4.7A9 9 0 1 1 12 21z" />
      <path d="M8.5 9.5a.6.6 0 0 0-.5.6c0 1.4 1 3.2 2.5 4.7 1.5 1.5 3.3 2.5 4.7 2.5.3 0 .6-.2.6-.5l.7-1.4c.1-.2 0-.5-.2-.6l-1.8-.8c-.2-.1-.5 0-.6.2l-.5.6c-.6-.3-1.4-1.1-1.7-1.7l.6-.5c.2-.1.3-.4.2-.6l-.8-1.8c-.1-.2-.4-.3-.6-.2l-1.6.5z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 16, ...props }: IconProps) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function GitHubIcon({ size = 16, ...props }: IconProps) {
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
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function TikTokIcon({ size = 16, ...props }: IconProps) {
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
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 4.5" />
    </svg>
  );
}
