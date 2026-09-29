"use client";

import { useCallback } from "react";
import type { Order } from "@/features/checkout/types/checkout.types";
import {
  buildInvoiceMessage,
  buildWhatsAppUrl,
  getWhatsAppNumber,
} from "@/features/checkout/utils/whatsapp";
import { getPaymentLabel } from "@/features/checkout/utils/order.format";
import { productCopy } from "@/lib/i18n/dictionaries/products";
import { useI18n } from "@/lib/i18n/I18nProvider";

/**
 * Turns a placed order into the wa.me link that carries its invoice, in
 * whichever language the shopper is reading.
 */
export function useInvoice() {
  const { dict, locale } = useI18n();

  const buildUrl = useCallback(
    (order: Order): string | undefined => {
      const message = buildInvoiceMessage(
        order,
        locale,
        {
          invoice: dict.checkout.invoice,
          orderNumber: dict.checkout.orderNumber,
          placedOn: dict.checkout.placedOn,
          items: dict.checkout.items,
          subtotal: dict.checkout.subtotal,
          giftWrapping: dict.cart.giftWrapping,
          shipping: dict.checkout.shipping,
          total: dict.checkout.total,
          complimentary: dict.cart.complimentary,
          deliverTo: dict.checkout.deliverTo,
          phone: dict.checkout.phone,
          notes: dict.checkout.notes,
          payment: dict.checkout.paidWith,
          paymentValue: getPaymentLabel(order.paymentMethod, {
            cashOnDelivery: dict.checkout.cashOnDelivery,
            bankTransfer: dict.checkout.bankTransfer,
          }),
        },
        (productId, fallback) =>
          productCopy[locale]?.[productId]?.name ?? fallback,
      );

      return buildWhatsAppUrl(message);
    },
    [dict, locale],
  );

  return { buildUrl, available: Boolean(getWhatsAppNumber()) };
}
