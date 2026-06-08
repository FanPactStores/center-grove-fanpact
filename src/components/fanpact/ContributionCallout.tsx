import { Pencil } from "lucide-react";
import { usd } from "@/lib/format";

export function ContributionCallout({
  amount,
  fundName,
  designee,
  designationName,
  designationSubtitle,
  onEditDesignation,
}: {
  amount: number;
  fundName: string;
  /** @deprecated prefer designationName */
  designee?: string;
  designationName?: string;
  designationSubtitle?: string;
  onEditDesignation?: () => void;
}) {
  const target = designationName ?? designee ?? fundName;
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
          <div className="mt-3 rounded-lg border border-dashed bg-white/40 px-3 py-2"
            style={{ borderColor: "color-mix(in oklab, var(--community) 35%, transparent)" }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Contributing to
                </div>
                <div className="truncate text-sm font-semibold" style={{ color: "var(--community)" }}>
                  {target}
                </div>
                {designationSubtitle && (
                  <div className="truncate text-[11px] text-muted-foreground">
                    {designationSubtitle}
                  </div>
                )}
              </div>
              {onEditDesignation && (
                <button
                  type="button"
                  onClick={onEditDesignation}
                  className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors hover:bg-black/5"
                  style={{ color: "var(--community)" }}
                >
                  <Pencil className="h-3 w-3" /> Edit designation
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-foreground/70">
            60% of net earnings, automatically — at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
