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
};

export const SPONSORS: Sponsor[] = [
  {
    slug: "usarec",
    name: "U.S. Army Recruiting",
    tagline: "Future Soldier Family Fund",
    description:
      "USAREC funds a prepaid community account for families who attend an information session and complete eligibility prescreening. No commitment required.",
    fundTotal: 250000,
    fundReleased: 168400,
    perFamily: 250,
    actions: [
      { title: "Attend a 30-minute virtual info session", reward: 100, status: "open" },
      { title: "Complete the eligibility prescreening form", reward: 100, status: "open" },
      { title: "Meet 1:1 with a local recruiter", reward: 50, status: "open" },
    ],
    color: "oklch(0.32 0.06 145)",
  },
  {
    slug: "merrill-lynch",
    name: "Merrill Lynch",
    tagline: "Family Financial Readiness Credit",
    description:
      "Merrill funds prepaid credits for families who complete a no-pressure financial readiness review with a local advisor.",
    fundTotal: 180000,
    fundReleased: 92500,
    perFamily: 200,
    actions: [
      { title: "Book a 45-minute readiness review", reward: 150, status: "open" },
      { title: "Open a 529 college savings account", reward: 50, status: "open" },
    ],
    color: "oklch(0.32 0.08 250)",
  },
  {
    slug: "state-farm",
    name: "State Farm",
    tagline: "Good Neighbor Community Credit",
    description:
      "State Farm funds prepaid credits when families request a no-obligation home + auto bundle quote.",
    fundTotal: 200000,
    fundReleased: 114800,
    perFamily: 150,
    actions: [
      { title: "Request a home + auto bundle quote", reward: 100, status: "open" },
      { title: "Switch and bind a new policy", reward: 50, status: "open" },
    ],
    color: "oklch(0.48 0.18 25)",
  },
];

export const getSponsor = (slug: string) => SPONSORS.find((s) => s.slug === slug);
