import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Users, Wallet } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FanPact — Community commerce for athletes & programs" },
      { name: "description", content: "Redirect the spend you already make on groceries, gear, and household goods into verified support for the team you love." },
      { property: "og:title", content: "FanPact — Community commerce" },
      { property: "og:description", content: "Two paths. One promise. 60% of net earnings back to the community." },
    ],
  }),
  component: MasterHome,
});

function MasterHome() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="font-display text-2xl tracking-tight">FANPACT</div>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#paths" className="hover:text-foreground">Storefronts</a>
          <a href="#card" className="hover:text-foreground">Team Card</a>
          <a href="#sponsors" className="hover:text-foreground">Sponsors</a>
        </nav>
        <Link
          to="/butler"
          className="hidden rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted md:inline-flex"
        >
          Demo stores →
        </Link>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-10 lg:pt-16">
        <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--community)" }} />
              Community commerce platform
            </div>
            <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.88] tracking-tight">
              Shop the brands you<br />
              already buy. Fund the<br />
              <span style={{ color: "var(--community)" }}>team you love.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground text-pretty">
              FanPact turns everyday household purchases — groceries, gear, pet supplies, personal care —
              into verified financial support for athletes and programs. No extra cost. No fundraising ask.
              The commerce does the work.
            </p>
          </div>
          <div className="flex items-center gap-6 lg:justify-end">
            <div
              className="font-display leading-[0.8] tracking-tight"
              style={{ color: "var(--community)", fontSize: "clamp(8rem, 18vw, 16rem)" }}
            >
              60<span style={{ color: "var(--foreground)", opacity: 0.3 }}>%</span>
            </div>
            <div className="max-w-[14ch] border-l-2 pl-4 text-xs uppercase tracking-[0.22em] text-muted-foreground"
              style={{ borderColor: "var(--community)" }}>
              of net earnings flow back to the community fund
            </div>
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section id="paths" className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Choose your path</div>
              <h2 className="mt-3 font-display text-5xl tracking-tight">Two storefronts. One platform.</h2>
            </div>
            <p className="hidden max-w-md text-sm text-muted-foreground md:block">
              Both storefronts share the same catalog, Team Card, sponsor pages, and contribution engine.
              The branding, hierarchy, and fund routing differ.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Collegiate */}
            <Link
              to="/butler"
              className="group relative overflow-hidden rounded-2xl border border-border p-10 transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "oklch(0.22 0.07 260)", color: "oklch(0.99 0 0)" }}
            >
              <div className="text-xs uppercase tracking-[0.22em] opacity-70">Collegiate</div>
              <div className="mt-4 font-display text-6xl tracking-tight">BUTLER</div>
              <div className="text-xs uppercase tracking-[0.2em] opacity-80">University Bulldogs</div>
              <p className="mt-8 max-w-md opacity-85">
                Big East athletics. Designate any Bulldog and watch contributions accrue
                across men's basketball and football skill positions.
              </p>
              <div className="mt-12 flex items-center justify-between">
                <div className="text-sm font-medium uppercase tracking-wider">Enter Butler store</div>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
              <div
                className="pointer-events-none absolute -bottom-12 -right-6 font-display text-[18rem] leading-none tracking-tighter opacity-10"
              >
                B
              </div>
            </Link>

            {/* Youth */}
            <Link
              to="/center-grove"
              className="group relative overflow-hidden rounded-2xl border border-border p-10 transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "oklch(0.15 0.005 80)", color: "oklch(0.99 0 0)" }}
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] opacity-70">
                Youth Community Alliance
              </div>
              <div className="mt-4 font-display text-6xl tracking-tight" style={{ color: "oklch(0.82 0.16 85)" }}>
                CENTER GROVE
              </div>
              <div className="text-xs uppercase tracking-[0.2em] opacity-80">Community Alliance</div>
              <p className="mt-8 max-w-md opacity-85">
                Youth baseball, softball, and basketball across 8U, 10U, and 12U.
                Designate sport, division, team, or a specific player.
              </p>
              <div className="mt-12 flex items-center justify-between">
                <div className="text-sm font-medium uppercase tracking-wider" style={{ color: "oklch(0.82 0.16 85)" }}>
                  Enter Center Grove store
                </div>
                <ArrowRight className="transition-transform group-hover:translate-x-1" style={{ color: "oklch(0.82 0.16 85)" }} />
              </div>
              <div
                className="pointer-events-none absolute -bottom-12 -right-6 font-display text-[18rem] leading-none tracking-tighter opacity-10"
                style={{ color: "oklch(0.82 0.16 85)" }}
              >
                CG
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-14 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">How it works</div>
          <h2 className="mt-3 font-display text-5xl tracking-tight">Three steps. No behavior change.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: ShoppingBag, n: "01", t: "Shop your storefront",
              d: "Browse Tide, Gatorade, Rawlings, Purina, Nike — the brands already in your cart, on your team's branded site." },
            { icon: Users, n: "02", t: "Designate a beneficiary",
              d: "Send your contribution to the full community fund, a specific team, or a single athlete you want to back." },
            { icon: Wallet, n: "03", t: "60% flows back",
              d: "Of net earnings on every purchase. Verified, automatic, transparent. The commerce does the fundraising." },
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
              A Visa in Apple & Google Pay that<br />earns contributions <span style={{ color: "var(--community)" }}>everywhere</span>.
            </h2>
            <p className="mt-6 max-w-lg opacity-80">
              Issued through Stripe. Earns community contributions automatically at every merchant —
              not just on the storefront. Tap to pay at the grocery store, the gas pump, the pet supply
              shop. Your team gets credited.
            </p>
          </div>
          <div className="flex items-center justify-end">
            <div
              className="aspect-[1.586/1] w-full max-w-md rounded-2xl p-6 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, var(--community), color-mix(in oklab, var(--community) 60%, black))",
                color: "white",
              }}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="font-display text-xl tracking-tight">FANPACT</div>
                  <div className="text-xs uppercase tracking-widest opacity-80">Team Card</div>
                </div>
                <div className="font-mono text-lg tracking-[0.2em]">4242  ••••  ••••  1834</div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-70">Designated to</div>
                    <div className="text-sm font-semibold">Butler Athletics Fund</div>
                  </div>
                  <div className="text-xs uppercase tracking-widest opacity-80">VISA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section id="sponsors" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Enterprise sponsors</div>
            <h2 className="mt-3 font-display text-5xl tracking-tight">Brands fund families.</h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            Enterprise sponsors prepay community accounts. Families unlock credits when they complete
            qualifying actions — no purchase required.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["USAREC", "Merrill Lynch", "State Farm"].map((s) => (
            <div key={s} className="rounded-xl border border-border bg-card p-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Active campaign</div>
              <div className="mt-2 font-display text-3xl tracking-tight">{s}</div>
              <div className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">Per-family credit up to</div>
              <div className="font-display text-4xl tracking-tight" style={{ color: "var(--community)" }}>
                ${s === "USAREC" ? 250 : s === "Merrill Lynch" ? 200 : 150}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="font-display text-base tracking-tight text-foreground">FANPACT</div>
          <div>© {new Date().getFullYear()} FanPact, Inc. Community commerce platform.</div>
          <div>Demo experience — all products and contributions illustrative.</div>
        </div>
      </footer>
    </div>
  );
}
