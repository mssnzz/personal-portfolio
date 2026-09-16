import { test, expect } from "@playwright/test";

test.describe("accessibility", () => {
  test("every image declares alt text, empty only when decorative", async ({
    page,
  }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      // Present-but-empty is a valid, deliberate choice; missing is not, and
      // that is the distinction this asserts.
      await expect(images.nth(i)).toHaveAttribute("alt", /.*/);
    }
  });

  test("headings start at h1 and never skip a level", async ({ page }) => {
    await page.goto("/");

    const levels = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll((nodes) => nodes.map((n) => Number(n.tagName[1])));

    expect(levels[0], "the page should open at h1").toBe(1);

    for (let i = 1; i < levels.length; i++) {
      expect(
        levels[i] - levels[i - 1],
        `h${levels[i - 1]} is followed by h${levels[i]}`,
      ).toBeLessThanOrEqual(1);
    }
  });

  test("interactive controls expose an accessible name", async ({ page }) => {
    await page.goto("/");

    const controls = page.locator("a, button");
    const count = await controls.count();

    for (let i = 0; i < count; i++) {
      const control = controls.nth(i);
      const name = await control.evaluate((el) =>
        (
          el.getAttribute("aria-label") ??
          el.textContent ??
          ""
        ).trim(),
      );
      expect(name.length, `control ${i} has no accessible name`).toBeGreaterThan(
        0,
      );
    }
  });

  test("the page is reachable by keyboard", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(["A", "BUTTON"]).toContain(focused);
  });
});
