import type { UnderYtelseType } from "@src/types/types";
import { describe, expect, it } from "vitest";
import {
  formaterTallTilKomma,
  formaterTallUtenDesimaler,
  formaterVekkTommeMeldinger,
  isUtbetalingWithSats,
  satsDescription,
} from "@src/utils/client/utbetalingDetalje";

describe("isUtbetalingWithSats", () => {
  it("should match ytelser with sats regardless of casing", () => {
    expect(isUtbetalingWithSats("dagpenger")).toBe(true);
    expect(isUtbetalingWithSats("ARBEIDSAVKLARINGSPENGER")).toBe(true);
  });

  it("should be false for other ytelser", () => {
    expect(isUtbetalingWithSats("SYKEPENGER")).toBe(false);
  });
});

describe("formaterTallUtenDesimaler", () => {
  it("should return '0' for a falsy amount", () => {
    expect(formaterTallUtenDesimaler(0)).toBe("0");
  });

  it("should group thousands using the Norwegian locale", () => {
    // no-nb uses a (non-breaking) space as the thousands separator.
    expect(formaterTallUtenDesimaler(1234)).toMatch(/^1\s234$/);
  });
});

describe("formaterTallTilKomma", () => {
  it("should use a comma as the decimal separator", () => {
    expect(formaterTallTilKomma({ tall: 1.5 })).toBe("1,5");
  });

  it("should clamp maxDesimaler up to minDesimaler when inverted", () => {
    expect(
      formaterTallTilKomma({ tall: 1.25, minDesimaler: 2, maxDesimaler: 1 }),
    ).toBe("1,25");
  });

  it("should return '0' for a falsy amount", () => {
    expect(formaterTallTilKomma({ tall: 0 })).toBe("0");
  });
});

describe("satsDescription", () => {
  const base: UnderYtelseType = {
    beskrivelse: "",
    satstype: "Dager",
    sats: 100,
    antall: 5,
    beløp: 500,
  };

  it("should describe a per-day sats", () => {
    expect(satsDescription(base)).toBe("(5 dager à 100 kroner)");
  });

  it("should describe a percentage sats", () => {
    expect(
      satsDescription({ ...base, satstype: "Prosent", sats: 66, antall: 2 }),
    ).toBe("(2 kroner à 66%)");
  });
});

describe("formaterVekkTommeMeldinger", () => {
  it("should replace the first empty message with a single space", () => {
    expect(formaterVekkTommeMeldinger({ info: "" })).toEqual({ info: " " });
  });

  it("should leave non-empty messages untouched", () => {
    expect(formaterVekkTommeMeldinger({ info: "hei" })).toEqual({
      info: "hei",
    });
  });
});
