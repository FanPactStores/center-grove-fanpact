# Match the Butler store to staging.fanpact.net/butler

## 1. New navigation system (`StoreHeader.tsx` + new `StoreSubnav.tsx` + new `CategoryStrip.tsx`)

Three stacked bands like staging:

**Band 1 — white top bar**
- Left: FanPact pennant icon + `BUTLER` wordmark in brand blue
- Center: `Shop ▾` (dropdown of categories), `Rewards`, `Teams`, `Athletes`, `Sponsors`
- Right: heart (wishlist), cart, account icons

**Band 2 — black sub-nav**
- Tabs: `SHOP` (active), `TEAMS soon`, `ATHLETES soon`, `NIL IMPACT`, `NEWS & BLOGS soon`, `SPONSORS soon`
- "soon" pills are muted/disabled

**Band 3 — black category strip**
- Horizontal scroll of all 12 category links with hover underline in brand blue

**Yellow disclaimer bar** under nav: "We donate 70% of net earnings from qualifying purchases to support Butler student-athletes. *(full disclaimer)*" with a dismiss `×`.

## 2. Replace the category model

The current "sports gear" catalog doesn't match staging's thesis ("buy your everyday products, athletes benefit"). Replace `CATEGORIES` in `src/data/categories.ts` with the 12 staging categories:

```
Electronics · Home & Living · Kitchen & Dining · Beauty & Personal Care ·
Pet Supplies · Fitness & Outdoor · Auto Accessories · Tools & Home Improvement ·
Office & School · Baby & Kids · Apparel · Toys & Games
```

Each gets 3–4 subcategories and a brand-realistic blurb.

## 3. Replace the product catalog

Rewrite `src/data/products.ts` with ~60 everyday-brand products distributed across the 12 categories (Apple AirPods, Sony headphones, Dyson vacuum, Ninja blender, Crest, Tide, Purina, Hydro Flask, Castrol, DeWalt, Crayola, Pampers, Nike, LEGO, etc.). Same `Product` shape (id, slug, brand, price, contribution, sku, inStock, highlights, specs) so the existing detail/category/cart pages keep working.

## 4. Fix product imagery

Pollinations is unreliable in preview (slow first-paint, no fallback). Switch `productImage()` to **Unsplash's hosted CDN** using curated photo IDs per product:

```ts
imageId: "photo-1505740420928-5e560c06d30e"  // per product
productImage(p, w) → `https://images.unsplash.com/${p.imageId}?w=${w}&q=80&auto=format&fit=crop`
```

Each product gets a hand-picked Unsplash photo ID (no API key needed, served from Unsplash CDN, instant load, true high-res). I'll keep a `fallbackPrompt` field so we can regenerate later if needed.

## 5. Keep working

- All routes (`butler.shop.$category`, `butler.product.$slug`, `butler.cart`, sponsors, teams) keep their structure — only data + header change.
- Team-routing data (`butler-teams.ts`) untouched.
- All brand-blue accents stay token-driven so Center Grove will inherit gold automatically.

## 6. Center Grove

Not touched in this pass. Once Butler matches staging and you sign off, I'll replicate to `/center-grove` with the gold palette and the youth four-level designation selector.

## Technical notes
- New components: `StoreSubnav.tsx`, `CategoryStrip.tsx`, `DisclaimerBar.tsx`
- `StoreHeader.tsx` rewritten (kept same export signature)
- `categories.ts` `CategorySlug` union expanded → may produce type errors in any file that hard-codes the old slugs; I'll fix in same pass
- `products.ts` fully rewritten; `FEATURED_PRODUCTS` slugs updated so the homepage "Everyday Essentials" row keeps rendering
- `butler.cart.tsx` initial cart slugs updated to match new products
