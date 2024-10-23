import { useStore } from "@nanostores/react";
import { BodyShort, Chips } from "@navikt/ds-react";
import { useState } from "react";
import {
  selctedPeriodeAtom,
  setPeriodeFilter,
  setSelectedPeriode,
  showFilterAtom,
} from "@src/store/filter";
import { logEvent } from "@src/utils/client/amplitude";
import {
  getDateCurrentlyThisYear,
  getDateLastYear,
  getDateThreemonthsBack,
  type GetDatePeriodType,
} from "@src/utils/client/date";
import style from "./PeriodeFilter.module.css";
import EgendefinertPeriode from "./egendefinertPeriode/EgendefinertPeriode";

type PeriodeOptionsType = {
  label: string;
  dateFunction?: GetDatePeriodType;
};

const periodeOptions: PeriodeOptionsType[] = [
  { label: "Siste 3 måneder", dateFunction: getDateThreemonthsBack },
  { label: "Hittil i år", dateFunction: getDateCurrentlyThisYear },
  { label: "I fjor", dateFunction: getDateLastYear },
  { label: "Egendefinert" },
];

const PeriodeFilter = () => {
  const showContent = useStore(showFilterAtom);
  const initialSelectedPeriode = useStore(selctedPeriodeAtom);
  const [selected, setSelected] = useState(initialSelectedPeriode);

  const handlePeriodeClick = (
    selectedOption: string,
    periodeTomFom?: GetDatePeriodType
  ) => {
    logEvent("filter-periode", selectedOption);
    setSelected(selectedOption);
    if (selectedOption !== "Egendefinert") {
      setSelectedPeriode(selectedOption);
      periodeTomFom && setPeriodeFilter(periodeTomFom());
    }
  };

  return (
    <div
      className={`${style.periodeFilterContainer} ${!showContent && style.hideContent}`}
    >
      <BodyShort weight="semibold" className={style.periodeFilterLabel}>
        Velg periode
      </BodyShort>
      <Chips>
        {periodeOptions.map((p) => (
          <Chips.Toggle
            checkmark={false}
            onClick={() => handlePeriodeClick(p.label, p?.dateFunction)}
            key={p.label}
            selected={p.label === selected}
          >
            {p.label}
          </Chips.Toggle>
        ))}
      </Chips>
      {selected === "Egendefinert" && <EgendefinertPeriode />}
    </div>
  );
};

export default PeriodeFilter;
