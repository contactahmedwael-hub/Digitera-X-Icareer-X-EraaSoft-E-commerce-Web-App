"use client";

import { useState } from "react";
import Link from "next/link";
import { LockIcon, MailIcon, UserIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/features/auth/hooks/useSession";
import { ProfileEditor } from "@/features/auth/components/ProfileEditor";
import type { AuthUser } from "@/features/auth/types/auth.types";
import { getInitials } from "@/features/auth/utils/auth.identity";
import { cartPaths } from "@/features/cart";
import { OrderHistory } from "@/features/checkout";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function AccountPage() {
  const { dict } = useI18n();
  const { user, signIn, signOut } = useSession();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  function handleSave(next: AuthUser) {
    signIn(next);
    setEditing(false);
    setSaved(true);
  }

  const details = [
    {
      key: "name",
      icon: <UserIcon size={15} />,
      label: dict.auth.name,
      value: user.name,
    },
    {
      key: "email",
      icon: <MailIcon size={15} />,
      label: dict.auth.email,
      value: user.email,
    },
  ];

  return (
    <section className="px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-14">
      <div className="mx-auto w-full max-w-[720px] animate-[fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
        <header className="flex flex-wrap items-center gap-4">
          <span
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-full bg-inverse font-serif text-[18px] text-on-inverse"
          >
            {getInitials(user)}
          </span>
          <div className="min-w-0">
            <h1 className="font-serif text-[30px] leading-tight text-ink sm:text-[36px]">
              {dict.auth.accountTitle}
            </h1>
            <p className="mt-1 truncate text-[13px] text-muted">
              {dict.auth.accountSubtitle}
            </p>
          </div>
        </header>

        {editing ? (
          <div className="mt-8">
            <ProfileEditor
              user={user}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
            />
          </div>
        ) : (
          <>
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {details.map((detail) => (
                <div
                  key={detail.key}
                  className="rounded border border-line bg-surface p-4"
                >
                  <dt className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                    <span aria-hidden="true">{detail.icon}</span>
                    {detail.label}
                  </dt>
                  <dd className="mt-2 truncate text-[14px] text-ink">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => {
                setSaved(false);
                setEditing(true);
              }}
              className="mt-3 text-[12px] font-semibold text-gold underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline"
            >
              {dict.auth.editProfile}
            </button>
          </>
        )}

        {saved ? (
          <p role="status" className="mt-3 text-[12px] text-success">
            {dict.auth.profileSaved}
          </p>
        ) : null}

        <div className="mt-4">
          <OrderHistory />
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link href={productPaths.list}>
            <Button variant="primary">{dict.common.browseAll}</Button>
          </Link>
          <Link href={cartPaths.cart}>
            <Button variant="secondary">{dict.cart.title}</Button>
          </Link>
        </div>

        <p className="mt-4 flex items-start gap-2 rounded border border-line bg-sand px-3 py-2.5 text-[11px] leading-relaxed text-muted">
          <LockIcon size={14} className="mt-0.5 shrink-0 text-gold" />
          {dict.auth.demoNotice}
        </p>

        <div className="mt-6 border-t border-line pt-6">
          <Button
            variant="secondary"
            size="lg"
            onClick={signOut}
            className="w-full sm:w-auto"
          >
            {dict.auth.signOut}
          </Button>
        </div>
      </div>
    </section>
  );
}
