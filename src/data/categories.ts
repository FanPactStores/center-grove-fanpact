export type CategorySlug =
  | "baseball-softball"
  | "basketball"
  | "household"
  | "nutrition"
  | "pet"
  | "personal-care"
  | "apparel";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  { slug: "baseball-softball", name: "Baseball & Softball", short: "Diamond",
    blurb: "Bats, gloves, balls, training gear from Rawlings, Easton, Wilson, Mizuno." },
  { slug: "basketball", name: "Basketball Equipment", short: "Hardwood",
    blurb: "Game balls, shoes, training gear, hoops from Spalding, Wilson, Under Armour." },
  { slug: "household", name: "Household Essentials", short: "Home",
    blurb: "Laundry, cleaning, paper goods you buy every month. Tide, Bounty, Clorox, Dawn." },
  { slug: "nutrition", name: "Nutrition & Supplements", short: "Fuel",
    blurb: "Hydration, protein, recovery from Gatorade, Optimum, Quest, Liquid I.V." },
  { slug: "pet", name: "Pet Supplies", short: "Pet",
    blurb: "Food, treats, care from Purina, Blue Buffalo, Greenies, Tidy Cats." },
  { slug: "personal-care", name: "Personal Care", short: "Care",
    blurb: "Bath, body, oral care, deodorant. Dove, Crest, Old Spice, Native." },
  { slug: "apparel", name: "Apparel & Gear", short: "Gear",
    blurb: "Performance apparel, socks, accessories from Nike, Under Armour, Hanes." },
];

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
