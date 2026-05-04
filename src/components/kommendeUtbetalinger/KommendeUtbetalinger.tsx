import { BodyShort } from "@navikt/ds-react";
import type { UtbetalingType } from "src/types/types";
import UtbetalingLinkPanel from "../utbetalinger/utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./KommendeUtbetalinger.module.css";

interface Props {
  utbetalinger: UtbetalingType[];
}

const KommendeUtbetalinger = ({ utbetalinger }: Props) => {
  return (
    <div className={style.container}>
      <BodyShort
        as="h2"
        size="small"
        weight="semibold"
        className={style.heading}
      >
        Neste utbetaling
      </BodyShort>{" "}
      <ul className={style.kommendeUtbetlaingList}>
        {utbetalinger.map((u: UtbetalingType) => (
          <li key={u.id} className={style.kommendeUtbetlaingElement}>
            <UtbetalingLinkPanel
              ytelse={u.ytelse}
              beløp={u.beløp}
              dato={u.dato}
              nesteUtbetaling={true}
              id={u.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KommendeUtbetalinger;
