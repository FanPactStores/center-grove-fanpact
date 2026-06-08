import { useCallback, useSyncExternalStore } from "react";
import type { StoreId } from "@/data/stores";
import { PRODUCTS, type Product } from "@/data/products";

export type MyListItem = {
  /** Stable identifier — either `slug:<slug>` for catalog items or `brand:<brand>` for starter tiles. */
  key: string;
  name: string;
  brand: string;
  /** Display group: "Cleaning", "Pet", "Personal Care", etc. */
  category: string;
  /** Image URL for synthetic / starter brand tiles. Catalog items derive their image from the Product record. */
  image?: string;
  /** Catalog product slug if this item maps to a real product in the store catalog. */
  productSlug?: string;
};

const storageKey = (storeId: StoreId) => `fanpact-list-${storeId}`;

const listeners = new Set<() => void>();
const snapshotCache = new Map<StoreId, MyListItem[]>();
const EMPTY: MyListItem[] = [];

function notify() {
  snapshotCache.clear();
  for (const l of listeners) l();
}

function readListRaw(storeId: StoreId): MyListItem[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(storageKey(storeId));
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as MyListItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function readList(storeId: StoreId): MyListItem[] {
  const cached = snapshotCache.get(storeId);
  if (cached) return cached;
  const fresh = readListRaw(storeId);
  snapshotCache.set(storeId, fresh);
  return fresh;
}

function writeList(storeId: StoreId, items: MyListItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(storeId), JSON.stringify(items));
  notify();
}

export function addToList(storeId: StoreId, item: MyListItem) {
  const current = readList(storeId);
  if (current.some((i) => i.key === item.key)) return;
  writeList(storeId, [...current, item]);
}

export function removeFromList(storeId: StoreId, key: string) {
  writeList(
    storeId,
    readList(storeId).filter((i) => i.key !== key),
  );
}

export function clearList(storeId: StoreId) {
  writeList(storeId, []);
}

export function setListBulk(storeId: StoreId, items: MyListItem[]) {
  // dedupe by key
  const seen = new Set<string>();
  const deduped: MyListItem[] = [];
  for (const i of items) {
    if (seen.has(i.key)) continue;
    seen.add(i.key);
    deduped.push(i);
  }
  writeList(storeId, deduped);
}

export function useMyList(storeId: StoreId): {
  items: MyListItem[];
  count: number;
  isOnList: (p: Product) => boolean;
  hasKey: (key: string) => boolean;
  add: (item: MyListItem) => void;
  remove: (key: string) => void;
  toggle: (item: MyListItem) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  setMany: (items: MyListItem[]) => void;
  clear: () => void;
} {
  const subscribe = useCallback(
    (cb: () => void) => {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === storageKey(storeId)) cb();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    [storeId],
  );
  const items = useSyncExternalStore(
    subscribe,
    () => readList(storeId),
    () => [],
  );

  const hasKey = (key: string) => items.some((i) => i.key === key);
  const isOnList = (p: Product) =>
    items.some(
      (i) => i.productSlug === p.slug || i.key === productKey(p) || i.brand.toLowerCase() === p.brand.toLowerCase(),
    );

  return {
    items,
    count: items.length,
    isOnList,
    hasKey,
    add: (item) => addToList(storeId, item),
    remove: (key) => removeFromList(storeId, key),
    toggle: (item) =>
      hasKey(item.key) ? removeFromList(storeId, item.key) : addToList(storeId, item),
    addProduct: (product) =>
      addToList(storeId, {
        key: productKey(product),
        name: product.name,
        brand: product.brand,
        category: titleCase(product.category),
        productSlug: product.slug,
      }),
    removeProduct: (product) => {
      // remove by slug key or brand key
      const cur = readList(storeId);
      writeList(
        storeId,
        cur.filter(
          (i) =>
            i.productSlug !== product.slug &&
            i.key !== productKey(product) &&
            i.brand.toLowerCase() !== product.brand.toLowerCase(),
        ),
      );
    },
    setMany: (i) => setListBulk(storeId, i),
    clear: () => clearList(storeId),
  };
}

export function productKey(p: Product) {
  return `slug:${p.slug}`;
}

