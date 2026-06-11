import type { StoreId } from "./stores";

export type EventCategory = "Sports Camp" | "Community Event" | "FanPact Community Event";
export type EventKind = "camp" | "army" | "fanpact";

export type StoreEvent = {
  slug: string;
  store: StoreId;
  name: string;
  subtitle: string;
  date: string; // display
  isoDate: string; // sortable YYYY-MM-DD (start date)
  time: string;
  location: string;
  alternateVenue?: string;
  category: EventCategory;
  kind: EventKind;
  tag: string;
  ages?: string;
  description: string;
  whatToExpect: string[];
  whatLabel?: string; // default "What to Expect"
  tuition?: string;
  addOns?: string;
  fanPactNote?: string;
  creditCallout?: string;
  registration?: string;
  presentedBy?: string;
  registerHref: string;
  registerLabel?: string;
};

const POWERUP_RECEIVE = [
  "Pro-level instruction and position-specific training",
  "S2 Cognition Core Test and baseball drills",
  "Sports vision assessment and exposure",
  "Full data collection of player metrics",
  "OptikAI VR training on Apple Vision Pro",
  "College and pro recruiting insight from former big leaguers and front office executives",
];

const ARMY_EXPECT = [
  "Army Physical Fitness Challenge stations open to all ages 13 and up",
  "Meet and Q&A with active duty soldiers and local USAREC recruiters",
  "Army career and education benefits information stations",
  "FanPact enrollment station — activate your Team Card on site",
  "Top 3 finishers per division earn Army challenge coins and FanPact credits",
];

