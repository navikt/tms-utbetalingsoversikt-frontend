import type { UtbetalingGroupType } from "@src/types/types";

const hasPensjonsytelse = (
  utbetalingGroups: UtbetalingGroupType[] | undefined,
): boolean =>
  utbetalingGroups?.some((utbetalingGroup) =>
    utbetalingGroup.utbetalinger.some((utbetaling) =>
      utbetaling.ytelse?.toLowerCase().includes("pensjon"),
    ),
  ) ?? false;

export default hasPensjonsytelse;
