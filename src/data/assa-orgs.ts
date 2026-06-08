/**
 * All-Star Sports Academy (ASSA) — Combat Baseball & Softball
 *
 * Hierarchy: Hub (Org) → Team (age-group roster) → Player.
 * Designation codes flow:
 *   org    → ASSA-{HUB}
 *   team   → ASSA-{HUB}-{TEAM}
 *   player → ASSA-{HUB}-{TEAM}-#{NUM}
 */

export type AssaPlayer = {
  slug: string;
  name: string;
  number: number;
  position: string;
  grade: string;
  hometown: string;
  swatch: string;
  designationCode: string;
};

export type AssaTeam = {
  slug: string;
  name: string;
  ageGroup: string;
  division: "Baseball" | "Softball" | "Showcase Baseball" | "Showcase Softball";
  tier: string; // e.g. "Select", "Elite", "Navy", "Red", "Development", "Premier"
  coach: string;
  blurb: string;
  designationCode: string;
  players: AssaPlayer[];
};

export type AssaOrg = {
  slug: string;
  name: string;
  shortName: string;
  hub: string;        // City, ST
  state: "PA" | "NJ" | "Multi";
  category: "Youth Hub" | "High School Showcase";
  blurb: string;
  about: string;
  hue: number;
  designationCode: string;
  teams: AssaTeam[];
};

const swatch = (hue: number, offset: number) =>
  `oklch(0.32 0.09 ${(hue + offset * 11) % 360})`;

const FIRST = [
  "Aiden", "Connor", "Liam", "Brody", "Nolan", "Declan", "Brayden", "Logan",
  "Cole", "Mason", "Jackson", "Hudson", "Carter", "Owen", "Bennett", "Caleb",
  "Tyler", "Ryan", "Sean", "Patrick", "Anthony", "Dominic", "Vincent", "Luca",
  "Gavin", "Jase", "Reid", "Kai", "Finn", "Quinn", "Hayden", "Eli",
];
const LAST = [
  "McAllister", "O'Brien", "Donnelly", "Kowalski", "Russo", "Caruso",
  "Esposito", "DiNardo", "McGovern", "Reilly", "Brennan", "Murphy",
  "Petrucci", "Hofmann", "Schmidt", "Lombardo", "Marino", "Conti",
  "Walsh", "Sullivan", "Maguire", "Romano", "Bianchi", "Vaccaro",
  "Patterson", "Hughes", "Kelly", "Carr", "Doyle", "Schwartz",
];
const FIRST_F = [
  "Avery", "Riley", "Ella", "Sophia", "Lily", "Maeve", "Charlotte",
  "Hannah", "Reagan", "Olivia", "Brooke", "Emma", "Madison", "Cassidy",
];
const TOWNS_PA = [
  "West Chester, PA", "Downingtown, PA", "Exton, PA", "Malvern, PA",
  "Broomall, PA", "Havertown, PA", "Newtown Square, PA",
  "Conshohocken, PA", "Plymouth Meeting, PA", "King of Prussia, PA",
  "Warminster, PA", "Doylestown, PA", "Levittown, PA",
];
const TOWNS_NJ = [
  "Cherry Hill, NJ", "Voorhees, NJ", "Marlton, NJ", "Mount Laurel, NJ",
  "Haddonfield, NJ", "Moorestown, NJ",
];

const BB_POS = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH", "P", "UTIL"];
const SB_POS = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DP", "P", "UTIL"];

