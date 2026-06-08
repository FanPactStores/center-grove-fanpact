import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { StoreConfig } from "@/data/stores";
import {
  defaultDesignation,
  useDesignation,
  useWelcomeSeen,
} from "@/lib/designation";
import { useMyList } from "@/lib/my-list";
import { Button } from "@/components/ui/button";
import { DesignationModal } from "./DesignationModal";
import { StarterTileGrid } from "./StarterTileGrid";
import { SuppressCheckbox } from "./SuppressCheckbox";
import { FanPactLogo } from "@/components/FanPactLogo";

type Stage = "intro" | "picker" | "starter" | "done";

export function WelcomeModal({ store }: { store: StoreConfig }) {
  const { seen, markSeen } = useWelcomeSeen(store.id);
  const { set } = useDesignation(store.id);
  const { setMany } = useMyList(store.id);
  const [stage, setStage] = useState<Stage>("done");
  const [dontShow, setDontShow] = useState(false);
  // Use a ref so any onClose path reads the latest value at click time.
  const dontShowRef = useRef(false);
  useEffect(() => {
    dontShowRef.current = dontShow;
  }, [dontShow]);

  useEffect(() => {
    if (!seen) {
      setDontShow(false);
      setStage("intro");
    }
  }, [seen]);

  // Persist starter selections via the StarterTileGrid event bus
  useEffect(() => {
    const onSave = (e: Event) => {
      const ev = e as CustomEvent<{ storeId: string; items: any[] }>;
      if (ev.detail?.storeId === store.id) {
        setMany(ev.detail.items);
      }
    };
    window.addEventListener("fanpact:starter-save", onSave);
    return () => window.removeEventListener("fanpact:starter-save", onSave);
  }, [store.id, setMany]);

  const finish = () => {
    if (dontShowRef.current) markSeen();
    setStage("done");
  };

  const supportFund = () => {
    set(defaultDesignation(store.id));
    setStage("starter");
  };

  if (stage === "done") return null;

  const isCollegiate = store.id === "butler";

  return (
    <>
      {stage === "intro" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4"
          onClick={finish}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-[var(--surface)] shadow-2xl"
          >
            <div
              className="relative px-6 py-5 text-white"
              style={{ background: "var(--brand)" }}
            >
              <button
                aria-label="Close"
                onClick={finish}
                className="absolute right-3 top-3 rounded-md p-1.5 text-white/80 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-3 flex justify-center">
                <FanPactLogo height={36} pill pillPadding="px-2 py-1" />
              </div>
              <div className="text-center text-[10px] font-semibold uppercase tracking-widest text-white/70">
                {store.shortName} × FanPact · Step 1 of 2
              </div>
              <h2 className="mt-1 text-center font-display text-2xl tracking-tight">
                {isCollegiate
                  ? `Welcome to the ${store.shortName} Community Store`
                  : "Who are you shopping for?"}
              </h2>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-muted-foreground">
                {isCollegiate
                  ? "Your purchases support Butler Athletics. Want to direct your contribution to a specific athlete?"
                  : "Search by player name or browse by sport and team. Your designation is remembered for every future purchase."}
              </p>

              {isCollegiate ? (
                <div className="mt-5 space-y-2">
                  <Button
                    size="lg"
                    onClick={() => setStage("picker")}
                    className="w-full"
                    style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
                  >
                    Designate a Specific Athlete
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={supportFund}
                    className="w-full"
                  >
                    Support {store.shortName} Athletics Fund
                  </Button>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  <button
                    onClick={() => setStage("picker")}
                    className="w-full rounded-md border border-border bg-muted/30 px-3 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-[var(--brand-accent)] hover:bg-muted/50"
                  >
                    Player name, team, or age group...
                  </button>
                  <Button
                    size="lg"
                    onClick={() => setStage("picker")}
                    className="w-full"
                    style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
                  >
                    Set My Designation
                  </Button>
                  <button
                    onClick={supportFund}
                    className="block w-full text-center text-xs font-semibold text-muted-foreground underline hover:text-foreground"
                  >
                    Shop for the community fund instead
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-border bg-muted/20 px-6 py-3">
              <SuppressCheckbox
                checked={dontShow}
                onCheckedChange={setDontShow}
                id="fp-suppress-intro"
              />
            </div>
          </div>
        </div>
      )}

      <DesignationModal
        open={stage === "picker"}
        storeId={store.id}
        onClose={() => {
          if (dontShowRef.current) markSeen();
          setStage("starter");
        }}
        onConfirm={(d) => {
          set(d);
          setStage("starter");
        }}
        title={`Designate your ${store.shortName} contribution`}
        suppressCheckbox={{ checked: dontShow, onChange: setDontShow }}
      />

      {stage === "starter" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4"
          onClick={finish}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-[var(--surface)] shadow-2xl"
          >
            <div
              className="relative px-6 py-4 text-white"
              style={{ background: "var(--brand)" }}
            >
              <button
                aria-label="Close"
                onClick={finish}
                className="absolute right-3 top-3 rounded-md p-1.5 text-white/80 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                {store.shortName} × FanPact · Step 2 of 2
              </div>
            </div>
            <StarterTileGrid
              storeId={store.id}
              onSave={finish}
              onSkip={finish}
              suppressCheckbox={{ checked: dontShow, onChange: setDontShow }}
            />
          </div>
        </div>
      )}
    </>
  );
}
