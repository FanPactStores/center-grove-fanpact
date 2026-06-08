import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Users, ShoppingBag, Wallet } from "lucide-react";
import heroStadium from "@/assets/hero-stadium.jpg";
import heroYouth from "@/assets/hero-youth.jpg";
import ogImage from "@/assets/fanpact-og.jpg.asset.json";
import { CONFERENCES, YOUTH_LEAGUES } from "@/data/conferences";
import { FanPactLogo } from "@/components/fanpact/FanPactLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FanPact — NIL and Youth Sports Commerce Platform" },
      { name: "description", content: "Collegiate NIL and youth sports commerce funding. Shop everyday products — 60% of net earnings flows to your designated athlete or program. No extra cost. No behavior change." },
      { property: "og:title", content: "FanPact — NIL and Youth Sports Commerce Platform" },
      { property: "og:description", content: "Collegiate athletics. Youth community alliances. One platform. 60% of net earnings back to the team you choose." },
      { property: "og:image", content: ogImage.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FanPact — NIL and Youth Sports Commerce Platform" },
      { name: "twitter:image", content: ogImage.url },
    ],
  }),
  component: MasterHome,
});

function MasterHome() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TOP BAR */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" aria-label="FanPact home" className="inline-flex">
            <FanPactLogo height={40} pill pillPadding="px-3 py-1.5" />
          </Link>
          <nav className="hidden gap-8 text-sm text-white/90 md:flex">
            <a href="#collegiate" className="hover:text-white">Collegiate</a>
            <a href="#youth" className="hover:text-white">Youth</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#card" className="hover:text-white">Team Card</a>
          </nav>
          <a
            href="#collegiate"
            className="hidden rounded-md border border-white/30 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 md:inline-flex"
          >
            Select your team →
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroStadium}
          alt="Stadium packed with fans waving team flags under bright lights"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
        <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 pb-24 pt-40 lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} />
              NIL and Youth Sports Commerce Platform
            </div>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight text-white">
              WHERE EVERY<br />
              PURCHASE FUNDS<br />
              <span style={{ color: "var(--gold)" }}>YOUR ATHLETES</span>
            </h1>
            <div className="mt-4 flex flex-col gap-1 font-display text-xl font-bold tracking-tight text-white md:flex-row md:gap-4 md:text-2xl lg:text-3xl">
              <span>Collegiate NIL.</span>
              <span>Youth Sports.</span>
              <span>Powered by Commerce.</span>
            </div>
            <div className="mt-8 flex justify-center md:justify-start">
              <FanPactLogo height={64} pill pillPadding="px-4 py-2" />
            </div>
            <p className="mt-6 max-w-2xl text-lg text-white/85">
              60% of net earnings flows to the athletes and programs you choose. No extra cost. No behavior change required. <span className="text-white">Just switch where you already shop.</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#collegiate"
                className="inline-flex items-center gap-2 rounded-md px-6 py-4 text-sm font-semibold uppercase tracking-wider shadow-xl"
                style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}
              >
                <GraduationCap className="h-5 w-5" />
                Select your college
              </a>
              <a
                href="#youth"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10"
              >
                <Users className="h-5 w-5" />
                Select your youth program
              </a>
            </div>
            <div className="mt-12 flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-white/70">
              <div className="font-display text-5xl leading-none" style={{ color: "var(--gold)" }}>
                60%
              </div>
              <div className="max-w-[28ch] border-l border-white/20 pl-4">
                of net earnings from qualifying purchases flow back to the team you choose
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLEGIATE SELECTOR */}
      <section id="collegiate" className="border-b border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <GraduationCap className="h-4 w-4" /> Collegiate
              </div>
              <h2 className="mt-3 font-display text-5xl tracking-tight">
                Select your university — <span style={{ color: "var(--gold)" }}>support student-athlete NIL</span>
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Each university storefront generates verified NIL contributions from fan household purchases. Documented through Stripe. Compliant with the House settlement framework.
              </p>
            </div>
            <div className="rounded-full border border-border bg-card px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
              {CONFERENCES.length} conferences · {CONFERENCES.reduce((n, c) => n + c.schools.length, 0)} schools
            </div>
          </div>

          <div className="space-y-6">
            {CONFERENCES.map((conf) => (
              <ConferenceBlock key={conf.id} conf={conf} />
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">More conferences and schools launching soon →</p>
        </div>
      </section>

      {/* YOUTH SELECTOR */}
      <section id="youth" className="relative isolate overflow-hidden border-b border-border py-24">
        <img
          src={heroYouth}
          alt="Youth team celebrating on the field"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="lazy"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/80 to-black/95" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 text-white">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/70">
                <Users className="h-4 w-4" /> Youth community alliances
              </div>
              <h2 className="mt-3 font-display text-5xl tracking-tight">
                Select your <span style={{ color: "var(--gold)" }}>youth alliance</span>
              </h2>
              <p className="mt-3 max-w-xl text-white/80">
                Community alliances support local youth baseball, softball, basketball, and more.
                Designate the fund, a team, or a specific player.
              </p>
            </div>
            <div className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/80 backdrop-blur">
              {YOUTH_LEAGUES.length} regions · {YOUTH_LEAGUES.reduce((n, l) => n + l.alliances.length, 0)} alliances
            </div>
          </div>

          <div className="space-y-6">
            {YOUTH_LEAGUES.map((league) => (
              <LeagueBlock key={league.id} league={league} />
            ))}
          </div>

          <p className="mt-8 text-sm text-white/70">More regions and alliances launching soon →</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-14 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">How FanPact works</div>
          <h2 className="mt-3 font-display text-5xl tracking-tight">Three steps. No behavior change.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: ShoppingBag, n: "01", t: "Choose your storefront",
              d: "Pick your school or your local youth alliance. Each has a branded store with the brands you already buy." },
            { icon: Users, n: "02", t: "Designate a beneficiary",
              d: "Send your contribution to the community fund, a specific team, or a single athlete you want to back." },
            { icon: Wallet, n: "03", t: "60% flows back",
              d: "Of net earnings on every purchase. Verified through Stripe. Documented for NIL compliance. The commerce does the fundraising." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-start justify-between">
                <s.icon className="h-7 w-7" />
                <div className="font-display text-3xl text-muted-foreground">{s.n}</div>
              </div>
              <h3 className="mt-8 font-display text-2xl tracking-tight">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM CARD STRIP */}
      <section id="card" className="border-y border-border" style={{ background: "var(--foreground)", color: "var(--background)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 lg:px-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] opacity-60">FanPact Team Card</div>
            <h2 className="mt-3 font-display text-5xl tracking-tight">
              A Visa in Apple &amp; Google Pay that<br />earns NIL contributions and youth fund credits <span style={{ color: "var(--gold)" }}>everywhere</span>.
            </h2>
            <p className="mt-6 max-w-lg opacity-80">
              Tap to pay at the grocery store, the gas pump, the pet supply shop. Your team gets credited
              automatically — not just on the storefront.
            </p>
          </div>
          <div className="flex items-center justify-end">
            <div
              className="aspect-[1.586/1] w-full max-w-md rounded-2xl p-6 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, var(--gold), color-mix(in oklab, var(--gold) 50%, black))",
                color: "oklch(0.15 0 0)",
              }}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <FanPactLogo height={20} pill pillPadding="px-1.5 py-0.5" />
                  <div className="text-xs uppercase tracking-widest opacity-80">Team Card</div>
                </div>
                <div className="font-mono text-lg tracking-[0.2em]">4242 •••• •••• 1834</div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-70">Designated to</div>
                    <div className="text-sm font-semibold">Your Team Fund</div>
                  </div>
                  <div className="text-xs uppercase tracking-widest opacity-80">VISA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-10">
          <Link to="/" aria-label="FanPact home" className="inline-flex">
            <FanPactLogo height={28} />
          </Link>
          <div>© 2026 FanPact, Inc. NIL and Youth Sports Commerce Platform. Demo experience — all products and contributions illustrative.</div>
        </div>
      </footer>
    </div>
  );
}

