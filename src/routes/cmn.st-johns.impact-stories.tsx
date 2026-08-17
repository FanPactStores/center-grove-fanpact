import { Link, createFileRoute } from "@tanstack/react-router";
import { Quote, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cmn/st-johns/impact-stories")({
  head: () => ({
    meta: [
      { title: "Impact Stories — HSHS St. John's Children's Hospital × FanPact" },
      {
        name: "description",
        content:
          "Stories of the families and kids supported by HSHS St. John's Children's Hospital in Springfield, Illinois.",
      },
      { property: "og:title", content: "Impact Stories — HSHS St. John's Children's Hospital" },
      {
        property: "og:description",
        content: "How everyday shopping turns into pediatric care across Illinois.",
      },
    ],
  }),
  component: ImpactStories,
});

const STORIES = [
  {
    title: "Every cart becomes care",
    body:
      "Contributions from everyday purchases go to the hospital's greatest areas of need — the equipment, programs, and family support services that matter most in the moment.",
  },
  {
    title: "Close to home",
    body:
      "Families across central and southern Illinois can receive specialized pediatric care without traveling hours from home.",
  },
  {
    title: "From the first breath",
    body:
      "The Level III Neonatal Intensive Care Unit cares for the region's most fragile newborns, in partnership with Southern Illinois University School of Medicine.",
  },
];

function ImpactStories() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
        Impact stories
      </div>
      <h1 className="mt-3 font-display text-5xl tracking-tight">
        What your everyday shopping makes possible
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Patient and family stories will be published here as they are approved by the hospital and
        Children's Miracle Network. Until then, here's how contributions are put to work.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {STORIES.map((s) => (
          <article key={s.title} className="rounded-2xl border border-border bg-card p-7">
            <Quote className="h-6 w-6" style={{ color: "var(--brand-accent)" }} />
            <h2 className="mt-4 font-display text-2xl tracking-tight">{s.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
          </article>
        ))}
      </div>

      <Link
        to="/cmn/st-johns/shop"
        className="mt-12 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
        style={{ background: "var(--brand-accent)" }}
      >
        <ShoppingBag className="h-4 w-4" />
        Shop Now
      </Link>
    </main>
  );
}
