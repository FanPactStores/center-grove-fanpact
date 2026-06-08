import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { StoreConfig } from "@/data/stores";
import { ProductCard } from "./ProductCard";
import { useMyList, listToCatalogProducts } from "@/lib/my-list";

/** "Your Regulars" — appears on the store homepage when 3+ items are on the list. */
export function YourRegulars({ store }: { store: StoreConfig }) {
  const { items } = useMyList(store.id);
  if (items.length < 3) return null;
  const products = listToCatalogProducts(items).slice(0, 6);
  if (products.length === 0) return null;

  return (
    <section className="border-b border-border bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div
              className="text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "var(--community)" }}
            >
              Your Regulars
            </div>
            <h2 className="mt-1 font-display text-3xl tracking-tight md:text-4xl">
              The products you already buy.
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Every purchase here is a verified contribution.
            </p>
          </div>
          <Link
            to={`${store.basePath}/my-list` as "/butler/my-list"}
            className="hidden items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline md:inline-flex"
            style={{ color: "var(--brand-accent)" }}
          >
            Manage list <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              basePath={store.basePath}
              storeId={store.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
