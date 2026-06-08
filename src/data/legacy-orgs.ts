/**
 * STL Legacy / Klutch Baseball (Legacy Performance Academy)
 *
 * Hierarchy: Organization → Team (age-group roster) → Player.
 * Designation codes flow:
 *   org    → LPA-{ORG}
 *   team   → LPA-{ORG}-{TEAM}
 *   player → LPA-{ORG}-{TEAM}-#{NUM}
 */

export type LegacyPlayer = {
  slug: string;
  name: string;
  number: number;
  position: string;
  grade: string;
  hometown: string;
  swatch: string;
  designationCode: string;
};

export type LegacyTeam = {
  slug: string;
  name: string;
  ageGroup: string;
  coach: string;
  blurb: string;
  designationCode: string;
  players: LegacyPlayer[];
};

export type LegacyOrg = {
  slug: string;
  name: string;
  shortName: string;
  season: string;
  category: "Youth" | "High School";
  blurb: string;
  about: string;
  hue: number;
  designationCode: string;
  teams: LegacyTeam[];
};

const swatch = (hue: number, offset: number) =>
  `oklch(0.32 0.09 ${(hue + offset * 9) % 360})`;

const FIRST_NAMES = [
  "Jaxon", "Cole", "Brady", "Tanner", "Mason", "Hudson", "Carter", "Walker",
  "Beckham", "Easton", "Bryce", "Maddox", "Camden", "Crew", "Knox", "Rhett",
  "Sawyer", "Tucker", "Bennett", "Grayson", "Holden", "Reid", "Brooks", "Sutton",
  "Pierce", "Trent", "Drake", "Wyatt", "Asher", "Levi", "Owen", "Hayes",
];
const LAST_NAMES = [
  "Whitaker", "Mercer", "Vance", "Calloway", "Holloway", "Sutton", "Pace",
  "Bishop", "Reed", "Faulkner", "Walsh", "Ashford", "Donovan", "Pritchard",
  "Sheffield", "Townsend", "Bramble", "Hollister", "Whitlow", "Beasley",
  "Roush", "Crane", "Tilford", "Yates", "Quinlan", "Renfro", "Strickland",
  "Hartwell", "Kemper", "Lockhart",
];
const TOWNS = [
  "St. Louis, MO", "Chesterfield, MO", "Wildwood, MO", "O'Fallon, MO",
  "St. Charles, MO", "Edwardsville, IL", "O'Fallon, IL", "Ballwin, MO",
  "Town & Country, MO", "Kirkwood, MO",
];

const BASEBALL_POS = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH", "P", "UTIL"];

function makePlayers(opts: {
  count: number;
  grade: string;
  hue: number;
  teamCode: string;
  startIdx?: number;
  startingNumber?: number;
}): LegacyPlayer[] {
  const startIdx = opts.startIdx ?? 0;
  return Array.from({ length: opts.count }).map((_, i) => {
    const first = FIRST_NAMES[(startIdx + i) % FIRST_NAMES.length];
    const last = LAST_NAMES[(startIdx * 3 + i * 7) % LAST_NAMES.length];
    const number = (opts.startingNumber ?? 1) + i;
    const name = `${first} ${last}`;
    const slug = name.toLowerCase().replace(/[^a-z]+/g, "-") + "-" + number;
    return {
      slug,
      name,
      number,
      position: BASEBALL_POS[i % BASEBALL_POS.length],
      grade: opts.grade,
      hometown: TOWNS[i % TOWNS.length],
      swatch: swatch(opts.hue, i),
      designationCode: `${opts.teamCode}-#${number}`,
    };
  });
}

type AgeBlock = {
  age: string;            // "8U"
  coach: string;          // "Brown"
  brand: "Klutch" | "STL Legacy";
  ageGroup: string;       // descriptive
  grade: string;
  count?: number;
};

function teamsFromBlocks(
  org: { code: string; hue: number },
  blocks: AgeBlock[],
): LegacyTeam[] {
  return blocks.map((b, i) => {
    const slug = `${b.age.toLowerCase()}-${b.coach.toLowerCase().replace(/[^a-z]+/g, "-")}`;
    const teamCode = `${org.code}-${b.age}-${b.coach.toUpperCase().replace(/[^A-Z]+/g, "")}`;
    const name = `${b.brand} ${b.age} — ${b.coach}`;
    return {
      slug,
      name,
      ageGroup: b.ageGroup,
      coach: `Coach ${b.coach}`,
      blurb: `${b.brand} ${b.age} squad under Coach ${b.coach}. Virtual Combine roster with verified profiles for tournament play and scout exposure.`,
      designationCode: teamCode,
      players: makePlayers({
        count: b.count ?? 12,
        grade: b.grade,
        hue: org.hue,
        teamCode,
        startIdx: i * 5,
        startingNumber: 1,
      }),
    };
  });
}

