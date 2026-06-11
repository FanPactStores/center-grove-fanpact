import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { STORES } from "@/data/stores";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { CategorySidebar } from "@/components/fanpact/CategorySidebar";
import { PageSearchBar, matchesSearch } from "@/components/fanpact/SearchBar";

type ShopSearch = { search?: string };

export const Route = createFileRoute("/center-grove/shop/")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    search: typeof search.search === "string" && search.search ? search.search : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — Center Grove × FanPact" },
      { name: "description", content: "Browse every product. 60% of net earnings flows to Center Grove Athletics." },
    ],
  }),
  component: CenterGroveShop,
});

function CenterGroveShop() {
  const store = STORES["center-grove"];
  const { search } = Route.useSearch();
  const navigate = useNavigate();
  const query = search ?? "";

  const setQuery = (v: string) => {
    navigate({
      to: "/center-grove/shop",
      search: v ? { search: v } : {},
      replace: true,
    });
  };

  const visible = PRODUCTS.filter((p) => matchesSearch(query, [p.name, p.brand]));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">All categories</div>
        <h1 className="mt-2 font-display text-5xl tracking-tight">The Center Grove store</h1>
      </div>
      <div className="mb-8">
        <PageSearchBar value={query} onChange={setQuery} />
        {query && (
          <p className="mt-3 text-sm text-muted-foreground">
            {visible.length} {visible.length === 1 ? "result" : "results"} for "{query}"
          </p>
        )}
      </div>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <CategorySidebar basePath={store.basePath} />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} basePath={store.basePath} />
          ))}
        </div>
      </div>
    </main>
  );
}
