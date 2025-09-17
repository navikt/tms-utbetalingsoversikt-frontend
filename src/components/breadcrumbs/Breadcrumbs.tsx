import { Link } from "@navikt/ds-react";
import { logEvent } from "@src/utils/client/amplitude";
import { minSideUrl } from "@src/utils/client/urls";
import style from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ showUtbetalinger }: { showUtbetalinger: boolean }) => (
  <div className={style.container}>
    <a
      className={`${style.minSideLink} ${style.link}`}
      href={minSideUrl}
      onClick={() => logEvent("breadcrum", "min-side")}
    >
      Min side
    </a>
    {showUtbetalinger && (
      <div className={style.linkWrapper}>
        <Link
          className={style.link}
          onClick={() => logEvent("breadcrum", "utbetalinger")}
          href="/utbetalingsoversikt"
        >
          Utbetalinger
        </Link>
      </div>
    )}
  </div>
);
export default Breadcrumbs;