function titleCase(s: string) {
  return s.replace(/(^|-)([a-z])/g, (_, sep, c) => (sep ? " " : "") + c.toUpperCase());
}

// ---------- Starter brand tiles for the welcome step 2 ----------

export type StarterTile = {
  brand: string;
  category:
    | "Cleaning"
    | "Pet"
    | "Personal Care"
    | "Pantry"
    | "Baby & Home"
    | "Sports & Fitness";
  /** Solid brand background hex */
  swatch: string;
};

export const STARTER_TILES: StarterTile[] = [
  // Cleaning
  { brand: "Tide", category: "Cleaning", swatch: "#F58220" },
  { brand: "Bounty", category: "Cleaning", swatch: "#FFD400" },
  { brand: "Dawn", category: "Cleaning", swatch: "#1E5DAD" },
  { brand: "Lysol", category: "Cleaning", swatch: "#005DAA" },
  { brand: "Swiffer", category: "Cleaning", swatch: "#00A4E0" },
  { brand: "Mr. Clean", category: "Cleaning", swatch: "#0070C0" },
  // Pet
  { brand: "Purina", category: "Pet", swatch: "#E32726" },
  { brand: "Blue Buffalo", category: "Pet", swatch: "#003876" },
  { brand: "Pedigree", category: "Pet", swatch: "#FFC72C" },
  { brand: "Fancy Feast", category: "Pet", swatch: "#7C2D8E" },
  { brand: "Iams", category: "Pet", swatch: "#D62027" },
  { brand: "Meow Mix", category: "Pet", swatch: "#1F8A3D" },
  // Personal Care
  { brand: "Crest", category: "Personal Care", swatch: "#005EB8" },
  { brand: "Colgate", category: "Personal Care", swatch: "#D8232A" },
  { brand: "Dove", category: "Personal Care", swatch: "#0C7DBE" },
  { brand: "Head & Shoulders", category: "Personal Care", swatch: "#004A98" },
  { brand: "Gillette", category: "Personal Care", swatch: "#0033A0" },
  { brand: "Olay", category: "Personal Care", swatch: "#E54184" },
  // Pantry
  { brand: "Gatorade", category: "Pantry", swatch: "#FF6F1F" },
  { brand: "Celsius", category: "Pantry", swatch: "#2BAE66" },
  { brand: "Clif Bar", category: "Pantry", swatch: "#D8202F" },
  { brand: "Kind", category: "Pantry", swatch: "#3A2E25" },
  { brand: "Cheerios", category: "Pantry", swatch: "#FFD400" },
  { brand: "Campbell's", category: "Pantry", swatch: "#C8102E" },
  // Baby & Home (extra row available if needed)
  { brand: "Pampers", category: "Baby & Home", swatch: "#0072CE" },
  { brand: "Huggies", category: "Baby & Home", swatch: "#A50034" },
  { brand: "Ziploc", category: "Baby & Home", swatch: "#1D70B8" },
  { brand: "Glad", category: "Baby & Home", swatch: "#003E7E" },
  { brand: "Reynolds", category: "Baby & Home", swatch: "#0067B1" },
];

export function starterTileToItem(t: StarterTile): MyListItem {
  // If a catalog product exists for this brand, link to it so the storefront "Your Regulars" picks it up.
  const matching = PRODUCTS.find((p) => p.brand.toLowerCase() === t.brand.toLowerCase());
  return {
    key: matching ? productKey(matching) : `brand:${t.brand.toLowerCase()}`,
    name: matching?.name ?? t.brand,
    brand: t.brand,
    category: t.category,
    productSlug: matching?.slug,
  };
}

/** Resolve the user's list to catalog products for storefront personalization. */
export function listToCatalogProducts(items: MyListItem[]): Product[] {
  const out: Product[] = [];
  const seen = new Set<string>();
  for (const i of items) {
    let p: Product | undefined;
    if (i.productSlug) p = PRODUCTS.find((x) => x.slug === i.productSlug);
    if (!p) p = PRODUCTS.find((x) => x.brand.toLowerCase() === i.brand.toLowerCase());
    if (p && !seen.has(p.slug)) {
      seen.add(p.slug);
      out.push(p);
    }
  }
  return out;
}
