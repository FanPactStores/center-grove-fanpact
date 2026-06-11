import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { STORES } from "@/data/stores";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { CategorySidebar } from "@/components/fanpact/CategorySidebar";

export const Route = createFileRoute("/assa/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — ASSA × FanPact" },
      { name: "description", content: "Browse every product. 60% of net earnings flows to ASSA / Combat." },
    ],
  }),
  component: AssaShop,
});

function AssaShop() {
  const store = STORES.assa;
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">All categories</div>
        <h1 className="mt-2 font-display text-5xl tracking-tight">The ASSA store</h1>
      </div>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <CategorySidebar basePath={store.basePath} />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} basePath={store.basePath} />
          ))}
        </div>
      </div>
    </main>
  );
}
