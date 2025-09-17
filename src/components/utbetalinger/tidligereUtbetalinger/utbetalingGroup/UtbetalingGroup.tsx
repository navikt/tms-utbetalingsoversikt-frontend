import { Heading } from "@navikt/ds-react";
import { getMonth } from "@src/utils/client/date";
import { formaterTallUtenDesimaler } from "@src/utils/client/utbetalingDetalje";
import type { UtbetalingGroupType } from "src/types/types";
import UtbetalingLinkPanel from "../../utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./UtbetalingGroup.module.css";

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
        <span>{formaterTallUtenDesimaler(sumYtelser) + " kr"}</span>
      </Heading>
      <ul className={style.utbetalingPeriodList}>
        {utbetalinger.map((utbetaling) => {
          return (
            <li className={style.utbetalingListElement} key={utbetaling.id}>
              <UtbetalingLinkPanel
                ytelse={utbetaling.ytelse}
                dato={utbetaling.dato}
                beløp={utbetaling.beløp}
                id={utbetaling.id}
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
