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
  imageQuery: string; // loremflickr keyword(s), comma-separated
  imageSeed: number; // deterministic seed
  description: string;
  highlights: string[];
  specs: Spec[];
};

// contribution ≈ 6% of price (60% of ~10% net margin)
const c = (price: number, pct = 0.06) => Math.round(price * pct * 100) / 100;

// Reliable, keyword-relevant product photos via LoremFlickr (Creative Commons Flickr photos).
// Deterministic per product via `lock` seed → image won't change between renders.
export const productImage = (p: Product, size = 600, variant = 0) => {
  const lock = p.imageSeed * 100 + variant;
  return `https://loremflickr.com/${size}/${size}/${encodeURIComponent(p.imageQuery)}?lock=${lock}`;
};

const sku = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const hex = h.toString(16).toUpperCase().padStart(8, "0");
  return `FP-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${id.toUpperCase()}`;
};

type Seed = Omit<Product, "sku" | "contribution"> & { contribution?: number };

const SEEDS: Seed[] = [
  // ────────────────────────── ELECTRONICS
  { id: "e001", slug: "apple-airpods-pro-2", name: "AirPods Pro (2nd Gen) with USB-C", brand: "Apple", price: 249.0, category: "electronics", subcategory: "audio", inStock: true,
    imageQuery: "airpods,wireless,earbuds", imageSeed: 11,
    description: "Active Noise Cancellation, Adaptive Audio, and personalized spatial audio. The everyday earbuds for calls, focus, and workouts.",
    highlights: ["Active Noise Cancellation", "Adaptive Audio & Transparency", "Up to 6 hours listening", "USB-C MagSafe charging case"],
    specs: [{ label: "Chip", value: "Apple H2" }, { label: "Battery (buds)", value: "6 hrs" }, { label: "Battery (case)", value: "30 hrs" }, { label: "Connector", value: "USB-C" }] },
  { id: "e002", slug: "sony-wh-1000xm5", name: "WH-1000XM5 Wireless Noise-Canceling Headphones", brand: "Sony", price: 399.99, category: "electronics", subcategory: "audio", inStock: true,
    imageQuery: "wireless,headphones,black", imageSeed: 12,
    description: "Industry-leading noise cancellation with auto-optimization, 30-hour battery, and crystal-clear hands-free calls.",
    highlights: ["8 mics for crystal-clear calls", "30-hr battery", "Multipoint connection", "Quick Attention mode"],
    specs: [{ label: "Battery", value: "30 hrs" }, { label: "Weight", value: "250 g" }, { label: "Bluetooth", value: "5.2" }, { label: "Codecs", value: "LDAC, AAC, SBC" }] },
  { id: "e003", slug: "bose-soundlink-flex", name: "SoundLink Flex Portable Bluetooth Speaker", brand: "Bose", price: 149.0, category: "electronics", subcategory: "audio", inStock: true,
    imageQuery: "bluetooth,speaker,portable", imageSeed: 13,
    description: "Waterproof, dustproof, and floats. PositionIQ delivers room-filling sound no matter the orientation.",
    highlights: ["IP67 waterproof & dustproof", "12-hr battery", "PositionIQ technology", "Built-in mic"],
    specs: [{ label: "Battery", value: "12 hrs" }, { label: "Rating", value: "IP67" }, { label: "Bluetooth", value: "4.2" }] },
  { id: "e004", slug: "apple-ipad-air-11", name: "iPad Air 11\" (M2, 128 GB, Wi-Fi)", brand: "Apple", price: 599.0, category: "electronics", subcategory: "computers-tablets", inStock: true,
    imageQuery: "ipad,tablet,apple", imageSeed: 14,
    description: "Apple M2 brings desktop-class performance to the ultra-portable iPad Air. Liquid Retina display, all-day battery.",
    highlights: ["Apple M2 chip", "11-inch Liquid Retina", "Wi-Fi 6E", "Touch ID"],
    specs: [{ label: "Storage", value: "128 GB" }, { label: "Display", value: "11\" Liquid Retina" }, { label: "Chip", value: "Apple M2" }] },
  { id: "e005", slug: "samsung-class-cu7000-55", name: "55\" Class CU7000 Crystal UHD 4K Smart TV", brand: "Samsung", price: 449.99, category: "electronics", subcategory: "tv-home-theater", inStock: true,
    imageQuery: "television,4k,smart,tv", imageSeed: 15,
    description: "PurColor and 4K upscaling with Tizen smart OS. Built-in Alexa and streaming-ready out of the box.",
    highlights: ["4K UHD, HDR", "Crystal Processor 4K", "Tizen OS", "Built-in voice assistants"],
    specs: [{ label: "Size", value: "55 inch" }, { label: "Resolution", value: "3840 × 2160" }, { label: "Refresh Rate", value: "60 Hz" }] },
  { id: "e006", slug: "anker-prime-power-bank", name: "Prime 20,000 mAh 200W Power Bank", brand: "Anker", price: 129.99, category: "electronics", subcategory: "accessories", inStock: true,
    imageQuery: "power,bank,charger", imageSeed: 16,
    description: "Charge a laptop, phone, and earbuds simultaneously. Smart display shows wattage and time-to-full per port.",
    highlights: ["200 W total output", "3 ports, smart display", "GaN technology", "TSA-friendly"],
    specs: [{ label: "Capacity", value: "20,000 mAh" }, { label: "Ports", value: "2× USB-C, 1× USB-A" }, { label: "Max Output", value: "200 W" }] },

  // ────────────────────────── HOME & LIVING
  { id: "h001", slug: "tide-pods-original-81ct", name: "Tide Pods Original Laundry Detergent (81 ct)", brand: "Tide", price: 24.97, category: "home-living", subcategory: "laundry", inStock: true,
    imageQuery: "laundry,detergent,pods", imageSeed: 21,
    description: "3-in-1 detergent, stain remover, and color protector in a pre-measured pac. America's #1 detergent.",
    highlights: ["3-in-1 cleaning power", "HE compatible", "Works in cold water", "81 pacs per tub"],
    specs: [{ label: "Count", value: "81 pods" }, { label: "Scent", value: "Original" }, { label: "HE Compatible", value: "Yes" }] },
  { id: "h002", slug: "bounty-paper-towels-12pk", name: "Bounty Select-A-Size Paper Towels (12 Double Rolls)", brand: "Bounty", price: 26.99, category: "home-living", subcategory: "paper-goods", inStock: true,
    imageQuery: "paper,towels,roll", imageSeed: 22,
    description: "The Quicker Picker Upper. 12 Double Rolls equal 24 Regular Rolls of cleanup power.",
    highlights: ["2× more absorbent vs. leading bargain brand", "Select-A-Size sheets", "12 Double Rolls"],
    specs: [{ label: "Rolls", value: "12 Double" }, { label: "Sheets/Roll", value: "98" }] },
  { id: "h003", slug: "clorox-disinfecting-wipes-3pk", name: "Disinfecting Wipes (3-Pack, 225 wipes)", brand: "Clorox", price: 12.99, category: "home-living", subcategory: "cleaning", inStock: true,
    imageQuery: "cleaning,wipes,disinfect", imageSeed: 23,
    description: "Kills 99.9% of viruses and bacteria. Three canisters of fresh-scent disinfecting wipes.",
    highlights: ["Kills 99.9% of germs", "Bleach-free", "3 canisters, 75 wipes each"],
    specs: [{ label: "Total Wipes", value: "225" }, { label: "Scent", value: "Fresh" }] },
  { id: "h004", slug: "dawn-platinum-powerwash-3pk", name: "Platinum Powerwash Dish Spray (3-Pack)", brand: "Dawn", price: 11.99, category: "home-living", subcategory: "cleaning", inStock: true,
    imageQuery: "dish,soap,bottle", imageSeed: 24,
    description: "5× faster on tough grease vs. the leading non-concentrated brand. Spray, wipe, rinse.",
    highlights: ["5× faster on grease", "Spray-and-wipe formula", "3 bottles"],
    specs: [{ label: "Volume", value: "16 fl oz × 3" }, { label: "Scent", value: "Fresh" }] },
  { id: "h005", slug: "brooklinen-classic-sheet-set", name: "Classic Percale Sheet Set (Queen)", brand: "Brooklinen", price: 159.0, category: "home-living", subcategory: "bedding-bath", inStock: true,
    imageQuery: "bedsheets,bedding,white", imageSeed: 25,
    description: "Cool, crisp, long-staple cotton percale. The benchmark for everyday luxury bedding.",
    highlights: ["270 thread count percale", "Long-staple cotton", "OEKO-TEX certified"],
    specs: [{ label: "Material", value: "100% cotton percale" }, { label: "Size", value: "Queen" }] },

  // ────────────────────────── KITCHEN & DINING
  { id: "k001", slug: "ninja-foodi-9in1-deluxe-xl", name: "Foodi 9-in-1 Deluxe XL Pressure Cooker", brand: "Ninja", price: 229.99, category: "kitchen-dining", subcategory: "small-appliances", inStock: true,
    imageQuery: "pressure,cooker,kitchen,appliance", imageSeed: 31,
    description: "Pressure cook, air crisp, steam, slow cook, sear/sauté, bake, broil, dehydrate, and keep warm. 8-qt capacity.",
    highlights: ["9 functions", "8-quart capacity", "Crisping lid included"],
    specs: [{ label: "Capacity", value: "8 qt" }, { label: "Wattage", value: "1760 W" }] },
  { id: "k002", slug: "keurig-k-classic", name: "K-Classic Single-Serve K-Cup Pod Coffee Maker", brand: "Keurig", price: 129.99, category: "kitchen-dining", subcategory: "small-appliances", inStock: true,
    imageQuery: "coffee,maker,kitchen", imageSeed: 32,
    description: "Brews any 6, 8, or 10 oz cup in under a minute. 48 oz reservoir for multiple cups between refills.",
    highlights: ["3 brew sizes", "48 oz reservoir", "Auto off after 2 hrs"],
    specs: [{ label: "Reservoir", value: "48 oz" }, { label: "Pod Type", value: "K-Cup" }] },
  { id: "k003", slug: "kitchenaid-classic-stand-mixer", name: "Classic Series 4.5-Quart Tilt-Head Stand Mixer", brand: "KitchenAid", price: 279.99, category: "kitchen-dining", subcategory: "small-appliances", inStock: false,
    imageQuery: "stand,mixer,kitchen", imageSeed: 33,
    description: "10-speed motor, 4.5-quart stainless bowl, flat beater, dough hook, and wire whip included.",
    highlights: ["10 speeds", "Tilt-head design", "3 attachments included"],
    specs: [{ label: "Capacity", value: "4.5 qt" }, { label: "Speeds", value: "10" }] },
  { id: "k004", slug: "lodge-cast-iron-skillet-12", name: "Pre-Seasoned 12-inch Cast Iron Skillet", brand: "Lodge", price: 32.95, category: "kitchen-dining", subcategory: "cookware", inStock: true,
    imageQuery: "cast,iron,skillet,pan", imageSeed: 34,
    description: "Pre-seasoned and ready to use. Made in the USA — a lifetime tool for stovetop, oven, grill, or campfire.",
    highlights: ["Pre-seasoned", "Made in USA", "Oven-safe to 500°F"],
    specs: [{ label: "Diameter", value: "12 in" }, { label: "Material", value: "Cast iron" }] },
  { id: "k005", slug: "hydro-flask-32oz-wide-mouth", name: "32 oz Wide Mouth Insulated Bottle", brand: "Hydro Flask", price: 49.95, category: "kitchen-dining", subcategory: "drinkware", inStock: true,
    imageQuery: "water,bottle,steel", imageSeed: 35,
    description: "TempShield insulation keeps drinks cold up to 24 hours and hot up to 12. Pro-grade 18/8 stainless steel.",
    highlights: ["24h cold / 12h hot", "BPA-free", "Lifetime warranty"],
    specs: [{ label: "Capacity", value: "32 oz" }, { label: "Material", value: "18/8 stainless" }] },
  { id: "k006", slug: "yeti-rambler-20oz-tumbler", name: "Rambler 20 oz Tumbler with MagSlider Lid", brand: "Yeti", price: 35.0, category: "kitchen-dining", subcategory: "drinkware", inStock: true,
    imageQuery: "tumbler,coffee,cup,steel", imageSeed: 36,
    description: "Double-wall vacuum insulation. Dishwasher safe with the included MagSlider lid.",
    highlights: ["Double-wall vacuum insulation", "MagSlider lid", "Dishwasher safe"],
    specs: [{ label: "Capacity", value: "20 oz" }, { label: "Material", value: "18/8 stainless" }] },

  // ────────────────────────── BEAUTY & PERSONAL CARE
  { id: "b001", slug: "crest-3d-white-toothpaste-3pk", name: "3D White Brilliance Toothpaste (3-Pack)", brand: "Crest", price: 14.97, category: "beauty-personal-care", subcategory: "oral-care", inStock: true,
    imageQuery: "toothpaste,tube,dental", imageSeed: 41,
    description: "Removes up to 90% of surface stains in 5 days. Vibrant mint scent.",
    highlights: ["Enamel safe", "Cavity protection", "3 tubes"],
    specs: [{ label: "Size", value: "3.8 oz × 3" }, { label: "Flavor", value: "Vibrant Mint" }] },
  { id: "b002", slug: "dove-body-wash-deep-moisture-3pk", name: "Deep Moisture Body Wash (3-Pack, 22 oz)", brand: "Dove", price: 18.97, category: "beauty-personal-care", subcategory: "skin-care", inStock: true,
    imageQuery: "bodywash,soap,bottle", imageSeed: 42,
    description: "Cleansers and ¼ moisturizing cream nourish deeply for visibly smoother, softer skin.",
    highlights: ["Sulfate-free", "Dermatologist recommended", "3 bottles"],
    specs: [{ label: "Volume", value: "22 oz × 3" }] },
  { id: "b003", slug: "olay-regenerist-micro-sculpting-cream", name: "Regenerist Micro-Sculpting Cream Moisturizer", brand: "Olay", price: 28.99, category: "beauty-personal-care", subcategory: "skin-care", inStock: true,
    imageQuery: "skincare,cream,jar", imageSeed: 43,
    description: "Hydrates and firms skin's surface in 14 days. Niacinamide + amino-peptide complex.",
    highlights: ["Hydrates 24 hrs", "Niacinamide + peptides", "Fragrance-free option"],
    specs: [{ label: "Size", value: "1.7 oz" }] },
  { id: "b004", slug: "native-deodorant-coconut-vanilla-2pk", name: "Aluminum-Free Deodorant Coconut & Vanilla (2-Pack)", brand: "Native", price: 21.0, category: "beauty-personal-care", subcategory: "shaving-deodorant", inStock: true,
    imageQuery: "deodorant,stick,bathroom", imageSeed: 44,
    description: "Aluminum-free, paraben-free, cruelty-free. 24-hour odor protection with naturally derived ingredients.",
    highlights: ["Aluminum-free", "24-hr protection", "Cruelty-free"],
    specs: [{ label: "Scent", value: "Coconut & Vanilla" }, { label: "Size", value: "2.65 oz × 2" }] },
  { id: "b005", slug: "gillette-fusion5-proglide-cartridges-12", name: "Fusion5 ProGlide Razor Blade Refills (12 ct)", brand: "Gillette", price: 41.99, category: "beauty-personal-care", subcategory: "shaving-deodorant", inStock: true,
    imageQuery: "razor,shaving,blade", imageSeed: 45,
    description: "Five anti-friction blades and a Precision Trimmer on the back. Lubrication strip with vitamin E.",
    highlights: ["5 anti-friction blades", "Precision Trimmer", "12 cartridges"],
    specs: [{ label: "Blades/Cartridge", value: "5" }] },

  // ────────────────────────── PET SUPPLIES
  { id: "p001", slug: "purina-pro-plan-adult-chicken-34lb", name: "Pro Plan Adult Shredded Blend Chicken & Rice (34 lb)", brand: "Purina", price: 67.98, category: "pet-supplies", subcategory: "dog-food", inStock: true,
    imageQuery: "dog,food,kibble,bag", imageSeed: 51,
    description: "Real chicken is the #1 ingredient. Probiotics for digestive and immune health.",
    highlights: ["Real chicken #1 ingredient", "Live probiotics", "Crunchy kibble + tender shredded"],
    specs: [{ label: "Weight", value: "34 lb" }, { label: "Life Stage", value: "Adult" }] },
  { id: "p002", slug: "blue-buffalo-life-protection-lamb-30lb", name: "Life Protection Formula Lamb & Brown Rice (30 lb)", brand: "Blue Buffalo", price: 64.98, category: "pet-supplies", subcategory: "dog-food", inStock: true,
    imageQuery: "dog,food,natural", imageSeed: 52,
    description: "Real lamb plus LifeSource Bits — a precise blend of antioxidants, vitamins, and minerals.",
    highlights: ["Deboned lamb #1 ingredient", "LifeSource Bits", "No chicken/poultry by-product meals"],
    specs: [{ label: "Weight", value: "30 lb" }, { label: "Life Stage", value: "Adult" }] },
  { id: "p003", slug: "tidy-cats-clumping-litter-35lb", name: "Clumping Litter 24/7 Performance (35 lb)", brand: "Tidy Cats", price: 18.97, category: "pet-supplies", subcategory: "cat-food", inStock: true,
    imageQuery: "cat,litter,box", imageSeed: 53,
    description: "Tight clumps for easy scooping. Continuous odor control for multi-cat households.",
    highlights: ["Continuous odor control", "Tight clumps", "Multi-cat"],
    specs: [{ label: "Weight", value: "35 lb" }] },
  { id: "p004", slug: "greenies-original-dental-treats-large-27ct", name: "Original Dental Dog Treats Large (27 ct)", brand: "Greenies", price: 35.99, category: "pet-supplies", subcategory: "treats-toys", inStock: true,
    imageQuery: "dog,treats,dental", imageSeed: 54,
    description: "Vet-recommended #1 dental treat. Clean teeth, fresh breath, happy dog.",
    highlights: ["VOHC accepted", "Soft inside, crunchy outside", "27 treats"],
    specs: [{ label: "Count", value: "27" }, { label: "Dog Size", value: "Large (50-100 lb)" }] },

  // ────────────────────────── FITNESS & OUTDOOR
  { id: "f001", slug: "gatorade-thirst-quencher-variety-24pk", name: "Thirst Quencher Variety Pack (24 × 20 oz)", brand: "Gatorade", price: 32.99, category: "fitness-outdoor", subcategory: "hydration-nutrition", inStock: true,
    imageQuery: "gatorade,sports,drink", imageSeed: 61,
    description: "The original electrolyte sports drink. Variety pack of fan-favorite flavors.",
    highlights: ["Electrolytes for hydration", "24 bottles", "Variety of flavors"],
    specs: [{ label: "Size", value: "20 oz × 24" }] },
  { id: "f002", slug: "optimum-gold-standard-whey-5lb", name: "Gold Standard 100% Whey Protein (5 lb)", brand: "Optimum Nutrition", price: 89.99, category: "fitness-outdoor", subcategory: "hydration-nutrition", inStock: true,
    imageQuery: "protein,powder,supplement", imageSeed: 62,
    description: "24 g of whey protein per scoop. The world's best-selling whey protein.",
    highlights: ["24 g protein / scoop", "5.5 g BCAAs", "Banned-substance tested"],
    specs: [{ label: "Servings", value: "74" }, { label: "Flavor", value: "Double Rich Chocolate" }] },
  { id: "f003", slug: "liquid-iv-hydration-multiplier-30pk", name: "Hydration Multiplier Lemon Lime (30 sticks)", brand: "Liquid I.V.", price: 24.99, category: "fitness-outdoor", subcategory: "hydration-nutrition", inStock: true,
    imageQuery: "hydration,powder,packet", imageSeed: 63,
    description: "3× the electrolytes of leading sports drinks with Cellular Transport Technology.",
    highlights: ["3× electrolytes", "5 essential vitamins", "30 individual sticks"],
    specs: [{ label: "Servings", value: "30" }, { label: "Flavor", value: "Lemon Lime" }] },
  { id: "f004", slug: "coleman-classic-propane-stove", name: "Classic 2-Burner Propane Camp Stove", brand: "Coleman", price: 79.99, category: "fitness-outdoor", subcategory: "outdoor", inStock: true,
    imageQuery: "camping,stove,outdoor", imageSeed: 64,
    description: "20,000 BTUs of cooking power across two adjustable burners. Wind-blocking panels.",
    highlights: ["20,000 BTU total", "PerfectFlow regulator", "Adjustable burners"],
    specs: [{ label: "Burners", value: "2" }, { label: "Fuel", value: "1-lb propane" }] },

  // ────────────────────────── AUTO ACCESSORIES
  { id: "a001", slug: "mobil1-extended-performance-5w30-5qt", name: "Extended Performance 5W-30 Motor Oil (5 qt)", brand: "Mobil 1", price: 31.97, category: "auto-accessories", subcategory: "oil-fluids", inStock: true,
    imageQuery: "motor,oil,bottle,engine", imageSeed: 71,
    description: "Full synthetic. Up to 20,000 miles between oil changes guaranteed.",
    highlights: ["Up to 20,000-mile protection", "Full synthetic", "5W-30"],
    specs: [{ label: "Volume", value: "5 qt" }, { label: "Viscosity", value: "5W-30" }] },
  { id: "a002", slug: "armor-all-protectant-spray-2pk", name: "Original Protectant Spray (2-Pack, 28 oz)", brand: "Armor All", price: 14.97, category: "auto-accessories", subcategory: "car-care", inStock: true,
    imageQuery: "car,detailing,spray", imageSeed: 72,
    description: "Restores like-new shine and protects against fading, cracking, and aging on interior surfaces.",
    highlights: ["UV protection", "Restores like-new shine", "2 bottles"],
    specs: [{ label: "Size", value: "28 oz × 2" }] },
  { id: "a003", slug: "rain-x-original-wiper-blades-22", name: "Original Wiper Blades 22\" (Single)", brand: "Rain-X", price: 18.99, category: "auto-accessories", subcategory: "car-care", inStock: true,
    imageQuery: "wiper,blade,windshield", imageSeed: 73,
    description: "All-weather rubber squeegee with steel frame. Streak-free clearing.",
    highlights: ["Steel frame", "All-weather rubber", "Easy install"],
    specs: [{ label: "Length", value: "22 in" }] },

  // ────────────────────────── TOOLS & HOME IMPROVEMENT
  { id: "t001", slug: "dewalt-20v-max-drill-driver-kit", name: "20V MAX Cordless Drill / Driver Kit", brand: "DeWalt", price: 169.0, category: "tools-home-improvement", subcategory: "power-tools", inStock: true,
    imageQuery: "drill,power,tool,cordless", imageSeed: 81,
    description: "Compact, lightweight design fits into tight areas. 2-speed transmission with LED light.",
    highlights: ["High-performance motor", "2-speed transmission", "Battery + charger included"],
    specs: [{ label: "Voltage", value: "20 V MAX" }, { label: "Chuck", value: "1/2 in" }] },
  { id: "t002", slug: "milwaukee-m18-impact-driver", name: "M18 1/4\" Hex Impact Driver (Tool Only)", brand: "Milwaukee", price: 149.0, category: "tools-home-improvement", subcategory: "power-tools", inStock: true,
    imageQuery: "impact,driver,tool", imageSeed: 82,
    description: "1,600 in-lbs of torque. 4-mode DRIVE CONTROL for precision and power.",
    highlights: ["1,600 in-lbs torque", "4-mode DRIVE CONTROL", "Tool only"],
    specs: [{ label: "Voltage", value: "M18" }, { label: "Torque", value: "1,600 in-lbs" }] },
  { id: "t003", slug: "stanley-fatmax-25ft-tape-measure", name: "FatMax 25 ft Tape Measure", brand: "Stanley", price: 24.97, category: "tools-home-improvement", subcategory: "hand-tools", inStock: true,
    imageQuery: "tape,measure,tool", imageSeed: 83,
    description: "13 ft of blade stand-out. BladeArmor coating extends life on the most-used section of the blade.",
    highlights: ["13 ft stand-out", "BladeArmor coating", "Mylar polyester film"],
    specs: [{ label: "Length", value: "25 ft" }, { label: "Width", value: "1-1/4 in" }] },

  // ────────────────────────── OFFICE & SCHOOL
  { id: "o001", slug: "pilot-g2-gel-pens-12pk", name: "G2 Premium Gel Roller Pens 0.7mm Black (12 ct)", brand: "Pilot", price: 12.97, category: "office-school", subcategory: "writing", inStock: true,
    imageQuery: "pens,office,writing", imageSeed: 91,
    description: "America's #1 selling gel pen. Smooth-writing, long-lasting gel ink.",
    highlights: ["#1 selling gel pen", "Comfortable rubber grip", "12 pens"],
    specs: [{ label: "Point Size", value: "0.7 mm" }, { label: "Color", value: "Black" }] },
  { id: "o002", slug: "post-it-super-sticky-notes-12pk", name: "Super Sticky Notes Variety (12 pads)", brand: "Post-it", price: 18.99, category: "office-school", subcategory: "paper-planners", inStock: true,
    imageQuery: "sticky,notes,office", imageSeed: 92,
    description: "2× the sticking power. Reliably sticks and re-sticks to vertical, non-vertical, and even rough surfaces.",
    highlights: ["2× sticking power", "12 pads, 90 sheets each", "Assorted colors"],
    specs: [{ label: "Size", value: "3 × 3 in" }, { label: "Pads", value: "12" }] },
  { id: "o003", slug: "jansport-superbreak-one-backpack", name: "SuperBreak One Backpack", brand: "JanSport", price: 36.0, category: "office-school", subcategory: "backpacks", inStock: true,
    imageQuery: "backpack,school,bag", imageSeed: 93,
    description: "The classic. One main compartment, front utility pocket, padded straps. Lifetime warranty.",
    highlights: ["Lifetime warranty", "Padded shoulder straps", "Made with recycled materials"],
    specs: [{ label: "Capacity", value: "25 L" }, { label: "Weight", value: "0.7 lb" }] },

  // ────────────────────────── BABY & KIDS
  { id: "y001", slug: "pampers-swaddlers-size3-168ct", name: "Swaddlers Diapers Size 3 (168 ct)", brand: "Pampers", price: 49.99, category: "baby-kids", subcategory: "diapers-wipes", inStock: true,
    imageQuery: "diapers,baby,pack", imageSeed: 101,
    description: "#1 choice of US hospitals. Heart Quilts liner pulls wetness and mess away from baby's skin.",
    highlights: ["#1 choice of US hospitals", "Wetness indicator", "Up to 12-hr protection"],
    specs: [{ label: "Size", value: "3 (16-28 lb)" }, { label: "Count", value: "168" }] },
  { id: "y002", slug: "huggies-natural-care-wipes-560ct", name: "Natural Care Sensitive Baby Wipes (560 ct)", brand: "Huggies", price: 17.99, category: "baby-kids", subcategory: "diapers-wipes", inStock: true,
    imageQuery: "baby,wipes,care", imageSeed: 102,
    description: "99% water. Hypoallergenic, plant-based, fragrance-free. Dermatologically tested.",
    highlights: ["99% water", "Fragrance-free", "560 wipes"],
    specs: [{ label: "Count", value: "560 (8 × 70)" }] },
  { id: "y003", slug: "similac-360-total-care-30oz", name: "360 Total Care Infant Formula (30.8 oz)", brand: "Similac", price: 42.99, category: "baby-kids", subcategory: "feeding", inStock: true,
    imageQuery: "baby,formula,bottle", imageSeed: 103,
    description: "Closer than ever to breast milk with 5 HMO prebiotics for immune support.",
    highlights: ["5 HMO prebiotics", "No artificial growth hormones", "Non-GMO"],
    specs: [{ label: "Size", value: "30.8 oz" }, { label: "Stage", value: "Infant" }] },

  // ────────────────────────── APPAREL
  { id: "ap001", slug: "nike-dri-fit-training-tee", name: "Dri-FIT Legend Training T-Shirt", brand: "Nike", price: 30.0, category: "apparel", subcategory: "tops", inStock: true,
    imageQuery: "nike,tshirt,athletic", imageSeed: 111,
    description: "Sweat-wicking fabric helps you stay dry and comfortable from workout to weekend.",
    highlights: ["Dri-FIT moisture management", "Loose fit", "Standard hem"],
    specs: [{ label: "Material", value: "100% polyester" }, { label: "Fit", value: "Loose" }] },
  { id: "ap002", slug: "hanes-comfortsoft-tagless-tees-6pk", name: "ComfortSoft Tagless Crewneck Tees (6-Pack)", brand: "Hanes", price: 28.99, category: "apparel", subcategory: "basics", inStock: true,
    imageQuery: "tshirt,white,basic", imageSeed: 112,
    description: "Soft, breathable cotton with a tagless neck. The everyday undershirt or workout layer.",
    highlights: ["100% ComfortSoft cotton", "Tagless neck", "6 shirts"],
    specs: [{ label: "Pack", value: "6" }, { label: "Material", value: "100% cotton" }] },
  { id: "ap003", slug: "bombas-ankle-socks-4pk", name: "Performance Ankle Socks (4-Pack)", brand: "Bombas", price: 60.0, category: "apparel", subcategory: "socks", inStock: true,
    imageQuery: "socks,athletic,white", imageSeed: 113,
    description: "Honeycomb support system, blister tab, and stay-up cuff. One purchased = one donated.",
    highlights: ["Honeycomb arch support", "Stay-up cuff", "One-for-one donation"],
    specs: [{ label: "Pack", value: "4 pairs" }, { label: "Material", value: "Cotton blend" }] },

  // ────────────────────────── TOYS & GAMES
  { id: "g001", slug: "lego-classic-medium-creative-brick-box", name: "Classic Medium Creative Brick Box (484 pcs)", brand: "LEGO", price: 34.99, category: "toys-games", subcategory: "building", inStock: true,
    imageQuery: "lego,bricks,toys", imageSeed: 121,
    description: "484 colorful bricks, special pieces, and storage box. Ages 4+.",
    highlights: ["484 pieces", "Includes storage box", "Ages 4+"],
    specs: [{ label: "Pieces", value: "484" }, { label: "Age", value: "4+" }] },
  { id: "g002", slug: "hasbro-monopoly-classic", name: "Monopoly Classic Board Game", brand: "Hasbro", price: 19.99, category: "toys-games", subcategory: "board-games", inStock: true,
    imageQuery: "board,game,monopoly", imageSeed: 122,
    description: "The fast-dealing property trading game. 2-6 players, ages 8+.",
    highlights: ["8 classic tokens", "Updated artwork", "Ages 8+"],
    specs: [{ label: "Players", value: "2-6" }, { label: "Age", value: "8+" }] },
  { id: "g003", slug: "crayola-crayons-120ct", name: "Crayola Crayons (120 colors)", brand: "Crayola", price: 12.97, category: "toys-games", subcategory: "outdoor-play", inStock: true,
    imageQuery: "crayons,colors,art", imageSeed: 123,
    description: "The classic. 120 vivid colors including specialty colors and a built-in sharpener.",
    highlights: ["120 colors", "Built-in sharpener", "Non-toxic"],
    specs: [{ label: "Colors", value: "120" }] },
];

export const PRODUCTS: Product[] = SEEDS.map((s) => ({
  ...s,
  sku: sku(s.id),
  contribution: s.contribution ?? c(s.price),
}));

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);
export const getProductsByCategory = (slug: string) =>
  PRODUCTS.filter((p) => p.category === slug);

export const FEATURED_PRODUCTS = [
  "apple-airpods-pro-2",
  "tide-pods-original-81ct",
  "ninja-foodi-9in1-deluxe-xl",
  "purina-pro-plan-adult-chicken-34lb",
  "gatorade-thirst-quencher-variety-24pk",
  "nike-dri-fit-training-tee",
]
  .map((s) => PRODUCTS.find((p) => p.slug === s))
  .filter((p): p is Product => Boolean(p));
