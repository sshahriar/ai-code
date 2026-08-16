import { expect, test, type Page } from "@playwright/test";

const SOURCE_RE = /^(gdelt|rss|sample|police_uk|guardian|reliefweb)$/i;

async function gotoApp(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("geonews-map")).toBeVisible({ timeout: 30_000 });
  await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 30_000 });
}

async function waitForDrawerSettled(page: Page) {
  const drawer = page.getByTestId("intel-drawer");
  await expect(drawer).toBeVisible();
  await expect
    .poll(async () => {
      const cards = await page.getByTestId("event-card").count();
      const empty = await drawer.getByText(/No events in this view/i).count();
      return cards > 0 || empty > 0;
    }, { timeout: 30_000 })
    .toBeTruthy();
}

async function selectPlace(page: Page, query: string, optionMatch: RegExp) {
  const search = page.getByTestId("place-search");
  await search.fill(query);
  const option = page.getByRole("option").filter({ hasText: optionMatch }).first();
  await expect(option).toBeVisible({ timeout: 30_000 });
  await option.click();
  await expect(search).toHaveValue(optionMatch, { timeout: 15_000 });
}

test.describe("GeoNews E2E (plan §17)", () => {
  test("1. Fresh start: map visible, Dhaka default, sample events", async ({
    page,
  }) => {
    await gotoApp(page);
    await waitForDrawerSettled(page);

    const cards = page.getByTestId("event-card");
    await expect(cards.first()).toBeVisible({ timeout: 30_000 });
    expect(await cards.count()).toBeGreaterThan(0);

    const body = await page.locator("body").innerText();
    expect(body.toLowerCase()).toMatch(/dhaka|gulshan|dhanmondi|mirpur|motijheel/);
  });

  test("2. Search London → map moves; events or empty-state", async ({ page }) => {
    await gotoApp(page);
    await waitForDrawerSettled(page);

    const beforeCount = await page.getByTestId("event-card").count();
    const beforeTitle =
      beforeCount > 0
        ? await page.getByTestId("event-card").first().locator("h3").innerText()
        : "";

    await selectPlace(page, "London", /London/i);

    // Bounds / fly should refresh the drawer (Dhaka sample → London empty or different set).
    await expect
      .poll(async () => {
        const drawer = page.getByTestId("intel-drawer");
        const cards = await page.getByTestId("event-card").count();
        const empty = await drawer.getByText(/No events in this view/i).count();
        if (empty > 0) return "empty";
        if (cards === 0) return "pending";
        const title = await page.getByTestId("event-card").first().locator("h3").innerText();
        if (beforeCount > 0 && title === beforeTitle && cards === beforeCount) {
          return "unchanged";
        }
        return "changed";
      }, { timeout: 25_000 })
      .toMatch(/^(empty|changed)$/);

    // Fallback note: leaflet pane transform is often identity; drawer bbox refresh is the signal.
    const cards = await page.getByTestId("event-card").count();
    const empty = await page
      .getByTestId("intel-drawer")
      .getByText(/No events in this view/i)
      .count();
    expect(cards > 0 || empty > 0).toBeTruthy();
  });

  test("3. Filter crime hides non-crime", async ({ page }) => {
    await gotoApp(page);
    await waitForDrawerSettled(page);
    await expect(page.getByTestId("event-card").first()).toBeVisible();

    await page.getByTestId("filter-crime").click();

    await expect
      .poll(async () => {
        const cards = page.getByTestId("event-card");
        const n = await cards.count();
        if (n === 0) return "empty";
        const categories = await cards.evaluateAll((els) =>
          els.map((el) => el.getAttribute("data-category")),
        );
        return categories.every((c) => c === "crime") ? "ok" : categories.join(",");
      }, { timeout: 20_000 })
      .toBe("ok");
  });

  test("4. Open event → drawer title + source badge", async ({ page }) => {
    await gotoApp(page);
    await waitForDrawerSettled(page);

    const card = page.getByTestId("event-card").first();
    await expect(card).toBeVisible();
    const title = (await card.locator("h3").innerText()).trim();
    expect(title.length).toBeGreaterThan(0);

    await card.click();

    const drawer = page.getByTestId("intel-drawer");
    await expect(drawer.locator("h3").filter({ hasText: title }).first()).toBeVisible();

    const badge = drawer.getByTestId("source-badge").first();
    await expect(badge).toBeVisible();
    const source = await badge.getAttribute("data-source");
    expect(source).toBeTruthy();
    expect(source!).toMatch(SOURCE_RE);
  });

  test("5. Watchlist add → reload → chip remains", async ({ page, request }) => {
    // Test isolation: prior runs may have left Hobart in the shared volume.
    const existing = await request.get("/api/watchlist");
    expect(existing.ok()).toBeTruthy();
    const listed = (await existing.json()) as {
      places?: Array<{ id: string; name: string }>;
    };
    for (const place of listed.places ?? []) {
      if (/^Hobart$/i.test(place.name)) {
        const del = await request.delete(`/api/watchlist/${place.id}`);
        expect(del.ok() || del.status() === 204).toBeTruthy();
      }
    }

    await gotoApp(page);

    // Geocoded place not in seed watchlist (Dhaka/London/NY/Tokyo).
    await selectPlace(page, "Hobart", /Hobart/i);

    const postPromise = page.waitForResponse(
      (r) =>
        r.url().includes("/api/watchlist") &&
        r.request().method() === "POST" &&
        !r.url().match(/watchlist\/[^/]+$/),
      { timeout: 20_000 },
    );
    await page.getByTestId("watchlist-add").click();
    const post = await postPromise;

    expect(
      post.status(),
      `POST /api/watchlist expected 201, got ${post.status()}: ${await post.text()}`,
    ).toBe(201);

    const body = await post.json();
    const placeName = String(body.name ?? "Hobart");
    const placeId = String(body.id ?? "");
    expect(placeId.length).toBeGreaterThan(0);

    await expect(page.getByTestId(`watchlist-chip-${placeId}`)).toBeVisible({
      timeout: 15_000,
    });
    await expect(
      page.getByTestId(`watchlist-chip-${placeId}`),
    ).toContainText(placeName);

    await page.reload();
    await gotoApp(page);

    await expect(page.getByTestId(`watchlist-chip-${placeId}`)).toBeVisible({
      timeout: 20_000,
    });
  });

  test('6. AI mock: "Brief this place" → brief + caveats', async ({ page }) => {
    await gotoApp(page);

    const panel = page.getByTestId("ai-panel");
    await expect(panel).toBeVisible();

    const input = page.getByTestId("ai-input");
    await input.fill("Brief this place");
    await panel.getByRole("button", { name: /^Send$/i }).click();

    const brief = page.getByTestId("ai-brief");
    await expect(brief).toBeVisible({ timeout: 30_000 });
    await expect(brief.getByText(/Caveat:/i).first()).toBeVisible();
  });

  test("7. GET /api/health → ok", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  test("8. Heatmap toggle does not crash", async ({ page }) => {
    await gotoApp(page);
    await waitForDrawerSettled(page);

    const toggle = page.getByTestId("layer-heatmap");
    await expect(toggle).toBeVisible();
    await toggle.click();
    await page.waitForTimeout(500);
    await toggle.click();
    await page.waitForTimeout(300);

    await expect(page.getByTestId("geonews-map")).toBeVisible();
    await expect(page.locator(".leaflet-container")).toBeVisible();
    await expect(page.getByTestId("intel-drawer")).toBeVisible();
  });
});
