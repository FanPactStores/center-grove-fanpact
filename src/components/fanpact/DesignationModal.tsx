import { useMemo, useState } from "react";
import { Search, X, Users, User } from "lucide-react";
import type { StoreId } from "@/data/stores";
import {
  getDesignationIndex,
  defaultDesignation,
  type Designation,
} from "@/lib/designation";
import { Button } from "@/components/ui/button";
import { SuppressCheckbox } from "./SuppressCheckbox";
import { FanPactLogo } from "@/components/FanPactLogo";

export function DesignationModal({
  open,
  storeId,
  onClose,
  onConfirm,
  title = "Choose your designation",
  suppressCheckbox,
}: {
  open: boolean;
  storeId: StoreId;
  onClose: () => void;
  onConfirm: (d: Designation) => void;
  title?: string;
  suppressCheckbox?: { checked: boolean; onChange: (v: boolean) => void };
}) {
  const idx = useMemo(() => getDesignationIndex(storeId), [storeId]);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<string>(idx.groups[0]?.id ?? "");
  const [selected, setSelected] = useState<Designation | null>(null);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const searchResults = q
    ? idx.allPlayers
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.teamLabel.toLowerCase().includes(q) ||
            p.groupLabel.toLowerCase().includes(q) ||
            p.meta.toLowerCase().includes(q),
        )
        .slice(0, 40)
    : [];

  const activeGroup = idx.groups.find((g) => g.id === tab) ?? idx.groups[0];

  const close = () => {
    setQuery("");
    setSelected(null);
    onClose();
  };

  const confirm = (d: Designation) => {
    onConfirm(d);
    setQuery("");
    setSelected(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-[var(--surface)] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex flex-1 items-start gap-3">
            <FanPactLogo height={36} />
            <div>
              <h2 className="font-display text-xl tracking-tight">{title}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Your contribution will be tagged to this designee on every purchase.
              </p>
            </div>
          </div>
          <button
            aria-label="Close"
            onClick={close}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-border bg-muted/30 px-5 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Player name, team, or age group..."
              className="w-full rounded-md border border-border bg-[var(--surface)] py-2 pl-9 pr-3 text-sm outline-none focus:border-[var(--brand-accent)]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {q ? (
            <div className="p-3">
              <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {searchResults.length} match{searchResults.length === 1 ? "" : "es"}
              </div>
              {searchResults.length === 0 ? (
                <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                  No players found. Try a different name or team.
                </p>
              ) : (
                <ul className="space-y-1">
                  {searchResults.map((p) => {
                    const d: Designation = {
                      kind: "player",
                      name: p.name,
                      subtitle: p.meta,
                      code: p.code,
                    };
                    const isActive = selected?.code === p.code;
                    return (
                      <li key={p.code}>
                        <button
                          onClick={() => setSelected(d)}
                          className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors ${
                            isActive ? "bg-[var(--brand-accent)]/10" : "hover:bg-muted"
                          }`}
                        >
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase"
                            style={{ background: "var(--brand-accent)", color: "white" }}
                          >
                            {p.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold">{p.name}</div>
                            <div className="truncate text-xs text-muted-foreground">{p.meta}</div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col">
              {/* Tabs */}
              <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-border bg-muted/20 px-3 py-2">
                {idx.groups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setTab(g.id)}
                    className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                      tab === g.id
                        ? "bg-[var(--brand-accent)] text-white"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <div className="p-3">
                {activeGroup?.teams.map((t) => (
                  <details key={t.teamId} className="mb-2 rounded-md border border-border">
                    <summary className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm font-semibold">
                      <span className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        {t.teamLabel}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-normal text-muted-foreground">
                          {t.players.length} player{t.players.length === 1 ? "" : "s"}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setSelected({
                              kind: "team",
                              name: t.teamLabel,
                              subtitle: activeGroup.label,
                              code: t.teamCode,
                            });
                          }}
                          className="rounded border border-border bg-[var(--surface)] px-2 py-0.5 text-[11px] font-semibold hover:bg-muted"
                        >
                          Designate team
                        </button>
                      </div>
                    </summary>
                    <ul className="divide-y divide-border border-t border-border">
                      {t.players.map((p) => {
                        const d: Designation = {
                          kind: "player",
                          name: p.name,
                          subtitle: p.meta,
                          code: p.code,
                        };
                        const isActive = selected?.code === p.code;
                        return (
                          <li key={p.code}>
                            <button
                              onClick={() => setSelected(d)}
                              className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                                isActive ? "bg-[var(--brand-accent)]/10" : "hover:bg-muted"
                              }`}
                            >
                              <User className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="flex-1">{p.name}</span>
                              <span className="text-[11px] text-muted-foreground">{p.meta}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border bg-muted/20 px-5 py-3">
          <button
            onClick={() => confirm(defaultDesignation(storeId))}
            className="block w-full rounded-md border border-dashed border-border bg-[var(--surface)] px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-[var(--brand-accent)] hover:text-foreground"
          >
            Skip — contribute to the{" "}
            <span className="font-semibold text-foreground">
              {defaultDesignation(storeId).name}
            </span>{" "}
            instead
          </button>
        </div>

        {suppressCheckbox && (
          <div className="border-t border-border bg-muted/20 px-5 py-2">
            <SuppressCheckbox
              checked={suppressCheckbox.checked}
              onCheckedChange={suppressCheckbox.onChange}
              id="fp-suppress-picker"
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-border bg-[var(--surface)] px-5 py-3">
          <div className="min-w-0 text-xs">
            {selected ? (
              <>
                <div className="text-muted-foreground">Selected</div>
                <div className="truncate font-semibold">{selected.name}</div>
              </>
            ) : (
              <div className="text-muted-foreground">Pick a player, team, or fund</div>
            )}
          </div>
          <Button
            disabled={!selected}
            onClick={() => selected && confirm(selected)}
            style={{
              background: "var(--brand)",
              color: "var(--brand-foreground)",
            }}
          >
            {selected ? `Designate to ${truncate(selected.name, 22)}` : "Designate"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
