import { Outlet, createFileRoute } from "@tanstack/react-router";
import { CauseStoreHeader, CauseStoreFooter } from "@/components/fanpact/CauseStoreChrome";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/cause/west-side-christian-church")({
  component: WestSideLayout,
});

function WestSideLayout() {
  const store = STORES["west-side-christian"];
  return (
    <div
      data-store="west-side-christian"
      className="min-h-screen bg-[var(--surface)] text-foreground"
    >
      <CauseStoreHeader store={store} />
      <Outlet />
      <CauseStoreFooter store={store} />
    </div>
  );
}
