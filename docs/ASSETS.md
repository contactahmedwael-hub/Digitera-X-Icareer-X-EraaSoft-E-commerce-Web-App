# Image assets

Every image path used by the app is listed here. Anything marked **PLACEHOLDER**
is currently pointing at a product photograph because the design's own artwork
has not been exported from Figma yet.

Design file: `Digitera — Frontend Engineering Bootcamp`

## How to export from Figma

1. Open the design file and select the frame named in the table below.
2. In the right-hand panel, scroll to **Export**.
3. Set the format to **PNG** and the scale to **2x**.
4. Click **Export** and save the file with the name given in the table.
5. Convert the PNG to WebP (see "Converting" below) and drop it in
   `public/images/...`.
6. Update the matching path in `src/features/home/home.content.ts` (home page)
   or `src/features/products/services/products.mock-data.ts` (product images).

## Product photography — DONE

These are already in the repository at `public/images/products/`.

| Product | File |
| --- | --- |
| Fleur de Lune | `fleur-de-lune.webp` |
| Santal Parchment | `santal-parchment.webp` |
| Noir Cocoon | `noir-cocoon.webp` |
| Sol d'Or | `sol-dor.webp` |
| Atelier Oud | `atelier-oud.webp` |
| Rose Absolute | `rose-absolute.webp` |

## Home page — DONE

Exported from Figma and converted to WebP in `public/images/home/`. Paths are
wired in `src/features/home/home.content.ts`.

| Figma node | File | Size |
| --- | --- | --- |
| `3:29` hero | `hero.webp` | 94 KB |
| `3:85` archetype-tile | `archetype-floral.webp` | 52 KB |
| `3:89` archetype-tile | `archetype-woody.webp` | 120 KB |
| `3:93` archetype-tile | `archetype-oriental.webp` | 85 KB |
| `3:97` archetype-tile | `archetype-fresh.webp` | 97 KB |
| `3:107` occ-img | `occasion-personal-use.webp` | 4 KB |
| `3:112` occ-img | `occasion-wedding.webp` | 18 KB |
| `3:117` occ-img | `occasion-gift-sets.webp` | 5 KB |
| `3:122` occ-img | `occasion-birthday.webp` | 8 KB |
| `3:127` promo-img | `promo-solstice.webp` | 53 KB |

The dark overlay on the tiles is applied in CSS, not baked into the files.

## Product gallery thumbnails — DONE for Santal Parchment

`santal-parchment-2/3/4.webp` come from the design's `thumb-0/1/2` nodes and
are listed in that product's `images` array, which is what makes the thumbnail
strip appear. Any other product gets the same strip as soon as it has more than
one image:

```ts
images: [
  "/images/products/santal-parchment.webp",
  "/images/products/santal-parchment-2.webp",
  "/images/products/santal-parchment-3.webp",
  "/images/products/santal-parchment-4.webp",
],
```

## Converting PNG to WebP

The source PNGs are around 1.2 MB each, which breaks the 2–3 second Fast 3G
budget. Convert before committing:

```bash
# one file
npx @squoosh/cli --webp '{"quality":82}' -d public/images/home hero.png

# or with ImageMagick
magick hero.png -resize 1200x1200\> -quality 82 hero.webp
```

Target: **under 100 KB per image**, longest edge **1200 px**. Delete the PNG
afterwards — do not commit both.

## Rules

- Every image goes through `next/image`.
- Only the hero and the main gallery image use `priority`; everything else is
  lazy loaded.
- Decorative images (tiles, backgrounds) take `alt=""`. Product photography
  takes a real description.
- Never commit an image over 200 KB.
