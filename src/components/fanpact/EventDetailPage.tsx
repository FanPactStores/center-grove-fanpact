import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Star, Zap, Sparkles } from "lucide-react";
import type { StoreEvent } from "@/data/events";
import type { StoreConfig } from "@/data/stores";

const NAVY = "#13294B";
const GOLD = "#BA7517";
const GREEN = "#1A7A4A";
const POWERUP_BG = "#0A0E27";
const POWERUP_LIME = "#A8FF00";
const POWERUP_CYAN = "#00CFFF";
const ARMY = "#4A5C2F";

const HERO_BY_KIND: Record<StoreEvent["kind"], string> = {
  camp: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=2000&q=70",
  army: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?auto=format&fit=crop&w=2000&q=70",
  fanpact: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=70",
};

function IconFor({ kind, className }: { kind: StoreEvent["kind"]; className?: string }) {
  if (kind === "camp") return <Zap className={className} />;
  if (kind === "army") return <Star className={className} />;
  return <Sparkles className={className} />;
}

export function EventDetailPage({ store, event }: { store: StoreConfig; event: StoreEvent }) {
  const isCamp = event.kind === "camp";
  const isArmy = event.kind === "army";
  const accent = isCamp ? POWERUP_LIME : isArmy ? ARMY : GOLD;
  const accent2 = isCamp ? POWERUP_CYAN : GOLD;
  const heroBg = isCamp ? POWERUP_BG : NAVY;

  return (
    <main className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-[var(--surface-2)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-xs text-muted-foreground lg:px-8">
          <a href="/" className="hover:text-foreground">Home</a>
          <span>/</span>
          <a href={store.basePath} className="hover:text-foreground">{store.shortName}</a>
          <span>/</span>
          <a href={`/${store.id}/events`} className="hover:text-foreground">Events</a>
          <span>/</span>
          <span className="text-foreground">{event.name}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative isolate overflow-hidden" style={{ background: heroBg, color: "#fff" }}>
        <img
          src={HERO_BY_KIND[event.kind]}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: isCamp
              ? `linear-gradient(120deg, ${POWERUP_BG} 30%, rgba(10,14,39,0.7))`
              : `linear-gradient(120deg, rgba(0,0,0,0.85), rgba(19,41,75,0.75))`,
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <a
            href={`/${store.id}/events`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Events
          </a>
          <span
            className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: accent, color: isCamp ? "#0b1220" : "#fff" }}
          >
            <IconFor kind={event.kind} className="h-3 w-3" /> {event.tag}
          </span>
          <h1
            className="mt-4 font-display text-4xl leading-[1.04] tracking-tight md:text-6xl"
            style={{ color: isCamp ? accent : "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
          >
            {event.name}
          </h1>
          {event.subtitle && (
            <p className="mt-3 text-base text-white/85 md:text-lg">{event.subtitle}</p>
          )}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoTile icon={<Calendar className="h-4 w-4" />} label="Date" value={event.date} accent={accent2} />
            <InfoTile icon={<Clock className="h-4 w-4" />} label="Time" value={event.time} accent={accent2} />
            <InfoTile icon={<MapPin className="h-4 w-4" />} label="Location" value={event.location} accent={accent2} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* LEFT */}
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl tracking-tight">Event Overview</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {event.description}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl tracking-tight">{event.whatLabel ?? "What to Expect"}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {event.whatToExpect.map((w) => (
                  <li key={w} className="flex gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {event.creditCallout && (
              <div
                className="rounded-2xl border p-6"
                style={{
                  background: "color-mix(in oklab, " + GREEN + " 8%, transparent)",
                  borderColor: "color-mix(in oklab, " + GREEN + " 40%, transparent)",
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GREEN }}>
                  FanPact Community Credit
                </div>
                <p className="mt-2 text-sm" style={{ color: GREEN }}>
                  {event.creditCallout}
                </p>
              </div>
            )}

            {event.fanPactNote && (
              <div
                className="rounded-2xl border p-6"
                style={{
                  background: "color-mix(in oklab, " + GREEN + " 8%, transparent)",
                  borderColor: "color-mix(in oklab, " + GREEN + " 40%, transparent)",
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GREEN }}>
                  FanPact Note
                </div>
                <p className="mt-2 text-sm" style={{ color: GREEN }}>
                  {event.fanPactNote}
                </p>
              </div>
            )}

            <div>
              <h2 className="font-display text-2xl tracking-tight">Location</h2>
              <div className="mt-3 rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5" style={{ color: GOLD }} />
                  <div className="text-sm">
                    <div className="font-semibold">{event.location}</div>
                    {event.alternateVenue && (
                      <div className="mt-1 text-muted-foreground">
                        Alternate venue: {event.alternateVenue}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {event.presentedBy && (
              <div>
                <h2 className="font-display text-2xl tracking-tight">Presented By</h2>
                <p className="mt-3 text-sm text-foreground/80">{event.presentedBy}</p>
              </div>
            )}
          </div>

          {/* RIGHT — sticky panel */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Registration
              </div>
              {event.tuition ? (
                <>
                  <div className="mt-2 font-display text-2xl tracking-tight" style={{ color: NAVY }}>
                    {event.tuition}
                  </div>
                  {event.ages && (
                    <div className="mt-2 text-xs text-muted-foreground">Ages {event.ages}</div>
                  )}
                  {event.addOns && (
                    <div className="mt-3 text-xs text-foreground/75">
                      <span className="font-semibold">Add-ons: </span>
                      {event.addOns}
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-2 font-display text-2xl tracking-tight" style={{ color: NAVY }}>
                  Free Admission
                </div>
              )}
              {event.registration && (
                <p className="mt-3 text-xs text-muted-foreground">{event.registration}</p>
              )}
              <a
                href={event.registerHref}
                target={event.registerHref.startsWith("http") ? "_blank" : undefined}
                rel={event.registerHref.startsWith("http") ? "noreferrer" : undefined}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold uppercase tracking-wider"
                style={{ background: GOLD, color: "#0b1220" }}
              >
                {event.registerLabel ?? "Register Now"} <ArrowRight className="h-4 w-4" />
              </a>
              {isCamp && (
                <p className="mt-3 text-[11px] text-muted-foreground">
                  Registration handled by PowerUp Sports at powerupsports.org
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-[var(--surface-2)] p-5 text-xs">
              <div className="font-bold uppercase tracking-widest text-muted-foreground">Quick facts</div>
              <ul className="mt-3 space-y-2">
                <li><span className="font-semibold">Category: </span>{event.category}</li>
                {event.ages && <li><span className="font-semibold">Ages: </span>{event.ages}</li>}
                <li><span className="font-semibold">Store: </span>{store.shortName}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function InfoTile({
  icon, label, value, accent,
}: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur">
      <div
        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: accent }}
      >
        {icon} {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

export default EventDetailPage;
