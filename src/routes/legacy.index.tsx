import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, LayoutGrid, Users } from "lucide-react";
import legacyHero from "@/assets/legacy-baseball.jpg";
import { STORES } from "@/data/stores";
import { CATEGORIES } from "@/data/categories";
import { FEATURED_PRODUCTS } from "@/data/products";
import { LEGACY_ORGS } from "@/data/legacy-orgs";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { YourRegulars } from "@/components/fanpact/YourRegulars";
import { EnterprisePartnerBanner } from "@/components/EnterprisePartnerBanner";

export const Route = createFileRoute("/legacy/")({
  head: () => ({
    meta: [
      { title: "STL Legacy / Klutch Baseball × FanPact" },
      { name: "description", content: "Klutch youth teams and STL Legacy showcase rosters — designate your team or athlete and 60% of net earnings on every purchase flows back." },
      { property: "og:title", content: "STL Legacy / Klutch Baseball × FanPact" },
      { property: "og:description", content: "From 8U to D1. One ledger." },
    ],
  }),
  component: LegacyHome,
});

const CATEGORY_TONES = [
  "from-slate-800 to-slate-950",
  "from-red-900 to-stone-950",
  "from-blue-900 to-slate-950",
  "from-stone-800 to-black",
  "from-red-800 to-stone-950",
  "from-zinc-800 to-stone-950",
  "from-slate-900 to-stone-950",
];

function LegacyHome() {
  const store = STORES.legacy;
  const totalPlayers = LEGACY_ORGS.reduce(
    (s, o) => s + o.teams.reduce((ss, t) => ss + t.players.length, 0),
    0,
  );

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={legacyHero}
          alt="Youth baseball player at home plate at sunrise"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />

        <div className="mx-auto max-w-7xl px-4 pb-28 pt-24 lg:px-8 lg:pt-32">
          <div className="max-w-3xl text-white">
            <div className="text-xs uppercase tracking-[0.22em] text-white/70">
              {store.heroEyebrow}
            </div>
            <h1
              className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight"
              style={{ color: "var(--brand-accent)" }}
            >
              From 8U<br />to D1.
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
              Klutch youth squads, the 14U bridge roster, and STL Legacy showcase teams — every age,
              every coach. 60% of net earnings on every purchase flows to the team or athlete you designate.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/legacy/shop"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg"
                style={{ background: "var(--brand-accent)" }}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
              </Link>
              <Link
                to="/legacy/orgs"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10"
              >
                <Users className="h-4 w-4" />
                Designate a Team
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10"
              >
                <LayoutGrid className="h-4 w-4" />
                Shop Categories
              </a>
            </div>

            <p className="mt-5 max-w-xl text-[11px] text-white/55">
              STL Legacy / Klutch is a Legacy Performance Academy storefront. Demo experience; all products
              and contributions are illustrative.
            </p>
          </div>
        </div>
      </section>

      <EnterprisePartnerBanner store="legacy" />

      {/* ORG SELECTOR */}
      <section id="orgs" className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-10 text-center">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {LEGACY_ORGS.length} tracks · {LEGACY_ORGS.reduce((s, o) => s + o.teams.length, 0)} rosters · {totalPlayers}+ athletes
            </div>
            <h2
              className="mt-3 font-display text-4xl tracking-tight md:text-5xl"
              style={{ color: "var(--brand-accent)" }}
            >
              Choose your track, then your team
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Klutch youth or Legacy showcase — drill into the specific age group, coach, or athlete you
              want your contributions to support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {LEGACY_ORGS.map((org) => (
              <Link
                key={org.slug}
                to="/legacy/orgs/$org"
                params={{ org: org.slug }}
                className="group relative overflow-hidden rounded-2xl border border-border p-10 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
              >
                <div className="text-xs uppercase tracking-[0.22em] opacity-70">
                  {org.category} · {org.season}
                </div>
                <div className="mt-4 font-display text-4xl tracking-tight">{org.name}</div>
                <p className="mt-4 max-w-md opacity-85">{org.blurb}</p>
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-sm opacity-80">
                    {org.teams.length} rosters ·{" "}
                    {org.teams.reduce((s, t) => s + t.players.length, 0)} players
                  </span>
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
                <div className="pointer-events-none absolute -bottom-12 -right-6 font-display text-[14rem] leading-none tracking-tighter opacity-[0.07]">
                  {org.shortName[0]}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="mb-3 text-center">
          <h2
            className="font-display text-4xl tracking-tight md:text-5xl"
            style={{ color: "var(--brand-accent)" }}
          >
            Start Shopping by Category
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Browse the everyday brands you already buy — every purchase contributes to Legacy.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              to="/legacy/shop/$category"
              params={{ category: c.slug }}
              className={`group relative flex aspect-square flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br ${CATEGORY_TONES[i % CATEGORY_TONES.length]} p-4 text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)] opacity-70 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="font-display text-[10px] uppercase tracking-widest opacity-70">
                  {c.short}
                </div>
                <div className="mt-1 text-sm font-semibold leading-tight">{c.name}</div>
                <div
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--brand-accent)" }}
                >
                  Shop <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* YOUR REGULARS — appears when list has 3+ items */}
      <YourRegulars store={store} />

      {/* FEATURED PRODUCTS */}
      <section className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              className="font-display text-4xl tracking-tight md:text-5xl"
              style={{ color: "var(--brand-accent)" }}
            >
              Everyday Essentials Powering Legacy
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Shop the products you already love — every purchase makes a difference.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {FEATURED_PRODUCTS.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} basePath={store.basePath} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            className="font-display text-4xl tracking-tight md:text-5xl"
            style={{ color: "var(--brand-accent)" }}
          >
            How FanPact Works for Legacy
          </h2>
          <p className="mt-3 text-muted-foreground">Three simple steps. Designate once, contribute forever.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Pick Your Team", d: "Choose Klutch youth or Legacy showcase, then drill into the specific roster or athlete." },
            { t: "Shop Everyday Products", d: "Browse the Legacy storefront for the brands you already buy." },
            { t: "Contributions Flow Automatically", d: "60% of net earnings is allocated to your designation — every purchase, every time." },
          ].map((s, i) => (
            <div key={s.t} className="rounded-2xl border border-border bg-card p-8 text-center">
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full font-display text-lg text-white"
                style={{ background: "var(--brand-accent)" }}
              >
                {i + 1}
              </div>
              <h3 className="mt-4 font-display text-2xl tracking-tight">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
