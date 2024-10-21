import { getEnvironment } from "@src/utils/server/urls.ts";

const REDIRECT_URI = {
  local: "http://localhost:3000/minside/utkast",
  development: "https://www.ansatt.dev.nav.no/minside/utkast",
  production: "https://www.nav.no/minside/utkast",
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/minside/utkast/oauth2/login?redirect=${redirectUri}`;
