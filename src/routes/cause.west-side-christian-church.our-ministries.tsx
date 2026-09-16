import { Link, createFileRoute } from "@tanstack/react-router";
import { MapPin, Baby, GraduationCap, Users, Globe2, HandHeart, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/west-side-hero.jpg";
import { CAUSE_FUND_COPY, STORES } from "@/data/stores";

export const Route = createFileRoute("/cause/west-side-christian-church/our-ministries")({
  head: () => ({
    meta: [
      { title: "Our Ministries — West Side Christian Church × FanPact" },
      {
        name: "description",
        content:
          "West Side Christian Church serves families across Springfield, Illinois through ministries for every age, small groups, and dozens of local and global mission partners.",
      },
      { property: "og:title", content: "Our Ministries — West Side Christian Church" },
      {
        property: "og:description",
        content: "Ministries for every age in Springfield, Illinois, plus local and global missions.",
      },
    ],
  }),
  component: OurMinistries,
});

const MINISTRIES = [
  {
    icon: Baby,
    t: "West Side Kids",
    d: "Birth through 3rd grade — safe, joyful spaces where kids begin their faith story.",
  },
  {
    icon: GraduationCap,
    t: "Junior High & Student Ministries",
    d: "6th through 12th grade — community, mentorship, and weekly gatherings for students.",
  },
  {
    icon: Users,
    t: "Young Adults & Small Groups",
    d: "Groups across the city where people go deeper together, all year long.",
  },
  {
    icon: Globe2,
    t: "Local & Global Missions",
    d: "Dozens of mission partners serving Springfield neighborhoods and communities worldwide.",
  },
];

function OurMinistries() {
  const store = STORES["west-side-christian"];
  const funds = store.causeFunds ?? [];

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Sunlit church gathering space"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="lazy"
          width={1920}
          height={1088}
        />
        <div className="absolute inset-0 -z-10 bg-black/75" />
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="text-xs uppercase tracking-[0.22em] text-white/70">Our ministries</div>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight tracking-tight text-white">
            West Side Christian Church
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/85">
            <MapPin className="h-4 w-4" /> Springfield, Illinois
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <p className="text-lg leading-relaxed text-muted-foreground">
          West Side Christian Church serves families across Springfield, Illinois, through
          ministries for every age — West Side Kids (birth through 3rd grade), Junior High and
          Student Ministries (6th–12th grade), Young Adults, and small groups. The church supports
          dozens of local and global mission partners, and is currently expanding its Kids Ministry
          facilities to serve a growing congregation.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {MINISTRIES.map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6">
              <c.icon className="h-6 w-6" style={{ color: "var(--brand-accent)" }} />
              <div className="mt-4 font-semibold">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-[var(--surface-2)] p-8">
          <div className="flex items-center gap-2">
            <HandHeart className="h-5 w-5" style={{ color: "var(--brand-accent)" }} />
            <h2 className="font-display text-2xl tracking-tight">Where your contribution goes</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{CAUSE_FUND_COPY}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {funds.map((f) => (
              <li key={f.id} className="flex flex-wrap gap-x-2">
                <span className="font-semibold">{f.name}</span>
                <span className="text-muted-foreground">{f.blurb}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/cause/west-side-christian-church/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
            style={{ background: "var(--brand-accent)" }}
          >
            <ShoppingBag className="h-4 w-4" />
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
