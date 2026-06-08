import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { getSponsor } from "@/data/sponsors";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/butler/sponsors/$slug")({
  loader: ({ params }) => {
    const sponsor = getSponsor(params.slug);
    if (!sponsor) throw notFound();
    return { sponsor };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.sponsor.name ?? "Sponsor"} — Butler × FanPact` },
      { name: "description", content: loaderData?.sponsor.description ?? "" },
    ],
  }),
  errorComponent: () => <NotFoundView />,
  notFoundComponent: () => <NotFoundView />,
  component: SponsorDetail,
});

function NotFoundView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Sponsor not found</h1>
      <Link to="/butler/sponsors" className="mt-6 inline-block text-sm underline">All sponsors</Link>
    </main>
  );
}

function SponsorDetail() {
  const { sponsor } = Route.useLoaderData();
  const pct = Math.round((sponsor.fundReleased / sponsor.fundTotal) * 100);

  return (
    <main>
      <section className="border-b border-border" style={{ background: sponsor.color, color: "white" }}>
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <Link to="/butler/sponsors" className="text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100">← All sponsors</Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] opacity-70">{sponsor.tagline}</div>
              <h1 className="mt-3 font-display text-6xl tracking-tight">{sponsor.name}</h1>
              <p className="mt-6 max-w-xl opacity-85">{sponsor.description}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <div className="text-[10px] uppercase tracking-widest opacity-70">Total prepaid fund</div>
              <div className="font-display text-5xl tracking-tight">{usd(sponsor.fundTotal)}</div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full bg-white" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs opacity-80">
                <span>{usd(sponsor.fundReleased)} released to families</span>
                <span>{pct}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Qualifying actions</div>
            <h2 className="mt-2 font-display text-3xl tracking-tight">How families unlock the credit</h2>
            <div className="mt-6 space-y-3">
              {sponsor.actions.map((a, i) => (
                <div key={a.title} className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-display text-sm">{i + 1}</div>
                    <div>
                      <div className="text-sm font-medium">{a.title}</div>
                      <div className="text-xs text-muted-foreground capitalize">{a.status}</div>
                    </div>
                  </div>
                  <div className="font-display text-2xl tracking-tight" style={{ color: "var(--community)" }}>
                    +{usd(a.reward)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-6">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Available per family</div>
            <div className="font-display text-5xl tracking-tight" style={{ color: "var(--community)" }}>{usd(sponsor.perFamily)}</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Credit is released to your community account as soon as each qualifying action is verified.
              No purchase. No commitment. The brand pays.
            </p>
            <Button size="lg" className="mt-6 w-full" style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}>
              Claim this campaign
            </Button>
            <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 text-[var(--community)]" /> Eligibility verified instantly</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 text-[var(--community)]" /> Credits land in your community account</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 text-[var(--community)]" /> Flow to your designated player or fund</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
