import { Link } from "@tanstack/react-router";
import { ArrowRight, Star, LineChart, ShieldCheck, TrendingUp, Mail, type LucideIcon } from "lucide-react";
import type { StoreConfig } from "@/data/stores";

const NAVY = "#13294B";
const GOLD = "#BA7517";

type LocalBiz = {
  name: string;
  category: string;
  location: string;
  description: string;
};

type StoreLocalData = {
  city: string;
  businesses: LocalBiz[];
};

const LOCAL_BY_STORE: Record<string, StoreLocalData> = {
  butler: {
    city: "Indianapolis",
    businesses: [
      { name: "Shapiro's Delicatessen", category: "Restaurant", location: "Indianapolis, IN", description: "Indianapolis institution since 1905. Deli, bakery, and community landmark near Butler's campus." },
      { name: "Slippery Noodle Inn", category: "Live Music & Bar", location: "Indianapolis, IN", description: "Indiana's oldest bar and one of the nation's premier blues venues." },
      { name: "Sun King Brewery", category: "Brewery", location: "Indianapolis, IN", description: "Indianapolis-founded craft brewery — proud community partner." },
      { name: "Bazbeaux Pizza", category: "Restaurant", location: "Indianapolis, IN", description: "Legendary Broad Ripple pizza institution beloved by generations of Butler fans." },
    ],
  },
  "center-grove": {
    city: "Greenwood",
    businesses: [
      { name: "Taxman Brewing Company", category: "Brewery", location: "Bargersville, IN", description: "Johnson County's premier craft brewery — locally rooted and community proud." },
      { name: "Jonathan Byrd's", category: "Restaurant & Catering", location: "Greenwood, IN", description: "A Johnson County landmark. Family dining, catering, and community events since 1948." },
      { name: "Just Pop In!", category: "Snacks & Gifts", location: "Greenwood, IN", description: "Greenwood's favorite gourmet popcorn and snack shop — perfect for game day." },
      { name: "Johnson County Orthodontics", category: "Orthodontics", location: "Greenwood, IN", description: "Serving Center Grove families with braces, Invisalign, and confident smiles." },
    ],
  },
  legacy: {
    city: "Chesterfield",
    businesses: [
      { name: "Sugarfire Smoke House", category: "BBQ Restaurant", location: "Chesterfield, MO", description: "St. Louis BBQ institution with multiple locations — legendary smoked meats and community spirit." },
      { name: "Dierbergs Markets", category: "Grocery", location: "Chesterfield, MO", description: "St. Louis regional grocery institution. Use your FanPact card for card-linked offer credits on every visit." },
      { name: "Purina Farms", category: "Family Attraction", location: "Gray Summit, MO", description: "Nestled near Chesterfield — pet lovers and families welcome. Proud Purina community partner." },
      { name: "Chesterfield Orthodontics", category: "Orthodontics", location: "Chesterfield, MO", description: "Trusted by Legacy Performance Academy families throughout west St. Louis County." },
    ],
  },
  assa: {
    city: "the Main Line",
    businesses: [
      { name: "Tired Hands Brewing Company", category: "Brewery", location: "Ardmore, PA", description: "Philadelphia's beloved farmhouse brewery — a destination for ASSA families across the Main Line." },
      { name: "Iron Hill Brewery", category: "Restaurant & Brewery", location: "West Chester, PA", description: "West Chester's cornerstone gathering place — craft beer, great food, community first." },
      { name: "Main Line Health", category: "Healthcare", location: "Bryn Mawr, PA", description: "The Philadelphia region's leading community health system — serving ASSA families across all eight hubs." },
      { name: "Wawa", category: "Convenience & Food", location: "Regional — PA & NJ", description: "The iconic Philadelphia-area convenience store. Your FanPact Team Card earns card-linked offer credits at every Wawa location." },
    ],
  },
};

const NATIONAL_BRANDS = [
  { name: "Nike", category: "Athletic Apparel" },
  { name: "Gatorade", category: "Sports Nutrition" },
  { name: "Under Armour", category: "Athletic Apparel" },
  { name: "Oakley", category: "Eyewear & Accessories" },
  { name: "Purina", category: "Pet Nutrition" },
  { name: "Tide", category: "Household Essentials" },
  { name: "Rawlings", category: "Baseball & Softball Equipment" },
  { name: "Easton", category: "Baseball & Softball Equipment" },
];

type Premier = {
  slug: string;
  name: string;
  label: string;
  category: string;
  description: string;
  tags: string[];
  Icon: LucideIcon;
};

