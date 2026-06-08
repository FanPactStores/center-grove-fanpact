export type SchoolRef = {
  name: string;
  slug: string;
  href?: string; // if set, live link; otherwise "coming soon"
};

export type Conference = {
  id: string;
  name: string;
  schools: SchoolRef[];
};

export const CONFERENCES: Conference[] = [
  {
    id: "big-east",
    name: "Big East",
    schools: [
      { name: "Butler", slug: "butler", href: "/butler" },
      { name: "Connecticut", slug: "connecticut" },
      { name: "Villanova", slug: "villanova" },
      { name: "Creighton", slug: "creighton" },
      { name: "Georgetown", slug: "georgetown" },
      { name: "Marquette", slug: "marquette" },
      { name: "Providence", slug: "providence" },
      { name: "Seton Hall", slug: "seton-hall" },
      { name: "St. John's", slug: "st-johns" },
      { name: "Xavier", slug: "xavier" },
      { name: "DePaul", slug: "depaul" },
    ],
  },
  {
    id: "sec",
    name: "SEC",
    schools: [
      "Alabama","Auburn","Arkansas","Florida","Georgia","Kentucky","LSU","Mississippi",
      "Mississippi State","Missouri","Oklahoma","South Carolina","Tennessee","Texas",
      "Texas A&M","Vanderbilt",
    ].map((n) => ({ name: n, slug: n.toLowerCase().replace(/[^a-z]+/g, "-") })),
  },
  {
    id: "big-ten",
    name: "Big Ten",
    schools: [
      "Ohio State","Michigan","Penn State","Indiana","Wisconsin","Iowa","Minnesota",
      "Nebraska","Northwestern","Purdue","Illinois","Maryland","Rutgers","Michigan State",
      "USC","UCLA","Oregon","Washington",
    ].map((n) => ({ name: n, slug: n.toLowerCase().replace(/[^a-z]+/g, "-") })),
  },
  {
    id: "big-12",
    name: "Big 12",
    schools: [
      "Kansas","Kansas State","Baylor","TCU","Texas Tech","Oklahoma State","Iowa State",
      "West Virginia","BYU","UCF","Cincinnati","Houston","Arizona","Arizona State",
      "Colorado","Utah",
    ].map((n) => ({ name: n, slug: n.toLowerCase().replace(/[^a-z]+/g, "-") })),
  },
  {
    id: "acc",
    name: "ACC",
    schools: [
      "Clemson","Notre Dame","Florida State","Miami","NC State","North Carolina","Duke",
      "Virginia","Virginia Tech","Pittsburgh","Louisville","Syracuse","Boston College",
      "Wake Forest","Georgia Tech","Stanford","California","SMU",
    ].map((n) => ({ name: n, slug: n.toLowerCase().replace(/[^a-z]+/g, "-") })),
  },
];

export type YouthLeague = {
  id: string;
  name: string;
  region: string;
  alliances: SchoolRef[];
};

export const YOUTH_LEAGUES: YouthLeague[] = [
  {
    id: "indiana-community",
    name: "Indiana Community Alliances",
    region: "Indiana",
    alliances: [
      { name: "Center Grove Community Alliance", slug: "center-grove", href: "/center-grove" },
      { name: "Carmel Youth Sports", slug: "carmel" },
      { name: "Fishers Athletic Alliance", slug: "fishers" },
      { name: "Zionsville Community Sports", slug: "zionsville" },
      { name: "Westfield Youth Alliance", slug: "westfield" },
      { name: "Brownsburg Community Sports", slug: "brownsburg" },
      { name: "Avon Athletic Alliance", slug: "avon" },
      { name: "Plainfield Youth Sports", slug: "plainfield" },
    ],
  },
  {
    id: "midwest-youth",
    name: "Midwest Youth Leagues",
    region: "Midwest",
    alliances: [
      "Naperville Community","Oak Park Athletic","Bloomington Youth","Ann Arbor Alliance",
      "Columbus Youth Sports","Cincinnati Community","Louisville Youth Alliance",
      "Nashville Community Sports",
    ].map((n) => ({ name: n, slug: n.toLowerCase().replace(/[^a-z]+/g, "-") })),
  },
  {
    id: "southeast-youth",
    name: "Southeast Youth Leagues",
    region: "Southeast",
    alliances: [
      "Buckhead Athletic","Charlotte Community","Tampa Youth Alliance","Birmingham Youth",
      "Knoxville Community","Greenville Athletic","Raleigh Youth Sports",
      "Jacksonville Alliance",
    ].map((n) => ({ name: n, slug: n.toLowerCase().replace(/[^a-z]+/g, "-") })),
  },
];
