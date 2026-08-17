import { Outlet, createFileRoute } from "@tanstack/react-router";
import { CauseStoreHeader, CauseStoreFooter } from "@/components/fanpact/CauseStoreChrome";
import { UpcomingEventsBanner } from "@/components/UpcomingEventsBanner";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/center-grove")({
  component: CenterGroveLayout,
});

function CenterGroveLayout() {
  const store = STORES["center-grove"];
  return (
    <div data-store="center-grove" className="min-h-screen bg-[var(--surface)] text-foreground">
      <UpcomingEventsBanner store="center-grove" />
      <CauseStoreHeader store={store} />
      <Outlet />
      <CauseStoreFooter store={store} />
    </div>
  );
}
