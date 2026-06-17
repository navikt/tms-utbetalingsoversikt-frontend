import type { Ytelse } from "@src/types/types";
import { describe, expect, it } from "vitest";
import getUniqueytelser from "./getUniqueYtelser";

const ytelse = (navn: string): Ytelse => ({ ytelse: navn, beløp: 0 });

describe("getUniqueytelser", () => {
  it("should produce one entry per unique ytelse, all initialised to false", () => {
    const result = getUniqueytelser([
      ytelse("DAGPENGER"),
      ytelse("SYKEPENGER"),
    ]);

    expect(result).toEqual({ DAGPENGER: false, SYKEPENGER: false });
  });

  it("should deduplicate repeated ytelser", () => {
    const result = getUniqueytelser([
      ytelse("DAGPENGER"),
      ytelse("DAGPENGER"),
      ytelse("SYKEPENGER"),
    ]);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result).toEqual({ DAGPENGER: false, SYKEPENGER: false });
  });

  it("should return an empty object for no ytelser", () => {
    expect(getUniqueytelser([])).toEqual({});
  });
});
