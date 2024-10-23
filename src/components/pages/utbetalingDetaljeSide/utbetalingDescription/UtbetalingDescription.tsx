import { BodyLong, Heading } from "@navikt/ds-react";
import style from "./UtbetalingDescription.module.css";

type props = {
  heading: string;
  bodyText: string ;
};

const UtbetalingDescription = ({ heading, bodyText }: props) => {
  return (
    <>
      <Heading level="2" size="xsmall" className={style.Heading}>
        {heading}
      </Heading>
      <BodyLong className={style.BodyText}>{bodyText}</BodyLong>
    </>
  );
};

export default UtbetalingDescription