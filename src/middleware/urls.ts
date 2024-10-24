import { getEnvironment } from "@src/utils/server/urls.ts";

const REDIRECT_URI = {
  local: "http://localhost:3000/utbetalingsoversikt-ny",
  development: "https://www.ansatt.dev.nav.no/utbetalingsoversikt-ny",
  production: "https://www.nav.no/utbetalingsoversikt-ny",
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/utbetalingsoversikt-ny/oauth2/login?redirect=${redirectUri}`;
