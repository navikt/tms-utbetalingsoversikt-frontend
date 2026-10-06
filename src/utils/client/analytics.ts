import { getAnalyticsInstance } from "@navikt/nav-dekoratoren-moduler";

type ExtendedAmpltitudeEvent = {
  name: "navigere";
  data: { komponent: string; lenketekst?: string };
};

const analyticsLogger = getAnalyticsInstance("tms-utbetalingsoversikt");

export const logEvent = async (komponent: string, lenketekst?: string) => {
  const event: ExtendedAmpltitudeEvent = {
    name: "navigere",
    data: { komponent, lenketekst },
  };

  await analyticsLogger.custom(event.name, event.data);
};
