// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import amplitude from "amplitude-js";
import { baseUrl } from "./urls";

export const initializeAmplitude = () => {
  amplitude.getInstance().init("default", "", {
    apiEndpoint: "amplitude.nav.no/collect-auto",
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: baseUrl,
  });
};

export function logEvent(komponent: string, lenketekst?: string) {
  amplitude.getInstance().logEvent("navigere", {
    app: "tms-utbetalingsoversikt-ny",
    komponent: komponent,
    lenketekst: lenketekst,
  });
}
