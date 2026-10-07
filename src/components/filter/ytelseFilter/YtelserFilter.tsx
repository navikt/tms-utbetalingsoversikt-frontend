import { useStore } from "@nanostores/react";
import { BodyShort, Chips } from "@navikt/ds-react";
import {
  showFilterAtom,
  toggleYtelseFilter,
  ytelserFilterAtom,
} from "@src/store/filter";
import { logFiltervalg } from "@src/utils/client/analytics";
import style from "./YtelserFilter.module.css";

const YtelserFilter = () => {
  const ytelser = useStore(ytelserFilterAtom);
  const showContent = useStore(showFilterAtom);

  const handleClick = (ytelse: string) => {
    toggleYtelseFilter(ytelse);
    logFiltervalg({
      kategori: "ytelse",
      filternavn: ytelse,
      komponentId: "filter-ytelse",
    });
  };

  return (
    <div className={`${style.container} ${!showContent && style.hideContent}`}>
      <BodyShort weight="semibold" className={style.ytelseFilterLabel}>
        Velg pengestøtte
      </BodyShort>
      <Chips>
        {Object.keys(ytelser).map((p) => (
          <Chips.Toggle
            onClick={() => handleClick(p)}
            key={p}
            selected={ytelser[p] === true}
          >
            {p}
          </Chips.Toggle>
        ))}
      </Chips>
    </div>
  );
};

export default YtelserFilter;
