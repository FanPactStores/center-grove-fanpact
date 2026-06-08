export type ButlerPlayer = {
  slug: string;
  name: string;
  number: number;
  position: string;
  sport: string;
  sportSlug: "mens-basketball" | "football";
  year: "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate";
  hometown: string;
  swatch: string;
};

export type ButlerTeam = {
  slug: "mens-basketball" | "football";
  name: string;
  shortName: string;
  blurb: string;
  players: ButlerPlayer[];
};

const swatch = (h: number) => `oklch(0.32 0.07 ${h})`;

const basketball: ButlerPlayer[] = [
  { slug: "carter-reeves", name: "Carter Reeves", number: 1, position: "Point Guard", year: "Senior", hometown: "Indianapolis, IN" },
  { slug: "tre-hollman", name: "Tre Hollman", number: 3, position: "Shooting Guard", year: "Junior", hometown: "Chicago, IL" },
  { slug: "jaylen-meeks", name: "Jaylen Meeks", number: 5, position: "Small Forward", year: "Sophomore", hometown: "Carmel, IN" },
  { slug: "miles-anderson", name: "Miles Anderson", number: 10, position: "Power Forward", year: "Senior", hometown: "Louisville, KY" },
  { slug: "drew-pellum", name: "Drew Pellum", number: 11, position: "Center", year: "Graduate", hometown: "Cincinnati, OH" },
  { slug: "kobe-vanderwerff", name: "Kobe Vanderwerff", number: 14, position: "Forward", year: "Freshman", hometown: "Holland, MI" },
  { slug: "isaiah-mercer", name: "Isaiah Mercer", number: 20, position: "Guard", year: "Junior", hometown: "Detroit, MI" },
  { slug: "marquise-thornton", name: "Marquise Thornton", number: 22, position: "Guard", year: "Sophomore", hometown: "Gary, IN" },
  { slug: "benji-okafor", name: "Benji Okafor", number: 23, position: "Forward", year: "Freshman", hometown: "Columbus, OH" },
  { slug: "owen-bracken", name: "Owen Bracken", number: 31, position: "Forward", year: "Junior", hometown: "Fishers, IN" },
  { slug: "augustus-vale", name: "Augustus Vale", number: 33, position: "Center", year: "Sophomore", hometown: "St. Louis, MO" },
  { slug: "noah-petersson", name: "Noah Petersson", number: 44, position: "Center", year: "Senior", hometown: "Stockholm, SE" },
].map((p, i) => ({ ...p, sport: "Men's Basketball", sportSlug: "mens-basketball" as const, swatch: swatch(245 + i * 6) }));

const footballRaw = [
  { num: 1, pos: "Wide Receiver" }, { num: 2, pos: "Cornerback" }, { num: 4, pos: "Quarterback" },
  { num: 6, pos: "Wide Receiver" }, { num: 7, pos: "Safety" }, { num: 8, pos: "Quarterback" },
  { num: 9, pos: "Wide Receiver" }, { num: 11, pos: "Tight End" }, { num: 14, pos: "Quarterback" },
  { num: 18, pos: "Wide Receiver" }, { num: 21, pos: "Running Back" }, { num: 22, pos: "Running Back" },
  { num: 24, pos: "Cornerback" }, { num: 25, pos: "Safety" }, { num: 28, pos: "Running Back" },
  { num: 32, pos: "Linebacker" }, { num: 42, pos: "Linebacker" }, { num: 45, pos: "Linebacker" },
  { num: 81, pos: "Wide Receiver" }, { num: 84, pos: "Tight End" }, { num: 87, pos: "Tight End" },
  { num: 88, pos: "Wide Receiver" },
];
const footballNames = [
  "Jackson Whitlow", "Devin Brooks", "Caleb Reinhart", "Eli Marquez", "Tristan Walsh",
  "Owen Kirkpatrick", "Brennan Yates", "Hudson Vega", "Cole Brennan", "Mason Pritchett",
  "Trey Donnelly", "Asher McKenzie", "Quentin Pryor", "Roman Castile", "Jameson Holt",
  "Bryce Tomlinson", "Wyatt Calloway", "Sebastian Roush", "Levi Hatcher", "Dax Wheatley",
  "Reid Sandoval", "Tate Burroughs",
];
const footballYears = ["Freshman","Sophomore","Junior","Senior","Graduate"] as const;
const footballTowns = [
  "Cincinnati, OH","Indianapolis, IN","Naperville, IL","Carmel, IN","Akron, OH",
  "Louisville, KY","Lexington, KY","Pittsburgh, PA","St. Charles, MO","Madison, WI",
  "Toledo, OH","Bloomington, IN","Evansville, IN","Fort Wayne, IN","Dayton, OH",
  "Grand Rapids, MI","Springfield, IL","Peoria, IL","Cleveland, OH","Knoxville, TN",
  "Nashville, TN","Detroit, MI",
];

const football: ButlerPlayer[] = footballRaw.map((p, i) => ({
  slug: footballNames[i].toLowerCase().replace(/[^a-z]+/g, "-"),
  name: footballNames[i],
  number: p.num,
  position: p.pos,
  sport: "Football",
  sportSlug: "football" as const,
  year: footballYears[i % footballYears.length],
  hometown: footballTowns[i],
  swatch: swatch(20 + i * 4),
}));

export const BUTLER_TEAMS: ButlerTeam[] = [
  {
    slug: "mens-basketball",
    name: "Men's Basketball",
    shortName: "Hoops",
    blurb: "Big East. Hinkle Fieldhouse. Twelve Bulldogs chasing March.",
    players: basketball,
  },
  {
    slug: "football",
    name: "Football",
    shortName: "Football",
    blurb: "Pioneer Football League. Skill positions designate community contributions.",
    players: football,
  },
];

export const getButlerTeam = (slug: string) =>
  BUTLER_TEAMS.find((t) => t.slug === slug);

export const getButlerPlayer = (sport: string, player: string) =>
  getButlerTeam(sport)?.players.find((p) => p.slug === player);
