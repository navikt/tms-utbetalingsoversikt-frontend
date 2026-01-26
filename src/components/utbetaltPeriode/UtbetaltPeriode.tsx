import { BodyShort, Detail } from "@navikt/ds-react";
import type { UtbetalingerIPeriode } from "@src/types/types";
import { formaterTallUtenDesimaler } from "@src/utils/client/utbetalingDetalje";
import UtbetaltIPeriodenHeading from "./customHeading/UtbetaltIPeriodenHeading.tsx";
import style from "./UtbetaltPeriode.module.css";

interface PropsType {
  data: UtbetalingerIPeriode;
  periode: string;
  isPrint?: boolean;
}

const UtbetaltPeriode = ({ data, periode, isPrint }: PropsType) => {
  const ytelser = data.ytelser;
  const bruttoUtbetalt = data.brutto;
  const nettoUtbetalt = data.netto;
  const trekk = data.trekk;
  const TextFieldTypography = isPrint ? Detail : BodyShort;

  return (
    <div className={style.container}>
      {<UtbetaltIPeriodenHeading isPrint={isPrint} periode={periode} />}
      <dl className={`${style.list} ${style.periodeSammendrag}`}>
        {ytelser.map((ytelse) => (
          <>
            <dt className={`${style.ytelseTittel}`}>{ytelse.ytelse}</dt>
            <dd className={`${style.ytelseBelop}`}>
              {`${formaterTallUtenDesimaler(ytelse.beløp)} kr`}
            </dd>
          </>
        ))}

        <dt className={style.ytelseTittel}>Brutto</dt>
        <dd className={style.ytelseBelop}>
          {`${formaterTallUtenDesimaler(bruttoUtbetalt)} kr`}
        </dd>

        <dt className={style.ytelseTittel}>Trekk</dt>
        <dd className={style.ytelseBelop}>
          {`${formaterTallUtenDesimaler(trekk)} kr`}
        </dd>

        <dt className={style.nettoElement}>Netto utbetalt</dt>
        <dd className={`${style.nettoElement} ${style.ytelseBelop}`}>
          {`${formaterTallUtenDesimaler(nettoUtbetalt)} kr`}
        </dd>
      </dl>
    </div>
  );
};

export default UtbetaltPeriode;
