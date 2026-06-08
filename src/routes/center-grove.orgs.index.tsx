import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CG_ORGS } from "@/data/center-grove-orgs";

export const Route = createFileRoute("/center-grove/orgs/")({
  head: () => ({
    meta: [
      { title: "Organizations — Center Grove × FanPact" },
      { name: "description", content: "Browse Center Grove Community Alliance organizations. Designate where your contributions go." },
    ],
  }),
  component: OrgsIndex,
});

function OrgsIndex() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Organizations</div>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Designate your community.</h1>
        <p className="mt-4 text-muted-foreground">
          Center Grove Community Alliance partners with {CG_ORGS.length} community organizations.
          Pick one, then drill in to the team or athlete you want your contributions to support.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {CG_ORGS.map((org) => (
          <Link
            key={org.slug}
            to="/center-grove/orgs/$org"
            params={{ org: org.slug }}
            className="group relative overflow-hidden rounded-2xl border border-border p-10 transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
          >
            <div className="text-xs uppercase tracking-[0.22em] opacity-70">
              {org.category} · {org.season}
            </div>
            <div className="mt-4 font-display text-4xl tracking-tight">{org.name}</div>
            <p className="mt-4 max-w-md opacity-85">{org.blurb}</p>
            <div className="mt-10 flex items-center justify-between">
              <span className="text-sm opacity-80">
                {org.teams.length} teams ·{" "}
                {org.teams.reduce((s, t) => s + t.players.length, 0)} members
              </span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </div>
            <div className="pointer-events-none absolute -bottom-12 -right-6 font-display text-[14rem] leading-none tracking-tighter opacity-[0.06]">
              {org.shortName[0]}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
