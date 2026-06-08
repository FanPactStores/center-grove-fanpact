import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ASSA_ORGS } from "@/data/assa-orgs";

export const Route = createFileRoute("/assa/orgs/")({
  head: () => ({
    meta: [
      { title: "Hubs — ASSA × FanPact" },
      { name: "description", content: "Combat youth and ASSA showcase hubs. Designate where your contributions go." },
    ],
  }),
  component: OrgsIndex,
});

function OrgsIndex() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Hubs</div>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Designate your hub.</h1>
        <p className="mt-4 text-muted-foreground">
          All-Star Sports Academy runs {ASSA_ORGS.length} location hubs across PA and NJ — including the centralized Combat Futures HS showcase track. Pick one, then drill into
          the age-group roster or athlete you want your contributions to support.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {ASSA_ORGS.map((org) => (
          <Link
            key={org.slug}
            to="/assa/orgs/$org"
            params={{ org: org.slug }}
            className="group relative overflow-hidden rounded-2xl border border-border p-10 transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
          >
            <div className="text-xs uppercase tracking-[0.22em] opacity-70">
              {org.category} · {org.hub}
            </div>
            <div className="mt-4 font-display text-4xl tracking-tight">{org.name}</div>
            <p className="mt-4 max-w-md opacity-85">{org.blurb}</p>
            <div className="mt-10 flex items-center justify-between">
              <span className="text-sm opacity-80">
                {org.teams.length} rosters ·{" "}
                {org.teams.reduce((s, t) => s + t.players.length, 0)} players
              </span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </div>
            <div className="pointer-events-none absolute -bottom-12 -right-6 font-display text-[14rem] leading-none tracking-tighter opacity-[0.07]">
              {org.shortName[0]}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
