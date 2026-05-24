Build a complete e-commerce storefront for Casual Chic Home, a new home & lifestyle vertical extending the Casual Chic Boutique brand into furniture, decor, outdoor living, tabletop, textiles, and seasonal collections. The brand's existing apparel customer is a 28–55-year-old woman with elevated taste and a real-world budget — she wants her home to look like the boutique she shops at: considered, warm, a little undone, never stuffy.
Brand positioning

Tagline: Beautifully lived in.
Promise: Editor-grade pieces at accessible prices. Designed to be touched, used, and grown into.
Voice: Warm, confident, lightly conversational. Not "luxury" cold. Not "fast" loud. Think the friend with the best house on the block telling you where she got the lamp.

Visual direction — "Quiet Luxe"
A warm-minimalist storefront with editorial restraint. Think Quince meets Soho Home meets a Kinfolk magazine spread. Generous negative space, considered typography, and product photography that always feels styled — never floating-on-white.
Color tokens

--bg-base #F7F3EC (warm bone, primary canvas)
--bg-elevated #FFFFFF
--ink-primary #1F1B16 (warm near-black)
--ink-secondary #5C544A (taupe)
--ink-tertiary #948B7E
--accent-clay #B9755A (CTAs, hover states, sale tags)
--accent-sage #7B8470 (secondary accent, "new" badges, eco labels)
--line #E6DFD3 (hairline borders, dividers)
--surface-warm #EFE7D7 (callout cards, mega menu)

Typography

Display: "GT Sectra" (or Cormorant Garamond as fallback) — high-contrast serif for headlines, category titles, editorial moments. Used sparingly.
Body & UI: "Söhne" (or Inter as fallback) — neutral grotesque for navigation, body copy, product cards, buttons, microcopy.
Eyebrow / micro: Söhne 11–12px, tracking +0.12em, uppercase.

Type scale (desktop)

H1 Display: 72/80
H2 Section: 48/56
H3 Block: 32/40
H4 Card: 20/28
Body L: 18/28
Body M: 16/24
Body S: 14/22
Micro: 12/16

Spacing & grid

12-col grid, 88px outer gutters on desktop, 24px on mobile.
Section vertical rhythm: 120px desktop / 64px mobile between major sections.
Components use an 8px base unit.

Imagery direction

Product photography always in-context (on a marble counter, on a wood floor, in a sunlit room). Never silhouetted on pure white.
Lifestyle shots: shallow depth of field, golden-hour or north-window light, real homes with imperfections (a folded throw, a mug on the table).
People are incidental — a hand pouring coffee, bare feet on a rug — never posed.
Mix square (1:1) and 4:5 portrait crops. Avoid 16:9 hero crops for products.

Page-by-page build
1. Global header

Top announcement bar (warm-surface, 11px micro caps): rotating messages — Complimentary swatches · Free shipping on orders $150+ · Trade program now open.
Sticky main nav: left-aligned wordmark Casual Chic Home (display serif, all caps tracking +0.08em). Center nav links: Living, Bedroom, Dining, Outdoor, Lighting, Decor, Sale, The Edit (editorial). Right side: Search (icon expands inline), Account, Wishlist (heart), Bag (with count chip in clay).
Mega menu on hover: 3-column structure — column 1 Shop by Category (text links), column 2 Shop by Room/Material (text links), column 3 Featured (one large editorial image card linking to a collection, with eyebrow + headline + CTA).

2. Homepage

Hero: Full-width 80vh editorial photograph of a styled living room corner. Overlay text bottom-left: eyebrow "Spring Collection 2026," H1 "Beautifully lived in." with a single thin clay CTA Shop New Arrivals →. No carousel — one strong image only.
Category tiles (asymmetric bento): 5 tiles in a magazine-style grid — one tall (Living), two medium (Bedroom, Outdoor), two square (Lighting, Tabletop). Each tile = lifestyle image + serif label + thin underlined "Shop →".
The Edit (editorial story strip): Horizontal scroll of 4 magazine-style story cards. Each = 4:5 image, eyebrow, headline ("How to Layer a Bed for Spring"), short dek, Read link. Soft-styled, no CTAs.
Best Sellers carousel: 8 product cards in a horizontal scroller. Card spec below. Title: H2 "Quiet favorites."
Shop the room (interactive): Full-width lifestyle photo with 4–6 numbered dot hotspots. Hovering shows a product mini-card with image + name + price + add-to-bag. Headline: "Shop the room: Linen Bedroom No. 03."
Materials & makers strip: Three-column section. Each column = small icon (linen weave, oak grain, ceramic), H4 headline, 2-sentence story. Anchors the "considered" positioning.
Testimonial / press strip: Quiet row of greyscale press logos (Architectural Digest, House Beautiful, Domino, Apartment Therapy) under a single italic-serif customer quote.
Trade program banner: Warm-surface CTA card — "Designers, builders, stylists: 15% trade discount." with thin outline CTA Apply →.
Email capture footer band: Single input + clay submit button. Microcopy: Get first looks, styling notes, and 10% off your first order.
Footer: Multi-column — Shop, Help, Company, Trade, Connect. Newsletter form repeated. Social icons. Wordmark. Legal microtype.

3. Category / Collection Page (e.g., Living)

Editorial header: 50vh image + overlay eyebrow + H1 category name + 1-sentence collection paragraph. Below: anchor links for subcategories (Sofas, Chairs, Coffee Tables, Rugs, Throws, Accents) as horizontal chip nav.
Filter sidebar (left, sticky): Material, Color, Size, Price, In Stock, Sustainability (Linen Certified, FSC Wood, etc.). Filter values as click-to-toggle chips, not checkboxes.
Sort dropdown top-right: Featured, New, Price ↑↓, Best Selling.
Product grid: 3 columns desktop, 2 mobile. 32px gap. Lifestyle-first product cards.
Load more (button, not infinite scroll) — preserves URL state.
Mid-grid editorial break every 12 products: full-width quote or styling tip card.

