import { useEffect } from "react";
import { X } from "lucide-react";
import type { StoreId } from "@/data/stores";
import { useMyList } from "@/lib/my-list";
import { StarterTileGrid } from "./StarterTileGrid";

export function StarterModal({
  open,
  storeId,
  onClose,
}: {
  open: boolean;
  storeId: StoreId;
  onClose: () => void;
}) {
  const { setMany } = useMyList(storeId);

  useEffect(() => {
    if (!open) return;
    const onSave = (e: Event) => {
      const ev = e as CustomEvent<{ storeId: string; items: any[] }>;
      if (ev.detail?.storeId === storeId) setMany(ev.detail.items);
    };
    window.addEventListener("fanpact:starter-save", onSave);
    return () => window.removeEventListener("fanpact:starter-save", onSave);
  }, [open, storeId, setMany]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
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
            onClick={onClose}
            className="absolute right-3 top-3 rounded-md p-1.5 text-white/80 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
            Build your shopping list
          </div>
        </div>
        <StarterTileGrid storeId={storeId} onSave={onClose} onSkip={onClose} />
      </div>
    </div>
  );
}
