import { requestOboToken } from '@navikt/oasis';
import { isLocal } from '@src/utils/server/environment.ts';
import { generateKeyPair, SignJWT } from 'jose';
import logger from './logger';

export const getOboToken = async (
  token: string,
  audience: string,
): Promise<string> => {
  const oboResult = await requestOboToken(token, audience);
  if (isLocal) {
    return 'Fake token';
  }

  if (!oboResult.ok) {
    logger.error('Error getting access token: ' + oboResult.error);
    throw new Error(
      'Request oboToken for tms-utbetalingsoversikt-frontend failed ',
    );
  }

  return oboResult.token;
};

const alg = 'RS256';

const cachedKeyPair = generateKeyPair(alg);
const privateKey = async () => (await cachedKeyPair).privateKey;

export const localToken = async ({
  audience = 'default_audience',
  issuer = 'default_issuer',
  algorithm = alg,
  exp = Math.round(Date.now() / 1000) + 1000,
  ...payload
}: {
  audience?: string;
  issuer?: string;
  algorithm?: string;
  exp?: number | string;
} & Record<string, unknown> = {}) =>
  new SignJWT(payload)
    .setExpirationTime(exp)
    .setProtectedHeader({ alg: algorithm })
    .setAudience([audience, 'https://nav.no'])
    .setIssuer(issuer)
    .setJti(`${Math.random()}`)
    .sign(await privateKey());
