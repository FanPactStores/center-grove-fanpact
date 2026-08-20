import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MISSOURI_TEAMS } from "@/data/missouri-teams";

export const Route = createFileRoute("/missouri/teams/")({
  head: () => ({
    meta: [
      { title: "Teams — Missouri × FanPact" },
      { name: "description", content: "Browse Mizzou Athletics teams and designate a Tiger to receive your community contributions." },
    ],
  }),
  component: TeamsIndex,
});

function TeamsIndex() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Teams & rosters</div>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Designate a Tiger.</h1>
        <p className="mt-4 text-muted-foreground">
          Choose a sport, then a player. Your community contributions flow to that Tiger's
          designated account for the season.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {MISSOURI_TEAMS.map((t) => {
          const Card = (
            <div
              className="group relative overflow-hidden rounded-2xl border border-border p-10 transition-all"
              style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-xs uppercase tracking-[0.22em] opacity-70">Mizzou Athletics</div>
                {t.comingSoon && (
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                    Coming Soon
                  </span>
                )}
              </div>
              <div className="mt-4 font-display text-5xl tracking-tight">{t.name}</div>
              <p className="mt-4 max-w-md opacity-85">{t.blurb}</p>
              <div className="mt-10 flex items-center justify-between">
                <span className="text-sm">{t.comingSoon ? "Roster loading" : `${t.players.length} players`}</span>
                {!t.comingSoon && <ArrowRight className="transition-transform group-hover:translate-x-1" />}
              </div>
              <div className="pointer-events-none absolute -bottom-12 -right-6 font-display text-[14rem] leading-none tracking-tighter opacity-[0.06]">
                {t.shortName.slice(0, 2).toUpperCase()}
              </div>
            </div>
          );

          return t.comingSoon ? (
            <div key={t.slug}>{Card}</div>
          ) : (
            <Link
              key={t.slug}
              to="/missouri/teams/$sport"
              params={{ sport: t.slug }}
              className="block transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {Card}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
