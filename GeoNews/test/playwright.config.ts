import { defineConfig, devices } from "@playwright/test";

/**
 * GeoNews E2E — run against http://localhost:8000 with mocks:
 *   LLM_MOCK=true INGEST_MOCK=true
 *
 * Stack options:
 *   A) Already running: ..\scripts\start_windows.ps1 (or docker compose up)
 *   B) Test compose:    docker compose -f docker-compose.test.yml up -d --build
 *
 * Production image must NOT include Playwright browsers (test/ is dockerignored).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL: "http://localhost:8000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
