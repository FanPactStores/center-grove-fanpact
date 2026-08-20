import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clover, LayoutGrid, ShoppingBag, Users } from "lucide-react";
import shamrocksHero from "@/assets/shamrocks-hero.jpg";
import { STORES } from "@/data/stores";
import { CATEGORIES } from "@/data/categories";
import {
  SHAMROCKS_CONTACT_EMAIL,
  SHAMROCKS_ORGS,
  SHAMROCKS_REGISTRATION_URL,
  SHAMROCKS_TEAMS,
} from "@/data/shamrocks-orgs";
import { EverydayEssentialsGrid } from "@/components/fanpact/EverydayEssentialsGrid";
import { YourRegulars } from "@/components/fanpact/YourRegulars";
import { EnterprisePartnerBanner } from "@/components/EnterprisePartnerBanner";

const SHAMROCK = "#2D7A3A";

export const Route = createFileRoute("/shamrocks/")({
  head: () => ({
    meta: [
      { title: "Springfield Shamrocks Baseball × FanPact" },
      {
        name: "description",
        content:
          "Shop everyday products through the Springfield Shamrocks FanPact storefront and fund travel baseball for 7U through 17U athletes in Springfield, Illinois.",
      },
      { property: "og:title", content: "Springfield Shamrocks Baseball × FanPact" },
      { property: "og:description", content: "Every purchase. Every Shamrock." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShamrocksHome,
});

const PARTNERS = [
  {
    name: "Overtime Training Academy",
    blurb: "State of the art indoor facilities for year-round development",
  },
  {
    name: "Sherman Athletic Club",
    blurb: "Outdoor fields and batting cages in Springfield",
  },
];

const SPONSORS = [
  { name: "U.S. Army Recruiting Command", slug: "usarec" },
  { name: "Merrill Lynch", slug: "merrill-lynch" },
  { name: "State Farm", slug: "state-farm" },
];

function ShamrocksHome() {
  const store = STORES["shamrocks"];
  const totalPlayers = SHAMROCKS_ORGS.reduce(
    (s, o) => s + o.teams.reduce((ss, t) => ss + t.players.length, 0),
    0,
  );

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={shamrocksHero}
          alt="Springfield youth travel baseball diamond at golden hour"
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
              className="mt-5 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight"
              style={{ color: "#5CB85C" }}
            >
              Every purchase.<br />Every Shamrock.
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">{store.heroBody}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/shamrocks/shop"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg"
                style={{ background: SHAMROCK }}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop &amp; Support the Shamrocks
              </Link>
              <Link
                to="/shamrocks/teams"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10"
              >
                <Users className="h-4 w-4" />
                See All Divisions
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
              Springfield Shamrocks Baseball is a community storefront. Demo experience; all products
              and contributions are illustrative.
            </p>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-border" style={{ background: "#0F2D14", color: "white" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4 lg:px-8">
          {[
            { v: "$0", l: "Earned by athletes" },
            { v: String(totalPlayers), l: "Rostered players" },
            { v: String(SHAMROCKS_TEAMS.length), l: "Age divisions" },
            { v: "50K+", l: "Products" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl tracking-tight" style={{ color: "#5CB85C" }}>
                {s.v}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest opacity-70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <EnterprisePartnerBanner store="shamrocks" />

      {/* EVERYDAY ESSENTIALS */}
      <EverydayEssentialsGrid
        id="everyday-essentials"
        basePath={store.basePath}
        supportsName="Springfield Shamrocks"
      />

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="mb-3 text-center">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl" style={{ color: SHAMROCK }}>
            Start Shopping by Category
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Browse thousands of everyday products from trusted brands. You're not spending more —
            just switching where you shop.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/shamrocks/shop/$category"
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
                  style={{ color: "#5CB85C" }}
                >
                  Shop{" "}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <YourRegulars store={store} />

      {/* DIVISIONS */}
      <section id="divisions" className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              className="font-display text-4xl tracking-tight md:text-5xl"
              style={{ color: SHAMROCK }}
            >
              The Shamrocks Divisions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Select a division to designate your support — 60% of earnings goes directly to that
              team.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SHAMROCKS_TEAMS.map((team) => (
              <Link
                key={team.slug}
                to="/shamrocks/teams/$division"
                params={{ division: team.slug }}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="font-display text-3xl tracking-tight" style={{ color: SHAMROCK }}>
                    {team.ageGroup}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{team.coach}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {team.tryoutLocation ?? "Private tryout only"}
                  </div>
                </div>
                {team.players.length === 0 ? (
                  <p className="mt-5 text-[11px] text-muted-foreground">
                    Roster coming soon — designate this division to support the whole team
                  </p>
                ) : (
                  <p className="mt-5 text-[11px] text-muted-foreground">
                    {team.players.length} rostered players
                  </p>
                )}
                <div
                  className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: SHAMROCK }}
                >
                  Designate{" "}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRYOUTS */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl" style={{ color: SHAMROCK }}>
            2025 Tryout Schedule
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Join the Shamrocks. Contact{" "}
            <a href={`mailto:${SHAMROCKS_CONTACT_EMAIL}`} className="underline">
              {SHAMROCKS_CONTACT_EMAIL}
            </a>{" "}
            with questions.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead style={{ background: "#0F2D14", color: "white" }}>
              <tr>
                {["Division", "Coach", "Dates", "Time", "Location"].map((h) => (
                  <th key={h} className="px-5 py-3 text-[11px] uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHAMROCKS_TEAMS.map((t) => (
                <tr key={t.slug} className="border-t border-border bg-card">
                  <td className="px-5 py-4 font-semibold">{t.ageGroup}</td>
                  <td className="px-5 py-4">{t.coach}</td>
                  <td className="px-5 py-4">{t.tryoutDates ?? "Private tryout only"}</td>
                  <td className="px-5 py-4">{t.tryoutTime ?? "By appointment"}</td>
                  <td className="px-5 py-4">
                    {t.tryoutLocation ?? "Contact coach to schedule"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={SHAMROCKS_REGISTRATION_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow"
            style={{ background: SHAMROCK }}
          >
            <Clover className="h-4 w-4" /> Register for tryouts
          </a>
          <p className="text-sm text-muted-foreground">
            Register at form.jotform.com/231654635907058
          </p>
        </div>
      </section>

      {/* TRAINING PARTNERS */}
      <section className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <h2
            className="text-center font-display text-4xl tracking-tight md:text-5xl"
            style={{ color: SHAMROCK }}
          >
            Training Partners
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PARTNERS.map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-card p-8">
                <div className="font-display text-2xl tracking-tight">{p.name}</div>
                <p className="mt-3 text-sm text-muted-foreground">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl" style={{ color: SHAMROCK }}>
            Shamrocks Sponsors
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Enterprise partners funding Springfield families — learn more and earn FanPact credits.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SPONSORS.map((s) => (
            <Link
              key={s.slug}
              to="/shamrocks/sponsors/$slug"
              params={{ slug: s.slug }}
              className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-[11px] uppercase tracking-widest" style={{ color: SHAMROCK }}>
                Active partner
              </div>
              <div className="mt-3 font-display text-2xl tracking-tight">{s.name}</div>
              <div
                className="mt-6 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: SHAMROCK }}
              >
                Learn more{" "}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* JOIN SHAMROCK NATION */}
      <section style={{ background: "#0F2D14", color: "white" }}>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center lg:px-8">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl" style={{ color: "#5CB85C" }}>
            Join Shamrock Nation
          </h2>
          <p className="mt-4 opacity-85">
            Get exclusive deals, track your impact, and stay connected with Springfield Shamrocks
            baseball.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/shamrocks/team-card"
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
              style={{ background: SHAMROCK }}
            >
              Get your Team Card
            </Link>
            <Link
              to="/shamrocks/shop"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/10"
            >
              Start shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
