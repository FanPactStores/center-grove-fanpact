export type CategorySlug =
  | "baseball-softball"
  | "basketball"
  | "household"
  | "nutrition"
  | "pet"
  | "personal-care"
  | "apparel";

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
    slug: "baseball-softball",
    name: "Baseball & Softball",
    short: "Diamond",
    blurb: "Bats, gloves, balls, training gear from Rawlings, Easton, Wilson, Mizuno.",
    subcategories: [
      { slug: "bats", name: "Bats" },
      { slug: "gloves", name: "Gloves" },
      { slug: "batting-gloves", name: "Batting Gloves" },
      { slug: "training", name: "Training" },
    ],
  },
  {
    slug: "basketball",
    name: "Basketball Equipment",
    short: "Hardwood",
    blurb: "Game balls, shoes, training gear, hoops from Spalding, Wilson, Under Armour.",
    subcategories: [
      { slug: "game-balls", name: "Game Balls" },
      { slug: "shoes", name: "Shoes" },
      { slug: "hoops", name: "Hoops" },
      { slug: "training", name: "Training" },
    ],
  },
  {
    slug: "household",
    name: "Household Essentials",
    short: "Home",
    blurb: "Laundry, cleaning, paper goods you buy every month. Tide, Bounty, Clorox, Dawn.",
    subcategories: [
      { slug: "laundry", name: "Laundry" },
      { slug: "paper-goods", name: "Paper Goods" },
      { slug: "cleaning", name: "Cleaning" },
      { slug: "dish", name: "Dish Care" },
    ],
  },
  {
    slug: "nutrition",
    name: "Nutrition & Supplements",
    short: "Fuel",
    blurb: "Hydration, protein, recovery from Gatorade, Optimum, Quest, Liquid I.V.",
    subcategories: [
      { slug: "hydration", name: "Hydration" },
      { slug: "protein", name: "Protein" },
      { slug: "snacks", name: "Snacks & Bars" },
    ],
  },
  {
    slug: "pet",
    name: "Pet Supplies",
    short: "Pet",
    blurb: "Food, treats, care from Purina, Blue Buffalo, Greenies, Tidy Cats.",
    subcategories: [
      { slug: "dog-food", name: "Dog Food" },
      { slug: "treats", name: "Treats" },
      { slug: "cat-care", name: "Cat Care" },
    ],
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    short: "Care",
    blurb: "Bath, body, oral care, deodorant. Dove, Crest, Old Spice, Native.",
    subcategories: [
      { slug: "body", name: "Body Care" },
      { slug: "oral", name: "Oral Care" },
      { slug: "deodorant", name: "Deodorant" },
    ],
  },
  {
    slug: "apparel",
    name: "Apparel & Gear",
    short: "Gear",
    blurb: "Performance apparel, socks, accessories from Nike, Under Armour, Hanes.",
    subcategories: [
      { slug: "tops", name: "Tops" },
      { slug: "socks", name: "Socks" },
      { slug: "basics", name: "Basics" },
    ],
  },
];

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
