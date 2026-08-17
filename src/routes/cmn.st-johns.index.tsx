import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Heart, MapPin, Baby, Stethoscope } from "lucide-react";
import heroImage from "@/assets/cmn-st-johns-hero.jpg";
import { STORES } from "@/data/stores";
import { CATEGORIES } from "@/data/categories";
import { FEATURED_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { EnterprisePartnerBanner } from "@/components/EnterprisePartnerBanner";

export const Route = createFileRoute("/cmn/st-johns/")({
  head: () => ({
    meta: [
      { title: "Shop & Support HSHS St. John's Children's Hospital — FanPact" },
      {
        name: "description",
        content:
          "Shop everyday essentials through the HSHS St. John's Children's Hospital storefront. 60% of net earnings funds pediatric care in Springfield, Illinois — at no added cost to you.",
      },
      { property: "og:title", content: "Shop & Support HSHS St. John's Children's Hospital" },
      {
        property: "og:description",
        content:
          "Every purchase helps fund life-saving pediatric care across central and southern Illinois.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StJohnsHome,
});

function StJohnsHome() {
  const store = STORES["cmn-st-johns"];

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Colorful pediatric hospital corridor with children's murals"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/88 via-black/70 to-black/45" />

        <div className="mx-auto max-w-7xl px-4 pb-28 pt-24 lg:px-8 lg:pt-32">
          <div className="max-w-3xl text-white">
            <div className="text-xs uppercase tracking-[0.22em] text-white/70">
              {store.heroEyebrow}
            </div>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight">
              Shop &amp; Support HSHS St. John's Children's Hospital
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/90 md:text-lg">
              Every purchase helps fund life-saving pediatric care in Springfield, Illinois, and
              across central and southern Illinois.
            </p>
            <p className="mt-5 max-w-2xl text-sm text-white/80">
              60% of net earnings from every purchase goes directly to HSHS St. John's Children's
              Hospital, at no added cost to you. The same shopping you already do, now helping kids
              get the care they need.
            </p>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70">
              Groceries. Household essentials. Personal care. Everyday purchases. Extraordinary
              impact.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/cmn/st-johns/shop"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg"
                style={{ background: "var(--brand-accent)" }}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
              </Link>
              <Link
                to="/cmn/st-johns/our-hospital"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10"
              >
                <Stethoscope className="h-4 w-4" />
                Our Hospital
              </Link>
            </div>

            <p className="mt-6 max-w-xl text-[11px] text-white/55">
              Demo experience; all products and contributions are illustrative. Hero photography is
              a placeholder pending Children's Miracle Network Brand Center approval.
            </p>
          </div>
        </div>
      </section>

      <EnterprisePartnerBanner store="center-grove" />

      {/* DESIGNATION */}
      <section className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8">
          <Heart className="mx-auto h-8 w-8" style={{ color: "var(--brand-accent)" }} />
          <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
            One designation. One mission.
          </h2>
          <p className="mt-4 text-muted-foreground">
            100% of your designated contribution supports HSHS St. John's Children's Hospital's
            greatest areas of need. There's nothing to pick and nothing extra to pay — just shop.
          </p>
        </div>
      </section>

      {/* OUR HOSPITAL SUMMARY */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Our hospital
            </div>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              The region's only dedicated children's hospital
            </h2>
            <p className="mt-5 text-muted-foreground">
              HSHS St. John's Children's Hospital serves families throughout central and southern
              Illinois with comprehensive pediatric care, from routine checkups to life-saving
              treatments. As the region's only dedicated children's hospital, the hospital provides
              specialized care at every stage of a child's health journey, including a Level III
              Neonatal Intensive Care Unit, in partnership with Southern Illinois University School
              of Medicine.
            </p>
            <Link
              to="/cmn/st-johns/our-hospital"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--brand-accent)" }}
            >
              Learn more about the hospital <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4" style={{ color: "var(--brand-accent)" }} />
              Springfield, Illinois
            </div>
            <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
              <Baby className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-accent)" }} />
              Level III Neonatal Intensive Care Unit
            </div>
            <div className="mt-4 flex items-start gap-3 text-sm text-muted-foreground">
              <Stethoscope className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-accent)" }} />
              In partnership with Southern Illinois University School of Medicine
            </div>
            <div className="mt-4 flex items-start gap-3 text-sm text-muted-foreground">
              <Heart className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brand-accent)" }} />
              A Children's Miracle Network Hospital
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-border bg-[var(--surface-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              Start shopping by category
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Browse everyday products from trusted brands. You're not spending more — just
              switching where you shop.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/cmn/st-johns/shop/$category"
                params={{ category: c.slug }}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-xl bg-stone-900 p-4 text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="relative">
                  <div className="font-display text-[10px] uppercase tracking-widest opacity-70">
                    {c.short}
                  </div>
                  <div className="mt-1 text-sm font-semibold leading-tight">{c.name}</div>
                  <div
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--gold)" }}
                  >
                    Shop <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Everyday essentials supporting kids in Illinois
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Shop the products you already buy — every purchase helps fund pediatric care.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {FEATURED_PRODUCTS.slice(0, 6).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              basePath={store.basePath}
              storeId={store.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
