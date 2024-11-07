import type { APIRoute } from 'astro';
import { parseIdportenToken } from '@navikt/oasis';
import { getOboToken } from '@src/utils/server/token';
import { fetchNavn } from '@src/utils/server/api/fetchNavn';
import { isLocal } from '@src/utils/server/urls';

export const GET: APIRoute = async (context) => {
  const parsedToken = parseIdportenToken(context.locals.token);

  if (!parsedToken.ok) {
    console.error('Could not parse token' + parsedToken.error);
    return new Response(null, { status: 500 });
  }
  const pid = parsedToken.pid;
  const token = isLocal ? '' : await getOboToken(context.locals.token);
  const fetchedData = await fetchNavn(token, pid);

  return new Response(JSON.stringify(fetchedData), {
    status: 200,
  });
};
