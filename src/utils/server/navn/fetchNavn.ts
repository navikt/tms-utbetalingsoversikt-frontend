import type { PDLType } from '@src/types/types';
import { formatNavn } from './formatNavn.ts';

export const fetchNavn = async (
  token: string,
  pid: string,
  pdlApiUrl: string,
) => {
  const pdlResponse: PDLType = await fetch(`${pdlApiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Behandlingsnummer: 'B328',
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
      console.error('Error fetching from API: ' + error);
      throw new Error('Error fetching from API' + error);
    });

  if (pdlResponse.body?.errors) {
    console.error(
      'Error fetching from API: ' + JSON.stringify(pdlResponse.body.errors),
    );
    return { navn: null, ident: pid };
  }

  const navn = formatNavn(pdlResponse.body.data.hentPerson.navn[0]);

  return {
    navn: navn,
    ident: pid,
  };
};
