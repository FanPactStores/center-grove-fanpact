/**
 * Springfield Shamrocks Baseball — organization, age divisions, and rosters.
 *
 * Hierarchy: Organization → Team (age division) → Player.
 * Each level carries a stable `designationCode` so the backend can attribute and
 * allocate contributions automatically based on the buyer's selection.
 *
 *   org    → SPFLD-SHAM
 *   team   → SPFLD-SHAM-{DIVISION}
 *   player → SPFLD-SHAM-{DIVISION}-#{NUM}
 *
 * Rosters are intentionally empty — they will be published after tryouts.
 */

export type ShamrocksPlayer = {
  slug: string;
  name: string;
  number: number;
  position: string;
  grade: string;
  hometown: string;
  swatch: string;
  designationCode: string;
};

export type ShamrocksTeam = {
  slug: string;
  name: string;
  ageGroup: string;
  coach: string;
  blurb: string;
  designationCode: string;
  tryoutDates?: string;
  tryoutTime?: string;
  tryoutLocation?: string;
  tryoutNote?: string;
  players: ShamrocksPlayer[];
};

export type ShamrocksOrg = {
  slug: string;
  name: string;
  shortName: string;
  season: string;
  category: "Athletics";
  blurb: string;
  about: string;
  hue: number;
  designationCode: string;
  teams: ShamrocksTeam[];
};

export const SHAMROCKS_ORGS: ShamrocksOrg[] = [
  {
    slug: "springfield-shamrocks-baseball",
    name: "Springfield Shamrocks Baseball",
    shortName: "Shamrocks",
    season: "2025 Travel Season",
    category: "Athletics",
    blurb:
      "Springfield's premier youth travel baseball program. Ages 7U through 17U competing across central Illinois.",
    about:
      "The Springfield Shamrocks are a travel baseball organization based in Springfield, Illinois, partnering with Overtime Training Academy and Sherman Athletic Club for year-round indoor and outdoor development. Our mission is to develop character and baseball skill from the ground up.",
    hue: 145,
    designationCode: "SPFLD-SHAM",
    teams: [
      {
        slug: "shamrocks-7u",
        name: "Shamrocks 7U",
        ageGroup: "7U",
        coach: "Coach Wiese",
        blurb:
          "Our youngest division. Fundamentals-first approach building the foundation for lifelong baseball development.",
        designationCode: "SPFLD-SHAM-7U",
        tryoutDates: "July 15 & 16",
        tryoutTime: "6–8pm",
        tryoutLocation: "Sherman A.C.",
        players: [],
      },
      {
        slug: "shamrocks-11u",
        name: "Shamrocks 11U",
        ageGroup: "11U",
        coach: "Coach Sanert",
        blurb: "Competitive travel baseball for 11-year-old athletes in the Springfield region.",
        designationCode: "SPFLD-SHAM-11U",
        tryoutDates: "June 30",
        tryoutTime: "5:30–7pm",
        tryoutLocation: "Spartan Park #6",
        players: [],
      },
      {
        slug: "shamrocks-12u",
        name: "Shamrocks 12U",
        ageGroup: "12U",
        coach: "Coach Phillips",
        blurb:
          "Skill development and competitive play for 12U athletes across central Illinois tournaments.",
        designationCode: "SPFLD-SHAM-12U",
        tryoutDates: "July 8",
        tryoutTime: "6–8pm",
        tryoutLocation: "Spartan Park #4",
        players: [],
      },
      {
        slug: "shamrocks-13u",
        name: "Shamrocks 13U",
        ageGroup: "13U",
        coach: "Coach Szoke",
        blurb: "High-level travel ball for 13U players ready to compete at the next level.",
        designationCode: "SPFLD-SHAM-13U",
        tryoutDates: "July 14",
        tryoutTime: "6–8pm",
        tryoutLocation: "Sherman A.C.",
        players: [],
      },
      {
        slug: "shamrocks-14u",
        name: "Shamrocks 14U",
        ageGroup: "14U",
        coach: "Coach Overbey / Coach Prefountain",
        blurb:
          "Dual-roster 14U program with two coaching staffs. Private tryouts available — contact coach directly.",
        designationCode: "SPFLD-SHAM-14U",
        tryoutNote:
          "Private Tryout Only for both rosters. Email springfieldshamrocks@gmail.com or shamrocksbaseball31@gmail.com to schedule.",
        players: [],
      },
      {
        slug: "shamrocks-15u",
        name: "Shamrocks 15U",
        ageGroup: "15U",
        coach: "Coach Chladny",
        blurb:
          "Elite 15U travel baseball competing in premier showcase and tournament events across Illinois.",
        designationCode: "SPFLD-SHAM-15U",
        tryoutDates: "July 15 & 16",
        tryoutTime: "6–8pm",
        tryoutLocation: "Williamsville H.S.",
        players: [],
      },
      {
        slug: "shamrocks-17u",
        name: "Shamrocks 17U",
        ageGroup: "17U",
        coach: "Coach Patton",
        blurb:
          "Top-level high school age travel ball. Preparing athletes for collegiate and showcase opportunities.",
        designationCode: "SPFLD-SHAM-17U",
        tryoutDates: "June 30 / July 1",
        tryoutTime: "6–8pm",
        tryoutLocation: "Sherman A.C.",
        players: [],
      },
    ],
  },
];

export const SHAMROCKS_ORG = SHAMROCKS_ORGS[0];

export function getShamrocksOrg(slug: string): ShamrocksOrg | undefined {
  return SHAMROCKS_ORGS.find((o) => o.slug === slug);
}

export function getShamrocksTeam(slug: string): ShamrocksTeam | undefined {
  return SHAMROCKS_ORG.teams.find((t) => t.slug === slug);
}

export const SHAMROCKS_TEAMS = SHAMROCKS_ORG.teams;

export const SHAMROCKS_CONTACT_EMAIL = "springfieldshamrocks@gmail.com";
export const SHAMROCKS_REGISTRATION_URL = "https://form.jotform.com/231654635907058";
