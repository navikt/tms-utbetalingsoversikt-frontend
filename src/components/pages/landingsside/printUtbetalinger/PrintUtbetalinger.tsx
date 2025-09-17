import { useStore } from "@nanostores/react";
import { Detail } from "@navikt/ds-react";
import { fetcher } from "@src/api/api";
import UtbetaltPeriode from "@src/components/utbetaltPeriode/UtbetaltPeriode";
import { periodeFilterAtom } from "@src/store/filter";
import type {
  UtbetalingerResponse,
  UtbetalingGroupType,
  UtbetalingType,
} from "@src/types/types";
import { utbetalingerAPIUrl } from "@src/utils/client/urls";
import { formaterTallUtenDesimaler } from "@src/utils/client/utbetalingDetalje";
import dayjs from "dayjs";
import useSWR from "swr";
import PrintPageHeading from "../../printPageHeading/PrintPageHeading";
import styles from "./PrintUtbetalinger.module.css";

const PrintUtbetalinger = () => {
  const selectedPeriodFilter = useStore(periodeFilterAtom);
  const periodFom = dayjs(selectedPeriodFilter.fom).format("DD.MM.YYYY");
  const periodTom = dayjs(selectedPeriodFilter.tom).format("DD.MM.YYYY");
  const { data: utbetalinger } = useSWR<UtbetalingerResponse>(
    {
      path: utbetalingerAPIUrl(
        `?fom=${selectedPeriodFilter.fom}&tom=${selectedPeriodFilter.tom}`,
      ),
    },
    fetcher as any,
  );

  const utbetalingerGroups = utbetalinger?.tidligere;
  const fomTomDato = `${periodFom} - ${periodTom}`;

  return (
    <div id={styles.container}>
      <PrintPageHeading />
      <Detail weight="semibold" className={styles.periodeText}>
        Periode
      </Detail>
      <Detail weight="semibold" className={styles.periodeDate}>
        {fomTomDato}
      </Detail>
      {utbetalinger && (
        <>
          <ul className={styles.utbetalingListe}>
            {utbetalingerGroups?.map((group: UtbetalingGroupType) => {
              return group.utbetalinger.map((u: UtbetalingType, index) => (
                <li key={u.id} className={styles.utbetalingElement}>
                  <Detail
                    weight="semibold"
                    className={styles.utbetalingElementHeading}
                  >
                    <span className={styles.ytelse}>{u.ytelse}</span>
                    <span className={styles.beløp}>
                      {formaterTallUtenDesimaler(u.beløp) + " kr"}
                    </span>
                  </Detail>
                  <Detail
                    className={styles.utbetalingElementDato}
                  >{`Utbetalt ${dayjs(u.dato).format("DD.MM.YYYY")}`}</Detail>
                </li>
              ));
            })}
          </ul>
          <UtbetaltPeriode
            isPrint
            data={utbetalinger?.utbetalingerIPeriode}
            periode={fomTomDato}
          />
        </>
      )}
    </div>
  );
};

export default PrintUtbetalinger;
