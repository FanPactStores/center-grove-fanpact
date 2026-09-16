import { Target } from "lucide-react";
import { CAUSE_FUND_COPY, type StoreConfig } from "@/data/stores";
import { useCauseFund } from "@/lib/cause-funds";

/**
 * Header designation bar for cause partners with multiple named funds.
 * Single-fund partners keep the fixed single-beneficiary line instead.
 */
export function CauseFundBar({ store }: { store: StoreConfig }) {
  const { funds, fund, select } = useCauseFund(store.id);
  if (!funds.length) return null;

  return (
    <div
      className="border-b text-xs"
      style={{
        background: "color-mix(in oklab, var(--brand-accent) 12%, white)",
        borderColor: "color-mix(in oklab, var(--brand-accent) 30%, white)",
        color: "var(--ink)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2 lg:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <Target className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--brand-accent)" }} />
          <span className="truncate">
            <span className="text-muted-foreground">Contributing to:</span>{" "}
            <span className="font-semibold" style={{ color: "var(--brand-accent)" }}>
              {fund?.name}
            </span>
          </span>
        </div>

        <label className="ml-auto flex items-center gap-2">
          <span className="sr-only">Choose your fund designation</span>
          <select
            value={fund?.id ?? ""}
            onChange={(e) => select(e.target.value)}
            className="rounded-md border bg-white px-2 py-1 text-[11px] font-semibold"
            style={{ borderColor: "color-mix(in oklab, var(--brand-accent) 40%, white)" }}
          >
            {funds.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>

        <p className="w-full text-[11px] text-muted-foreground md:w-auto md:basis-full">
          {CAUSE_FUND_COPY}
        </p>
      </div>
    </div>
  );
}
