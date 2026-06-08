import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { StoreConfig } from "@/data/stores";
import {
  defaultDesignation,
  useDesignation,
  useWelcomeSeen,
} from "@/lib/designation";
import { Button } from "@/components/ui/button";
import { DesignationModal } from "./DesignationModal";

export function WelcomeModal({ store }: { store: StoreConfig }) {
  const { seen, markSeen } = useWelcomeSeen(store.id);
  const { set } = useDesignation(store.id);
  const [open, setOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    if (!seen) setOpen(true);
  }, [seen]);

  const close = () => {
    markSeen();
    setOpen(false);
  };

  const supportFund = () => {
    set(defaultDesignation(store.id));
    close();
  };

  if (!open && !pickerOpen) return null;

  const isCollegiate = store.id === "butler";

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4"
          onClick={close}
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
                onClick={close}
                className="absolute right-3 top-3 rounded-md p-1.5 text-white/80 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                {store.shortName} × FanPact
              </div>
              <h2 className="mt-1 font-display text-2xl tracking-tight">
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
                    onClick={() => {
                      markSeen();
                      setOpen(false);
                      setPickerOpen(true);
                    }}
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
                    onClick={() => {
                      markSeen();
                      setOpen(false);
                      setPickerOpen(true);
                    }}
                    className="w-full rounded-md border border-border bg-muted/30 px-3 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-[var(--brand-accent)] hover:bg-muted/50"
                  >
                    Player name, team, or age group...
                  </button>
                  <Button
                    size="lg"
                    onClick={() => {
                      markSeen();
                      setOpen(false);
                      setPickerOpen(true);
                    }}
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
          </div>
        </div>
      )}
      <DesignationModal
        open={pickerOpen}
        storeId={store.id}
        onClose={() => setPickerOpen(false)}
        onConfirm={(d) => {
          set(d);
          markSeen();
          setPickerOpen(false);
        }}
        title={`Designate your ${store.shortName} contribution`}
      />
    </>
  );
}
