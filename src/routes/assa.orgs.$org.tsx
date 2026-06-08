import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { getAssaOrg, type AssaTeam } from "@/data/assa-orgs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/assa/orgs/$org")({
  loader: ({ params }) => {
    const org = getAssaOrg(params.org);
    if (!org) throw notFound();
    return { org };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.org.name ?? "Track"} — ASSA × FanPact` },
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
      <h1 className="font-display text-4xl tracking-tight">Hub not found</h1>
      <Link to="/assa/orgs" className="mt-6 inline-block text-sm underline">
        All hubs
      </Link>
    </main>
  );
}

function OrgDetail() {
  const { org } = Route.useLoaderData();

  // Group teams by ageGroup (e.g. "9U", "Class of 2028") then by division
  const groups: Record<string, AssaTeam[]> = {};
  for (const team of org.teams as AssaTeam[]) {
    const key = `${team.division} · ${team.ageGroup}`;
    (groups[key] ??= []).push(team);
  }
  const ageOrder = (k: string): number => {
    const u = k.match(/(\d{1,2})U/);
    if (u) return parseInt(u[1]);
    const c = k.match(/Class of (\d{4})/);
    if (c) return 100 - (parseInt(c[1]) - 2025); // later class first? simple ordering
    return 99;
  };
  const groupKeys = Object.keys(groups).sort((a, b) => {
    const da = a.split(" · ")[0]; const db = b.split(" · ")[0];
    if (da !== db) return da.localeCompare(db);
    return ageOrder(a.split(" · ")[1]) - ageOrder(b.split(" · ")[1]);
  });


  return (
    <main>
      <section
        className="border-b border-border"
        style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <Link to="/assa/orgs" className="text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100">
            ← All hubs
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] opacity-70">
                {org.category} · {org.hub}
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
                {groups[age].map((team: AssaTeam) => (
                  <Link
                    key={team.slug}
                    to="/assa/orgs/$org/$team"
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
