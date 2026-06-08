import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { getButlerTeam } from "@/data/butler-teams";

export const Route = createFileRoute("/butler/teams/$sport")({
  loader: ({ params }) => {
    const team = getButlerTeam(params.sport);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.team.name ?? "Team"} roster — Butler × FanPact` },
      { name: "description", content: loaderData?.team.blurb ?? "" },
    ],
  }),
  errorComponent: () => <NotFoundView />,
  notFoundComponent: () => <NotFoundView />,
  component: SportRoster,
});

function NotFoundView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Team not found</h1>
      <Link to="/butler/teams" className="mt-6 inline-block text-sm underline">All teams</Link>
    </main>
  );
}

function SportRoster() {
  const { team } = Route.useLoaderData();

  return (
    <main>
      <section className="border-b border-border" style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}>
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <Link to="/butler/teams" className="text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100">← All teams</Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] opacity-70">Butler Athletics</div>
              <h1 className="mt-2 font-display text-6xl tracking-tight">{team.name}</h1>
              <p className="mt-3 max-w-xl opacity-85">{team.blurb}</p>
            </div>
            <div className="text-right">
              <div className="font-display text-6xl tracking-tight" style={{ color: "var(--brand-accent)" }}>{team.players.length}</div>
              <div className="text-xs uppercase tracking-widest opacity-70">Players</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {team.players.map((p) => (
            <Link
              key={p.slug}
              to="/butler/teams/$sport/$player"
              params={{ sport: team.slug, player: p.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[3/4] w-full" style={{ background: p.swatch }}>
                <div className="absolute left-3 top-3 font-display text-4xl text-white">{p.number}</div>
                <div className="absolute bottom-3 right-3 rounded-md bg-black/30 px-2 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur">
                  {p.position}
                </div>
              </div>
              <div className="p-4">
                <div className="font-display text-lg leading-tight group-hover:underline">{p.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{p.year} · {p.hometown}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
