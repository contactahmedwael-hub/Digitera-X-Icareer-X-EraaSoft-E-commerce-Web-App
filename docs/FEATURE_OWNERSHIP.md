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
| US-01 | Browse products | `src/features/products/` — `ProductGrid`, `ProductCard`, `ProductPagination`, `useProducts`, `useProductPagination`, `products.service.ts` |
| US-02 | Search products | `src/features/products/` — `ProductSearch`, `useProductSearch`, `product.query.ts`; site-wide entry point in `components/shared/HeaderSearch.tsx` |
| US-03 | Filter products | `src/features/products/components/ProductFilters/`, `useProductFilters`, `product.query.ts` |
| US-04 | View product details | `src/features/products/` — `ProductDetailsPage`, `ProductDetails`, `ProductGallery`, `ProductVariantPicker`, `GiftWrappingToggle`, `ScentAnatomy`, `RelatedProducts`, `useProduct`, `useProductSelection`, `useRelatedProducts` |

## Requirements without an explicit story ID

| Capability | Location |
| --- | --- |
| Sort products | `components/ProductSort.tsx`, `hooks/useProductSort.ts` |
| Select bottle size | `components/ProductVariantPicker.tsx` |
| Gift wrapping add-on | `components/GiftWrappingToggle.tsx` + `components/ui/Switch.tsx` |
| Quantity selection | `components/ui/QuantityStepper.tsx` |
| Add a product to the cart | `src/features/cart/components/AddToCartButton.tsx` (wired from `src/app/products/[productId]/`) |
| View cart | `src/features/cart/components/CartPage.tsx` |
| Change quantities | `src/features/cart/components/CartItem.tsx`, `store/cart.store.ts` |
| Remove products | `src/features/cart/store/cart.store.ts` |
| View cart total | `src/features/cart/components/CartSummary.tsx`, `utils/cart.utils.ts` |
| Loading / empty / error states | `ProductDetailsSkeleton`, `ProductEmptyState`, `ProductNotFound`, `components/ui/Skeleton.tsx`, `components/ui/BottleLoader.tsx`, `app/loading.tsx`, `app/error.tsx`, `app/not-found.tsx` |

## URL is the source of truth

Search, filters, sort and pagination all live in the query string and are read
through `useProductListParams`. A listing view is therefore shareable, and the
browser's back button works. Never hold this state in a component.

## Icons

Every icon is a hand-drawn SVG component in `src/components/icons/`. No icon
library is installed and none should be added.

## Shared files (modify carefully)

- `src/app/layout.tsx` (fonts, page chrome, metadata)
- `src/app/providers.tsx`
- `src/components/shared/*` (`Header`, `Footer`, `AnnouncementBar`, `HeaderSearch`, `navigation.ts`)
- `src/components/ui/*`
- `src/components/icons/*`
- `src/lib/api/*`
- `src/config/env.ts`
- `src/app/products/[productId]/product-details-with-cart.tsx` (route-level composition of products + cart)
