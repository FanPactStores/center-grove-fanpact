import { Link, createFileRoute } from "@tanstack/react-router";
import { MapPin, Baby, Stethoscope, Heart, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/cmn-st-johns-hero.jpg";

export const Route = createFileRoute("/cmn/st-johns/our-hospital")({
  head: () => ({
    meta: [
      { title: "Our Hospital — HSHS St. John's Children's Hospital × FanPact" },
      {
        name: "description",
        content:
          "HSHS St. John's Children's Hospital in Springfield, Illinois serves families across central and southern Illinois with comprehensive pediatric care.",
      },
      { property: "og:title", content: "Our Hospital — HSHS St. John's Children's Hospital" },
      {
        property: "og:description",
        content: "The region's only dedicated children's hospital, in Springfield, Illinois.",
      },
    ],
  }),
  component: OurHospital,
});

function OurHospital() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Colorful pediatric hospital corridor"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-black/75" />
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="text-xs uppercase tracking-[0.22em] text-white/70">Our hospital</div>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight tracking-tight text-white">
            HSHS St. John's Children's Hospital
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/85">
            <MapPin className="h-4 w-4" /> Springfield, Illinois
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <p className="text-lg leading-relaxed text-muted-foreground">
          HSHS St. John's Children's Hospital serves families throughout central and southern
          Illinois with comprehensive pediatric care, from routine checkups to life-saving
          treatments. As the region's only dedicated children's hospital, the hospital provides
          specialized care at every stage of a child's health journey, including a Level III
          Neonatal Intensive Care Unit, in partnership with Southern Illinois University School of
          Medicine.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Baby, t: "Level III NICU", d: "Advanced newborn intensive care." },
            {
              icon: Stethoscope,
              t: "SIU School of Medicine",
              d: "Specialized pediatric care in partnership.",
            },
            {
              icon: Heart,
              t: "Children's Miracle Network",
              d: "A CMN Hospital serving the region.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6">
              <c.icon className="h-6 w-6" style={{ color: "var(--brand-accent)" }} />
              <div className="mt-4 font-semibold">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-[var(--surface-2)] p-8">
          <h2 className="font-display text-2xl tracking-tight">Where your contribution goes</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            100% of your designated contribution supports HSHS St. John's Children's Hospital's
            greatest areas of need.
          </p>
          <Link
            to="/cmn/st-johns/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
            style={{ background: "var(--brand-accent)" }}
          >
            <ShoppingBag className="h-4 w-4" />
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
