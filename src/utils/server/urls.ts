const isDevelopment = process.env.NAIS_CLUSTER_NAME === 'dev-gcp';
export const isLocal = process.env.NODE_ENV === 'development';

export const getEnvironment = () => {
  if (isDevelopment) {
    return 'development';
  }

  if (isLocal) {
    return 'local';
  }

  return 'production';
};

type EnvUrl = { development: string; production: string; local: string };

const MIN_SIDE_URL = {
  local: 'http://localhost:3000/minside',
  ansatt: 'https://www.ansatt.dev.nav.no/minside',
  development: 'https://www.intern.dev.nav.no/minside',
  production: 'https://www.nav.no/minside',
};

const UTBETALINGSOVERSIKT_API_URL = {
  local: 'http://localhost:3000/api',
  ansatt: 'http://tms-utbetalingsoversikt-api/tms-utbetalingsoversikt-api',
  development: 'http://tms-utbetalingsoversikt-api/tms-utbetalingsoversikt-api',
  production: 'http://tms-utbetalingsoversikt-api/tms-utbetalingsoversikt-api',
};

const UTKAST_API_URL = {
  local: 'http://localhost:3000/utkast/v2/utkast',
  development: 'http://tms-utkast/v2/utkast',
  production: 'http://tms-utkast/v2/utkast',
};

const BASE_URL: EnvUrl = {
  local: 'http://localhost:4321/minside',
  development: 'https://www.ansatt.dev.nav.no/minside/',
  production: 'https://www.nav.no/minside/',
};

const NAV_NO_URL = {
  local: 'https://www.nav.no',
  ansatt: 'https://www.ansatt.dev.nav.no',
  development: 'https://www.intern.dev.nav.no',
  production: 'https://www.nav.no',
};

const ERROR_REPORTING_URL = {
  local:
    'https://www.intern.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler',
  ansatt:
    'https://www.ansatt.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler',
  development:
    'https://www.intern.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler',
  production:
    'https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler',
};

const PDL_API_URL = {
  local: 'http://localhost:3000/api/navn',
  development: 'https://pdl-api.dev-fss-pub.nais.io/graphql',
  production: 'https://pdl-api.prod-fss-pub.nais.io/graphql',
  ansatt: 'https://pdl-api.dev-fss-pub.nais.io/graphql',
};

const GET_USER_INFO_URL = {
  local: 'http://localhost:4321/utbetalingsoversikt/api/navn',
  development: 'https://www.intern.dev.nav.no/utbetalingsoversikt/api/navn',
  production: 'https://www.nav.no/utbetalingsoversikt/api/navn',
  ansatt: 'https://www.ansatt.dev.nav.no/utbetalingsoversikt/api/navn',
};

export const utkastApiUrl = UTKAST_API_URL[getEnvironment()];
export const baseUrl = BASE_URL[getEnvironment()];
export const errorReportingUrl = ERROR_REPORTING_URL[getEnvironment()];
export const navNoUrl = NAV_NO_URL[getEnvironment()];
export const pdlApiUrl = PDL_API_URL[getEnvironment()];
export const enkelUtbetalingApiUrl = (id: string) =>
  `${UTBETALINGSOVERSIKT_API_URL[getEnvironment()]}/utbetalinger/ssr/${id}`;
export const minSideUrl = MIN_SIDE_URL[getEnvironment()];
export const getUserInfoUrl = GET_USER_INFO_URL[getEnvironment()];
