import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { sponsorsForStore } from "@/data/sponsors";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/legacy/sponsors/")({
  head: () => ({
    meta: [
      { title: "Enterprise sponsors — STL Legacy × FanPact" },
      { name: "description", content: "Brands prepay community accounts. Legacy families unlock credits by completing qualifying actions." },
    ],
  }),
  component: SponsorsIndex,
});

function SponsorsIndex() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Enterprise sponsors</div>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Brands fund Legacy families.</h1>
        <p className="mt-4 text-muted-foreground">
          Sponsors prepay community accounts. Families unlock credits when they complete qualifying actions — no purchase required.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {sponsorsForStore("legacy").map((s) => {
          const pct = Math.round((s.fundReleased / s.fundTotal) * 100);
          return (
            <Link key={s.slug} to="/legacy/sponsors/$slug" params={{ slug: s.slug }} className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-6 inline-flex h-10 items-center justify-center rounded-md px-3 font-display text-sm tracking-wider text-white" style={{ background: s.color }}>
                {s.name}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.tagline}</div>
              <p className="mt-3 line-clamp-3 text-sm text-foreground/80">{s.description}</p>

              <div className="mt-6 space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Per-family credit</div>
                    <div className="font-display text-3xl tracking-tight" style={{ color: "var(--community)" }}>{usd(s.perFamily)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Fund released</div>
                    <div className="font-display text-xl tracking-tight">{pct}%</div>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full" style={{ width: `${pct}%`, background: "var(--community)" }} />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm font-medium">
                <span>View campaign</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
