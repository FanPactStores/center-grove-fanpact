import { Outlet, createFileRoute } from "@tanstack/react-router";
import { StoreHeader } from "@/components/fanpact/StoreHeader";
import { StoreFooter } from "@/components/fanpact/StoreFooter";
import { UpcomingEventsBanner } from "@/components/UpcomingEventsBanner";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/legacy")({
  component: LegacyLayout,
});

function LegacyLayout() {
  const store = STORES.legacy;
  return (
    <div data-store="legacy" className="min-h-screen bg-[var(--surface)] text-foreground">
      <UpcomingEventsBanner store="legacy" />
      <StoreHeader store={store} />
      <Outlet />
      <StoreFooter store={store} />
    </div>
  );
}
