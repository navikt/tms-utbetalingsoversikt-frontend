import { PrinterSmallIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { logEvent } from "@src/utils/client/analytics";
import styles from "./PrintButton.module.css";

const PrintButton = () => {
  return (
    <Button
      className={styles.skrivUtButton}
      onClick={() => {
        window.print();
        logEvent("skriv-ut-utbetaling", "skriv-ut");
      }}
      icon={<PrinterSmallIcon aria-hidden />}
    >
      Skriv ut
    </Button>
  );
};

export default PrintButton;
