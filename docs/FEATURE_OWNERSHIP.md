# Feature ownership

Features should own their implementation. Shared code should remain minimal and genuinely reusable.

## Features

| Feature | Primary location | Routes |
| --- | --- | --- |
| Product discovery | `src/features/products/` | `/products`, `/products/[productId]` |
| Shopping cart | `src/features/cart/` | `/cart` |

## User stories

| ID | Story | Implementation location |
| --- | --- | --- |
| US-01 | Browse products | `src/features/products/` — `ProductGrid`, `ProductCard`, `ProductPagination`, `useProducts`, `products.service.ts` |
| US-02 | Search products | `src/features/products/` — `ProductSearch`, `useProductSearch`, listing query in `products.service.ts` / mock |
| US-03 | Filter products | `src/features/products/` — `ProductFilters`, `useProductFilters`, listing query in `products.service.ts` / mock |
| US-04 | View product details | `src/features/products/` — `ProductDetailsPage`, `ProductDetails`, `ProductImages`, `ProductOptions`, `useProduct` |

## Requirements without an explicit story ID

These come from the product requirements. Implement them in the same feature boundary:

| Capability | Location |
| --- | --- |
| Sort products | `src/features/products/components/ProductSort.tsx`, `useProductSort.ts` |
| Select product options | `src/features/products/components/ProductOptions.tsx` |
| Add a product to the cart | `src/features/cart/components/AddToCartButton.tsx` (wired from `src/app/products/[productId]/`) |
| View cart | `src/features/cart/components/CartPage.tsx` |
| Change quantities | `src/features/cart/components/CartItem.tsx`, `src/features/cart/store/cart.store.ts` |
| Remove products | `src/features/cart/store/cart.store.ts` |
| View cart total | `src/features/cart/components/CartSummary.tsx`, `src/features/cart/utils/cart.utils.ts` |

## Shared files (modify carefully)

Only change these when the work is genuinely cross-feature:

- `src/app/layout.tsx`
- `src/app/providers.tsx`
- `src/components/shared/Header.tsx`
- `src/components/ui/*`
- `src/lib/api/*`
- `src/config/env.ts`
- `src/app/products/[productId]/product-details-with-cart.tsx` (route-level composition of products + cart)
