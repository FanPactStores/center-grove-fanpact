import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BUTLER_TEAMS } from "@/data/butler-teams";

export const Route = createFileRoute("/butler/teams/")({
  head: () => ({
    meta: [
      { title: "Teams — Butler × FanPact" },
      { name: "description", content: "Browse Butler Athletics teams and designate a Bulldog to receive your community contributions." },
    ],
  }),
  component: TeamsIndex,
});

function TeamsIndex() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Teams & rosters</div>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Designate a Bulldog.</h1>
        <p className="mt-4 text-muted-foreground">
          Choose a sport, then a player. Your community contributions flow to that Bulldog's
          designated account for the season.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {BUTLER_TEAMS.map((t) => (
          <Link
            key={t.slug}
            to="/butler/teams/$sport"
            params={{ sport: t.slug }}
            className="group relative overflow-hidden rounded-2xl border border-border p-10 transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
          >
            <div className="text-xs uppercase tracking-[0.22em] opacity-70">Butler Athletics</div>
            <div className="mt-4 font-display text-5xl tracking-tight">{t.name}</div>
            <p className="mt-4 max-w-md opacity-85">{t.blurb}</p>
            <div className="mt-10 flex items-center justify-between">
              <span className="text-sm">{t.players.length} players</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </div>
            <div className="pointer-events-none absolute -bottom-12 -right-6 font-display text-[16rem] leading-none tracking-tighter opacity-[0.06]">
              {t.slug === "mens-basketball" ? "MB" : "FB"}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
