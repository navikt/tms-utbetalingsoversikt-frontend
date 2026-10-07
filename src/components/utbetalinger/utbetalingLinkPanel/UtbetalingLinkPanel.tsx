import { BodyLong, BodyShort, LinkPanel } from "@navikt/ds-react";
import type { UtbetalingType } from "@src/types/types";
import { logNavigere } from "@src/utils/client/analytics";
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
  const href = `/utbetalingsoversikt/utbetaling/${id}`;
  return (
    <LinkPanel
      className={linkClassName}
      href={href}
      onClick={() =>
        logNavigere({
          lenketekst: ytelse,
          destinasjon: href,
          komponentId: "utbetaling-link-panel",
          lenkegruppe: nesteUtbetaling ? "kommende" : "tidligere",
        })
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
      </div>
    </LinkPanel>
  );
};

export default UtbetalingLinkPanel;
