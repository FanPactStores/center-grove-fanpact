export type StoreId = "butler" | "center-grove" | "legacy";
export type StoreBasePath = "/butler" | "/center-grove" | "/legacy";

export type StoreConfig = {
  id: StoreId;
  basePath: StoreBasePath;
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

export const STORES: Record<StoreId, StoreConfig> = {
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
  legacy: {
    id: "legacy",
    basePath: "/legacy",
    name: "STL Legacy / Klutch Baseball",
    shortName: "STL Legacy",
    fundName: "Legacy Performance Academy Fund",
    fundDisplay: "STL Legacy Baseball",
    tagline: "Shop the brands you already buy. Fuel the diamond.",
    heroEyebrow: "Legacy Performance Academy × FanPact",
    heroHeadline: "From 8U to D1. One ledger.",
    heroBody:
      "Klutch youth squads, the 14U bridge roster, and the STL Legacy showcase teams — every age group, every coach. 60% of net earnings on every purchase flows to the team or athlete you designate.",
    marks: { letter: "L", word: "STL LEGACY" },
  },
};
