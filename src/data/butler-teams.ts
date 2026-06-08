export type ButlerPlayer = {
  slug: string;
  name: string;
  number: number;
  position: string;
  sport: string;
  sportSlug: string;
  year?: string;
  hometown?: string;
  swatch: string;
};

export type ButlerTeam = {
  slug: string;
  name: string;
  shortName: string;
  blurb: string;
  players: ButlerPlayer[];
};

const swatch = (h: number) => `oklch(0.32 0.07 ${h})`;

type Raw = { id: string; name: string; number: string; position: string };

const build = (sport: string, sportSlug: string, raw: Raw[], hueStart: number): ButlerPlayer[] =>
  raw.map((p, i) => ({
    slug: p.id,
    name: p.name,
    number: parseInt(p.number, 10) || 0,
    position: p.position,
    sport,
    sportSlug,
    swatch: swatch(hueStart + i * 7),
  }));

// Football (butlersports.com)
const footballRaw: Raw[] = [
  { id: "peyton-daniels", name: "Peyton Daniels", number: "0", position: "DB" },
  { id: "mason-armstrong", name: "Mason Armstrong", number: "2", position: "LB" },
  { id: "tanner-huckfelt", name: "Tanner Huckfelt", number: "2", position: "QB" },
  { id: "andrew-lieske", name: "Andrew Lieske", number: "4", position: "DB" },
  { id: "dt-williams", name: "DT Williams", number: "4", position: "WR" },
  { id: "reagan-andrew", name: "Reagan Andrew", number: "7", position: "QB" },
  { id: "drew-vanvleet", name: "Drew VanVleet", number: "10", position: "QB" },
  { id: "mason-tooley", name: "Mason Tooley", number: "11", position: "WR" },
  { id: "jude-lupina", name: "Jude Lupina", number: "12", position: "LB" },
  { id: "luke-mailander", name: "Luke Mailander", number: "13", position: "WR" },
  { id: "drew-tuazon", name: "Drew Tuazon", number: "14", position: "DB" },
  { id: "jaylin-johnson", name: "Jaylin Johnson", number: "15", position: "WR" },
];

const mensBasketballRaw: Raw[] = [
  { id: "augusto-cassia", name: "Augusto Cassia", number: "0", position: "F" },
  { id: "evan-haywood", name: "Evan Haywood", number: "1", position: "G" },
  { id: "ethan-mccomb", name: "Ethan McComb", number: "3", position: "G" },
  { id: "ryder-cate", name: "Ryder Cate", number: "5", position: "G" },
  { id: "jamie-kaiser-jr", name: "Jamie Kaiser Jr.", number: "7", position: "G/F" },
  { id: "jahmyl-telfort", name: "Jahmyl Telfort", number: "11", position: "F" },
  { id: "kolby-king", name: "Kolby King", number: "12", position: "G" },
  { id: "finley-bizjack", name: "Finley Bizjack", number: "13", position: "G" },
  { id: "landon-moore", name: "Landon Moore", number: "14", position: "G" },
  { id: "pierre-brooks-ii", name: "Pierre Brooks II", number: "21", position: "F" },
  { id: "patrick-mccaffery", name: "Patrick McCaffery", number: "22", position: "F" },
  { id: "andre-screen", name: "Andre Screen", number: "23", position: "C" },
  { id: "boden-kapke", name: "Boden Kapke", number: "33", position: "F/C" },
  { id: "colt-langdon", name: "Colt Langdon", number: "45", position: "F" },
];

