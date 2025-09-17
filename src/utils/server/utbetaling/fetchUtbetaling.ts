import type { Utbetaling } from "@src/types/types";
import { getOboToken } from "@src/utils/server/token";
import { enkelUtbetalingApiUrl } from "@src/utils/server/urls";

export const fetchUtbetaling = async (
  token: string,
  id: string,
): Promise<Utbetaling> => {
  const utbetalingsApiAudience = `${process.env.NAIS_CLUSTER_NAME}:min-side:tms-utbetalingsoversikt-api`;

  const oboToken = await getOboToken(token, utbetalingsApiAudience);

  const response = await fetch(enkelUtbetalingApiUrl(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${oboToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      "http error with status " + response.status + "when fetching utbetaling",
    );
  }

  return await response.json();
};
