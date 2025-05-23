import { useStore } from '@nanostores/react';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import dayjs from 'dayjs';
import type { UtbetalingerResponse } from '@src/types/types';
import useSWR from 'swr';
import {
  periodeFilterAtom,
  selctedPeriodeAtom,
  setYtelseFilter,
} from '@src/store/filter';
import { logEvent } from '@src/utils/client/amplitude';
import getUniqueYtelser from '@src/utils/client/getUniqueYtelser';
import { utbetalingerAPIUrl } from '@src/utils/client/urls';
import { fetcher } from '../../api/api';
import ContentLoader from '../contentLoader/ContentLoader';
import ErrorPanel from '../errorPanel/ErrorPanel';
import YtelserFilter from '../filter/ytelseFilter/YtelserFilter';
import KommendeUtbetalinger from '../kommendeUtbetalinger/KommendeUtbetalinger';
import PrintButton from '../prinButton/PrintButton';
import UtbetaltPeriode from '../utbetaltPeriode/UtbetaltPeriode';
import style from './Ubtetalinger.module.css';
import NoUtbetalinger from './noUtbetalinger/NoUtbetalinger';
import TidligereUtbetalinger from './tidligereUtbetalinger/TidligereUtbetalinger';

const Utbetalinger = () => {
  const utbetalingerPeriod = useStore(selctedPeriodeAtom);
  const selectedPeriodFilter = useStore(periodeFilterAtom);
  const utbetalingerPeriodDato = `${dayjs(selectedPeriodFilter.fom).format('DD.MM.YYYY')}-${dayjs(
    selectedPeriodFilter.tom,
  ).format('DD.MM.YYYY')}`;

  const {
    data: utbetalinger,
    isLoading,
    error,
  } = useSWR<UtbetalingerResponse>(
    {
      path: utbetalingerAPIUrl(
        `?fom=${selectedPeriodFilter.fom}&tom=${selectedPeriodFilter.tom}`,
      ),
    },
    fetcher,
    {
      shouldRetryOnError: false,
      onError: () => logEvent('fikk-feilmelding-forside'),
    },
  );

  if (isLoading) {
    return <ContentLoader />;
  }
  const showKommendeUtbetalinger =
    utbetalinger && utbetalinger?.neste.length > 0;

  const hasTidligereUtbetalinger =
    utbetalinger && utbetalinger?.tidligere.length > 0;
  hasTidligereUtbetalinger &&
    setYtelseFilter(
      getUniqueYtelser(utbetalinger.utbetalingerIPeriode.ytelser),
    );

  const nullYtelser = utbetalinger?.tidligere.flatMap((utbetalingGroup) =>
    utbetalingGroup.utbetalinger.map(
      (utbetaling) => utbetaling.beløp === 0 && utbetaling.ytelse,
    ),
  );

  const showInfoMelding: boolean = nullYtelser
    ? nullYtelser.includes('Uføretrygd')
    : false;

  const showBarnetrygdMelding: boolean = nullYtelser
    ? nullYtelser.includes('Barnetrygd')
    : false;

  const infoMeldingTekst: string =
    'På grunn av en teknisk feil, kan det hende du ser flere utbetalinger på "0 kr", i tillegg til den vanlige utbetalingen din. Dette påvirker ikke utbetalingen din. Vi beklager feilen.';
  const infoMeldingBarnetrygd: string =
    'Fra 1. mai 2025 økte barnetrygd for barn 0-18 år til 1968 kroner. På grunn av en teknisk feil, vil noen kunne se en liste med utbetalinger på "0 kr" i tillegg til utbetalingen på 1968 kroner. Dette påvirker ikke utbetalingen din. Vi beklager feilen.';

  return (
    <>
      {hasTidligereUtbetalinger && <YtelserFilter />}
      {showInfoMelding && (
        <Alert className={style.infoMelding} variant="info">
          <BodyLong>{infoMeldingTekst}</BodyLong>
        </Alert>
      )}
      {showBarnetrygdMelding && (
        <Alert className={style.infoMelding} variant="info">
          <BodyLong>{infoMeldingBarnetrygd}</BodyLong>
        </Alert>
      )}
      {showKommendeUtbetalinger && (
        <KommendeUtbetalinger utbetalinger={utbetalinger.neste} />
      )}
      {
        <>
          <Heading
            level="2"
            size="small"
            className={`navds-body-short ${style.tidligereUtbetalingerHeading}`}
          >
            {utbetalingerPeriod === 'Egendefinert'
              ? utbetalingerPeriodDato
              : utbetalingerPeriod}
          </Heading>
          {hasTidligereUtbetalinger ? (
            <>
              {' '}
              <TidligereUtbetalinger
                utbetalingGroups={utbetalinger.tidligere}
              />
              <UtbetaltPeriode
                data={utbetalinger.utbetalingerIPeriode}
                periode={utbetalingerPeriodDato}
              />
              <PrintButton />
            </>
          ) : (
            <NoUtbetalinger />
          )}
          {error ? <ErrorPanel isLandingsside /> : null}
        </>
      }
    </>
  );
};

export default Utbetalinger;
