# Task: Product Details Page (US-04)

This document is the source of truth for the current task. Follow it exactly.
Design reference: Figma "Digitera - Frontend Engineering Bootcamp" -> Product Detail page.

---

## 1. Scope

Implement the product details page to match the Figma design.

**In scope**

- Product image gallery (main image + thumbnails)
- Product info: name, SKU, price, availability, description
- Variant selection: bottle size (volume) and gift wrapping
- Quantity selector
- Add to cart with the correct variant price
- Scent Anatomy section (top / heart / base notes)
- Related products section ("Olfactory Companions")
- Site footer
- Announcement bar

**Out of scope — do NOT implement**

Checkout, WhatsApp ordering, FAQs, reviews/ratings, wishlist, contact form,
admin/business-owner features, authentication, any backend.

**Do not invent additional product variants.** Only bottle size and gift
wrapping exist. This is an explicit business requirement.

---

## 2. Data model

Replace `src/features/products/types/product.types.ts` `Product` with this shape.
Do not add fields that are not listed here.

```ts
export type ProductId = string;

/** A purchasable bottle size. Price is per variant. */
export type ProductVariant = {
  id: string;        // e.g. "100ml"
  volume: number;    // in millilitres, e.g. 100
  label: string;     // display label, e.g. "100 ml"
  price: number;     // price for this volume
  inStock: boolean;
};

/** Fragrance pyramid shown in the "Scent Anatomy" section. */
export type ScentNotes = {
  top: string[];
  heart: string[];
  base: string[];
};

export type ProductAvailability = "in-stock" | "made-to-order" | "out-of-stock";

export type Product = {
  id: ProductId;
  sku: string;
  name: string;
  description: string;
  /** Short line used on cards and listings. */
  notes: string;
  /** Structured notes for the Scent Anatomy section. */
  scentNotes: ScentNotes;
  variants: ProductVariant[];
  /** Whether complimentary gift wrapping can be added. */
  giftWrappingAvailable: boolean;
  images: string[];
  category: string;
  scentFamily: string;
  occasion: string;
  availability: ProductAvailability;
};
```

### Notes on the change

- `price: number` is **removed** from `Product`. The price now comes from the
  selected variant. The **signature (largest) size** is the default selection,
  which is what the Figma design preselects and what listing cards price.
- `options: ProductOption[]` is **removed** and replaced by `variants` +
  `giftWrappingAvailable`.
- Every call site that read `product.price` must be updated. Listing cards show
  the lowest variant price, formatted as a "from" price where the design shows one.

### Gift wrapping

Gift wrapping is a boolean add-on, not a variant. It is free ("Complimentary
Signature Gift Wrapping"). It is stored on the cart line, not on the product.

---

## 3. Mock data rules

`src/features/products/services/products.mock-data.ts` must keep the existing six
products and their ids, names, categories, scent families, occasions and image
paths unchanged. Add the new fields only.

- Each product gets three variants: 30 ml, 50 ml, 100 ml.
- The existing price in the file is the **100 ml** price. Derive the others so
  they are plausible and monotonic (30 ml cheapest, 100 ml most expensive).
- `scentNotes` must be derived from the existing `notes` string of each product,
  not invented from nothing.
- `sku` format: `ODORATUS-<INITIALS><VOLUME>`, e.g. `ODORATUS-SP0100`.
- `availability` is `"in-stock"` for all products except one, which should be
  `"made-to-order"` so the UI state is visible.

---

## 4. Component breakdown

Follow the existing feature-sliced structure. Do **not** create
`atoms/` `molecules/` `organisms/` folders.

| Component | Location | Responsibility |
| --- | --- | --- |
| `ProductGallery` | `features/products/components/` | Main image + thumbnail strip, keyboard navigable (the strip appears once a product has more than one image) |
| `ProductDetails` | `features/products/components/` | Name, SKU, price, availability badge, description |
| `ProductVariantPicker` | `features/products/components/` | Bottle size selection (radio group) |
| `GiftWrappingToggle` | `features/products/components/` | Switch for gift wrapping |
| `QuantityStepper` | `components/ui/` | Generic +/- stepper, reusable |
| `ScentAnatomy` | `features/products/components/` | Top / heart / base notes table |
| `RelatedProducts` | `features/products/components/` | "Olfactory Companions" grid, reuses `ProductCard` |
| `Footer` | `components/shared/` | Site footer |
| `AnnouncementBar` | `components/shared/` | Top strip above the header |

`ProductDetailsPage` composes these. It keeps the selected variant, gift
wrapping and quantity in local state and passes them to the `actions` render
prop, which the route wires to `AddToCartButton`.

Reuse the existing `components/ui/Button`, `Input`, `Select` where they fit.
Only add a new shared UI primitive if it is genuinely reusable.

---

## 5. Cart integration

`features/cart/types/cart.types.ts` must carry the selection:

```ts
export type AddToCartInput = {
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string;
  unitPrice: number;      // the SELECTED variant price
  giftWrapping: boolean;
  image?: string;
};
```

Rules:

- `unitPrice` is the selected variant's price. Never the product's base price.
- Two cart lines for the same product with different variants or different gift
  wrapping are **separate lines**. The line id must include variant and wrapping.
- Adding the same product + variant + wrapping again increases the quantity.
- Cart totals must be computed from `unitPrice * quantity`.

`features/cart` must not import anything from `features/products` internals —
only through `features/products/index.ts`.

---

## 6. Non-functional requirements

These are graded. Every one of them applies to this page.

### Performance

- Product listing and product details must load in **2-3 seconds on Fast 3G**.
- The source images in `public/images/products/` are ~1.2 MB each. Convert them
  to WebP and keep the PNGs out of the bundle, or serve them through
  `next/image` with an explicit `quality` and correct `sizes`.
- Only the main gallery image is `priority`. Everything else is lazy loaded.

### Images

- Every image uses `next/image`.
- Images outside the viewport are lazy loaded (the default — do not disable it).
- Every image has meaningful `alt` text. Decorative icons get `alt=""`.

### Keyboard accessibility

- Variant picker is a real radio group: arrow keys move between sizes.
- Gift wrapping toggle is a real checkbox or `role="switch"`, togglable with Space.
- Quantity stepper buttons are real `<button>` elements with accessible labels.
- Gallery thumbnails are focusable and activate with Enter/Space.
- Visible focus rings everywhere. Do not remove outlines without a replacement.

### Accessibility

- One `<h1>` per page: the product name.
- Availability is announced as text, not colour alone.
- Price changes on variant selection are announced via `aria-live="polite"`.

### Responsive

- Mobile: single column, gallery on top.
- Tablet and desktop: two columns, gallery left, info right.
- No horizontal scroll at 320 px width.

### Security

- No hardcoded secrets, keys or tokens. Config goes through `src/config/env.ts`.

---

## 7. Styling

Use the tokens already present in the listing page components, which were taken
from the Figma file:

- Page background: `#faf8f5`
- Text: `#1a1a1a`
- Muted text: `#605a54`
- Surface / borders: `#ebe6de`

Match the Figma spacing and typography. Do not introduce a new colour that is
not in the design.

---

## 8. Definition of done

- [ ] All components above exist and match the design
- [ ] Variant selection changes the displayed price
- [ ] Add to cart stores the selected variant price
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` passes
- [ ] Keyboard-only walkthrough of the page works end to end
- [ ] Lighthouse accessibility score is 95 or higher
- [ ] No feature imports another feature's internals
