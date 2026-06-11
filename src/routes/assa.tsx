import { Outlet, createFileRoute } from "@tanstack/react-router";
import { StoreHeader } from "@/components/fanpact/StoreHeader";
import { StoreFooter } from "@/components/fanpact/StoreFooter";
import { UpcomingEventsBanner } from "@/components/UpcomingEventsBanner";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/assa")({
  component: AssaLayout,
});

function AssaLayout() {
  const store = STORES.assa;
  return (
    <div data-store="assa" className="min-h-screen bg-[var(--surface)] text-foreground">
      <UpcomingEventsBanner store="assa" />
      <StoreHeader store={store} />
      <Outlet />
      <StoreFooter store={store} />
    </div>
  );
}
