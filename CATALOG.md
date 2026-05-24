# Casual Chic Home — Launch Catalog Spec

Source of truth for the seed catalog that will be created on the shared Medusa backend under the new **`casual-chic-home`** sales channel.

All product copy (descriptor, designer note, sustainability, care, shipping) is in [src/app/data.ts](src/app/data.ts); editorial in [src/app/articles.ts](src/app/articles.ts). This doc is the structural summary the Medusa seed script will pull from.

## Sales channel

- **Name:** Casual Chic Home
- **Handle:** `casual-chic-home`
- **Currency:** USD (single-region launch — US only)
- **Publishable key:** to be generated on channel creation; goes into `VITE_MEDUSA_PUBLISHABLE_KEY` on the new storefront

## Categories (navigation)

From [src/app/components/header.tsx:25-107](src/app/components/header.tsx). These become Medusa product categories (handles in parentheses).

| Display | Handle | Notes |
|---|---|---|
| Living | `living` | Sofas, chairs, coffee tables, rugs, throws |
| Bedroom | `bedroom` | Bedding, bedroom furniture |
| Dining | `dining` | Tables, chairs, tabletop, glassware |
| Outdoor | `outdoor` | Outdoor furniture & accessories |
| Lighting | `lighting` | Pendants, lamps, sconces |
| Decor | `decor` | Vases, candles, accents |
| Sale | `sale` | Smart collection (price < salePrice) — not a category |

Subcategories used in current data: Sofas, Chairs, Coffee Tables, Accents, Throws, Rugs, Bedding. Add as Medusa sub-categories under the relevant parent.

## Products (10 seed items)

| Handle | Name | Price | Sale | Category | Collection |
|---|---|---|---|---|---|
| `marin-sofa` | Marin Slipcovered Sofa | $2,890 | — | Living › Sofas | Marin |
| `ojai-table` | Ojai Oak Coffee Table | $1,240 | — | Living › Coffee Tables | Ojai |
| `june-armchair` | June Lounge Chair | $1,490 | — | Living › Chairs | June |
| `hudson-mug` | Hudson Stoneware Mug | $32 | — | Dining › Accents | Hudson |
| `petra-candle` | Petra Pillar Candle | $58 | $44 | Decor › Accents | Petra |
| `loma-pendant` | Loma Pendant | $320 | — | Lighting › Accents | Loma |
| `field-throw` | Field Throw | $148 | — | Living › Throws | Field |
| `anza-rug` | Anza Hand-Knotted Rug | $1,890 | — | Living › Rugs | Anza |
| `olive-vase` | Olive Stoneware Vase | $96 | — | Decor › Accents | Olive |
| `linnea-duvet` | Linnea Linen Duvet | $320 | — | Bedroom › Bedding | Linnea |

## Product schema → Medusa mapping

Mock fields in `FullProduct` ([src/app/data.ts:3](src/app/data.ts)) map as follows:

| Mock field | Medusa target |
|---|---|
| `slug` | `Product.handle` |
| `name` | `Product.title` |
| `descriptor` | `Product.subtitle` |
| `price`, `salePrice` | `ProductVariant.prices` (USD); sale modeled via price list |
| `image`, `hoverImage`, `gallery[]` | `Product.images[]` (gallery order; thumbnail = first; hover = second) |
| `inRoom` | metafield `images.in_room` (single lifestyle image) |
| `alt` | `Product.images[0].metadata.alt` |
| `tag` (`New`/`Best Seller`/`Sale`) | `Product.tags[]` |
| `swatches[]`, `color`, `material`, `size` | `ProductVariant.options` (option values) |
| `subcategory` | `Product.categories[]` (leaf) |
| `collection` | `Product.collection` |
| `dek` | `Product.description` (first paragraph) |
| `designerNote`, `designerName` | metafields `editorial.designer_note`, `editorial.designer_name` |
| `details[]` | metafield `editorial.details` (string[]) |
| `care` | metafield `editorial.care` |
| `sustainability` | metafield `editorial.sustainability` |
| `shipping` | metafield `editorial.shipping` (per-product lead time copy) |
| `pairWith[]` | metafield `editorial.pair_with` (array of handles); rendered as cross-sells |
| `rating`, `reviewCount` | not modeled in Medusa yet — leave for review-app integration (Judge.me / Stamped / Yotpo) |

> **Images**: every URL today is `images.unsplash.com` (placeholder). Production launch needs licensed or original photography. Track this as a content task, not engineering.

## Editorial (The Edit)

Four launch articles in [src/app/articles.ts](src/app/articles.ts):
- `layer-a-bed` · How-To · 5 min · Anna Field
- `painters-cottage` · Inside the Home · 8 min · Editorial Team
- `belgian-linen` · Maker Stories · 6 min · Editorial Team
- `spring-supper` · Seasonal · 4 min · Anna Field

Recommend modeling editorial in Sanity (matches CCB pattern in `lib/data/blog.ts`) rather than Medusa. Hero images currently Unsplash placeholders.

## Cross-references / "Pair with"

Each product references 3–4 handles in `pairWith`. Use for cross-sells on PDP. Verify all references resolve to existing products before seeding.

## Out of scope for launch

- Trade program (B2B 15% discount) — punted per kickoff scope; the `trade` route + page remain in code but won't be linked in nav for v1.
- Multi-currency / multi-region — single US/USD region at launch.
- Reviews — defer to a third-party review app integration post-launch.
