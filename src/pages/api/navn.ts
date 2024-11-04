import type { APIRoute } from 'astro';
import { parseIdportenToken } from '@navikt/oasis';
import { getOboToken } from '@src/utils/server/token';
import { fetchFromApi } from '@src/api/fetchNavn';

export const GET: APIRoute = async (context) => {
  const parsedToken = parseIdportenToken(context.locals.token);

  if (!parsedToken.ok) {
    console.error('Could not parse token' + parsedToken.error);
    return new Response(null, { status: 500 });
  }
  const pid = parsedToken.pid;
  const token = await getOboToken(context.locals.token);
  return new Response(JSON.stringify(fetchFromApi(token, pid)), {
    status: 200,
  });
};
