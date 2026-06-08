export type StoreConfig = {
  id: "butler" | "center-grove";
  basePath: "/butler" | "/center-grove";
  name: string;
  shortName: string;
  fundName: string;
  fundDisplay: string;
  tagline: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroBody: string;
  marks: { letter: string; word: string };
};

export const STORES: Record<"butler" | "center-grove", StoreConfig> = {
  butler: {
    id: "butler",
    basePath: "/butler",
    name: "Butler University",
    shortName: "Butler",
    fundName: "Butler Athletics Community Fund",
    fundDisplay: "Butler Athletics",
    tagline: "Shop the brands you already buy. Fund the Bulldogs you already love.",
    heroEyebrow: "Butler Bulldogs × FanPact",
    heroHeadline: "Every household run. Every Butler win.",
    heroBody:
      "Redirect the spend you already make on Tide, Gatorade, Purina, Rawlings, and Nike — and 60% of net earnings flow back to Butler Athletics and the player you designate.",
    marks: { letter: "B", word: "BUTLER" },
  },
  "center-grove": {
    id: "center-grove",
    basePath: "/center-grove",
    name: "Center Grove Community Alliance",
    shortName: "Center Grove",
    fundName: "Center Grove Community Alliance Fund",
    fundDisplay: "Center Grove Alliance",
    tagline: "Shop for the brands you already buy. Fuel our athletes and our community.",
    heroEyebrow: "Center Grove Trojans × FanPact",
    heroHeadline: "Our families. Our fund. Our future.",
    heroBody:
      "60% of net earnings on every purchase flows to the Center Grove Community Alliance Fund — or to the team or athlete you designate. No extra cost. No fundraising ask.",
    marks: { letter: "CG", word: "CENTER GROVE" },
  },
};
