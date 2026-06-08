import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { getLegacyOrg, type LegacyTeam } from "@/data/legacy-orgs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/assa/orgs/$org")({
  loader: ({ params }) => {
    const org = getLegacyOrg(params.org);
    if (!org) throw notFound();
    return { org };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.org.name ?? "Track"} — STL Legacy × FanPact` },
      { name: "description", content: loaderData?.org.blurb ?? "" },
    ],
  }),
  errorComponent: () => <NotFoundView />,
  notFoundComponent: () => <NotFoundView />,
  component: OrgDetail,
});

function NotFoundView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Track not found</h1>
      <Link to="/legacy/orgs" className="mt-6 inline-block text-sm underline">
        All tracks
      </Link>
    </main>
  );
}

function OrgDetail() {
  const { org } = Route.useLoaderData();

  // Group teams by age (e.g. "8U", "15U")
  const groups: Record<string, LegacyTeam[]> = {};
  for (const team of org.teams as LegacyTeam[]) {
    const ageMatch = team.name.match(/(\d{1,2}U)/);
    const key = ageMatch ? ageMatch[1] : "Other";
    (groups[key] ??= []).push(team);
  }
  const groupKeys = Object.keys(groups).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <main>
      <section
        className="border-b border-border"
        style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <Link to="/legacy/orgs" className="text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100">
            ← All tracks
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] opacity-70">
                {org.category} · {org.season}
              </div>
              <h1 className="mt-2 font-display text-6xl tracking-tight">{org.name}</h1>
              <p className="mt-4 max-w-2xl opacity-85">{org.about}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-widest backdrop-blur">
                Designation code: <span className="font-mono opacity-100">{org.designationCode}</span>
              </div>
            </div>
            <Button
              size="lg"
              style={{ background: "var(--brand-accent)", color: "white" }}
            >
              <Check className="h-4 w-4" />
              Designate {org.shortName}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-8">
          <h2 className="font-display text-3xl tracking-tight">Rosters by age group</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Drill into a team to designate at the team level or pick an individual athlete.
          </p>
        </div>

        <div className="space-y-12">
          {groupKeys.map((age) => (
            <div key={age}>
              <div className="mb-4 flex items-baseline gap-3">
                <h3
                  className="font-display text-2xl tracking-tight"
                  style={{ color: "var(--brand-accent)" }}
                >
                  {age} Division
                </h3>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {groups[age].length} {groups[age].length === 1 ? "roster" : "rosters"}
                </span>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {groups[age].map((team: LegacyTeam) => (
                  <Link
                    key={team.slug}
                    to="/legacy/orgs/$org/$team"
                    params={{ org: org.slug, team: team.slug }}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {team.ageGroup} · {team.coach}
                    </div>
                    <div className="mt-2 font-display text-2xl tracking-tight">{team.name}</div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{team.blurb}</p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{team.players.length} players</span>
                      <span
                        className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider"
                        style={{ color: "var(--brand-accent)" }}
                      >
                        View roster <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                    <div className="mt-3 font-mono text-[10px] text-muted-foreground/70">
                      {team.designationCode}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
