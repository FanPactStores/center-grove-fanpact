import { Search, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

/**
 * Compact search bar used in the StoreHeader.
 * - Desktop: visible input
 * - Mobile: collapses to a search icon that toggles a full-width input row
 * On submit, navigates to `${basePath}/shop?search=<query>`.
 */
export function NavSearchBar({ basePath }: { basePath: string }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const go = (query: string) => {
    const trimmed = query.trim();
    navigate({
      to: `${basePath}/shop` as "/butler/shop",
      search: (trimmed ? { search: trimmed } : {}) as { search?: string },
    });
  };

  return (
    <>
      {/* Mobile icon trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Search products"
        className="rounded-full p-2 transition-colors hover:bg-muted md:hidden"
        style={{ color: "var(--brand-accent)" }}
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Desktop inline input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
        className="hidden items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 transition-colors focus-within:border-[var(--brand-accent)] md:flex md:w-56 lg:w-72"
        role="search"
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          aria-label="Search products"
        />
      </form>

      {/* Mobile expanded panel */}
      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-b border-border bg-[var(--surface)] p-3 shadow-md md:hidden">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              go(q);
              setOpen(false);
            }}
            className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-2"
            role="search"
          >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              aria-label="Search products"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close search"
              className="rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/**
 * Prominent in-page search input used at the top of shop / category pages.
 * Filters the grid in real time as the user types.
 */
export function PageSearchBar({
  value,
  onChange,
  placeholder = "Search products by name or brand...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="h-12 w-full rounded-full border border-border bg-card pl-12 pr-12 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[var(--brand-accent)]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function matchesSearch(query: string, fields: string[]): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const terms = q.split(/\s+/);
  const haystack = fields.join(" ").toLowerCase();
  return terms.every((t) => haystack.includes(t));
}
