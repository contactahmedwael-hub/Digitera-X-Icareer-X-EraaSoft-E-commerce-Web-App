import type { AuthUser } from "@/features/auth/types/auth.types";

/**
 * Signing in only asks for an email, but the header greets people by name.
 * The local part of the address is the best guess available without a backend:
 * "mohamed.magdy@example.com" becomes "Mohamed Magdy".
 */
export function nameFromEmail(email: string): string {
  const local = email.trim().split("@")[0] ?? "";

  const words = local
    .split(/[._\-+\d]+/)
    .map((word) => word.trim())
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase());

  return words.join(" ") || local;
}

/** Two letters for the header avatar. Falls back to the email if unnamed. */
export function getInitials(user: AuthUser): string {
  const source = user.name.trim() || user.email.trim();
  const words = source.split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}
