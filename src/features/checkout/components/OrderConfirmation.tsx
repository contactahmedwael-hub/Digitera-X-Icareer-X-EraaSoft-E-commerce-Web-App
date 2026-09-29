"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { BottleLoader } from "@/components/ui/BottleLoader";
import { authPaths } from "@/features/auth";
import { OrderSummaryPanel } from "@/features/checkout/components/OrderSummaryPanel";
import { WhatsAppInvoiceButton } from "@/features/checkout/components/WhatsAppInvoiceButton";
import { useOrders } from "@/features/checkout/hooks/useOrders";
import {
  formatOrderDate,
  getPaymentLabel,
} from "@/features/checkout/utils/order.format";
import { productPaths } from "@/features/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

type OrderConfirmationProps = {
  orderId: string;
};

export function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  const { dict, fill, locale } = useI18n();
  const { findOrder, hydrated } = useOrders();

  // Orders live in browser storage, so nothing is known until it has loaded.
  if (!hydrated) {
    return <BottleLoader label={dict.common.loading} />;
  }

  const order = findOrder(orderId);

  if (!order) {
    return (
      <section className="flex flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="font-serif text-[26px] text-ink">
          {dict.checkout.notFoundTitle}
        </h1>
        <p className="max-w-sm text-[13px] leading-relaxed text-muted">
          {dict.checkout.notFoundBody}
        </p>
        <Link href={authPaths.account}>
          <Button>{dict.auth.myAccount}</Button>
        </Link>
      </section>
    );
  }

  const { shippingAddress: address } = order;

  const facts = [
    { key: "number", label: dict.checkout.orderNumber, value: order.id },
    {
      key: "date",
      label: dict.checkout.placedOn,
      value: formatOrderDate(order.placedAt, locale),
    },
    {
      key: "payment",
      label: dict.checkout.paidWith,
      value: getPaymentLabel(order.paymentMethod, {
        cashOnDelivery: dict.checkout.cashOnDelivery,
        bankTransfer: dict.checkout.bankTransfer,
      }),
    },
  ];

  return (
    <section className="px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-14">
      <header className="animate-[fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both] text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success/12 text-success">
          <CheckIcon size={28} />
        </span>
        <h1 className="mt-4 font-serif text-[30px] leading-tight text-ink sm:text-[38px]">
          {dict.checkout.confirmedTitle}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted">
          {fill(dict.checkout.confirmedBody, {
            name: address.fullName,
            email: address.email,
          })}
        </p>
      </header>

      <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-10">
        <div className="flex flex-col gap-4">
          <dl className="grid gap-3 sm:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact.key}
                className="rounded border border-line bg-surface p-4"
              >
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-[13px] break-words text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="rounded border border-line bg-surface p-5">
            <h2 className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
              {dict.checkout.deliverTo}
            </h2>
            <address className="mt-2.5 text-[13px] leading-relaxed text-ink not-italic">
              {address.fullName}
              <br />
              {address.address}
              <br />
              {address.city}
              {address.postalCode ? `, ${address.postalCode}` : ""}
              <br />
              {address.phone}
            </address>
            {address.notes ? (
              <p className="mt-3 border-t border-line pt-3 text-[12px] leading-relaxed text-muted">
                {address.notes}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <WhatsAppInvoiceButton order={order} />
            <Link href={productPaths.list}>
              <Button variant="primary">{dict.common.browseAll}</Button>
            </Link>
            <Link href={authPaths.account}>
              <Button variant="secondary">{dict.auth.myAccount}</Button>
            </Link>
          </div>
        </div>

        <OrderSummaryPanel lines={order.lines} subtotal={order.subtotal} />
      </div>
    </section>
  );
}
