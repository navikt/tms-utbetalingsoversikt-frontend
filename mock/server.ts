import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import alleUtbetalinger from './mockData/alleUtbetalinger.json';
import betaltUtbetalingDetalje from './mockData/betaltUtbetalingDetalje.json';
import kommendeUtbetalingDetalje from './mockData/kommendeUtbetalingDetaljer.json';
import pdlNavnResponse from './mockData/pdlNavnResponse.json';
import pdlErrorResponse from './mockData/pdlErrorResponse.json';

const api = new Hono();

api.use(
  '/*',
  cors({
    origin: 'http://localhost:4321',
    credentials: true,
  }),
);

api.get('/api/utbetalinger/alle', (c) => {
  const fom = c.req.queries('fom');
  const tom = c.req.queries('tom');

  return c.json(alleUtbetalinger);
});

api.get('/api/utbetalinger/ut-*', (c) => {
  return c.json(betaltUtbetalingDetalje);
});

api.get('/api/utbetalinger/ssr/ut-*', (c) => {
  return c.json(betaltUtbetalingDetalje);
});

api.post('/api/navn', (c) => {
  return c.json(pdlNavnResponse);
});

api.post('/api/navn/error', (c) => {
  return c.json(pdlErrorResponse);
});

api.get('/api/utbetalinger/ko-*', (c) => {
  return c.json(kommendeUtbetalingDetalje);
});

api.get('/api/utbetalinger/ssr/ko-*', (c) => {
  return c.json(kommendeUtbetalingDetalje);
});

api.get('/utbetalinger', (c) => {
  return c.json(betaltUtbetalingDetalje);
});

serve(api);
