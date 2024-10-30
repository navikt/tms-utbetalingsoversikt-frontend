import { BodyShort, Detail } from '@navikt/ds-react';
import { formaterTallUtenDesimaler } from '@src/utils/client/utbetalingDetalje';
import style from './UtbetaltPeriode.module.css';
import type { UtbetalingerIPeriode } from '@src/types/types';
import CustomHeading from './customHeading/CustomHeading';

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
      {<CustomHeading isPrint={isPrint} />}
      <TextFieldTypography className={style.periodeDate} weight="semibold">
        {periode}
      </TextFieldTypography>
      <ul className={style.list}>
        {ytelser.map((o, index) => (
          <li
            key={index}
            className={`${style.ytelseElementsstyle} ${style.listElement}`}
          >
            <TextFieldTypography>{o.ytelse}</TextFieldTypography>
            <TextFieldTypography>{`${formaterTallUtenDesimaler(o.beløp)} kr`}</TextFieldTypography>
          </li>
        ))}
        <li className={`${style.bruttoElement} ${style.listElement}`}>
          <TextFieldTypography>Brutto</TextFieldTypography>
          <TextFieldTypography>{`${formaterTallUtenDesimaler(bruttoUtbetalt)} kr`}</TextFieldTypography>
        </li>
        <li className={`${style.trekkElement} ${style.listElement}`}>
          <TextFieldTypography>Trekk</TextFieldTypography>
          <TextFieldTypography>{`${formaterTallUtenDesimaler(trekk)} kr`}</TextFieldTypography>
        </li>
        <li className={`${style.nettoElement} ${style.listElement}`}>
          <TextFieldTypography weight="semibold">
            Netto utbetalt
          </TextFieldTypography>
          <TextFieldTypography weight="semibold">{`${formaterTallUtenDesimaler(
            nettoUtbetalt,
          )} kr`}</TextFieldTypography>
        </li>
      </ul>
    </div>
  );
};

export default UtbetaltPeriode;
