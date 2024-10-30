import { Heading } from '@navikt/ds-react';
import UtbetalingLinkPanel from '../../utbetalingLinkPanel/UtbetalingLinkPanel';
import style from './UtbetalingGroup.module.css';
import { getMonth } from '@src/utils/client/date';
import { formaterTallUtenDesimaler } from '@src/utils/client/utbetalingDetalje';
import type { UtbetalingGroupType } from 'src/types/types';

const UtbetalingGroup = ({ måned, år, utbetalinger }: UtbetalingGroupType) => {
  const månedText: string = getMonth(måned, true);
  const sumYtelser = utbetalinger.reduce(
    (sum, utbetaling) => sum + utbetaling.beløp,
    0,
  );

  return (
    <div className={style.utbetalingPeriod}>
      <Heading className={style.utbetalingTitle} level="2" size="xsmall">
        <span>{`${månedText} ${år}`}</span>
        <span>{formaterTallUtenDesimaler(sumYtelser) + ' kr'}</span>
      </Heading>
      <ul className={style.utbetalingPeriodList}>
        {utbetalinger.map((o, index) => {
          return (
            <li className={style.utbetalingListElement} key={index}>
              <UtbetalingLinkPanel
                ytelse={o.ytelse}
                dato={o.dato}
                beløp={o.beløp}
                id={o.id}
                nesteUtbetaling={false}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UtbetalingGroup;
