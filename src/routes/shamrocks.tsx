import { Outlet, createFileRoute } from "@tanstack/react-router";
import { CauseStoreHeader, CauseStoreFooter } from "@/components/fanpact/CauseStoreChrome";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/shamrocks")({
  component: ShamrocksLayout,
});

function ShamrocksLayout() {
  const store = STORES["shamrocks"];
  return (
    <div data-store="shamrocks" className="min-h-screen bg-[var(--surface)] text-foreground">
      <CauseStoreHeader store={store} />
      <Outlet />
      <CauseStoreFooter store={store} />
    </div>
  );
}
