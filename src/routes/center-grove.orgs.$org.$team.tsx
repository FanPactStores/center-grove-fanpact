import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { getCGOrg, getCGTeam } from "@/data/center-grove-orgs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/center-grove/orgs/$org/$team")({
  loader: ({ params }) => {
    const org = getCGOrg(params.org);
    const team = getCGTeam(params.org, params.team);
    if (!org || !team) throw notFound();
    return { org, team };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.team.name ?? "Team"} — ${loaderData?.org.name ?? ""} — Center Grove × FanPact` },
      { name: "description", content: loaderData?.team.blurb ?? "" },
    ],
  }),
  errorComponent: () => <NotFoundView />,
  notFoundComponent: () => <NotFoundView />,
  component: TeamRoster,
});

function NotFoundView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Team not found</h1>
      <Link to="/center-grove/orgs" className="mt-6 inline-block text-sm underline">
        All organizations
      </Link>
    </main>
  );
}

function TeamRoster() {
  const { org, team } = Route.useLoaderData();
  return (
    <main>
      <section
        className="border-b border-border"
        style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <nav className="text-xs uppercase tracking-[0.18em] opacity-80">
            <Link to="/center-grove/orgs" className="hover:opacity-100">Organizations</Link>
            <span className="mx-2 opacity-60">/</span>
            <Link
              to="/center-grove/orgs/$org"
              params={{ org: org.slug }}
              className="hover:opacity-100"
            >
              {org.name}
            </Link>
          </nav>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] opacity-70">
                {team.ageGroup} · {team.coach}
              </div>
              <h1 className="mt-2 font-display text-6xl tracking-tight">{team.name}</h1>
              <p className="mt-3 max-w-xl opacity-85">{team.blurb}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-widest backdrop-blur">
                Designation code: <span className="font-mono">{team.designationCode}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <div
                  className="font-display text-6xl tracking-tight"
                  style={{ color: "var(--brand-accent)" }}
                >
                  {team.players.length}
                </div>
                <div className="text-xs uppercase tracking-widest opacity-70">Players</div>
              </div>
              <Button
                size="lg"
                style={{ background: "var(--brand-accent)", color: "var(--gold-foreground)" }}
              >
                <Check className="h-4 w-4" />
                Designate this team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {team.players.map((p) => (
            <Link
              key={p.slug}
              to="/center-grove/orgs/$org/$team/$player"
              params={{ org: org.slug, team: team.slug, player: p.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[3/4] w-full" style={{ background: p.swatch }}>
                <div className="absolute left-3 top-3 font-display text-4xl text-white">
                  {p.number}
                </div>
                <div className="absolute bottom-3 right-3 rounded-md bg-black/30 px-2 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur">
                  {p.position}
                </div>
              </div>
              <div className="p-3">
                <div className="font-display text-base leading-tight group-hover:underline">
                  {p.name}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {p.grade} · {p.hometown}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
