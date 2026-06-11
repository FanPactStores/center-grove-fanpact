import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, LayoutGrid, TrendingUp } from "lucide-react";
import butlerArena from "@/assets/butler-arena.jpg";
import { STORES } from "@/data/stores";
import { CATEGORIES } from "@/data/categories";
import { FEATURED_PRODUCTS } from "@/data/products";
import { sponsorsForStore } from "@/data/sponsors";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { YourRegulars } from "@/components/fanpact/YourRegulars";

export const Route = createFileRoute("/butler/")({
  head: () => ({
    meta: [
      { title: "Butler Bulldogs × FanPact — Support Butler Athletes" },
      { name: "description", content: "Shop everyday products through the Butler FanPact storefront and fund NIL opportunities for Butler student-athletes. You're not spending more — just switching where you shop." },
      { property: "og:title", content: "Butler Bulldogs × FanPact" },
      { property: "og:description", content: "Every household run. Every Butler win." },
    ],
  }),
  component: ButlerHome,
});

const STATS = [
  { label: "Earned by athletes", value: "$127,450", tag: "Live NIL" },
  { label: "Athletes", value: "600+" },
  { label: "Sports", value: "20" },
  { label: "Products", value: "50K+" },
];

const CATEGORY_TONES = [
  "from-blue-900 to-indigo-950",
  "from-slate-800 to-slate-950",
  "from-amber-900 to-stone-950",
  "from-emerald-900 to-emerald-950",
  "from-rose-900 to-stone-950",
  "from-sky-900 to-slate-950",
  "from-violet-900 to-indigo-950",
];

