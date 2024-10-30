import { useEffect } from 'react';
import { initializeFaro } from '@grafana/faro-web-sdk';
import { telemetryUrl } from '@src/utils/client/urls.ts';

const telemetryConfig = {
  telemetryCollectorURL: telemetryUrl,
  app: {
    name: 'tms-min-side',
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
