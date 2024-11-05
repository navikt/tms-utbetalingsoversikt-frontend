import { pdlApiUrl } from '@src/utils/server/urls.ts';

export const fetchNavn = async (token: string, pid: string) => {
  const response = await fetch(pdlApiUrl, {
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
  }).catch((error) => {
    console.error('Error fetching from API: ' + error);
    throw new Error('Error fetching from API' + error);
  });

  const data = await response.json();

  return {
    status: response.status,
    headers: response.headers,
    body: data,
  };
};
