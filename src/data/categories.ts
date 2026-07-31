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
  | "toys-hobby"
  | "bags-accessories"
  | "food-beverage"
  | "footwear"
  | "health-wellness"
  | "media-books-music";

export type Subcategory = { slug: string; name: string };

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  blurb: string;
  /** Category artwork, matching the live fanpact.net storefront. */
  image: string;
  subcategories: Subcategory[];
};

const S3 = "https://fanpact-bucket.s3.us-east-1.amazonaws.com/categories";

export const CATEGORIES: Category[] = [
  {
    slug: "electronics",
    name: "Electronics",
    short: "Tech",
    blurb: "Headphones, tablets, TVs, smart speakers, accessories from Apple, Sony, Samsung, Bose.",
    image: `${S3}/category_1.jpg`,
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
    image: `${S3}/category_2.jpg`,
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
    image: `${S3}/category_3.jpg`,
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
    image: `${S3}/category_4.jpg`,
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
    image: `${S3}/category_5.jpg`,
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
    image: `${S3}/category_6.jpg`,
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
    image: `${S3}/category_7.jpg`,
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
    image: `${S3}/category_8.jpg`,
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
    image: `${S3}/category_9.jpg`,
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
    image: `${S3}/category_10.jpg`,
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
    image: `${S3}/category_11.jpg`,
    subcategories: [
      { slug: "tops", name: "Tops" },
      { slug: "socks", name: "Socks" },
      { slug: "basics", name: "Basics" },
    ],
  },
  {
    slug: "toys-hobby",
    name: "Toys & Hobby",
    short: "Toys",
    blurb: "Building sets, board games, plush, outdoor play. LEGO, Hasbro, Mattel, Crayola.",
    image: `${S3}/category_12.jpg`,
    subcategories: [
      { slug: "building", name: "Building Sets" },
      { slug: "board-games", name: "Board Games" },
      { slug: "outdoor-play", name: "Outdoor Play" },
    ],
  },
  {
    slug: "bags-accessories",
    name: "Bags & Accessories",
    short: "Bags",
    blurb: "Backpacks, totes, luggage, wallets and everyday carry.",
    image: `${S3}/category_97.jpg`,
    subcategories: [
      { slug: "backpacks-bags", name: "Backpacks & Bags" },
      { slug: "luggage", name: "Luggage" },
      { slug: "wallets", name: "Wallets" },
    ],
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    short: "Food",
    blurb: "Pantry staples, snacks, coffee, and everyday groceries.",
    image: `${S3}/category_102.jpg`,
    subcategories: [
      { slug: "pantry", name: "Pantry" },
      { slug: "snacks", name: "Snacks" },
      { slug: "coffee-tea", name: "Coffee & Tea" },
    ],
  },
  {
    slug: "footwear",
    name: "Footwear",
    short: "Shoes",
    blurb: "Running shoes, trainers, boots, sandals and slides.",
    image: `${S3}/category_107.png`,
    subcategories: [
      { slug: "athletic", name: "Athletic" },
      { slug: "casual", name: "Casual" },
      { slug: "boots", name: "Boots" },
    ],
  },
  {
    slug: "health-wellness",
    name: "Health & Wellness",
    short: "Health",
    blurb: "Vitamins, supplements, first aid, recovery and sleep.",
    image: `${S3}/category_112.jpg`,
    subcategories: [
      { slug: "vitamins", name: "Vitamins & Supplements" },
      { slug: "first-aid", name: "First Aid" },
      { slug: "recovery", name: "Recovery" },
    ],
  },
  {
    slug: "media-books-music",
    name: "Media, Books & Music",
    short: "Media",
    blurb: "Books, vinyl, instruments and everyday entertainment.",
    image: `${S3}/category_114.jpg`,
    subcategories: [
      { slug: "books", name: "Books" },
      { slug: "music", name: "Music" },
      { slug: "instruments", name: "Instruments" },
    ],
  },
];

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
