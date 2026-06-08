import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { usd } from "@/lib/format";

export function ProductCard({
  product,
  basePath,
}: {
  product: Product;
  basePath: string;
}) {
  return (
    <Link
      to={`${basePath}/product/$slug` as "/butler/product/$slug"}
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className="relative aspect-square w-full overflow-hidden"
        style={{ background: product.swatch }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl tracking-tight text-white/90 mix-blend-overlay">
            {product.brand.split(" ")[0]}
          </span>
        </div>
        <div className="absolute left-3 top-3 rounded-md bg-black/30 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
          {product.brand}
        </div>
        <div
          className="absolute right-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-semibold tabular-nums shadow-sm"
          style={{ background: "var(--community)", color: "var(--community-foreground)" }}
        >
          +{usd(product.contribution)} to community
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </div>
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:underline">
          {product.name}
        </h3>
        <div className="mt-auto flex items-baseline justify-between pt-2">
          <span className="font-display text-xl tracking-tight">{usd(product.price)}</span>
          <span className="text-xs font-medium" style={{ color: "var(--community)" }}>
            {usd(product.contribution)} community
          </span>
        </div>
      </div>
    </Link>
  );
}
