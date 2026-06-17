import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { UtbetalingerPage } from "./pages/utbetalinger.page";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21aa"];

test.describe("Universell utforming", () => {
  test("landingssiden har ingen WCAG-brudd", async ({ page }) => {
    const utbetalinger = new UtbetalingerPage(page);
    await utbetalinger.goto();
    await utbetalinger.expectAtLeastOneUtbetaling();

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

    expect(results.violations).toEqual([]);
  });

  test("404-siden har ingen WCAG-brudd", async ({ page }) => {
    await page.goto("/utbetalingsoversikt/finnes-ikke");
    await expect(
      page.getByRole("heading", { name: "Beklager, vi fant ikke siden" }),
    ).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

    expect(results.violations).toEqual([]);
  });
});
