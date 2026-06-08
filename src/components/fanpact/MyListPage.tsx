import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Plus, Check, ListChecks, Search } from "lucide-react";
import { PRODUCTS, productImage, type Product } from "@/data/products";
import { CATEGORIES, type CategorySlug } from "@/data/categories";
import { type StoreConfig } from "@/data/stores";
import { useMyList, productKey, type MyListItem } from "@/lib/my-list";
import { useDesignation } from "@/lib/designation";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/format";

const FILTER_GROUPS: { id: "all" | CategorySlug; label: string }[] = [
  { id: "all", label: "All" },
  { id: "home-living", label: "Cleaning" },
  { id: "pet-supplies", label: "Pet" },
  { id: "beauty-personal-care", label: "Personal Care" },
  { id: "kitchen-dining", label: "Pantry" },
  { id: "baby-kids", label: "Baby & Home" },
  { id: "fitness-outdoor", label: "Sports & Fitness" },
];

export function MyListPage({ store }: { store: StoreConfig }) {
  const { items, remove, add, hasKey } = useMyList(store.id);
  const { designation } = useDesignation(store.id);
  const [filter, setFilter] = useState<"all" | CategorySlug>("all");
  const [query, setQuery] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    if (filter !== "all" && p.category !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.brand.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  const handleAdd = (p: Product) => {
    add({
      key: productKey(p),
      name: p.name,
      brand: p.brand,
      category: CATEGORIES.find((c) => c.slug === p.category)?.name ?? p.category,
      productSlug: p.slug,
    });
    toast.success("Added to your regular purchases.");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="flex items-center gap-3">
        <ListChecks
          className="h-7 w-7"
          style={{ color: "var(--brand-accent)" }}
        />
        <h1 className="font-display text-5xl tracking-tight">Your Regular Purchases</h1>
      </div>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        Products you buy regularly. Every purchase here generates a verified
        community contribution for{" "}
        <span className="font-semibold text-foreground">{designation.name}</span>.
      </p>

      {/* CURRENT LIST */}
      <section className="mt-10">
        <h2 className="font-display text-2xl tracking-tight">
          On your list ({items.length})
        </h2>
        {items.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
            Your list is empty. Add products below to start building your regular-purchases list.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {items.map((i) => (
              <ListItemCard
                key={i.key}
                item={i}
                onRemove={() => {
                  remove(i.key);
                  toast("Removed from your list.");
                }}
                basePath={store.basePath}
              />
            ))}
          </div>
        )}
      </section>

      {/* ADD MORE */}
      <section className="mt-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-2xl tracking-tight">Add More Products</h2>
            <p className="text-sm text-muted-foreground">
              Browse the catalog and tap to add to your list.
            </p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-md border border-border bg-[var(--surface)] py-2 pl-9 pr-3 text-sm outline-none focus:border-[var(--brand-accent)]"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTER_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setFilter(g.id)}
              className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
              style={{
                background: filter === g.id ? "var(--brand-accent)" : "transparent",
                color: filter === g.id ? "white" : "var(--foreground)",
                borderColor:
                  filter === g.id ? "var(--brand-accent)" : "var(--border)",
              }}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filtered.slice(0, 48).map((p) => {
            const onList = hasKey(productKey(p));
            return (
              <div
                key={p.id}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
              >
                <Link
                  to={`${store.basePath}/product/$slug` as "/butler/product/$slug"}
                  params={{ slug: p.slug }}
                  className="relative aspect-square w-full overflow-hidden bg-white"
                >
                  <img
                    src={productImage(p, 400)}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-3"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {p.brand}
                  </div>
                  <div className="line-clamp-2 min-h-[2.25rem] text-xs font-semibold">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {usd(p.price)} · +{usd(p.contribution)}
                  </div>
                  <Button
                    size="sm"
                    variant={onList ? "outline" : "default"}
                    disabled={onList}
                    onClick={() => handleAdd(p)}
                    className="mt-1 w-full"
                  >
                    {onList ? (
                      <>
                        <Check className="mr-1 h-3 w-3" /> On Your List
                      </>
                    ) : (
                      <>
                        <Plus className="mr-1 h-3 w-3" /> Add to My List
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No products match your filters.
          </p>
        )}
      </section>
    </main>
  );
}

function ListItemCard({
  item,
  onRemove,
  basePath,
}: {
  item: MyListItem;
  onRemove: () => void;
  basePath: string;
}) {
  const product = item.productSlug
    ? PRODUCTS.find((p) => p.slug === item.productSlug)
    : undefined;
  const inner = (
    <>
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        {product ? (
          <img
            src={productImage(product, 400)}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-contain p-3"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-center text-sm font-bold uppercase text-muted-foreground">
            {item.brand}
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
          aria-label="Remove from list"
          className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-muted-foreground shadow hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {item.brand}
        </div>
        <div className="line-clamp-2 text-xs font-semibold">{item.name}</div>
        <div className="mt-auto text-[10px] text-muted-foreground">
          {item.category}
        </div>
      </div>
    </>
  );
  return product ? (
    <Link
      to={`${basePath}/product/$slug` as "/butler/product/$slug"}
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md"
    >
      {inner}
    </Link>
  ) : (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      {inner}
    </div>
  );
}
