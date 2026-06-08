import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { getSponsor } from "@/data/sponsors";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/butler/sponsors/$slug/claim")({
  loader: ({ params }) => {
    const sponsor = getSponsor(params.slug);
    if (!sponsor) throw notFound();
    return { sponsor };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Credit claimed — ${loaderData?.sponsor.name ?? "Sponsor"} × Butler` },
      { name: "description", content: `Your ${usd(loaderData?.sponsor.perFamily ?? 0)} credit from ${loaderData?.sponsor.name} is being prepared.` },
    ],
  }),
  errorComponent: () => <NotFoundView />,
  notFoundComponent: () => <NotFoundView />,
  component: Confirmation,
});

function NotFoundView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Sponsor not found</h1>
      <Link to="/butler/sponsors" className="mt-6 inline-block text-sm underline">All sponsors</Link>
    </main>
  );
}

function Confirmation() {
  const { sponsor } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 lg:px-8">
      <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "var(--community-soft)",
            color: "var(--community)",
          }}
        >
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">{sponsor.tagline}</div>
        <h1 className="mt-2 font-display text-5xl leading-[1.05] tracking-tight">
          You're in line for {usd(sponsor.perFamily)}.
        </h1>
        <p className="mt-4 text-muted-foreground">
          We've reserved your {sponsor.name} credit. Complete the qualifying actions below and the funds
          will land in your Butler community account automatically — no purchase, no commitment.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-background p-6 text-left">
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Next steps</div>
          <ol className="mt-3 space-y-3">
            {sponsor.actions.map((a, i) => (
              <li key={a.title} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-display text-xs">
                  {i + 1}
                </span>
                <span className="flex-1">{a.title}</span>
                <span className="font-display text-sm" style={{ color: "var(--community)" }}>
                  +{usd(a.reward)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}>
            <Link to="/butler/teams">Designate a Bulldog</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/butler/sponsors/$slug" params={{ slug: sponsor.slug }}>← Back to campaign</Link>
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          A confirmation email is on its way. Credits are released as each action is verified.
        </p>
      </div>
    </main>
  );
}
