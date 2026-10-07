import { useStore } from "@nanostores/react";
import { FilterIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { showFilterAtom, toggleShowFilter } from "@src/store/filter";
import { logKnappKlikket } from "@src/utils/client/analytics";
import style from "./ShowFilterButton.module.css";

const ShowFilterButton = () => {
  const selected = useStore(showFilterAtom);
  const handleClick = () => {
    logKnappKlikket({
      tekst: selected ? "Skjul filter" : "Vis filter",
      komponentId: "filter-button",
    });
    toggleShowFilter();
  };

  return (
    <Button
      className={style.showFilterButton}
      size="small"
      variant="primary"
      icon={<FilterIcon aria-hidden />}
      onClick={handleClick}
    >
      {selected ? "Skjul filter" : "Vis filter"}
    </Button>
  );
};

export default ShowFilterButton;