const womensBasketballRaw: Raw[] = [
  { id: "karsyn-norman", name: "Karsyn Norman", number: "1", position: "G" },
  { id: "riley-makalusky", name: "Riley Makalusky", number: "2", position: "G/F" },
  { id: "ari-wiggins", name: "Ari Wiggins", number: "3", position: "G" },
  { id: "mckenzie-swanson", name: "McKenzie Swanson", number: "5", position: "F" },
  { id: "lily-zeinstra", name: "Lily Zeinstra", number: "10", position: "G" },
  { id: "kilyn-mcguff", name: "Kilyn McGuff", number: "11", position: "G" },
  { id: "lily-carmody", name: "Lily Carmody", number: "12", position: "G" },
  { id: "jocelyn-land", name: "Jocelyn Land", number: "14", position: "F" },
  { id: "caroline-strande", name: "Caroline Strande", number: "21", position: "G" },
  { id: "jordan-meulemans", name: "Jordan Meulemans", number: "23", position: "G" },
  { id: "cristen-carter", name: "Cristen Carter", number: "24", position: "F" },
];

const baseballRaw: Raw[] = [
  { id: "logan-crock", name: "Logan Crock", number: "1", position: "INF" },
  { id: "david-ayers", name: "David Ayers", number: "2", position: "UTL" },
  { id: "danny-gavin", name: "Danny Gavin", number: "3", position: "OF" },
  { id: "logan-baker", name: "Logan Baker", number: "4", position: "INF" },
  { id: "charlie-schebler", name: "Charlie Schebler", number: "5", position: "INF" },
  { id: "carson-clark", name: "Carson Clark", number: "6", position: "INF" },
  { id: "jack-moroknek", name: "Jack Moroknek", number: "7", position: "OF" },
  { id: "blake-burris", name: "Blake Burris", number: "8", position: "C" },
  { id: "owen-stevenson", name: "Owen Stevenson", number: "9", position: "OF" },
  { id: "carson-meredith", name: "Carson Meredith", number: "10", position: "OF" },
  { id: "evan-stoltz", name: "Evan Stoltz", number: "11", position: "INF" },
  { id: "jack-stoffregen", name: "Jack Stoffregen", number: "12", position: "C" },
];

const softballRaw: Raw[] = [
  { id: "kayla-preiss", name: "Kayla Preiss", number: "1", position: "IF" },
  { id: "erin-clark", name: "Erin Clark", number: "2", position: "OF" },
  { id: "paxton-law", name: "Paxton Law", number: "4", position: "U" },
  { id: "alyx-johnson", name: "Alyx Johnson", number: "8", position: "P/IF" },
  { id: "alona-boydston", name: "Alona Boydston", number: "9", position: "C" },
  { id: "emma-cook", name: "Emma Cook", number: "10", position: "OF" },
  { id: "ella-fitzgerald", name: "Ella Fitzgerald", number: "11", position: "IF" },
  { id: "kate-tillman", name: "Kate Tillman", number: "12", position: "P" },
  { id: "mia-medina", name: "Mia Medina", number: "13", position: "C" },
  { id: "lauren-foster", name: "Lauren Foster", number: "14", position: "OF" },
];

const mensSoccerRaw: Raw[] = [
  { id: "brooks-boersma", name: "Brooks Boersma", number: "1", position: "GK" },
  { id: "oscar-dawber", name: "Oscar Dawber", number: "2", position: "D" },
  { id: "evan-muckridge", name: "Evan Muckridge", number: "3", position: "D" },
  { id: "manolo-ferreres", name: "Manolo Ferreres", number: "4", position: "D" },
  { id: "kiel-higginson", name: "Kiel Higginson", number: "5", position: "D" },
  { id: "jack-howell", name: "Jack Howell", number: "6", position: "M" },
  { id: "henry-fritz", name: "Henry Fritz", number: "7", position: "M" },
  { id: "luca-cunningham", name: "Luca Cunningham", number: "8", position: "M" },
  { id: "patrick-mcdonald", name: "Patrick McDonald", number: "9", position: "F" },
  { id: "samuel-houck", name: "Samuel Houck", number: "10", position: "M" },
];

