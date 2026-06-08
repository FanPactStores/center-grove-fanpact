import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { STORES } from "@/data/stores";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { CategorySidebar } from "@/components/fanpact/CategorySidebar";

export const Route = createFileRoute("/assa/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — STL Legacy × FanPact" },
      { name: "description", content: "Browse every product. 60% of net earnings flows to STL Legacy / Klutch." },
    ],
  }),
  component: LegacyShop,
});

function LegacyShop() {
  const store = STORES.legacy;
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">All categories</div>
        <h1 className="mt-2 font-display text-5xl tracking-tight">The Legacy store</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {PRODUCTS.length} products across 7 categories. Every purchase contributes to {store.fundName}.
        </p>
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
