import { Check } from "lucide-react";
import { STARTER_TILES, starterTileToItem } from "@/lib/my-list";
import { Button } from "@/components/ui/button";
import type { StoreId } from "@/data/stores";
import { useState } from "react";
import { SuppressCheckbox } from "./SuppressCheckbox";

/**
 * The "stock your personal storefront" step shown after the designation modal.
 * Internal grid only — chrome is owned by the WelcomeModal that hosts it.
 */
export function StarterTileGrid({
  storeId,
  onSave,
  onSkip,
  suppressCheckbox,
}: {
  storeId: StoreId;
  onSave: (keys: string[]) => void;
  onSkip: () => void;
  suppressCheckbox?: { checked: boolean; onChange: (v: boolean) => void };
}) {
  // Show the first 24 tiles in a 4x6 grid.
  const tiles = STARTER_TILES.slice(0, 24);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggle = (brand: string) =>
    setSelected((s) => ({ ...s, [brand]: !s[brand] }));

  const grouped = tiles.reduce<Record<string, typeof tiles>>((acc, t) => {
    (acc[t.category] ??= []).push(t);
    return acc;
  }, {});

  const save = () => {
    const items = tiles
      .filter((t) => selected[t.brand])
      .map(starterTileToItem);
    onSave(items.map((i) => i.key));
    // The hosting modal owns persistence to handle storeId.
    if (items.length) {
      // expose items via a custom event so the host can persist with store-scoped key
      window.dispatchEvent(
        new CustomEvent("fanpact:starter-save", {
          detail: { storeId, items },
        }),
      );
    }
  };

  return (
    <div className="flex max-h-[80vh] flex-col">
      <div className="px-6 pt-5">
        <h2 className="font-display text-2xl tracking-tight">
          Stock your personal storefront. Tap what you already buy.
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We track these as your regular purchases. Every time you buy them here
          your community contribution is verified.
        </p>
      </div>

      <div className="mt-4 flex-1 space-y-4 overflow-y-auto px-6">
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat}>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {cat}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {list.map((t) => {
                const on = !!selected[t.brand];
                return (
                  <button
                    key={t.brand}
                    type="button"
                    onClick={() => toggle(t.brand)}
                    aria-pressed={on}
                    className="relative aspect-square overflow-hidden rounded-lg border-2 text-center transition-all"
                    style={{
                      borderColor: on ? "var(--community)" : "var(--border)",
                      background: t.swatch,
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center px-2 text-[11px] font-bold uppercase leading-tight text-white drop-shadow">
                      {t.brand}
                    </span>
                    {on && (
                      <span
                        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full"
                        style={{
                          background: "var(--community)",
                          color: "var(--community-foreground)",
                        }}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-border bg-muted/20 px-6 py-4">
        {suppressCheckbox && (
          <SuppressCheckbox
            checked={suppressCheckbox.checked}
            onCheckedChange={suppressCheckbox.onChange}
            id="fp-suppress-starter"
          />
        )}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onSkip}
            className="text-xs font-semibold text-muted-foreground underline hover:text-foreground"
          >
            Skip for now
          </button>
          <Button
            onClick={save}
            style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
          >
            Save My List and Start Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
