import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Zap, Star, Calendar, ArrowRight } from "lucide-react";
import { eventsForStore, type StoreEvent } from "@/data/events";
import type { StoreId } from "@/data/stores";

const GOLD = "#BA7517";
const BG = "#1A1A2E";
const BLUE = "#00CFFF";

function iconFor(e: StoreEvent) {
  if (e.kind === "camp") return Zap;
  if (e.kind === "army") return Star;
  return Calendar;
}

export type UpcomingEventsBannerProps = { store: StoreId };

export function UpcomingEventsBanner({ store }: UpcomingEventsBannerProps) {
  const events = eventsForStore(store);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (paused || events.length <= 1) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % events.length);
        setVisible(true);
      }, 250);
    }, 5000);
    return () => clearInterval(t);
  }, [paused, events.length]);

  if (events.length === 0) return null;

  const e = events[idx];
  const Icon = iconFor(e);

  const jump = (i: number) => {
    if (i === idx) return;
    setVisible(false);
    setTimeout(() => {
      setIdx(i);
      setVisible(true);
    }, 200);
  };

  return (
    <div
      className="relative w-full border-b"
      style={{
        background: BG,
        borderColor: "rgba(255,255,255,0.06)",
        boxShadow: `inset 4px 0 0 0 ${e.kind === "camp" ? BLUE : GOLD}`,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Upcoming events"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 md:min-h-[72px] md:flex-row md:items-center md:gap-5 md:py-0 lg:px-8">
        {/* Label */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: GOLD }}
          >
            Upcoming Events
          </span>
          <span
            className="hidden h-5 w-px md:inline-block"
            style={{ background: GOLD, opacity: 0.5 }}
          />
        </div>

        {/* Rotating content */}
        <div
          className={`flex flex-1 flex-col gap-1.5 transition-opacity duration-300 md:flex-row md:items-center md:gap-5 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 text-white">
            <Icon className="h-4 w-4" style={{ color: GOLD }} />
            <span className="text-sm font-bold leading-tight">{e.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] md:flex-1">
            <span className="font-semibold" style={{ color: GOLD }}>
              {e.date} · {e.time}
            </span>
            <span className="hidden h-1 w-1 rounded-full md:inline-block" style={{ background: GOLD, opacity: 0.6 }} />
            <span className="text-white/65 truncate max-w-[260px] md:max-w-[340px]">
              {e.location.split(",")[0]}
            </span>
          </div>

          <Link
            to="/$store/events/$slug"
            params={{ store, slug: e.slug }}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider md:w-auto"
            style={{ background: GOLD, color: "#0b1220" }}
          >
            {e.kind === "camp" ? "Register" : "Learn More"}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {events.map((ev, i) => (
            <button
              key={ev.slug}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Show ${ev.name}`}
              className="h-1.5 w-1.5 rounded-full transition-all"
              style={{
                background: GOLD,
                opacity: i === idx ? 1 : 0.3,
                transform: i === idx ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* View All */}
        <Link
          to="/$store/events"
          params={{ store }}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-wider hover:underline"
          style={{ color: GOLD }}
        >
          View All Events <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export default UpcomingEventsBanner;
