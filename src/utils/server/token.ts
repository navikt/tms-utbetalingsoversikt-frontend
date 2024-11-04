import { requestOboToken } from '@navikt/oasis';
import { isLocal } from '@src/utils/server/environment.ts';

const audience = `${process.env.NAIS_CLUSTER_NAME}:tms-utbetalingsoversikt-frontend`;

export const getOboToken = async (token: string): Promise<string> => {
  const oboResult = await requestOboToken(token, audience);

  if (isLocal) {
    return 'Fake token';
  }

  if (!oboResult.ok) {
    console.error('Error getting access token: ' + oboResult.error);
    throw new Error(
      'Request oboToken for tms-utbetalingsoversikt-frontend failed ',
    );
  }

  return oboResult.token;
};
