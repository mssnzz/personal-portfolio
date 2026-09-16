import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;

/**
 * The suite runs against a production build, not the dev server: metadata,
 * static generation and image optimisation only behave like production in
 * `next start`, and those are exactly what these tests assert.
 *
 * A dedicated port keeps a running `next dev` on 3000 out of the way.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    // The CV is read on phones as often as on laptops; the responsive specs
    // depend on this project existing.
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],

  webServer: {
    // CI builds in its own step so a failing build is reported as a failing
    // build rather than as a test timeout; locally the build is folded in so
    // `pnpm test` is one command.
    command: process.env.CI
      ? `pnpm start --port ${PORT}`
      : `pnpm build && pnpm start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
