import type { Page } from "@playwright/test";

/** Leaflet map-pane transform — changes when the view flies/pans. */
export async function mapPaneTransform(page: Page): Promise<string> {
  const pane = page.locator(".leaflet-map-pane");
  await pane.waitFor({ state: "attached", timeout: 30_000 });
  return pane.evaluate((el) => getComputedStyle(el).transform);
}

/**
 * Best-effort Leaflet center via stamped container id.
 * Returns null if the map instance is not reachable (no product hooks).
 */
export async function tryLeafletCenter(
  page: Page,
): Promise<{ lat: number; lng: number } | null> {
  return page.evaluate(() => {
    const container = document.querySelector(".leaflet-container") as
      | (HTMLElement & { _leaflet_id?: number })
      | null;
    if (!container?._leaflet_id) return null;

    // Leaflet keeps instances on a private registry keyed by stamp id.
    const L = (window as unknown as { L?: { Map?: { prototype?: unknown } } }).L;
    if (!L) return null;

    const anyWin = window as unknown as Record<string, unknown>;
    for (const key of Object.keys(anyWin)) {
      const val = anyWin[key] as { getCenter?: () => { lat: number; lng: number }; _container?: Element };
      if (
        val &&
        typeof val.getCenter === "function" &&
        val._container === container
      ) {
        const c = val.getCenter();
        return { lat: c.lat, lng: c.lng };
      }
    }
    return null;
  });
}
