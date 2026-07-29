import { expect, test } from "@playwright/test";
import { UtbetalingerPage } from "./pages/utbetalinger.page";

const viewports = [
  { name: "mobil", width: 375, height: 812 },
  { name: "desktop", width: 1280, height: 800 },
];

for (const viewport of viewports) {
  test(`viser innhold på ${viewport.name} (${viewport.width}px)`, async ({
    page,
  }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    const utbetalinger = new UtbetalingerPage(page);
    await utbetalinger.goto();

    await expect(utbetalinger.heading).toBeVisible();
    await utbetalinger.expectAtLeastOneUtbetaling();
  });
}
