export type CategorySlug =
  | "electronics"
  | "home-living"
  | "kitchen-dining"
  | "beauty-personal-care"
  | "pet-supplies"
  | "fitness-outdoor"
  | "auto-accessories"
  | "tools-home-improvement"
  | "office-school"
  | "baby-kids"
  | "apparel"
  | "toys-games";

export type Subcategory = { slug: string; name: string };

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  blurb: string;
  subcategories: Subcategory[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "electronics",
    name: "Electronics",
    short: "Tech",
    blurb: "Headphones, tablets, TVs, smart speakers, accessories from Apple, Sony, Samsung, Bose.",
    subcategories: [
      { slug: "audio", name: "Audio" },
      { slug: "computers-tablets", name: "Computers & Tablets" },
      { slug: "tv-home-theater", name: "TV & Home Theater" },
      { slug: "accessories", name: "Accessories" },
    ],
  },
  {
    slug: "home-living",
    name: "Home & Living",
    short: "Home",
    blurb: "Cleaning, laundry, paper goods, bedding, storage. Tide, Bounty, Clorox, Dawn.",
    subcategories: [
      { slug: "cleaning", name: "Cleaning" },
      { slug: "laundry", name: "Laundry" },
      { slug: "paper-goods", name: "Paper Goods" },
      { slug: "bedding-bath", name: "Bedding & Bath" },
    ],
  },
  {
    slug: "kitchen-dining",
    name: "Kitchen & Dining",
    short: "Kitchen",
    blurb: "Small appliances, cookware, cutlery, drinkware. Ninja, KitchenAid, OXO, Hydro Flask.",
    subcategories: [
      { slug: "small-appliances", name: "Small Appliances" },
      { slug: "cookware", name: "Cookware" },
      { slug: "drinkware", name: "Drinkware" },
      { slug: "gadgets", name: "Gadgets" },
    ],
  },
  {
    slug: "beauty-personal-care",
    name: "Beauty & Personal Care",
    short: "Care",
    blurb: "Skin, hair, oral care, deodorant, shaving. Dove, Crest, Olay, Native, Gillette.",
    subcategories: [
      { slug: "skin-care", name: "Skin Care" },
      { slug: "hair-care", name: "Hair Care" },
      { slug: "oral-care", name: "Oral Care" },
      { slug: "shaving-deodorant", name: "Shaving & Deodorant" },
    ],
  },
  {
    slug: "pet-supplies",
    name: "Pet Supplies",
    short: "Pet",
    blurb: "Food, treats, toys, care from Purina, Blue Buffalo, Greenies, Tidy Cats, Kong.",
    subcategories: [
      { slug: "dog-food", name: "Dog Food" },
      { slug: "cat-food", name: "Cat Food" },
      { slug: "treats-toys", name: "Treats & Toys" },
    ],
  },
  {
    slug: "fitness-outdoor",
    name: "Fitness & Outdoor",
    short: "Fitness",
    blurb: "Hydration, recovery, apparel, camping, training. Gatorade, Optimum, Yeti, Coleman.",
    subcategories: [
      { slug: "hydration-nutrition", name: "Hydration & Nutrition" },
      { slug: "training", name: "Training Gear" },
      { slug: "outdoor", name: "Camping & Outdoor" },
    ],
  },
  {
    slug: "auto-accessories",
    name: "Auto Accessories",
    short: "Auto",
    blurb: "Motor oil, wipers, car care, chargers, mats. Castrol, Mobil 1, Armor All, Rain-X.",
    subcategories: [
      { slug: "oil-fluids", name: "Oil & Fluids" },
      { slug: "car-care", name: "Car Care" },
      { slug: "interior", name: "Interior" },
    ],
  },
  {
    slug: "tools-home-improvement",
    name: "Tools & Home Improvement",
    short: "Tools",
    blurb: "Power tools, hand tools, hardware, paint. DeWalt, Milwaukee, Stanley, 3M.",
    subcategories: [
      { slug: "power-tools", name: "Power Tools" },
      { slug: "hand-tools", name: "Hand Tools" },
      { slug: "hardware", name: "Hardware" },
    ],
  },
  {
    slug: "office-school",
    name: "Office & School",
    short: "Office",
    blurb: "Pens, paper, planners, printer ink, backpacks. Bic, Post-it, Moleskine, JanSport.",
    subcategories: [
      { slug: "writing", name: "Writing" },
      { slug: "paper-planners", name: "Paper & Planners" },
      { slug: "backpacks", name: "Backpacks" },
    ],
  },
  {
    slug: "baby-kids",
    name: "Baby & Kids",
    short: "Baby",
    blurb: "Diapers, wipes, formula, bottles. Pampers, Huggies, Similac, Dr. Brown's.",
    subcategories: [
      { slug: "diapers-wipes", name: "Diapers & Wipes" },
      { slug: "feeding", name: "Feeding" },
      { slug: "gear", name: "Gear" },
    ],
  },
  {
    slug: "apparel",
    name: "Apparel",
    short: "Apparel",
    blurb: "Tees, socks, basics, performance from Nike, Hanes, Under Armour, Bombas.",
    subcategories: [
      { slug: "tops", name: "Tops" },
      { slug: "socks", name: "Socks" },
      { slug: "basics", name: "Basics" },
    ],
  },
  {
    slug: "toys-games",
    name: "Toys & Games",
    short: "Toys",
    blurb: "Building sets, board games, plush, outdoor play. LEGO, Hasbro, Mattel, Crayola.",
    subcategories: [
      { slug: "building", name: "Building Sets" },
      { slug: "board-games", name: "Board Games" },
      { slug: "outdoor-play", name: "Outdoor Play" },
    ],
  },
];

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
