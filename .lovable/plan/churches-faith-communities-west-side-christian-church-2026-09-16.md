# Churches & Faith Communities — West Side Christian Church

## 1. New cause category on the homepage

Add a second Tier 1 card to "Select Your Cause", matching the Children's Miracle Network card exactly:

- Category: **Churches & Faith Communities** (region: Illinois)
- Tier 2 label: **Congregations**
- Entries: **West Side Christian Church** — live link to the new storefront, no "Soon" tag.
  Plus four placeholder congregations (greyed, no link) so the card reads like the CMN one.

## 2. New storefront at /cause/west-side-christian-church

Built from the HSHS St. John's cause template — same header, footer, search row, category strip, shop, product pages, cart, sponsors — with West Side content.

Nav: SHOP / OUR MINISTRIES / IMPACT STORIES / SPONSORS

Pages created:
- Home
- Shop (all categories + per-category)
- Product detail
- Cart (with fund picker, see below)
- Checkout confirmation (shows chosen fund)
- Our Ministries
- Impact Stories
- Sponsors (placeholder, same layout as other stores)

Hero uses the exact supplied headline, subheadline, mechanic line, and micro-line. Hero image is a generated placeholder (warm community/gathering scene) with a visible note that final imagery is pending church approval — nothing pulled from wschurch.org or their Facebook page.

## 3. Fund designation (three named funds)

Funds: **Kids Ministry Building Expansion**, **Missions**, **General Fund** (default).

- A fund selector bar sits in the store header where other stores show their designation banner, and again in the cart before checkout.
- Copy used in both places: "Choose where your contribution goes. Your share of the 60% ecosystem allocation supports the fund you select."
- The choice is remembered on the shopper's device and carries through to the confirmation page.

## 4. Our Ministries page

No division/team/player picker. Content covers West Side Kids (birth–3rd grade), Junior High and Student Ministries (6th–12th), Young Adults, small groups, local and global mission partners, and the Kids Ministry facility expansion. Location: Springfield, Illinois.

## 5. Product catalog

Reuses the same shared dropship catalog and category set as every other storefront — no separate products.

## 6. Reusable cause pattern

Each cause partner is now marked as either single-fund or multi-fund:

- **Single fund** (St. John's): no picker, keeps the existing "100% of your contribution… undivided" line.
- **Multiple funds** (West Side): shows the fund picker and the designation copy above.

This is driven off one field per store, so the next cause partner only needs its funds listed — no new components.

## Technical notes

- `src/data/stores.ts`: add `west-side-christian` store id + basePath `/cause/west-side-christian-church`; add optional `causeFunds?: { id: string; name: string; blurb?: string }[]` to `StoreConfig`.
- `src/data/conferences.ts`: append the `churches-faith` entry to `CAUSE_PARTNERS`.
- `src/styles.css`: `[data-store="west-side-christian"]` theme block (warm blue/amber).
- `src/lib/designation.ts`: add `west-side-christian` to `DEFAULT_FUND_NAMES` and `getDesignationIndex` (empty groups, like the cause index) so shared components stay type-safe.
- New `src/lib/cause-funds.ts`: localStorage-backed hook `useCauseFund(storeId)` reading `causeFunds` from the store config.
- New `src/components/fanpact/CauseFundBar.tsx`: header fund selector; `CauseStoreChrome.tsx` renders it when `store.causeFunds` exists, otherwise keeps the current fixed-line / DesignationBanner behaviour.
- `CauseStoreChrome.tsx`: add `NAV_BY_STORE["west-side-christian"]`.
- Routes: `src/routes/cause.west-side-christian-church.tsx` (layout) plus `.index`, `.shop.index`, `.shop.$category`, `.product.$slug`, `.cart`, `.checkout-confirmation`, `.our-ministries`, `.impact-stories`, `.sponsors.index` — cloned from the `cmn.st-johns.*` equivalents with per-route `head()` metadata.
- Hero art generated to `src/assets/west-side-hero.jpg`.
