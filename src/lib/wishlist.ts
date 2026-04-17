"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "vlk-wishlist";

function getSnapshot(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function getServerSnapshot(): string[] {
  return [];
}

type Listener = () => void;
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  for (const l of listeners) l();
}

function write(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Quota exceeded or private mode — silently fail, don't crash the UI
  }
  notify();
}

// Cached snapshot to satisfy useSyncExternalStore's reference-stability
// requirement. We only rebuild the array when the stored string changes.
let cachedRaw = "";
let cachedValue: string[] = [];
function getCachedSnapshot(): string[] {
  if (typeof window === "undefined") return cachedValue;
  const raw = window.localStorage.getItem(STORAGE_KEY) ?? "";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = getSnapshot();
  }
  return cachedValue;
}

export function useWishlist() {
  const slugs = useSyncExternalStore(subscribe, getCachedSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    const current = getSnapshot();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    write(next);
  }, []);

  const has = useCallback(
    (slug: string) => slugs.includes(slug),
    [slugs],
  );

  const clear = useCallback(() => write([]), []);

  return { slugs, count: slugs.length, toggle, has, clear };
}
