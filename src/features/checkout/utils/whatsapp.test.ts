import type { Order } from "@/features/checkout/types/checkout.types";
import {
  buildInvoiceMessage,
  buildWhatsAppUrl,
  getWhatsAppNumber,
} from "@/features/checkout/utils/whatsapp";

const labels = {
  invoice: "Order invoice",
  orderNumber: "Order number",
  placedOn: "Placed on",
  items: "Items",
  subtotal: "Subtotal",
  giftWrapping: "Gift wrapping",
  shipping: "Shipping",
  total: "Total",
  complimentary: "Complimentary",
  deliverTo: "Deliver to",
  phone: "Phone",
  notes: "Notes",
  payment: "Payment",
  paymentValue: "Cash on delivery",
};

const order: Order = {
  id: "ODR-TEST-0001",
  ownerEmail: "mo@example.com",
  placedAt: "2026-09-23T10:00:00.000Z",
  lines: [
    {
      id: "a",
      productId: "santal-parchment",
      variantId: "100ml",
      name: "Santal Parchment",
      variantLabel: "100 ml",
      unitPrice: 220,
      giftWrapping: false,
      quantity: 2,
    },
  ],
  subtotal: 440,
  shipping: 0,
  giftWrapping: 0,
  total: 440,
  paymentMethod: "cash-on-delivery",
  shippingAddress: {
    fullName: "Mohamed Magdy",
    email: "mo@example.com",
    phone: "+20 100 000 0000",
    address: "12 Nile Street, Maadi",
    city: "Cairo",
    postalCode: "11728",
    notes: "",
  },
};

const name = (_id: string, fallback: string) => fallback;

describe("buildInvoiceMessage", () => {
  const message = buildInvoiceMessage(order, "en", labels, name);

  it("leads with the order number and date", () => {
    expect(message).toContain("Order number: ODR-TEST-0001");
    expect(message).toContain("Placed on: 23 September 2026");
  });

  it("lists each line with its quantity, size and line total", () => {
    expect(message).toContain("2× Santal Parchment (100 ml) — $440");
  });

  it("shows a free shipping or wrapping charge as complimentary", () => {
    expect(message).toContain("Shipping: Complimentary");
    expect(message).toContain("Gift wrapping: Complimentary");
  });

  it("emphasises the total", () => {
    expect(message).toContain("*Total: $440*");
  });

  it("carries the full delivery address and the payment method", () => {
    expect(message).toContain("12 Nile Street, Maadi");
    expect(message).toContain("Cairo, 11728");
    expect(message).toContain("Phone: +20 100 000 0000");
    expect(message).toContain("Payment: Cash on delivery");
  });

  it("omits the notes row when there are none", () => {
    expect(message).not.toContain("Notes:");
  });

  it("includes the notes when they are given", () => {
    const withNotes = buildInvoiceMessage(
      {
        ...order,
        shippingAddress: { ...order.shippingAddress, notes: "Ring twice" },
      },
      "en",
      labels,
      name,
    );
    expect(withNotes).toContain("Notes: Ring twice");
  });

  it("charges are printed when they apply", () => {
    const charged = buildInvoiceMessage(
      { ...order, shipping: 12, giftWrapping: 8, total: 460 },
      "en",
      labels,
      name,
    );
    expect(charged).toContain("Shipping: $12");
    expect(charged).toContain("Gift wrapping: $8");
  });

  it("uses the translated product name when one exists", () => {
    const arabic = buildInvoiceMessage(order, "ar", labels, () => "سانتال");
    expect(arabic).toContain("سانتال");
  });
});

describe("the wa.me link", () => {
  const original = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  afterEach(() => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = original;
  });

  it("strips everything that is not a digit", () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "+20 120 861 1892";
    expect(getWhatsAppNumber()).toBe("201208611892");
  });

  it("is undefined when the number is unset or too short", () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "";
    expect(getWhatsAppNumber()).toBeUndefined();
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "123";
    expect(getWhatsAppNumber()).toBeUndefined();
  });

  it("encodes the message so the line breaks survive", () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "201208611892";
    const url = buildWhatsAppUrl("a\nb")!;
    expect(url).toBe("https://wa.me/201208611892?text=a%0Ab");
  });

  it("produces no link at all without a number", () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "";
    expect(buildWhatsAppUrl("x")).toBeUndefined();
  });
});
