import { beforeEach, describe, expect, it } from "vitest";
import {
  selctedPeriodeAtom,
  setSelectedPeriode,
  setYtelseFilter,
  showFilterAtom,
  toggleShowFilter,
  toggleYtelseFilter,
  ytelserFilterAtom,
} from "@src/store/filter";

describe("filter store", () => {
  beforeEach(() => {
    showFilterAtom.set(false);
    ytelserFilterAtom.set({});
  });

  it("toggleShowFilter should flip the show-filter flag", () => {
    expect(showFilterAtom.value).toBe(false);

    toggleShowFilter();
    expect(showFilterAtom.value).toBe(true);

    toggleShowFilter();
    expect(showFilterAtom.value).toBe(false);
  });

  it("toggleYtelseFilter should turn an unset ytelse on and back off", () => {
    toggleYtelseFilter("DAGPENGER");
    expect(ytelserFilterAtom.value).toEqual({ DAGPENGER: true });

    toggleYtelseFilter("DAGPENGER");
    expect(ytelserFilterAtom.value).toEqual({ DAGPENGER: false });
  });

  it("toggleYtelseFilter should not disturb other ytelser", () => {
    setYtelseFilter({ DAGPENGER: false, SYKEPENGER: true });

    toggleYtelseFilter("DAGPENGER");

    expect(ytelserFilterAtom.value).toEqual({
      DAGPENGER: true,
      SYKEPENGER: true,
    });
  });

  it("setSelectedPeriode should update the selected period label", () => {
    setSelectedPeriode("I fjor");
    expect(selctedPeriodeAtom.value).toBe("I fjor");
  });
});
