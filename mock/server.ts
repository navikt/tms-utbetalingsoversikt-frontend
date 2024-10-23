import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import identNavn from "./mockData/identNavn.json";
import alleUtbetalinger from "./mockData/alleUtbetalinger.json";
import authentication from "./mockData/autentication.json";
import betaltUtbetalingDetalje from "./mockData/betaltUtbetalingDetalje.json";
import kommendeUtbetalingDetalje from "./mockData/kommendeUtbetalingDetaljer.json";
import { json } from "stream/consumers";

const api = new Hono();

api.use(
  "/*",
  cors({
    origin: "http://localhost:4321",
    credentials: true,
  })
);

api.get("/status", (c) => {
  return c.json(authentication);
});

api.get("/api/utbetalinger/alle", (c) => {
  const fom = c.req.queries("fom");
  const tom = c.req.queries("tom");

  return c.json(alleUtbetalinger);
});

api.get("/api/utbetalinger/ut-*", (c) => {
  return c.json(betaltUtbetalingDetalje);
});

api.get("/api/utbetalinger/ko-*", (c) => {
  return c.json(kommendeUtbetalingDetalje);
});

api.get("/utbetalinger", (c) => {
  return c.json(betaltUtbetalingDetalje);
});

api.get("/tms-min-side-proxy/navn", (c) => {
  return c.json(identNavn);
});

serve(api);
