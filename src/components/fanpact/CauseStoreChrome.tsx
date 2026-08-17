import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Menu, X, Home } from "lucide-react";
import { useState } from "react";
import type { StoreConfig } from "@/data/stores";
import { CATEGORIES } from "@/data/categories";
import { FanPactLogo } from "@/components/fanpact/FanPactLogo";
import { NavSearchBar } from "@/components/fanpact/SearchBar";

const NAV = [
  { label: "SHOP", to: "/cmn/st-johns/shop" as const },
  { label: "OUR HOSPITAL", to: "/cmn/st-johns/our-hospital" as const },
  { label: "IMPACT STORIES", to: "/cmn/st-johns/impact-stories" as const },
  { label: "SPONSORS", to: "/cmn/st-johns/sponsors" as const },
];

export function CauseStoreHeader({ store }: { store: StoreConfig }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="border-b border-border bg-[var(--surface)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-8">
          <Link
            to="/"
            className="group relative mr-3 hidden items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:inline-flex"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span className="hidden font-medium lg:inline">FanPact</span>
            <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max -translate-x-1/2 rounded bg-black px-2 py-1 text-[11px] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Back to FanPact Home
            </span>
          </Link>

          <Link
            to="/cmn/st-johns"
            className="flex items-center gap-3 rounded-md px-2 py-1"
            style={{ background: "var(--brand)" }}
          >
            <FanPactLogo variant="white" height={32} />
            <span
              style={{
                borderLeft: "1px solid rgba(255,255,255,0.3)",
                paddingLeft: "12px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1.6px",
                color: "white",
              }}
            >
              {store.marks.word}
            </span>
          </Link>

          <nav className="ml-12 hidden flex-1 items-center justify-center gap-8 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="text-xs font-bold tracking-widest transition-colors hover:opacity-80"
                activeProps={{ style: { color: "var(--brand-accent)" } }}
                style={{ color: "var(--muted-foreground)" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Link
              to="/cmn/st-johns/cart"
              aria-label="Cart"
              className="rounded-full p-2 transition-colors hover:bg-muted"
              style={{ color: "var(--brand-accent)" }}
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>
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

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-b border-border bg-[var(--surface)] md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-muted-foreground"
            >
              FanPact Home →
            </Link>
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-semibold"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH ROW */}
      <div className="border-b border-border bg-muted/40 px-4 py-2.5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <NavSearchBar basePath={store.basePath} />
        </div>
      </div>

      {/* CATEGORY STRIP */}
      <div className="hidden border-b border-white/10 bg-black md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 lg:px-8">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/cmn/st-johns/shop/$category"
              params={{ category: c.slug }}
              className="shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* DESIGNATION BAR — single beneficiary, no picker */}
      <div
        className="border-b text-xs"
        style={{
          background: "color-mix(in oklab, var(--brand-accent) 12%, white)",
          borderColor: "color-mix(in oklab, var(--brand-accent) 30%, white)",
          color: "var(--ink)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 lg:px-8">
          <Heart className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--brand-accent)" }} />
          <span className="truncate">
            100% of your designated contribution supports HSHS St. John's Children's Hospital's
            greatest areas of need.
          </span>
        </div>
      </div>
    </header>
  );
}

export function CauseStoreFooter({ store }: { store: StoreConfig }) {
  return (
    <footer
      className="mt-24 border-t border-border"
      style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="font-display text-3xl tracking-tight">{store.marks.word}</div>
          <Link
            to="/"
            className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] opacity-90 hover:opacity-100"
          >
            <FanPactLogo variant="white-compact" height={20} />
            <span>Powered by FanPact</span>
          </Link>
          <p className="mt-6 max-w-md text-sm opacity-80">
            60% of net earnings on every purchase flows to HSHS St. John's Children's Hospital, a
            Children's Miracle Network Hospital in Springfield, Illinois. No extra cost, no
            fundraising ask.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] opacity-60">Shop</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/cmn/st-johns/shop" className="hover:underline">All categories</Link></li>
            <li><Link to="/cmn/st-johns/our-hospital" className="hover:underline">Our hospital</Link></li>
            <li><Link to="/cmn/st-johns/impact-stories" className="hover:underline">Impact stories</Link></li>
            <li><Link to="/cmn/st-johns/sponsors" className="hover:underline">Sponsors</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] opacity-60">Platform</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">FanPact home</Link></li>
            <li><Link to="/alliance" className="hover:underline">The Alliance</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs opacity-70 lg:px-8">
          © {new Date().getFullYear()} FanPact, Inc. NIL and Youth Sports Commerce Platform. Demo
          experience — all products and contributions illustrative. Hospital imagery is a
          placeholder pending Children's Miracle Network Brand Center approval.
        </div>
      </div>
    </footer>
  );
}
