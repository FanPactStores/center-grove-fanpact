import { Outlet, createFileRoute } from "@tanstack/react-router";
import { StoreHeader } from "@/components/fanpact/StoreHeader";
import { StoreFooter } from "@/components/fanpact/StoreFooter";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/center-grove")({
  component: CenterGroveLayout,
});

function CenterGroveLayout() {
  const store = STORES["center-grove"];
  return (
    <div data-store="center-grove" className="min-h-screen bg-[var(--surface)] text-foreground">
      <StoreHeader store={store} />
      <Outlet />
      <StoreFooter store={store} />
    </div>
  );
}
