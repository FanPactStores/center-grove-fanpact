import { Link, createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronRight, LayoutGrid, List, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, getCategory, type Category } from "@/data/categories";
import { getProductsByCategory, productImage, type Product } from "@/data/products";
import { STORES } from "@/data/stores";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { PageSearchBar, matchesSearch } from "@/components/fanpact/SearchBar";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/legacy/shop/$category")({
  validateSearch: (search: Record<string, unknown>): { search?: string } => ({
    search: typeof search.search === "string" && search.search ? search.search : undefined,
  }),
  loader: ({ params }): { category: Category; products: Product[] } => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { category: cat, products: getProductsByCategory(cat.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.name ?? "Category"} — STL Legacy × FanPact` },
      { name: "description", content: loaderData?.category.blurb ?? "" },
    ],
  }),
  errorComponent: () => <ErrorView />,
  notFoundComponent: () => <ErrorView />,
  component: LegacyCategory,
});

function ErrorView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Category not found</h1>
      <Link to="/legacy/shop" className="mt-6 inline-block text-sm underline">Back to all products</Link>
    </main>
  );
}

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

function LegacyCategory() {
  const { category, products } = Route.useLoaderData() as { category: Category; products: Product[] };
  const store = STORES.legacy;
  const urlSearch = (Route.useSearch() as { search?: string }).search;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(urlSearch ?? "");

  const handleSearchChange = (v: string) => {
    setSearchQuery(v);
    navigate({
      to: "/legacy/shop/$category",
      params: { category: category.slug },
      search: v ? { search: v } : {},
      replace: true,
    });
  };

  const [activeSub, setActiveSub] = useState<string>("all");
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products],
  );

  const visible = useMemo(() => {
    let list = products.slice();
    if (searchQuery.trim()) list = list.filter((p) => matchesSearch(searchQuery, [p.name, p.brand]));
    if (activeSub !== "all") list = list.filter((p) => p.subcategory === activeSub);
    if (selectedBrands.size > 0) list = list.filter((p) => selectedBrands.has(p.brand));
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }, [products, activeSub, selectedBrands, sort, searchQuery]);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(b)) next.delete(b); else next.add(b);
      return next;
    });

  return (
    <main className="bg-background">
      <div className="border-b border-border bg-[var(--brand)] text-white">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 lg:px-8">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/legacy/shop/$category"
              params={{ category: c.slug }}
              className="shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors hover:bg-white/10"
              style={
                c.slug === category.slug
                  ? { background: "var(--brand-accent)", color: "white" }
                  : { color: "rgba(255,255,255,0.85)" }
              }
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/legacy" className="hover:text-foreground">Store</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{category.name}</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-5xl tracking-tight">{category.name}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{category.blurb}</p>
          </div>
          <Link to="/legacy" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--brand-accent)" }}>
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSub("all")}
            className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
            style={
              activeSub === "all"
                ? { background: "var(--brand-accent)", color: "white" }
                : { background: "var(--muted)", color: "var(--foreground)" }
            }
          >
            All {category.short}
          </button>
          {category.subcategories.map((s) => (
            <button
              key={s.slug}
              onClick={() => setActiveSub(s.slug)}
              className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
              style={
                activeSub === s.slug
                  ? { background: "var(--brand-accent)", color: "white" }
                  : { background: "var(--muted)", color: "var(--foreground)" }
              }
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className={`${filtersOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-20 lg:self-start`}>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm font-semibold">Filters</span>
                {selectedBrands.size > 0 && (
                  <button onClick={() => setSelectedBrands(new Set())} className="ml-auto text-xs underline" style={{ color: "var(--brand-accent)" }}>
                    Clear
                  </button>
                )}
              </div>
              <div className="mt-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Brands</div>
                <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
                  {brands.map((b) => (
                    <label key={b} className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedBrands.has(b)}
                        onChange={() => toggleBrand(b)}
                        className="h-4 w-4 rounded border-border accent-[var(--brand-accent)]"
                      />
                      {b}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <button onClick={() => setFiltersOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm lg:hidden">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <div className="text-sm">Showing <span className="font-bold">{visible.length}</span> products</div>
              <div className="ml-auto flex items-center gap-2">
                <div className="hidden items-center overflow-hidden rounded-md border border-border md:flex">
                  <button onClick={() => setView("grid")} aria-label="Grid view" className="p-2" style={{ background: view === "grid" ? "var(--brand-accent)" : "transparent", color: view === "grid" ? "white" : "var(--muted-foreground)" }}>
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button onClick={() => setView("list")} aria-label="List view" className="p-2" style={{ background: view === "list" ? "var(--brand-accent)" : "transparent", color: view === "list" ? "white" : "var(--muted-foreground)" }}>
                    <List className="h-4 w-4" />
                  </button>
                </div>
                <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="rounded-md border border-border bg-card px-3 py-2 text-sm">
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </div>
            </div>

            {visible.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
                No products match the selected filters.
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
                {visible.map((p: Product) => (
                  <ProductCard key={p.id} product={p} basePath={store.basePath} />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border rounded-xl border border-border bg-card">
                {visible.map((p: Product) => (
                  <Link key={p.id} to="/legacy/product/$slug" params={{ slug: p.slug }} className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50">
                    <img src={productImage(p, 240)} alt={p.name} width={96} height={96} loading="lazy" className="h-24 w-24 shrink-0 rounded-md bg-white object-contain p-1" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.brand}</div>
                      <div className="truncate text-sm font-semibold">{p.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">+{usd(p.contribution)} community contribution</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-xl tracking-tight" style={{ color: "var(--brand-accent)" }}>{usd(p.price)}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{p.inStock ? "In stock" : "Out of stock"}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
