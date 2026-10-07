import { PrinterSmallIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { logKnappKlikket } from "@src/utils/client/analytics";
import styles from "./PrintButton.module.css";

const PrintButton = () => {
  return (
    <Button
      className={styles.skrivUtButton}
      onClick={() => {
        window.print();
        logKnappKlikket({
          tekst: "Skriv ut",
          komponentId: "skriv-ut-utbetaling",
        });
      }}
      icon={<PrinterSmallIcon aria-hidden />}
    >
      Skriv ut
    </Button>
  );
};

export default PrintButton;
