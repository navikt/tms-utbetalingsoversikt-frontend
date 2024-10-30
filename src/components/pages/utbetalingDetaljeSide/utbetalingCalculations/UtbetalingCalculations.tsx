import { Heading } from '@navikt/ds-react';
import DetaljeElement from '@src/components/utbetalingDetaljeElement/UtbetalingDetaljeElement';
import type { Trekk, UnderYtelseType } from '@src/types/types';
import {
  isUtbetalingWithSats,
  satsDescription,
} from '@src/utils/client/utbetalingDetalje';
import style from './UtbetalingCalculations.module.css';

const UtbetalingCalculations = ({ data }: any) => {
  if (!data?.trekk) {
    return null;
  }
  const hasTrekk = data?.trekk.length > 0;
  const hasUnderytelser = data.underytelse.length > 0;
  const showSats = isUtbetalingWithSats(data.ytelse);
  const showBrutto = hasTrekk && hasUnderytelser;
  const sumUtbetaltLabel = hasUnderytelser ? 'Netto utbetalt' : 'Sum';

  return (
    <div className={style.container}>
      <Heading level="2" size="xsmall" className={style.detaljerHeading}>
        Detaljer
      </Heading>
      <ul className={style.calculationList}>
        {hasUnderytelser &&
          data.underytelse.map((ytelse: UnderYtelseType) => {
            return (
              <DetaljeElement
                key={ytelse.beskrivelse + ytelse.beløp}
                label={`${ytelse.beskrivelse} ${
                  showSats && ytelse.sats && ytelse.antall
                    ? satsDescription(ytelse)
                    : ''
                }`}
                beløp={ytelse.beløp}
              />
            );
          })}
        {showBrutto && (
          <DetaljeElement
            isSum={true}
            label={'Brutto'}
            beløp={data.bruttoUtbetalt}
            className="bruttoElement"
          />
        )}
        {hasTrekk &&
          data.trekk.map((trekk: Trekk) => (
            <DetaljeElement
              label={trekk.type}
              beløp={trekk.beløp}
              key={trekk.type + trekk.beløp}
            />
          ))}
        {
          <DetaljeElement
            isSum={true}
            label={sumUtbetaltLabel}
            beløp={data.nettoUtbetalt}
          />
        }
      </ul>
    </div>
  );
};

export default UtbetalingCalculations;
