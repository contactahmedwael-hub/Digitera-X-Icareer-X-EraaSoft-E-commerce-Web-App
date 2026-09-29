# Agent rules

Read this before writing any code in this repository.

## Architecture

This project is **feature-sliced**, not atomic design. A capability owns its
components, hooks, services, types, utils and state inside
`src/features/<feature>/`.

- Never create `atoms/`, `molecules/`, `organisms/`, `templates/` folders.
- A component used by exactly one feature lives inside that feature, never in
  `src/components/`.
- `src/components/ui/` is only for genuinely reusable primitives with no
  business meaning (Button, Input, Select, QuantityStepper).
- `src/components/shared/` is only for cross-feature layout (Header, Footer).
- A feature may import from `src/components`, `src/lib` and `src/config`.
- A feature must **not** import another feature's internal files. Cross-feature
  access goes through `src/features/<feature>/index.ts` only.
- `docs/FEATURE_OWNERSHIP.md` is the map. Update it when you add a component.

## Files you must not change without being asked

- `src/app/layout.tsx`
- `src/app/providers.tsx`
- `src/lib/api/*`
- `src/config/env.ts`
- Any file belonging to a feature you were not asked to work on

## Scope discipline

- Implement only what the task document asks for.
- Do not invent product behaviour, fields, variants or business rules.
- Do not add a library. The stack is fixed: Next.js 16, React 19, TypeScript,
  Tailwind 4, TanStack Query, Zustand, Jest, Cypress. If you believe a new
  dependency is required, stop and say why instead of installing it.
- Do not add abstractions, factories, generic wrappers or configuration that
  the current task does not need.
- No `any`. No `@ts-ignore`. No disabled lint rules without a written reason.

## Next.js

This is Next.js 16 and it differs from older versions. Read the relevant guide
in `node_modules/next/dist/docs/` before using an API you are unsure about.

- Server Components by default. Add `"use client"` only where interactivity
  actually requires it, and push it as far down the tree as possible.
- Route files stay thin: they import a feature component and render it.
- Business logic lives in the feature, never in `app/`.

## Data and state

- UI -> hook -> service -> API. UI never calls fetch directly.
- Server state goes through TanStack Query. Client state goes through Zustand.
- Feature state lives in `features/<feature>/store/`. Do not create global state.
- Mock data is clearly separated from real service implementations.

## Tooling

`pnpm` is the package manager for this repository. Never run `npm` or `yarn`,
and never commit a `package-lock.json` or `yarn.lock`.

## Icons and dependencies

Icons are hand-drawn SVG components in `src/components/icons/`. Do not install
an icon library, an animation library, a slider, a toast library or a headless
UI kit — build the primitive in `src/components/ui/` instead. Animation is CSS
keyframes declared in `src/app/globals.css`.

## File size

~200 lines per file is the review threshold. When a component passes it, first
extract hooks and pure helpers. If it is still too large, give it a folder of
its own named after the component and split it there — see
`src/features/products/components/ProductFilters/`.

## URL state

Search, filters, sort and pagination belong in the query string via
`useProductListParams`, never in component state.

## Quality gates

Before you report a task as finished, run and report the results of:

```
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Do not claim a task is done if any of these fail.

## Accessibility and performance baseline

Every feature must satisfy these, not just the ones where they are mentioned:

- All interactive elements are reachable and operable with the keyboard.
- Visible focus indicators are present.
- Images use `next/image`, are lazy loaded outside the viewport, and have
  meaningful `alt` text.
- Semantic HTML first. Add ARIA only when semantics are insufficient.
- Works from 320 px width up, with no horizontal scroll.

## Communication

- If the task document and the design disagree, stop and ask.
- If a requirement is ambiguous, state the ambiguity and your assumption before
  writing code.
- Report what you changed as a list of files, not a wall of prose.
