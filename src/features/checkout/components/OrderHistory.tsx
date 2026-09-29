"use client";

import Link from "next/link";
import { ArrowRightIcon, BagIcon } from "@/components/icons";
import { useOrders } from "@/features/checkout/hooks/useOrders";
import { checkoutPaths } from "@/features/checkout/paths";
import { formatOrderDate } from "@/features/checkout/utils/order.format";
import { getOrderQuantity } from "@/features/checkout/utils/order";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** The orders block on the account page. */
export function OrderHistory() {
  const { dict, fill, locale } = useI18n();
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <section
        aria-labelledby="order-history-heading"
        className="rounded border border-line bg-surface p-6 text-center"
      >
        <BagIcon size={24} className="mx-auto text-gold" />
        <h2
          id="order-history-heading"
          className="mt-3 text-[11px] font-bold tracking-[0.16em] text-ink uppercase"
        >
          {dict.checkout.ordersTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-muted">
          {dict.checkout.ordersEmpty}
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="order-history-heading">
      <h2
        id="order-history-heading"
        className="text-[11px] font-bold tracking-[0.16em] text-ink uppercase"
      >
        {dict.checkout.ordersTitle}
      </h2>

      <ul className="mt-3 flex flex-col gap-2">
        {orders.map((order) => {
          const quantity = getOrderQuantity(order);

          return (
            <li key={order.id}>
              <Link
                href={checkoutPaths.order(order.id)}
                className="group flex items-center gap-3 rounded border border-line bg-surface p-4 transition-colors duration-300 hover:border-ink"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-ink">
                    {order.id}
                  </span>
                  <span className="block text-[11px] text-muted">
                    {formatOrderDate(order.placedAt, locale)} ·{" "}
                    {quantity === 1
                      ? dict.checkout.orderItemCountOne
                      : fill(dict.checkout.orderItemCount, {
                          count: quantity,
                        })}
                  </span>
                </span>

                <span className="shrink-0 text-[14px] font-semibold text-ink tabular-nums">
                  ${order.total}
                </span>

                <ArrowRightIcon
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
                <span className="sr-only">{dict.checkout.viewOrder}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
