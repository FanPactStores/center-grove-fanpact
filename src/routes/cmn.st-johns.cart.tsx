import { Link, createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import { useState } from "react";
import { PRODUCTS, productImage } from "@/data/products";
import { STORES } from "@/data/stores";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/cmn/st-johns/cart")({
  head: () => ({
    meta: [
      { title: "Cart — HSHS St. John's Children's Hospital × FanPact" },
      {
        name: "description",
        content:
          "Review your cart. 60% of net earnings supports HSHS St. John's Children's Hospital's greatest areas of need.",
      },
      { property: "og:title", content: "Cart — St. John's Children's × FanPact" },
      { property: "og:description", content: "Everyday essentials that fund pediatric care." },
    ],
  }),
  component: StJohnsCart,
});

function StJohnsCart() {
  const store = STORES["cmn-st-johns"];
  const initial = PRODUCTS.slice(0, 3).map((product, i) => ({ product, qty: i === 2 ? 2 : 1 }));
  const [items, setItems] = useState(initial);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const contribution = items.reduce((s, i) => s + i.product.contribution * i.qty, 0);
  const shipping = subtotal > 50 ? 0 : 6.99;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const total = subtotal + shipping + tax;

  const setQty = (slug: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) => (i.product.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)),
    );
  const remove = (slug: string) =>
    setItems((prev) => prev.filter((i) => i.product.slug !== slug));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl tracking-tight">Cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="divide-y divide-border">
          {items.length === 0 && (
            <p className="py-10 text-muted-foreground">
              Your cart is empty.{" "}
              <Link to="/cmn/st-johns/shop" className="underline">
                Start shopping
              </Link>
              .
            </p>
          )}
          {items.map(({ product, qty }) => (
            <div key={product.slug} className="flex gap-4 py-6">
              <img
                src={productImage(product, 200)}
                alt={product.name}
                loading="lazy"
                className="h-24 w-24 shrink-0 rounded-lg border border-border bg-white object-contain p-2"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {product.brand}
                </div>
                <Link
                  to="/cmn/st-johns/product/$slug"
                  params={{ slug: product.slug }}
                  className="font-semibold hover:underline"
                >
                  {product.name}
                </Link>
                <div className="mt-2 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button
                      aria-label="Decrease quantity"
                      className="p-2"
                      onClick={() => setQty(product.slug, qty - 1)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                    <button
                      aria-label="Increase quantity"
                      className="p-2"
                      onClick={() => setQty(product.slug, qty + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(product.slug)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold tabular-nums">{usd(product.price * qty)}</div>
                <div className="mt-1 text-[11px]" style={{ color: "var(--brand-accent)" }}>
                  {usd(product.contribution * qty)} to the hospital
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-7">
          <h2 className="font-display text-2xl tracking-tight">Order summary</h2>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">{usd(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="tabular-nums">{shipping === 0 ? "Free" : usd(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Est. tax</dt>
              <dd className="tabular-nums">{usd(tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd className="tabular-nums">{usd(total)}</dd>
            </div>
          </dl>

          <div
            className="mt-6 rounded-xl p-4 text-sm"
            style={{
              background: "color-mix(in oklab, var(--brand-accent) 10%, white)",
              color: "var(--ink)",
            }}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Heart className="h-4 w-4" style={{ color: "var(--brand-accent)" }} />
              {usd(contribution)} contribution
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              100% of your designated contribution supports HSHS St. John's Children's Hospital's
              greatest areas of need.
            </p>
          </div>

          <Button className="mt-6 w-full" size="lg">
            Checkout
          </Button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Demo checkout — {store.name}. No payment is processed.
          </p>
        </aside>
      </div>
    </main>
  );
}
