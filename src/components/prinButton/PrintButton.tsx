import { PrinterSmallIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import styles from "./PrintButton.module.css"

const PrintButton = () => {
  return (
    <Button className={styles.skrivUtButton} onClick={() => window.print()} icon={<PrinterSmallIcon aria-hidden />}>
      Skriv ut
    </Button>
  );
};

export default PrintButton