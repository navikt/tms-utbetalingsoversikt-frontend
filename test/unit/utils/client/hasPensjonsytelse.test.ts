import type { UtbetalingGroupType } from "@src/types/types";
import hasPensjonsytelse from "@src/utils/client/hasPensjonsytelse";
import { describe, expect, it } from "vitest";

const utbetalingGroup = (...ytelser: string[]): UtbetalingGroupType => ({
  år: 2026,
  måned: 9,
  utbetalinger: ytelser.map((ytelse, index) => ({
    id: `ut-${index}`,
    beløp: 1000,
    dato: "2026-09-01",
    ytelse,
  })),
});

describe("hasPensjonsytelse", () => {
  it("should return true for Alderspensjon", () => {
    expect(hasPensjonsytelse([utbetalingGroup("Alderspensjon")])).toBe(true);
  });

  it("should return true for Tjenestepensjon", () => {
    expect(hasPensjonsytelse([utbetalingGroup("Tjenestepensjon")])).toBe(true);
  });

  it("should match case-insensitively", () => {
    expect(hasPensjonsytelse([utbetalingGroup("AVTALEFESTET PENSJON")])).toBe(
      true,
    );
  });

  it("should return true when only one of several ytelser is a pensjon", () => {
    expect(
      hasPensjonsytelse([utbetalingGroup("Skattetrekk", "Alderspensjon")]),
    ).toBe(true);
  });

  it("should return true when the pensjon is in a later group", () => {
    expect(
      hasPensjonsytelse([
        utbetalingGroup("Dagpenger"),
        utbetalingGroup("Alderspensjon"),
      ]),
    ).toBe(true);
  });

  it("should return false for ytelser without pensjon in the name", () => {
    expect(
      hasPensjonsytelse([
        utbetalingGroup("Dagpenger", "Uføretrygd", "Barnetrygd"),
      ]),
    ).toBe(false);
  });

  it("should return false for an empty list", () => {
    expect(hasPensjonsytelse([])).toBe(false);
  });

  it("should return false when utbetalinger are undefined", () => {
    expect(hasPensjonsytelse(undefined)).toBe(false);
  });
});
