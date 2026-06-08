import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/categories";
import { cn } from "@/lib/utils";

export function CategorySidebar({
  basePath,
  activeSlug,
}: {
  basePath: string;
  activeSlug?: string;
}) {
  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Shop by category
      </div>
      <nav className="mt-4 flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
        <Link
          to={`${basePath}/shop` as "/butler/shop"}
          className={cn(
            "rounded-md px-3 py-2 text-sm transition-colors",
            !activeSlug
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          All products
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to={`${basePath}/shop/$category` as "/butler/shop/$category"}
            params={{ category: c.slug }}
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors",
              activeSlug === c.slug
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {c.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
