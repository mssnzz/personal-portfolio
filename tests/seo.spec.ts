import { test, expect } from "@playwright/test";

/** A portfolio is shared as a link far more often than it is browsed to, so
 *  the head is part of the product, not decoration around it. */
test.describe("metadata", () => {
  test("/ carries a title, description and canonical", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Manuel Sanchez/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.{80,}/);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https:\/\//,
    );
  });

  test("/ declares an Open Graph card that actually resolves", async ({
    page,
    request,
  }) => {
    await page.goto("/");

    for (const property of ["og:title", "og:description", "og:type"]) {
      await expect(page.locator(`meta[property="${property}"]`)).toHaveAttribute(
        "content",
        /.+/,
      );
    }

    const image = page.locator('meta[property="og:image"]');
    const declared = await image.getAttribute("content");
    expect(declared, "og:image must be absolute for crawlers").toMatch(
      /^https?:\/\//,
    );

    // Resolved against the build under test, not against the canonical host:
    // the deployed site is a separate concern, and hitting it here would make
    // this suite fail or pass on someone else's deploy.
    const { pathname, search } = new URL(declared!);

    // Crawlers fetch this; a 404 is a blank preview everywhere the link lands.
    const response = await request.get(`${pathname}${search}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image");

    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  });

  test("the Spanish route is marked as Spanish", async ({ page }) => {
    await page.goto("/servicios");
    // The document is English; only this subtree is not.
    await expect(page.locator('[lang="es"]')).toHaveCount(1);
  });

  test("robots.txt points at the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("Allow: /");
    expect(body).toMatch(/Sitemap: https:\/\/\S+\/sitemap\.xml/);
  });

  test("sitemap.xml lists both routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toMatch(/<loc>https:\/\/[^<]+<\/loc>/);
    expect(body).toContain("/servicios");
  });
});
