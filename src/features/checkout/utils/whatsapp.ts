import type { Locale } from "@/lib/i18n/locale";
import type { Order } from "@/features/checkout/types/checkout.types";
import { formatOrderDate } from "@/features/checkout/utils/order.format";

/**
 * The shop has no backend, so WhatsApp is where an order actually goes. The
 * number is read from the environment rather than committed — note that a
 * front-end can only ever hide it from the repository, not from the browser.
 */
export function getWhatsAppNumber(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (!raw) return undefined;

  // wa.me wants digits only: no +, spaces, dashes or brackets.
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 ? digits : undefined;
}

type InvoiceLabels = {
  invoice: string;
  orderNumber: string;
  placedOn: string;
  items: string;
  subtotal: string;
  giftWrapping: string;
  shipping: string;
  total: string;
  complimentary: string;
  deliverTo: string;
  phone: string;
  notes: string;
  payment: string;
  /** Already resolved to the chosen method, e.g. "Cash on delivery". */
  paymentValue: string;
};

const RULE = "━━━━━━━━━━━━━━━━━━";

function money(amount: number): string {
  return `$${amount}`;
}

/** Lays the order out as an invoice rather than a sentence. */
export function buildInvoiceMessage(
  order: Order,
  locale: Locale,
  labels: InvoiceLabels,
  productName: (productId: string, fallback: string) => string,
): string {
  const address = order.shippingAddress;

  const lines = [
    `🧾 ${labels.invoice} — ODORATUS`,
    RULE,
    `${labels.orderNumber}: ${order.id}`,
    `${labels.placedOn}: ${formatOrderDate(order.placedAt, locale)}`,
    "",
    `▪ ${labels.items}`,
    ...order.lines.map(
      (line) =>
        `   ${line.quantity}× ${productName(line.productId, line.name)}` +
        ` (${line.variantLabel}) — ${money(line.unitPrice * line.quantity)}`,
    ),
    RULE,
    `${labels.subtotal}: ${money(order.subtotal)}`,
    `${labels.giftWrapping}: ${
      order.giftWrapping > 0 ? money(order.giftWrapping) : labels.complimentary
    }`,
    `${labels.shipping}: ${
      order.shipping > 0 ? money(order.shipping) : labels.complimentary
    }`,
    `*${labels.total}: ${money(order.total)}*`,
    RULE,
    "",
    `▪ ${labels.deliverTo}`,
    `   ${address.fullName}`,
    `   ${address.address}`,
    `   ${address.city}${address.postalCode ? `, ${address.postalCode}` : ""}`,
    `   ${labels.phone}: ${address.phone}`,
    ...(address.notes ? [`   ${labels.notes}: ${address.notes}`] : []),
    "",
    `▪ ${labels.payment}: ${labels.paymentValue}`,
  ];

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string | undefined {
  const number = getWhatsAppNumber();
  if (!number) return undefined;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