const womensSoccerRaw: Raw[] = [
  { id: "addison-ash", name: "Addison Ash", number: "0", position: "GK" },
  { id: "ceilidh-whynott", name: "Ceilidh Whynott", number: "2", position: "F" },
  { id: "sydney-longo", name: "Sydney Longo", number: "3", position: "M" },
  { id: "cecelia-simion", name: "Cecelia Simion", number: "4", position: "M" },
  { id: "chloe-brecht", name: "Chloe Brecht", number: "8", position: "F/D" },
  { id: "mia-mclaughlin", name: "Mia McLaughlin", number: "9", position: "F" },
  { id: "ella-king", name: "Ella King", number: "10", position: "M" },
  { id: "olivia-pratapas", name: "Olivia Pratapas", number: "11", position: "F" },
  { id: "lauren-banks", name: "Lauren Banks", number: "12", position: "D" },
  { id: "ava-wood", name: "Ava Wood", number: "13", position: "M" },
];

const volleyballRaw: Raw[] = [
  { id: "sarah-kempf", name: "Sarah Kempf", number: "1", position: "S" },
  { id: "ellie-barker", name: "Ellie Barker", number: "2", position: "OH" },
  { id: "chase-lemming", name: "Chase Lemming", number: "3", position: "OH" },
  { id: "ava-hunter", name: "Ava Hunter", number: "4", position: "S" },
  { id: "jersey-loyer", name: "Jersey Loyer", number: "5", position: "DS" },
  { id: "kate-burke", name: "Kate Burke", number: "6", position: "OH" },
  { id: "elena-scott", name: "Elena Scott", number: "7", position: "MB" },
  { id: "addison-pruitt", name: "Addison Pruitt", number: "8", position: "L" },
  { id: "molly-mclaughlin", name: "Molly McLaughlin", number: "9", position: "OH" },
  { id: "natalia-ferreyra", name: "Natalia Ferreyra", number: "10", position: "MB" },
];

export const BUTLER_TEAMS: ButlerTeam[] = [
  {
    slug: "mens-basketball",
    name: "Men's Basketball",
    shortName: "Hoops",
    blurb: "Big East. Hinkle Fieldhouse. The Bulldogs chasing March.",
    players: build("Men's Basketball", "mens-basketball", mensBasketballRaw, 245),
  },
  {
    slug: "womens-basketball",
    name: "Women's Basketball",
    shortName: "WBB",
    blurb: "Big East. Hinkle Fieldhouse. The Bulldogs on the hardwood.",
    players: build("Women's Basketball", "womens-basketball", womensBasketballRaw, 295),
  },
  {
    slug: "football",
    name: "Football",
    shortName: "Football",
    blurb: "Pioneer Football League. Designate community contributions to a Bulldog.",
    players: build("Football", "football", footballRaw, 20),
  },
  {
    slug: "baseball",
    name: "Baseball",
    shortName: "Baseball",
    blurb: "Big East baseball at Bulldog Park.",
    players: build("Baseball", "baseball", baseballRaw, 60),
  },
  {
    slug: "softball",
    name: "Softball",
    shortName: "Softball",
    blurb: "Bulldog softball at the Butler Softball Field.",
    players: build("Softball", "softball", softballRaw, 100),
  },
  {
    slug: "mens-soccer",
    name: "Men's Soccer",
    shortName: "M Soccer",
    blurb: "Big East men's soccer at the Sellick Bowl.",
    players: build("Men's Soccer", "mens-soccer", mensSoccerRaw, 140),
  },
  {
    slug: "womens-soccer",
    name: "Women's Soccer",
    shortName: "W Soccer",
    blurb: "Big East women's soccer at the Sellick Bowl.",
    players: build("Women's Soccer", "womens-soccer", womensSoccerRaw, 180),
  },
  {
    slug: "volleyball",
    name: "Women's Volleyball",
    shortName: "Volleyball",
    blurb: "Big East volleyball at Hinkle Fieldhouse.",
    players: build("Women's Volleyball", "volleyball", volleyballRaw, 330),
  },
];

export const getButlerTeam = (slug: string) =>
  BUTLER_TEAMS.find((t) => t.slug === slug);

export const getButlerPlayer = (sport: string, player: string) =>
  getButlerTeam(sport)?.players.find((p) => p.slug === player);
