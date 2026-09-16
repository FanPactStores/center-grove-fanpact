import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Heart, MapPin, Users, Globe2, HandHeart } from "lucide-react";
import heroImage from "@/assets/west-side-hero.jpg";
import { CAUSE_FUND_COPY, STORES } from "@/data/stores";
import { CATEGORIES } from "@/data/categories";
import { EverydayEssentialsGrid } from "@/components/fanpact/EverydayEssentialsGrid";

export const Route = createFileRoute("/cause/west-side-christian-church/")({
  head: () => ({
    meta: [
      { title: "Shop & Support West Side Christian Church — FanPact" },
      {
        name: "description",
        content:
          "Shop everyday essentials through the West Side Christian Church storefront. 60% of net earnings funds ministry, missions, and community impact in Springfield, Illinois.",
      },
      { property: "og:title", content: "Shop & Support West Side Christian Church" },
      {
        property: "og:description",
        content:
          "Every purchase helps fund ministry, missions, and community impact right here in Springfield, Illinois.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WestSideHome,
});

function WestSideHome() {
  const store = STORES["west-side-christian"];
  const funds = store.causeFunds ?? [];

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Warm, sunlit church gathering space with rows of chairs"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1088}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/88 via-black/70 to-black/45" />

        <div className="mx-auto max-w-7xl px-4 pb-28 pt-24 lg:px-8 lg:pt-32">
          <div className="max-w-3xl text-white">
            <div className="text-xs uppercase tracking-[0.22em] text-white/70">
              {store.heroEyebrow}
            </div>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight">
              Shop &amp; Support West Side Christian Church
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/90 md:text-lg">
              Every purchase helps fund ministry, missions, and community impact right here in
              Springfield, Illinois.
            </p>
            <p className="mt-5 max-w-2xl text-sm text-white/80">
              60% of net earnings from every purchase goes directly to West Side Christian Church,
              at no added cost to you.
            </p>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70">
              Groceries. Household essentials. Personal care. Everyday purchases. Real ministry
              impact.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#everyday-essentials"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg"
                style={{ background: "var(--brand-accent)" }}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
              </a>
              <Link
                to="/cause/west-side-christian-church/our-ministries"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10"
              >
                <HandHeart className="h-4 w-4" />
                Our Ministries
              </Link>
            </div>

            <p className="mt-6 max-w-xl text-[11px] text-white/55">
              Demo experience; all products and contributions are illustrative. Hero photography is
              a placeholder pending West Side Christian Church approval.
            </p>
          </div>
        </div>
      </section>

      {/* FUND DESIGNATION */}
      <section className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
          <div className="text-center">
            <Heart className="mx-auto h-8 w-8" style={{ color: "var(--brand-accent)" }} />
            <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
              Choose your fund
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{CAUSE_FUND_COPY}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {funds.map((f) => (
              <div key={f.id} className="rounded-2xl border border-border bg-card p-7">
                <div className="font-display text-xl tracking-tight">{f.name}</div>
                <p className="mt-3 text-sm text-muted-foreground">{f.blurb}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Pick your fund in the bar at the top of the page, or at checkout.
          </p>
        </div>
      </section>

      {/* OUR MINISTRIES SUMMARY */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Our ministries
            </div>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              A church for every age, in every season
            </h2>
            <p className="mt-5 text-muted-foreground">
              West Side Christian Church serves families across Springfield, Illinois, through
              ministries for every age — West Side Kids (birth through 3rd grade), Junior High and
              Student Ministries (6th–12th grade), Young Adults, and small groups. The church
              supports dozens of local and global mission partners, and is currently expanding its
              Kids Ministry facilities to serve a growing congregation.
            </p>
            <Link
              to="/cause/west-side-christian-church/our-ministries"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--brand-accent)" }}
            >
              Explore the ministries <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4" style={{ color: "var(--brand-accent)" }} />
              Springfield, Illinois
            </div>
            <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
              <Users className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-accent)" }} />
              Ministries from birth through young adults, plus small groups
            </div>
            <div className="mt-4 flex items-start gap-3 text-sm text-muted-foreground">
              <Globe2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-accent)" }} />
              Dozens of local and global mission partners
            </div>
            <div className="mt-4 flex items-start gap-3 text-sm text-muted-foreground">
              <HandHeart className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-accent)" }} />
              Kids Ministry building expansion underway
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              Start shopping by category
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Browse everyday products from trusted brands. You're not spending more — just
              switching where you shop.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/cause/west-side-christian-church/shop/$category"
                params={{ category: c.slug }}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-xl bg-stone-900 p-4 text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="relative">
                  <div className="font-display text-[10px] uppercase tracking-widest opacity-70">
                    {c.short}
                  </div>
                  <div className="mt-1 text-sm font-semibold leading-tight">{c.name}</div>
                  <div
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--gold)" }}
                  >
                    Shop{" "}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EVERYDAY ESSENTIALS */}
      <EverydayEssentialsGrid
        id="everyday-essentials"
        basePath={store.basePath}
        supportsName="West Side Christian Church"
      />
    </main>
  );
}
