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
  address?: string;   // street address for "coming soon" hubs
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
      { age: "9U",  tier: "Combat", division: "Baseball", grade: "3rd / 4th", count: 10, coach: "Coach Donnelly" },
      { age: "10U", tier: "Select", division: "Baseball", grade: "4th / 5th", count: 10, coach: "Coach Russo" },
      { age: "10U", tier: "Elite",  division: "Baseball", grade: "4th / 5th", count: 10, coach: "Coach Caruso" },
      { age: "11U", tier: "Select", division: "Baseball", grade: "5th / 6th", count: 10, coach: "Coach Esposito" },
      { age: "11U", tier: "Elite",  division: "Baseball", grade: "5th / 6th", count: 10, coach: "Coach DiNardo" },
      { age: "12U", tier: "Select", division: "Baseball", grade: "6th / 7th", count: 10, coach: "Coach Reilly" },
      { age: "12U", tier: "Elite",  division: "Baseball", grade: "6th / 7th", count: 10, coach: "Coach Brennan" },
      { age: "14U", tier: "Elite",  division: "Baseball", grade: "8th / 9th", count: 10, coach: "Coach Murphy" },
    ]),
  },
  {
    slug: "cherry-hill",
    name: "Cherry Hill, NJ Hub",
    shortName: "Cherry Hill",
    hub: "Cherry Hill, NJ",
    address: "1820 Marlton Pike East, Cherry Hill, NJ 08003",
    state: "NJ",
    category: "Youth Hub",
    hue: HUB.CH.hue,
    designationCode: HUB.CH.code,
    blurb: "South Jersey's Combat hub — rosters publishing soon.",
    about: "The Cherry Hill facility anchors ASSA's South Jersey programming. Rosters publish once the spring schedule locks.",
    teams: [],
  },
  {
    slug: "downingtown",
    name: "Downingtown, PA Hub",
    shortName: "Downingtown",
    hub: "Downingtown, PA",
    address: "100 Brandywine Blvd, Downingtown, PA 19335",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.DT.hue,
    designationCode: HUB.DT.code,
    blurb: "Northern Chester County Combat baseball — rosters publishing soon.",
    about: "Downingtown's Combat ladder publishes after spring tryouts close.",
    teams: [],
  },
  {
    slug: "broomall",
    name: "Broomall, PA Hub",
    shortName: "Broomall",
    hub: "Broomall, PA",
    address: "2515 West Chester Pike, Broomall, PA 19008",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.BR.hue,
    designationCode: HUB.BR.code,
    blurb: "Delaware County Combat baseball — rosters publishing soon.",
    about: "The Broomall facility serves Delaware County Combat families. Rosters publish after tryouts.",
    teams: [],
  },
  {
    slug: "conshohocken",
    name: "Conshohocken, PA Hub",
    shortName: "Conshohocken",
    hub: "Conshohocken, PA",
    address: "400 East Hector Street, Conshohocken, PA 19428",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.CN.hue,
    designationCode: HUB.CN.code,
    blurb: "Montgomery County Combat baseball — rosters publishing soon.",
    about: "Conshohocken anchors ASSA's Montgomery County programming. Rosters publish after tryouts.",
    teams: [],
  },
  {
    slug: "warminster",
    name: "Warminster, PA Hub",
    shortName: "Warminster",
    hub: "Warminster, PA",
    address: "925 West Street Road, Warminster, PA 18974",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.WM.hue,
    designationCode: HUB.WM.code,
    blurb: "Bucks County Combat baseball — rosters publishing soon.",
    about: "The Warminster facility serves Bucks County Combat families. Rosters publish after tryouts.",
    teams: [],
  },
  {
    slug: "levittown-havertown",
    name: "Levittown & Havertown Satellite",
    shortName: "Satellite",
    hub: "Levittown / Havertown, PA",
    address: "Levittown, PA 19056 · Havertown, PA 19083",
    state: "PA",
    category: "Youth Hub",
    hue: HUB.LV.hue,
    designationCode: HUB.LV.code,
    blurb: "Satellite Combat baseball — rosters publishing soon.",
    about: "The Levittown and Havertown satellite hubs publish rosters after the spring schedule locks.",
    teams: [],
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
    blurb: "Centralized HS showcase rosters by graduation year.",
    about: "The Combat Futures program pulls players from every ASSA hub into centralized showcase rosters organized strictly by graduation year — the recruiting pipeline for college placement.",
    teams: buildTeams({ code: HUB.CF.code, hue: HUB.CF.hue, hubState: "Multi" }, [
      { age: "Class of 2028", tier: "Showcase",   division: "Showcase Baseball", grade: "10th / 16U", count: 15, coach: "Coach Marino" },
      { age: "Class of 2027", tier: "Showcase",   division: "Showcase Baseball", grade: "11th / 17U", count: 15, coach: "Coach Petrucci" },
      { age: "Class of 2026", tier: "Scout Team", division: "Showcase Baseball", grade: "12th / 18U", count: 15, coach: "Coach Reilly" },
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
