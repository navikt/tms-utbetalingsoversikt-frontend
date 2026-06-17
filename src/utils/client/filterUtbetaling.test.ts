import type { UtbetalingGroupType, UtbetalingType } from "@src/types/types";
import { describe, expect, it } from "vitest";
import filterUtbetalinger from "./filterUtbetaling";

const utbetaling = (ytelse: string, id: string): UtbetalingType => ({
  id,
  beløp: 100,
  dato: "2024-06-01",
  ytelse,
});

const group = (
  måned: number,
  utbetalinger: UtbetalingType[],
): UtbetalingGroupType => ({ år: 2024, måned, utbetalinger });

const groups: UtbetalingGroupType[] = [
  group(5, [utbetaling("DAGPENGER", "a"), utbetaling("SYKEPENGER", "b")]),
  group(4, [utbetaling("SYKEPENGER", "c")]),
];

describe("filterUtbetalinger", () => {
  it("should return all groups when no ytelse is selected", () => {
    const selected = { DAGPENGER: false, SYKEPENGER: false };

    expect(filterUtbetalinger(groups, selected)).toEqual(groups);
  });

  it("should keep only utbetalinger matching the selected ytelse", () => {
    const selected = { DAGPENGER: true, SYKEPENGER: false };

    const result = filterUtbetalinger(groups, selected);

    expect(result).toHaveLength(1);
    expect(result[0].utbetalinger.map((u) => u.id)).toEqual(["a"]);
  });

  it("should drop groups that have no matching utbetalinger", () => {
    const selected = { DAGPENGER: true, SYKEPENGER: false };

    const result = filterUtbetalinger(groups, selected);

    expect(result.every((g) => g.utbetalinger.length > 0)).toBe(true);
    expect(result.map((g) => g.måned)).toEqual([5]);
  });

  it("should preserve group metadata while filtering its utbetalinger", () => {
    const selected = { SYKEPENGER: true };

    const result = filterUtbetalinger(groups, selected);

    expect(result).toEqual([
      group(5, [utbetaling("SYKEPENGER", "b")]),
      group(4, [utbetaling("SYKEPENGER", "c")]),
    ]);
  });
});
