import { describe, expect, it } from "vitest";
import { sortByOpprettet, type UtkastElement } from "@src/utils/server/sorting";

const makeUtkast = (
  opprettet: string,
  overrides: Partial<UtkastElement> = {},
): UtkastElement => ({
  tittel: "Utkast",
  link: "https://nav.no/utkast",
  utkastId: opprettet,
  opprettet,
  sistEndret: opprettet,
  ...overrides,
});

describe("sortByOpprettet", () => {
  it("should sort the most recently created element first", () => {
    const eldst = makeUtkast("2024-01-01T10:00:00.000Z");
    const nyest = makeUtkast("2024-03-01T10:00:00.000Z");
    const midt = makeUtkast("2024-02-01T10:00:00.000Z");

    const sorted = [eldst, nyest, midt].sort(sortByOpprettet);

    expect(sorted.map((u) => u.opprettet)).toEqual([
      nyest.opprettet,
      midt.opprettet,
      eldst.opprettet,
    ]);
  });

  it("should keep a single element unchanged", () => {
    const only = makeUtkast("2024-01-01T10:00:00.000Z");

    expect([only].sort(sortByOpprettet)).toEqual([only]);
  });
});
