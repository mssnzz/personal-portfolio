import { test, expect } from "@playwright/test";

const ROUTES = ["/", "/servicios"] as const;

test.describe("smoke", () => {
  for (const route of ROUTES) {
    test(`${route} responds and renders its heading`, async ({ page }) => {
      const response = await page.goto(route);

      expect(response?.status(), `${route} should return 200`).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).not.toBeEmpty();
    });
  }

  test("/ reports no uncaught errors or failed requests", async ({ page }) => {
    // The star count comes from the unauthenticated GitHub API, which allows
    // 60 requests an hour per IP — running this suite a few times is enough to
    // start getting 403s, and a third party's rate limit is not a defect in
    // this page. Stubbed so the assertion below is about our code.
    await page.route("https://api.github.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ stargazers_count: 0 }),
      }),
    );

    const problems: string[] = [];

    page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error") problems.push(`console: ${message.text()}`);
    });
    page.on("requestfailed", (request) => {
      // A cancelled prefetch is not a broken page.
      const failure = request.failure()?.errorText ?? "";
      if (failure.includes("ERR_ABORTED")) return;
      problems.push(`request: ${request.url()} — ${failure}`);
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(problems).toEqual([]);
  });

  for (const route of ROUTES) {
    test(`${route} loads every image it asks for`, async ({ page }) => {
      // A renamed or re-encoded asset breaks silently: the layout still holds
      // its space and only the picture is missing.
      const broken: string[] = [];
      page.on("response", (response) => {
        if (
          response.request().resourceType() === "image" &&
          response.status() >= 400
        ) {
          broken.push(`${response.status()} ${response.url()}`);
        }
      });

      await page.goto(route);
      await page.waitForLoadState("networkidle");

      expect(broken).toEqual([]);
    });
  }

  test("every project card points at a real destination", async ({ page }) => {
    await page.goto("/");

    const links = page.locator('main a[target="_blank"]');
    const count = await links.count();
    expect(count, "the work sections should link out").toBeGreaterThan(5);

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      // An external link that opens a tab must not hand the opener over.
      await expect(link).toHaveAttribute("rel", /noopener|noreferrer/);
      await expect(link).toHaveAttribute("href", /^https?:\/\//);
    }
  });

  test("unknown routes answer 404, not 200", async ({ page }) => {
    // A defect worth guarding against: a 200 on an unknown route leaves dead
    // URLs indexable.
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
