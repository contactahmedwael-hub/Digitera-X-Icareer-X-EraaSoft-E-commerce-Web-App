"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogInIcon, UserIcon, UserPlusIcon } from "@/components/icons";
import { useDismissable } from "@/components/shared/useDismissable";
import { authPaths, useSession } from "@/features/auth";
import { getInitials } from "@/features/auth/utils/auth.identity";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

type AccountMenuProps = {
  className?: string;
};

const itemClassName =
  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-start text-[12px] font-medium transition-colors duration-200 hover:bg-shell hover:text-gold";

/** The account control: an avatar when signed in, an outline when not. */
export function AccountMenu({ className }: AccountMenuProps) {
  const { dict, fill } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isSignedIn, signOut } = useSession();

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  useDismissable(open, containerRef, close);

  function closeAndRestoreFocus() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleSignOut() {
    setOpen(false);
    signOut();
    router.replace("/");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={
          user
            ? fill(dict.auth.accountGreeting, { name: user.name })
            : dict.nav.account
        }
        className={className}
      >
        {user ? (
          <span
            aria-hidden="true"
            className="flex size-full items-center justify-center rounded-full bg-inverse text-[10px] font-bold text-on-inverse"
          >
            {getInitials(user)}
          </span>
        ) : (
          <UserIcon size={20} />
        )}
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={dict.nav.account}
          onKeyDown={(event) => {
            if (event.key === "Escape") closeAndRestoreFocus();
          }}
          className={cn(
            "absolute end-0 top-[calc(100%+10px)] z-50 w-[232px] overflow-hidden rounded-xl",
            "border border-line bg-surface p-1.5 shadow-[0_18px_50px_-24px_rgba(26,26,26,0.55)]",
            "origin-top animate-[scale-in_0.2s_cubic-bezier(0.22,1,0.36,1)_both]",
          )}
        >
          {isSignedIn && user ? (
            <>
              <div className="border-b border-line px-3 pt-2 pb-3">
                <p className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  {dict.auth.signedInAs}
                </p>
                <p className="mt-1.5 truncate text-[13px] font-medium text-ink">
                  {user.name}
                </p>
                <p className="truncate text-[11px] text-muted">{user.email}</p>
              </div>

              <Link
                href={authPaths.account}
                role="menuitem"
                onClick={close}
                aria-current={
                  pathname === authPaths.account ? "page" : undefined
                }
                className={cn(
                  itemClassName,
                  "mt-1.5",
                  pathname === authPaths.account
                    ? "bg-shell text-gold"
                    : "text-ink",
                )}
              >
                <UserIcon size={15} aria-hidden="true" className="text-muted" />
                {dict.auth.myAccount}
              </Link>

              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                className={cn(itemClassName, "text-ink")}
              >
                <LogInIcon
                  size={15}
                  aria-hidden="true"
                  className="text-muted rtl:-scale-x-100"
                />
                {dict.auth.signOut}
              </button>
            </>
          ) : (
            <>
              <p className="px-3 pt-2 pb-2.5 text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                {dict.nav.account}
              </p>

              <Link
                href={authPaths.login}
                role="menuitem"
                onClick={close}
                className={cn(itemClassName, "text-ink")}
              >
                <LogInIcon
                  size={15}
                  aria-hidden="true"
                  className="text-muted"
                />
                {dict.auth.signIn}
              </Link>

              <Link
                href={authPaths.signup}
                role="menuitem"
                onClick={close}
                className={cn(itemClassName, "text-ink")}
              >
                <UserPlusIcon
                  size={15}
                  aria-hidden="true"
                  className="text-muted"
                />
                {dict.auth.createAccount}
              </Link>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
