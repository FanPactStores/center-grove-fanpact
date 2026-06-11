import { useEffect, useState } from "react";
import { Star, LineChart, ShieldCheck, ArrowRight, type LucideIcon } from "lucide-react";

type Partner = {
  key: string;
  name: string;
  Icon: LucideIcon;
  bullets: [string, string, string];
  cta: string;
  slug: string;
};

const PARTNERS: Partner[] = [
  {
    key: "usarec",
    name: "U.S. Army Recruiting Command",
    Icon: Star,
    bullets: [
      "Up to $50K Enlistment Bonus",
      "100% Tuition Assistance",
      "$150K+ Reserve Bonus Stack",
    ],
    cta: "Learn More + Earn $75",
    slug: "usarec",
  },
  {
    key: "merrill-lynch",
    name: "Merrill Lynch",
    Icon: LineChart,
    bullets: [
      "Free 529 College Savings Consultation",
      "Tax-Free Education Growth",
      "Link FanPact Credits to Your 529",
    ],
    cta: "Learn More + Earn $75",
    slug: "merrill-lynch",
  },
  {
    key: "state-farm",
    name: "State Farm",
    Icon: ShieldCheck,
    bullets: [
      "Free Insurance Review for Your Family",
      "Local Agent, Community Member",
      "Coverage Built for Sports Families",
    ],
    cta: "Learn More + Earn $50",
    slug: "state-farm",
  },
];

const NAVY = "#13294B";
const GOLD = "#BA7517";

export type EnterprisePartnerBannerProps = {
  store?: "butler" | "center-grove" | "legacy" | "assa";
};

export function EnterprisePartnerBanner({ store }: EnterprisePartnerBannerProps) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % PARTNERS.length);
        setVisible(true);
      }, 250);
    }, 6000);
    return () => clearInterval(t);
  }, [paused]);

  const jump = (i: number) => {
    if (i === idx) return;
    setVisible(false);
    setTimeout(() => {
      setIdx(i);
      setVisible(true);
    }, 200);
  };

  const p = PARTNERS[idx];
  const storeSeg = store ?? "center-grove";
  const href = `/${storeSeg}/sponsors/${p.slug}`;

  return (
    <div
      className="relative w-full"
      style={{ background: NAVY, marginTop: 0 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Enterprise partner"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:min-h-[56px] md:flex-row md:items-center md:gap-4 md:py-0 lg:px-8">
        {/* Label */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: GOLD }}
          >
            Enterprise Partner
          </span>
          <span
            className="hidden h-5 w-px md:inline-block"
            style={{ background: GOLD, opacity: 0.6 }}
          />
        </div>

        {/* Rotating content */}
        <div
          className={`flex flex-1 flex-col gap-2 transition-opacity duration-300 md:flex-row md:items-center md:gap-6 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Partner name */}
          <div className="flex items-center gap-2 text-white shrink-0">
            <p.Icon className="h-4 w-4" style={{ color: GOLD }} />
            <span className="text-sm font-bold md:text-[13px] lg:text-sm">{p.name}</span>
          </div>

          {/* Bullets */}
          <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-white/90 md:justify-center">
            {p.bullets.map((b, i) => (
              <span key={b} className="flex items-center gap-3">
                {/* hide 3rd bullet on small screens */}
                <span className={i === 2 ? "hidden lg:inline" : ""}>{b}</span>
                {i < p.bullets.length - 1 && (
                  <span
                    className={`h-1 w-1 rounded-full ${i === 1 ? "hidden lg:inline-block" : "inline-block"}`}
                    style={{ background: GOLD }}
                    aria-hidden
                  />
                )}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={href}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] md:w-auto md:py-1.5"
            style={{ background: GOLD, color: "#0b1220" }}
          >
            {p.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-1.5 md:ml-2">
          {PARTNERS.map((pp, i) => (
            <button
              key={pp.key}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Show ${pp.name}`}
              className="h-1.5 w-1.5 rounded-full transition-all"
              style={{
                background: GOLD,
                opacity: i === idx ? 1 : 0.35,
                transform: i === idx ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EnterprisePartnerBanner;
