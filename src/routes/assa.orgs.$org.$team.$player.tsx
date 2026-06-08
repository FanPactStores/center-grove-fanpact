import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { getAssaOrg, getAssaTeam, getAssaPlayer } from "@/data/assa-orgs";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/assa/orgs/$org/$team/$player")({
  loader: ({ params }) => {
    const org = getAssaOrg(params.org);
    const team = getAssaTeam(params.org, params.team);
    const player = getAssaPlayer(params.org, params.team, params.player);
    if (!org || !team || !player) throw notFound();
    return { org, team, player };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.player.name ?? "Player"} — ASSA × FanPact` },
      { name: "description", content: `${loaderData?.player.name}, #${loaderData?.player.number}, ${loaderData?.player.position}. Designate this athlete and contributions flow directly to them.` },
    ],
  }),
  errorComponent: () => <NotFoundView />,
  notFoundComponent: () => <NotFoundView />,
  component: PlayerBio,
});

function NotFoundView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Player not found</h1>
      <Link to="/assa/orgs" className="mt-6 inline-block text-sm underline">All hubs</Link>
    </main>
  );
}

function PlayerBio() {
  const { org, team, player } = Route.useLoaderData();
  const firstName = player.name.split(" ")[0];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <nav className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Link to="/assa/orgs" className="hover:text-foreground">Hubs</Link>
        <span className="mx-2">/</span>
        <Link to="/assa/orgs/$org" params={{ org: org.slug }} className="hover:text-foreground">
          {org.shortName}
        </Link>
        <span className="mx-2">/</span>
        <Link to="/assa/orgs/$org/$team" params={{ org: org.slug, team: team.slug }} className="hover:text-foreground">
          {team.name}
        </Link>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl" style={{ background: player.swatch }}>
          <div className="absolute left-6 top-6 font-display text-8xl leading-none text-white">{player.number}</div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-xs uppercase tracking-[0.22em] text-white/80">{player.position}</div>
            <div className="font-display text-4xl tracking-tight text-white">{player.name.split(" ").slice(-1)[0]}</div>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {org.shortName} · {team.name}
          </div>
          <h1 className="mt-2 font-display text-6xl leading-[0.95] tracking-tight">{player.name}</h1>
          <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-widest">
            <Pill>#{player.number}</Pill>
            <Pill>{player.position}</Pill>
            <Pill>{player.grade}</Pill>
            <Pill>{player.hometown}</Pill>
          </div>

          <div
            className="mt-8 rounded-2xl border p-6"
            style={{
              background: "var(--community-soft)",
              borderColor: "color-mix(in oklab, var(--community) 40%, transparent)",
            }}
          >
            <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--community)" }}>
              Community Contributions This Season
            </div>
            <div className="mt-2 font-display text-6xl tracking-tight" style={{ color: "var(--community)" }}>
              {usd(0)}
            </div>
            <p className="mt-2 text-sm text-foreground/80">
              Designate {firstName} as your beneficiary and 60% of net earnings on every purchase you
              make at the ASSA store flows directly to their account.
            </p>
            <div className="mt-4 rounded-md border border-border bg-white/60 px-3 py-2 text-[11px] font-mono text-muted-foreground">
              {player.designationCode}
            </div>
            <Button
              size="lg"
              className="mt-6 w-full sm:w-auto"
              style={{ background: "var(--brand-accent)", color: "white" }}
            >
              <Check className="h-4 w-4" />
              Designate {firstName}
            </Button>
          </div>

          <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>
              Profile coming soon. {player.name} plays for {team.name} ({team.ageGroup}).
              {team.coach}.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/assa/orgs/$org/$team" params={{ org: org.slug, team: team.slug }}>
                ← Back to roster
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/assa/shop">Shop the store →</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-card px-3 py-1 text-[10px] font-semibold text-foreground">
      {children}
    </span>
  );
}
