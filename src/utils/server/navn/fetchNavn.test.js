import { expect, test } from 'vitest';
import { fetchNavn } from './fetchNavn';
import { getOboToken, localToken } from '../token';
import { parseIdportenToken } from '@navikt/oasis';
import { pdlApiUrl } from '../urls';

test('Fetch navn successfully', async () => {
  const JWTToken = await localToken({ pid: '12345678912' });
  const parsedToken = parseIdportenToken(JWTToken);
  const oboToken = await getOboToken(JWTToken);
  const navn = await fetchNavn(oboToken, parsedToken.pid, pdlApiUrl);

  expect(navn).toEqual({
    navn: 'Ola Normann',
    ident: '12345678912',
  });
});

test('PDL response with error', async () => {
  const JWTToken = await localToken({ pid: '12345678912' });
  const parsedToken = parseIdportenToken(JWTToken);
  const oboToken = await getOboToken(JWTToken);
  const navn = await fetchNavn(
    oboToken,
    parsedToken.pid,
    'http://localhost:3000/api/navn/error',
  );

  expect(navn).toEqual({
    navn: null,
    ident: '12345678912',
  });
});
