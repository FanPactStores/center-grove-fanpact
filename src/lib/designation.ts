import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { STORES, type StoreId, type StoreConfig } from "@/data/stores";
import { BUTLER_TEAMS } from "@/data/butler-teams";
import { CG_ORGS } from "@/data/center-grove-orgs";
import { LEGACY_ORGS } from "@/data/legacy-orgs";
import { ASSA_ORGS } from "@/data/assa-orgs";

export type DesignationKind = "general" | "team" | "player";

export type Designation = {
  kind: DesignationKind;
  /** The display label shown in banners / cart / confirmations. */
  name: string;
  /** Secondary line — team & age group for a player, sport for a team, etc. */
  subtitle?: string;
  /** Stable code stored alongside (e.g. ASSA-WC-12U-#7). */
  code: string;
};

export type DesignationGroup = {
  /** Display label for the tab — sport, org, hub. */
  label: string;
  /** Stable id (sport slug or org slug). */
  id: string;
  /** Team-level entries that can themselves be designated. */
  teams: Array<{
    teamId: string;
    teamLabel: string;
    teamCode: string;
    players: Array<{
      id: string;
      name: string;
      meta: string; // e.g. "#12 · QB · Football" or "10U Nationals · P"
      code: string;
    }>;
  }>;
};

export type StoreDesignationIndex = {
  storeId: StoreId;
  generalFundName: string;
  groups: DesignationGroup[];
  // All players flattened for fast search
  allPlayers: Array<{
    id: string;
    name: string;
    meta: string;
    code: string;
    groupLabel: string;
    teamLabel: string;
  }>;
};

function butlerIndex(): StoreDesignationIndex {
  const groups: DesignationGroup[] = BUTLER_TEAMS.map((t) => ({
    label: t.name,
    id: t.slug,
    teams: [
      {
        teamId: t.slug,
        teamLabel: t.name,
        teamCode: `BU-${t.slug.toUpperCase()}`,
        players: t.players.map((p) => ({
          id: `${t.slug}/${p.slug}`,
          name: p.name,
          meta: `#${p.number} · ${p.position} · ${t.name}`,
          code: `BU-${t.slug.toUpperCase()}-#${p.number}-${p.slug}`,
        })),
      },
    ],
  }));
  return flatten("butler", "Butler Athletics Community Fund", groups);
}

function cgIndex(): StoreDesignationIndex {
  const groups: DesignationGroup[] = CG_ORGS.map((o) => ({
    label: o.shortName,
    id: o.slug,
    teams: o.teams.map((t) => ({
      teamId: `${o.slug}/${t.slug}`,
      teamLabel: `${t.name} (${t.ageGroup})`,
      teamCode: t.designationCode,
      players: t.players.map((p) => ({
        id: `${o.slug}/${t.slug}/${p.slug}`,
        name: p.name,
        meta: `${t.name} · ${t.ageGroup} · ${p.position}`,
        code: p.designationCode,
      })),
    })),
  }));
  return flatten("center-grove", "Center Grove Community Alliance Fund", groups);
}

function legacyIndex(): StoreDesignationIndex {
  const groups: DesignationGroup[] = LEGACY_ORGS.map((o) => ({
    label: o.shortName,
    id: o.slug,
    teams: o.teams.map((t) => ({
      teamId: `${o.slug}/${t.slug}`,
      teamLabel: `${t.name} (${t.ageGroup})`,
      teamCode: t.designationCode,
      players: t.players.map((p) => ({
        id: `${o.slug}/${t.slug}/${p.slug}`,
        name: p.name,
        meta: `${t.name} · ${t.ageGroup} · ${p.position}`,
        code: p.designationCode,
      })),
    })),
  }));
  return flatten("legacy", "Legacy Performance Academy Fund", groups);
}

function assaIndex(): StoreDesignationIndex {
  const groups: DesignationGroup[] = ASSA_ORGS.map((o) => ({
    label: o.shortName,
    id: o.slug,
    teams: o.teams.map((t) => ({
      teamId: `${o.slug}/${t.slug}`,
      teamLabel: `${t.name} (${t.ageGroup})`,
      teamCode: t.designationCode,
      players: t.players.map((p) => ({
        id: `${o.slug}/${t.slug}/${p.slug}`,
        name: p.name,
        meta: `${t.name} · ${t.ageGroup} · ${p.position}`,
        code: p.designationCode,
      })),
    })),
  }));
  return flatten("assa", "All-Star Sports Academy Fund", groups);
}