function ButlerHome() {
  const store = STORES.butler;
  const trending = CATEGORIES.slice(0, 6);

  return (
    <main className="bg-background">
      {/* HERO (disclaimer now lives in StoreHeader) */}
      <section className="relative isolate overflow-hidden">
        <img
          src={butlerArena}
          alt="Hinkle Fieldhouse packed with Butler Bulldogs fans during a basketball game"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/70 to-black/55" />

        <div className="mx-auto max-w-7xl px-4 pb-32 pt-24 lg:px-8 lg:pt-32">
          <div className="max-w-3xl text-white">
            <div className="text-xs uppercase tracking-[0.22em] text-white/70">
              {store.heroEyebrow}
            </div>
            <h1
              className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight"
              style={{ color: "var(--brand-accent)" }}
            >
              Support Butler<br />Athletes.
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
              Every purchase through the Butler FanPact storefront lets you shop the everyday products
              you already buy — electronics, home goods, pet supplies, kitchen essentials — while
              directly funding NIL opportunities for Butler student-athletes.
            </p>

            {/* CTAS */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/butler/shop"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg"
                style={{ background: "var(--brand-accent)" }}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
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
              Unofficial Fan Support Site — not affiliated with or endorsed by Butler University. Demo
              experience; all products and contributions are illustrative.
            </p>
          </div>

          {/* STATS OVERLAY */}
          <div className="mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-black/40 px-6 py-5 text-white">
                {s.tag && (
                  <div
                    className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--brand-accent)" }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                      style={{ background: "var(--brand-accent)" }}
                    />
                    {s.tag}
                  </div>
                )}
                <div
                  className="font-display text-4xl tracking-tight"
                  style={{ color: "var(--brand-accent)" }}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-white/70">{s.label}</div>
              </div>
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
              to="/butler/shop/$category"
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

      {/* EVERYDAY ESSENTIALS */}
      <section className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              className="font-display text-4xl tracking-tight md:text-5xl"
              style={{ color: "var(--brand-accent)" }}
            >
              Everyday Essentials Supporting Butler Athletes
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Shop the products you already love — every purchase makes a difference.
            </p>
            <Link
              to="/butler/shop"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
              style={{ color: "var(--brand-accent)" }}
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {FEATURED_PRODUCTS.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} basePath={store.basePath} />
            ))}
          </div>
        </div>
      </section>

      {/* NIL IMPACT STRIP */}
      <section
        className="relative isolate overflow-hidden border-b border-border"
        style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
      >
        <div className="pointer-events-none absolute -right-16 -top-10 font-display text-[20rem] leading-none tracking-tighter opacity-[0.06]">
          B
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 text-center lg:px-8">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Butler Fans Are Powering <span style={{ color: "var(--brand-accent)" }}>NIL Opportunities</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl opacity-80">
            Every purchase made through the Butler FanPact storefront contributes to NIL opportunities
            for athletes.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { v: "600+", l: "Athletes Supported" },
              { v: "1,200+", l: "Products Available" },
              { v: "38K+", l: "Active Fans" },
              { v: "20", l: "Sports Programs" },
            ].map((s) => (
              <div key={s.l}>
                <div
                  className="font-display text-5xl tracking-tight md:text-6xl"
                  style={{ color: "var(--brand-accent)" }}
                >
                  {s.v}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest opacity-70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <TrendingUp className="h-4 w-4" /> Trending
          </div>
          <h2
            className="mt-3 font-display text-4xl tracking-tight md:text-5xl"
            style={{ color: "var(--brand-accent)" }}
          >
            Trending for Butler Fans
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Curated picks our fans are loving right now.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {trending.map((c, i) => (
            <Link
              key={c.slug}
              to="/butler/shop/$category"
              params={{ category: c.slug }}
              className={`group relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br ${CATEGORY_TONES[i % CATEGORY_TONES.length]} p-5 text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.15),transparent_55%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="font-display text-[10px] uppercase tracking-widest opacity-70">
                  {c.short}
                </div>
                <div>
                  <div className="font-display text-xl leading-tight">{c.name}</div>
                  <div
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--brand-accent)" }}
                  >
                    Shop now <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              className="font-display text-4xl tracking-tight md:text-5xl"
              style={{ color: "var(--brand-accent)" }}
            >
              How FanPact Works
            </h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to support Butler athletes.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "Step 1", t: "Shop Everyday Products",
                d: "Browse thousands of everyday consumer products from trusted brands." },
              { n: "Step 2", t: "Buy Through Your School Storefront",
                d: "Purchases are attributed to the Butler FanPact storefront." },
              { n: "Step 3", t: "Revenue Supports Butler Athletes",
                d: "60% of net earnings supports NIL opportunities for Butler student-athletes." },
            ].map((s, i) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-8 text-center">
                <div
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full font-display text-lg text-white"
                  style={{ background: "var(--brand-accent)" }}
                >
                  {i + 1}
                </div>
                <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.n}
                </div>
                <h3 className="mt-2 font-display text-2xl tracking-tight">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Enterprise sponsors
          </div>
          <h2
            className="mt-3 font-display text-4xl tracking-tight md:text-5xl"
            style={{ color: "var(--brand-accent)" }}
          >
            Brands fund Butler families
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {sponsorsForStore("butler").map((s) => (
            <Link
              key={s.slug}
              to="/butler/sponsors/$slug"
              params={{ slug: s.slug }}
              className="rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Active</div>
              <div className="mt-1 font-display text-3xl tracking-tight">{s.name}</div>
              <div className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">
                Per-family credit
              </div>
              <div
                className="font-display text-4xl tracking-tight"
                style={{ color: "var(--community)" }}
              >
                ${s.perFamily}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* JOIN THE NATION */}
      <section
        className="border-t border-border"
        style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
      >
        <div className="mx-auto max-w-3xl px-4 py-20 text-center lg:px-8">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Join the <span style={{ color: "var(--brand-accent)" }}>Bulldog Nation</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg opacity-80">
            Get exclusive deals, track your fan impact, and stay connected with Butler athletics.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md gap-2 rounded-full border border-white/20 bg-white/10 p-1.5 pl-5 backdrop-blur"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
            />
            <button
              type="submit"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "var(--brand-accent)" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
