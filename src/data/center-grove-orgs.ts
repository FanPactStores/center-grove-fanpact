/**
 * Center Grove Community Alliance — orgs, teams, and rosters.
 *
 * Hierarchy: Organization → Team (age group / squad) → Player.
 * Each level carries a stable `designationCode` so the backend can attribute and
 * allocate contributions automatically based on the buyer's selection.
 *
 *   org   → CGCA-{ORG}                   (org-only designation)
 *   team  → CGCA-{ORG}-{TEAM}            (team-level designation)
 *   player→ CGCA-{ORG}-{TEAM}-#{NUM}     (player-level designation)
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
  category: "Athletics" | "Performing Arts" | "STEM";
  blurb: string;
  about: string;
  hue: number; // for jersey swatch generation
  designationCode: string;
  teams: CGTeam[];
};

const swatch = (hue: number, offset: number) =>
  `oklch(0.34 0.08 ${(hue + offset * 8) % 360})`;

const FIRST_NAMES = [
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
  female?: boolean;
}): CGPlayer[] {
  const startIdx = opts.startIdx ?? 0;
  const pool = opts.female ? FIRST_NAMES_F : FIRST_NAMES;
  return Array.from({ length: opts.count }).map((_, i) => {
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

// ============================================================
// ORGANIZATIONS
// ============================================================

export const CG_ORGS: CGOrg[] = [
  {
    slug: "youth-football",
    name: "CG Youth Football",
    shortName: "Football",
    season: "Fall",
    category: "Athletics",
    hue: 30,
    designationCode: "CGCA-FB",
    blurb: "Tackle and flag football, Pee Wee through 8th grade. Trojan tradition starts here.",
    about: "Center Grove Youth Football is the official feeder program for Trojan football. Every contribution helps cover equipment, field rental, and travel for our community teams.",
    teams: [
      {
        slug: "8u-flag",
        name: "8U Flag",
        ageGroup: "Grades K–2",
        coach: "Coach Bramble",
        blurb: "First-down fundamentals — no contact, all fun.",
        designationCode: "CGCA-FB-8U",
        players: makePlayers({ count: 14, positions: ["Receiver", "Center", "Quarterback", "Rusher"], grade: "K–2", hue: 30, teamCode: "CGCA-FB-8U", startIdx: 0 }),
      },
      {
        slug: "10u-tackle",
        name: "10U Tackle",
        ageGroup: "Grades 3–4",
        coach: "Coach Walsh",
        blurb: "Pads on. The Trojan blocking scheme installed for real.",
        designationCode: "CGCA-FB-10U",
        players: makePlayers({ count: 22, positions: ["RB", "QB", "WR", "OL", "DL", "LB", "DB"], grade: "3–4", hue: 30, teamCode: "CGCA-FB-10U", startIdx: 4 }),
      },
      {
        slug: "12u-tackle",
        name: "12U Tackle",
        ageGroup: "Grades 5–6",
        coach: "Coach Knight",
        blurb: "Travel division. CGYFL champions three of the last five seasons.",
        designationCode: "CGCA-FB-12U",
        players: makePlayers({ count: 24, positions: ["RB", "QB", "WR", "OL", "DL", "LB", "DB", "TE"], grade: "5–6", hue: 30, teamCode: "CGCA-FB-12U", startIdx: 8 }),
      },
      {
        slug: "14u-tackle",
        name: "14U Tackle",
        ageGroup: "Grades 7–8",
        coach: "Coach Holloway",
        blurb: "Last stop before the high school program.",
        designationCode: "CGCA-FB-14U",
        players: makePlayers({ count: 26, positions: ["RB", "QB", "WR", "OL", "DL", "LB", "DB", "TE", "K"], grade: "7–8", hue: 30, teamCode: "CGCA-FB-14U", startIdx: 12 }),
      },
    ],
  },
  {
    slug: "youth-basketball",
    name: "CG Youth Basketball",
    shortName: "Basketball",
    season: "Winter",
    category: "Athletics",
    hue: 40,
    designationCode: "CGCA-BB",
    blurb: "Boys and girls hoops, K through 8th. Rec leagues and travel teams.",
    about: "Center Grove Youth Basketball serves over 600 kids each winter. Funds support gym time, uniforms, and tournament fees.",
    teams: [
      {
        slug: "boys-5th-travel",
        name: "Boys 5th Travel",
        ageGroup: "5th Grade",
        coach: "Coach Mercer",
        blurb: "Travel squad — Indy Heat Conference.",
        designationCode: "CGCA-BB-B5T",
        players: makePlayers({ count: 10, positions: ["PG", "SG", "SF", "PF", "C"], grade: "5th", hue: 40, teamCode: "CGCA-BB-B5T", startIdx: 2 }),
      },
      {
        slug: "boys-6th-travel",
        name: "Boys 6th Travel",
        ageGroup: "6th Grade",
        coach: "Coach Pace",
        blurb: "AAU-affiliated. Spring and summer schedule.",
        designationCode: "CGCA-BB-B6T",
        players: makePlayers({ count: 11, positions: ["PG", "SG", "SF", "PF", "C"], grade: "6th", hue: 40, teamCode: "CGCA-BB-B6T", startIdx: 6 }),
      },
      {
        slug: "girls-6th-travel",
        name: "Girls 6th Travel",
        ageGroup: "6th Grade",
        coach: "Coach Reed",
        blurb: "Defending IGSL champs.",
        designationCode: "CGCA-BB-G6T",
        players: makePlayers({ count: 10, positions: ["PG", "SG", "SF", "PF", "C"], grade: "6th", hue: 40, teamCode: "CGCA-BB-G6T", startIdx: 0, female: true }),
      },
      {
        slug: "boys-8th-travel",
        name: "Boys 8th Travel",
        ageGroup: "8th Grade",
        coach: "Coach Carter",
        blurb: "Pipeline to Trojan varsity.",
        designationCode: "CGCA-BB-B8T",
        players: makePlayers({ count: 12, positions: ["PG", "SG", "SF", "PF", "C"], grade: "8th", hue: 40, teamCode: "CGCA-BB-B8T", startIdx: 10 }),
      },
    ],
  },
  {
    slug: "little-league",
    name: "CG Little League Baseball",
    shortName: "Baseball",
    season: "Spring / Summer",
    category: "Athletics",
    hue: 90,
    designationCode: "CGCA-LL",
    blurb: "T-ball through Juniors. Chartered Little League — a Center Grove summer staple.",
    about: "CG Little League runs four divisions on six fields at the Bargersville complex. Contributions cover field maintenance and registration scholarships.",
    teams: [
      {
        slug: "tball-rookies",
        name: "Rookies (T-Ball)",
        ageGroup: "Ages 4–6",
        coach: "Coach Bishop",
        blurb: "Hit. Run. Smile. That's the whole curriculum.",
        designationCode: "CGCA-LL-RKS",
        players: makePlayers({ count: 12, positions: ["Infield", "Outfield", "Pitcher", "Catcher"], grade: "K–1st", hue: 90, teamCode: "CGCA-LL-RKS", startIdx: 14 }),
      },
      {
        slug: "minors-aaa",
        name: "Minors AAA",
        ageGroup: "Ages 9–10",
        coach: "Coach Brooks",
        blurb: "Kid-pitch, full diamond.",
        designationCode: "CGCA-LL-AAA",
        players: makePlayers({ count: 12, positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "3rd–4th", hue: 90, teamCode: "CGCA-LL-AAA", startIdx: 18 }),
      },
      {
        slug: "majors",
        name: "Majors",
        ageGroup: "Ages 11–12",
        coach: "Coach Vance",
        blurb: "All-Stars feed the District 9 tournament.",
        designationCode: "CGCA-LL-MAJ",
        players: makePlayers({ count: 13, positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"], grade: "5th–6th", hue: 90, teamCode: "CGCA-LL-MAJ", startIdx: 22 }),
      },
    ],
  },
  {
    slug: "youth-soccer",
    name: "CG Youth Soccer",
    shortName: "Soccer",
    season: "Fall / Spring",
    category: "Athletics",
    hue: 145,
    designationCode: "CGCA-SOC",
    blurb: "Recreational and travel club. US Youth Soccer affiliated.",
    about: "Center Grove Soccer Club serves Pre-K through high school with rec and travel programs.",
    teams: [
      {
        slug: "u8-rec",
        name: "U8 Recreational",
        ageGroup: "Ages 6–8",
        coach: "Coach Faulkner",
        blurb: "Saturday mornings at Bluff Park.",
        designationCode: "CGCA-SOC-U8R",
        players: makePlayers({ count: 12, positions: ["Forward", "Midfielder", "Defender", "Keeper"], grade: "K–2nd", hue: 145, teamCode: "CGCA-SOC-U8R", startIdx: 5 }),
      },
      {
        slug: "u11-travel",
        name: "U11 Travel",
        ageGroup: "Ages 9–11",
        coach: "Coach Whitaker",
        blurb: "ISL division, fall + spring league.",
        designationCode: "CGCA-SOC-U11T",
        players: makePlayers({ count: 14, positions: ["F", "M", "D", "GK"], grade: "4th–5th", hue: 145, teamCode: "CGCA-SOC-U11T", startIdx: 9 }),
      },
      {
        slug: "u13-girls-travel",
        name: "U13 Girls Travel",
        ageGroup: "Ages 12–13",
        coach: "Coach Sutton",
        blurb: "ISL Premier, top-flight competition.",
        designationCode: "CGCA-SOC-U13G",
        players: makePlayers({ count: 16, positions: ["F", "M", "D", "GK"], grade: "6th–7th", hue: 145, teamCode: "CGCA-SOC-U13G", startIdx: 4, female: true }),
      },
    ],
  },
  {
    slug: "trojan-wrestling",
    name: "Trojan Wrestling Club",
    shortName: "Wrestling",
    season: "Winter",
    category: "Athletics",
    hue: 15,
    designationCode: "CGCA-WR",
    blurb: "Folkstyle club program for elementary and middle-school wrestlers.",
    about: "Trojan Wrestling Club is the year-round feeder for Center Grove's nationally-ranked high school program.",
    teams: [
      {
        slug: "elementary",
        name: "Elementary Squad",
        ageGroup: "Grades K–4",
        coach: "Coach Donovan",
        blurb: "Stance, motion, level changes. The basics, on repeat.",
        designationCode: "CGCA-WR-ELEM",
        players: makePlayers({ count: 18, positions: ["45 lb", "55 lb", "65 lb", "75 lb", "85 lb", "100 lb"], grade: "K–4th", hue: 15, teamCode: "CGCA-WR-ELEM", startIdx: 7 }),
      },
      {
        slug: "middle-school",
        name: "Middle School Squad",
        ageGroup: "Grades 5–8",
        coach: "Coach Pritchard",
        blurb: "Travel division — Super 32 qualifiers train here.",
        designationCode: "CGCA-WR-MS",
        players: makePlayers({ count: 22, positions: ["95 lb", "105 lb", "115 lb", "125 lb", "135 lb", "145 lb", "160 lb", "190 lb", "HWT"], grade: "5th–8th", hue: 15, teamCode: "CGCA-WR-MS", startIdx: 11 }),
      },
    ],
  },
  {
    slug: "youth-lacrosse",
    name: "CG Youth Lacrosse",
    shortName: "Lacrosse",
    season: "Spring",
    category: "Athletics",
    hue: 200,
    designationCode: "CGCA-LAX",
    blurb: "Boys and girls lacrosse, K through 8th grade.",
    about: "Center Grove Lacrosse is the official IBLA / IGLA affiliated club for the township.",
    teams: [
      {
        slug: "boys-u11",
        name: "Boys U11",
        ageGroup: "Grades 4–5",
        coach: "Coach Trent",
        blurb: "IBLA Bronze division.",
        designationCode: "CGCA-LAX-BU11",
        players: makePlayers({ count: 18, positions: ["Attack", "Midfield", "Defense", "Goalie"], grade: "4th–5th", hue: 200, teamCode: "CGCA-LAX-BU11", startIdx: 3 }),
      },
      {
        slug: "girls-u13",
        name: "Girls U13",
        ageGroup: "Grades 6–7",
        coach: "Coach Calloway",
        blurb: "IGLA travel, spring schedule.",
        designationCode: "CGCA-LAX-GU13",
        players: makePlayers({ count: 16, positions: ["Attack", "Midfield", "Defense", "Goalie"], grade: "6th–7th", hue: 200, teamCode: "CGCA-LAX-GU13", startIdx: 13, female: true }),
      },
    ],
  },
  {
    slug: "bands-performing-arts",
    name: "CG Bands & Performing Arts",
    shortName: "Performing Arts",
    season: "Year-round",
    category: "Performing Arts",
    hue: 290,
    designationCode: "CGCA-BPA",
    blurb: "Marching band, jazz, color guard, and theatre boosters.",
    about: "Center Grove Bands & Performing Arts supports the Sound of Center Grove marching band — eight-time BOA finalist — plus jazz ensembles, choir, and theatre.",
    teams: [
      {
        slug: "marching-band",
        name: "Sound of Center Grove",
        ageGroup: "Grades 9–12",
        coach: "Director Sheffield",
        blurb: "Competitive marching band — fall finals season.",
        designationCode: "CGCA-BPA-MB",
        players: makePlayers({ count: 24, positions: ["Brass", "Woodwind", "Percussion", "Color Guard", "Drum Major"], grade: "9th–12th", hue: 290, teamCode: "CGCA-BPA-MB", startIdx: 1 }),
      },
      {
        slug: "middle-school-band",
        name: "Middle School Concert Band",
        ageGroup: "Grades 6–8",
        coach: "Director Bramble",
        blurb: "Foundation program for SoCG.",
        designationCode: "CGCA-BPA-MS",
        players: makePlayers({ count: 22, positions: ["Brass", "Woodwind", "Percussion"], grade: "6th–8th", hue: 290, teamCode: "CGCA-BPA-MS", startIdx: 17 }),
      },
      {
        slug: "theatre-boosters",
        name: "Theatre Boosters",
        ageGroup: "All ages",
        coach: "Director Yates",
        blurb: "Two mainstage productions a year + the spring musical.",
        designationCode: "CGCA-BPA-THTR",
        players: makePlayers({ count: 14, positions: ["Cast", "Crew", "Pit", "Tech"], grade: "9th–12th", hue: 290, teamCode: "CGCA-BPA-THTR", startIdx: 20, female: true }),
      },
    ],
  },
  {
    slug: "robotics",
    name: "CG Robotics",
    shortName: "Robotics",
    season: "Year-round",
    category: "STEM",
    hue: 240,
    designationCode: "CGCA-ROB",
    blurb: "FIRST Robotics teams — FLL, FTC, and FRC.",
    about: "Center Grove Robotics fields competitive teams at every FIRST level. Contributions fund parts, travel, and the Trojan robotics shop.",
    teams: [
      {
        slug: "fll-elementary",
        name: "FLL Explore (Elementary)",
        ageGroup: "Grades K–4",
        coach: "Coach Crane",
        blurb: "Lego-based intro robotics.",
        designationCode: "CGCA-ROB-FLL",
        players: makePlayers({ count: 12, positions: ["Builder", "Programmer", "Strategy", "Presenter"], grade: "K–4th", hue: 240, teamCode: "CGCA-ROB-FLL", startIdx: 8 }),
      },
      {
        slug: "ftc-middle",
        name: "FTC (Middle School)",
        ageGroup: "Grades 5–8",
        coach: "Coach Tilford",
        blurb: "FIRST Tech Challenge — competition season Nov–Apr.",
        designationCode: "CGCA-ROB-FTC",
        players: makePlayers({ count: 15, positions: ["Builder", "Programmer", "CAD", "Driver", "Outreach"], grade: "5th–8th", hue: 240, teamCode: "CGCA-ROB-FTC", startIdx: 14 }),
      },
      {
        slug: "frc-team-1741",
        name: "FRC Team 1741 — Red Alert",
        ageGroup: "Grades 9–12",
        coach: "Coach Quinlan",
        blurb: "Center Grove's flagship FRC team. Indiana Regional veterans.",
        designationCode: "CGCA-ROB-FRC",
        players: makePlayers({ count: 20, positions: ["Mechanical", "Electrical", "Programming", "CAD", "Drive Team", "Business"], grade: "9th–12th", hue: 240, teamCode: "CGCA-ROB-FRC", startIdx: 0 }),
      },
    ],
  },
];

export const getCGOrg = (slug: string) => CG_ORGS.find((o) => o.slug === slug);
export const getCGTeam = (orgSlug: string, teamSlug: string) =>
  getCGOrg(orgSlug)?.teams.find((t) => t.slug === teamSlug);
export const getCGPlayer = (orgSlug: string, teamSlug: string, playerSlug: string) =>
  getCGTeam(orgSlug, teamSlug)?.players.find((p) => p.slug === playerSlug);
