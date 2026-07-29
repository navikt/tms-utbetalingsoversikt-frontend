import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  formatToDetailedDate,
  formatToReadableDate,
  getDateLastYear,
  getDateThreemonthsBack,
  getMonth,
} from "@src/utils/client/date";

describe("getMonth", () => {
  it("should return the capitalised month name", () => {
    expect(getMonth(0, true)).toBe("Januar");
    expect(getMonth(11, true)).toBe("Desember");
  });

  it("should return the lowercased month name", () => {
    expect(getMonth(5, false)).toBe("juni");
  });
});

describe("formatToReadableDate", () => {
  it("should format as 'day. month'", () => {
    expect(formatToReadableDate("2024-06-17")).toBe("17. juni");
  });
});

describe("formatToDetailedDate", () => {
  it("should format as DD.MM.YYYY", () => {
    expect(formatToDetailedDate("2024-06-07")).toBe("07.06.2024");
  });
});

describe("date range helpers", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-17T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("getDateThreemonthsBack should span three months back to today", () => {
    expect(getDateThreemonthsBack()).toEqual({
      fom: "20240317",
      tom: "20240617",
    });
  });

  it("getDateLastYear should span the whole previous year", () => {
    expect(getDateLastYear()).toEqual({ fom: "20230101", tom: "20231231" });
  });
});
