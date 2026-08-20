import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";
import { SHAMROCKS_ORG, SHAMROCKS_TEAMS } from "@/data/shamrocks-orgs";

export const Route = createFileRoute("/shamrocks/teams/")({
  head: () => ({
    meta: [
      { title: "Divisions — Springfield Shamrocks × FanPact" },
      {
        name: "description",
        content:
          "Browse all seven Springfield Shamrocks age divisions, 7U through 17U, and designate where your contributions go.",
      },
      { property: "og:title", content: "Divisions — Springfield Shamrocks × FanPact" },
      { property: "og:description", content: "Every purchase. Every Shamrock." },
    ],
  }),
  component: ShamrocksTeamsIndex,
});

function ShamrocksTeamsIndex() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Divisions</div>
        <h1 className="mt-2 font-display text-5xl tracking-tight">The Shamrocks Divisions</h1>
        <p className="mt-4 text-muted-foreground">
          {SHAMROCKS_ORG.about} Select a division to designate your support — 60% of net earnings
          goes directly to that team.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SHAMROCKS_TEAMS.map((team) => (
          <Link
            key={team.slug}
            to="/shamrocks/teams/$division"
            params={{ division: team.slug }}
            className="group relative overflow-hidden rounded-2xl border border-border p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
          >
            <div className="text-xs uppercase tracking-[0.22em] opacity-70">{team.coach}</div>
            <div className="mt-3 font-display text-4xl tracking-tight">{team.ageGroup}</div>
            <p className="mt-3 text-sm opacity-85">{team.blurb}</p>
            <div className="mt-6 text-xs opacity-75">
              {team.tryoutLocation
                ? `Tryouts · ${team.tryoutLocation}`
                : "Private tryout only — contact coach"}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs opacity-80">
                <Users className="h-3.5 w-3.5" />
                {team.players.length === 0 ? "Roster coming soon" : `${team.players.length} players`}
              </span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </div>
            <div
              className="pointer-events-none absolute -bottom-10 -right-4 font-display text-[11rem] leading-none tracking-tighter opacity-[0.07]"
              style={{ color: "var(--brand-accent)" }}
            >
              S
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
