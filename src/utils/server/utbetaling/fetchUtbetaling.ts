import { enkelUtbetalingApiUrl } from '@src/utils/server/urls';
import type { Utbetaling } from '@src/types/types';
import { getEnvironment } from '@src/utils/server/environment';
import { getOboToken } from '@src/utils/server/token';

export const fetchUtbetaling = async (
  token: string,
  id: string,
): Promise<Utbetaling> => {
  const utbetalingsApiAudience =
    getEnvironment() === 'dev'
      ? 'dev-gcp:min-side:tms-utbetalingsoversikt-api'
      : 'prod-gcp:min-side:tms-utbetalingsoversikt-api';

  const oboToken = await getOboToken(token, utbetalingsApiAudience);

  const response = await fetch(enkelUtbetalingApiUrl(id), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      sAccept: 'application/json',
      Authorization: `Bearer ${oboToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      'http error with status ' + response.status + 'when fetching utbetaling',
    );
  }

  return await response.json();
};
