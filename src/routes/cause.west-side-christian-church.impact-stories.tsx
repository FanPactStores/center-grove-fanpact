import { Link, createFileRoute } from "@tanstack/react-router";
import { Quote, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cause/west-side-christian-church/impact-stories")({
  head: () => ({
    meta: [
      { title: "Impact Stories — West Side Christian Church × FanPact" },
      {
        name: "description",
        content:
          "How everyday shopping turns into ministry, missions, and community impact at West Side Christian Church in Springfield, Illinois.",
      },
      { property: "og:title", content: "Impact Stories — West Side Christian Church" },
      {
        property: "og:description",
        content: "Everyday purchases becoming real ministry impact in Springfield, Illinois.",
      },
    ],
  }),
  component: ImpactStories,
});

const STORIES = [
  {
    title: "Room for more kids",
    body:
      "Contributions designated to the Kids Ministry Building Expansion go toward the space a growing congregation needs — classrooms, safe check-in, and room for families who are new.",
  },
  {
    title: "Missions, near and far",
    body:
      "The Missions fund supports dozens of local and global partners, from Springfield neighborhoods to communities across the world.",
  },
  {
    title: "Wherever the need is greatest",
    body:
      "The General Fund keeps weekly ministry running — students, young adults, small groups, and the everyday work of the church.",
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
        Stories from the congregation will be published here as they are approved by the church.
        Until then, here's how contributions are put to work.
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
        to="/cause/west-side-christian-church/shop"
        className="mt-12 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
        style={{ background: "var(--brand-accent)" }}
      >
        <ShoppingBag className="h-4 w-4" />
        Shop Now
      </Link>
    </main>
  );
}