function ConferenceBlock({ conf }: { conf: { id: string; name: string; schools: { name: string; slug: string; href?: string }[] } }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-5">
        <div className="flex items-baseline gap-4">
          <h3 className="font-display text-3xl tracking-tight">{conf.name}</h3>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {conf.schools.length} schools
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {conf.schools.map((s) => (
          <SchoolTile key={s.slug} school={s} />
        ))}
      </div>
    </div>
  );
}

function LeagueBlock({ league }: { league: { id: string; name: string; region: string; alliances: { name: string; slug: string; href?: string }[] } }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 px-6 py-5 text-white">
        <div className="flex items-baseline gap-4">
          <h3 className="font-display text-3xl tracking-tight">{league.name}</h3>
          <span className="text-xs uppercase tracking-widest text-white/60">
            {league.alliances.length} alliances
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {league.alliances.map((a) => (
          <SchoolTile key={a.slug} school={a} dark />
        ))}
      </div>
    </div>
  );
}

function SchoolTile({ school, dark = false }: { school: { name: string; slug: string; href?: string }; dark?: boolean }) {
  const live = !!school.href;
  const baseClasses = dark
    ? "bg-black/40 text-white hover:bg-black/60"
    : "bg-card text-foreground hover:bg-muted";
  const disabledClasses = dark ? "bg-black/30 text-white/50" : "bg-card text-muted-foreground";

  if (live) {
    return (
      <Link
        to={school.href as "/butler"}
        className={`group flex items-center justify-between px-5 py-4 transition-colors ${baseClasses}`}
      >
        <span className="text-sm font-medium">{school.name}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" style={{ color: "var(--gold)" }} />
      </Link>
    );
  }
  return (
    <div className={`flex items-center justify-between px-5 py-4 ${disabledClasses}`}>
      <span className="text-sm">{school.name}</span>
      <span className="text-[10px] uppercase tracking-widest opacity-60">Soon</span>
    </div>
  );
}