4. Product card (component spec)

4:5 lifestyle image (primary), with second image revealed on hover (cutout / detail shot).
"New" or "Sale" tag top-left in sage/clay micro pill.
Wishlist heart icon top-right, hover-only.
Product name in body L below image, ink-primary.
Material/color descriptor in body S, ink-tertiary.
Price in body L, ink-primary. Strikethrough original + clay sale price if discounted.
Color swatches (max 4 dots, +N if more) below price.
Quick-add ghost button appears on card hover (desktop) — opens slide-out drawer with size/qty selectors.

5. Product Detail Page (PDP)

Two-column layout, 60/40 split desktop.
Left (gallery): Vertical thumbnail rail + large primary image. 5–8 images mixing lifestyle, detail, scale-with-human, dimensions diagram. Tap-to-zoom. Final slot = short autoplaying soundless video clip (15s).
Right (info, sticky on scroll):

Eyebrow: collection name.
H2 product name (serif).
Price + by-the-month financing line ("or 4 payments of $X with Afterpay").
Short dek (2 sentences).
Variant selectors: color swatches (named tooltips), size dropdown, quantity stepper.
Primary CTA: full-width clay button Add to bag. Secondary ghost button: Save for later.
Trust strip below CTA: free shipping over $150 · 60-day returns · ships in 3–5 days.
Accordion sections: Details & Dimensions, Materials & Care, Sustainability, Shipping & Returns.
Designer's note callout — 1-paragraph editorial blurb in italic serif, signed.


Below the fold (full-width):

"In the room" — large lifestyle image of the product styled in a real space.
"Pair it with" — 4 complementary products as cards.
"Reviews" — average star rating, distribution bars, photo reviews grid, individual review cards with verified-buyer badges.
"You may also like" — 8 product carousel.



6. Cart (slide-out drawer, not page)

Right-side drawer, 480px wide desktop, full-width mobile.
Header: Your bag + item count + close X.
Line items: thumbnail, name, variant, qty stepper, price, remove link.
Free shipping progress bar at top: "You're $24 away from free shipping."
Gift note toggle.
"Frequently added" mini-carousel of 4 add-on items (candles, throws, books).
Sticky footer: subtotal, Checkout clay primary button, View bag ghost link.

7. Checkout

Three-step accordion: Information → Shipping → Payment. Single-page, expanding sections.
Express checkout buttons at top: Apple Pay, Shop Pay, PayPal, Google Pay (in a quiet row, not loud).
Order summary docked right (sticky) — collapsible on mobile.
Trust microcopy under CTA: Secure checkout · 60-day returns.
Confirmation page: warm-surface card, large serif Thank you, [Name]., order details, recommended editorial reads, share-your-space prompt (UGC capture).

8. Account pages

Order history, addresses, payment methods, wishlist, trade dashboard (if trade member), preferences.
Sidebar nav, content right. Consistent warm-bone canvas.

9. The Edit (editorial / content hub)

Magazine-style landing: featured story hero, story grid below (3-col), filter by category (How-To, Inside the Home, Maker Stories, Seasonal).
Article template: large lead image, narrow text column (max 680px line length), pull quotes in display serif, in-line shoppable product cards every few sections.

10. Trade program landing

Editorial pitch page: hero photo of a designer working, benefits in a 3-col grid (Pricing · Service · Resources), application form below, FAQ accordion.

Component library to generate

Button (primary clay, secondary outline ink, tertiary text link with arrow)
Input (single line, textarea, with floating label)
Dropdown / select
Color swatch chip
Filter chip (toggleable)
Product card (3 states: default, hover, sold out)
Quick-add drawer
Cart line item
Toast notification
Accordion
Mega menu
Hotspot dot
Press logo strip
Editorial story card
Testimonial card
Empty state (cart, wishlist, search)
Loading skeleton (product card variant)

Interaction & motion

Page transitions: subtle 200ms cross-fade.
Hover on product cards: 300ms cross-fade to second image, gentle scale 1.01.
Buttons: 150ms ease-out on hover, clay deepens by 8% lightness.
Sticky elements use a 12px backdrop-blur and 92% opacity warm-bone background.
Avoid bounce, spring, or playful motion — keep it editorial-quiet.

Accessibility

WCAG 2.2 AA. All clay/ink combinations tested for contrast (clay on bone passes large-text only — never use clay text smaller than 18px on bone).
Focus states: 2px clay outline with 2px offset.
All interactive elements ≥44×44px touch target.
All product imagery has descriptive alt text.

Responsive behavior

Breakpoints: 1440 / 1024 / 768 / 375.
Mobile-first considerations: bottom-anchored sticky add-to-bag on PDP, swipeable galleries, single-column product grid below 600px, mega menu collapses to drawer.

Sample copy to use

Homepage H1: "Beautifully lived in."
Homepage sub: "Furniture and home pieces made to be used, layered, and loved. Now extending the Casual Chic story into every room."
Category intro (Living): "Soft silhouettes, honest materials, and the kind of sofa you actually want to nap on. Our living collection is built around the way you really live."
PDP designer's note example: "We designed the Marin sofa for the way you actually sit — feet up, book open, third cup of coffee. Slipcovered Belgian linen, kiln-dried oak frame, made in North Carolina. — Anna, Head of Design"
Empty cart: "Your bag's empty — for now. Start with a candle? Or take the long way through The Edit."

