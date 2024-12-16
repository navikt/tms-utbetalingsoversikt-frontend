import type { APIRoute } from 'astro';
import { fetchNavn } from '@src/utils/server/navn/fetchNavn';
import { pdlApiUrl } from '@src/utils/server/urls.ts';

export const GET: APIRoute = async (context) => {
  const fetchedData = await fetchNavn(context.locals.token, pdlApiUrl);

  return new Response(JSON.stringify(fetchedData), {
    status: 200,
  });
};