function makePlayers(opts: {
  count: number;
  grade: string;
  hue: number;
  teamCode: string;
  hubState: "PA" | "NJ" | "Multi";
  female?: boolean;
  startIdx?: number;
}): AssaPlayer[] {
  const startIdx = opts.startIdx ?? 0;
  const towns = opts.hubState === "NJ" ? TOWNS_NJ : opts.hubState === "Multi"
    ? [...TOWNS_PA, ...TOWNS_NJ] : TOWNS_PA;
  const pool = opts.female ? FIRST_F : FIRST;
  const posList = opts.female ? SB_POS : BB_POS;
  return Array.from({ length: opts.count }).map((_, i) => {
    const first = pool[(startIdx + i) % pool.length];
    const last = LAST[(startIdx * 3 + i * 7) % LAST.length];
    const number = i + 1;
    const name = `${first} ${last}`;
    const slug = name.toLowerCase().replace(/[^a-z]+/g, "-") + "-" + number;
    return {
      slug,
      name,
      number,
      position: posList[i % posList.length],
      grade: opts.grade,
      hometown: towns[i % towns.length],
      swatch: swatch(opts.hue, i),
      designationCode: `${opts.teamCode}-#${number}`,
    };
  });
}

type TeamBlock = {
  age: string;        // "9U" or "Class of 2028"
  tier: string;       // "Select", "Elite", "Navy", "Red", "Premier", "National", "Scout Team"
  division: AssaTeam["division"];
  grade: string;      // free-form grade range
  count?: number;     // default 12
  coach?: string;     // default auto
};

function buildTeams(
  org: { code: string; hue: number; hubState: "PA" | "NJ" | "Multi" },
  blocks: TeamBlock[],
): AssaTeam[] {
  return blocks.map((b, i) => {
    const ageSlug = b.age.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const tierSlug = b.tier.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const slug = `${ageSlug}-${tierSlug}`;
    const teamCode = `${org.code}-${b.age.replace(/[^A-Z0-9]/gi, "").toUpperCase()}-${b.tier.replace(/[^A-Z0-9]/gi, "").toUpperCase()}`;
    const brand = b.division.startsWith("Showcase") ? "Combat Futures" : "ASSA Combat";
    const female = b.division === "Softball" || b.division === "Showcase Softball";
    const name = `${brand} ${b.age} ${b.tier}`;
    return {
      slug,
      name,
      ageGroup: b.age,
      division: b.division,
      tier: b.tier,
      coach: b.coach ?? `Coach ${LAST[i % LAST.length]}`,
      blurb: `${brand} ${b.age} ${b.tier} roster. ${b.division} program with verified player profiles for league play, tournaments, and scout exposure.`,
      designationCode: teamCode,
      players: makePlayers({
        count: b.count ?? 12,
        grade: b.grade,
        hue: org.hue,
        teamCode,
        hubState: org.hubState,
        female,
        startIdx: i * 4,
      }),
    };
  });
}

// ============================================================
// HUBS
// ============================================================

const HUB = {
  WC:   { code: "ASSA-WC",   hue: 250 }, // West Chester PA
  CH:   { code: "ASSA-CH",   hue: 22  }, // Cherry Hill NJ
  DT:   { code: "ASSA-DT",   hue: 200 }, // Downingtown PA
  BR:   { code: "ASSA-BR",   hue: 145 }, // Broomall PA
  CN:   { code: "ASSA-CN",   hue: 95  }, // Conshohocken PA
  WM:   { code: "ASSA-WM",   hue: 305 }, // Warminster PA
  LV:   { code: "ASSA-LV",   hue: 60  }, // Levittown/Havertown satellite
  CF:   { code: "ASSA-CF",   hue: 12  }, // Combat Futures (HS, centralized)
};

