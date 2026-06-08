import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Search, ShoppingBag, LayoutGrid, Users } from "lucide-react";
import cgHero from "@/assets/cg-community.jpg";
import { STORES } from "@/data/stores";
import { CATEGORIES } from "@/data/categories";
import { FEATURED_PRODUCTS } from "@/data/products";
import { CG_ORGS } from "@/data/center-grove-orgs";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { YourRegulars } from "@/components/fanpact/YourRegulars";

export const Route = createFileRoute("/center-grove/")({
  head: () => ({
    meta: [
      { title: "Center Grove Community Alliance × FanPact" },
      { name: "description", content: "Shop everyday products through the Center Grove FanPact storefront and fund youth athletics, performing arts, and STEM programs across the Center Grove community." },
      { property: "og:title", content: "Center Grove Community Alliance × FanPact" },
      { property: "og:description", content: "Our families. Our fund. Our future." },
    ],
  }),
  component: CenterGroveHome,
});

const CATEGORY_TONES = [
  "from-amber-900 to-stone-950",
  "from-slate-800 to-slate-950",
  "from-yellow-900 to-stone-950",
  "from-stone-800 to-black",
  "from-amber-800 to-stone-950",
  "from-zinc-800 to-stone-950",
  "from-orange-900 to-stone-950",
];

function CenterGroveHome() {
  const store = STORES["center-grove"];
  const totalPlayers = CG_ORGS.reduce(
    (s, o) => s + o.teams.reduce((ss, t) => ss + t.players.length, 0),
    0,
  );

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={cgHero}
          alt="Youth athletes from Center Grove community sports at golden hour"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/45" />

        <div className="mx-auto max-w-7xl px-4 pb-28 pt-24 lg:px-8 lg:pt-32">
          <div className="max-w-3xl text-white">
            <div className="text-xs uppercase tracking-[0.22em] text-white/70">
              {store.heroEyebrow}
            </div>
            <h1
              className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight"
              style={{ color: "var(--brand-accent)" }}
            >
              Our families.<br />Our future.
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
              Shop the everyday products you already buy. 60% of net earnings flows directly to the
              Center Grove team, club, or athlete you designate — no extra cost, no fundraising ask.
            </p>

            <form
              className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-white/20 bg-white/95 p-1.5 pl-5 shadow-2xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search all products..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Link
                to="/center-grove/shop"
                className="rounded-full px-5 py-2.5 text-sm font-semibold shadow"
                style={{ background: "var(--brand-accent)", color: "var(--gold-foreground)" }}
              >
                Search
              </Link>
            </form>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/center-grove/shop"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider shadow-lg"
                style={{ background: "var(--brand-accent)", color: "var(--gold-foreground)" }}
              >
                <ShoppingBag className="h-4 w-4" />
                Start Shopping
              </Link>
              <Link
                to="/center-grove/orgs"
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
              Center Grove Community Alliance is a community storefront. Demo experience; all
              products and contributions are illustrative.
            </p>
          </div>
        </div>
      </section>

      {/* ORG SELECTOR */}
      <section id="orgs" className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-10 text-center">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {CG_ORGS.length} community organizations · {totalPlayers}+ athletes & members
            </div>
            <h2
              className="mt-3 font-display text-4xl tracking-tight md:text-5xl"
              style={{ color: "var(--brand-accent)" }}
            >
              Choose where your contributions go
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Pick an organization — then drill into the specific team, age group, or athlete you
              want to support. Your designation is attached to every purchase automatically.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {CG_ORGS.map((org) => (
              <Link
                key={org.slug}
                to="/center-grove/orgs/$org"
                params={{ org: org.slug }}
                className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {org.category} · {org.season}
                  </div>
                  <div className="mt-2 font-display text-xl leading-tight tracking-tight">
                    {org.name}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground line-clamp-2">{org.blurb}</div>
                  <div
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--brand-accent)" }}
                  >
                    {org.teams.length} teams <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-6 -right-3 font-display text-[10rem] leading-none tracking-tighter opacity-[0.06]"
                  style={{ color: "var(--brand-accent)" }}
                >
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
            Browse thousands of everyday products from trusted brands. You're not spending more —
            just switching where you shop.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              to="/center-grove/shop/$category"
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
              Everyday Essentials Supporting Center Grove
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
            How FanPact Works for Center Grove
          </h2>
          <p className="mt-3 text-muted-foreground">Three simple steps. Designate once, contribute forever.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "1", t: "Pick Your Team",
              d: "Choose an organization, then drill into the specific team or athlete you want to support." },
            { n: "2", t: "Shop Everyday Products",
              d: "Browse the Center Grove storefront for the brands you already buy." },
            { n: "3", t: "Contributions Flow Automatically",
              d: "60% of net earnings is allocated to your designation — every purchase, every time." },
          ].map((s, i) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-8 text-center">
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full font-display text-lg"
                style={{ background: "var(--brand-accent)", color: "var(--gold-foreground)" }}
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
