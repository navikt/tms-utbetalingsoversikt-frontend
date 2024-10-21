import { Hono } from "hono";
import { HTTPException } from 'hono/http-exception';
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

const api = new Hono();

api.use("/*", cors({
  origin: "http://localhost:4321",
  credentials: true,
}));

api.get('/utkast/v2/utkast/error', (c) => {
  throw new HTTPException(502, { message: 'Custom error message' });
});

api.get('/utkast/v2/utkast', (c) => {
  return c.json([
    {
      utkastId: "12467899999",
      tittel: "Søknad om dagpenger, permittert",
      link: "https://www.intern.dev.nav.no/minside/",
      opprettet: "2020-03-23T08:53:24.636Z",
      sistEndret: null,
      metrics: {
        skjemakode: "2233/8",
        skjemanavn: "Dagpenger søknadskjema",
      },
    },
    {
      utkastId: "124677777777",
      tittel: "Søknad om foreldre- og svangerskapspenger",
      link: "https://www.intern.dev.nav.no/minside/",
      opprettet: "2020-03-13T08:53:24.636Z",
      sistEndret: "2020-03-14T08:53:24.636Z",
      metrics: null,
    },
    {
      utkastId: "124679",
      tittel: "Søknad om dagpenger, permittert",
      link: "https://www.intern.dev.nav.no/minside/",
      opprettet: "2020-10-13T08:53:24.636Z",
      sistEndret: null,
    },
    {
      utkastId: "124610",
      tittel: "Søknad om foreldre- og svangerskapspenger",
      link: "https://www.intern.dev.nav.no/minside/",
      opprettet: "2023-03-13T08:53:24.636Z",
      sistEndret: "2023-03-14T08:53:24.636Z",
    },
  ]);
});

serve(api);
