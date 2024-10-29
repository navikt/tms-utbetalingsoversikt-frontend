const isProduction =
  window.location.href.includes("www.nav.no") ||
  window.location.href.includes("www.intern.nav.no") ||
  window.location.href.includes("tjenester.nav.no");
const isDevelopment = window.location.href.includes("www.intern.dev.nav.no");
const isAnsatt = window.location.href.includes("www.ansatt.dev.nav.no");

export const getEnvironment = () => {
  if (isProduction) {
    return "production";
  }

  if (isAnsatt) {
    return "ansatt";
  }

  if (isDevelopment) {
    return "development";
  }

  return "local";
};

const BASE_URL = {
  local: "http://localhost:3000/utbetalingsoversikt/",
  ansatt: "https://www.ansatt.dev.nav.no/utbetalingsoversikt",
  development: "https://www.intern.dev.nav.no/utbetalingsoversikt",
  production: "https://www.nav.no/utbetalingsoversikt",
};

const MIN_SIDE_URL = {
  local: "http://localhost:3000/minside",
  ansatt: "https://www.ansatt.dev.nav.no/minside",
  development: "https://www.intern.dev.nav.no/minside",
  production: "https://www.nav.no/minside",
};

const UTBETALINGSOVERSIKT_API_URL = {
  local: "http://localhost:3000/api",
  ansatt: "https://www.ansatt.dev.nav.no/tms-utbetalingsoversikt-api",
  development: "https://www.intern.dev.nav.no/tms-utbetalingsoversikt-api",
  production: "https://person.nav.no/tms-utbetalingsoversikt-api",
};

const SATSERURL = {
  local: "http://localhost:3000/satser",
  ansatt:
    "https://www.ansatt.dev.nav.no/satser",
  development:
    "https://www.intern.dev.nav.no/satser",
  production:
    "https://www.nav.no/satser",
};

const UTBETALINGSDATOER_URL = {
  local: "http://localhost:3000/utbetalignsdatoer",
  ansatt:
    "https://www.ansatt.dev.nav.no/utbetalingsdatoer",
  development:
    "https://www.intern.dev.nav.no/utbetalingsdatoer",
  production:
    "https://www.nav.no/utbetalingsdatoer",
};

const ENDRE_KONTONUMMER_URL = {
  local: "http://localhost:3000/kontonummer",
  ansatt: "https://www.intern.dev.nav.no/kontonummer",
  development: "https://www.intern.dev.nav.no/kontonummer",
  production: "https://www.nav.no/kontonummer",
};

const ENDRE_SKATTEKORT_URL = {
  local: "http://localhost:300/skattekort",
  ansatt:
    "https://www.ansatt.dev.nav.no/skattetrekk",
  development:
    "https://www.intern.dev.nav.no/skattetrekk",
  production:
    "https://www.nav.no/skattetrekk",
};

const SOSIALHJELP_URL = {
  local: "https://www.nav.no/sosialhjelp/innsyn/utbetaling",
  ansatt: "https://www.intern.dev.nav.no/sosialhjelp/innsyn/utbetaling",
  development: "https://www.intern.dev.nav.no/sosialhjelp/innsyn/utbetaling",
  production: "https://www.nav.no/sosialhjelp/innsyn/utbetaling",
};

const DAGPENGER_URL = {
  local: "https://www.nav.no/dagpenger/forskudd/oversikt",
  ansatt: "https://www.intern.dev.nav.no/dagpenger/forskudd/oversikt",
  development: "https://www.intern.dev.nav.no/dagpenger/forskudd/oversikt",
  production: "https://www.nav.no/dagpenger/forskudd/oversikt",
};

const ÅRSOPPGAVER_URL = {
  local: "https://www.nav.no/dokumentarkiv/tema/STO",
  ansatt: "https://intern.dev.nav.no/dokumentarkiv/tema/STO",
  development: "https://intern.dev.nav.no/dokumentarkiv/tema/STO",
  production: "https://www.nav.no/dokumentarkiv/tema/STO",
};

const OM_UTBETALINGER_URL = {
  local: "http://localhost:3000/om-utbetalinger",
  ansatt: "https://www.intern.dev.nav.no/utbetalinger",
  development: "https://www.intern.dev.nav.no/utbetalinger",
  production: "https://www.nav.no/utbetalinger",
};

const LEGACY_URL = {
  local: "http://localhost:3000/utbetalingsoversikt",
  ansatt: "https://www.intern.dev.nav.no/utbetalingsoversikt-gammel",
  development: "https://www.intern.dev.nav.no/utbetalingsoversikt-gammel",
  production: "https://www.nav.no/utbetalingsoversikt-gammel",
};

const IDENT_NAVN_URL = {
  local: "http://localhost:3000/tms-min-side-proxy/navn",
  ansatt: "https://www.intern.dev.nav.no/tms-min-side-proxy/navn",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/navn",
  production: "https://www.nav.no/tms-min-side-proxy/navn",
};

export const utbetalingerAPIUrl = (period: string) =>
  `${UTBETALINGSOVERSIKT_API_URL[getEnvironment()]}/utbetalinger/alle${period}`;

export const enkelUtbetalingAPIUrl = (id: string) =>
  `${UTBETALINGSOVERSIKT_API_URL[getEnvironment()]}/utbetalinger/${id}`;

export const baseUrl = `${BASE_URL[getEnvironment()]}`;
export const loginUrl = `${UTBETALINGSOVERSIKT_API_URL[getEnvironment()]}/login`;
export const authenticationUrl = `${loginUrl}/status`;
export const satserUrl = SATSERURL[getEnvironment()];
export const utbetalingsdatoerUrl = UTBETALINGSDATOER_URL[getEnvironment()];
export const endreKontonummerUrl = ENDRE_KONTONUMMER_URL[getEnvironment()];
export const endreSkattekortUrl = ENDRE_SKATTEKORT_URL[getEnvironment()];
export const sosialhjelpUrl = SOSIALHJELP_URL[getEnvironment()];
export const dagpengerUrl = DAGPENGER_URL[getEnvironment()];
export const årsoppgaverUrl = ÅRSOPPGAVER_URL[getEnvironment()];
export const minSideUrl = MIN_SIDE_URL[getEnvironment()];
export const omUtbetalinger = OM_UTBETALINGER_URL[getEnvironment()];
export const legacyUrl = LEGACY_URL[getEnvironment()];
export const identNavnUrl = IDENT_NAVN_URL[getEnvironment()];

export const authAndRedirectUrl = () => {
  return getEnvironment() === "local"
    ? baseUrl
    : `${loginUrl}?redirect_uri=${baseUrl}`;
};
