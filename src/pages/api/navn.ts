import type { APIRoute } from 'astro';
import { parseIdportenToken } from '@navikt/oasis';
import { getOboToken } from '@src/utils/server/token';
import { fetchNavn } from '@src/utils/server/navn/fetchNavn';
import { pdlApiUrl } from '@src/utils/server/urls.ts';

export const GET: APIRoute = async (context) => {
  const parsedToken = parseIdportenToken(context.locals.token);

  if (!parsedToken.ok) {
    console.error('Could not parse token' + parsedToken.error);
    return new Response(JSON.stringify({ navn: null, ident: null }), {
      status: 500,
    });
  }
  const pid = parsedToken.pid;
  const token = await getOboToken(context.locals.token);
  const fetchedData = await fetchNavn(token, pid, pdlApiUrl);

  return new Response(JSON.stringify(fetchedData), {
    status: 200,
  });
};
