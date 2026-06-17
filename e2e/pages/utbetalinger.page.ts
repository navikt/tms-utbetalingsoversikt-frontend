import { expect, type Locator, type Page } from "@playwright/test";

const BASE_PATH = "/utbetalingsoversikt";

export class UtbetalingerPage {
  readonly heading: Locator;
  readonly breadcrumb: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole("heading", { level: 1 });
    this.breadcrumb = page.getByRole("navigation", { name: "Brødsmuler" });
  }

  async goto() {
    await this.page.goto(BASE_PATH);
    await expect(this.heading).toBeVisible();
  }

  utbetalingLinks(): Locator {
    return this.page.getByRole("link", {
      name: /barnetrygd|grunn- og hjelpestønad/i,
    });
  }

  async expectAtLeastOneUtbetaling() {
    await expect(this.utbetalingLinks().first()).toBeVisible({
      timeout: 20_000,
    });
  }
}
