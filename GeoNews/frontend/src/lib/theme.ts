export type Theme = "light" | "dark";

export const STORAGE_KEY = "geonews.theme";

export const CARTO_TILES = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
} as const;

export const THEME_EVENT = "geonews-theme";

/** Inline bootstrap: apply saved theme before first paint (static export FOUC guard). */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(t!=="light"&&t!=="dark")t="dark";document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute("data-theme","dark");document.documentElement.style.colorScheme="dark";}})();`;

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // Safari private mode / blocked storage
  }
  return "dark";
}

export function readDomTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function applyTheme(theme: Theme): Theme {
  const next: Theme = theme === "light" ? "light" : "dark";
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
  }
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore quota / private mode
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
  }
  return next;
}

export function toggleTheme(): Theme {
  return applyTheme(readDomTheme() === "light" ? "dark" : "light");
}

export function subscribeTheme(onChange: (theme: Theme) => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  const onCustom = (event: Event) => {
    const detail = (event as CustomEvent<unknown>).detail;
    onChange(isTheme(detail) ? detail : readDomTheme());
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange(readTheme());
  };

  window.addEventListener(THEME_EVENT, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

export function cartoTileUrl(theme: Theme): string {
  return CARTO_TILES[theme === "light" ? "light" : "dark"];
}
