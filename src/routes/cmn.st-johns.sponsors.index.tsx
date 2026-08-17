import { Link, createFileRoute } from "@tanstack/react-router";
import { Building2, Handshake, Store } from "lucide-react";

export const Route = createFileRoute("/cmn/st-johns/sponsors/")({
  head: () => ({
    meta: [
      { title: "Sponsors & Partners — HSHS St. John's Children's Hospital × FanPact" },
      {
        name: "description",
        content:
          "National brands, local partners, and enterprise partners supporting HSHS St. John's Children's Hospital through FanPact.",
      },
      { property: "og:title", content: "Sponsors & Partners — St. John's Children's × FanPact" },
      {
        property: "og:description",
        content: "The commercial ecosystem behind pediatric care in central and southern Illinois.",
      },
    ],
  }),
  component: Sponsors,
});

const TIERS = [
  {
    icon: Store,
    label: "National brands",
    body: "Everyday brands stocked in the storefront. Brand partners will be listed here.",
  },
  {
    icon: Handshake,
    label: "Local partners",
    body: "Springfield-area businesses supporting the hospital. Local partners coming soon.",
  },
  {
    icon: Building2,
    label: "Enterprise partners",
    body: "Enterprise partner programs for this storefront are being finalized.",
  },
];

function Sponsors() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
        Sponsors &amp; partners
      </div>
      <h1 className="mt-3 font-display text-5xl tracking-tight">
        The partners behind the storefront
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Sponsorship for the HSHS St. John's Children's Hospital storefront is open. Interested
        brands and local businesses will be listed here once onboarded.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TIERS.map((t) => (
          <div key={t.label} className="rounded-2xl border border-border bg-card p-7">
            <t.icon className="h-6 w-6" style={{ color: "var(--brand-accent)" }} />
            <h2 className="mt-4 font-display text-2xl tracking-tight">{t.label}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t.body}</p>
            <div className="mt-6 rounded-lg border border-dashed border-border p-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
              Coming soon
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/cmn/st-johns/shop"
        className="mt-12 inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color: "var(--brand-accent)" }}
      >
        Back to the storefront →
      </Link>
    </main>
  );
}
