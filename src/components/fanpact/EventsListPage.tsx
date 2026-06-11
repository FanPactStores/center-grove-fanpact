import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Clock, Star, Zap, Sparkles } from "lucide-react";
import { eventsForStore, isPast, type EventCategory, type StoreEvent } from "@/data/events";
import type { StoreConfig } from "@/data/stores";

const NAVY = "#13294B";
const GOLD = "#BA7517";
const GREEN = "#1A7A4A";

const FILTERS: { label: string; value: "all" | EventCategory }[] = [
  { label: "All Events", value: "all" },
  { label: "Sports Camps", value: "Sports Camp" },
  { label: "Community Events", value: "Community Event" },
];

function tagColor(kind: StoreEvent["kind"]) {
  if (kind === "camp") return { bg: GOLD, fg: "#0b1220" };
  if (kind === "army") return { bg: NAVY, fg: "#fff" };
  return { bg: GREEN, fg: "#fff" };
}

function IconFor({ kind, className }: { kind: StoreEvent["kind"]; className?: string }) {
  if (kind === "camp") return <Zap className={className} />;
  if (kind === "army") return <Star className={className} />;
  return <Sparkles className={className} />;
}

export function EventsListPage({ store }: { store: StoreConfig }) {
  const all = eventsForStore(store.id);
  const [filter, setFilter] = useState<"all" | EventCategory>("all");
  const visible = filter === "all" ? all : all.filter((e) => e.category === filter || (filter === "Community Event" && e.category === "FanPact Community Event"));

  return (
    <main className="bg-background">
      {/* Header */}
      <section className="border-b border-border" style={{ background: NAVY, color: "#fff" }}>
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="text-xs uppercase tracking-[0.22em]" style={{ color: GOLD }}>
            Events
          </div>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
            Upcoming Events — {store.shortName}
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Camps, community nights, partner activations, and FanPact enrollment events for {store.name} families and athletes.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-0 z-10 border-b border-border bg-[var(--surface)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 lg:px-8">
          {FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                style={{
                  background: active ? GOLD : "transparent",
                  color: active ? "#0b1220" : "var(--foreground)",
                  borderColor: active ? GOLD : "color-mix(in oklab, var(--foreground) 20%, transparent)",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* List */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {visible.length === 0 && (
          <p className="text-center text-muted-foreground">No events in this category.</p>
        )}
        <div className="space-y-6">
          {visible.map((e) => {
            const past = isPast(e);
            const t = tagColor(e.kind);
            return (
              <article
                key={e.slug}
                className="relative grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)]"
              >
                {/* LEFT */}
                <div
                  className="p-6 lg:p-8"
                  style={{ background: NAVY, color: "#fff" }}
                >
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: t.bg, color: t.fg }}
                  >
                    <IconFor kind={e.kind} className="h-3 w-3" />
                    {e.tag}
                  </span>
                  <h2 className="mt-4 font-display text-2xl leading-tight tracking-tight md:text-3xl">
                    {e.name}
                  </h2>
                  {e.subtitle && (
                    <p className="mt-2 text-sm text-white/70">{e.subtitle}</p>
                  )}
                  <div className="mt-5 space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 font-bold" style={{ color: GOLD }}>
                      <Calendar className="h-4 w-4" /> {e.date}
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="h-4 w-4 opacity-70" /> {e.time}
                    </div>
                    <div className="flex items-start gap-2 text-white/70">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{e.location}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="p-6 lg:p-8">
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {e.description.length > 320 ? e.description.slice(0, 320) + "…" : e.description}
                  </p>
                  <div className="mt-5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {e.whatLabel ?? "What to Expect"}
                    </div>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {e.whatToExpect.slice(0, 4).map((w) => (
                        <li key={w} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {(e.tuition || e.registration) && (
                    <div className="mt-4 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {e.tuition ? "Tuition: " : "Admission: "}
                      </span>
                      {e.tuition ?? e.registration}
                    </div>
                  )}

                  {e.creditCallout && (
                    <div
                      className="mt-4 rounded-lg border px-3 py-2 text-xs"
                      style={{
                        background: "color-mix(in oklab, " + GREEN + " 10%, transparent)",
                        borderColor: "color-mix(in oklab, " + GREEN + " 35%, transparent)",
                        color: GREEN,
                      }}
                    >
                      <span className="font-bold">FanPact Credit · </span>
                      {e.creditCallout}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`/${store.id}/events/${e.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                      style={{ borderColor: NAVY, color: NAVY }}
                    >
                      View Full Details
                    </a>
                    <a
                      href={e.registerHref}
                      target={e.registerHref.startsWith("http") ? "_blank" : undefined}
                      rel={e.registerHref.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                      style={{ background: GOLD, color: "#0b1220" }}
                    >
                      {e.registerLabel ?? "Register Now"} <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {past && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/55">
                    <span className="rounded-full bg-foreground px-5 py-2 text-xs font-bold uppercase tracking-widest text-background">
                      Event Concluded
                    </span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default EventsListPage;
