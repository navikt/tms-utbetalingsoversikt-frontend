import type { PDLType, Bruker } from '@src/types/types';
import { formatNavn } from './formatNavn.ts';
import { parseIdportenToken } from '@navikt/oasis';
import { getOboToken } from '../token.ts';
import { getEnvironment } from '../environment.ts';
import logger from '../logger.ts';

export const fetchNavn = async (token: string, pdlApiUrl: string) => {
  const pdlApiAudience =
    getEnvironment() === 'dev' ? 'dev-fss:pdl:pdl-api' : 'prod-fss:pdl:pdl-api';
  const parsedToken = parseIdportenToken(token);

  if (!parsedToken.ok) {
    logger.error('Could not parse token' + parsedToken.error);
    return { navn: null, ident: null };
  }

  const pid = parsedToken.pid;
  const oboToken = await getOboToken(token, pdlApiAudience);
  const pdlResponse: PDLType = await fetch(`${pdlApiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${oboToken}`,
      Behandlingsnummer: 'B481',
      Tema: 'GEN',
    },
    body: JSON.stringify({
      query: `query($ident: ID!) {
  hentPerson(ident: $ident) {
    navn(historikk: false) {
      fornavn
      mellomnavn
      etternavn
    }
  }
}`,
      variables: {
        ident: pid,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      logger.error('Error fetching from API: ' + error);
    });

  if (pdlResponse?.errors) {
    logger.error(
      'Error fetching from API: ' + JSON.stringify(pdlResponse.errors),
    );
    return { navn: null, ident: pid };
  }
  if (pdlResponse?.data.hentPerson) {
    const navn = formatNavn(pdlResponse.data.hentPerson.navn[0]);
    return {
      navn: navn,
      ident: pid,
    };
  }
  return { navn: null, ident: pid };
};