const PREMIER: Premier[] = [
  {
    slug: "usarec",
    name: "U.S. Army Recruiting Command",
    label: "Federal / National",
    category: "Military & Career Development",
    description:
      "USAREC connects the next generation of leaders with careers, education, and benefits through Active Duty, Reserve, and Officer pathways. Earn up to $575 in community credits.",
    tags: ["Reserve Recruitment", "ROTC Scholarships", "Career Pathways", "Up to $575 Credits"],
    Icon: Star,
  },
  {
    slug: "edward-jones",
    name: "Edward Jones",
    label: "National (HQ: St. Louis)",
    category: "Financial Services & Wealth Management",
    description:
      "From 529 college savings to NIL retirement strategies — Edward Jones advisors serve every member of the FanPact community. Sports and Entertainment certified advisors available. Earn up to $500 in community credits.",
    tags: ["529 College Savings", "NIL to Retirement", "Investment Accounts", "Up to $500 Credits"],
    Icon: TrendingUp,
  },
  {
    slug: "merrill-lynch",
    name: "Merrill Lynch",
    label: "National",
    category: "College Savings & Investment",
    description:
      "Turn FanPact community credits into tax-free college savings. Merrill Lynch 529 accounts link directly to your FanPact wallet — the grocery run funds college. Earn up to $475 in community credits.",
    tags: ["529 Integration", "Tax-Free Growth", "FanPact Wallet Link", "Up to $475 Credits"],
    Icon: LineChart,
  },
  {
    slug: "state-farm",
    name: "State Farm",
    label: "National",
    category: "Insurance & Community",
    description:
      "Your neighbor. Your agent. Your coverage. State Farm local agents serve youth sports families with auto, home, life, and umbrella coverage — built for active families. Earn up to $450 in community credits.",
    tags: ["Free Coverage Review", "Local Agent", "Sports Family Coverage", "Up to $450 Credits"],
    Icon: ShieldCheck,
  },
];

type Props = { store: StoreConfig };

