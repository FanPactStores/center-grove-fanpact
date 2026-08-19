import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import laundryImg from "@/assets/essentials/laundry.jpg";
import paperImg from "@/assets/essentials/paper-cleaning.jpg";
import dishImg from "@/assets/essentials/dishwashing.jpg";
import petImg from "@/assets/essentials/pet-treats.jpg";
import oralImg from "@/assets/essentials/oral-care.jpg";
import vitaminsImg from "@/assets/essentials/vitamins.jpg";
import sportsImg from "@/assets/essentials/sports-drinks.jpg";
import snacksImg from "@/assets/essentials/snacks-pantry.jpg";
import cablesImg from "@/assets/essentials/charging-cables.jpg";
import coffeeImg from "@/assets/essentials/coffee-tea.jpg";

type Tile = { label: string; image: string; category: string };

const TILES: Tile[] = [
  { label: "Laundry", image: laundryImg, category: "home-living" },
  { label: "Paper & Cleaning", image: paperImg, category: "home-living" },
  { label: "Dishwashing", image: dishImg, category: "kitchen-dining" },
  { label: "Pet Treats & Food", image: petImg, category: "pet-supplies" },
  { label: "Oral Care", image: oralImg, category: "beauty-personal-care" },
  { label: "Vitamins & Wellness", image: vitaminsImg, category: "health-wellness" },
  { label: "Sports Drinks", image: sportsImg, category: "food-beverage" },
  { label: "Snacks & Pantry", image: snacksImg, category: "food-beverage" },
  { label: "Charging & Cables", image: cablesImg, category: "electronics" },
  { label: "Coffee & Tea", image: coffeeImg, category: "food-beverage" },
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
              <div className="flex h-[60%] items-center justify-center overflow-hidden bg-white p-3">
                <img
                  src={tile.image}
                  alt={tile.label}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-full w-full object-contain"
                />
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
