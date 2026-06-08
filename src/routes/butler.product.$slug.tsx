import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ChevronRight,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { getProduct, getProductsByCategory, productImage } from "@/data/products";
import { getCategory } from "@/data/categories";
import { STORES } from "@/data/stores";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/butler/product/$slug")({
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
      { title: `${loaderData?.product.name ?? "Product"} — Butler × FanPact` },
      { name: "description", content: loaderData?.product.description ?? "" },
      {
        property: "og:image",
        content: loaderData ? productImage(loaderData.product, 1200) : "",
      },
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
      <Link to="/butler/shop" className="mt-6 inline-block text-sm underline">
        Back to shop
      </Link>
    </main>
  );
}

type TabKey = "description" | "specifications" | "shipping";

function ButlerProduct() {
  const { product, category, related } = Route.useLoaderData();
  const store = STORES.butler;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<TabKey>("description");

  const galleryVariants = [0, 1, 2, 3, 4];

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* BREADCRUMB */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link to="/butler" className="hover:text-foreground">
            Store
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            to="/butler/shop/$category"
            params={{ category: category.slug }}
            className="hover:text-foreground"
          >
            {category.name}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="line-clamp-1 text-foreground">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* GALLERY */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-border bg-white">
              <img
                src={productImage(product, 1200, activeImg)}
                alt={product.name}
                width={1200}
                height={1200}
                className="aspect-square w-full object-contain p-8"
              />
            </div>
            <div className="mt-4 grid grid-cols-5 gap-3">
              {galleryVariants.map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveImg(v)}
                  className="overflow-hidden rounded-lg border-2 bg-white p-1 transition-all"
                  style={{
                    borderColor:
                      activeImg === v ? "var(--brand-accent)" : "var(--border)",
                  }}
                  aria-label={`View image ${v + 1}`}
                >
                  <img
                    src={productImage(product, 240, v)}
                    alt={`${product.name} thumbnail ${v + 1}`}
                    width={240}
                    height={240}
                    loading="lazy"
                    className="aspect-square w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              SKU · {product.sku}
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {product.brand}
            </div>
            <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 flex items-baseline gap-4">
              <span
                className="font-display text-5xl tracking-tight"
                style={{ color: "var(--brand-accent)" }}
              >
                {usd(product.price)}
              </span>
            </div>

            <div
              className="mt-3 text-sm font-semibold"
              style={{ color: "var(--brand-accent)" }}
            >
              FanPact Community Contribution: {usd(product.contribution * qty)}
            </div>

            {/* STOCK */}
            <div
              className="mt-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm"
              style={{
                borderColor: product.inStock
                  ? "var(--community-soft)"
                  : "var(--border)",
                background: product.inStock
                  ? "color-mix(in oklab, var(--community) 8%, transparent)"
                  : "var(--muted)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: product.inStock
                    ? "var(--community)"
                    : "oklch(0.6 0.18 27)",
                }}
              />
              <span className="font-semibold">
                {product.inStock ? "In stock — ships fast" : "Out of stock"}
              </span>
            </div>

            {/* HIGHLIGHTS */}
            <div className="mt-8">
              <div className="font-semibold">Highlights</div>
              <ul className="mt-3 space-y-2 text-sm">
                {product.highlights.map((h: string) => (
                  <li key={h} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--brand-accent)" }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* QTY + ADD TO CART */}
            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center rounded-md border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3 hover:bg-muted"
                  aria-label="Decrease"
                  disabled={!product.inStock}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold tabular-nums">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-3 hover:bg-muted"
                  aria-label="Increase"
                  disabled={!product.inStock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                disabled={!product.inStock}
                onClick={() => {
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1800);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background: product.inStock
                    ? "var(--brand-accent)"
                    : "var(--muted)",
                  color: product.inStock ? "white" : "var(--muted-foreground)",
                }}
              >
                {!product.inStock ? (
                  "Out of Stock"
                ) : added ? (
                  <>
                    <Check className="h-5 w-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" /> Add to Cart —{" "}
                    {usd(product.price * qty)}
                  </>
                )}
              </button>
            </div>

            {/* TRUST ROW */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
              {[
                { icon: Truck, t: "Free Shipping", s: "Orders $35+" },
                { icon: ShieldCheck, t: "Secure Payment", s: "SSL encrypted" },
                { icon: RotateCcw, t: "Easy Returns", s: "30-day policy" },
              ].map((b) => (
                <div key={b.t} className="text-center">
                  <b.icon
                    className="mx-auto h-5 w-5"
                    style={{ color: "var(--brand-accent)" }}
                  />
                  <div className="mt-2 text-xs font-semibold">{b.t}</div>
                  <div className="text-[10px] text-muted-foreground">{b.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <section className="mt-16">
          <div className="flex gap-6 border-b border-border">
            {(
              [
                ["description", "Description"],
                ["specifications", "Specifications"],
                ["shipping", "Shipping"],
              ] as [TabKey, string][]
            ).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className="relative -mb-px py-3 text-sm font-semibold transition-colors"
                style={{
                  color: tab === k ? "var(--foreground)" : "var(--muted-foreground)",
                  borderBottom:
                    tab === k
                      ? `2px solid var(--brand-accent)`
                      : "2px solid transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground/80">
            {tab === "description" && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <p className="text-muted-foreground">
                  Every purchase of {product.brand} {product.name} through the Butler
                  FanPact storefront contributes {usd(product.contribution)} to {store.fundName},
                  helping fund NIL opportunities for Butler student-athletes.
                </p>
              </div>
            )}
            {tab === "specifications" && (
              <table className="w-full overflow-hidden rounded-lg border border-border text-sm">
                <tbody className="divide-y divide-border">
                  {product.specs.map((s: { label: string; value: string }) => (
                    <tr key={s.label}>
                      <td className="w-1/3 bg-muted/50 px-4 py-3 font-semibold">
                        {s.label}
                      </td>
                      <td className="px-4 py-3 text-foreground/80">{s.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="w-1/3 bg-muted/50 px-4 py-3 font-semibold">
                      Brand
                    </td>
                    <td className="px-4 py-3 text-foreground/80">{product.brand}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 bg-muted/50 px-4 py-3 font-semibold">SKU</td>
                    <td className="px-4 py-3 font-mono text-xs text-foreground/80">
                      {product.sku}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {tab === "shipping" && (
              <div className="space-y-3">
                <p>
                  <strong>Free standard shipping</strong> on orders over $35. Orders typically
                  ship within 1–2 business days from a U.S. fulfillment center.
                </p>
                <p>
                  Expedited and 2-day shipping options are available at checkout. Most U.S.
                  addresses receive standard shipments in 3–5 business days.
                </p>
                <p>
                  <strong>Returns:</strong> 30 days from delivery. Original packaging required.
                  Return shipping is free for defective items.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  More in {category.name}
                </div>
                <h2
                  className="mt-2 font-display text-3xl tracking-tight"
                  style={{ color: "var(--brand-accent)" }}
                >
                  You might also like
                </h2>
              </div>
              <Link
                to="/butler/shop/$category"
                params={{ category: category.slug }}
                className="text-sm font-semibold"
                style={{ color: "var(--brand-accent)" }}
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {related.map((p: typeof product) => (
                <ProductCard key={p.id} product={p} basePath={store.basePath} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
