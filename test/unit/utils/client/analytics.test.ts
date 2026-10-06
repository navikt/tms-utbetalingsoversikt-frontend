import { beforeEach, describe, expect, it, vi } from "vitest";

const { custom, getAnalyticsInstance } = vi.hoisted(() => {
  const custom = vi.fn();
  const logger = Object.assign(vi.fn(), { custom });
  return { custom, getAnalyticsInstance: vi.fn(() => logger) };
});

vi.mock("@navikt/nav-dekoratoren-moduler", () => ({ getAnalyticsInstance }));

import { logEvent } from "@src/utils/client/analytics";

describe("logEvent", () => {
  beforeEach(() => {
    custom.mockClear();
  });

  it("should create the analytics logger with the app origin", () => {
    expect(getAnalyticsInstance).toHaveBeenCalledWith(
      "tms-utbetalingsoversikt",
    );
  });

  it("should log a custom 'navigere' event with komponent and lenketekst", async () => {
    await logEvent("filter-ytelse", "Dagpenger");

    expect(custom).toHaveBeenCalledTimes(1);
    expect(custom).toHaveBeenCalledWith("navigere", {
      komponent: "filter-ytelse",
      lenketekst: "Dagpenger",
    });
  });

  it("should pass an undefined lenketekst when none is given", async () => {
    await logEvent("fikk-feilmelding-forside");

    expect(custom).toHaveBeenCalledWith("navigere", {
      komponent: "fikk-feilmelding-forside",
      lenketekst: undefined,
    });
  });
});
