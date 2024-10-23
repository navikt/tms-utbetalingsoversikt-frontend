import { Heading } from "@navikt/ds-react";
import UtbetalingLinkPanel from "../utbetalinger/utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./KommendeUtbetalinger.module.css";
import type { UtbetalingType } from "src/types/types";

interface Props {
  utbetalinger: UtbetalingType[];
}

const KommendeUtbetalinger = ({ utbetalinger }: Props) => {
  return (
    <div className={style.container}>
      <Heading
        level="2"
        size="small"
        className={"navds-body-short  " + style.heading}
      >
        Neste utbetaling
      </Heading>{" "}
      <ul className={style.kommendeUtbetlaingList}>
        {utbetalinger.map((u: UtbetalingType, index) => (
          <li key={index} className={style.kommendeUtbetlaingElement}>
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
