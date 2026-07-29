import { expect, test } from "@playwright/test";
import { UtbetalingerPage } from "./pages/utbetalinger.page";

test.describe("Periodefilter", () => {
  test("har 'Siste 3 måneder' valgt som standard", async ({ page }) => {
    const utbetalinger = new UtbetalingerPage(page);
    await utbetalinger.goto();

    await expect(
      page.getByRole("button", { name: "Siste 3 måneder" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("flytter valget når en annen periode velges", async ({ page }) => {
    const utbetalinger = new UtbetalingerPage(page);
    await utbetalinger.goto();

    const sisteTre = page.getByRole("button", { name: "Siste 3 måneder" });
    const iFjor = page.getByRole("button", { name: "I fjor" });

    await expect(iFjor).toHaveAttribute("aria-pressed", "false");

    await iFjor.click();

    await expect(iFjor).toHaveAttribute("aria-pressed", "true");
    await expect(sisteTre).toHaveAttribute("aria-pressed", "false");
  });
});
