import { Outlet, createFileRoute } from "@tanstack/react-router";
import { CauseStoreHeader, CauseStoreFooter } from "@/components/fanpact/CauseStoreChrome";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/cmn/st-johns")({
  component: StJohnsLayout,
});

function StJohnsLayout() {
  const store = STORES["cmn-st-johns"];
  return (
    <div data-store="cmn-st-johns" className="min-h-screen bg-[var(--surface)] text-foreground">
      <CauseStoreHeader store={store} />
      <Outlet />
      <CauseStoreFooter store={store} />
    </div>
  );
}
