import type { AmplitudeEvent } from "@navikt/nav-dekoratoren-moduler";
import { getAnalyticsInstance } from "@navikt/nav-dekoratoren-moduler";

type ExtendedAmpltitudeEvent = AmplitudeEvent<
  "navigere",
  { komponent: string } & { lenketekst: string }
>;

const analyticsLogger = getAnalyticsInstance<ExtendedAmpltitudeEvent>(
  "tms-utbetalingsoversikt",
);

export const logEvent = async (lenketekst: string, komponent: string) => {
  await analyticsLogger("navigere", {
    komponent: komponent,
    lenketekst: lenketekst,
  });
};
