import { getToken, validateToken } from "@navikt/oasis";
import { localToken } from "@src/utils/server/token";
import { isLocal } from "@src/utils/server/urls.ts";
import { defineMiddleware } from "astro/middleware";
import { loginUrl } from "./urls";
import { isInternal } from "./utils";

export const onRequest = defineMiddleware(async (context, next) => {
  const token = getToken(context.request.headers);
  const params = encodeURIComponent(context.url.search);

  if (isLocal) {
    context.locals.token = await localToken({ pid: "12345678912" });
    return next();
  }

  if (isInternal(context)) {
    return next();
  }

  if (!token) {
    context.logger.info(
      "Could not find any bearer token on the request. Redirecting to login.",
    );
    return context.redirect(`${loginUrl}${params}`);
  }

  const validation = await validateToken(token);

  if (!validation.ok) {
    const error = new Error(
      `Invalid JWT token found (cause: ${validation.errorType} ${validation.error}, redirecting to login.`,
    );
    context.logger.error(error.message);
    return context.redirect(`${loginUrl}${params}`);
  }

  context.locals.token = token;

  return next();
});
