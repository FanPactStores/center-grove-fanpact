import { Link, createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { PRODUCTS, productImage } from "@/data/products";
import { STORES } from "@/data/stores";
import { ContributionCallout } from "@/components/fanpact/ContributionCallout";
import { Button } from "@/components/ui/button";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/assa/cart")({
  head: () => ({ meta: [{ title: "Cart — ASSA × FanPact" }] }),
  component: AssaCart,
});

function AssaCart() {
  const store = STORES.assa;
  const initial = ["tide-pods-original-81ct", "gatorade-thirst-quencher-variety-24pk", "nike-dri-fit-training-tee"]
    .map((s) => ({ product: PRODUCTS.find((p) => p.slug === s)!, qty: s === "nike-dri-fit-training-tee" ? 2 : 1 }))
    .filter((i) => i.product);
  const [items, setItems] = useState(initial);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const contribution = items.reduce((s, i) => s + i.product.contribution * i.qty, 0);
  const shipping = subtotal > 50 ? 0 : 6.99;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const total = subtotal + shipping + tax;

  const setQty = (slug: string, qty: number) =>
    setItems((prev) => prev.map((i) => i.product.slug === slug ? { ...i, qty: Math.max(1, qty) } : i));
  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.product.slug !== slug));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl tracking-tight">Cart</h1>
      <p className="mt-2 text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""} · designated to {store.fundName}</p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-4"><Link to="/assa/shop">Browse the store</Link></Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {items.map(({ product, qty }) => (
              <div key={product.slug} className="flex gap-4 p-4">
                <img src={productImage(product, 200)} alt={product.name} width={96} height={96} loading="lazy" className="h-24 w-24 shrink-0 rounded-md bg-white object-contain p-1" />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.brand}</div>
                  <Link to="/assa/product/$slug" params={{ slug: product.slug }} className="line-clamp-1 text-sm font-medium hover:underline">
                    {product.name}
                  </Link>
                  <div className="mt-1 text-xs font-medium" style={{ color: "var(--community)" }}>+{usd(product.contribution * qty)} community contribution</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center rounded-md border border-border">
                      <button onClick={() => setQty(product.slug, qty - 1)} className="p-1.5 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-xs font-semibold tabular-nums">{qty}</span>
                      <button onClick={() => setQty(product.slug, qty + 1)} className="p-1.5 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => remove(product.slug)} className="text-xs text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-lg">{usd(product.price * qty)}</div>
                  {qty > 1 && <div className="text-xs text-muted-foreground">{usd(product.price)} ea</div>}
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-4">
            <ContributionCallout amount={contribution} fundName={store.fundName} />
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="space-y-2 text-sm">
                <Row label="Subtotal" value={usd(subtotal)} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : usd(shipping)} />
                <Row label="Tax (est.)" value={usd(tax)} />
                <div className="my-2 h-px bg-border" />
                <Row label="Est. community contribution" value={usd(contribution)} accent />
                <div className="my-2 h-px bg-border" />
                <Row label="Total" value={usd(total)} large />
              </div>
              <Button size="lg" className="mt-5 w-full" style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}>Checkout</Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">Demo checkout — no payment will be captured.</p>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

function Row({ label, value, large, accent }: { label: string; value: string; large?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={large ? "font-medium" : "text-muted-foreground"}>{label}</span>
      <span className={large ? "font-display text-2xl tracking-tight" : "tabular-nums"} style={accent ? { color: "var(--community)", fontWeight: 600 } : undefined}>
        {value}
      </span>
    </div>
  );
}
