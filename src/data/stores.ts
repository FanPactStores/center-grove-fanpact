export type StoreId = "butler" | "center-grove" | "legacy" | "assa" | "cmn-st-johns";
export type StoreBasePath = "/butler" | "/center-grove" | "/legacy" | "/assa" | "/cmn/st-johns";

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
  marks: { letter: string; word: string; subtitle?: string };
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
    name: "Legacy Performance Academy",
    shortName: "Legacy",
    fundName: "Legacy Performance Academy Fund",
    fundDisplay: "Legacy Performance Academy athletes",
    tagline: "Shop the brands you already buy. Fuel the diamond.",
    heroEyebrow: "Legacy Performance Academy × FanPact",
    heroHeadline: "From 8U to D1. One ledger.",
    heroBody:
      "Klutch youth squads, the 14U bridge roster, and the Legacy showcase teams — every age group, every coach. 60% of net earnings on every purchase flows to the team or athlete you designate.",
    marks: { letter: "L", word: "LEGACY" },
  },
  assa: {
    id: "assa",
    basePath: "/assa",
    name: "All-Star Sports Academy",
    shortName: "ASSA",
    fundName: "All-Star Sports Academy Community Fund",
    fundDisplay: "ASSA Combat Families",
    tagline: "Shop the brands you already buy. Fuel Combat baseball and softball.",
    heroEyebrow: "ASSA Combat × FanPact",
    heroHeadline: "Every hub. Every roster. One ledger.",
    heroBody:
      "From West Chester to Cherry Hill, Downingtown to Warminster, and every Combat Futures showcase team — pick your hub, your roster, or your athlete. 60% of net earnings on every purchase flows to your designation.",
    marks: { letter: "A", word: "ASSA", subtitle: "All-Star Sports Academy" },
  },,
  "cmn-st-johns": {
    id: "cmn-st-johns",
    basePath: "/cmn/st-johns",
    name: "HSHS St. John's Children's Hospital",
    shortName: "St. John's Children's",
    fundName: "HSHS St. John's Children's Hospital Greatest Needs Fund",
    fundDisplay: "HSHS St. John's Children's Hospital",
    tagline: "Shop the brands you already buy. Fund pediatric care in Illinois.",
    heroEyebrow: "Children's Miracle Network Hospitals \u00d7 FanPact",
    heroHeadline: "Shop & Support HSHS St. John's Children's Hospital",
    heroBody:
      "Every purchase helps fund life-saving pediatric care in Springfield, Illinois, and across central and southern Illinois.",
    marks: { letter: "SJ", word: "ST. JOHN'S CHILDREN'S", subtitle: "Springfield, Illinois" },
  },
};
