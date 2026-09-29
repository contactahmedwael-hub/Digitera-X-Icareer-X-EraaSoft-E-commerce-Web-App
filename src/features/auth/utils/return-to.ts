/**
 * Where to send someone once they have signed in. The path travels in the URL
 * as `?next=`, so being bounced to the sign-in page and coming back is one
 * uninterrupted errand rather than two.
 */
export const RETURN_PARAM = "next";

/**
 * Only same-site paths are honoured. Anything absolute, protocol-relative or
 * otherwise off-site is discarded — an open redirect is a real vulnerability,
 * not a hypothetical one.
 */
export function sanitiseReturnPath(
  value: string | null | undefined,
): string | undefined {
  if (!value) return undefined;

  const path = value.trim();
  if (!path.startsWith("/")) return undefined;
  if (path.startsWith("//")) return undefined;
  if (path.includes("\\")) return undefined;

  return path;
}

export function withReturnPath(target: string, from: string): string {
  const safe = sanitiseReturnPath(from);
  if (!safe) return target;

  return `${target}?${RETURN_PARAM}=${encodeURIComponent(safe)}`;
}
