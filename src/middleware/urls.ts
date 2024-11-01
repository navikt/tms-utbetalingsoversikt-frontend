import { getEnvironment } from '@src/utils/server/urls.ts';

const REDIRECT_URI = {
  local: 'http://localhost:3000/utbetalingsoversikt',
  development: 'https://www.ansatt.dev.nav.no/utbetalingsoversikt',
  production: 'https://www.nav.no/utbetalingsoversikt',
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/utbetalingsoversikt/oauth2/login?redirect=${redirectUri}`;
