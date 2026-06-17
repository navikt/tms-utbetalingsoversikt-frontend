import { expect, test } from "@playwright/test";
import { UtbetalingerPage } from "./pages/utbetalinger.page";

test.describe("Landingsside", () => {
  test("viser overskrift og brødsmulesti", async ({ page }) => {
    const utbetalinger = new UtbetalingerPage(page);
    await utbetalinger.goto();

    await expect(utbetalinger.heading).toHaveText("Utbetalinger");
    await expect(
      utbetalinger.breadcrumb.getByRole("link", { name: "Min side" }),
    ).toBeVisible();
  });

  test("viser utbetalinger fra api-et", async ({ page }) => {
    const utbetalinger = new UtbetalingerPage(page);
    await utbetalinger.goto();

    await utbetalinger.expectAtLeastOneUtbetaling();
  });

  test("navigerer til detaljesiden når en utbetaling klikkes", async ({
    page,
  }) => {
    const utbetalinger = new UtbetalingerPage(page);
    await utbetalinger.goto();
    await utbetalinger.expectAtLeastOneUtbetaling();

    await utbetalinger.utbetalingLinks().first().click();

    await expect(page).toHaveURL(/\/utbetalingsoversikt\/utbetaling\//);
  });
});
