import { ArrowRight, GraduationCap, PiggyBank, Shield, Trophy, Users, TrendingUp, BookOpen, Star, QrCode } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { StoreConfig } from "@/data/stores";

/**
 * Edward Jones seeding amount — FanPact's proposed figure.
 * Not final; Edward Jones may set a different amount or a non-monetary incentive.
 * Edit here to change the number everywhere on both EJ pages.
 */
export const EJ_SEEDING_AMOUNT_USD = 200;

/**
 * External Edward Jones scheduling URL. FanPact does not host or track this booking.
 * Replace with the final EJ-provided scheduling link when supplied.
 */
export const EJ_SCHEDULE_URL = "https://www.edwardjones.com/us-en/schedule-visit";

const NAVY = "#13294B";
const NAVY_DEEPER = "#0d1d36";
const GOLD = "#BA7517";
const GOLD_SOFT = "rgba(186,117,23,0.12)";

type Variant = "youth" | "collegiate";

type Props = {
  store: StoreConfig;
  variant: Variant;
};

export function EdwardJonesPage({ store, variant }: Props) {
  const isYouth = variant === "youth";

  const headline = isYouth
    ? "Building Futures, One Relationship at a Time."
    : "From NIL Income to a Lifetime of Wealth.";
  const subhead = isYouth
    ? "From your child's first 529 contribution to a lifetime of financial confidence, Edward Jones advisors are in your community."
    : "Edward Jones Sports and Entertainment certified advisors help student-athletes and fans build real financial futures.";

  const seedingTitle = isYouth
    ? `Edward Jones will seed your child's 529 account when you open one.`
    : `Edward Jones will seed your investment or retirement account when you open one.`;

  return (
    <main className="bg-white">
      {/* BREADCRUMB */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link to={store.basePath as string} className="hover:text-foreground">{store.shortName}</Link></li>
              <li aria-hidden>/</li>
              <li><Link to={`${store.basePath}/sponsors` as string} className="hover:text-foreground">Sponsors</Link></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">Edward Jones</li>
            </ol>
          </nav>
          <Link
            to={`${store.basePath}/sponsors` as string}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium hover:underline"
            style={{ color: NAVY }}
          >
            ← Back to Sponsors
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="relative isolate overflow-hidden" style={{ background: NAVY }}>
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(186,117,23,0.35) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl text-white">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ background: GOLD_SOFT, color: GOLD, border: `1px solid ${GOLD}` }}
            >
              <Star className="h-3 w-3" /> Premier Enterprise Partner
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.95] tracking-tight">
              {headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/85 md:text-xl">
              {subhead}
            </p>
            <div className="mt-8">
              <a
                href={EJ_SCHEDULE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02]"
                style={{ background: GOLD, color: "#0b1220" }}
              >
                Schedule Your Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-xs text-white/60">
                Scheduling is handled directly by Edward Jones. No FanPact form. No credit for booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEEDING BANNER */}
      <section className="py-14" style={{ background: "#faf7f1" }}>
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div
            className="grid gap-8 rounded-3xl border-2 p-8 md:grid-cols-[1.5fr_1fr] md:p-12"
            style={{ borderColor: GOLD, background: "white" }}
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                Edward Jones Account Seeding Offer
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
                {seedingTitle}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Open a qualifying Edward Jones account through this program and Edward Jones will contribute a
                proposed <span className="font-semibold" style={{ color: NAVY }}>${EJ_SEEDING_AMOUNT_USD}</span>{" "}
                starting deposit into your new account.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Seeding amount is Edward Jones' decision and may be adjusted or offered as a non-monetary
                incentive. Attribution for this offer is tracked by Edward Jones via the code and QR below.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div
                  className="rounded-lg border-2 border-dashed px-4 py-3"
                  style={{ borderColor: GOLD, background: GOLD_SOFT }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>
                    Coupon Code
                  </div>
                  <div className="font-mono text-lg font-bold" style={{ color: NAVY }}>
                    FANPACT-EJ-{store.shortName.toUpperCase().replace(/\s+/g, "")}
                  </div>
                </div>
                <a
                  href={EJ_SCHEDULE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ background: NAVY, color: "white" }}
                >
                  Open Your Account <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl p-6" style={{ background: NAVY }}>
              <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-white">
                <QrCode className="h-32 w-32" style={{ color: NAVY }} />
              </div>
              <div className="text-center text-xs uppercase tracking-widest text-white/70">
                Scan to open your account
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY EDWARD JONES */}
      <section className="py-20" style={{ background: NAVY_DEEPER }}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 max-w-3xl text-white">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: GOLD }}>
              Why Edward Jones
            </h2>
            <p className="mt-4 text-white/85">
              {isYouth
                ? "A personal advisor for every stage of family financial life."
                : "The advisor network built for athletes, families, and every fan planning a real financial future."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: Users, title: "19,000+ Advisors", body: "A local advisor near you — not a call center." },
              { Icon: TrendingUp, title: "$2.2T Under Management", body: "Decades of disciplined, long-term investment strategy." },
              { Icon: Shield, title: "9 Million+ Clients Served", body: "Trusted across every stage of life and income level." },
              ...(isYouth
                ? [
                    { Icon: PiggyBank, title: "Local Advisor Model", body: "Face-to-face relationships in the community you live in." },
                    { Icon: BookOpen, title: "Family-Focused Planning", body: "College, retirement, insurance, and estate planning under one roof." },
                    { Icon: GraduationCap, title: "529 Specialists", body: "Education savings guidance built around your family's timeline." },
                  ]
                : [
                    { Icon: Trophy, title: "Sports & Entertainment Certified", body: "Advisors who specialize in athlete wealth management." },
                    { Icon: BookOpen, title: "NIL-Aware Planning", body: "Guidance on tax treatment, Roth timing, and short earning windows." },
                    { Icon: Shield, title: "Career Transition Planning", body: "Roadmaps for life after athletics — wealth preservation and income strategy." },
                  ]),
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border p-6 text-white"
                style={{ background: NAVY, borderColor: "rgba(186,117,23,0.35)" }}
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: GOLD_SOFT, color: GOLD }}>
                  <b.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm text-white/75">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YOUTH-SPECIFIC: 529 & Custodial */}
      {isYouth && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
                529 & Custodial Accounts
              </h2>
              <p className="mt-4 text-muted-foreground">
                Two of the most powerful long-term savings vehicles for a family with kids in youth sports.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border p-7" style={{ borderColor: "rgba(19,41,75,0.12)" }}>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: GOLD_SOFT, color: GOLD }}>
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl tracking-tight" style={{ color: NAVY }}>529 Education Savings</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Tax-free growth. Tax-free withdrawals for qualified education expenses. Usable at any accredited
                  college, university, or vocational school in the U.S.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Families may choose to direct their own FanPact contributions to a linked 529 account.
                </p>
              </div>
              <div className="rounded-2xl border p-7" style={{ borderColor: "rgba(19,41,75,0.12)" }}>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: GOLD_SOFT, color: GOLD }}>
                  <PiggyBank className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl tracking-tight" style={{ color: NAVY }}>Custodial Accounts</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Invest on behalf of a minor. A custodial account starts building wealth from the first season and
                  transfers to your child at the age of majority.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Your Edward Jones advisor will walk through which vehicle fits your family's goals.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COLLEGIATE-SPECIFIC: NIL Routing */}
      {!isYouth && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
                Athlete NIL Routing
              </h2>
              <p className="mt-4 text-muted-foreground">
                Student-athletes may choose to direct a percentage of their own NIL earnings to an Edward Jones
                investment or retirement account.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                This is the athlete's own money — not a reward, not a FanPact-issued credit, and not tied to any
                dollar incentive on this page.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* COLLEGIATE-SPECIFIC: NIL → Retirement + Career Transition */}
      {!isYouth && (
        <section className="py-20" style={{ background: "#f6f7f9" }}>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
                NIL Income to Retirement. And Life After Athletics.
              </h2>
              <p className="mt-4 text-muted-foreground">
                NIL income is taxable income. Without a plan, most of it disappears to taxes and short-term
                spending. Sports and Entertainment certified Edward Jones advisors help student-athletes route
                earnings into Roth IRAs, traditional IRAs, and long-term investment accounts before the earning
                window closes.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border bg-white p-7" style={{ borderColor: "rgba(19,41,75,0.12)" }}>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: GOLD_SOFT, color: GOLD }}>
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl tracking-tight" style={{ color: NAVY }}>
                  $10,000 at 19 in a Roth IRA
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  A student-athlete who invests $10,000 in NIL income at 19 in a Roth IRA has decades of tax-free
                  compounding ahead. The earlier the deposit, the more the runway does the work.
                </p>
                <p className="mt-3 text-xs text-muted-foreground/80">
                  Illustrative example only. Not a projection of returns.
                </p>
              </div>
              <div className="rounded-2xl border bg-white p-7" style={{ borderColor: "rgba(19,41,75,0.12)" }}>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: GOLD_SOFT, color: GOLD }}>
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl tracking-tight" style={{ color: NAVY }}>
                  Career Transition Planning
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Life after athletics is one of the highest-risk financial moments in a young person's life.
                  Edward Jones advisors with Sports and Entertainment certification build a roadmap for the years
                  after the last game.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FINANCIAL LITERACY */}
      <section className="py-20" style={{ background: isYouth ? "#f6f7f9" : "white" }}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
              {isYouth ? "Financial Literacy for Families" : "Financial Literacy for Athletes"}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {isYouth
                ? "FanPact-organized, Edward Jones-sponsored workshops and seminars for families in the community — open to everyone, no account required."
                : "FanPact-intern-organized, Edward Jones-sponsored seminars open to the full student body. Any athlete appearance is a separate, explicitly labeled NIL agreement — not part of the seminar."}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(isYouth
              ? [
                  { tag: "Monthly Workshops", title: "College Savings Basics", body: "How 529s work, contribution timing, and matching state tax benefits." },
                  { tag: "Quarterly Seminars", title: "Family Investment Fundamentals", body: "Budgeting, saving, and beginning to invest at every income level." },
                  { tag: "1-on-1 Consultations", title: "Household Financial Planning", body: "Personalized guidance from a local advisor at no cost." },
                ]
              : [
                  { tag: "Monthly Workshops", title: "Budgeting and Tax Basics", body: "Budgeting, income tax mechanics, and quarterly estimated payments — open to all students." },
                  { tag: "Quarterly Seminars", title: "Investment Fundamentals", body: "Introduction to investing, Roth vs. traditional accounts, and long-term wealth building." },
                  { tag: "On-Demand Resources", title: "Contract & Financial Protection Basics", body: "Reading a contract, understanding fees, and protecting your financial information." },
                ]
            ).map((c) => (
              <div key={c.title} className="flex flex-col rounded-2xl border bg-white p-6" style={{ borderColor: "rgba(19,41,75,0.12)" }}>
                <span
                  className="self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: GOLD_SOFT, color: GOLD }}
                >
                  {c.tag}
                </span>
                <h3 className="mt-4 font-display text-lg tracking-tight" style={{ color: NAVY }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="font-display text-3xl tracking-tight text-white md:text-4xl">
            Ready to talk to an Edward Jones advisor?
          </h2>
          <p className="mt-4 text-white/80">
            Free consultation. No obligation. Scheduling happens directly with Edward Jones.
          </p>
          <a
            href={EJ_SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-wider"
            style={{ background: GOLD, color: "#0b1220" }}
          >
            Schedule Your Free Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* COMPLIANCE FOOTER */}
      <section className="border-t bg-white py-10" style={{ borderColor: "rgba(19,41,75,0.12)" }}>
        <div className="mx-auto max-w-4xl px-4 text-center text-xs text-muted-foreground lg:px-8">
          <p>
            This enterprise sponsor campaign is funded by Edward Jones. Participation is voluntary.
            Edward Jones, Member SIPC.
          </p>
          {!isYouth && (
            <p className="mt-3">
              This program complies with NCAA NIL guidelines and applicable state regulations.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
