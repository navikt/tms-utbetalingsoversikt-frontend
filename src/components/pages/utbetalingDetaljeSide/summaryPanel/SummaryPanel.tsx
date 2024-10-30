import { BodyShort, Heading } from '@navikt/ds-react';
import { formatToDetailedDate } from '@src/utils/client/date';
import { formaterTallUtenDesimaler } from '@src/utils/client/utbetalingDetalje';
import style from './SummaryPanel.module.css';

type props = {
  erUtbetalt: boolean;
  utbetalingsDato: string;
  nettoUtbetalt: number;
  ytelse: string;
};

const SummaryPanel = ({
  erUtbetalt,
  utbetalingsDato,
  nettoUtbetalt,
  ytelse,
}: props) => {
  const isUtbetaltText = erUtbetalt
    ? 'Utbetalt'
    : 'Forventet overføring til bank';
  const sumInNok = `${formaterTallUtenDesimaler(nettoUtbetalt)} kr`;

  return (
    <>
      <div
        className={`${style.contentWrapper} ${!erUtbetalt && style.kommendeUtbetalingWrapper}`}
      >
        <div className={style.beløpOgDatoContainer}>
          <BodyShort
            className={style.utbetaltDato}
          >{`${isUtbetaltText} ${formatToDetailedDate(
            utbetalingsDato,
          )}`}</BodyShort>
          <Heading
            className={style.belopUtbetaltHeader}
            level="2"
            size="xlarge"
          >
            {sumInNok}
          </Heading>
        </div>
      </div>
      <div className={style.printContent}>
        <BodyShort weight={'semibold'} className={style.printSummaryHeading}>
          <span>{ytelse}</span>
          <span>{sumInNok}</span>
        </BodyShort>
        <BodyShort
          className={style.BodyText}
        >{`${isUtbetaltText} ${formatToDetailedDate(utbetalingsDato)}`}</BodyShort>
      </div>
    </>
  );
};

export default SummaryPanel;
