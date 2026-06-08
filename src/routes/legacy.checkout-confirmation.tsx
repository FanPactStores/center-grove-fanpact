import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { STORES } from "@/data/stores";
import { useDesignation } from "@/lib/designation";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/format";

type Search = { amount?: number; total?: number };

export const Route = createFileRoute("/legacy/checkout-confirmation")({
  head: () => ({ meta: [{ title: "Order confirmation — Legacy × FanPact" }] }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    amount: typeof search.amount === "number" ? search.amount : Number(search.amount) || 0,
    total: typeof search.total === "number" ? search.total : Number(search.total) || 0,
  }),
  component: Confirmation,
});

function Confirmation() {
  const store = STORES["legacy"];
  const { amount = 0, total = 0 } = Route.useSearch();
  const { designation } = useDesignation("legacy");

  const isGeneral = designation.kind === "general";
  const message = isGeneral
    ? `Your contribution of ${usd(amount)} has been credited to the ${store.shortName} Community Fund.`
    : `Your community contribution of ${usd(amount)} has been designated to ${designation.name}. This contribution is recorded as part of ${designation.name}'s verified FanPact community commerce record.`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "var(--community-soft)" }}
        >
          <CheckCircle2 className="h-8 w-8" style={{ color: "var(--community)" }} />
        </div>
        <h1 className="mt-4 font-display text-4xl tracking-tight">Order confirmed</h1>
        <p className="mt-2 text-muted-foreground">Thank you for shopping with purpose.</p>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-6">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Order summary
        </div>
        <dl className="mt-3 space-y-2 text-sm">
          <Row label="Order total" value={usd(total)} />
          <Row label="Community contribution" value={usd(amount)} accent />
        </dl>
      </div>

      <div
        className="mt-6 rounded-xl border p-6"
        style={{
          background: "var(--community-soft)",
          borderColor: "color-mix(in oklab, var(--community) 40%, transparent)",
        }}
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--community)" }}>
          Community contribution confirmation
        </div>
        <p className="mt-2 text-base leading-relaxed text-foreground">
          {message}
        </p>
        {designation.subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{designation.subtitle}</p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="outline">
          <Link to="/legacy">Back to store</Link>
        </Button>
      </div>
    </main>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className="tabular-nums"
        style={accent ? { color: "var(--community)", fontWeight: 600 } : undefined}
      >
        {value}
      </dd>
    </div>
  );
}
