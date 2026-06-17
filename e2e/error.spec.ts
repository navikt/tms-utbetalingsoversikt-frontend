import { expect, test } from "@playwright/test";

test.describe("404-side", () => {
  test("viser ikke-funnet-side for en ukjent rute", async ({ page }) => {
    await page.goto("/utbetalingsoversikt/finnes-ikke");

    await expect(
      page.getByRole("heading", { name: "Beklager, vi fant ikke siden" }),
    ).toBeVisible();
  });

  test("har en lenke tilbake til Min side", async ({ page }) => {
    await page.goto("/utbetalingsoversikt/finnes-ikke");

    await expect(
      page.getByRole("button", { name: "Gå til Min side" }),
    ).toBeVisible();
  });
});
