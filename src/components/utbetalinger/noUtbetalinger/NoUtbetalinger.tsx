import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { logEvent } from "@src/utils/client/analytics";
import { omUtbetalinger } from "@src/utils/client/urls";
import style from "./NoUtbetalinger.module.css";

const NoUtbetalinger = () => {
  return (
    <div className={style.container}>
      <Heading level="3" size="xsmall">
        Du har ingen utbetalinger for denne perioden
      </Heading>
      <BodyLong>
        Prøv å endre periode eller se{" "}
        <Link
          onClick={() => logEvent("mer-om-utbetalig-link")}
          href={omUtbetalinger}
        >
          mer om utbetalinger
        </Link>
      </BodyLong>
    </div>
  );
};

export default NoUtbetalinger;