export const EVENTS: StoreEvent[] = [
  // BUTLER
  {
    slug: "bulldogs-serve-challenge",
    store: "butler",
    name: "Bulldogs Serve Challenge",
    subtitle: "U.S. Army Recruiting Command × Butler Athletics",
    date: "September 10, 2026",
    isoDate: "2026-09-10",
    time: "10:00 AM – 2:00 PM",
    location: "Hinkle Fieldhouse, Butler University, Indianapolis, IN",
    category: "Community Event",
    kind: "army",
    tag: "ARMY PARTNER EVENT",
    description:
      "Think you have what it takes? The Bulldogs Serve Challenge is a one-day physical fitness competition and career exploration event hosted by the U.S. Army Recruiting Command at Hinkle Fieldhouse. Athletes, students, and fans of all fitness levels are welcome. Compete in timed challenges, earn prizes, meet active-duty soldiers and USAREC recruiters, and discover the education benefits and career pathways available through Army service. All participants earn a $25 FanPact community credit. Top finishers in each age division earn a $75 FanPact credit.",
    whatToExpect: ARMY_EXPECT,
    registration: "Free — register through FanPact or at the door",
    presentedBy: "U.S. Army Recruiting Command in partnership with Butler Athletics and FanPact",
    creditCallout:
      "$25 FanPact community credit for all participants. $75 for division top finishers. Credits applied to your Butler Athletics community fund.",
    registerHref: "/butler/events/bulldogs-serve-challenge",
    registerLabel: "Register Free",
  },
  {
    slug: "powerup-elite-camp-butler",
    store: "butler",
    name: "PowerUp Elite Performance Intensive — Indianapolis",
    subtitle: "Led by Danny Espinosa & Zach Lutz | Former MLB Players",
    date: "August 14–16, 2026",
    isoDate: "2026-08-14",
    time: "9:00 AM – 1:00 PM Daily",
    location: "Butler University Recreation Complex, Indianapolis, IN",
    category: "Sports Camp",
    kind: "camp",
    tag: "ELITE PERFORMANCE CAMP",
    ages: "13–18",
    description:
      "PowerUp Sports presents the Elite Performance Intensive — a 3-day immersive baseball and athletic performance camp led by former MLB players Danny Espinosa (OC Crush Baseball) and Zach Lutz (LutzGO). Athletes receive pro-level instruction, position-specific training, and performance data collection in an elite training environment.",
    whatToExpect: POWERUP_RECEIVE,
    whatLabel: "What Athletes Receive",
    tuition: "$495 (early bird through Aug 1) / $595 standard",
    addOns: "+$150 Development Plan | +$100 S2 Pro Test Upgrade",
    fanPactNote:
      "Register through your FanPact account and 60% of the net camp fee contribution flows to your designated Butler Athletics fund.",
    registerHref: "https://powerupsports.org",
  },
  {
    slug: "fanpact-enrollment-night-butler",
    store: "butler",
    name: "FanPact Enrollment Night — Butler Athletics",
    subtitle: "Activate Your Team Card. Support the Bulldogs.",
    date: "August 28, 2026",
    isoDate: "2026-08-28",
    time: "6:00 PM – 8:00 PM",
    location: "Hinkle Fieldhouse Lobby, Indianapolis, IN",
    category: "FanPact Community Event",
    kind: "fanpact",
    tag: "FANPACT EVENT",
    description:
      "Join us for an evening of community, conversation, and commerce. Activate your Butler Bulldogs FanPact Team Card, meet fellow Bulldog supporters, and learn how every household purchase you already make supports Butler Athletics NIL. Light refreshments provided. First 50 families to activate their Team Card receive a $50 FanPact community credit.",
    whatToExpect: [
      "FanPact Team Card activation station",
      "One-on-one enrollment support",
      "Butler Athletics NIL program overview",
      "Enterprise sponsor information — USAREC, Edward Jones, Merrill Lynch, State Farm",
      "First 50 activations earn $50 credit",
    ],
    registration: "Free admission — open to all Butler fans and families",
    creditCallout: "First 50 families to activate their Team Card receive a $50 FanPact community credit.",
    registerHref: "/butler/team-card",
    registerLabel: "Register Free",
  },

  // CENTER GROVE
  {
    slug: "powerup-elite-camp-center-grove",
    store: "center-grove",
    name: "PowerUp Elite Performance Intensive — Greenwood",
    subtitle: "Led by Danny Espinosa & Zach Lutz | Former MLB Players",
    date: "July 21–23, 2026",
    isoDate: "2026-07-21",
    time: "9:00 AM – 1:00 PM Daily",
    location: "Center Grove High School Athletic Complex, Greenwood, IN",
    category: "Sports Camp",
    kind: "camp",
    tag: "ELITE PERFORMANCE CAMP",
    ages: "13–18",
    description:
      "PowerUp Sports brings the Elite Performance Intensive to Johnson County — a 3-day baseball and athletic performance camp led by former MLB players Danny Espinosa and Zach Lutz. Limited spots available for Center Grove community athletes.",
    whatToExpect: POWERUP_RECEIVE,
    whatLabel: "What Athletes Receive",
    tuition: "$495 early bird through July 7 / $595 standard",
    addOns: "+$150 Development Plan | +$100 S2 Pro Test Upgrade",
    fanPactNote:
      "Register through your FanPact account and 60% of the net camp fee contribution flows to your designated Center Grove community fund.",
    registerHref: "https://powerupsports.org",
  },
  {
    slug: "army-fit-challenge-center-grove",
    store: "center-grove",
    name: "Johnson County Serve Challenge",
    subtitle: "U.S. Army Recruiting Command × Center Grove Community Alliance",
    date: "October 4, 2026",
    isoDate: "2026-10-04",
    time: "9:00 AM – 1:00 PM",
    location: "Center Grove High School Stadium, Greenwood, IN",
    category: "Community Event",
    kind: "army",
    tag: "ARMY PARTNER EVENT",
    description:
      "The Johnson County Serve Challenge brings the U.S. Army Recruiting Command to Center Grove for a morning of fitness, community, and career exploration. Open to athletes aged 13 and up, parents, and community supporters. All participants earn a $25 FanPact community credit for their designated player or team.",
    whatToExpect: ARMY_EXPECT,
    registration: "Free — register through FanPact or at the door",
    creditCallout:
      "$25 FanPact community credit for all participants. Credits applied to your Center Grove Alliance fund.",
    presentedBy: "U.S. Army Recruiting Command in partnership with Center Grove Community Alliance and FanPact",
    registerHref: "/center-grove/events/army-fit-challenge-center-grove",
    registerLabel: "Register Free",
  },
  {
    slug: "fanpact-enrollment-night-center-grove",
    store: "center-grove",
    name: "FanPact Family Night — Center Grove Alliance",
    subtitle: "Enroll. Designate. Start Earning for Your Athlete.",
    date: "September 18, 2026",
    isoDate: "2026-09-18",
    time: "6:30 PM – 8:30 PM",
    location: "Center Grove Middle School Central Cafeteria, Greenwood, IN",
    category: "FanPact Community Event",
    kind: "fanpact",
    tag: "FANPACT EVENT",
    description:
      "Bring the family and learn how the Center Grove Community Alliance FanPact storefront turns your everyday household shopping into verified contributions for your athlete's program. Activate your Team Card on site. First 75 families to activate earn a $50 FanPact community credit.",
    whatToExpect: [
      "FanPact Team Card activation station",
      "One-on-one enrollment support",
      "Center Grove Alliance program overview",
      "Enterprise sponsor information stations",
      "First 75 activations earn $50 credit",
    ],
    registration: "Free admission — all Center Grove families welcome",
    creditCallout: "First 75 families to activate their Team Card earn a $50 FanPact community credit.",
    registerHref: "/center-grove/team-card",
    registerLabel: "Register Free",
  },

  // LEGACY
  {
    slug: "powerup-elite-camp-stl",
    store: "legacy",
    name: "PowerUp Elite Performance Intensive — St. Louis",
    subtitle: "Led by Danny Espinosa & Zach Lutz | Former MLB Players",
    date: "August 7–9, 2026",
    isoDate: "2026-08-07",
    time: "9:00 AM – 1:00 PM Daily",
    location: "Chesterfield Athletic Complex, Chesterfield, MO",
    category: "Sports Camp",
    kind: "camp",
    tag: "ELITE PERFORMANCE CAMP",
    ages: "13–18",
    description:
      "PowerUp Sports brings the Elite Performance Intensive to the St. Louis market — 3 days of pro-level baseball training led by Danny Espinosa and Zach Lutz at Chesterfield Athletic Complex. Legacy Performance Academy and Klutch Youth athletes receive priority registration.",
    whatToExpect: POWERUP_RECEIVE,
    whatLabel: "What Athletes Receive",
    tuition: "$495 early bird through July 24 / $595 standard",
    addOns: "+$150 Development Plan | +$100 S2 Pro Test Upgrade",
    fanPactNote:
      "Register through your FanPact account and 60% of the net camp fee flows to your Legacy Performance Academy community fund.",
    registerHref: "https://powerupsports.org",
  },
  {
    slug: "fanpact-enrollment-night-legacy",
    store: "legacy",
    name: "Legacy Performance Academy FanPact Kickoff Night",
    subtitle: "Activate Your Card. Fund Your Athlete.",
    date: "September 6, 2026",
    isoDate: "2026-09-06",
    time: "6:00 PM – 8:00 PM",
    location: "Chesterfield Valley Athletic Complex, Chesterfield, MO",
    category: "FanPact Community Event",
    kind: "fanpact",
    tag: "FANPACT EVENT",
    description:
      "Join Legacy Performance Academy and Klutch Youth Baseball families for the official FanPact storefront kickoff. Activate your Legacy FanPact Team Card, designate your athlete, and learn how the platform turns household purchases into verified community contributions. First 60 families to activate earn a $50 FanPact community credit.",
    whatToExpect: [
      "FanPact Team Card activation station",
      "Athlete designation walkthrough",
      "Legacy & Klutch program overview",
      "First 60 activations earn $50 credit",
    ],
    registration: "Free admission — Legacy and Klutch families welcome",
    creditCallout: "First 60 families to activate earn a $50 FanPact community credit.",
    registerHref: "/legacy/team-card",
    registerLabel: "Register Free",
  },

  // ASSA
  {
    slug: "powerup-elite-camp-assa",
    store: "assa",
    name: "PowerUp Elite Performance Intensive — Philadelphia Region",
    subtitle: "Led by Danny Espinosa & Zach Lutz | Former MLB Players",
    date: "August 21–23, 2026",
    isoDate: "2026-08-21",
    time: "9:00 AM – 1:00 PM Daily",
    location: "Ripken Experience Myrtle Beach — Philadelphia Regional Qualifier",
    alternateVenue: "West Chester University Athletic Fields, West Chester, PA",
    category: "Sports Camp",
    kind: "camp",
    tag: "ELITE PERFORMANCE CAMP",
    ages: "13–18",
    description:
      "PowerUp Sports comes to the Philadelphia region for the Elite Performance Intensive — 3 days of pro-level training with Danny Espinosa and Zach Lutz. ASSA Combat families across all eight hubs receive priority registration. Limited spots available across PA and NJ markets.",
    whatToExpect: POWERUP_RECEIVE,
    whatLabel: "What Athletes Receive",
    tuition: "$495 early bird through August 7 / $595 standard",
    addOns: "+$150 Development Plan | +$100 S2 Pro Test Upgrade",
    fanPactNote:
      "Register through your FanPact account and 60% of the net camp fee flows to your ASSA hub community fund.",
    registerHref: "https://powerupsports.org",
  },
  {
    slug: "fanpact-enrollment-night-assa",
    store: "assa",
    name: "All-Star Sports Academy FanPact Hub Night",
    subtitle: "Eight Hubs. One Platform. Every Purchase Counts.",
    date: "September 12, 2026",
    isoDate: "2026-09-12",
    time: "6:00 PM – 8:00 PM",
    location: "West Chester Sport & Health, West Chester, PA",
    category: "FanPact Community Event",
    kind: "fanpact",
    tag: "FANPACT EVENT",
    description:
      "ASSA families from all eight regional hubs are invited to the official FanPact platform launch night. Activate your ASSA Team Card, designate your hub or specific athlete, and see how everyday household purchasing generates verified community contributions across the entire ASSA network. Hub coordinators from all eight locations will be present. First 100 families to activate earn a $50 FanPact community credit.",
    whatToExpect: [
      "FanPact Team Card activation station",
      "Hub & athlete designation support",
      "Eight-hub coordinator panel",
      "First 100 activations earn $50 credit",
    ],
    registration: "Free admission — all ASSA hub families welcome",
    creditCallout: "First 100 families to activate earn a $50 FanPact community credit.",
    registerHref: "/assa/team-card",
    registerLabel: "Register Free",
  },
];

export function eventsForStore(store: StoreId): StoreEvent[] {
  return EVENTS.filter((e) => e.store === store).sort((a, b) => a.isoDate.localeCompare(b.isoDate));
}

export function getEvent(store: StoreId, slug: string): StoreEvent | undefined {
  return EVENTS.find((e) => e.store === store && e.slug === slug);
}

export function isPast(e: StoreEvent, now = new Date()): boolean {
  return new Date(e.isoDate) < new Date(now.toDateString());
}
