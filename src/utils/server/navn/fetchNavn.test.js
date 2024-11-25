import { expect, test } from 'vitest';
import { fetchNavn } from './fetchNavn';
import { pdlApiUrl } from '../urls';
import { localToken } from '../token';

test('Fetch navn successfully', async () => {
  const JWTToken = await localToken({ pid: '12345678912' });
  const navn = await fetchNavn(JWTToken, pdlApiUrl);

  expect(navn).toEqual({
    navn: 'Ola Normann',
    ident: '12345678912',
  });
});

test('PDL response with error', async () => {
  const JWTToken = await localToken({ pid: '12345678912' });
  const navn = await fetchNavn(
    JWTToken,
    'http://localhost:3000/api/navn/error',
  );

  expect(navn).toEqual({
    navn: null,
    ident: '12345678912',
  });
});
