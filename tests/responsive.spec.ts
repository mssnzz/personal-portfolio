import { test, expect } from "@playwright/test";

/** Horizontal scroll on a phone is the most common responsive defect and the
 *  easiest to ship without noticing, since it only shows at one breakpoint. */
test.describe("responsive", () => {
  for (const route of ["/", "/servicios"] as const) {
    test(`${route} does not scroll sideways`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });

      // A pixel of rounding is not a defect; a visible gutter is.
      expect(overflow, `${route} overflows by ${overflow}px`).toBeLessThanOrEqual(
        1,
      );
    });
  }

  test("the nav collapses to a menu button on mobile", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile viewport only");

    await page.goto("/");
    await expect(page.getByRole("button", { name: /menu/i })).toBeVisible();
  });

  test("the nav shows its links on desktop", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop viewport only");

    await page.goto("/");
    await expect(
      page.locator("header nav").getByRole("link", { name: "Experience" }),
    ).toBeVisible();
  });
});
