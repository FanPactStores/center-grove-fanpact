import type { CategorySlug } from "./categories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  contribution: number; // dollars to community per unit
  category: CategorySlug;
  swatch: string; // oklch background for the product card visual
  description: string;
  details: string[];
};

// contribution ≈ 6% of price for demo realism (60% of ~10% net margin)
const c = (price: number, pct = 0.06) => Math.round(price * pct * 100) / 100;

export const PRODUCTS: Product[] = [
  // Baseball & Softball
  { id: "p001", slug: "rawlings-heart-of-the-hide-glove", name: "Heart of the Hide 11.75\" Infield Glove",
    brand: "Rawlings", price: 279.99, contribution: c(279.99), category: "baseball-softball",
    swatch: "oklch(0.35 0.08 35)",
    description: "Pro-grade leather infield glove broken in to the modern infielder's preference.",
    details: ["Pro-grade U.S. steerhide", "Conventional back", "Pro I web", "11.75 inch pattern"] },
  { id: "p002", slug: "easton-adv-360-bbcor", name: "ADV 360 BBCOR Baseball Bat",
    brand: "Easton", price: 399.95, contribution: c(399.95), category: "baseball-softball",
    swatch: "oklch(0.45 0.18 30)",
    description: "Two-piece composite BBCOR bat with launch composite barrel.",
    details: ["2 5/8\" barrel", "BBCOR certified", "Drop -3", "Launch composite barrel"] },
  { id: "p003", slug: "wilson-a2000-softball", name: "A2000 12\" Fastpitch Glove",
    brand: "Wilson", price: 299.95, contribution: c(299.95), category: "baseball-softball",
    swatch: "oklch(0.25 0.04 250)",
    description: "Pro-stock leather fastpitch glove for the dedicated infielder.",
    details: ["Pro stock leather", "Dual welting", "Rolled dual welting", "Fastpitch specific"] },
  { id: "p004", slug: "mizuno-mvp-prime-batting-gloves", name: "MVP Prime Batting Gloves",
    brand: "Mizuno", price: 39.99, contribution: c(39.99), category: "baseball-softball",
    swatch: "oklch(0.4 0.14 240)",
    description: "Premium leather palm with PowerArc embossing for a confident grip.",
    details: ["Smooth goatskin leather", "PowerArc palm pad", "Adjustable wristband"] },

  // Basketball
  { id: "p010", slug: "spalding-tf-1000-legacy", name: "TF-1000 Legacy Indoor Game Ball",
    brand: "Spalding", price: 99.99, contribution: c(99.99), category: "basketball",
    swatch: "oklch(0.5 0.16 50)",
    description: "Official indoor composite leather game ball used in high school federations.",
    details: ["NFHS approved", "Composite leather cover", "Cushioned core technology"] },
  { id: "p011", slug: "wilson-evolution-29-5", name: "Evolution 29.5\" Game Basketball",
    brand: "Wilson", price: 69.95, contribution: c(69.95), category: "basketball",
    swatch: "oklch(0.4 0.12 45)",
    description: "Microfiber composite leather. The most-loved game ball in high school basketball.",
    details: ["29.5\" official size", "Cushion core carcass", "Laid-in channels"] },
  { id: "p012", slug: "under-armour-curry-11", name: "Curry 11 Basketball Shoes",
    brand: "Under Armour", price: 160.0, contribution: c(160.0), category: "basketball",
    swatch: "oklch(0.45 0.18 250)",
    description: "Flow cushioning for a court feel that translates to faster cuts.",
    details: ["UA Flow midsole", "Warp upper", "Rubber outsole"] },
  { id: "p013", slug: "spalding-arena-slam-glass", name: "Arena Slam Glass Backboard Hoop",
    brand: "Spalding", price: 1199.0, contribution: c(1199.0), category: "basketball",
    swatch: "oklch(0.35 0.04 250)",
    description: "Tempered glass backboard with arena-style breakaway rim.",
    details: ["54\" tempered glass", "Breakaway rim", "In-ground installation"] },

  // Household
  { id: "p020", slug: "tide-pods-original-81ct", name: "Tide Pods Original — 81 ct",
    brand: "Tide", price: 23.99, contribution: c(23.99), category: "household",
    swatch: "oklch(0.55 0.18 30)",
    description: "3-in-1 laundry pacs that dissolve quickly in any temperature.",
    details: ["81 count tub", "HE compatible", "Original scent"] },
  { id: "p021", slug: "bounty-select-a-size-12pk", name: "Bounty Select-A-Size Paper Towels — 12 Rolls",
    brand: "Bounty", price: 32.49, contribution: c(32.49), category: "household",
    swatch: "oklch(0.78 0.14 70)",
    description: "Quicker picker upper. 12 double-plus rolls equal to 24 regular.",
    details: ["12 double-plus rolls", "Select-A-Size sheets", "2-ply"] },
  { id: "p022", slug: "clorox-disinfecting-wipes-3pk", name: "Clorox Disinfecting Wipes — 3 Pack",
    brand: "Clorox", price: 14.49, contribution: c(14.49), category: "household",
    swatch: "oklch(0.55 0.16 240)",
    description: "Kills 99.9% of viruses and bacteria. Three canister value pack.",
    details: ["225 wipes total", "Lemon Fresh + Crisp scents", "Bleach-free"] },
  { id: "p023", slug: "dawn-ultra-dish-soap-3pk", name: "Dawn Ultra Dish Soap — 28 oz, 3 Pack",
    brand: "Dawn", price: 17.99, contribution: c(17.99), category: "household",
    swatch: "oklch(0.5 0.14 240)",
    description: "Concentrated grease-cutting formula. Three 28 oz bottles.",
    details: ["3 × 28 oz", "Original scent", "Concentrated formula"] },

  // Nutrition
  { id: "p030", slug: "gatorade-thirst-quencher-variety-24pk", name: "Gatorade Thirst Quencher Variety — 24 Pack",
    brand: "Gatorade", price: 26.99, contribution: c(26.99), category: "nutrition",
    swatch: "oklch(0.6 0.18 145)",
    description: "Classic electrolyte hydration in fruit punch, lemon-lime, and orange.",
    details: ["24 × 20 oz bottles", "Three classic flavors", "Replenishes electrolytes"] },
  { id: "p031", slug: "optimum-gold-standard-whey", name: "Gold Standard 100% Whey — 5 lb",
    brand: "Optimum Nutrition", price: 89.99, contribution: c(89.99), category: "nutrition",
    swatch: "oklch(0.35 0.06 50)",
    description: "24g of whey protein per serving. The classic post-workout shake.",
    details: ["5 lb tub", "Double rich chocolate", "24g protein per scoop"] },
  { id: "p032", slug: "liquid-iv-hydration-multiplier-30ct", name: "Liquid I.V. Hydration Multiplier — 30 Sticks",
    brand: "Liquid I.V.", price: 27.49, contribution: c(27.49), category: "nutrition",
    swatch: "oklch(0.62 0.14 200)",
    description: "Cellular Transport Technology delivers hydration to the bloodstream faster than water alone.",
    details: ["30 single-serve sticks", "Lemon-lime flavor", "Non-GMO"] },
  { id: "p033", slug: "quest-protein-bars-cookies-cream-12ct", name: "Quest Protein Bars Cookies & Cream — 12 ct",
    brand: "Quest", price: 28.99, contribution: c(28.99), category: "nutrition",
    swatch: "oklch(0.3 0.02 250)",
    description: "21g of protein, 1g of sugar. The grab-and-go bar.",
    details: ["12 bars", "21g protein", "1g sugar"] },

  // Pet
  { id: "p040", slug: "purina-pro-plan-adult-chicken-34lb", name: "Pro Plan Adult Chicken & Rice — 34 lb",
    brand: "Purina", price: 67.99, contribution: c(67.99), category: "pet",
    swatch: "oklch(0.5 0.14 60)",
    description: "High-protein formula with real chicken as the #1 ingredient.",
    details: ["34 lb bag", "High protein", "Made in USA"] },
  { id: "p041", slug: "blue-buffalo-wilderness-chicken-24lb", name: "Wilderness Chicken Recipe — 24 lb",
    brand: "Blue Buffalo", price: 79.99, contribution: c(79.99), category: "pet",
    swatch: "oklch(0.4 0.1 220)",
    description: "Grain-free, protein-rich nutrition inspired by the diet of wolves.",
    details: ["24 lb bag", "Grain-free", "Real chicken first"] },
  { id: "p042", slug: "greenies-original-dental-treats-large", name: "Original Dental Treats — Large, 27 ct",
    brand: "Greenies", price: 39.99, contribution: c(39.99), category: "pet",
    swatch: "oklch(0.65 0.18 145)",
    description: "Cleans teeth, freshens breath, vet-recommended #1 dental chew.",
    details: ["27 large treats", "Vet recommended", "Cleans down to the gum line"] },
  { id: "p043", slug: "tidy-cats-clumping-litter-35lb", name: "Tidy Cats Clumping Litter — 35 lb",
    brand: "Tidy Cats", price: 19.99, contribution: c(19.99), category: "pet",
    swatch: "oklch(0.6 0.08 80)",
    description: "Glade Clean Blossoms scent. Tight clumps for easy scooping.",
    details: ["35 lb pail", "Multi-cat formula", "Glade scent"] },

  // Personal Care
  { id: "p050", slug: "dove-mens-care-body-wash-3pk", name: "Men+Care Body Wash — 18 oz, 3 Pack",
    brand: "Dove", price: 18.99, contribution: c(18.99), category: "personal-care",
    swatch: "oklch(0.5 0.12 230)",
    description: "Hydrating body wash with MicroMoisture technology.",
    details: ["3 × 18 oz", "Clean Comfort scent", "Mild on skin"] },
  { id: "p051", slug: "crest-3d-white-toothpaste-4pk", name: "3D White Brilliance Toothpaste — 4 Pack",
    brand: "Crest", price: 21.99, contribution: c(21.99), category: "personal-care",
    swatch: "oklch(0.55 0.16 25)",
    description: "Removes up to 95% of surface stains in 3 days.",
    details: ["4 × 4.6 oz tubes", "Vibrant Peppermint", "Enamel safe"] },
  { id: "p052", slug: "old-spice-pure-sport-deodorant-3pk", name: "Pure Sport Antiperspirant — 3 Pack",
    brand: "Old Spice", price: 16.99, contribution: c(16.99), category: "personal-care",
    swatch: "oklch(0.55 0.16 145)",
    description: "48-hour sweat protection. The classic athletic scent.",
    details: ["3 × 2.6 oz", "48-hour protection", "Pure Sport scent"] },
  { id: "p053", slug: "native-deodorant-coconut-vanilla-3pk", name: "Native Coconut & Vanilla — 3 Pack",
    brand: "Native", price: 30.0, contribution: c(30.0), category: "personal-care",
    swatch: "oklch(0.92 0.02 80)",
    description: "Aluminum-free deodorant in the original best-seller scent.",
    details: ["3 × 2.65 oz", "Aluminum free", "Paraben free"] },

  // Apparel
  { id: "p060", slug: "nike-dri-fit-training-tee", name: "Dri-FIT Training Tee",
    brand: "Nike", price: 35.0, contribution: c(35.0), category: "apparel",
    swatch: "oklch(0.2 0.005 250)",
    description: "Sweat-wicking performance tee built for everyday training.",
    details: ["Dri-FIT fabric", "Standard fit", "Imported"] },
  { id: "p061", slug: "under-armour-elite-crew-socks-6pk", name: "Elite Crew Socks — 6 Pack",
    brand: "Under Armour", price: 32.0, contribution: c(32.0), category: "apparel",
    swatch: "oklch(0.3 0.04 250)",
    description: "Cushioned crew sock with embedded arch support.",
    details: ["6 pairs", "Embedded arch support", "Anti-odor technology"] },
  { id: "p062", slug: "hanes-comfortsoft-tees-5pk", name: "ComfortSoft Crewneck Tees — 5 Pack",
    brand: "Hanes", price: 24.99, contribution: c(24.99), category: "apparel",
    swatch: "oklch(0.95 0.01 80)",
    description: "Soft-spun cotton crewneck undershirts. Tag-free.",
    details: ["5 white tees", "100% cotton", "Tag-free"] },
  { id: "p063", slug: "nike-everyday-cushioned-no-show-6pk", name: "Everyday Cushioned No-Show — 6 Pack",
    brand: "Nike", price: 22.0, contribution: c(22.0), category: "apparel",
    swatch: "oklch(0.5 0.08 240)",
    description: "Dri-FIT no-show socks with cushioned footbed.",
    details: ["6 pairs", "Cushioned footbed", "Dri-FIT"] },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getProductsByCategory = (slug: string) =>
  PRODUCTS.filter((p) => p.category === slug);
export const FEATURED_PRODUCTS = [
  "rawlings-heart-of-the-hide-glove",
  "spalding-tf-1000-legacy",
  "tide-pods-original-81ct",
  "gatorade-thirst-quencher-variety-24pk",
  "purina-pro-plan-adult-chicken-34lb",
  "nike-dri-fit-training-tee",
].map((s) => PRODUCTS.find((p) => p.slug === s)!);
