import { Alert, BodyLong, Heading, Link } from "@navikt/ds-react";
import { logEvent } from "@src/utils/client/analytics";
import { baseUrl } from "@src/utils/client/urls";
import style from "./ErrorPanel.module.css";

const ErrorPanel = ({ isLandingsside }: { isLandingsside: boolean }) => {
  const headingText = isLandingsside
    ? "Vi har problemer med å hente inn dine utbetalinger."
    : "Vi har problemer med å hente din utbetaling.";

  const ContentBody = isLandingsside ? (
    <BodyLong>
      Vi beklager ulempene dette medfører. Du kan prøve å endre periode,
      <Link
        onClick={() => logEvent("error-panel", "laste inn siden på nytt")}
        href={baseUrl}
      >
        laste inn siden på nytt
      </Link>{" "}
      eller prøv igjen senere.
    </BodyLong>
  ) : (
    <BodyLong>
      Vi beklager ulempene dette medfører. Dette kan føre til at du ikke får opp
      all informasjon om din utbetaling. Vennligst prøv igjen senere.
    </BodyLong>
  );

  return (
    <Alert variant="error" className={style.container}>
      <Heading level="2" size="xsmall">
        {headingText}
      </Heading>
      <BodyLong>{ContentBody}</BodyLong>
    </Alert>
  );
};

export default ErrorPanel;
