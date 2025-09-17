import { initializeFaro } from "@grafana/faro-web-sdk";
import { telemetryUrl } from "@src/utils/client/urls.ts";
import { useEffect } from "react";

const telemetryConfig = {
  telemetryCollectorURL: telemetryUrl,
  app: {
    name: "tms-utbetalingsoversikt-frontend",
  },
};

export const useFaro = () => {
  useEffect(() => {
    initializeFaro({
      url: telemetryConfig.telemetryCollectorURL,
      app: telemetryConfig.app,
    });
  }, []);
};
