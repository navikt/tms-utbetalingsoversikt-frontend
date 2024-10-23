import { Detail } from "@navikt/ds-react";
import dayjs from "dayjs";
import useSWRImmutable from "swr/immutable";
import { identNavnUrl } from "@src/utils/client/urls";
import styles from "./PrintPageHeading.module.css";
import logo from "./nav-logo.png";
import { fetcher } from "@src/api/api";

const PrintPageHeading = () => {
  const { data: bruker } = useSWRImmutable(
    {
      path: identNavnUrl,
    },
    fetcher
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
