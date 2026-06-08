import { Link } from "@tanstack/react-router";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { productImage } from "@/data/products";
import type { StoreId } from "@/data/stores";
import { useMyList } from "@/lib/my-list";
import { usd } from "@/lib/format";

export function ProductCard({
  product,
  basePath,
  storeId,
}: {
  product: Product;
  basePath: string;
  storeId?: StoreId;
}) {
  // storeId optional for backward compatibility; default per basePath
  const inferredStore = (storeId ??
    (basePath.replace(/^\//, "") as StoreId)) as StoreId;
  const { isOnList } = useMyList(inferredStore);
  const onList = isOnList(product);
  const [added, setAdded] = useState(false);
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      to={`${basePath}/product/$slug` as "/butler/product/$slug"}
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <img
          src={productImage(product, 600)}
          alt={product.name}
          loading="lazy"
          width={600}
          height={600}
          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {!product.inStock && (
          <div
            className="absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow"
            style={{ background: "var(--community)" }}
          >
            Out of Stock
          </div>
        )}
        <div
          className="absolute bottom-3 right-3 rounded-md px-2 py-1 text-[10px] font-bold tabular-nums shadow"
          style={{ background: "var(--community)", color: "var(--community-foreground)" }}
        >
          +{usd(product.contribution)}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </div>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </h3>
        <div
          className="font-display text-2xl tracking-tight"
          style={{ color: "var(--brand-accent)" }}
        >
          {usd(product.price)}
        </div>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={handleAdd}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: product.inStock ? "var(--brand-accent)" : "var(--muted)",
            color: product.inStock ? "white" : "var(--muted-foreground)",
          }}
        >
          {!product.inStock ? (
            "Out of Stock"
          ) : added ? (
            <>Added ✓</>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
