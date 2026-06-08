/**
 * Center Grove Community Alliance — orgs, teams, and rosters.
 *
 * Hierarchy: Organization → Team (division / squad / ensemble) → Player / Member.
 * Each level carries a stable `designationCode` so the backend can attribute and
 * allocate contributions automatically based on the buyer's selection.
 *
 *   org    → CGCA-{ORG}
 *   team   → CGCA-{ORG}-{TEAM}
 *   player → CGCA-{ORG}-{TEAM}-#{NUM}
 */

export type CGPlayer = {
  slug: string;
  name: string;
  number: number;
  position: string;
  grade: string;
  hometown: string;
  swatch: string;
  designationCode: string;
};

export type CGTeam = {
  slug: string;
  name: string;
  ageGroup: string;
  coach: string;
  blurb: string;
  designationCode: string;
  players: CGPlayer[];
};

export type CGOrg = {
  slug: string;
  name: string;
  shortName: string;
  season: string;
  category: "Athletics" | "Performing Arts" | "Aquatics" | "STEM";
  blurb: string;
  about: string;
  hue: number;
  designationCode: string;
  teams: CGTeam[];
};

const swatch = (hue: number, offset: number) =>
  `oklch(0.34 0.08 ${(hue + offset * 8) % 360})`;

const FIRST_NAMES_M = [
  "Lucas", "Mason", "Logan", "Ethan", "Noah", "Oliver", "Liam", "Henry",
  "Jackson", "Owen", "Caleb", "Wyatt", "Levi", "Eli", "Asher", "Cooper",
  "Hudson", "Brody", "Bennett", "Hayden", "Reid", "Beckett", "Tucker", "Grayson",
  "Maddox", "Easton", "Camden", "Knox", "Holden", "Sawyer",
];
const FIRST_NAMES_F = [
  "Ava", "Mia", "Ella", "Harper", "Sophie", "Charlotte", "Amelia", "Eleanor",
  "Hazel", "Nora", "Iris", "Quinn", "Riley", "Reese", "Tatum", "Hayden",
  "Avery", "Sloane", "Brynn", "Emersyn", "Kennedy", "Adeline", "Brooklyn", "Piper",
  "Skylar", "Rowan", "Wren", "Maeve", "Camille", "Vivian",
];
const LAST_NAMES = [
  "Carter", "Brooks", "Hayes", "Walsh", "Reed", "Pace", "Bishop", "Knight",
  "Faulkner", "Whitaker", "Sutton", "Mercer", "Vance", "Ashford", "Donovan",
  "Pritchard", "Holloway", "Trent", "Calloway", "Sheffield", "Townsend", "Bramble",
  "Hollister", "Whitlow", "Beasley", "Roush", "Crane", "Tilford", "Yates", "Quinlan",
];
const TOWNS = [
  "Greenwood, IN", "Bargersville, IN", "Whiteland, IN", "Center Grove, IN",
  "Trafalgar, IN", "Franklin, IN", "Mooresville, IN", "Plainfield, IN",
];

function makePlayers(opts: {
  count: number;
  positions: string[];
  grade: string;
  hue: number;
  teamCode: string;
  startingNumber?: number;
  startIdx?: number;
  gender?: "m" | "f" | "mixed";
}): CGPlayer[] {
  const startIdx = opts.startIdx ?? 0;
  const gender = opts.gender ?? "m";
  return Array.from({ length: opts.count }).map((_, i) => {
    const useFemale =
      gender === "f" ? true : gender === "mixed" ? i % 2 === 0 : false;
    const pool = useFemale ? FIRST_NAMES_F : FIRST_NAMES_M;
    const first = pool[(startIdx + i) % pool.length];
    const last = LAST_NAMES[(startIdx * 3 + i * 7) % LAST_NAMES.length];
    const number = (opts.startingNumber ?? 1) + i;
    const name = `${first} ${last}`;
    const slug = name.toLowerCase().replace(/[^a-z]+/g, "-") + "-" + number;
    return {
      slug,
      name,
      number,
      position: opts.positions[i % opts.positions.length],
      grade: opts.grade,
      hometown: TOWNS[i % TOWNS.length],
      swatch: swatch(opts.hue, i),
      designationCode: `${opts.teamCode}-#${number}`,
    };
  });
}

