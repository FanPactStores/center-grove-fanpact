import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ChevronRight, Heart, Minus, Plus, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { getProduct, getProductsByCategory, productImage } from "@/data/products";
import { getCategory } from "@/data/categories";
import { STORES } from "@/data/stores";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/cmn/st-johns/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return {
      product,
      category: getCategory(product.category)!,
      related: getProductsByCategory(product.category)
        .filter((p) => p.slug !== product.slug)
        .slice(0, 4),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.product.name ?? "Product"} — HSHS St. John's Children's Hospital × FanPact`,
      },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: loaderData?.product.name ?? "Product" },
      { property: "og:description", content: loaderData?.product.description ?? "" },
      {
        property: "og:image",
        content: loaderData ? productImage(loaderData.product, 1200) : "",
      },
    ],
  }),
  errorComponent: () => <NotFoundView />,
  notFoundComponent: () => <NotFoundView />,
  component: StJohnsProduct,
});

function NotFoundView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Product not found</h1>
      <Link to="/cmn/st-johns/shop" className="mt-6 inline-block text-sm underline">
        Back to all products
      </Link>
    </main>
  );
}

function StJohnsProduct() {
  const { product, category, related } = Route.useLoaderData();
  const store = STORES["cmn-st-johns"];
  const [qty, setQty] = useState(1);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link to="/cmn/st-johns/shop" className="hover:underline">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          to="/cmn/st-johns/shop/$category"
          params={{ category: category.slug }}
          className="hover:underline"
        >
          {category.name}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <img
            src={productImage(product, 900)}
            alt={product.name}
            width={900}
            height={900}
            className="h-full w-full object-contain p-8"
          />
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {product.brand}
          </div>
          <h1 className="mt-2 font-display text-4xl tracking-tight">{product.name}</h1>
          <div className="mt-4 text-3xl font-semibold tabular-nums">{usd(product.price)}</div>

          <div
            className="mt-5 flex items-start gap-2 rounded-xl p-4 text-sm"
            style={{
              background: "color-mix(in oklab, var(--brand-accent) 10%, white)",
              color: "var(--ink)",
            }}
          >
            <Heart className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-accent)" }} />
            <span>
              <strong>{usd(product.contribution)}</strong> of this purchase supports HSHS St. John's
              Children's Hospital's greatest areas of need.
            </span>
          </div>

          <p className="mt-6 text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center rounded-md border border-border">
              <button aria-label="Decrease quantity" className="p-3" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center tabular-nums">{qty}</span>
              <button aria-label="Increase quantity" className="p-3" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button size="lg" className="flex-1 gap-2" asChild>
              <Link to="/cmn/st-johns/cart">
                <ShoppingCart className="h-4 w-4" />
                Add to cart
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> Free shipping over $50
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Contributions verified &amp; documented
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl tracking-tight">More in {category.name}</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} basePath={store.basePath} storeId={store.id} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
