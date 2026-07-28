import { expect, test } from "@playwright/test";
import { UtbetalingerPage } from "./pages/utbetalinger.page";

test.describe("Dekoratør", () => {
  // Regression guard: Astro 7 / @astrojs/react 6 dropped <link rel="stylesheet">
  // emitted by server-rendered React decorator components, leaving the decorator
  // unstyled. We inject the decorator via fetchDecoratorHtml + set:html instead.
  // This asserts the decorator's stylesheet actually reaches <head>.
  test("injiserer dekoratørens stilark i <head>", async ({ page }) => {
    const utbetalinger = new UtbetalingerPage(page);
    await utbetalinger.goto();

    await expect(
      page.locator('head link[rel="stylesheet"][href*="dekoratoren"]').first(),
    ).toBeAttached();
  });

  test("viser dekoratørens header og footer", async ({ page }) => {
    const utbetalinger = new UtbetalingerPage(page);
    await utbetalinger.goto();

    await expect(page.locator("#decorator-header")).toBeVisible();
    await expect(page.locator("#decorator-footer")).toBeVisible();
  });
});
