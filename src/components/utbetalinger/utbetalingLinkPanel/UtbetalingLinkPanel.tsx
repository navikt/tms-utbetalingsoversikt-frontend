import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Link } from "@navikt/ds-react";
import type { UtbetalingType } from "@src/types/types";
import { logEvent } from "@src/utils/client/amplitude";
import { formatToReadableDate } from "@src/utils/client/date";
import { formaterTallUtenDesimaler } from "@src/utils/client/utbetalingDetalje";
import style from "./UtbetalingLinkPanel.module.css";

type UtbetalingProps = UtbetalingType & { nesteUtbetaling: boolean };

const UtbetalingLinkPanel = ({
  ytelse,
  beløp,
  dato,
  id,
  nesteUtbetaling,
}: UtbetalingProps) => {
  const linkClassName = nesteUtbetaling
    ? style.nesteUtbetalingLink
    : style.tidligereUtbetalingLink;
  return (
    <Link
      className={"navds-panel navds-link-panel " + linkClassName}
      href={`/utbetalingsoversikt/utbetaling/${id}`}
      onClick={() =>
        logEvent(
          "utbetaling-link-panel",
          nesteUtbetaling ? "kommende" : "tidligere",
        )
      }
    >
      <div className={style.betalingLeft}>
        {
          <BodyShort textColor="subtle" className={style.betalingDato}>
            {formatToReadableDate(dato)}
          </BodyShort>
        }
        {<BodyLong className={style.betalingYtelse}>{ytelse}</BodyLong>}
      </div>
      <div className={style.betalingRight}>
        <BodyShort
          weight="semibold"
          className={style.betalingDato}
        >{`${formaterTallUtenDesimaler(beløp)} kr`}</BodyShort>
        <ChevronRightIcon
          aria-hidden="true"
          className="navds-link-panel__chevron chevronRight"
        />
      </div>
    </Link>
  );
};

export default UtbetalingLinkPanel;
