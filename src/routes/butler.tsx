import { Outlet, createFileRoute } from "@tanstack/react-router";
import { StoreHeader } from "@/components/fanpact/StoreHeader";
import { StoreFooter } from "@/components/fanpact/StoreFooter";
import { UpcomingEventsBanner } from "@/components/UpcomingEventsBanner";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/butler")({
  component: ButlerLayout,
});

function ButlerLayout() {
  const store = STORES.butler;
  return (
    <div data-store="butler" className="min-h-screen bg-[var(--surface)] text-foreground">
      <UpcomingEventsBanner store="butler" />
      <StoreHeader store={store} />
      <Outlet />
      <StoreFooter store={store} />
    </div>
  );
}
