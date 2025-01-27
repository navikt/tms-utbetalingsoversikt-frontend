// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { baseUrl } from './urls';

import { logAmplitudeEvent } from '@navikt/nav-dekoratoren-moduler';

export const logEvent = (komponent: string, lenketekst?: string) => {
  logAmplitudeEvent({
    origin: 'tms-utbetalingsoversikt',
    eventName: 'navigere',
    eventData: {
      komponent: komponent,
      lenketekst: lenketekst,
    },
  });
};
