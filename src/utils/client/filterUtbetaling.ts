import type { UtbetalingGroupType } from '@src/types/types';
import type { SelectedYtelser } from '@src/store/filter';

const filterUtbetalinger = (
  utbetalingGroups: UtbetalingGroupType[],
  selectedYtelser: SelectedYtelser,
) => {
  const showAll = Object.values(selectedYtelser).every(
    (value) => value === false,
  );
  if (showAll) return utbetalingGroups;

  const filteredGroups = utbetalingGroups.reduce(
    (acc: UtbetalingGroupType[], period: UtbetalingGroupType) => {
      const filteredPeriod = period.utbetalinger.filter(
        (utbetaling) => selectedYtelser[utbetaling.ytelse],
      );
      if (filteredPeriod.length > 0) {
        return [...acc, { ...period, utbetalinger: filteredPeriod }];
      }
      return acc;
    },
    [],
  );
  return filteredGroups;
};

export default filterUtbetalinger;
