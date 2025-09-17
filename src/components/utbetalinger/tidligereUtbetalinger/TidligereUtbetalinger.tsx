import { useStore } from "@nanostores/react";
import { ytelserFilterAtom } from "@src/store/filter";
import type { UtbetalingGroupType } from "@src/types/types";
import filterUtbetalinger from "@src/utils/client/filterUtbetaling";
import style from "./TidligereUtbetalinger.module.css";
import UtbetalingGroup from "./utbetalingGroup/UtbetalingGroup";

type props = {
  utbetalingGroups: UtbetalingGroupType[];
};

const TidligereUtbetalinger = ({ utbetalingGroups }: props) => {
  const selectedYtelser = useStore(ytelserFilterAtom);
  const selectedUtbetalinger = filterUtbetalinger(
    utbetalingGroups,
    selectedYtelser,
  );

  return (
    <ul className={style.utbetalingerList}>
      {selectedUtbetalinger.map((utbetalingGroup: UtbetalingGroupType) => (
        <li
          className={style.utbetalingerOneMonth}
          key={`${utbetalingGroup.måned}${utbetalingGroup.år}`}
        >
          <UtbetalingGroup
            måned={utbetalingGroup.måned - 1}
            år={utbetalingGroup.år}
            utbetalinger={utbetalingGroup.utbetalinger}
          />
        </li>
      ))}
    </ul>
  );
};

export default TidligereUtbetalinger;
