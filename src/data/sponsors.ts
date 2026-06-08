export type Sponsor = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fundTotal: number;
  fundReleased: number;
  perFamily: number;
  actions: { title: string; reward: number; status: "open" | "closed" }[];
  color: string;
  /** If set, this sponsor only appears on these store slugs. Omit = visible on every store. */
  stores?: string[];
};

export const SPONSORS: Sponsor[] = [
  {
    slug: "usarec",
    name: "U.S. Army Recruiting",
    tagline: "Future Soldier Family Fund",
    description:
      "USAREC funds a prepaid community account for families who complete an Army career interest form and attend an info session. No commitment required.",
    fundTotal: 250000,
    fundReleased: 168400,
    perFamily: 250,
    actions: [
      { title: "Complete the Army career interest form", reward: 150, status: "open" },
      { title: "Attend a 30-minute virtual info session", reward: 50, status: "open" },
      { title: "Meet 1:1 with a local recruiter", reward: 50, status: "open" },
    ],
    color: "oklch(0.32 0.06 145)",
  },
  {
    slug: "merrill-lynch",
    name: "Merrill Lynch",
    tagline: "Family Financial Readiness Credit",
    description:
      "Merrill funds prepaid credits for families who submit a 529 college-savings account inquiry with a local advisor.",
    fundTotal: 180000,
    fundReleased: 92500,
    perFamily: 200,
    actions: [
      { title: "Submit a 529 college savings account inquiry", reward: 150, status: "open" },
      { title: "Book a 45-minute readiness review", reward: 50, status: "open" },
    ],
    color: "oklch(0.32 0.08 250)",
  },
  {
    slug: "state-farm",
    name: "State Farm",
    tagline: "Good Neighbor Community Credit",
    description:
      "State Farm funds prepaid credits when families request a no-obligation insurance quote on home + auto.",
    fundTotal: 200000,
    fundReleased: 114800,
    perFamily: 150,
    actions: [
      { title: "Request a home + auto insurance quote", reward: 100, status: "open" },
      { title: "Switch and bind a new policy", reward: 50, status: "open" },
    ],
    color: "oklch(0.48 0.18 25)",
  },
  {
    slug: "rawlings",
    name: "Rawlings",
    tagline: "Spring Equipment Season",
    description:
      "Spring equipment season: buy the gear your player needs, earn $75 back for the Legacy community fund. Verified on any qualifying Rawlings purchase.",
    fundTotal: 15000,
    fundReleased: 4200,
    perFamily: 75,
    actions: [
      { title: "Upload your Rawlings receipt for verification", reward: 75, status: "open" },
    ],
    color: "oklch(0.45 0.18 25)",
    stores: ["legacy"],
  },
  {
    slug: "easton",
    name: "Easton",
    tagline: "Combat Equipment Fund",
    description:
      "ASSA Combat families: buy Easton gear, earn $75 back for your hub fund. Credit verified on any qualifying Easton equipment purchase.",
    fundTotal: 20000,
    fundReleased: 6100,
    perFamily: 75,
    actions: [
      { title: "Upload your Easton receipt for verification", reward: 75, status: "open" },
    ],
    color: "oklch(0.35 0.12 250)",
    stores: ["assa"],
  },
];

export const getSponsor = (slug: string) => SPONSORS.find((s) => s.slug === slug);

/** Sponsors visible on a given store: all global sponsors + any scoped to that store. */
export const sponsorsForStore = (store: string) =>
  SPONSORS.filter((s) => !s.stores || s.stores.includes(store));
