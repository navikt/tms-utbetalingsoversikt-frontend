import { useStore } from "@nanostores/react";
import { showFilterAtom, toggleShowFilter } from "@src/store/filter";
import { FilterIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import style from "./ShowFilterButton.module.css";
import { logEvent } from "@src/utils/client/amplitude";

const ShowFilterButton = () => {
  const selected = useStore(showFilterAtom);
  const handleClick = () => {
    logEvent("filter-button", selected ? "Vis filter" : "Skjul filter");
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
