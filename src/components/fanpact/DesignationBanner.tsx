import { useState } from "react";
import { Pencil, Target } from "lucide-react";
import type { StoreConfig } from "@/data/stores";
import { useDesignation } from "@/lib/designation";
import { useMyList } from "@/lib/my-list";
import { DesignationModal } from "./DesignationModal";
import { StarterModal } from "./StarterModal";

export function DesignationBanner({ store }: { store: StoreConfig }) {
  const { designation, isCustom, set } = useDesignation(store.id);
  const { count: listCount } = useMyList(store.id);
  const [open, setOpen] = useState(false);
  const [starterOpen, setStarterOpen] = useState(false);


  return (
    <>
      <div
        className="border-b text-xs"
        style={{
          background: "color-mix(in oklab, var(--community) 12%, white)",
          borderColor: "color-mix(in oklab, var(--community) 30%, white)",
          color: "var(--ink)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 lg:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <Target
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: "var(--community)" }}
            />
            <span className="truncate">
              <span className="text-muted-foreground">Contributing to:</span>{" "}
              <span className="font-semibold" style={{ color: "var(--community)" }}>
                {designation.name}
              </span>
              {designation.subtitle && (
                <span className="ml-1 text-muted-foreground">
                  · {designation.subtitle}
                </span>
              )}
            </span>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors hover:bg-black/5"
            style={{ color: "var(--community)" }}
            aria-label="Change designation"
          >
            <Pencil className="h-3 w-3" />
            {isCustom ? "Change" : "Designate"}
          </button>
        </div>
      </div>
      <DesignationModal
        open={open}
        storeId={store.id}
        onClose={() => setOpen(false)}
        onConfirm={(d) => {
          set(d);
          setOpen(false);
        }}
        title={`Choose your ${store.shortName} designation`}
      />
    </>
  );
}
