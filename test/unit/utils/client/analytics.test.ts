import { beforeEach, describe, expect, it, vi } from "vitest";

const { custom, logger, getAnalyticsInstance } = vi.hoisted(() => {
  const custom = vi.fn();
  const logger = Object.assign(vi.fn(), { custom });
  return { custom, logger, getAnalyticsInstance: vi.fn(() => logger) };
});

vi.mock("@navikt/nav-dekoratoren-moduler", () => ({ getAnalyticsInstance }));

import {
  logFeilmeldingForside,
  logFiltervalg,
  logKnappKlikket,
  logNavigere,
} from "@src/utils/client/analytics";

describe("analytics", () => {
  beforeEach(() => {
    logger.mockClear();
    custom.mockClear();
  });

  it("should create the analytics logger with the app origin", () => {
    expect(getAnalyticsInstance).toHaveBeenCalledWith(
      "tms-utbetalingsoversikt",
    );
  });

  it("should log a typed 'navigere' event with the properties as given", async () => {
    await logNavigere({
      lenketekst: "Satser",
      destinasjon: "https://nav.no/satser",
      komponentId: "relatert-innhold-link",
      lenkegruppe: "kommende",
    });

    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger).toHaveBeenCalledWith("navigere", {
      lenketekst: "Satser",
      destinasjon: "https://nav.no/satser",
      komponentId: "relatert-innhold-link",
      lenkegruppe: "kommende",
    });
    expect(custom).not.toHaveBeenCalled();
  });

  it("should log a typed 'filtervalg' event with the properties as given", async () => {
    await logFiltervalg({
      kategori: "ytelse",
      filternavn: "Dagpenger",
      komponentId: "filter-ytelse",
    });

    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger).toHaveBeenCalledWith("filtervalg", {
      kategori: "ytelse",
      filternavn: "Dagpenger",
      komponentId: "filter-ytelse",
    });
    expect(custom).not.toHaveBeenCalled();
  });

  it("should log a typed 'knapp klikket' event with the properties as given", async () => {
    await logKnappKlikket({
      tekst: "Skriv ut",
      komponentId: "skriv-ut-utbetaling",
    });

    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger).toHaveBeenCalledWith("knapp klikket", {
      tekst: "Skriv ut",
      komponentId: "skriv-ut-utbetaling",
    });
    expect(custom).not.toHaveBeenCalled();
  });

  it("should log the front page error as a typed 'alert vist' event", async () => {
    await logFeilmeldingForside();

    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger).toHaveBeenCalledWith("alert vist", {
      variant: "error",
      tekst:
        "Vi har problemer med å hente inn dine utbetalinger. Vi beklager ulempene dette medfører. Du kan prøve å endre periode, laste inn siden på nytt eller prøv igjen senere.",
      komponentId: "fikk-feilmelding-forside",
    });
    expect(custom).not.toHaveBeenCalled();
  });
});
