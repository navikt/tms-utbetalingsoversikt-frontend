import { type MetricValues } from "@components/utkast/UtkastTypes.ts";

import { init, track } from "@amplitude/analytics-browser";

export const initAmplitude = () => {
  init("default", undefined, {
    useBatch: true,
    serverUrl: "https://amplitude.nav.no/collect-auto",
    ingestionMetadata: {
      sourceName: window.location.toString(),
    },
  });
};

export const logAmplitudeEvent = (
  skjemaurl: string,
  metrics: MetricValues | null | undefined
) => {
  if (metrics) {
    track("skjema åpnet", { skjemaurl, ...metrics });
  } else {
    track("skjema åpnet", { skjemaurl });
  }
};