// ============================================================
// ORGANIZATIONS
// ============================================================

const KLUTCH = { code: "LPA-KLUTCH", hue: 235 };
const LEGACY = { code: "LPA-LEGACY", hue: 15 };

export const LEGACY_ORGS: LegacyOrg[] = [
  {
    slug: "klutch-youth",
    name: "Klutch Baseball — Youth Track",
    shortName: "Klutch Youth",
    season: "Spring · Summer · Fall",
    category: "Youth",
    hue: KLUTCH.hue,
    designationCode: KLUTCH.code,
    blurb: "Youth development rosters from 8U through the 14U high-school transition team.",
    about:
      "The Klutch Baseball youth track spans 8U through 14U. Rosters are organized by age classification and head coach. The 14U Shockley team — branded STL Legacy — serves as the bridge roster, transitioning players from Klutch youth parameters into full high-school dimensions and rules.",
    teams: teamsFromBlocks(KLUTCH, [
      { age: "8U",  coach: "Nationals", brand: "Klutch", ageGroup: "Birth year 2017", grade: "2nd / 3rd", count: 10 },
      { age: "10U", coach: "Nationals", brand: "Klutch", ageGroup: "Birth year 2015", grade: "4th / 5th", count: 10 },
      { age: "12U", coach: "Nationals", brand: "Klutch", ageGroup: "Birth year 2013", grade: "6th / 7th", count: 10 },
      { age: "12U", coach: "Elite",     brand: "Klutch", ageGroup: "Birth year 2013", grade: "6th / 7th", count: 10 },
      { age: "13U", coach: "Nationals", brand: "Klutch", ageGroup: "Birth year 2012", grade: "7th / 8th", count: 10 },
      { age: "13U", coach: "Elite",     brand: "Klutch", ageGroup: "Birth year 2012", grade: "7th / 8th", count: 10 },
      { age: "14U", coach: "Nationals", brand: "STL Legacy", ageGroup: "Bridge roster — full HS dimensions", grade: "8th / 9th", count: 10 },
    ]),
  },

  {
    slug: "legacy-showcase",
    name: "STL Legacy Showcase Baseball — High School Track",
    shortName: "Legacy Showcase",
    season: "Summer Showcase · Fall Scout",
    category: "High School",
    hue: LEGACY.hue,
    designationCode: LEGACY.code,
    blurb: "15U through 18U rosters built for college scout exposure and tournament placement.",
    about:
      "The upper tier of the Virtual Combine structure operates entirely under the STL Legacy banner. These teams are organized strictly for college scout exposure, tournament placement, and data-tracking profiles — culminating in the 17U Select Showcase and the 18U Scout Team.",
    teams: teamsFromBlocks(LEGACY, [
      { age: "15U", coach: "Showcase",        brand: "STL Legacy", ageGroup: "Freshman / Sophomore", grade: "9th / 10th",  count: 12 },
      { age: "16U", coach: "Showcase",        brand: "STL Legacy", ageGroup: "Sophomore / Junior",   grade: "10th / 11th", count: 12 },
      { age: "17U", coach: "Select Showcase", brand: "STL Legacy", ageGroup: "Junior — primary recruiting window", grade: "11th", count: 12 },
      { age: "18U", coach: "Scout Team",      brand: "STL Legacy", ageGroup: "Senior commits & unsigned",          grade: "12th", count: 12 },
    ]),
  },
];

export function getLegacyOrg(slug: string) {
  return LEGACY_ORGS.find((o) => o.slug === slug);
}
export function getLegacyTeam(orgSlug: string, teamSlug: string) {
  return getLegacyOrg(orgSlug)?.teams.find((t) => t.slug === teamSlug);
}
export function getLegacyPlayer(orgSlug: string, teamSlug: string, playerSlug: string) {
  return getLegacyTeam(orgSlug, teamSlug)?.players.find((p) => p.slug === playerSlug);
}
