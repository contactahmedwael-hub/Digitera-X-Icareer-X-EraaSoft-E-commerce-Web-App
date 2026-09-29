"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BottleLoader } from "@/components/ui/BottleLoader";
import { useSession } from "@/features/auth/hooks/useSession";
import {
  RETURN_PARAM,
  sanitiseReturnPath,
  withReturnPath,
} from "@/features/auth/utils/return-to";
import { useI18n } from "@/lib/i18n/I18nProvider";

type AuthGuardProps = {
  /** True when this page is for signed-in visitors only. */
  requireSession: boolean;
  redirectTo: string;
  /** Carry the current path along, so signing in returns the visitor here. */
  rememberReturn?: boolean;
  children: React.ReactNode;
};

/**
 * Guards a page on the session. The session lives in browser storage, so the
 * check can only run on the client — until it has, the loader stands in, which
 * also keeps the server and client markup identical on the first frame.
 */
export function AuthGuard({
  requireSession,
  redirectTo,
  rememberReturn = false,
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const search = params.toString();
  const { dict } = useI18n();
  const { isSignedIn, hydrated } = useSession();

  const allowed = requireSession ? isSignedIn : !isSignedIn;

  useEffect(() => {
    if (!hydrated || allowed) return;

    // A guest-only page reached with `?next=` means the visitor was already on
    // their way somewhere. Signing in should resume that, not divert them —
    // and agreeing with the form here avoids the two racing each other.
    if (!requireSession) {
      const resumeAt = sanitiseReturnPath(params.get(RETURN_PARAM));
      router.replace(resumeAt ?? redirectTo);
      return;
    }

    const here = search ? `${pathname}?${search}` : pathname;
    router.replace(
      rememberReturn ? withReturnPath(redirectTo, here) : redirectTo,
    );
  }, [
    hydrated,
    allowed,
    requireSession,
    redirectTo,
    rememberReturn,
    params,
    pathname,
    search,
    router,
  ]);

  if (!hydrated || !allowed) {
    return <BottleLoader label={dict.common.loading} />;
  }

  return <>{children}</>;
}
