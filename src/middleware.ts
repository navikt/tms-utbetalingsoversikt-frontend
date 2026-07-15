import { authenticate } from "@navikt/astro-auth";

export const onRequest = authenticate();
