import type { CategorySlug } from "./categories";

export type Spec = { label: string; value: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  contribution: number;
  category: CategorySlug;
  subcategory: string;
  sku: string;
  inStock: boolean;
  imagePrompt: string; // used to generate product image
  description: string;
  highlights: string[];
  specs: Spec[];
};

// contribution ≈ 6% of price for demo realism (60% of ~10% net margin)
const c = (price: number, pct = 0.06) => Math.round(price * pct * 100) / 100;

// Real-looking product photo via Pollinations (deterministic seed per product).
export const productImage = (p: Product, size = 800, variant = 0) => {
  const prompt = `${p.imagePrompt}, professional ecommerce product photography, isolated on pure white seamless background, studio softbox lighting, sharp focus, high detail, no text, no logo, no watermark`;
  const seed =
    Number(p.id.replace(/\D/g, "") || "1") * 100 + variant;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${size}&height=${size}&nologo=true&model=flux&seed=${seed}`;
};

const sku = (id: string) => {
  // deterministic faux SKU like "FP-1854-17E7-AF4D"
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const hex = h.toString(16).toUpperCase().padStart(8, "0");
  return `FP-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${id.toUpperCase()}`;
};

export const PRODUCTS: Product[] = [
  // Baseball & Softball
  {
    id: "p001", slug: "rawlings-heart-of-the-hide-glove",
    name: "Heart of the Hide 11.75\" Infield Glove",
    brand: "Rawlings", price: 279.99, contribution: c(279.99),
    category: "baseball-softball", subcategory: "gloves",
    sku: sku("p001"), inStock: true,
    imagePrompt: "premium tan brown leather baseball infield glove, broken in pocket, laces visible",
    description: "Pro-grade leather infield glove broken in to the modern infielder's preference. Built from Rawlings' iconic Heart of the Hide steerhide for a glove that breaks in fast and holds its shape season after season.",
    highlights: ["Pro-grade U.S. steerhide", "Conventional back, Pro I web", "11.75\" infield pattern", "Quality guaranteed"],
    specs: [
      { label: "Position", value: "Infield" },
      { label: "Pattern", value: "11.75 inch" },
      { label: "Web", value: "Pro I" },
      { label: "Throwing Hand", value: "Right" },
      { label: "Material", value: "Pro-grade steerhide leather" },
    ],
  },
  {
    id: "p002", slug: "easton-adv-360-bbcor",
    name: "ADV 360 BBCOR Baseball Bat",
    brand: "Easton", price: 399.95, contribution: c(399.95),
    category: "baseball-softball", subcategory: "bats",
    sku: sku("p002"), inStock: true,
    imagePrompt: "black and red composite BBCOR baseball bat, two-piece, knob and grip visible",
    description: "Two-piece composite BBCOR bat with launch composite barrel for maximum exit velocity and a smooth feel through the zone.",
    highlights: ["2 5/8\" barrel diameter", "BBCOR .50 certified", "Drop -3", "Launch composite barrel"],
    specs: [
      { label: "Barrel", value: "2 5/8\"" },
      { label: "Drop", value: "-3" },
      { label: "Certification", value: "BBCOR .50" },
      { label: "Construction", value: "Two-piece composite" },
      { label: "Length / Weight", value: "33\" / 30 oz" },
    ],
  },
  {
    id: "p003", slug: "wilson-a2000-softball",
    name: "A2000 12\" Fastpitch Glove",
    brand: "Wilson", price: 299.95, contribution: c(299.95),
    category: "baseball-softball", subcategory: "gloves",
    sku: sku("p003"), inStock: false,
    imagePrompt: "black and tan pro-stock leather fastpitch softball glove with dual welting",
    description: "Pro-stock leather fastpitch glove for the dedicated infielder, with rolled dual welting that increases shape retention.",
    highlights: ["Pro-stock leather", "Rolled dual welting", "Fastpitch-specific pattern", "12\" pattern"],
    specs: [
      { label: "Position", value: "Infield" },
      { label: "Pattern", value: "12 inch" },
      { label: "Throwing Hand", value: "Right" },
      { label: "Material", value: "Pro-stock leather" },
    ],
  },
  {
    id: "p004", slug: "mizuno-mvp-prime-batting-gloves",
    name: "MVP Prime Batting Gloves",
    brand: "Mizuno", price: 39.99, contribution: c(39.99),
    category: "baseball-softball", subcategory: "batting-gloves",
    sku: sku("p004"), inStock: true,
    imagePrompt: "pair of navy blue and white leather batting gloves with embossed palm pad",
    description: "Premium leather palm with PowerArc embossing for a confident grip on every swing.",
    highlights: ["Smooth goatskin leather palm", "PowerArc palm pad", "Adjustable wristband", "Sold as pair"],
    specs: [
      { label: "Material", value: "Goatskin leather" },
      { label: "Closure", value: "Adjustable wristband" },
      { label: "Fit", value: "Standard" },
    ],
  },

  // Basketball
  {
    id: "p010", slug: "spalding-tf-1000-legacy",
    name: "TF-1000 Legacy Indoor Game Ball",
    brand: "Spalding", price: 99.99, contribution: c(99.99),
    category: "basketball", subcategory: "game-balls",
    sku: sku("p010"), inStock: true,
    imagePrompt: "indoor orange composite leather basketball, official size, classic pebbled texture",
    description: "Official indoor composite leather game ball used in high school federations across the country.",
    highlights: ["NFHS approved", "Composite leather cover", "Cushioned core technology", "Official 29.5\" size"],
    specs: [
      { label: "Size", value: "29.5\" (Size 7)" },
      { label: "Material", value: "Composite leather" },
      { label: "Use", value: "Indoor only" },
      { label: "Certification", value: "NFHS approved" },
    ],
  },
  {
    id: "p011", slug: "wilson-evolution-29-5",
    name: "Evolution 29.5\" Game Basketball",
    brand: "Wilson", price: 69.95, contribution: c(69.95),
    category: "basketball", subcategory: "game-balls",
    sku: sku("p011"), inStock: true,
    imagePrompt: "orange microfiber composite leather basketball, classic Wilson Evolution style, deep channels",
    description: "Microfiber composite leather. The most-loved game ball in high school basketball.",
    highlights: ["29.5\" official size", "Cushion core carcass", "Laid-in channels", "Indoor use"],
    specs: [
      { label: "Size", value: "29.5\" (Size 7)" },
      { label: "Material", value: "Microfiber composite" },
      { label: "Use", value: "Indoor only" },
    ],
  },
  {
    id: "p012", slug: "under-armour-curry-11",
    name: "Curry 11 Basketball Shoes",
    brand: "Under Armour", price: 160.0, contribution: c(160.0),
    category: "basketball", subcategory: "shoes",
    sku: sku("p012"), inStock: true,
    imagePrompt: "white and blue performance basketball sneaker with low cut design, athletic shoe",
    description: "Flow cushioning for a court feel that translates to faster cuts and quicker first steps.",
    highlights: ["UA Flow midsole", "Warp upper", "Rubber outsole", "Low-cut profile"],
    specs: [
      { label: "Cushioning", value: "UA Flow" },
      { label: "Cut", value: "Low" },
      { label: "Use", value: "Indoor court" },
    ],
  },
  {
    id: "p013", slug: "spalding-arena-slam-glass",
    name: "Arena Slam Glass Backboard Hoop",
    brand: "Spalding", price: 1199.0, contribution: c(1199.0),
    category: "basketball", subcategory: "hoops",
    sku: sku("p013"), inStock: false,
    imagePrompt: "regulation in-ground basketball hoop with tempered glass backboard and breakaway rim",
    description: "Tempered glass backboard with arena-style breakaway rim for a true game experience at home.",
    highlights: ["54\" tempered glass backboard", "Breakaway rim", "In-ground installation", "Pole padding included"],
    specs: [
      { label: "Backboard", value: "54\" tempered glass" },
      { label: "Rim", value: "Breakaway" },
      { label: "Install", value: "In-ground" },
    ],
  },

  // Household
  {
    id: "p020", slug: "tide-pods-original-81ct",
    name: "Tide Pods Original — 81 ct",
    brand: "Tide", price: 23.99, contribution: c(23.99),
    category: "household", subcategory: "laundry",
    sku: sku("p020"), inStock: true,
    imagePrompt: "orange plastic tub of 3-in-1 laundry detergent pacs, white and blue swirl pods visible inside",
    description: "3-in-1 laundry pacs that dissolve quickly in any temperature.",
    highlights: ["81 count tub", "HE compatible", "Original scent", "Works in cold water"],
    specs: [
      { label: "Count", value: "81 pacs" },
      { label: "Scent", value: "Original" },
      { label: "Compatibility", value: "HE & standard machines" },
    ],
  },
  {
    id: "p021", slug: "bounty-select-a-size-12pk",
    name: "Bounty Select-A-Size Paper Towels — 12 Rolls",
    brand: "Bounty", price: 32.49, contribution: c(32.49),
    category: "household", subcategory: "paper-goods",
    sku: sku("p021"), inStock: true,
    imagePrompt: "12-pack of white paper towel rolls in clear plastic wrap, kitchen paper towels",
    description: "Quicker picker upper. 12 double-plus rolls equal to 24 regular.",
    highlights: ["12 double-plus rolls", "Select-A-Size sheets", "2-ply", "Strong when wet"],
    specs: [
      { label: "Roll count", value: "12 double-plus" },
      { label: "Equivalent", value: "24 regular rolls" },
      { label: "Ply", value: "2" },
    ],
  },
  {
    id: "p022", slug: "clorox-disinfecting-wipes-3pk",
    name: "Clorox Disinfecting Wipes — 3 Pack",
    brand: "Clorox", price: 14.49, contribution: c(14.49),
    category: "household", subcategory: "cleaning",
    sku: sku("p022"), inStock: true,
    imagePrompt: "three blue canisters of disinfecting cleaning wipes, household cleaning product",
    description: "Kills 99.9% of viruses and bacteria. Three canister value pack.",
    highlights: ["225 wipes total", "Lemon Fresh + Crisp scents", "Bleach-free", "Kills 99.9% of germs"],
    specs: [
      { label: "Pack size", value: "3 canisters" },
      { label: "Wipes per canister", value: "75" },
      { label: "Scent", value: "Lemon Fresh, Crisp Lemon" },
    ],
  },
  {
    id: "p023", slug: "dawn-ultra-dish-soap-3pk",
    name: "Dawn Ultra Dish Soap — 28 oz, 3 Pack",
    brand: "Dawn", price: 17.99, contribution: c(17.99),
    category: "household", subcategory: "dish",
    sku: sku("p023"), inStock: true,
    imagePrompt: "three blue bottles of concentrated dish soap, kitchen cleaning product",
    description: "Concentrated grease-cutting formula. Three 28 oz bottles.",
    highlights: ["3 × 28 oz bottles", "Original scent", "Concentrated formula", "Cuts grease fast"],
    specs: [
      { label: "Pack size", value: "3 bottles" },
      { label: "Volume", value: "28 oz each" },
      { label: "Scent", value: "Original" },
    ],
  },

  // Nutrition
  {
    id: "p030", slug: "gatorade-thirst-quencher-variety-24pk",
    name: "Gatorade Thirst Quencher Variety — 24 Pack",
    brand: "Gatorade", price: 26.99, contribution: c(26.99),
    category: "nutrition", subcategory: "hydration",
    sku: sku("p030"), inStock: true,
    imagePrompt: "variety pack of 24 sports drink bottles in fruit punch, lemon-lime, and orange flavors",
    description: "Classic electrolyte hydration in fruit punch, lemon-lime, and orange.",
    highlights: ["24 × 20 oz bottles", "Three classic flavors", "Replenishes electrolytes", "Variety pack"],
    specs: [
      { label: "Count", value: "24 bottles" },
      { label: "Size", value: "20 oz each" },
      { label: "Flavors", value: "Fruit Punch, Lemon-Lime, Orange" },
    ],
  },
  {
    id: "p031", slug: "optimum-gold-standard-whey",
    name: "Gold Standard 100% Whey — 5 lb",
    brand: "Optimum Nutrition", price: 89.99, contribution: c(89.99),
    category: "nutrition", subcategory: "protein",
    sku: sku("p031"), inStock: true,
    imagePrompt: "large gold and brown protein powder tub, whey protein supplement container",
    description: "24g of whey protein per serving. The classic post-workout shake.",
    highlights: ["5 lb tub", "Double Rich Chocolate", "24g protein per scoop", "Banned-substance tested"],
    specs: [
      { label: "Size", value: "5 lb (2.27 kg)" },
      { label: "Flavor", value: "Double Rich Chocolate" },
      { label: "Protein per serving", value: "24g" },
      { label: "Servings", value: "74" },
    ],
  },
  {
    id: "p032", slug: "liquid-iv-hydration-multiplier-30ct",
    name: "Liquid I.V. Hydration Multiplier — 30 Sticks",
    brand: "Liquid I.V.", price: 27.49, contribution: c(27.49),
    category: "nutrition", subcategory: "hydration",
    sku: sku("p032"), inStock: true,
    imagePrompt: "30 individual electrolyte powder stick packets in blue and green packaging",
    description: "Cellular Transport Technology delivers hydration to the bloodstream faster than water alone.",
    highlights: ["30 single-serve sticks", "Lemon-Lime flavor", "Non-GMO", "5 essential vitamins"],
    specs: [
      { label: "Count", value: "30 sticks" },
      { label: "Flavor", value: "Lemon-Lime" },
      { label: "Calories per stick", value: "45" },
    ],
  },
  {
    id: "p033", slug: "quest-protein-bars-cookies-cream-12ct",
    name: "Quest Protein Bars Cookies & Cream — 12 ct",
    brand: "Quest", price: 28.99, contribution: c(28.99),
    category: "nutrition", subcategory: "snacks",
    sku: sku("p033"), inStock: true,
    imagePrompt: "box of 12 cookies and cream flavored protein bars, individually wrapped",
    description: "21g of protein, 1g of sugar. The grab-and-go bar.",
    highlights: ["12 bars per box", "21g protein", "1g sugar", "Cookies & Cream"],
    specs: [
      { label: "Count", value: "12 bars" },
      { label: "Protein", value: "21g per bar" },
      { label: "Sugar", value: "1g per bar" },
      { label: "Flavor", value: "Cookies & Cream" },
    ],
  },

  // Pet
  {
    id: "p040", slug: "purina-pro-plan-adult-chicken-34lb",
    name: "Pro Plan Adult Chicken & Rice — 34 lb",
    brand: "Purina", price: 67.99, contribution: c(67.99),
    category: "pet", subcategory: "dog-food",
    sku: sku("p040"), inStock: true,
    imagePrompt: "large bag of premium dry dog food, chicken and rice formula, brown and red packaging",
    description: "High-protein formula with real chicken as the #1 ingredient.",
    highlights: ["34 lb bag", "High protein", "Made in USA", "Real chicken first ingredient"],
    specs: [
      { label: "Weight", value: "34 lb" },
      { label: "Life stage", value: "Adult" },
      { label: "Primary protein", value: "Chicken" },
    ],
  },
  {
    id: "p041", slug: "blue-buffalo-wilderness-chicken-24lb",
    name: "Wilderness Chicken Recipe — 24 lb",
    brand: "Blue Buffalo", price: 79.99, contribution: c(79.99),
    category: "pet", subcategory: "dog-food",
    sku: sku("p041"), inStock: true,
    imagePrompt: "large bag of grain-free dry dog food, blue packaging with wolf imagery",
    description: "Grain-free, protein-rich nutrition inspired by the diet of wolves.",
    highlights: ["24 lb bag", "Grain-free", "Real chicken first", "LifeSource Bits"],
    specs: [
      { label: "Weight", value: "24 lb" },
      { label: "Diet", value: "Grain-free" },
      { label: "Primary protein", value: "Chicken" },
    ],
  },
  {
    id: "p042", slug: "greenies-original-dental-treats-large",
    name: "Original Dental Treats — Large, 27 ct",
    brand: "Greenies", price: 39.99, contribution: c(39.99),
    category: "pet", subcategory: "treats",
    sku: sku("p042"), inStock: true,
    imagePrompt: "bag of green toothbrush-shaped dog dental chew treats, large size",
    description: "Cleans teeth, freshens breath, vet-recommended #1 dental chew.",
    highlights: ["27 large treats", "Vet recommended", "Cleans down to the gum line", "Freshens breath"],
    specs: [
      { label: "Count", value: "27 treats" },
      { label: "Size", value: "Large (50-100 lb dogs)" },
    ],
  },
  {
    id: "p043", slug: "tidy-cats-clumping-litter-35lb",
    name: "Tidy Cats Clumping Litter — 35 lb",
    brand: "Tidy Cats", price: 19.99, contribution: c(19.99),
    category: "pet", subcategory: "cat-care",
    sku: sku("p043"), inStock: true,
    imagePrompt: "large yellow plastic pail of clumping cat litter, 35 pound size",
    description: "Glade Clean Blossoms scent. Tight clumps for easy scooping.",
    highlights: ["35 lb pail", "Multi-cat formula", "Glade Clean Blossoms scent", "Tight clumping"],
    specs: [
      { label: "Weight", value: "35 lb" },
      { label: "Formula", value: "Multi-cat clumping" },
      { label: "Scent", value: "Glade Clean Blossoms" },
    ],
  },

  // Personal Care
  {
    id: "p050", slug: "dove-mens-care-body-wash-3pk",
    name: "Men+Care Body Wash — 18 oz, 3 Pack",
    brand: "Dove", price: 18.99, contribution: c(18.99),
    category: "personal-care", subcategory: "body",
    sku: sku("p050"), inStock: true,
    imagePrompt: "three dark blue bottles of men's body wash, 18 ounce size, personal care product",
    description: "Hydrating body wash with MicroMoisture technology.",
    highlights: ["3 × 18 oz bottles", "Clean Comfort scent", "Mild on skin", "MicroMoisture technology"],
    specs: [
      { label: "Pack size", value: "3 bottles" },
      { label: "Volume", value: "18 oz each" },
      { label: "Scent", value: "Clean Comfort" },
    ],
  },
  {
    id: "p051", slug: "crest-3d-white-toothpaste-4pk",
    name: "3D White Brilliance Toothpaste — 4 Pack",
    brand: "Crest", price: 21.99, contribution: c(21.99),
    category: "personal-care", subcategory: "oral",
    sku: sku("p051"), inStock: true,
    imagePrompt: "four boxes of whitening toothpaste in red and white packaging, oral care product",
    description: "Removes up to 95% of surface stains in 3 days.",
    highlights: ["4 × 4.6 oz tubes", "Vibrant Peppermint", "Enamel safe", "Removes surface stains"],
    specs: [
      { label: "Pack size", value: "4 tubes" },
      { label: "Volume", value: "4.6 oz each" },
      { label: "Flavor", value: "Vibrant Peppermint" },
    ],
  },
  {
    id: "p052", slug: "old-spice-pure-sport-deodorant-3pk",
    name: "Pure Sport Antiperspirant — 3 Pack",
    brand: "Old Spice", price: 16.99, contribution: c(16.99),
    category: "personal-care", subcategory: "deodorant",
    sku: sku("p052"), inStock: true,
    imagePrompt: "three red and white antiperspirant deodorant sticks, men's grooming product",
    description: "48-hour sweat protection. The classic athletic scent.",
    highlights: ["3 × 2.6 oz sticks", "48-hour protection", "Pure Sport scent", "Antiperspirant"],
    specs: [
      { label: "Pack size", value: "3 sticks" },
      { label: "Volume", value: "2.6 oz each" },
      { label: "Type", value: "Antiperspirant / Deodorant" },
    ],
  },
  {
    id: "p053", slug: "native-deodorant-coconut-vanilla-3pk",
    name: "Native Coconut & Vanilla — 3 Pack",
    brand: "Native", price: 30.0, contribution: c(30.0),
    category: "personal-care", subcategory: "deodorant",
    sku: sku("p053"), inStock: false,
    imagePrompt: "three white minimalist aluminum-free deodorant sticks, clean modern packaging",
    description: "Aluminum-free deodorant in the original best-seller scent.",
    highlights: ["3 × 2.65 oz sticks", "Aluminum free", "Paraben free", "Coconut & Vanilla"],
    specs: [
      { label: "Pack size", value: "3 sticks" },
      { label: "Volume", value: "2.65 oz each" },
      { label: "Free from", value: "Aluminum, parabens" },
    ],
  },

  // Apparel
  {
    id: "p060", slug: "nike-dri-fit-training-tee",
    name: "Dri-FIT Training Tee",
    brand: "Nike", price: 35.0, contribution: c(35.0),
    category: "apparel", subcategory: "tops",
    sku: sku("p060"), inStock: true,
    imagePrompt: "black men's athletic training t-shirt, sweat-wicking performance fabric, laid flat",
    description: "Sweat-wicking performance tee built for everyday training.",
    highlights: ["Dri-FIT fabric", "Standard fit", "Crew neck", "Imported"],
    specs: [
      { label: "Fabric", value: "100% polyester Dri-FIT" },
      { label: "Fit", value: "Standard" },
      { label: "Neck", value: "Crew" },
    ],
  },
  {
    id: "p061", slug: "under-armour-elite-crew-socks-6pk",
    name: "Elite Crew Socks — 6 Pack",
    brand: "Under Armour", price: 32.0, contribution: c(32.0),
    category: "apparel", subcategory: "socks",
    sku: sku("p061"), inStock: true,
    imagePrompt: "six pairs of black athletic crew socks neatly stacked, men's performance socks",
    description: "Cushioned crew sock with embedded arch support.",
    highlights: ["6 pairs", "Embedded arch support", "Anti-odor technology", "Cushioned footbed"],
    specs: [
      { label: "Count", value: "6 pairs" },
      { label: "Length", value: "Crew" },
      { label: "Material", value: "Polyester / cotton blend" },
    ],
  },
  {
    id: "p062", slug: "hanes-comfortsoft-tees-5pk",
    name: "ComfortSoft Crewneck Tees — 5 Pack",
    brand: "Hanes", price: 24.99, contribution: c(24.99),
    category: "apparel", subcategory: "basics",
    sku: sku("p062"), inStock: true,
    imagePrompt: "five plain white men's cotton t-shirts neatly folded and stacked",
    description: "Soft-spun cotton crewneck undershirts. Tag-free.",
    highlights: ["5 white tees", "100% cotton", "Tag-free", "ComfortSoft fabric"],
    specs: [
      { label: "Pack size", value: "5 tees" },
      { label: "Material", value: "100% cotton" },
      { label: "Neck", value: "Crew" },
    ],
  },
  {
    id: "p063", slug: "nike-everyday-cushioned-no-show-6pk",
    name: "Everyday Cushioned No-Show — 6 Pack",
    brand: "Nike", price: 22.0, contribution: c(22.0),
    category: "apparel", subcategory: "socks",
    sku: sku("p063"), inStock: true,
    imagePrompt: "six pairs of white low-cut no-show athletic socks, neatly arranged",
    description: "Dri-FIT no-show socks with cushioned footbed.",
    highlights: ["6 pairs", "Cushioned footbed", "Dri-FIT", "No-show profile"],
    specs: [
      { label: "Count", value: "6 pairs" },
      { label: "Length", value: "No-show" },
      { label: "Material", value: "Dri-FIT blend" },
    ],
  },
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
