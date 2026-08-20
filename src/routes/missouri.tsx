import { Outlet, createFileRoute } from "@tanstack/react-router";
import { StoreHeader } from "@/components/fanpact/StoreHeader";
import { StoreFooter } from "@/components/fanpact/StoreFooter";
import { UpcomingEventsBanner } from "@/components/UpcomingEventsBanner";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/missouri")({
  component: MissouriLayout,
});

function MissouriLayout() {
  const store = STORES.missouri;
  return (
    <div data-store="missouri" className="min-h-screen bg-[var(--surface)] text-foreground">
      <UpcomingEventsBanner store="missouri" />
      <StoreHeader store={store} />
      <Outlet />
      <StoreFooter store={store} />
    </div>
  );
}
