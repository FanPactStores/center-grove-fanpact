import { usd } from "@/lib/format";

export function ContributionCallout({
  amount,
  fundName,
  designee,
}: {
  amount: number;
  fundName: string;
  designee?: string;
}) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        background: "var(--community-soft)",
        borderColor: "color-mix(in oklab, var(--community) 40%, transparent)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold"
          style={{ background: "var(--community)", color: "var(--community-foreground)" }}
        >
          +
        </div>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--community)" }}>
            Community contribution
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-3xl tracking-tight" style={{ color: "var(--community)" }}>
              {usd(amount)}
            </span>
            <span className="text-sm text-muted-foreground">from this purchase</span>
          </div>
          <p className="mt-2 text-sm text-foreground/80">
            Flows to <span className="font-semibold">{designee ?? fundName}</span> — 60% of net earnings,
            automatically, at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
