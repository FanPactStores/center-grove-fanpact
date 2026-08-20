import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Check, Clover, Users } from "lucide-react";
import { getShamrocksTeam, SHAMROCKS_CONTACT_EMAIL } from "@/data/shamrocks-orgs";
import { Button } from "@/components/ui/button";
import { useDesignation } from "@/lib/designation";
import { toast } from "sonner";

export const Route = createFileRoute("/shamrocks/teams/$division")({
  loader: ({ params }) => {
    const team = getShamrocksTeam(params.division);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.team.name ?? "Division"} — Springfield Shamrocks × FanPact`,
      },
      { name: "description", content: loaderData?.team.blurb ?? "" },
      {
        property: "og:title",
        content: `${loaderData?.team.name ?? "Division"} — Springfield Shamrocks × FanPact`,
      },
      { property: "og:description", content: "Every purchase. Every Shamrock." },
    ],
  }),
  errorComponent: () => <NotFoundView />,
  notFoundComponent: () => <NotFoundView />,
  component: DivisionDetail,
});

function NotFoundView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Division not found</h1>
      <Link to="/shamrocks/teams" className="mt-6 inline-block text-sm underline">
        All divisions
      </Link>
    </main>
  );
}

function DivisionDetail() {
  const { team } = Route.useLoaderData();
  const { designation, set } = useDesignation("shamrocks");
  const isActive = designation.code === team.designationCode;

  return (
    <main>
      <section
        className="border-b border-border"
        style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <nav className="text-xs uppercase tracking-[0.18em] opacity-80">
            <Link to="/shamrocks/teams" className="hover:opacity-100">
              Divisions
            </Link>
            <span className="mx-2 opacity-60">/</span>
            <span>{team.ageGroup}</span>
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
                onClick={() => {
                  set({
                    kind: "team",
                    name: team.name,
                    subtitle: `${team.ageGroup} · ${team.coach}`,
                    code: team.designationCode,
                  });
                  toast.success(`${team.name} is now your designation.`);
                }}
              >
                {isActive ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Designated
                  </>
                ) : (
                  "Designate this division"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TRYOUT INFO */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h2 className="font-display text-3xl tracking-tight">Tryout information</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {team.tryoutNote ? (
            <div className="rounded-xl border border-border bg-card p-6 text-sm md:col-span-3">
              {team.tryoutNote}
            </div>
          ) : (
            <>
              <InfoCard label="Dates" value={team.tryoutDates ?? "TBA"} />
              <InfoCard label="Time" value={team.tryoutTime ?? "TBA"} />
              <InfoCard label="Location" value={team.tryoutLocation ?? "TBA"} />
            </>
          )}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Questions? Email{" "}
          <a href={`mailto:${SHAMROCKS_CONTACT_EMAIL}`} className="underline">
            {SHAMROCKS_CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

      {/* ROSTER — empty state */}
      <section className="mx-auto max-w-7xl px-4 pb-24 lg:px-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Users className="h-3.5 w-3.5" /> Roster
        </div>
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-[var(--surface-2)] p-16 text-center">
          <Clover className="mx-auto h-12 w-12" style={{ color: "#2D7A3A" }} />
          <h3 className="mt-4 font-display text-3xl tracking-tight">Roster Coming Soon</h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Roster coming soon — designate this division to support the whole team. Individual
            athlete pages will unlock once the {team.ageGroup} roster is finalized after tryouts.
          </p>
          <Link
            to="/shamrocks/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
            style={{ background: "#2D7A3A" }}
          >
            Shop & Support {team.ageGroup}
          </Link>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-2xl tracking-tight">{value}</div>
    </div>
  );
}