export const ASSA_ORGS: AssaOrg[] = [
  {
    slug: "west-chester",
    name: "West Chester, PA Hub",
    shortName: "West Chester",
    hub: "West Chester, PA",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.WC.hue,
    designationCode: HUB.WC.code,
    blurb: "ASSA's flagship Chester County hub — 9U through 14U Combat baseball plus 10U and 12U fastpitch softball.",
    about: "The West Chester facility is ASSA's largest Combat youth hub, serving Chester County families with full-tier baseball from 9U Select through 14U Elite, and a growing fastpitch softball program at 10U and 12U.",
    teams: buildTeams({ code: HUB.WC.code, hue: HUB.WC.hue, hubState: "PA" }, [
      { age: "9U",  tier: "Select",    division: "Baseball", grade: "3rd / 4th",  count: 11, coach: "Coach Donnelly" },
      { age: "10U", tier: "Select",    division: "Baseball", grade: "4th / 5th",  count: 12, coach: "Coach Russo" },
      { age: "11U", tier: "Navy",      division: "Baseball", grade: "5th / 6th",  count: 12, coach: "Coach Caruso" },
      { age: "11U", tier: "Red",       division: "Baseball", grade: "5th / 6th",  count: 12, coach: "Coach Esposito" },
      { age: "12U", tier: "Select",    division: "Baseball", grade: "6th / 7th",  count: 12, coach: "Coach DiNardo" },
      { age: "13U", tier: "Elite",     division: "Baseball", grade: "7th / 8th",  count: 13, coach: "Coach Reilly" },
      { age: "14U", tier: "Elite",     division: "Baseball", grade: "8th / 9th",  count: 13, coach: "Coach Brennan" },
      { age: "10U", tier: "Fastpitch", division: "Softball", grade: "4th / 5th",  count: 12, coach: "Coach Murphy" },
      { age: "12U", tier: "Fastpitch", division: "Softball", grade: "6th / 7th",  count: 12, coach: "Coach Walsh" },
    ]),
  },
  {
    slug: "cherry-hill",
    name: "Cherry Hill, NJ Hub",
    shortName: "Cherry Hill",
    hub: "Cherry Hill, NJ",
    state: "NJ",
    category: "Youth Hub",
    hue: HUB.CH.hue,
    designationCode: HUB.CH.code,
    blurb: "South Jersey's Combat hub — 9U through 14U baseball plus 12U fastpitch.",
    about: "The Cherry Hill facility anchors ASSA's South Jersey programming. Full Combat youth baseball ladder with split 12U Navy/Red squads and a 12U fastpitch softball roster.",
    teams: buildTeams({ code: HUB.CH.code, hue: HUB.CH.hue, hubState: "NJ" }, [
      { age: "9U",  tier: "Select",    division: "Baseball", grade: "3rd / 4th",  count: 11, coach: "Coach Lombardo" },
      { age: "10U", tier: "Select",    division: "Baseball", grade: "4th / 5th",  count: 12, coach: "Coach Marino" },
      { age: "11U", tier: "Select",    division: "Baseball", grade: "5th / 6th",  count: 12, coach: "Coach Conti" },
      { age: "12U", tier: "Navy",      division: "Baseball", grade: "6th / 7th",  count: 12, coach: "Coach Romano" },
      { age: "12U", tier: "Red",       division: "Baseball", grade: "6th / 7th",  count: 12, coach: "Coach Bianchi" },
      { age: "13U", tier: "Elite",     division: "Baseball", grade: "7th / 8th",  count: 13, coach: "Coach Vaccaro" },
      { age: "14U", tier: "Elite",     division: "Baseball", grade: "8th / 9th",  count: 13, coach: "Coach Petrucci" },
      { age: "12U", tier: "Fastpitch", division: "Softball", grade: "6th / 7th",  count: 12, coach: "Coach Sullivan" },
    ]),
  },
  {
    slug: "downingtown",
    name: "Downingtown, PA Hub",
    shortName: "Downingtown",
    hub: "Downingtown, PA",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.DT.hue,
    designationCode: HUB.DT.code,
    blurb: "Northern Chester County Combat baseball, 9U Development through 14U Elite.",
    about: "Downingtown carries a deep Combat baseball ladder with a 9U Development entry point feeding directly into 10U–14U Select and Elite rosters.",
    teams: buildTeams({ code: HUB.DT.code, hue: HUB.DT.hue, hubState: "PA" }, [
      { age: "9U",  tier: "Development", division: "Baseball", grade: "3rd / 4th", count: 11, coach: "Coach Hofmann" },
      { age: "10U", tier: "Select",      division: "Baseball", grade: "4th / 5th", count: 12, coach: "Coach Schmidt" },
      { age: "11U", tier: "Select",      division: "Baseball", grade: "5th / 6th", count: 12, coach: "Coach McGovern" },
      { age: "12U", tier: "Select",      division: "Baseball", grade: "6th / 7th", count: 12, coach: "Coach O'Brien" },
      { age: "13U", tier: "Elite",       division: "Baseball", grade: "7th / 8th", count: 13, coach: "Coach Kelly" },
      { age: "14U", tier: "Elite",       division: "Baseball", grade: "8th / 9th", count: 13, coach: "Coach Doyle" },
    ]),
  },
  {
    slug: "broomall",
    name: "Broomall, PA Hub",
    shortName: "Broomall",
    hub: "Broomall, PA",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.BR.hue,
    designationCode: HUB.BR.code,
    blurb: "Delaware County Combat baseball, 10U Select through 14U Elite.",
    about: "The Broomall facility serves Delaware County Combat families with a five-tier baseball ladder from 10U Select through 14U Elite.",
    teams: buildTeams({ code: HUB.BR.code, hue: HUB.BR.hue, hubState: "PA" }, [
      { age: "10U", tier: "Select", division: "Baseball", grade: "4th / 5th",  count: 12, coach: "Coach McAllister" },
      { age: "11U", tier: "Select", division: "Baseball", grade: "5th / 6th",  count: 12, coach: "Coach Hughes" },
      { age: "12U", tier: "Select", division: "Baseball", grade: "6th / 7th",  count: 12, coach: "Coach Patterson" },
      { age: "13U", tier: "Elite",  division: "Baseball", grade: "7th / 8th",  count: 13, coach: "Coach Carr" },
      { age: "14U", tier: "Elite",  division: "Baseball", grade: "8th / 9th",  count: 13, coach: "Coach Maguire" },
    ]),
  },
  {
    slug: "conshohocken",
    name: "Conshohocken, PA Hub",
    shortName: "Conshohocken",
    hub: "Conshohocken, PA",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.CN.hue,
    designationCode: HUB.CN.code,
    blurb: "Montgomery County Combat baseball, 10U Select through 14U Elite.",
    about: "Conshohocken anchors ASSA's Montgomery County programming with a complete five-tier Combat baseball ladder.",
    teams: buildTeams({ code: HUB.CN.code, hue: HUB.CN.hue, hubState: "PA" }, [
      { age: "10U", tier: "Select", division: "Baseball", grade: "4th / 5th",  count: 12, coach: "Coach Kowalski" },
      { age: "11U", tier: "Select", division: "Baseball", grade: "5th / 6th",  count: 12, coach: "Coach Schwartz" },
      { age: "12U", tier: "Select", division: "Baseball", grade: "6th / 7th",  count: 12, coach: "Coach Donnelly" },
      { age: "13U", tier: "Elite",  division: "Baseball", grade: "7th / 8th",  count: 13, coach: "Coach Murphy" },
      { age: "14U", tier: "Elite",  division: "Baseball", grade: "8th / 9th",  count: 13, coach: "Coach Brennan" },
    ]),
  },
  {
    slug: "warminster",
    name: "Warminster, PA Hub",
    shortName: "Warminster",
    hub: "Warminster, PA",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.WM.hue,
    designationCode: HUB.WM.code,
    blurb: "Bucks County Combat baseball, 10U Select through 14U Elite.",
    about: "The Warminster facility serves Bucks County Combat families with a full five-tier baseball ladder.",
    teams: buildTeams({ code: HUB.WM.code, hue: HUB.WM.hue, hubState: "PA" }, [
      { age: "10U", tier: "Select", division: "Baseball", grade: "4th / 5th",  count: 12, coach: "Coach Reilly" },
      { age: "11U", tier: "Select", division: "Baseball", grade: "5th / 6th",  count: 12, coach: "Coach O'Brien" },
      { age: "12U", tier: "Select", division: "Baseball", grade: "6th / 7th",  count: 12, coach: "Coach Caruso" },
      { age: "13U", tier: "Elite",  division: "Baseball", grade: "7th / 8th",  count: 13, coach: "Coach DiNardo" },
      { age: "14U", tier: "Elite",  division: "Baseball", grade: "8th / 9th",  count: 13, coach: "Coach Kelly" },
    ]),
  },
  {
    slug: "levittown-havertown",
    name: "Levittown & Havertown Satellite",
    shortName: "Satellite",
    hub: "Levittown / Havertown, PA",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.LV.hue,
    designationCode: HUB.LV.code,
    blurb: "Satellite Combat baseball — 11U, 12U Select, and 13U Elite.",
    about: "The Levittown and Havertown satellite hubs operate a compact three-tier Combat baseball program for families in those communities.",
    teams: buildTeams({ code: HUB.LV.code, hue: HUB.LV.hue, hubState: "PA" }, [
      { age: "11U", tier: "Select", division: "Baseball", grade: "5th / 6th",  count: 12, coach: "Coach Walsh" },
      { age: "12U", tier: "Select", division: "Baseball", grade: "6th / 7th",  count: 12, coach: "Coach Doyle" },
      { age: "13U", tier: "Elite",  division: "Baseball", grade: "7th / 8th",  count: 13, coach: "Coach Hughes" },
    ]),
  },
  {
    slug: "combat-futures",
    name: "Combat Futures — High School Showcase",
    shortName: "Combat Futures",
    hub: "Centralized — All Hubs",
    state: "Multi",
    category: "High School Showcase",
    hue: HUB.CF.hue,
    designationCode: HUB.CF.code,
    blurb: "Centralized HS showcase rosters by graduation year — baseball and softball.",
    about: "The Combat Futures program pulls players from every ASSA hub into centralized showcase rosters organized strictly by graduation year for baseball, and age tier for fastpitch softball — the recruiting pipeline for college placement.",
    teams: buildTeams({ code: HUB.CF.code, hue: HUB.CF.hue, hubState: "Multi" }, [
      // Showcase Baseball — by grad year
      { age: "Class of 2029", tier: "Freshmen",               division: "Showcase Baseball", grade: "9th  / 15U", count: 14, coach: "Coach Conti" },
      { age: "Class of 2028", tier: "Navy Premier",           division: "Showcase Baseball", grade: "10th / 16U", count: 14, coach: "Coach Marino" },
      { age: "Class of 2028", tier: "Red Select",             division: "Showcase Baseball", grade: "10th / 16U", count: 14, coach: "Coach Romano" },
      { age: "Class of 2027", tier: "National Elite",         division: "Showcase Baseball", grade: "11th / 17U", count: 16, coach: "Coach Petrucci" },
      { age: "Class of 2027", tier: "Select Regional",        division: "Showcase Baseball", grade: "11th / 17U", count: 16, coach: "Coach Esposito" },
      { age: "Class of 2026", tier: "Scout Team",             division: "Showcase Baseball", grade: "12th / 18U", count: 16, coach: "Coach Reilly" },
      // Showcase Softball
      { age: "14U", tier: "Premier Fastpitch",      division: "Showcase Softball", grade: "8th / 9th",  count: 13, coach: "Coach Sullivan" },
      { age: "16U", tier: "Elite Showcase",         division: "Showcase Softball", grade: "10th / 11th", count: 14, coach: "Coach Murphy" },
      { age: "18U", tier: "National Scout Team",    division: "Showcase Softball", grade: "12th",        count: 15, coach: "Coach Walsh" },
    ]),
  },
];

export function getAssaOrg(slug: string) {
  return ASSA_ORGS.find((o) => o.slug === slug);
}
export function getAssaTeam(orgSlug: string, teamSlug: string) {
  return getAssaOrg(orgSlug)?.teams.find((t) => t.slug === teamSlug);
}
export function getAssaPlayer(orgSlug: string, teamSlug: string, playerSlug: string) {
  return getAssaTeam(orgSlug, teamSlug)?.players.find((p) => p.slug === playerSlug);
}