// helper to keep team blocks short
const t = (
  org: { code: string; hue: number },
  args: {
    slug: string;
    name: string;
    ageGroup: string;
    coach: string;
    blurb: string;
    count?: number;
    positions: string[];
    grade: string;
    gender?: "m" | "f" | "mixed";
    startIdx?: number;
  }
): CGTeam => {
  const teamCode = `${org.code}-${args.slug.toUpperCase().replace(/[^A-Z0-9]+/g, "")}`;
  return {
    slug: args.slug,
    name: args.name,
    ageGroup: args.ageGroup,
    coach: args.coach,
    blurb: args.blurb,
    designationCode: teamCode,
    players: makePlayers({
      count: args.count ?? 12,
      positions: args.positions,
      grade: args.grade,
      hue: org.hue,
      teamCode,
      startIdx: args.startIdx ?? 0,
      gender: args.gender,
    }),
  };
};

// ============================================================
// ORGANIZATIONS
// ============================================================

const VOICE_PARTS = ["Soprano", "Alto", "Tenor", "Bass"];
const TREBLE_PARTS = ["Soprano 1", "Soprano 2", "Alto 1", "Alto 2"];

const CHORAL = { code: "CGCA-CHOR", hue: 290 };
const BB = { code: "CGCA-BB", hue: 90 };
const SB = { code: "CGCA-SB", hue: 320 };
const FB = { code: "CGCA-FB", hue: 30 };
const BSK = { code: "CGCA-BSK", hue: 40 };
const SOC = { code: "CGCA-SOC", hue: 145 };
const AQ = { code: "CGCA-AQ", hue: 210 };

