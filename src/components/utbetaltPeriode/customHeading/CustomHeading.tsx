import { Detail, Heading } from "@navikt/ds-react";
import style from "@src/components/utbetaltPeriode/UtbetaltPeriode.module.css";

type Props = {
  isPrint?: boolean;
  periode: string;
};

const CustomHeading = ({ isPrint, periode }: Props) => {
  if (isPrint) {
    return (
      <>
        <Detail weight="semibold">Utbetalt i perioden</Detail>
        <Detail weight="semibold">{periode}</Detail>
      </>
    );
  } else {
    return (
      <Heading className={`navds-body-short`} level="2" size="small">
        <span>Utbetalt i perioden</span>
        <span className={style.periodeDate}>{periode}</span>
      </Heading>
    );
  }
};

export default CustomHeading;
