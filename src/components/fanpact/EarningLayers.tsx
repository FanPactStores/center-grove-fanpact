import { CreditCard, MapPin, UtensilsCrossed } from "lucide-react";

export function EarningLayers({ fundName }: { fundName: string }) {
  const layers = [
    {
      icon: CreditCard,
      tag: "Layer 1 — Interchange",
      title: "Stripe interchange on every transaction",
      body: "Every tap, anywhere Visa is accepted, generates interchange revenue. A baseline contribution flows back automatically — even at merchants with no partnership.",
    },
    {
      icon: MapPin,
      tag: "Layer 2 — Card-linked offers",
      title: "Fidel card-linked discounts at enrolled merchants",
      body: "Local and national brands enrolled in the Fidel network fund cashback on qualifying purchases — no coupons, no codes. The card recognizes the merchant and the discount lands.",
    },
    {
      icon: UtensilsCrossed,
      tag: "Layer 3 — Dining rewards",
      title: "Rewards Network 5% cashback at 20,000+ restaurants",
      body: "Eat at any participating restaurant in the Rewards Network and earn a flat 5% back. From neighborhood spots to national chains — the card does the work.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 lg:px-8">
      <div className="rounded-2xl border border-border bg-card p-8 lg:p-12">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            How the card earns
          </div>
          <h2 className="mt-2 font-display text-4xl tracking-tight">
            Three earning layers. One{" "}
            <span style={{ color: "var(--community)" }}>60/40 split</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every dollar of revenue the card generates is split the same way:{" "}
            <span className="font-semibold text-foreground">60% to {fundName}</span>{" "}
            and{" "}
            <span className="font-semibold text-foreground">40% to FanPact</span> to
            run the platform. No fine print, no tiers, no caps.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {layers.map((l) => (
            <div
              key={l.tag}
              className="rounded-xl border border-border p-6"
              style={{ background: "var(--background)" }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "var(--community-soft)", color: "var(--community)" }}
              >
                <l.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {l.tag}
              </div>
              <div className="mt-1 font-display text-xl leading-snug tracking-tight">
                {l.title}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{l.body}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-lg border p-4 text-sm"
          style={{
            background: "var(--community-soft)",
            borderColor: "color-mix(in oklab, var(--community) 40%, transparent)",
          }}
        >
          <span className="font-semibold" style={{ color: "var(--community)" }}>
            60% of net earnings
          </span>{" "}
          <span className="text-foreground/80">
            from all three layers flows to {fundName}. The remaining 40% keeps FanPact
            running — issuing cards, settling contributions, and reporting transparently.
          </span>
        </div>
      </div>
    </section>
  );
}
