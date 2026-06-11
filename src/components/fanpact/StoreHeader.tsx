import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, User, ChevronDown, Menu, X, ListChecks, Home, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { StoreConfig } from "@/data/stores";
import { CATEGORIES } from "@/data/categories";
import { DesignationBanner } from "./DesignationBanner";
import { WelcomeModal } from "./WelcomeModal";
import { useMyList } from "@/lib/my-list";
import { FanPactLogo } from "@/components/fanpact/FanPactLogo";
import { NavSearchBar } from "@/components/fanpact/SearchBar";

const SUBNAV = [
  { label: "SHOP", to: "shop", live: true },
  { label: "TEAMS", to: "teams", live: true },
  { label: "ATHLETES", to: "athletes", live: false },
  { label: "NIL IMPACT", to: "nil-impact", live: true },
  { label: "NEWS & BLOGS", to: "news", live: false },
  { label: "SPONSORS", to: "sponsors", live: true },
];

export function StoreHeader({ store }: { store: StoreConfig }) {
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { count: listCount } = useMyList(store.id);

  const topNav = [
    { label: "Shop", to: `${store.basePath}/shop`, hasDropdown: true },
    { label: "Rewards", to: `${store.basePath}/team-card`, hasDropdown: false },
    { label: "Teams", to: `${store.basePath}/teams`, hasDropdown: false },
    { label: "Athletes", to: `${store.basePath}/teams`, hasDropdown: false },
    { label: "Sponsors", to: `${store.basePath}/sponsors`, hasDropdown: false },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* BAND 1 — white top bar */}
      <div className="bg-[var(--surface)] border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-8">
          {/* Home link — platform navigation, visually distinct */}
          <Link
            to="/"
            className="group relative mr-3 hidden items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-normal text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:inline-flex"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span className="hidden font-medium lg:inline">FanPact</span>
            <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max -translate-x-1/2 rounded bg-black px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Back to FanPact Home
            </span>
          </Link>

          <Link
            to={store.basePath as "/butler"}
            className="flex items-center gap-3 rounded-md px-2 py-1"
            style={{ background: "var(--brand)" }}
          >
            <FanPactLogo variant="white" height={32} />
            <span
              style={{
                borderLeft: "1px solid rgba(255,255,255,0.3)",
                paddingLeft: "12px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "white",
              }}
            >
              {store.marks.word.toUpperCase()}
            </span>
          </Link>

          {/* Center nav */}
          <nav className="ml-12 hidden flex-1 items-center justify-center gap-8 md:flex">
            {topNav.map((n) => (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={() => n.hasDropdown && setShopOpen(true)}
                onMouseLeave={() => n.hasDropdown && setShopOpen(false)}
              >
                <Link
                  to={n.to}
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{
                    color:
                      n.label === "Shop" || n.label === "Rewards"
                        ? "var(--brand-accent)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {n.hasDropdown && (
                    <ShoppingBag className="h-4 w-4" />
                  )}
                  {n.label}
                  {n.hasDropdown && <ChevronDown className="h-3 w-3" />}
                </Link>
                {n.hasDropdown && shopOpen && (
                  <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 rounded-xl border border-border bg-[var(--surface)] p-6 shadow-xl">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                      {CATEGORIES.map((c) => (
                        <Link
                          key={c.slug}
                          to={`${store.basePath}/shop/$category` as "/butler/shop/$category"}
                          params={{ category: c.slug }}
                          className="rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                          onClick={() => setShopOpen(false)}
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div className="ml-auto flex items-center gap-1">
            <NavSearchBar basePath={store.basePath} />
            <button
              aria-label="Wishlist"
              className="hidden rounded-full p-2 text-foreground transition-colors hover:bg-muted md:inline-flex"
              style={{ color: "var(--brand-accent)" }}
            >
              <Heart className="h-5 w-5" />
            </button>
            <Link
              to={`${store.basePath}/my-list` as "/butler/my-list"}
              aria-label="My List"
              className="relative inline-flex items-center gap-1 rounded-full px-2 py-2 text-sm font-semibold transition-colors hover:bg-muted"
              style={{ color: "var(--brand-accent)" }}
            >
              <ListChecks className="h-5 w-5" />
              <span className="hidden text-xs sm:inline">My List</span>
              {listCount > 0 && (
                <span
                  className="ml-0.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums"
                  style={{ background: "var(--community)", color: "var(--community-foreground)" }}
                >
                  {listCount}
                </span>
              )}
            </Link>
            <Link
              to={`${store.basePath}/cart` as "/butler/cart"}
              aria-label="Cart"
              className="rounded-full p-2 text-foreground transition-colors hover:bg-muted"
              style={{ color: "var(--brand-accent)" }}
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <button
              aria-label="Account"
              className="hidden rounded-full p-2 text-foreground transition-colors hover:bg-muted md:inline-flex"
              style={{ color: "var(--brand-accent)" }}
            >
              <User className="h-5 w-5" />
            </button>
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="ml-1 rounded-md p-2 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* BAND 2 — black sub-nav */}
      <div className="hidden bg-black md:block">
        <div className="mx-auto flex h-12 max-w-7xl items-center gap-1 px-4 lg:px-8">
          {SUBNAV.map((s) => (
            <button
              key={s.label}
              disabled={!s.live}
              className="group inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest transition-colors"
              style={{
                color: s.live ? "white" : "rgba(255,255,255,0.4)",
                borderBottom:
                  s.label === "SHOP" ? "2px solid var(--brand-accent)" : "2px solid transparent",
              }}
            >
              {s.label}
              {!s.live && (
                <span className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[9px] tracking-wider">
                  SOON
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* BAND 3 — dark category strip */}
      <div className="hidden border-b border-white/10 bg-black md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 lg:px-8">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`${store.basePath}/shop/$category` as "/butler/shop/$category"}
              params={{ category: c.slug }}
              className="shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* DESIGNATION BANNER */}
      <DesignationBanner store={store} />

      {/* DISCLAIMER BAR */}
      {!dismissed && (
        <div
          className="border-b text-xs"
          style={{
            background: "color-mix(in oklab, var(--brand-accent) 14%, white)",
            borderColor: "color-mix(in oklab, var(--brand-accent) 30%, white)",
            color: "var(--ink)",
          }}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 lg:px-8">
            <p className="flex-1 text-center">
              We donate{" "}
              <span
                className="font-bold"
                style={{ color: "var(--brand-accent)" }}
              >
                60%
              </span>{" "}
              of net earnings from qualifying purchases to support{" "}
              {store.fundDisplay}. Thank you for shopping with purpose!{" "}
              <Link
                to={`${store.basePath}/team-card` as "/butler/team-card"}
                className="font-semibold underline"
                style={{ color: "var(--brand-accent)" }}
              >
                (full disclaimer)
              </Link>
            </p>
            <button
              aria-label="Dismiss"
              onClick={() => setDismissed(true)}
              className="rounded p-1 hover:bg-black/10"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* MOBILE PANEL */}
      {mobileOpen && (
        <div className="border-b border-border bg-[var(--surface)] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            <Link
              to="/"
              className="flex items-center justify-between py-2 text-sm font-semibold text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                FanPact Home
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="my-1 border-t border-border" />
            {topNav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="py-2 text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Categories
            </div>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`${store.basePath}/shop/$category` as "/butler/shop/$category"}
                params={{ category: c.slug }}
                className="py-1.5 text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* First-visit welcome modal */}
      <WelcomeModal store={store} />
    </header>
  );
}
