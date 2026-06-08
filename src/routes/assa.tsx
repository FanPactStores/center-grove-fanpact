import { Outlet, createFileRoute } from "@tanstack/react-router";
import { StoreHeader } from "@/components/fanpact/StoreHeader";
import { StoreFooter } from "@/components/fanpact/StoreFooter";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/assa")({
  component: LegacyLayout,
});

function LegacyLayout() {
  const store = STORES.legacy;
  return (
    <div data-store="legacy" className="min-h-screen bg-[var(--surface)] text-foreground">
      <StoreHeader store={store} />
      <Outlet />
      <StoreFooter store={store} />
    </div>
  );
}
