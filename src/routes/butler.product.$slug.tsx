import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { getProduct, getProductsByCategory } from "@/data/products";
import { getCategory } from "@/data/categories";
import { STORES } from "@/data/stores";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { ContributionCallout } from "@/components/fanpact/ContributionCallout";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/butler/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return {
      product,
      category: getCategory(product.category)!,
      related: getProductsByCategory(product.category).filter((p) => p.slug !== product.slug).slice(0, 4),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Butler × FanPact` },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  errorComponent: () => <NotFoundView />,
  notFoundComponent: () => <NotFoundView />,
  component: ButlerProduct,
});

function NotFoundView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Product not found</h1>
      <Link to="/butler/shop" className="mt-6 inline-block text-sm underline">Back to shop</Link>
    </main>
  );
}

function ButlerProduct() {
  const { product, category, related } = Route.useLoaderData();
  const store = STORES.butler;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <nav className="mb-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Link to="/butler/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <Link to="/butler/shop/$category" params={{ category: category.slug }} className="hover:text-foreground">{category.name}</Link>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div
          className="relative aspect-square overflow-hidden rounded-2xl"
          style={{ background: product.swatch }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-9xl tracking-tight text-white/85 mix-blend-overlay">
              {product.brand.split(" ")[0]}
            </span>
          </div>
          <div className="absolute left-4 top-4 rounded-md bg-black/30 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur">
            {product.brand}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</div>
          <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight">{product.name}</h1>
          <div className="mt-5 flex items-baseline gap-4">
            <span className="font-display text-5xl tracking-tight">{usd(product.price)}</span>
            <span className="rounded-md px-2.5 py-1 text-xs font-semibold" style={{ background: "var(--community)", color: "var(--community-foreground)" }}>
              +{usd(product.contribution)} community
            </span>
          </div>
          <p className="mt-6 text-foreground/80">{product.description}</p>

          <div className="mt-8">
            <ContributionCallout
              amount={product.contribution * qty}
              fundName={store.fundName}
            />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 hover:bg-muted" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold tabular-nums">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2 hover:bg-muted" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
              onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1800); }}
            >
              {added ? (<><Check className="h-4 w-4" /> Added to cart</>) : (<><ShoppingBag className="h-4 w-4" /> Add to cart — {usd(product.price * qty)}</>)}
            </Button>
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Product details</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {product.details.map((d: string) => (
                <li key={d} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /> {d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">More in {category.name}</div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((p: typeof product) => (
              <ProductCard key={p.id} product={p} basePath={store.basePath} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
