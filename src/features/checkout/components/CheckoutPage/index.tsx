"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertIcon, ArrowRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { BottleLoader } from "@/components/ui/BottleLoader";
import { showToast } from "@/components/ui/toast";
import { useSession } from "@/features/auth";
import { cartPaths, useCart } from "@/features/cart";
import { useCartHydrated } from "@/features/cart/hooks/useCartHydrated";
import { OrderSummaryPanel } from "@/features/checkout/components/OrderSummaryPanel";
import { PaymentMethodPicker } from "@/features/checkout/components/PaymentMethodPicker";
import { buildOrder } from "@/features/checkout/components/CheckoutPage/build-order";
import { EmptyCheckout } from "@/features/checkout/components/CheckoutPage/EmptyCheckout";
import { ShippingFields } from "@/features/checkout/components/CheckoutPage/ShippingFields";
import { useInvoice } from "@/features/checkout/hooks/useInvoice";
import { useOrders } from "@/features/checkout/hooks/useOrders";
import { checkoutPaths } from "@/features/checkout/paths";
import type {
  CheckoutErrors,
  CheckoutValues,
  ShippingField,
} from "@/features/checkout/types/checkout.types";
import {
  hasCheckoutErrors,
  validateCheckout,
} from "@/features/checkout/utils/checkout.validation";
import { useI18n } from "@/lib/i18n/I18nProvider";

const SIMULATED_LATENCY_MS = 900;

export function CheckoutPage() {
  const { dict } = useI18n();
  const router = useRouter();
  const { user } = useSession();
  const { lines, total, clear } = useCart();
  const cartReady = useCartHydrated();
  const { placeOrder } = useOrders();
  const { buildUrl } = useInvoice();

  // The signed-in visitor's details are the obvious starting point.
  const [values, setValues] = useState<CheckoutValues>({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
    paymentMethod: "cash-on-delivery",
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [placing, setPlacing] = useState(false);

  function update(field: ShippingField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateCheckout(next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const found = validateCheckout(values);
    setErrors(found);
    if (hasCheckoutErrors(found) || lines.length === 0) return;

    setPlacing(true);

    const order = buildOrder({
      lines,
      subtotal: total,
      values,
      ownerEmail: user?.email ?? values.email.trim(),
    });

    // Opened here, inside the click, so the browser treats it as the visitor's
    // own action. Moving it into the timeout below would get it blocked.
    const invoiceUrl = buildUrl(order);
    if (invoiceUrl) window.open(invoiceUrl, "_blank", "noopener,noreferrer");

    // Stands in for the network round-trip; there is no backend in this build.
    setTimeout(() => {
      placeOrder(order);
      clear();
      showToast({
        title: dict.checkout.confirmedTitle,
        message: `${dict.checkout.orderNumber}: ${order.id}`,
        type: "success",
      });
      router.replace(checkoutPaths.order(order.id));
    }, SIMULATED_LATENCY_MS);
  }

  if (!cartReady) {
    return <BottleLoader label={dict.cart.opening} />;
  }

  if (lines.length === 0) {
    return <EmptyCheckout />;
  }

  return (
    <section className="px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-14">
      <h1 className="font-serif text-[32px] text-ink sm:text-[40px]">
        {dict.checkout.title}
      </h1>
      <p className="mt-1 text-[13px] text-muted">{dict.checkout.subtitle}</p>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-10"
      >
        <div className="flex flex-col gap-8">
          <section aria-labelledby="shipping-heading">
            <h2
              id="shipping-heading"
              className="text-[11px] font-bold tracking-[0.16em] text-ink uppercase"
            >
              {dict.checkout.shippingHeading}
            </h2>
            <div className="mt-4">
              <ShippingFields
                values={values}
                errors={errors}
                onChange={update}
              />
            </div>
          </section>

          <section aria-labelledby="payment-heading">
            <h2
              id="payment-heading"
              className="text-[11px] font-bold tracking-[0.16em] text-ink uppercase"
            >
              {dict.checkout.paymentHeading}
            </h2>
            <div className="mt-4">
              <PaymentMethodPicker
                value={values.paymentMethod}
                onChange={(paymentMethod) =>
                  setValues((current) => ({ ...current, paymentMethod }))
                }
              />
            </div>
          </section>

          <Link
            href={cartPaths.cart}
            className="text-[12px] text-muted underline-offset-4 transition-colors duration-300 hover:text-gold hover:underline"
          >
            {dict.checkout.backToBag}
          </Link>
        </div>

        <OrderSummaryPanel lines={lines} subtotal={total}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={placing}
            aria-busy={placing}
            className="mt-5 w-full"
          >
            {placing ? (
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              />
            ) : (
              <ArrowRightIcon size={16} className="rtl:-scale-x-100" />
            )}
            {placing ? dict.checkout.placingOrder : dict.checkout.placeOrder}
          </Button>

          <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-muted">
            <AlertIcon size={13} className="mt-0.5 shrink-0 text-gold" />
            {dict.checkout.demoNotice}
          </p>
        </OrderSummaryPanel>
      </form>
    </section>
  );
}
