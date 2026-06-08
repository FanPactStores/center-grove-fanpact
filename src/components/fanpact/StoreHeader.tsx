import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";
import type { StoreConfig } from "@/data/stores";
import { Button } from "@/components/ui/button";

export function StoreHeader({ store }: { store: StoreConfig }) {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "Shop", to: `${store.basePath}/shop` },
    { label: "Teams", to: `${store.basePath}/teams` },
    { label: "Team Card", to: `${store.basePath}/team-card` },
    { label: "Sponsors", to: `${store.basePath}/sponsors` },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[var(--surface)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:px-8">
        <Link to={store.basePath as "/butler"} className="flex items-center gap-3">
          <span
            className="font-display flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-lg leading-none"
            style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
          >
            {store.marks.letter}
          </span>
          <div className="hidden flex-col leading-tight md:flex">
            <span className="font-display text-sm tracking-wider" style={{ color: "var(--ink)" }}>
              {store.marks.word}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              × FanPact
            </span>
          </div>
        </Link>

        <nav className="ml-6 hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground font-semibold" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-sm tracking-wide transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link to={`${store.basePath}/team-card` as "/butler/team-card"}>Get Team Card</Link>
          </Button>
          <Button asChild size="icon" variant="outline">
            <Link to={`${store.basePath}/cart` as "/butler/cart"} aria-label="Cart">
              <ShoppingBag />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <Menu />
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-[var(--surface)] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
