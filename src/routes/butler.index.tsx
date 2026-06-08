import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { STORES } from "@/data/stores";
import { CATEGORIES } from "@/data/categories";
import { FEATURED_PRODUCTS } from "@/data/products";
import { SPONSORS } from "@/data/sponsors";
import { BUTLER_TEAMS } from "@/data/butler-teams";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { PercentAnchor } from "@/components/fanpact/PercentAnchor";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/butler/")({
  head: () => ({
    meta: [
      { title: "Butler Bulldogs × FanPact — Community commerce store" },
      { name: "description", content: "Shop everyday brands and fund Butler Athletics. 60% of net earnings flows to the Butler Athletics Community Fund." },
      { property: "og:title", content: "Butler Bulldogs × FanPact" },
      { property: "og:description", content: "Every household run. Every Butler win." },
    ],
  }),
  component: ButlerHome,
});

function ButlerHome() {
  const store = STORES.butler;
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border" style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.3fr_1fr] lg:px-8 lg:py-28">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] opacity-70">{store.heroEyebrow}</div>
            <h1 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-tight">
              {store.heroHeadline}
            </h1>
            <p className="mt-8 max-w-xl opacity-85">{store.heroBody}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" style={{ background: "var(--brand-accent)", color: "white" }}>
                <Link to="/butler/shop">Shop the store</Link>
              </Button>
              <Button asChild size="lg" variant="outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white", background: "transparent" }}>
                <Link to="/butler/team-card">Get the Team Card</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="flex items-center gap-5">
              <div className="font-display leading-[0.8] tracking-tight" style={{ color: "var(--brand-accent)", fontSize: "clamp(7rem, 14vw, 13rem)" }}>
                60<span className="opacity-50">%</span>
              </div>
              <div className="max-w-[14ch] border-l-2 pl-3 text-xs uppercase tracking-[0.2em] opacity-70" style={{ borderColor: "var(--brand-accent)" }}>
                of net earnings to {store.fundDisplay}
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 font-display text-[24rem] leading-none tracking-tighter opacity-[0.06]">B</div>
      </section>

      {/* CATEGORY GRID */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Categories</div>
            <h2 className="mt-2 font-display text-4xl tracking-tight">Shop the brands you already buy</h2>
          </div>
          <Link to="/butler/shop" className="hidden text-sm font-medium underline-offset-4 hover:underline md:inline">
            All products →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/butler/shop/$category"
              params={{ category: c.slug }}
              className="group flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="font-display text-xs uppercase tracking-wider text-muted-foreground">{c.short}</div>
              <div>
                <div className="text-sm font-semibold leading-tight group-hover:underline">{c.name}</div>
                <ArrowRight className="mt-2 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured this week</div>
              <h2 className="mt-2 font-display text-4xl tracking-tight">Everyday picks</h2>
            </div>
            <PercentAnchor subtitle={`back to ${store.fundDisplay}`} />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {FEATURED_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} basePath={store.basePath} />
            ))}
          </div>
        </div>
      </section>

      {/* TEAMS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Designate a Bulldog</div>
            <h2 className="mt-2 font-display text-4xl tracking-tight">Send contributions to a specific player</h2>
          </div>
          <Link to="/butler/teams" className="hidden text-sm font-medium underline-offset-4 hover:underline md:inline">
            All teams →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {BUTLER_TEAMS.map((t) => (
            <Link
              key={t.slug}
              to="/butler/teams/$sport"
              params={{ sport: t.slug }}
              className="group relative overflow-hidden rounded-2xl border border-border p-8 transition-all hover:-translate-y-0.5"
              style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
            >
              <div className="text-xs uppercase tracking-[0.22em] opacity-70">{t.shortName}</div>
              <div className="mt-3 font-display text-4xl tracking-tight">{t.name}</div>
              <p className="mt-3 max-w-md opacity-80">{t.blurb}</p>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm">{t.players.length} players</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SPONSORS */}
      <section className="border-t border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-10">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Enterprise sponsors</div>
            <h2 className="mt-2 font-display text-4xl tracking-tight">Brands fund Butler families</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {SPONSORS.map((s) => (
              <Link key={s.slug} to="/butler/sponsors/$slug" params={{ slug: s.slug }}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Active</div>
                <div className="mt-1 font-display text-2xl tracking-tight">{s.name}</div>
                <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">Per-family credit</div>
                <div className="font-display text-3xl tracking-tight" style={{ color: "var(--community)" }}>
                  ${s.perFamily}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
