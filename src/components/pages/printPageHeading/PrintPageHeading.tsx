import { Detail } from "@navikt/ds-react";
import { fetcher } from "@src/api/api";
import { identNavnUrl } from "@src/utils/client/urls";
import dayjs from "dayjs";
import useSWRImmutable from "swr/immutable";
import logo from "./nav-logo.png";
import styles from "./PrintPageHeading.module.css";

const PrintPageHeading = () => {
  const { data: bruker } = useSWRImmutable(
    {
      path: identNavnUrl,
    },
    fetcher,
  );

  return (
    <div className={styles.contentContainer}>
      <img src={logo.src} width="90" alt="Logo" />
      <Detail className={styles.pageTitle}>UTBETALINGSOVERSIKT</Detail>
      <Detail className={styles.name}>{bruker?.navn}</Detail>
      <Detail className={styles.fnr}>{bruker?.ident}</Detail>
      <Detail
        className={styles.utskriftsdato}
      >{`Utskriftsdato: ${dayjs().format("DD.MM.YYYY")}`}</Detail>
    </div>
  );
};

export default PrintPageHeading;
