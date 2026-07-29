import { describe, expect, it } from "vitest";
import { formatNavn } from "@src/utils/server/navn/formatNavn";

describe("formatNavn", () => {
  it("should join first and last name when there is no middle name", () => {
    expect(
      formatNavn({ fornavn: "Kari", mellomnavn: null, etternavn: "Nordmann" }),
    ).toBe("Kari Nordmann");
  });

  it("should include the middle name when present", () => {
    expect(
      formatNavn({
        fornavn: "Ola",
        mellomnavn: "Mellom",
        etternavn: "Nordmann",
      }),
    ).toBe("Ola Mellom Nordmann");
  });
});
