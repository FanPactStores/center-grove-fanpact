import { useCallback, useSyncExternalStore } from "react";
import { STORES, type StoreId } from "@/data/stores";

export type CauseFund = { id: string; name: string; blurb?: string };

export function causeFundsFor(storeId: StoreId): CauseFund[] {
  return STORES[storeId].causeFunds ?? [];
}

const storageKey = (storeId: StoreId) => `fanpact-cause-fund-${storeId}`;

const listeners = new Set<() => void>();
const cache = new Map<StoreId, string | null>();

function notify() {
  cache.clear();
  for (const l of listeners) l();
}

function readStored(storeId: StoreId): string | null {
  if (typeof window === "undefined") return null;
  if (cache.has(storeId)) return cache.get(storeId)!;
  let value: string | null = null;
  try {
    value = window.localStorage.getItem(storageKey(storeId));
  } catch {
    value = null;
  }
  cache.set(storeId, value);
  return value;
}

export function setCauseFund(storeId: StoreId, fundId: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(storeId), fundId);
  } catch {}
  notify();
}

/**
 * Fund designation for multi-fund cause partners. Single-fund partners have no
 * `causeFunds` configured and get `fund === null`.
 */
export function useCauseFund(storeId: StoreId): {
  funds: CauseFund[];
  fund: CauseFund | null;
  isCustom: boolean;
  select: (fundId: string) => void;
} {
  const funds = causeFundsFor(storeId);

  const subscribe = useCallback(
    (cb: () => void) => {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === storageKey(storeId)) {
          cache.delete(storeId);
          cb();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    [storeId],
  );

  const storedId = useSyncExternalStore(
    subscribe,
    () => readStored(storeId),
    () => null,
  );

  const stored = funds.find((f) => f.id === storedId) ?? null;
  // Default is the last fund (General Fund) when configured.
  const fallback = funds.length ? funds[funds.length - 1]! : null;

  return {
    funds,
    fund: stored ?? fallback,
    isCustom: !!stored,
    select: (fundId: string) => setCauseFund(storeId, fundId),
  };
}