export const CG_ORGS: CGOrg[] = [
  // ──────────────────────────────────────────────────────────
  // CHORAL & PERFORMING ARTS
  // ──────────────────────────────────────────────────────────
  {
    slug: "choral-performing-arts",
    name: "Choral & Performing Arts",
    shortName: "Choral Arts",
    season: "Year-round",
    category: "Performing Arts",
    hue: CHORAL.hue,
    designationCode: CHORAL.code,
    blurb:
      "The full vocal hierarchy — varsity show choirs, concert choirs, chamber singers, and middle-school feeders.",
    about:
      "Operating out of Center Grove High School and Middle Schools Central and North, the choral program is organized by tier and gender composition — from elite competitive show choirs to introductory 6th-grade ensembles.",
    teams: [
      // CGHS Elite/Varsity
      t(CHORAL, { slug: "cg-sound-system", name: "CG Sound System", ageGroup: "Grades 9–12", coach: "Director Sheffield", blurb: "Premier co-ed varsity competitive show choir.", positions: VOICE_PARTS, grade: "9–12", gender: "mixed", count: 20, startIdx: 0 }),
      t(CHORAL, { slug: "the-debtones", name: "The Debtones", ageGroup: "Grades 9–12", coach: "Director Yates", blurb: "Premier all-female varsity competitive show choir.", positions: TREBLE_PARTS, grade: "9–12", gender: "f", count: 18, startIdx: 2 }),
      t(CHORAL, { slug: "surround-sound", name: "Surround Sound", ageGroup: "Grades 9–12", coach: "Director Sheffield", blurb: "Secondary competitive mixed show choir — elite development tier.", positions: VOICE_PARTS, grade: "9–12", gender: "mixed", count: 18, startIdx: 4 }),
      t(CHORAL, { slug: "the-accents", name: "The Accents", ageGroup: "Grades 9–12", coach: "Director Calloway", blurb: "Developmental all-female concert/show choir ensemble.", positions: TREBLE_PARTS, grade: "9–12", gender: "f", count: 16, startIdx: 6 }),
      t(CHORAL, { slug: "counterpoints", name: "Counterpoints", ageGroup: "Grades 9–12", coach: "Director Townsend", blurb: "Advanced select classical and chamber concert choir.", positions: VOICE_PARTS, grade: "9–12", gender: "mixed", count: 14, startIdx: 8 }),
      t(CHORAL, { slug: "descants", name: "Descants", ageGroup: "Grades 9–12", coach: "Director Calloway", blurb: "Intermediate concert choir focused on treble literature.", positions: TREBLE_PARTS, grade: "9–12", gender: "f", count: 16, startIdx: 10 }),
      t(CHORAL, { slug: "chamber-singers", name: "Chamber Singers", ageGroup: "Grades 9–12", coach: "Director Townsend", blurb: "Elite selective small ensemble — a cappella, madrigal, contemporary.", positions: VOICE_PARTS, grade: "9–12", gender: "mixed", count: 12, startIdx: 12 }),

      // MS Combined Show Choir
      t(CHORAL, { slug: "sound-fx", name: "Sound FX", ageGroup: "Grades 7–8", coach: "Director Crane", blurb: "Combined MS competitive show choir — top 7th & 8th graders from MS Central and MS North.", positions: VOICE_PARTS, grade: "7–8", gender: "mixed", count: 18, startIdx: 14 }),

      // MS Central
      t(CHORAL, { slug: "msc-6th-choir", name: "MS Central — 6th Grade Choir", ageGroup: "Grade 6", coach: "Director Whitlow", blurb: "Introductory concert ensemble.", positions: VOICE_PARTS, grade: "6th", gender: "mixed", count: 16, startIdx: 16 }),
      t(CHORAL, { slug: "msc-choralaliers", name: "MS Central — 7th Grade Choralaliers", ageGroup: "Grade 7", coach: "Director Whitlow", blurb: "Intermediate vocal group.", positions: VOICE_PARTS, grade: "7th", gender: "mixed", count: 16, startIdx: 18 }),
      t(CHORAL, { slug: "msc-8th-singers", name: "MS Central — 8th Grade Singers", ageGroup: "Grade 8", coach: "Director Whitlow", blurb: "Advanced middle school concert choir.", positions: VOICE_PARTS, grade: "8th", gender: "mixed", count: 16, startIdx: 20 }),

      // MS North
      t(CHORAL, { slug: "msn-6th-vocal", name: "MS North — 6th Grade Vocal Ensemble", ageGroup: "Grade 6", coach: "Director Beasley", blurb: "Introductory concert ensemble.", positions: VOICE_PARTS, grade: "6th", gender: "mixed", count: 16, startIdx: 22 }),
      t(CHORAL, { slug: "msn-northern-lights", name: "MS North — Northern Lights", ageGroup: "Grades 7–8", coach: "Director Beasley", blurb: "Select treble group.", positions: TREBLE_PARTS, grade: "7–8", gender: "f", count: 14, startIdx: 24 }),
      t(CHORAL, { slug: "msn-vocal-majority", name: "MS North — Vocal Majority", ageGroup: "Grades 7–8", coach: "Director Beasley", blurb: "Select bass/mixed group.", positions: VOICE_PARTS, grade: "7–8", gender: "mixed", count: 14, startIdx: 26 }),
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BASEBALL — CGYB
  // ──────────────────────────────────────────────────────────
  {
    slug: "cgyb-baseball",
    name: "Center Grove Youth Baseball (CGYB)",
    shortName: "Baseball",
    season: "Spring / Summer",
    category: "Athletics",
    hue: BB.hue,
    designationCode: BB.code,
    blurb:
      "Rec League (grade-based) plus Travel teams — T-ball through high school, segmented by exact age and diamond size.",
    about:
      "CGYB is the township's largest baseball program. Rec leagues run by grade level for developmental safety; Travel teams compete under the Center Grove Trojans select banner from 8U through 14U.",
    teams: [
      t(BB, { slug: "rookie-4-5", name: "Rookie 4/5", ageGroup: "Pre-K", coach: "Coach Bishop", blurb: "T-ball fundamentals.", positions: ["Infield", "Outfield", "Catcher"], grade: "Pre-K", count: 10, startIdx: 0 }),
      t(BB, { slug: "rookie-6", name: "Rookie 6", ageGroup: "Kindergarten", coach: "Coach Brooks", blurb: "Coach-pitch transition.", positions: ["Infield", "Outfield", "Pitcher", "Catcher"], grade: "K", count: 11, startIdx: 2 }),
      t(BB, { slug: "single-a", name: "Single A", ageGroup: "Grades 1–2", coach: "Coach Vance", blurb: "Machine-pitch league — put the ball in play.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "1st–2nd", count: 12, startIdx: 4 }),
      t(BB, { slug: "minors", name: "Minors", ageGroup: "Grades 3–4", coach: "Coach Faulkner", blurb: "First introduction to player-pitch.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "3rd–4th", count: 12, startIdx: 6 }),
      t(BB, { slug: "majors", name: "Majors", ageGroup: "Grades 5–6", coach: "Coach Whitaker", blurb: "Full rules, extended pitching distance.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "5th–6th", count: 13, startIdx: 8 }),
      t(BB, { slug: "seniors", name: "Seniors", ageGroup: "Grades 7–8", coach: "Coach Sutton", blurb: "Pre-high school prep on intermediate fields.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "7th–8th", count: 13, startIdx: 10 }),
      t(BB, { slug: "high-school-division", name: "High School Division", ageGroup: "Grades 9–12", coach: "Coach Mercer", blurb: "Rec league for older players not on the varsity roster.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"], grade: "9th–12th", count: 14, startIdx: 12 }),
      t(BB, { slug: "cg-travel-baseball", name: "CG Travel Baseball — Trojans Select", ageGroup: "8U–14U", coach: "Coach Knight", blurb: "Tryout-based travel under the Center Grove Trojans select banner.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "8U–14U", count: 13, startIdx: 14 }),
      // Nationals travel divisions
      t(BB, { slug: "8u-nationals", name: "8U Nationals", ageGroup: "8U", coach: "Coach Donovan", blurb: "Elite 8U travel — Trojans Nationals tryout roster.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF"], grade: "8U", count: 8, startIdx: 16 }),
      t(BB, { slug: "10u-nationals", name: "10U Nationals", ageGroup: "10U", coach: "Coach Pritchard", blurb: "Elite 10U travel — Trojans Nationals tryout roster.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF"], grade: "10U", count: 8, startIdx: 18 }),
      t(BB, { slug: "12u-nationals", name: "12U Nationals", ageGroup: "12U", coach: "Coach Sutton", blurb: "Elite 12U travel — Trojans Nationals tryout roster.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF"], grade: "12U", count: 8, startIdx: 20 }),
    ],
  },

  // ──────────────────────────────────────────────────────────
  // SOFTBALL — Lassie League + Diamonds
  // ──────────────────────────────────────────────────────────
  {
    slug: "lassie-league-softball",
    name: "Center Grove Lassie League (Softball)",
    shortName: "Softball",
    season: "Spring / Summer",
    category: "Athletics",
    hue: SB.hue,
    designationCode: SB.code,
    blurb:
      "Recreational fastpitch from 6U T-ball through 18U, plus the competitive CG Diamonds travel branch.",
    about:
      "Lassie League is the official girls' softball league of Center Grove. Tiered by exact age for developmental progression. The CG Diamonds branch spins out the competitive travel fastpitch teams.",
    teams: [
      t(SB, { slug: "6u", name: "6U Division", ageGroup: "Ages 5–6", coach: "Coach Reed", blurb: "T-ball / intro coach pitch.", positions: ["Infield", "Outfield"], grade: "K", gender: "f", count: 10, startIdx: 0 }),
      t(SB, { slug: "8u", name: "8U Division", ageGroup: "Ages 7–8", coach: "Coach Pace", blurb: "Machine pitch development.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "1st–2nd", gender: "f", count: 11, startIdx: 2 }),
      t(SB, { slug: "10u", name: "10U Division", ageGroup: "Ages 9–10", coach: "Coach Hayes", blurb: "Modified player pitch.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "3rd–4th", gender: "f", count: 12, startIdx: 4 }),
      t(SB, { slug: "12u", name: "12U Division", ageGroup: "Ages 11–12", coach: "Coach Ashford", blurb: "Fastpitch league play.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "5th–6th", gender: "f", count: 12, startIdx: 6 }),
      t(SB, { slug: "14u-18u-hs", name: "14U / 18U High School Senior", ageGroup: "Ages 13–18", coach: "Coach Hollister", blurb: "Rec leagues for high-school-aged players.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"], grade: "8th–12th", gender: "f", count: 14, startIdx: 8 }),
      t(SB, { slug: "cg-diamonds-travel", name: "CG Diamonds — Travel Fastpitch", ageGroup: "10U–18U", coach: "Coach Roush", blurb: "Official competitive travel fastpitch branch.", positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "10U–18U", gender: "f", count: 13, startIdx: 10 }),
    ],
  },

  // ──────────────────────────────────────────────────────────
  // FOOTBALL & CHEER — CGBFL
  // ──────────────────────────────────────────────────────────
  {
    slug: "cgbfl-football-cheer",
    name: "CGBFL — Football & Cheer",
    shortName: "Football & Cheer",
    season: "Fall",
    category: "Athletics",
    hue: FB.hue,
    designationCode: FB.code,
    blurb:
      "The Center Grove Bantam Football League — flag and tackle divisions plus rec and competition cheer squads.",
    about:
      "CGBFL is the foundational feeder system for Center Grove Trojan football, organized by grade-level division with associated cheer squads, plus the elite Junior Trojans travel team in the IEFA.",
    teams: [
      // Football
      t(FB, { slug: "flag-football", name: "Flag Football Division", ageGroup: "Grades K–2", coach: "Coach Bramble", blurb: "Field spacing and agility without contact.", positions: ["QB", "Receiver", "Rusher", "Center"], grade: "K–2nd", count: 14, startIdx: 0 }),
      t(FB, { slug: "bantam-pee-wee", name: "Bantam (Pee-Wee)", ageGroup: "Grade 3", coach: "Coach Walsh", blurb: "Introductory tackle — safe tackling and basic run formations.", positions: ["RB", "QB", "WR", "OL", "DL", "LB", "DB"], grade: "3rd", count: 18, startIdx: 4 }),
      t(FB, { slug: "minor", name: "Minor Division", ageGroup: "Grades 4–5", coach: "Coach Holloway", blurb: "Intermediate tackle — playbook, passing, specialized positions.", positions: ["RB", "QB", "WR", "OL", "DL", "LB", "DB", "TE"], grade: "4th–5th", count: 22, startIdx: 8 }),
      t(FB, { slug: "major", name: "Major Division", ageGroup: "Grade 6", coach: "Coach Knight", blurb: "Full-sized dimensions with high school alignment rules.", positions: ["RB", "QB", "WR", "OL", "DL", "LB", "DB", "TE", "K"], grade: "6th", count: 24, startIdx: 12 }),
      t(FB, { slug: "junior-trojans", name: "Junior Trojans (IEFA Travel)", ageGroup: "Grades 7–8", coach: "Coach Pritchard", blurb: "Ultra-elite middle-school travel football in the IEFA.", positions: ["RB", "QB", "WR", "OL", "DL", "LB", "DB", "TE", "K"], grade: "7th–8th", count: 26, startIdx: 16 }),
      // Cheer
      t(FB, { slug: "rec-cheer", name: "CGBFL Rec Cheer Squads", ageGroup: "Grades K–6", coach: "Coach Donovan", blurb: "Squads assigned to regular-season Bantam, Minor, and Major teams.", positions: ["Flyer", "Base", "Back Spot", "Front Spot"], grade: "K–6th", gender: "f", count: 18, startIdx: 0 }),
      t(FB, { slug: "competition-cheer", name: "CGBFL Competition Cheer", ageGroup: "Grades 3–8", coach: "Coach Trent", blurb: "Tryout-based competitive squad — statewide youth exhibitions.", positions: ["Flyer", "Base", "Back Spot", "Tumbler"], grade: "3rd–8th", gender: "f", count: 16, startIdx: 4 }),
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BASKETBALL — CGBBL / CGGBL
  // ──────────────────────────────────────────────────────────
  {
    slug: "cgbbl-basketball",
    name: "CGBBL / CGGBL — Boys & Girls Basketball",
    shortName: "Basketball",
    season: "Winter",
    category: "Athletics",
    hue: BSK.hue,
    designationCode: BSK.code,
    blurb:
      "The Trojan Recreational Division (graded leagues 1st–8th) plus tryout-only Travel teams in Indy Hoops and IGHL.",
    about:
      "CGBBL (boys) and CGGBL (girls) split basketball into a winter community rec format with grade-specific rules and a selective travel circuit competing statewide.",
    teams: [
      // Rec Trojan Division
      t(BSK, { slug: "rec-1st-grade", name: "Trojan Rec — 1st Grade League", ageGroup: "Grade 1", coach: "Coach Carter", blurb: "8-foot rims, no defensive pressure past half-court, scoring caps.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "1st", gender: "mixed", count: 10, startIdx: 0 }),
      t(BSK, { slug: "rec-2nd-grade", name: "Trojan Rec — 2nd Grade League", ageGroup: "Grade 2", coach: "Coach Pace", blurb: "9-foot rims, developmental rules.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "2nd", gender: "mixed", count: 10, startIdx: 2 }),
      t(BSK, { slug: "rec-3-4-grade", name: "Trojan Rec — 3rd & 4th Grade League", ageGroup: "Grades 3–4", coach: "Coach Reed", blurb: "10-foot standard rims — real game flow.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "3rd–4th", gender: "mixed", count: 10, startIdx: 4 }),
      t(BSK, { slug: "rec-5-6-grade", name: "Trojan Rec — 5th & 6th Grade League", ageGroup: "Grades 5–6", coach: "Coach Mercer", blurb: "7-minute periods, advanced officiating.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "5th–6th", gender: "mixed", count: 10, startIdx: 6 }),
      t(BSK, { slug: "rec-7-8-grade", name: "Trojan Rec — 7th & 8th Grade League", ageGroup: "Grades 7–8", coach: "Coach Bishop", blurb: "High school rules for players outside the formal MS school teams.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "7th–8th", gender: "mixed", count: 10, startIdx: 8 }),
      // Travel
      t(BSK, { slug: "boys-travel-indy-hoops", name: "Boys Travel — Indy Hoops", ageGroup: "Grades 4–8", coach: "Coach Knight", blurb: "Tryout-only travel in the Indy Hoops league.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "4th–8th", count: 11, startIdx: 10 }),
      t(BSK, { slug: "girls-travel-ighl", name: "Girls Travel — IGHL", ageGroup: "Grades 4–8", coach: "Coach Vance", blurb: "Tryout-only travel in the Indiana Girls Hoops League.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "4th–8th", gender: "f", count: 11, startIdx: 12 }),
      // Boys grade-specific CGBBL divisions
      t(BSK, { slug: "boys-4th-grade", name: "Boys 4th Grade", ageGroup: "Grade 4", coach: "Coach Holloway", blurb: "CGBBL boys 4th grade division roster.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "4th", count: 8, startIdx: 14 }),
      t(BSK, { slug: "boys-6th-grade", name: "Boys 6th Grade", ageGroup: "Grade 6", coach: "Coach Whitaker", blurb: "CGBBL boys 6th grade division roster.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "6th", count: 8, startIdx: 16 }),
      t(BSK, { slug: "boys-8th-grade", name: "Boys 8th Grade", ageGroup: "Grade 8", coach: "Coach Faulkner", blurb: "CGBBL boys 8th grade division roster.", positions: ["PG", "SG", "SF", "PF", "C"], grade: "8th", count: 8, startIdx: 18 }),
    ],
  },

  // ──────────────────────────────────────────────────────────
  // SOCCER — SCSA
  // ──────────────────────────────────────────────────────────
  {
    slug: "scsa-soccer",
    name: "South Central Soccer Academy (SCSA)",
    shortName: "Soccer",
    season: "Fall / Spring",
    category: "Athletics",
    hue: SOC.hue,
    designationCode: SOC.code,
    blurb:
      "One of Central Indiana's largest player bases — rec, TOPSoccer, Youth Academy, and tier-ranked SCSA Eleven travel teams.",
    about:
      "SCSA centralizes Center Grove soccer from U4 to U19, including a free TOPSoccer program for athletes with disabilities and the tier-ranked SCSA Eleven travel academy competing in the Indiana Soccer League.",
    teams: [
      t(SOC, { slug: "rec-soccer", name: "SCSA Rec Soccer", ageGroup: "U4–U19", coach: "Coach Faulkner", blurb: "Community division for all skill levels — teams named for global pro clubs.", positions: ["F", "M", "D", "GK"], grade: "Pre-K–12th", gender: "mixed", count: 14, startIdx: 0 }),
      t(SOC, { slug: "topsoccer", name: "TOPSoccer", ageGroup: "All ages", coach: "Coach Calloway", blurb: "Free recreational program for athletes with intellectual, emotional, or physical disabilities.", positions: ["Player", "Buddy"], grade: "All", gender: "mixed", count: 12, startIdx: 4 }),
      t(SOC, { slug: "youth-academy", name: "SCSA Youth Academy (U8–U10)", ageGroup: "U8–U10", coach: "Coach Whitaker", blurb: "Bridge program — technical footwork over outcomes.", positions: ["F", "M", "D", "GK"], grade: "K–4th", gender: "mixed", count: 14, startIdx: 8 }),
      t(SOC, { slug: "scsa-red", name: "SCSA Eleven — Red (Premier Travel)", ageGroup: "U11–U19", coach: "Coach Sutton", blurb: "Top-tier premier travel — ISL & Midwest Conference.", positions: ["F", "M", "D", "GK"], grade: "5th–12th", count: 16, startIdx: 12 }),
      t(SOC, { slug: "scsa-white", name: "SCSA Eleven — White (Competitive Travel)", ageGroup: "U11–U19", coach: "Coach Pritchard", blurb: "Secondary competitive travel.", positions: ["F", "M", "D", "GK"], grade: "5th–12th", count: 16, startIdx: 16 }),
      t(SOC, { slug: "scsa-black", name: "SCSA Eleven — Black (Select Travel)", ageGroup: "U11–U19", coach: "Coach Trent", blurb: "Select travel development.", positions: ["F", "M", "D", "GK"], grade: "5th–12th", count: 16, startIdx: 20 }),
    ],
  },

  // ──────────────────────────────────────────────────────────
  // AQUATICS — CGAC
  // ──────────────────────────────────────────────────────────
  {
    slug: "cgac-aquatics",
    name: "Center Grove Aquatics Club (CGAC)",
    shortName: "Aquatics",
    season: "Year-round",
    category: "Aquatics",
    hue: AQ.hue,
    designationCode: AQ.code,
    blurb:
      "Multi-tier swim program out of the high school natatorium — Lessons through Senior/Elite.",
    about:
      "CGAC operates year-round, ranking swimmers from entry-level stroke school through national-qualifying high school varsity athletes.",
    teams: [
      t(AQ, { slug: "lessons-stroke-school", name: "Lessons / Stroke School", ageGroup: "Ages 4–8", coach: "Coach Crane", blurb: "Entry-level technical instruction on the four strokes.", positions: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly"], grade: "Pre-K–2nd", gender: "mixed", count: 14, startIdx: 0 }),
      t(AQ, { slug: "white-group", name: "White Group", ageGroup: "Ages 7–10", coach: "Coach Tilford", blurb: "Introductory competitive group — endurance and legal turns.", positions: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "IM"], grade: "1st–4th", gender: "mixed", count: 16, startIdx: 4 }),
      t(AQ, { slug: "red-group", name: "Red Group", ageGroup: "Ages 9–12", coach: "Coach Quinlan", blurb: "Intermediate age-group competitive swimming.", positions: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "IM", "Relay"], grade: "3rd–6th", gender: "mixed", count: 16, startIdx: 8 }),
      t(AQ, { slug: "black-group", name: "Black Group", ageGroup: "Ages 11–14", coach: "Coach Yates", blurb: "Advanced age-group swimmers — sectional and state prep.", positions: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "IM", "Distance"], grade: "5th–8th", gender: "mixed", count: 16, startIdx: 12 }),
      t(AQ, { slug: "senior-elite", name: "Senior / Elite Group", ageGroup: "Ages 14–18", coach: "Coach Sheffield", blurb: "Highest tier — national-qualifying and varsity athletes at elite training volume.", positions: ["Sprint", "Mid-Distance", "Distance", "IM", "Relay"], grade: "9th–12th", gender: "mixed", count: 18, startIdx: 16 }),
    ],
  },
];

export const getCGOrg = (slug: string) => CG_ORGS.find((o) => o.slug === slug);
export const getCGTeam = (orgSlug: string, teamSlug: string) =>
  getCGOrg(orgSlug)?.teams.find((t) => t.slug === teamSlug);
export const getCGPlayer = (orgSlug: string, teamSlug: string, playerSlug: string) =>
  getCGTeam(orgSlug, teamSlug)?.players.find((p) => p.slug === playerSlug);
