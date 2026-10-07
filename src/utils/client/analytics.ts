import {
  type FiltervalgProperties,
  getAnalyticsInstance,
  type KnappKlikketProperties,
  type NavigereProperties,
} from "@navikt/nav-dekoratoren-moduler";

const analyticsLogger = getAnalyticsInstance("tms-utbetalingsoversikt");

export const logNavigere = async (properties: NavigereProperties) => {
  await analyticsLogger("navigere", properties);
};

export const logFiltervalg = async (properties: FiltervalgProperties) => {
  await analyticsLogger("filtervalg", properties);
};

export const logKnappKlikket = async (properties: KnappKlikketProperties) => {
  await analyticsLogger("knapp klikket", properties);
};

export const logFeilmeldingForside = async () => {
  await analyticsLogger("alert vist", {
    variant: "error",
    tekst:
      "Vi har problemer med å hente inn dine utbetalinger. Vi beklager ulempene dette medfører. Du kan prøve å endre periode, laste inn siden på nytt eller prøv igjen senere.",
    komponentId: "fikk-feilmelding-forside",
  });
};