function flatten(
  storeId: StoreId,
  generalFundName: string,
  groups: DesignationGroup[],
): StoreDesignationIndex {
  const allPlayers: StoreDesignationIndex["allPlayers"] = [];
  for (const g of groups) {
    for (const t of g.teams) {
      for (const p of t.players) {
        allPlayers.push({
          id: p.id,
          name: p.name,
          meta: p.meta,
          code: p.code,
          groupLabel: g.label,
          teamLabel: t.teamLabel,
        });
      }
    }
  }
  return { storeId, generalFundName, groups, allPlayers };
}

const indexCache: Partial<Record<StoreId, StoreDesignationIndex>> = {};
export function getDesignationIndex(storeId: StoreId): StoreDesignationIndex {
  if (indexCache[storeId]) return indexCache[storeId]!;
  const built =
    storeId === "butler" ? butlerIndex()
    : storeId === "center-grove" ? cgIndex()
    : storeId === "legacy" ? legacyIndex()
    : assaIndex();
  indexCache[storeId] = built;
  return built;
}

export const DEFAULT_FUND_NAMES: Record<StoreId, string> = {
  butler: "Butler Athletics Community Fund",
  "center-grove": "Center Grove Community Alliance Fund",
  legacy: "Legacy Performance Academy Fund",
  assa: "All-Star Sports Academy Fund",
};

export function defaultDesignation(storeId: StoreId): Designation {
  return {
    kind: "general",
    name: DEFAULT_FUND_NAMES[storeId],
    code: `${storeId.toUpperCase()}-GENERAL`,
  };
}

const storageKey = (storeId: StoreId) => `fanpact-designation-${storeId}`;
const welcomeKey = (storeId: StoreId) => `fanpact-welcome-seen-${storeId}`;

// ---------- pub/sub so multiple components stay in sync ----------
const listeners = new Set<() => void>();
const designationCache = new Map<StoreId, Designation | null>();
function notify() {
  designationCache.clear();
  for (const l of listeners) l();
}

function readStoredRaw(storeId: StoreId): Designation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(storeId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Designation;
    if (!parsed || !parsed.name || !parsed.kind) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readStored(storeId: StoreId): Designation | null {
  if (designationCache.has(storeId)) return designationCache.get(storeId)!;
  const fresh = readStoredRaw(storeId);
  designationCache.set(storeId, fresh);
  return fresh;
}

export function setDesignation(storeId: StoreId, value: Designation) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(storeId), JSON.stringify(value));
  notify();
}

export function clearDesignation(storeId: StoreId) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(storageKey(storeId));
  notify();
}

export function useDesignation(storeId: StoreId): {
  designation: Designation;
  isCustom: boolean;
  set: (d: Designation) => void;
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
  const stored = useSyncExternalStore(
    subscribe,
    () => readStored(storeId),
    () => null,
  );
  const designation = stored ?? defaultDesignation(storeId);
  return {
    designation,
    isCustom: !!stored && stored.kind !== "general",
    set: (d) => setDesignation(storeId, d),
    clear: () => clearDesignation(storeId),
  };
}

export function useWelcomeSeen(storeId: StoreId): {
  seen: boolean;
  markSeen: () => void;
} {
  const [seen, setSeen] = useState<boolean>(true); // SSR-safe default: don't show
  useEffect(() => {
    try {
      setSeen(window.localStorage.getItem(welcomeKey(storeId)) === "1");
    } catch {
      setSeen(true);
    }
  }, [storeId]);
  const markSeen = useCallback(() => {
    try {
      window.localStorage.setItem(welcomeKey(storeId), "1");
    } catch {}
    setSeen(true);
  }, [storeId]);
  return { seen, markSeen };
}

/** Clear every per-store localStorage flag so the demo flow restarts fresh. */
export function resetStoreState(storeId: StoreId) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(welcomeKey(storeId));
    window.localStorage.removeItem(storageKey(storeId));
    window.localStorage.removeItem(`fanpact-list-${storeId}`);
  } catch {}
  notify();
}

export function storeForId(storeId: StoreId): StoreConfig {
  return STORES[storeId];
}
