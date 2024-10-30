import { Heading, Loader } from '@navikt/ds-react';
import useSWRImmutable from 'swr/immutable';
import Breadcrumbs from '@src/components/breadcrumbs/Breadcrumbs';
import ErrorPanel from '@src/components/errorPanel/ErrorPanel';
import { logEvent } from '@src/utils/client/amplitude';
import { enkelUtbetalingAPIUrl } from '@src/utils/client/urls';
import { fetcher } from '@src/api/api';
import PrintButton from '@src/components/prinButton/PrintButton';
import { formatToDetailedDate } from '@src/utils/client/date';
import PrintPageHeading from '../printPageHeading/PrintPageHeading';
import style from './UtbetalingDetaljeSide.module.css';
import SummaryPanel from './summaryPanel/SummaryPanel';
import UtbetalingCalculations from './utbetalingCalculations/UtbetalingCalculations';
import UtbetalingDescription from './utbetalingDescription/UtbetalingDescription';
import { initializeAmplitude } from '@src/utils/client/amplitude';

interface props {
  utbetalingsId: string;
}

const UtbetalingDetaljeSide = ({ utbetalingsId }: props) => {
  initializeAmplitude();
  const { data, isLoading, error } = useSWRImmutable(
    { path: enkelUtbetalingAPIUrl(utbetalingsId ? utbetalingsId : '') },
    fetcher,
    {
      shouldRetryOnError: false,
      onError: () => logEvent('fikk-feilmelding-detaljeside'),
    },
  );

  if (isLoading) {
    return <Loader size="3xlarge" title="Henter data..." />;
  }

  if (error) {
    return <ErrorPanel isLandingsside={false} />;
  }

  const pageTittel = data.ytelse;
  const ytelseDato = data.ytelseDato;
  const nettoUtbetalt = data.nettoUtbetalt;

  return (
    <>
      <Breadcrumbs showUtbetalinger={true} />
      <PrintPageHeading />
      <Heading className={style.pageTitle} level="1" size="xlarge">
        {pageTittel}
      </Heading>
      <SummaryPanel
        erUtbetalt={data.erUtbetalt}
        utbetalingsDato={ytelseDato}
        nettoUtbetalt={nettoUtbetalt}
        ytelse={pageTittel}
      />
      <div className={style.detailsContainer}>
        {<UtbetalingCalculations data={data} />}
        {data?.melding && (
          <UtbetalingDescription heading={'Melding'} bodyText={data.melding} />
        )}
        <UtbetalingDescription
          heading={'Periode'}
          bodyText={`${formatToDetailedDate(data.ytelsePeriode.fom)} - ${formatToDetailedDate(
            data.ytelsePeriode.tom,
          )} til konto ${data.kontonummer}`}
        />
        <PrintButton />
      </div>
    </>
  );
};

export default UtbetalingDetaljeSide;
