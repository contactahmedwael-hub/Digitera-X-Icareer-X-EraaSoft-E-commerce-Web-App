"use client";

import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { useInvoice } from "@/features/checkout/hooks/useInvoice";
import type { Order } from "@/features/checkout/types/checkout.types";
import { useI18n } from "@/lib/i18n/I18nProvider";

type WhatsAppInvoiceButtonProps = {
  order: Order;
};

/** Re-sends a placed order's invoice; hidden when no number is configured. */
export function WhatsAppInvoiceButton({ order }: WhatsAppInvoiceButtonProps) {
  const { dict } = useI18n();
  const { buildUrl, available } = useInvoice();

  if (!available) return null;

  const url = buildUrl(order);
  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Button variant="gold">
        <WhatsAppIcon size={16} />
        {dict.checkout.sendOnWhatsApp}
      </Button>
    </a>
  );
}
