import { BodyShort, Detail } from "@navikt/ds-react";
import style from "@src/components/utbetaltPeriode/UtbetaltPeriode.module.css";

type Props = {
  isPrint?: boolean;
  periode: string;
};

const UtbetaltIPeriodenHeading = ({ isPrint, periode }: Props) => {
  if (isPrint) {
    return (
      <>
        <Detail weight="semibold">Utbetalt i perioden</Detail>
        <Detail weight="semibold">{periode}</Detail>
      </>
    );
  } else {
    return (
      <BodyShort as="h2" size="small" weight="semibold">
        <span>Utbetalt i perioden</span>
        <span className={style.periodeDate}>{periode}</span>
      </BodyShort>
    );
  }
};

export default UtbetaltIPeriodenHeading;
