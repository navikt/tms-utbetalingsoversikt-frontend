import type { UtbetalingerResponse } from "@src/types/types";

export const addKey = (data?: UtbetalingerResponse) => {
  if (!data) {
    return data;
  }

  return {
    ...data,
    tidligere: data.tidligere.map((utbetalingGroup, groupIndex) => ({
      ...utbetalingGroup,
      utbetalinger: utbetalingGroup.utbetalinger.map((utbetaling, index) => ({
        ...utbetaling,
        key: `${groupIndex}-${index}-${utbetaling.id}`,
      })),
    })),
  };
};
