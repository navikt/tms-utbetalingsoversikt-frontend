import type { MockDefinition } from "@navikt/astro-mocks";
import alleUtbetalinger from "./alleUtbetalinger.json";
import betaltUtbetalingDetalje from "./betaltUtbetalingDetalje.json";
import kommendeUtbetalingDetalje from "./kommendeUtbetalingDetaljer.json";
import pdlNavnResponse from "./pdlNavnResponse.json";

export const utbetalingMocks: MockDefinition[] = [
  {
    path: "/api/utbetalinger/alle",
    response: alleUtbetalinger,
  },
  {
    path: "/api/utbetalinger/ut-:id",
    response: betaltUtbetalingDetalje,
  },
  {
    path: "/api/utbetalinger/ssr/ut-:id",
    response: betaltUtbetalingDetalje,
  },
  {
    path: "/api/utbetalinger/ko-:id",
    response: kommendeUtbetalingDetalje,
  },
  {
    path: "/api/utbetalinger/ssr/ko-:id",
    response: kommendeUtbetalingDetalje,
  },
  {
    path: "/api/navn",
    method: "POST",
    response: pdlNavnResponse,
  },
];
