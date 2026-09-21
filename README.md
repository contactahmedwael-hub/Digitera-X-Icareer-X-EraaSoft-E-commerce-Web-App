# Storefront

Team-ready scaffold for a product catalog and shopping cart. The product is **not fully implemented**. This repository gives each developer an isolated feature boundary so user stories can be built in parallel with few shared-file merge conflicts.

> Features should own their implementation. Shared code should remain minimal and genuinely reusable.

## Technology stack

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- TanStack Query
- Zustand
- Jest
- Cypress
- ESLint
- Prettier
- pnpm

No extra libraries were added beyond this stack. Class-name joining is a tiny local helper (`src/lib/utils/cn.ts`) instead of another dependency.

## Prerequisites

- Node.js 20 or later
- pnpm 10 or later (`corepack enable` is recommended)

## Installation

```bash
pnpm install
cp .env.example .env.local
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The home route redirects to `/products`.

## Build

```bash
pnpm build
pnpm start
```

## Tests

```bash
pnpm typecheck
pnpm lint
pnpm test
```

End-to-end tests need the app running:

```bash
pnpm dev
pnpm test:e2e
# or
pnpm cypress:open
```

## Environment setup

Copy `.env.example` to `.env.local`. Never commit secrets.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for a future catalog HTTP API. Leave empty while mocks are enabled. |
| `NEXT_PUBLIC_USE_MOCK_API` | `true` (default) uses in-repo mock product data. Set `false` only when a real API exists. |

There is **no backend** in this repository. Mock data lives in `src/features/products/services/` and is separate from the HTTP service stub.

## Project architecture

```text
app            thin routes — map URLs to features
  ↓
features       product capabilities own UI, hooks, services, types, state
  ↓
shared UI / lib / config
```

- **Routes stay thin.** Business logic belongs in `src/features/<name>/`.
- **Features do not import another feature's internals.** If two features must meet, compose them in the route or use that feature's public `index.ts`.
- **State stays local.** TanStack Query is used for product server/cache reads. Zustand is used only for the cart.
- **No giant shared files.** Do not add a global `utils.ts`, `store.ts`, `api.ts`, or `types/index.ts`.

## Feature structure

```text
src/features/products/     catalog listing, search, filters, sort, details
src/features/cart/         cart page, line items, totals, add-to-cart
```

Each feature follows the same shape:

```text
components/   UI for this feature only
hooks/        feature hooks
services/     feature API boundaries (products)
store/        feature client state (cart)
types/        feature types
utils/        feature helpers
index.ts      public API other layers may import
```

See [docs/FEATURE_OWNERSHIP.md](docs/FEATURE_OWNERSHIP.md) for user-story mapping.

## Development guidelines

1. Pick a user story and open its feature directory.
2. Implement components, hooks, services, and types **inside that feature**.
3. Add colocated tests (`*.test.ts` / `*.test.tsx`) next to the code.
4. Touch `src/app` only when a route needs new wiring.
5. Import another feature only through its `index.ts`, and only when composition in the route is not enough.
6. Keep `src/components/ui` limited to primitives used by more than one feature.
7. Do not move feature code into shared folders "just in case".
8. Run `pnpm typecheck`, `pnpm lint`, and `pnpm test` before opening a PR.