export function UnifiedSponsorsPage({ store }: Props) {
  const local = LOCAL_BY_STORE[store.id];
  const shopTo =
    store.id === "butler" ? "/butler/shop" :
    store.id === "center-grove" ? "/center-grove/shop" :
    store.id === "legacy" ? "/legacy/shop" : "/assa/shop";

  const sponsorBase = `${store.basePath}/sponsors`;

  return (
    <main className="bg-[var(--surface)]">
      {/* HEADER */}
      <section style={{ background: NAVY }} className="text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="text-xs uppercase tracking-[0.25em]" style={{ color: GOLD }}>
            FanPact Commercial Ecosystem
          </div>
          <h1 className="mt-3 font-display text-4xl tracking-tight lg:text-6xl">
            Sponsors, Partners & Brands
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            The commercial ecosystem powering {store.shortName} and the FanPact community.
          </p>
        </div>
      </section>

      {/* STICKY ANCHOR NAV */}
      <nav className="sticky top-0 z-30 border-y border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-3 lg:px-8">
          {[
            { id: "national-brands", label: "National Brands" },
            { id: "local-partners", label: "Local Partners" },
            { id: "enterprise-partners", label: "Enterprise Partners" },
            { id: "become-a-partner", label: "Become a Partner" },
          ].map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-[#13294B] hover:text-[#13294B]"
            >
              {a.label}
            </a>
          ))}
        </div>
      </nav>

      {/* SECTION 1 — NATIONAL BRANDS */}
      <section id="national-brands" className="scroll-mt-24 border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl tracking-tight lg:text-4xl" style={{ color: NAVY }}>
              National Brand Partners
            </h2>
            <p className="mt-3 text-muted-foreground">
              Shop products from our official brand partners — every purchase generates a verified community contribution.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {NATIONAL_BRANDS.map((b) => (
              <div key={b.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="font-display text-2xl tracking-tight" style={{ color: NAVY }}>{b.name}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{b.category}</div>
                <Link
                  to={shopTo}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: NAVY }}
                >
                  Shop Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — LOCAL PARTNERS */}
      <section id="local-partners" className="scroll-mt-24 border-b border-border" style={{ background: "#F6F4EE" }}>
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl tracking-tight lg:text-4xl" style={{ color: NAVY }}>
              Local Business Partners
            </h2>
            <p className="mt-3 text-muted-foreground">
              Supporting local businesses in our community. Use your FanPact Team Card for verified card-linked offer credits.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {local.businesses.map((b) => (
              <div key={b.name} className="rounded-2xl border border-border bg-white p-7">
                <div className="font-display text-2xl tracking-tight" style={{ color: NAVY }}>{b.name}</div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-muted-foreground">
                  <span>{b.category}</span>
                  <span className="text-border">•</span>
                  <span>{b.location}</span>
                </div>
                <p className="mt-4 text-sm text-foreground/80">{b.description}</p>
                <a
                  href="#become-a-partner"
                  className="mt-5 inline-flex items-center gap-2 rounded-md border border-[#13294B] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#13294B] hover:text-white"
                  style={{ color: NAVY }}
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Interested in becoming a local partner? See the Become a Partner section below.
          </p>
        </div>
      </section>

      {/* SECTION 3 — ENTERPRISE PARTNERS */}
      <section id="enterprise-partners" className="scroll-mt-24 border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl tracking-tight lg:text-4xl" style={{ color: NAVY }}>
              Enterprise Partners
            </h2>
            <p className="mt-3 text-muted-foreground">
              Major organizations partnering with FanPact to provide community investment, career pathways, financial education, and verified campaign attribution for the families and athletes we serve.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["4", "Enterprise Partners"],
              ["$575", "Max Credits per Partner"],
              ["365", "Days Year-Round Campaigns"],
              ["100%", "Verified Attribution"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-full border px-5 py-3 text-center" style={{ borderColor: GOLD }}>
                <span className="font-display text-xl tracking-tight" style={{ color: NAVY }}>{n}</span>
                <span className="ml-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>

          {/* TIER 1 — PREMIER */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white" style={{ background: GOLD }}>
                Premier
              </span>
              <h3 className="font-display text-2xl tracking-tight" style={{ color: NAVY }}>Premier Enterprise Partners</h3>
            </div>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Full activation partners with verified campaign credits, financial programming, and community investment.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {PREMIER.map((p) => (
                <div key={p.slug} className="flex flex-col rounded-2xl border-2 bg-white p-7 transition-shadow hover:shadow-xl" style={{ borderColor: GOLD }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white" style={{ background: GOLD }}>
                        Premier
                      </span>
                      <h4 className="mt-3 font-display text-2xl tracking-tight" style={{ color: NAVY }}>{p.name}</h4>
                      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                        {p.label} • {p.category}
                      </div>
                    </div>
                    <div className="rounded-lg p-2" style={{ background: `${NAVY}10` }}>
                      <p.Icon className="h-6 w-6" style={{ color: NAVY }} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-foreground/80">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[#13294B]/5 px-2.5 py-1 text-[11px] font-medium text-[#13294B]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`${sponsorBase}/${p.slug}`}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: NAVY }}
                  >
                    View Partner Page <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 2 — GOLD */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white" style={{ background: GOLD }}>
                Gold
              </span>
              <h3 className="font-display text-2xl tracking-tight" style={{ color: NAVY }}>Gold Partners</h3>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border-2 border-dashed p-7 text-center" style={{ borderColor: GOLD }}>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>Available</div>
                <h4 className="mt-2 font-display text-2xl tracking-tight" style={{ color: NAVY }}>Your Brand Here</h4>
                <p className="mt-3 text-sm text-muted-foreground">
                  Gold tier enterprise partners receive storefront placement, verified campaign attribution, and quarterly community investment reporting.
                </p>
                <a href="#become-a-partner" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: NAVY }}>
                  Become a Gold Partner <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* TIER 3 — SILVER */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gray-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Silver
              </span>
              <h3 className="font-display text-2xl tracking-tight" style={{ color: NAVY }}>Silver Partners</h3>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {[0, 1].map((i) => (
                <div key={i} className="rounded-2xl border-2 border-dashed border-gray-300 p-7 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Available</div>
                  <h4 className="mt-2 font-display text-2xl tracking-tight" style={{ color: NAVY }}>Your Brand Here</h4>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Silver tier partners receive storefront visibility and verified campaign attribution.
                  </p>
                  <a href="#become-a-partner" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: NAVY }}>
                    Become a Silver Partner <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — BECOME A PARTNER */}
      <section id="become-a-partner" className="scroll-mt-24" style={{ background: "#EDF1F7" }}>
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl tracking-tight lg:text-4xl" style={{ color: NAVY }}>
              Become a Partner
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Local */}
            <div className="flex flex-col rounded-2xl border border-border bg-white p-8">
              <h3 className="font-display text-2xl tracking-tight" style={{ color: NAVY }}>Advertise Locally</h3>
              <p className="mt-3 text-sm text-foreground/80">
                Reach {store.shortName} families in {local.city} with a verified card-linked offer placement on the FanPact platform. Your business appears on the Local Partners section and your offer activates automatically when families use their FanPact Team Card at your location.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                {[
                  "Verified card-linked attribution",
                  "Year-round placement",
                  "Families in your zip code",
                  "No impression estimates — real visits",
                ].map((f) => (
                  <li key={f} className="flex gap-2">
                    <span style={{ color: GOLD }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:mike@fanpact.net?subject=Local%20Advertising%20Inquiry"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: GOLD, marginTop: "1.5rem" }}
              >
                <Mail className="h-4 w-4" /> Contact Us About Local Advertising
              </a>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col rounded-2xl border border-border bg-white p-8">
              <h3 className="font-display text-2xl tracking-tight" style={{ color: NAVY }}>Enterprise Partnership</h3>
              <p className="mt-3 text-sm text-foreground/80">
                Enterprise partners receive premier placement on the FanPact platform, verified campaign credit attribution, quarterly community investment reports, and access to the FanPact family demographic across multiple storefronts simultaneously.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                {[
                  "Premier, Gold, or Silver tier placement",
                  "Verified Stripe attribution on all credits",
                  "365-day year-round campaign",
                  "Multi-store network reach",
                ].map((f) => (
                  <li key={f} className="flex gap-2">
                    <span style={{ color: GOLD }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:mike@fanpact.net?subject=Enterprise%20Partnership%20Inquiry"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: GOLD, marginTop: "1.5rem" }}
              >
                <Mail className="h-4 w-4" /> Explore Enterprise Partnership
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
