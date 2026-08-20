import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import imgLaundry from "@/assets/essentials/laundry.jpg";
import imgPaper from "@/assets/essentials/paper-cleaning.jpg";
import imgDish from "@/assets/essentials/dishwashing.jpg";
import imgPet from "@/assets/essentials/pet.jpg";
import imgOral from "@/assets/essentials/oral-care.jpg";
import imgVitamins from "@/assets/essentials/vitamins.jpg";
import imgSports from "@/assets/essentials/sports-drinks.jpg";
import imgSnacks from "@/assets/essentials/snacks.jpg";
import imgCables from "@/assets/essentials/cables.jpg";
import imgCoffee from "@/assets/essentials/coffee.jpg";

type Tile = {
  label: string;
  category: string;
  image: string;
};

const TILES: Tile[] = [
  { label: "Laundry", category: "home-living", image: imgLaundry },
  { label: "Paper & Cleaning", category: "home-living", image: imgPaper },
  { label: "Dishwashing", category: "kitchen-dining", image: imgDish },
  { label: "Pet Treats & Food", category: "pet-supplies", image: imgPet },
  { label: "Oral Care", category: "beauty-personal-care", image: imgOral },
  { label: "Vitamins & Wellness", category: "health-wellness", image: imgVitamins },
  { label: "Sports Drinks", category: "food-beverage", image: imgSports },
  { label: "Snacks & Pantry", category: "food-beverage", image: imgSnacks },
  { label: "Charging & Cables", category: "electronics", image: imgCables },
  { label: "Coffee & Tea", category: "food-beverage", image: imgCoffee },
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
                  width={816}
                  height={816}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
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
