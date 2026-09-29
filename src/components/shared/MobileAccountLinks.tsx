"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authPaths, useSession } from "@/features/auth";
import { getInitials } from "@/features/auth/utils/auth.identity";
import { useI18n } from "@/lib/i18n/I18nProvider";

type MobileAccountLinksProps = {
  onNavigate: () => void;
};

const buttonBase =
  "flex-1 rounded py-2.5 text-center text-[11px] font-semibold uppercase transition-colors";

/** The account block inside the mobile drawer, where there is no dropdown. */
export function MobileAccountLinks({ onNavigate }: MobileAccountLinksProps) {
  const { dict } = useI18n();
  const router = useRouter();
  const { user, signOut } = useSession();

  function handleSignOut() {
    onNavigate();
    signOut();
    router.replace("/");
  }

  if (user) {
    return (
      <div className="mt-4">
        <div className="flex items-center gap-2.5 rounded border border-line px-3 py-2.5">
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-inverse text-[10px] font-bold text-on-inverse"
          >
            {getInitials(user)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[12px] font-medium text-ink">
              {user.name}
            </span>
            <span className="block truncate text-[11px] text-muted">
              {user.email}
            </span>
          </span>
        </div>

        <div className="mt-2 flex gap-2">
          <Link
            href={authPaths.account}
            onClick={onNavigate}
            className={`${buttonBase} border border-line text-ink hover:border-ink`}
          >
            {dict.auth.myAccount}
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className={`${buttonBase} bg-inverse text-on-inverse hover:opacity-90`}
          >
            {dict.auth.signOut}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex gap-2">
      <Link
        href={authPaths.login}
        onClick={onNavigate}
        className={`${buttonBase} border border-line text-ink hover:border-ink`}
      >
        {dict.auth.signIn}
      </Link>
      <Link
        href={authPaths.signup}
        onClick={onNavigate}
        className={`${buttonBase} bg-inverse text-on-inverse hover:opacity-90`}
      >
        {dict.auth.createAccount}
      </Link>
    </div>
  );
}
