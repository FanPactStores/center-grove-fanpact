import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

type Tile = {
  label: string;
  category: string;
  brandColor: string;
  fallbackText: string;
  fallbackTextColor: string;
};

const TILES: Tile[] = [
  {
    label: "Laundry",
    category: "home-living",
    brandColor: "#F15A2B",
    fallbackText: "Tide",
    fallbackTextColor: "#FFFFFF",
  },
  {
    label: "Paper & Cleaning",
    category: "home-living",
    brandColor: "#E31837",
    fallbackText: "Bounty",
    fallbackTextColor: "#FFFFFF",
  },
  {
    label: "Dishwashing",
    category: "kitchen-dining",
    brandColor: "#006B3C",
    fallbackText: "Cascade",
    fallbackTextColor: "#FFFFFF",
  },
  {
    label: "Pet Treats & Food",
    category: "pet-supplies",
    brandColor: "#5E9E2F",
    fallbackText: "Greenies",
    fallbackTextColor: "#FFFFFF",
  },
  {
    label: "Oral Care",
    category: "beauty-personal-care",
    brandColor: "#E31837",
    fallbackText: "Colgate",
    fallbackTextColor: "#FFFFFF",
  },
  {
    label: "Vitamins & Wellness",
    category: "health-wellness",
    brandColor: "#004B8D",
    fallbackText: "Centrum",
    fallbackTextColor: "#FFFFFF",
  },
  {
    label: "Sports Drinks",
    category: "food-beverage",
    brandColor: "#F36F21",
    fallbackText: "Gatorade",
    fallbackTextColor: "#FFFFFF",
  },
  {
    label: "Snacks & Pantry",
    category: "food-beverage",
    brandColor: "#FBBF00",
    fallbackText: "KIND",
    fallbackTextColor: "#1A1A1A",
  },
  {
    label: "Charging & Cables",
    category: "electronics",
    brandColor: "#1A1A2E",
    fallbackText: "Anker",
    fallbackTextColor: "#FFFFFF",
  },
  {
    label: "Coffee & Tea",
    category: "food-beverage",
    brandColor: "#2C6E2F",
    fallbackText: "Green Mtn",
    fallbackTextColor: "#FFFFFF",
  },
];

type Props = {
  /** e.g. "/center-grove" */
  basePath: string;
  /** e.g. "Center Grove" or "Butler Athletics" */
  supportsName: string;
};

export function EverydayEssentialsGrid({ basePath, supportsName }: Props) {
  return (
    <section className="border-y border-border bg-[var(--surface-2)]">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 text-center">
          <h2
            className="font-display text-4xl tracking-tight md:text-5xl"
            style={{ color: "var(--brand-accent)" }}
          >
            Everyday Essentials
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Shop what your family already buys — every purchase supports {supportsName}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile) => (
            <Link
              key={tile.label}
              to={`${basePath}/shop/$category` as "/butler/shop/$category"}
              params={{ category: tile.category }}
              className="group flex aspect-square flex-col overflow-hidden rounded-xl border-[0.5px] border-border bg-card transition-all duration-200 hover:scale-[1.03] hover:border-[var(--brand-accent)] hover:shadow-lg"
            >
              <div
                className="flex h-[60%] items-center justify-center overflow-hidden p-3 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: tile.brandColor }}
              >
                <span
                  className="font-display text-3xl font-bold tracking-tight md:text-4xl"
                  style={{ color: tile.fallbackTextColor }}
                >
                  {tile.fallbackText}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center px-3 text-center">
                <span className="font-semibold leading-tight">{tile.label}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to={`${basePath}/shop` as "/butler/shop"}
            className="inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
            style={{ color: "var(--brand-accent)" }}
          >
            Browse all everyday products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
